export async function fetchTodaysReflection(){
  const key = import.meta.env.VITE_NOTION_API_KEY
  const db = import.meta.env.VITE_NOTION_DB_REFLECTION
  if(!key || !db){
    return { ok:false, message:'Missing Notion env vars', items:[] }
  }
  const today = new Date().toISOString().slice(0,10)
  const res = await fetch(`https://api.notion.com/v1/databases/${db}/query`,{
    method:'POST',
    headers:{
      'Authorization':`Bearer ${key}`,
      'Content-Type':'application/json',
      'Notion-Version':'2022-06-28'
    },
    body: JSON.stringify({
      "filter": { "property":"Date", "date":{"equals": today} },
      "page_size": 1,
      "sorts":[{ "property":"Date", "direction":"descending"}]
    })
  })
  if(!res.ok){
    const t = await res.text()
    return { ok:false, message:t, items:[] }
  }
  const data = await res.json()
  return { ok:true, items:data.results || [] }
}
