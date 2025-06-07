import React from 'react'
import '../styles/design-system.css'
import { AnimatedCard, InteractiveButton, GlowText } from './MagicUI'

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
  imageUrl?: string
  category: string
}

const BlogSection: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 'oyotunji-pilgrimage',
      title: 'Sacred Journeys: Learning from Oyotunji Village',
      series: 'roots-and-routes',
      excerpt: 'My pilgrimage to Oyotunji African Village in South Carolina opened doorways to understanding Yoruba traditions and connecting with ancestral wisdom in ways I never imagined.',
      content: `The red clay road leading to Oyotunji African Village felt like crossing into sacred time. As the first authentic African village in North America, Oyotunji represents something profound: a return to ancestral ways in the heart of the American South.

My visit wasn't just cultural tourism—it was spiritual archaeology, digging through layers of disconnection to find the wisdom my ancestors carried across the Middle Passage.

**Approaching Sacred Space**

I came to Oyotunji with questions burning in my heart: How do I honor traditions I'm learning about rather than inheriting? How do I distinguish between appropriation and authentic spiritual seeking? How do I approach Yoruba traditions as someone reconnecting rather than someone who grew up in community?

The village elder I spoke with offered wisdom that guides my spiritual practice today: "Your ancestors know you're seeking. They're calling you home. Listen with humility and learn with respect."

**Learning Through Experience**

At Oyotunji, spiritual practice isn't academic—it's lived. I participated in ceremonies that awakened something deep in my cellular memory. The drum rhythms felt familiar in ways my mind couldn't explain but my body recognized.

I learned about the Orishas not through books but through observation, participation, and patient teaching from community elders. Each conversation added layers to my understanding of how African spiritual traditions survived, adapted, and thrived in the diaspora.

**Genealogy Meets Spirituality**

My genealogy research took on new dimensions after Oyotunji. Family stories that seemed like folklore began connecting to broader spiritual and cultural patterns. Names in my family tree resonated with Yoruba traditions. Practices my grandmother did "just because" revealed connections to ancestral wisdom.

The village helped me understand that genealogy isn't just about names and dates—it's about tracking the transmission of wisdom, resilience, and spiritual knowledge across generations.

**Integration and Respect**

Returning home from Oyotunji, I carried new responsibility. I had been entrusted with knowledge that required careful stewardship. I began building daily practices that honored what I learned while remaining humble about my position as a seeker rather than a traditional practitioner.

This balance—honoring tradition while acknowledging my own learning journey—shapes how I approach all aspects of my spiritual and cultural exploration.

**Technology Meets Tradition**

My visit to Oyotunji also influenced my technology work. I began thinking about how digital tools could support rather than replace traditional ways of learning and connecting. How could I create online spaces that honored the depth and community-centeredness of traditional spiritual education?

This question guides my work with community organizations and spiritual practitioners who want to use technology without losing the essence of their practices.

**Continuing the Journey**

Oyotunji was a beginning, not a destination. It opened pathways for deeper learning and connected me with elders and practitioners who continue to guide my spiritual development. It taught me that coming home to ancestral wisdom is a lifelong journey of learning, service, and deepening connection.

**For Fellow Seekers**

If you're called to explore African diasporic spiritual traditions, approach with humility, patience, and genuine respect. Find community. Learn from elders. Understand that this is not quick work—it's soul work that unfolds over years of dedicated learning and service.

Your ancestors are calling you home. The question is: are you ready to listen?`,
      publishDate: '2024-03-10',
      readTime: '11 min read',
      tags: ['Spirituality', 'Yoruba', 'Ancestral Wisdom', 'African Diaspora'],
      featured: true,
      imageUrl: '/images/blog/oyotunji-pilgrimage-hero.svg',
      category: 'Healing Tech'
    },
    {
      id: 'savannah-spiritual-cartography',
      title: 'Mapping Sacred Sites: Spiritual Cartography in Savannah',
      series: 'roots-and-routes',
      excerpt: 'Walking through Savannah\'s historic squares and hidden corners, I discovered layers of spiritual history that maps don\'t show—stories of resistance, ritual, and resilience.',
      content: `Savannah doesn't just have history—it has layers of spiritual geography that most tourists never see. Beneath the celebrated architecture and ghost tours lies a deeper map of sacred sites, ritual spaces, and centers of spiritual resistance.

My spiritual cartography of Savannah began with genealogy research and evolved into understanding how enslaved ancestors maintained and adapted African spiritual traditions in the coastal South.

**Following Ancestral Footsteps**

My great-great-grandmother lived in the Sea Islands before migrating north. Family stories spoke of her knowledge of "root work" and her reputation as someone who could "see things others couldn't." Walking through Savannah, I felt called to understand the spiritual landscape she would have known.

The Gullah Geechee Cultural Heritage Corridor provided context, but the real education came from conversations with elders, visits to historic Black churches, and quiet moments in squares where spiritual work has been happening for centuries.

**Hidden Histories in Plain Sight**

Savannah's famous squares hold spiritual significance that guidebooks rarely mention. African Americans created sacred spaces within the constraints of enslavement and segregation. Some squares became gathering places for spiritual communities. Others held significance in hoodoo practice and folk healing traditions.

Walking these spaces with spiritual awareness opened my perception to layers of meaning invisible to casual observation. The placement of certain churches, the location of historic healing practices, the routes of Underground Railroad activity—all connected to create a spiritual map of resistance and survival.

**Bonaventure Cemetery: Conversations with Ancestors**

Bonaventure Cemetery became a place of profound communion for me. Beyond its stunning beauty lies a sacred space where conversations with ancestors feel possible in ways they don't elsewhere.

I found graves of people who lived during my great-great-grandmother's time, whose stories helped me understand the spiritual landscape she navigated. I learned about burial traditions that blend Christian symbolism with African spiritual practices, creating syncretic expressions of faith and resistance.

**Learning from Local Practitioners**

The most valuable education came from contemporary practitioners of hoodoo and rootwork who carry forward traditions that connect to historical spiritual communities. These conversations, offered with generosity and discernment, helped me understand how ancestral spiritual practices adapt and survive across generations.

I learned about plants that grow in Savannah's climate and their traditional uses. I discovered how spiritual work adapts to urban environments while maintaining connection to natural cycles and ancestral wisdom.

**Documenting Sacred Geography**

My exploration of Savannah's spiritual landscape became part of my larger ancestral research. I began creating maps—both digital and physical—that track spiritual sites, family connections, and historical contexts that illuminate my ancestors' experiences.

This documentation serves my own learning while contributing to broader efforts to preserve and honor Gullah Geechee cultural heritage and African diasporic spiritual traditions.

**Integration and Practice**

Savannah taught me that spiritual practice isn't separate from place—it's deeply rooted in specific landscapes, plant communities, and cultural histories. My spiritual development requires understanding not just traditions but the places where those traditions were lived and preserved.

**Continuing Research**

Each visit to Savannah reveals new layers of spiritual geography. I continue mapping sacred sites, documenting family connections, and learning from elders who carry forward traditions that connect me to ancestral wisdom.

This work serves both personal spiritual development and broader cultural preservation efforts that honor the profound spiritual heritage of the coastal South.`,
      publishDate: '2024-03-25',
      readTime: '10 min read',
      tags: ['Hoodoo', 'Gullah Geechee', 'Savannah', 'Ancestral Research'],
      featured: true,
      imageUrl: '/images/blog/savannah-spiritual-cartography-hero.svg',
      category: 'Healing Tech'
    },
    {
      id: 'family-photos-digital-archaeology',
      title: 'Digital Archaeology: Mining Family Photos for Ancestral Stories',
      series: 'roots-and-routes',
      excerpt: 'The family photos scattered across Google Drive aren\'t just memories—they\'re spiritual and historical documents that reveal patterns, connections, and wisdom transmitted across generations.',
      content: `The Google Drive folder labeled "Family Pictures" contains more than photographs—it holds archaeological evidence of survival, love, and wisdom transmission across generations of my family.

What started as simple genealogy research evolved into digital archaeology, carefully examining each image for clues about spiritual practices, cultural traditions, and family patterns that shaped who I am today.

**Seeing Beyond the Surface**

Initially, I sorted photos chronologically, trying to build timeline of family history. But deeper examination revealed layers of meaning hidden in plain sight: spiritual objects in background corners, hand positions that suggested ritual knowledge, gathering patterns that spoke to community practices.

My grandmother's kitchen photos, for instance, showed herb gardens visible through windows, specific arrangements of household objects, and subtle indicators of spiritual practices that she never explicitly named but clearly maintained.

**Patterns Across Generations**

Analyzing photos across decades revealed fascinating patterns. Certain poses, expressions, and gathering configurations appeared repeatedly, suggesting unconscious transmission of cultural memory. Women in my family consistently appeared in roles that suggested healing knowledge and spiritual authority.

These patterns helped me understand that what I thought were personal quirks or family coincidences actually connected to broader traditions of resistance, spiritual practice, and cultural preservation.

**The Technology of Memory**

Using digital tools to organize, enhance, and analyze family photos transformed scattered memories into coherent narratives. I created timelines, location maps, and relationship charts that revealed connections invisible when photos existed in isolation.

Advanced photo analysis helped me identify locations, time periods, and even cultural contexts that family stories had obscured or forgotten. Sometimes a building in the background or a detail of clothing provided crucial clues about where and when spiritual learning happened.

**Sacred Objects in Ordinary Spaces**

The most revelatory discoveries came from examining household objects visible in family photos. Arrangements that seemed purely decorative revealed spiritual significance when I understood their cultural context. Plants, mirrors, religious objects, and even furniture placement often reflected spiritual practices and protective traditions.

These discoveries helped me understand that spiritual practice in my family wasn't confined to church or special occasions—it was woven into daily life in ways that required cultural literacy to recognize.

**Conversations Across Time**

Examining family photos became a form of conversation with ancestors. Their choices about what to document, how to pose, and what to include in frames spoke to values, priorities, and knowledge they wanted to preserve.

Some photos felt like deliberate spiritual documentation—ancestors ensuring that future generations would have visual access to practices and traditions they might not be able to transmit through direct teaching.

**Connecting Photos to Genealogy Research**

Combining photo analysis with traditional genealogy research created a more complete picture of family history. Photos provided evidence for family stories, revealed relationships that records didn't capture, and offered cultural context that names and dates couldn't convey.

Most importantly, photos helped me understand how spiritual and cultural traditions traveled through my family line, adapting to different circumstances while maintaining essential wisdom.

**Building Digital Altars**

The photos became foundation for digital altar spaces where I could honor ancestors and maintain connection with family wisdom. Carefully curated collections of images, combined with genealogy research and cultural learning, created sacred digital spaces for ancestral connection.

**Implications for Family Research**

This approach to family photo analysis suggests new methodologies for genealogy research that center cultural and spiritual heritage rather than just bloodlines and dates. Photos become spiritual documents that reveal how wisdom travels across generations.

**Sharing Ancestral Knowledge**

The insights gained from family photo archaeology inform my current work with other families exploring their spiritual and cultural heritage. Digital tools can help recover and preserve ancestral wisdom that might otherwise be lost.

**Continuing Discovery**

Each examination of family photos reveals new layers of meaning. This ongoing digital archaeology continues to inform my spiritual practice, my understanding of family patterns, and my connection to ancestral wisdom that guides my current work and life choices.`,
      publishDate: '2024-04-08',
      readTime: '9 min read',
      tags: ['Genealogy', 'Digital Archives', 'Family History', 'Ancestral Wisdom'],
      imageUrl: '/images/blog/family-photos-digital-archaeology-hero.svg',
      category: 'Healing Tech'
    },
    {
      id: 'southern-homesteads-memorial-carousel',
      title: 'Preserving Sacred Spaces: The Southern Homestead Memorial Project',
      series: 'roots-and-routes',
      excerpt: 'Using AI-generated imagery and family narratives to create digital memorials for ancestral homesteads lost to time, development, and deliberate erasure.',
      content: `Family land tells stories that traditional archives often miss. The southern homesteads where our ancestors built lives, raised families, and maintained spiritual traditions exist now mainly in memory and scattered photographs.

My Southern Homestead Memorial Project uses AI-generated imagery, family narratives, and historical research to create digital memorials for these sacred spaces—preserving their essence for future generations.

**The Inspiration: Great-Grandmother's Land**

The project began with my great-grandmother's homestead in rural South Carolina. Family stories painted vivid pictures: the wide front porch where healing work happened, the kitchen garden filled with medicinal plants, the oak tree that served as a community gathering place.

But the physical homestead was sold decades ago, subdivided for development. The land that held generations of family memories became strip malls and suburban housing.

**AI as Archaeological Tool**

Using AI image generation, I began reconstructing visual representations of ancestral homesteads based on family descriptions, historical research, and period-appropriate architectural details. These aren't exact reproductions—they're spiritual archaeology, creating images that honor the essence and memory of spaces that no longer exist.

The process involves combining family narratives with historical documentation about rural southern architecture, landscape design, and agricultural practices of specific time periods. Each generated image becomes a form of digital memorial.

**The Eulogy Carousel Concept**

The memorial project evolved into an interactive "eulogy carousel"—a digital space where family members could explore generated homestead images while hearing family stories, reading historical context, and understanding the spiritual and cultural significance of these ancestral spaces.

Each homestead image connects to layers of information: family genealogy, oral history recordings, historical documentation, and connections to broader patterns of African American land ownership and loss in the South.

**Technology Meets Oral Tradition**

The carousel design honors the oral tradition of family storytelling while using digital tools to preserve and share these narratives. AI-generated homestead images serve as visual anchors for family stories that might otherwise be lost.

Interactive elements allow family members to add their own memories, stories, and historical research, creating collaborative memorials that grow over time.

**Addressing Land Loss and Displacement**

The project acknowledges the broader context of African American land loss in the South—through discriminatory policies, economic pressure, and sometimes violent displacement. Many families lost ancestral homesteads not through choice but through systemic injustice.

By creating digital memorials, we preserve the spiritual and cultural significance of these spaces even when the physical land is no longer accessible to families.

**Healing Through Digital Memorialization**

For many family members, engaging with AI-generated homestead images provides a form of healing connection to ancestral spaces. The images create opportunities for conversations about family history, spiritual traditions, and cultural heritage that might not happen otherwise.

**Community Connections**

The project connects individual family homesteads to broader community narratives about rural southern Black communities, their spiritual traditions, agricultural practices, and resilience in the face of displacement and discrimination.

**Preserving Spiritual Geography**

Beyond documenting physical structures, the memorial carousel preserves information about spiritual geography: where ritual work happened, how families maintained African diasporic traditions, and how land-based spiritual practices adapted to southern environments.

**Technical Implementation**

The carousel uses responsive web design to create immersive experiences accessible across devices. AI-generated homestead images are carefully curated and culturally contextualized to ensure respectful representation of family heritage.

**Expanding the Project**

What began as personal family research has grown into a resource for other families exploring their own ancestral homestead stories. The methodology provides a template for using digital tools to preserve family land narratives and cultural heritage.

**Future Development**

Planned expansions include virtual reality experiences, integration with genealogy databases, and partnerships with historical societies focused on African American land ownership and community development in the rural South.

**Invitation to Collaboration**

Families interested in creating their own homestead memorials can access templates, AI prompting guidelines, and storytelling frameworks that make this technology accessible for cultural preservation and family heritage work.`,
      publishDate: '2024-04-22',
      readTime: '12 min read',
      tags: ['AI Art', 'Memorial Projects', 'Southern Heritage', 'Land History', 'Digital Preservation'],
      featured: true,
      imageUrl: '/images/blog/southern-homesteads-memorial-carousel-hero.svg',
      category: 'Healing Tech'
    },
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
      featured: true,
      imageUrl: '/images/blog/adhd-diagnosis-liberation-hero.svg',
      category: 'Healing Tech'
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
      tags: ['ADHD', 'Automation', 'Technology', 'Executive Function'],
      imageUrl: '/images/blog/automation-executive-function-hero.svg',
      category: 'Healing Tech'
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
      featured: true,
      imageUrl: '/images/blog/small-town-organizing-hero.svg',
      category: 'Healing Tech'
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
      featured: true,
      imageUrl: '/images/blog/invisible-disabilities-entrepreneurship-hero.svg',
      category: 'Healing Tech'
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
      tags: ['Trauma-Informed Design', 'UX', 'Mental Health', 'Technology'],
      imageUrl: '/images/blog/trauma-informed-technology-hero.svg',
      category: 'Healing Tech'
    },
    {
      id: 'black-liberation-fund-lessons',
      title: 'What I Learned Building Digital Infrastructure for Black Liberation',
      series: 'southern-activist-chronicles',
      excerpt: 'Technical lessons and political insights from creating digital tools that serve liberation movements.',
      content: `Building technology for social justice requires different priorities than building for profit. Security, accessibility, and community ownership become paramount...`,
      publishDate: '2024-01-10',
      readTime: '15 min read',
      tags: ['Social Justice', 'Technology', 'Black Liberation', 'Digital Security'],
      imageUrl: '/images/blog/black-liberation-fund-lessons-hero.svg',
      category: 'Healing Tech'
    },
    {
      id: 'trauma-informed-ai',
      title: 'Designing AI with Nervous System Awareness',
      series: 'invisible-disabilities',
      excerpt: 'How we build technology that honors the wisdom of survival responses and creates space for healing.',
      content: 'Detailed exploration of trauma-informed AI development principles and practices...',
      publishDate: '2024-03-15',
      readTime: '8 min read',
      tags: ['AI', 'Trauma-Informed Design', 'Technology', 'Healing'],
      featured: true,
      imageUrl: '/images/blog/trauma-ai-hero.svg',
      category: 'Healing Tech'
    },
    {
      id: 'southern-gothic-design',
      title: 'Sacred Aesthetics: Southern Gothic in Digital Spaces',
      series: 'roots-and-routes',
      excerpt: 'Exploring how ancestral visual languages can inform modern interface design with soul.',
      content: 'Deep dive into Southern Gothic design principles for digital spaces...',
      publishDate: '2024-03-10',
      readTime: '6 min read',
      tags: ['Design', 'Southern Gothic', 'Aesthetics', 'UI/UX'],
      featured: true,
      imageUrl: '/images/blog/gothic-design-hero.svg',
      category: 'Design Philosophy'
    },
    {
      id: 'community-justice-tech',
      title: 'Technology as Mutual Aid: Lessons from the Soros Fellowship',
      series: 'southern-activist-chronicles',
      excerpt: 'Reflections on building justice resources that center community care and collective liberation.',
      content: 'Lessons learned from the Soros Fellowship about technology and justice work...',
      publishDate: '2024-03-05',
      readTime: '12 min read',
      tags: ['Justice Work', 'Technology', 'Community Care', 'Soros Fellowship'],
      featured: false,
      imageUrl: '/images/blog/community-justice-tech-hero.svg',
      category: 'Justice Work'
    },
    {
      id: 'adhd-workflow-design',
      title: 'Gentle Automation for Neurodivergent Entrepreneurs',
      series: 'diagnosis-after-40',
      excerpt: 'Creating systems that work with our brain patterns rather than against them.',
      content: 'Detailed guide to building ADHD-friendly automation workflows...',
      publishDate: '2024-02-28',
      readTime: '10 min read',
      tags: ['ADHD', 'Automation', 'Neurodivergent', 'Entrepreneurship'],
      featured: false,
      imageUrl: '/images/blog/adhd-workflow-design-hero.svg',
      category: 'Neurodivergent Tech'
    },
    {
      id: 'digital-ancestor-work',
      title: 'Archiving as Ancestor Work: Digital Preservation with Intention',
      series: 'roots-and-routes',
      excerpt: 'How we honor family legacy through thoughtful documentation and sacred storytelling.',
      content: 'Exploration of digital preservation as a form of ancestral honoring...',
      publishDate: '2024-02-20',
      readTime: '9 min read',
      tags: ['Digital Archives', 'Ancestry', 'Heritage', 'Preservation'],
      featured: false,
      imageUrl: '/images/blog/digital-ancestor-work-hero.svg',
      category: 'Heritage Tech'
    },
    {
      id: 'community-care-business',
      title: 'Building Business with Community Care Principles',
      series: 'invisible-disabilities',
      excerpt: 'Sustainable entrepreneurship that prioritizes collective wellbeing over extraction.',
      content: 'Framework for building businesses rooted in community care...',
      publishDate: '2024-02-15',
      readTime: '7 min read',
      tags: ['Community Care', 'Business', 'Sustainability', 'Wellbeing'],
      featured: false,
      imageUrl: '/images/blog/community-care-business-hero.svg',
      category: 'Healing Business'
    }
  ]

  const featuredPosts = blogPosts.filter(post => post.featured)
  const recentPosts = blogPosts.filter(post => !post.featured).slice(0, 4)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Healing Tech': return 'rgba(139, 123, 155, 0.3)'
      case 'Justice Work': return 'rgba(212, 175, 55, 0.3)'
      case 'Design Philosophy': return 'rgba(163, 177, 138, 0.3)'
      case 'Neurodivergent Tech': return 'rgba(255, 203, 55, 0.3)'
      case 'Heritage Tech': return 'rgba(139, 123, 155, 0.3)'
      default: return 'rgba(163, 177, 138, 0.3)'
    }
  }

  return (
    <section className="section">
      <div className="container">
        {/* Enhanced Header */}
        <div className="text-center blog-header">
          <h2 className="text-h1 animate-fade-in">
            <GlowText 
              text="📝 Stories & Wisdom"
              variant="gradient"
              size="xl"
              colors={['var(--accent-primary)', 'var(--lavender-mist)']}
            />
          </h2>
          <p className="text-body-lg animate-slide-up blog-description">
            Reflections on building healing-centered technology, honoring Southern roots, 
            and creating digital spaces that serve liberation.
          </p>
        </div>

        {/* Enhanced Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="featured-posts-section">
            <h3 className="text-h2 featured-posts-title">
              <GlowText 
                text="✨ Featured Stories"
                variant="shimmer"
                size="lg"
                colors={['var(--contrast-gold)', 'var(--accent-primary)']}
              />
            </h3>
            <div className="featured-posts-grid grid grid-2 gap-lg">
              {featuredPosts.map((post, index) => (
                <AnimatedCard 
                  key={post.id}
                  variant="glow"
                  delay={index * 200}
                  glowColor={getCategoryColor(post.category)}
                  className="featured-post-card"
                >
                  <article className="blog-post-card">
                    {post.imageUrl && (
                      <div className="post-image blog-post-image">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                        />
                        <div className="post-category-overlay">
                          <span className="post-category blog-post-category">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="post-content blog-post-content">
                      <h4 className="text-h3 post-title blog-post-title">
                        <GlowText 
                          text={post.title}
                          variant="gradient"
                          size="md"
                        />
                      </h4>
                      <p className="text-body post-excerpt blog-post-excerpt">
                        {post.excerpt}
                      </p>
                      
                      <div className="post-meta blog-post-meta">
                        <span className="post-date text-caption blog-post-date">
                          {new Date(post.publishDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="post-read-time text-caption blog-post-read-time">
                          {post.readTime}
                        </span>
                      </div>
                      
                      <InteractiveButton
                        variant="secondary"
                        magnetic={true}
                        className="post-cta blog-post-cta"
                      >
                        Read Sacred Story →
                      </InteractiveButton>
                    </div>
                  </article>
                </AnimatedCard>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Recent Posts Grid */}
        <div className="recent-posts-section">
          <h3 className="text-h2 recent-posts-title">
            <GlowText 
              text="🌙 Recent Reflections"
              variant="glow"
              size="lg"
            />
          </h3>
          <div className="recent-posts-grid grid grid-2 gap-md">
            {recentPosts.map((post, index) => (
              <AnimatedCard 
                key={post.id}
                variant="float"
                delay={index * 150}
                glowColor={getCategoryColor(post.category)}
                className="recent-post-card"
              >
                <article className="blog-post-card compact">
                  <div className="post-content blog-post-content">
                    <div className="post-header">
                      <span className="post-category blog-post-category">
                        {post.category}
                      </span>
                      <span className="post-read-time text-caption blog-post-read-time">
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h4 className="text-h4 post-title blog-post-title">
                      <GlowText 
                        text={post.title}
                        variant="gradient"
                        size="sm"
                      />
                    </h4>
                    <p className="text-body-sm post-excerpt blog-post-excerpt">
                      {post.excerpt}
                    </p>
                    
                    <div className="post-footer">
                      <span className="post-date text-caption blog-post-date">
                        {new Date(post.publishDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      
                      <InteractiveButton
                        variant="ghost"
                        size="sm"
                        className="post-cta blog-post-cta"
                      >
                        Read →
                      </InteractiveButton>
                    </div>
                  </div>
                </article>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* Enhanced Newsletter Signup */}
        <AnimatedCard variant="glow" glowColor="rgba(255, 203, 55, 0.2)">
          <div className="newsletter-signup blog-newsletter">
            <div className="text-center">
              <h3 className="text-h2 newsletter-title blog-newsletter-title">
                <GlowText 
                  text="🌸 Join the Healing Circle"
                  variant="gradient"
                  size="lg"
                  colors={['var(--accent-primary)', 'var(--sage-green)']}
                />
              </h3>
              <p className="text-body-lg newsletter-description blog-newsletter-description">
                Receive monthly reflections on building healing-centered technology, 
                along with resources for community care and digital liberation.
              </p>
              
              <div className="newsletter-form blog-newsletter-form">
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Your sacred email address"
                    className="email-input blog-email-input"
                  />
                  <InteractiveButton
                    variant="magic"
                    glow={true}
                    className="newsletter-cta blog-newsletter-cta"
                  >
                    ✨ Join Circle
                  </InteractiveButton>
                </div>
                <p className="text-caption newsletter-privacy blog-newsletter-privacy">
                  We honor your inbox with gentle boundaries. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Enhanced View All Posts CTA */}
        <div className="text-center blog-view-all">
          <p className="text-body-lg">
            Dive deeper into our digital sanctuary of stories
          </p>
          <InteractiveButton
            variant="secondary"
            size="lg"
            magnetic={true}
          >
            🏛️ Explore Full Archive
          </InteractiveButton>
        </div>
      </div>
    </section>
  )
}

export default BlogSection 