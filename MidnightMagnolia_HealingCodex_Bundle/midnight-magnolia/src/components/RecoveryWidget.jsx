import React, {useEffect, useMemo, useState} from 'react'
import { fetchTodaysReflection } from '../notion'
import affirmationsLocal from '../data/affirmations.json'

const PRAYER = `God, grant me the serenity to accept the things I cannot change,
the courage to change the things I can,
and the wisdom to know the difference.`.replace(/\n/g,' ')

const SMARTS = [
  'I have the power to choose my next thought.',
  'Every pause is a practice of freedom.',
  'Urges rise and fall — I am the steady ground beneath them.',
  'Progress, not perfection, is the miracle.',
  ...affirmationsLocal
]

export default function RecoveryWidget(){
  const [idx, setIdx] = useState(0)
  const [energy, setEnergy] = useState('gold') // 'sage' | 'gold' | 'plum'
  const [reflection, setReflection] = useState('')

  // rotate SMART affirmation every 20s
  useEffect(()=>{
    const t = setInterval(()=> setIdx(i => (i+1)%SMARTS.length), 20000)
    return ()=> clearInterval(t)
  }, [])

  // fetch today's reflection (optional)
  useEffect(()=>{
    (async()=>{
      const res = await fetchTodaysReflection()
      if(res.ok && res.items.length){
        // Try to pick a rich_text property: Gratitude or Lesson
        const page = res.items[0]
        const props = page.properties || {}
        const tryText = (name) => {
          const p = props[name]
          if(!p || !p.rich_text || !p.rich_text.length) return ''
          return p.rich_text.map(t=>t.plain_text).join(' ')
        }
        const text = tryText('Gratitude') || tryText('Lesson') || ''
        if(text) setReflection(text)
      }
    })()
  }, [])

  // energy selector for mood ring
  const phase = useMemo(()=>{
    if(energy==='sage') return 'phase-sage'
    if(energy==='plum') return 'phase-plum'
    return 'phase-gold'
  }, [energy])

  return (
    <section id="codex" className="mm-container recovery">
      <h2>Recovery — Serenity & Reflection</h2>

      <div className="controls">
        <span>Energy:&nbsp;</span>
        <button className={energy==='sage'?'on':''} onClick={()=>setEnergy('sage')}>Sage</button>
        <button className={energy==='gold'?'on':''} onClick={()=>setEnergy('gold')}>Gold</button>
        <button className={energy==='plum'?'on':''} onClick={()=>setEnergy('plum')}>Plum</button>
      </div>

      <div className={"serenity "+phase}>
        <p className="prayer">{PRAYER}</p>
        <p className="affirmation">{SMARTS[idx]}</p>
        <div className="now">
          <strong>Today’s Reflection:</strong>&nbsp;
          <span>{reflection || 'You’re allowed to work in whispers today.'}</span>
        </div>
      </div>
    </section>
  )
}
