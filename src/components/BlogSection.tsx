import React, { useState } from 'react'
import '../styles/design-system.css'

interface BlogPost {
  id: string
  title: string
  series: string
  excerpt: string
  content: string
  publishDate: string
  readTime: string
  tags: string[]
  featured?: boolean
}

const BlogSection: React.FC = () => {
  const [selectedSeries, setSelectedSeries] = useState('all')

  const blogPosts: BlogPost[] = [
    {
      id: 'adhd-diagnosis-liberation',
      title: 'Finding Liberation in Late Diagnosis: My ADHD Story at 42',
      series: 'diagnosis-after-40',
      excerpt: 'For decades, I thought I was broken. The ADHD diagnosis at 42 didn\'t just explain my struggles—it offered a pathway to self-compassion and authentic living.',
      content: `The morning I received my ADHD diagnosis at 42, I sat in my car outside the clinic and cried. Not from sadness, but from relief so profound it felt like coming home to myself for the first time.

For four decades, I had been living in a world designed for neurotypical brains, constantly feeling like I was failing at being human. The scattered thoughts, the hyperfocus that made me miss meals, the emotional intensity that others called "too much"—all of it suddenly had context.

But this story isn't just about diagnosis. It's about the liberation that comes when you stop trying to fix yourself and start building systems that honor how your brain actually works.

**The Masking Years**

Like many Black women, I had become an expert at masking. Society doesn't make space for Black women to be anything other than strong, so the idea that my brain worked differently wasn't even a consideration. I learned to work twice as hard, sleep half as much, and somehow make it look effortless.

The cost was immense. Burnout became my normal state. I thought everyone felt like they were drowning in their own thoughts, that everyone struggled to remember basic tasks while being able to recall obscure details from conversations three years ago.

**The Turning Point**

The breaking point came during my work with the Black Liberation Fund. I was managing multiple projects, organizing events, and trying to maintain my own mental health. The traditional productivity advice felt like wearing shoes three sizes too small.

That's when a friend suggested I might have ADHD. The idea seemed impossible—I had internalized so many misconceptions about what ADHD looked like, especially in Black women.

**Redefining Productivity**

Post-diagnosis, everything changed. Instead of fighting my brain, I started working with it. I learned that my hyperfocus wasn't a character flaw—it was a superpower that needed proper channeling. My need for movement wasn't laziness—it was how my brain processes information.

I began building systems that honored my rhythms rather than forcing myself into neurotypical productivity molds. Some days I work in intense bursts, other days I need gentle, exploratory work. Both are valid. Both are productive.

**Building ADHD-Friendly Workflows**

This understanding revolutionized how I approach client work. Every automation system I build now includes ADHD-friendly principles:

- Visual organization over text-heavy systems
- Flexible deadlines with built-in buffer time
- Multiple input methods (voice notes, visual boards, traditional text)
- Regular check-ins that feel supportive, not supervisory

**The Ripple Effect**

Understanding my own neurodivergence has made me a better advocate, a more compassionate technologist, and a more authentic human. When I build websites now, I think about cognitive load. When I design workflows, I consider different processing styles.

My ADHD diagnosis didn't just change my life—it changed how I serve my community.

**To My Late-Diagnosed Siblings**

If you're reading this and recognizing yourself, know that diagnosis at any age is valid. Your struggles were real, and so is your strength. You're not broken—you're beautifully complex, and the world needs what you bring.

The systems that failed you weren't designed for minds like ours. But we can build new ones.`,
      publishDate: '2024-01-15',
      readTime: '8 min read',
      tags: ['ADHD', 'Mental Health', 'Black Women', 'Neurodivergence'],
      featured: true
    },
    {
      id: 'automation-executive-function',
      title: 'Automation as Executive Function Support: Building Systems That Think for You',
      series: 'diagnosis-after-40',
      excerpt: 'How I use technology and automation to support my ADHD brain, creating external systems that remember what my brain forgets.',
      content: `Executive function challenges aren't character flaws—they're neurological differences that require technological solutions, not willpower.

After my ADHD diagnosis, I realized that most productivity advice assumes neurotypical executive function. "Just use a planner" doesn't work when your brain can't consistently remember to check the planner, process visual information the same way each day, or maintain routines without external support.

Technology became my external brain. Here's how I built systems that think for me...`,
      publishDate: '2024-02-03',
      readTime: '12 min read',
      tags: ['ADHD', 'Automation', 'Technology', 'Executive Function']
    },
    {
      id: 'small-town-organizing',
      title: 'Building Justice Movements in Small Southern Towns',
      series: 'southern-activist-chronicles',
      excerpt: 'Lessons from organizing for Black liberation in communities where everyone knows your name and conservative values run deep.',
      content: `Organizing in small Southern towns requires a different kind of courage. When everyone knows your name, your family, and where you work, speaking truth to power becomes intensely personal.

I learned grassroots organizing in towns where the Confederate flag still flies and where being "too political" can cost you friendships, employment, and community standing. But I also learned that these same communities hold profound wisdom about mutual aid, collective care, and resilience.

**The Art of the Long Conversation**

In small towns, organizing isn't about rallies and protests—it's about conversations over sweet tea that slowly shift perspectives. It's about showing up to church potlucks and town halls, building relationships first and politics second.

I remember spending months just listening in our community. Understanding the concerns that kept people up at night, the fears that made progressive politics feel threatening, the values we actually shared beneath surface disagreements.

**Finding Allies in Unexpected Places**

Some of my strongest allies came from unexpected corners. The county clerk who quietly helped register voters. The church secretary who made sure meeting information reached the right people. The local business owner who provided meeting space when others wouldn't.

These partnerships taught me that justice work isn't about ideological purity—it's about finding shared humanity and building from there.

**The Cost of Visibility**

Being a visible organizer in a small town means accepting that everything you do becomes political. Your grocery store trips become opportunities for difficult conversations. Your children's teachers know your politics. Your activism affects your entire family.

I learned to balance transparency with strategic thinking, knowing when to step forward and when to let others lead. Sometimes the most radical thing you can do is step back and create space for voices that can speak more safely than yours.

**Technology as an Organizing Tool**

Even in rural communities, digital tools became essential. Social media helped us connect isolated progressives. Automated text systems coordinated voters. Simple websites made information accessible to people who couldn't attend meetings.

But technology had to be accessible—assuming everyone had smartphones or reliable internet was a mistake that excluded the very people we aimed to serve.

**Building Infrastructure for the Long Term**

The most important lesson: sustainable movements require infrastructure that outlasts individual organizers. We built systems for communication, decision-making, and resource sharing that could function even when key people moved away or burned out.

**Lessons for Organizers Everywhere**

Small-town organizing taught me patience, humility, and the power of authentic relationship-building. These lessons serve me now in digital spaces, where the same principles apply: listen first, build trust slowly, and remember that lasting change happens through sustained relationship, not viral moments.`,
      publishDate: '2024-01-28',
      readTime: '10 min read',
      tags: ['Activism', 'Southern Politics', 'Community Organizing', 'Rural Justice'],
      featured: true
    },
    {
      id: 'invisible-disabilities-entrepreneurship',
      title: 'Building a Business with Invisible Disabilities: The Spoon Theory Meets Entrepreneurship',
      series: 'invisible-disabilities',
      excerpt: 'How chronic illness and neurodivergence shaped my approach to business building, client work, and sustainable success.',
      content: `Entrepreneurship advice rarely accounts for chronic illness, ADHD, or trauma responses. Most business gurus assume unlimited energy, consistent cognitive function, and the ability to "hustle" without physical or emotional consequences.

As someone managing multiple invisible disabilities, I had to completely reimagine what sustainable business growth looks like.

**The Spoon Theory in Practice**

Christine Miserandino's spoon theory revolutionized how I think about energy management. Some days I have twelve spoons, others I wake up with three. Traditional business advice assumes you wake up with the same number of spoons every day and can borrow from tomorrow if needed.

That's not how chronic illness works.

I built my business around variable capacity. Some weeks I can take on complex projects and work long hours. Other weeks, maintaining basic operations is an achievement. Both are valid business modes.

**Sliding Scale Everything**

My pricing reflects the reality that both my capacity and my clients' financial situations fluctuate. Sliding scale pricing isn't just social justice—it's practical business strategy that acknowledges human complexity.

When I'm having a high-energy month, I can take on lower-paying passion projects. When I need higher compensation to offset reduced hours, premium pricing helps maintain revenue during recovery periods.

**Automation as Accommodation**

Every automated system in my business serves double duty as an accessibility accommodation. Email sequences handle client communication when I can't. Project management systems track details my brain might forget. Scheduling tools prevent the cognitive load of constant coordination.

This isn't just about efficiency—it's about creating business systems that function regardless of my daily capacity.

**Redefining Professional Communication**

I've normalized conversations about energy management, recovery time, and working within limitations. Clients know that some days I respond to emails immediately, others I need 48 hours. They know I build buffer time into projects and that my work quality doesn't suffer—it's actually enhanced by honest capacity management.

**The Business Case for Accommodation**

Accommodating invisible disabilities isn't just ethical—it's profitable. When I honor my limitations, I produce better work, maintain stronger client relationships, and avoid the boom-bust cycles that destroy so many businesses.

My chronic illness taught me to build for sustainability, not just growth.

**Creating Inclusive Client Experiences**

Understanding my own access needs made me better at serving neurodivergent and chronically ill clients. I design project timelines with flexibility. I offer multiple communication options. I check in about capacity without making assumptions.

Many of my best client relationships have been with other entrepreneurs managing invisible disabilities who needed a service provider who understood the reality of variable capacity.

**Advice for Entrepreneurs with Invisible Disabilities**

1. Build your business around your worst days, not your best days
2. Automate ruthlessly—technology is accommodation
3. Price for sustainability, not competition
4. Communicate your needs clearly and early
5. Find community with other entrepreneurs who share your experiences

**The Ripple Effect**

Building an accessible business practice has taught me that accommodation benefits everyone. The systems I built for my ADHD brain help overwhelmed clients manage complex projects. The flexibility I needed during flare-ups helps parents juggle childcare emergencies.

Universal design in business creates better experiences for everyone.`,
      publishDate: '2024-02-20',
      readTime: '9 min read',
      tags: ['Chronic Illness', 'ADHD', 'Entrepreneurship', 'Accessibility'],
      featured: true
    },
    {
      id: 'trauma-informed-technology',
      title: 'Building Trauma-Informed Digital Spaces: What Tech Workers Need to Know',
      series: 'invisible-disabilities',
      excerpt: 'How understanding trauma responses changed my approach to user experience design and client service.',
      content: `Most technology is designed by people who haven't experienced significant trauma, for users assumed to have regulated nervous systems. This creates digital spaces that can be actively harmful to trauma survivors.

As both a trauma survivor and technologist, I've learned to build with nervous system responses in mind...`,
      publishDate: '2024-03-05',
      readTime: '11 min read',
      tags: ['Trauma-Informed Design', 'UX', 'Mental Health', 'Technology']
    },
    {
      id: 'black-liberation-fund-lessons',
      title: 'What I Learned Building Digital Infrastructure for Black Liberation',
      series: 'southern-activist-chronicles',
      excerpt: 'Technical lessons and political insights from creating digital tools that serve liberation movements.',
      content: `Building technology for social justice requires different priorities than building for profit. Security, accessibility, and community ownership become paramount...`,
      publishDate: '2024-01-10',
      readTime: '15 min read',
      tags: ['Social Justice', 'Technology', 'Black Liberation', 'Digital Security']
    }
  ]

  const blogSeries = [
    { id: 'all', label: 'All Posts', icon: '📚', description: 'Every story, every lesson' },
    { 
      id: 'diagnosis-after-40', 
      label: 'Diagnosis After 40', 
      icon: '🧠',
      description: 'Finding ADHD voice, executive dysfunction solutions, and building systems that work'
    },
    { 
      id: 'southern-activist-chronicles', 
      label: 'Southern Activist Chronicles', 
      icon: '✊🏾',
      description: 'Community organizing in small towns and building inclusive spaces in traditional communities'
    },
    { 
      id: 'invisible-disabilities', 
      label: 'Living with Invisible Disabilities', 
      icon: '🌙',
      description: 'Navigating social spaces, entrepreneurship, and teaching others about invisible disabilities'
    }
  ]

  const filteredPosts = selectedSeries === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.series === selectedSeries)

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="text-h1 animate-fade-in">📝 Southern Roots, Modern Blooms</h2>
          <p className="text-body-lg animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
            Personal narrative and community storytelling exploring disability advocacy, 
            Black Southern experience, and the ADHD journey. These are the stories that shaped 
            how I build technology and serve community.
          </p>
        </div>

        {/* Featured Posts */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <h3 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-2xl)' 
          }}>
            ✨ Featured Stories
          </h3>
          
          <div className="grid grid-3 gap-lg">
            {featuredPosts.map((post) => (
              <article key={post.id} className="card animate-slide-up">
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 'var(--space-sm)'
                  }}>
                    <span className="portfolio-tag">
                      {blogSeries.find(s => s.id === post.series)?.icon} {blogSeries.find(s => s.id === post.series)?.label}
                    </span>
                    <span className="text-caption">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                    {post.title}
                  </h3>
                  
                  <p className="text-body" style={{ 
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--space-md)'
                  }}>
                    {post.excerpt}
                  </p>
                  
                  <div className="portfolio-tags" style={{ marginBottom: 'var(--space-md)' }}>
                    {post.tags.map((tag, index) => (
                      <span key={index} className="portfolio-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span className="text-caption" style={{ color: 'var(--text-muted)' }}>
                      {new Date(post.publishDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <button className="btn btn-ghost" style={{ fontSize: 'var(--text-sm)' }}>
                      Read Story →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Blog Series Navigation */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <h3 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-2xl)' 
          }}>
            📖 Blog Series
          </h3>
          
          <div className="grid grid-2 gap-lg">
            {blogSeries.filter(series => series.id !== 'all').map((series) => (
              <div 
                key={series.id} 
                className={`card-feature ${selectedSeries === series.id ? 'card-highlight' : ''}`}
                onClick={() => setSelectedSeries(series.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="text-center" style={{ marginBottom: 'var(--space-md)' }}>
                  <div style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-md)' }}>
                    {series.icon}
                  </div>
                  <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                    {series.label}
                  </h4>
                  <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                    {series.description}
                  </p>
                </div>
                
                <div className="text-center">
                  <span className="text-caption" style={{ color: 'var(--accent-primary)' }}>
                    {blogPosts.filter(post => post.series === series.id).length} stories
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Series Filter */}
        <div className="category-filter" style={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-sm)',
          marginBottom: 'var(--space-3xl)',
          flexWrap: 'wrap'
        }}>
          {blogSeries.map((series) => (
            <button
              key={series.id}
              className={`btn ${selectedSeries === series.id ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setSelectedSeries(series.id)}
              style={{ fontSize: 'var(--text-sm)' }}
            >
              {series.icon} {series.label}
            </button>
          ))}
        </div>

        {/* All Posts */}
        <div className="blog-posts-grid">
          {filteredPosts.map((post) => (
            <article key={post.id} className="card animate-slide-up" style={{ marginBottom: 'var(--space-lg)' }}>
              <div className="grid grid-2 gap-lg">
                <div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 'var(--space-sm)'
                  }}>
                    <span className="portfolio-tag">
                      {blogSeries.find(s => s.id === post.series)?.icon} {blogSeries.find(s => s.id === post.series)?.label}
                    </span>
                    <span className="text-caption">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                    {post.title}
                  </h3>
                  
                  <p className="text-body" style={{ 
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--space-md)'
                  }}>
                    {post.excerpt}
                  </p>
                  
                  <div className="portfolio-tags" style={{ marginBottom: 'var(--space-md)' }}>
                    {post.tags.map((tag, index) => (
                      <span key={index} className="portfolio-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ 
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-md)',
                    marginBottom: 'var(--space-md)',
                    border: '1px solid var(--border-secondary)'
                  }}>
                    <p className="text-body" style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5
                    }}>
                      {post.content.substring(0, 200)}...
                    </p>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span className="text-caption" style={{ color: 'var(--text-muted)' }}>
                      {new Date(post.publishDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <button className="btn btn-secondary">
                      Read Full Story →
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="section-divider"></div>

        {/* Newsletter Signup */}
        <div className="card text-center">
          <h3 className="text-h2" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-lg)' }}>
            🌸 Stay Connected to the Journey
          </h3>
          <p className="text-body-lg" style={{ marginBottom: 'var(--space-lg)' }}>
            Authentic stories about building healing-centered technology, navigating neurodivergence, 
            and creating accessible digital spaces. Delivered when there's something meaningful to share.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: 'var(--space-md)', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-md)'
          }}>
            <button className="btn btn-primary">
              Subscribe to Stories 📧
            </button>
            <button className="btn btn-secondary">
              RSS Feed 📡
            </button>
          </div>
          <p className="text-caption" style={{ color: 'var(--text-muted)' }}>
            No spam, no sales pitches, no artificial posting schedules. Just real stories when they're ready to be told.
          </p>
        </div>
      </div>
    </section>
  )
}

export default BlogSection 