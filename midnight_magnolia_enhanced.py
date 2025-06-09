import pandas as pd
import xlsxwriter
from datetime import datetime

def create_enhanced_workbook():
    """Creates an enhanced Midnight Magnolia workbook with emojis and visual elements"""
    
    # Create workbook with custom formatting
    workbook = xlsxwriter.Workbook('MidnightMagnolia_Enhanced_WithDiagrams.xlsx')
    
    # Define brand colors
    brand_colors = {
        'midnight_blue': '#0A192F',
        'magnolia_white': '#FAF3E0',
        'sage_green': '#A3B18A',
        'warm_gray': '#D4B99F',
        'gold': '#D4AF37'
    }
    
    # Define formats
    header_format = workbook.add_format({
        'font_name': 'Playfair Display',
        'font_size': 14,
        'bold': True,
        'bg_color': brand_colors['midnight_blue'],
        'font_color': brand_colors['magnolia_white'],
        'align': 'center',
        'valign': 'vcenter',
        'border': 1
    })
    
    cell_format = workbook.add_format({
        'font_name': 'Lora',
        'font_size': 11,
        'text_wrap': True,
        'valign': 'top',
        'border': 1
    })
    
    accent_format = workbook.add_format({
        'font_name': 'Montserrat',
        'font_size': 10,
        'bg_color': brand_colors['magnolia_white'],
        'border': 1
    })
    
    # Sheet 1: 🌸 Automations
    sheet1 = workbook.add_worksheet('🌸 Automations')
    sheet1.set_column('A:A', 40)
    sheet1.set_column('B:D', 30)
    
    automations_data = [
        ['🤖 Automation Name', '⚡ Trigger', '🎯 Action', '🛠️ Tool'],
        ['💌 New Lead Capture → Airtable Sync', '✨ New Contact in HubSpot or Form Submission', '📝 Create record in Airtable → Table: `Leads`', '🔧 Make.com or Zapier'],
        ['🔄 Airtable Update → HubSpot Sync', '📊 New/Updated Record in Airtable', '🎯 Find & update matching HubSpot contact', '🔧 Make.com or Zapier'],
        ['🚀 Product Launch Pipeline', '📦 New record in `Product Pipeline`', '💼 Create Deal + Tasks in HubSpot', '🔧 Make.com'],
        ['📧 Email Marketing Segmentation', '🏷️ Airtable Record with tags/tiers', '📮 Add to HubSpot email lists', '🔧 Make.com'],
        ['📅 Client Tracking (Calendly Flow)', '🗓️ New Booking in Calendly', '✅ Add to `Clients` + Update HubSpot', '🔧 Calendly → Make.com']
    ]
    
    for row_num, row_data in enumerate(automations_data):
        for col_num, cell_data in enumerate(row_data):
            if row_num == 0:
                sheet1.write(row_num, col_num, cell_data, header_format)
            else:
                sheet1.write(row_num, col_num, cell_data, cell_format)
    
    # Sheet 2: 🌙 Automation Workflows (with diagram)
    sheet2 = workbook.add_worksheet('🌙 Automation Workflows')
    sheet2.set_column('A:A', 35)
    sheet2.set_column('B:E', 25)
    
    workflows_data = [
        ['🔮 Workflow Name', '⚡ Trigger Type', '🎬 Actions', '💰 Monthly Cost ($)', '📝 Integration Notes'],
        ['🔄 Airtable → Notion Sync', '⏰ Scheduled', '📊 Sync records to Notion DB', '10', '✅ Daily at midnight'],
        ['💌 HubSpot → Notion CRM', '🪝 Webhook', '📝 Capture lead → Add to CRM', '10', '⚡ Real-time sync'],
        ['📦 Shopify → Notion Inventory', '⏰ Scheduled', '📈 Update stock levels', '15', '🕐 Every 4 hours'],
        ['📧 Notion → Email Campaign', '🎯 Manual', '📮 Generate email list', '5', '🌸 Weekly sends'],
        ['📅 Calendly → Notion Tasks', '🪝 Webhook', '✅ Create task for booking', '10', '⚡ Instant creation'],
        ['🎨 Canva → Notion Content', '⏰ Scheduled', '🖼️ Sync design assets', '10', '🌙 Nightly backup'],
        ['💳 Stripe → Notion Revenue', '🪝 Webhook', '💰 Log transactions', '15', '✨ Payment tracking'],
        ['📊 Analytics → Notion Dashboard', '⏰ Scheduled', '📈 Update metrics', '20', '📅 Weekly reports'],
        ['🔗 URL Shortener → Notion', '🎯 Manual', '📎 Track link performance', '5', '🌸 Campaign tracking']
    ]
    
    for row_num, row_data in enumerate(workflows_data):
        for col_num, cell_data in enumerate(row_data):
            if row_num == 0:
                sheet2.write(row_num, col_num, cell_data, header_format)
            else:
                sheet2.write(row_num, col_num, cell_data, cell_format)
    
    # Add workflow diagram below the data
    sheet2.write(12, 0, '🌸 Workflow Diagram:', header_format)
    sheet2.merge_range(13, 0, 20, 4, '''
    ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
    │  🎯 TRIGGER     │ ──→ │  🔧 MAKE.COM    │ ──→ │  📊 OUTPUT      │
    │                 │     │                 │     │                 │
    │ • Webhook       │     │ • Data Transform│     │ • Notion DB     │
    │ • Schedule      │     │ • Filtering     │     │ • Email List    │
    │ • Manual        │     │ • Routing       │     │ • Reports       │
    └─────────────────┘     └─────────────────┘     └─────────────────┘
    ''', accent_format)
    
    # Sheet 3: 🌙 Brand Info
    sheet3 = workbook.add_worksheet('🌙 Brand Info')
    sheet3.set_column('A:A', 25)
    sheet3.set_column('B:B', 60)
    
    brand_data = [
        ['🌸 Field', '✨ Details'],
        ['💼 Business Name', 'Midnight Magnolia'],
        ['🎯 Mission Statement', 'Empowering entrepreneurs to transform creativity into sustainable income through healing-centered, culturally-rooted digital solutions.'],
        ['💫 Tagline', 'Where Southern Gothic meets Digital Magic'],
        ['🌙 Brand Voice', 'Gentle, poetic, mindful, ancestral, healing-centered'],
        ['🎨 Visual Identity', 'Southern Gothic aesthetic with magnolia blooms, crescent moons, and digital mysticism']
    ]
    
    for row_num, row_data in enumerate(brand_data):
        for col_num, cell_data in enumerate(row_data):
            if row_num == 0:
                sheet3.write(row_num, col_num, cell_data, header_format)
            else:
                sheet3.write(row_num, col_num, cell_data, cell_format)
    
    # Sheet 4: 🎨 Colors
    sheet4 = workbook.add_worksheet('🎨 Colors')
    sheet4.set_column('A:A', 20)
    sheet4.set_column('B:B', 15)
    sheet4.set_column('C:C', 30)
    
    colors_data = [
        ['🌈 Color Name', '🎨 HEX Code', '✨ Usage'],
        ['🌙 Midnight Blue', '#0A192F', '🖼️ Backgrounds, headers'],
        ['🌊 Midnight Teal', '#0A3B4D', '🎨 Gradients, accents'],
        ['🌸 Magnolia White', '#FAF3E0', '📝 Text, highlights'],
        ['🌿 Sage Green', '#A3B18A', '🌱 CTAs, nature elements'],
        ['🤎 Warm Gray', '#D4B99F', '🏛️ Borders, subtle accents'],
        ['✨ Gold', '#D4AF37', '👑 Premium elements, sparkle'],
        ['💜 Deep Purple', '#4A1A5C', '🔮 Mystical elements'],
        ['🌑 Rich Black', '#0D0D0D', '📖 Body text'],
        ['🩸 Blood Orange', '#CC5500', '🔥 Urgent CTAs'],
        ['🥀 Dusty Rose', '#D4A5A5', '🌹 Gentle highlights'],
        ['🌫️ Misty Gray', '#B8B8B8', '☁️ Subtle backgrounds'],
        ['🌾 Antique Ivory', '#FFFFF0', '📜 Paper textures']
    ]
    
    for row_num, row_data in enumerate(colors_data):
        for col_num, cell_data in enumerate(row_data):
            if row_num == 0:
                sheet4.write(row_num, col_num, cell_data, header_format)
            else:
                sheet4.write(row_num, col_num, cell_data, cell_format)
    
    # Sheet 5: 📸 Image Prompts
    sheet5 = workbook.add_worksheet('📸 Image Prompts')
    sheet5.set_column('A:A', 25)
    sheet5.set_column('B:B', 50)
    sheet5.set_column('C:C', 30)
    
    image_data = [
        ['🎨 Title', '📝 Prompt', '🏷️ Theme Keywords'],
        ['🏠 Homepage Hero', 'Southern Gothic mansion with magnolia blooms, crescent moon, misty midnight atmosphere, Spanish moss draping', '🌙 southern gothic, spiritual tech, heritage'],
        ['📚 Product Spotlight', 'Magnolia journal on antique lace tablecloth, digital tablet showing mystical interface, gold accents, candles', '✨ healing, journaling, digital entrepreneur'],
        ['👥 Community Banner', 'Diverse hands holding magnolia petals, moonlight streaming, digital constellation overlay', '🤝 community, ancestral wisdom, connection'],
        ['📧 Email Header', 'Midnight sky with magnolia constellation, subtle tech grid pattern, ethereal glow', '💌 newsletter, mystical, professional'],
        ['🛍️ Shop Collection', 'Victorian writing desk with modern devices, magnolia in crystal vase, tarot cards, golden hour light', '🎯 products, blend old/new, magical realism']
    ]
    
    for row_num, row_data in enumerate(image_data):
        for col_num, cell_data in enumerate(row_data):
            if row_num == 0:
                sheet5.write(row_num, col_num, cell_data, header_format)
            else:
                sheet5.write(row_num, col_num, cell_data, cell_format)
    
    # Sheet 6: 📱 Social Media
    sheet6 = workbook.add_worksheet('📱 Social Media')
    sheet6.set_column('A:A', 20)
    sheet6.set_column('B:B', 45)
    sheet6.set_column('C:C', 35)
    
    social_data = [
        ['🌐 Platform', '🔗 Handle/URL', '💫 Use Case'],
        ['📸 Instagram', '@noirmagnoliasc', '🎥 Visual storytelling, brand aesthetics'],
        ['👤 Facebook', 'facebook.com/midnightmagnoliasc', '🏘️ Community engagement, events'],
        ['🎥 YouTube', '@poetrygirl1013', '📚 Long-form content, tutorials'],
        ['💼 LinkedIn', 'linkedin.com/in/latishavwaters', '👔 Professional networking'],
        ['🎨 Patreon', 'patreon.com/MidnightMagnoliaSC', '💝 Exclusive content, memberships'],
        ['📝 Tumblr', 'midnight-magnoliasc.tumblr.com', '✍️ Blog posts, mood boards'],
        ['🐦 X/Twitter', '@bgconscious', '💭 Quick updates, engagement'],
        ['💻 GitHub', 'github.com/Rumi1013', '🔧 Code projects, templates'],
        ['🎓 Fellowship', 'opensocietyfoundations.org/fellows/latisha-vincent', '🌟 Professional achievements']
    ]
    
    for row_num, row_data in enumerate(social_data):
        for col_num, cell_data in enumerate(row_data):
            if row_num == 0:
                sheet6.write(row_num, col_num, cell_data, header_format)
            else:
                sheet6.write(row_num, col_num, cell_data, cell_format)
    
    # Add Contact Information Sheet
    sheet_contact = workbook.add_worksheet('📧 Contact Info')
    sheet_contact.set_column('A:A', 20)
    sheet_contact.set_column('B:B', 45)
    
    contact_data = [
        ['📧 Type', '✉️ Address'],
        ['💼 Business', 'latisha@midnight-magnolia.com'],
        ['👤 Personal', 'bgconscious@gmail.com'],
        ['🎓 Academic', 'latishavincentwaters@my.tridenttech.edu']
    ]
    
    for row_num, row_data in enumerate(contact_data):
        for col_num, cell_data in enumerate(row_data):
            if row_num == 0:
                sheet_contact.write(row_num, col_num, cell_data, header_format)
            else:
                sheet_contact.write(row_num, col_num, cell_data, cell_format)

    # Sheet 7: 🎨 Brand Board
    sheet7 = workbook.add_worksheet('🎨 Brand Board')
    sheet7.set_column('A:A', 20)
    sheet7.set_column('B:B', 60)
    
    board_data = [
        ['🏷️ Category', '✨ Details'],
        ['💼 Business Name', 'Midnight Magnolia'],
        ['🌙 Tagline', 'A Southern Gothic Digital Sanctuary'],
        ['🎭 Brand Personality', 'Mystical Mentor, Digital Priestess, Southern Sage'],
        ['🎯 Target Audience', 'Soul-led entrepreneurs seeking healing-centered tech solutions'],
        ['🌸 Core Values', 'Liberation • Ancestral Wisdom • Digital Sovereignty • Gentle Growth'],
        ['💫 Brand Promise', 'Transform your creative gifts into sustainable abundance']
    ]
    
    for row_num, row_data in enumerate(board_data):
        for col_num, cell_data in enumerate(row_data):
            if row_num == 0:
                sheet7.write(row_num, col_num, cell_data, header_format)
            else:
                sheet7.write(row_num, col_num, cell_data, cell_format)
    
    # Sheet 8: 💰 Products
    sheet8 = workbook.add_worksheet('💰 Products')
    sheet8.set_column('A:A', 35)
    sheet8.set_column('B:B', 10)
    sheet8.set_column('C:C', 50)
    
    products_data = [
        ['📦 Product Name', '💵 Price', '📝 Description'],
        ['🚀 Digital Entrepreneur Starter Kit', '$37', '📊 Business plan template, content calendar, income tracker, automation guide'],
        ['🎨 Brand Identity Workbook', '$29', '🌸 Visual identity guide, voice development, cultural brand mapping'],
        ['🔮 Tech Witch Toolkit', '$47', '⚡ Automation templates, mystical tech guide, digital ritual practices'],
        ['📚 Content Creation Codex', '$27', '✍️ 30 days of prompts, SEO spells, storytelling templates'],
        ['💎 Premium Bundle', '$97', '✨ All products + bonus meditation tracks + 1:1 setup call']
    ]
    
    for row_num, row_data in enumerate(products_data):
        for col_num, cell_data in enumerate(row_data):
            if row_num == 0:
                sheet8.write(row_num, col_num, cell_data, header_format)
            else:
                sheet8.write(row_num, col_num, cell_data, cell_format)
    
    # Sheet 9: 📚 Membership Tiers
    sheet9 = workbook.add_worksheet('📚 Membership Tiers')
    sheet9.set_column('A:A', 20)
    sheet9.set_column('B:B', 10)
    sheet9.set_column('C:C', 50)
    
    tiers_data = [
        ['🌟 Tier Name', '💰 Price', '🎁 Perks'],
        ['🌱 Magnolia Seed', '$3', '✨ Monthly affirmations, digital wallpapers, community access'],
        ['🌙 Crescent Bloom', '$7', '🔮 Tarot previews, blog access, monthly meditation'],
        ['⭐ Midnight Star', '$17', '📚 All digital products, workshops, priority support'],
        ['👑 Sovereign Soul', '$47', '🎯 Everything + monthly 1:1, custom automations'],
        ['🌺 Legacy Builder', '$97', '💎 White-glove support, done-for-you setups, quarterly strategy']
    ]
    
    for row_num, row_data in enumerate(tiers_data):
        for col_num, cell_data in enumerate(row_data):
            if row_num == 0:
                sheet9.write(row_num, col_num, cell_data, header_format)
            else:
                sheet9.write(row_num, col_num, cell_data, cell_format)
    
    # Sheet 10: ⚙️ Automation Specs (with flowchart)
    sheet10 = workbook.add_worksheet('⚙️ Automation Specs')
    sheet10.set_column('A:F', 20)
    
    specs_data = [
        ['💻 System', '🎯 Function', '🔧 Platform', '⏰ Frequency', '⚡ Trigger', '📤 Output'],
        ['📝 Notion', '🔄 Dashboard sync', '🔧 Make.com', '📅 Daily', '⏰ 12AM EST', '📊 Updated metrics'],
        ['🛍️ Shopify', '📦 New product push', '🔧 Make.com', '⚡ Real-time', '➕ Product created', '📢 Social posts'],
        ['📧 ConvertKit', '💌 Welcome sequence', '🔧 Native', '⚡ Instant', '📝 Form submit', '💕 5-email series'],
        ['📊 Airtable', '📈 Analytics compile', '🔧 Zapier', '📅 Weekly', '📆 Sundays 6PM', '📑 PDF report']
    ]
    
    for row_num, row_data in enumerate(specs_data):
        for col_num, cell_data in enumerate(row_data):
            if row_num == 0:
                sheet10.write(row_num, col_num, cell_data, header_format)
            else:
                sheet10.write(row_num, col_num, cell_data, cell_format)
    
    # Add automation flow diagram
    sheet10.write(7, 0, '🌸 Master Automation Flow:', header_format)
    sheet10.merge_range(8, 0, 16, 5, '''
    🌙 MIDNIGHT MAGNOLIA AUTOMATION ECOSYSTEM 🌸
    
    ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
    │ 📥 INPUTS   │     │ 🔧 PROCESS  │     │ 📤 OUTPUTS  │
    ├─────────────┤     ├─────────────┤     ├─────────────┤
    │ • Forms     │ ──→ │ • Make.com  │ ──→ │ • Notion    │
    │ • Calendly  │     │ • Zapier    │     │ • Email     │
    │ • Shopify   │     │ • Webhooks  │     │ • Airtable  │
    │ • Social    │     │ • APIs      │     │ • Reports   │
    └─────────────┘     └─────────────┘     └─────────────┘
             ↓                   ↓                   ↓
    ✨ Gentle automation that honors your energy ✨
    ''', accent_format)
    
    # Sheet 11: 🖼️ Logos + Alt Info
    sheet11 = workbook.add_worksheet('🖼️ Logos + Alt Info')
    sheet11.set_column('A:A', 30)
    sheet11.set_column('B:B', 50)
    sheet11.set_column('C:C', 25)
    
    logo_data = [
        ['📁 Image File Name', '♿ Alt Text', '🎯 Use Case'],
        ['🌙 MM_Crest_Primary.jpg', 'Midnight Magnolia crest: magnolia bloom with crescent moon in antique frame', '🖥️ Website header, print'],
        ['✨ MM_Icon_Gold.png', 'Gold magnolia bloom icon with mystical sparkles', '📱 Social profiles, favicon'],
        ['🌸 MM_Wordmark.svg', 'Midnight Magnolia in elegant serif font with moon phases', '📄 Documents, invoices'],
        ['💜 MM_Pattern_Dark.png', 'Repeating pattern of moons and magnolias on midnight blue', '🎨 Backgrounds, packaging'],
        ['🌿 MM_Submark.png', 'MM initials intertwined with botanical elements', '📧 Email signatures'],
        ['👑 MM_Badge_Premium.png', 'Ornate circular badge with magnolia and "Premium Member" text', '💎 Membership materials'],
        ['🔮 MM_Watermark.png', 'Subtle magnolia bloom watermark at 20% opacity', '📸 Photo overlays']
    ]
    
    for row_num, row_data in enumerate(logo_data):
        for col_num, cell_data in enumerate(row_data):
            if row_num == 0:
                sheet11.write(row_num, col_num, cell_data, header_format)
            else:
                sheet11.write(row_num, col_num, cell_data, cell_format)
    
    # Sheet 12: 💼 Services
    sheet12 = workbook.add_worksheet('💼 Services')
    sheet12.set_column('A:A', 25)
    sheet12.set_column('B:B', 12)
    sheet12.set_column('C:C', 35)
    sheet12.set_column('D:D', 15)
    sheet12.set_column('E:E', 25)
    
    services_data = [
        ['🎨 Service', '💰 Price', '📝 Description', '📊 Type', '📋 Booking'],
        ['🖥️ Web Design Package', '$699+', '✨ Custom Wix/Shopify design with your soul essence', '🎯 Project', '📝 Request form'],
        ['⚡ Automation Setup', '$499+', '🔧 Make.com flows and template installation', '🛠️ Service', '📅 Calendly'],
        ['🌸 Brand Strategy Session', '$249', '🎯 Clarity mapping + visual system development', '💭 Consultation', '📞 Discovery call'],
        ['📚 VIP Day', '$1,497', '🌟 6-hour intensive: full setup + training', '⏰ Intensive', '📋 Application'],
        ['🌙 Monthly Retainer', '$897', '♾️ Ongoing support, updates, and optimization', '🔄 Recurring', '📄 Contract']
    ]
    
    for row_num, row_data in enumerate(services_data):
        for col_num, cell_data in enumerate(row_data):
            if row_num == 0:
                sheet12.write(row_num, col_num, cell_data, header_format)
            else:
                sheet12.write(row_num, col_num, cell_data, cell_format)
    
    # Sheet 13: ⚖️ Justice Resources
    sheet13 = workbook.add_worksheet('⚖️ Justice Resources')
    sheet13.set_column('A:A', 25)
    sheet13.set_column('B:B', 15)
    sheet13.set_column('C:C', 25)
    sheet13.set_column('D:D', 35)
    sheet13.set_column('E:E', 30)
    
    justice_data = [
        ['📚 Resource Name', '📄 Type', '🎯 Focus Area', '🔗 Website/Link', '🔧 Integration Notes'],
        ['✊ Expungement Guide', '📑 PDF', '🔓 Post-Incarceration', 'midnightmagnolia.com/expunge', '📧 Email gate for download'],
        ['📜 Pardon Application Help', '🌐 Webpage', '🕊️ Reentry Support', 'midnightmagnolia.com/pardon', '🔒 Member-only access'],
        ['💼 Job Search Toolkit', '📦 Bundle', '💰 Economic Justice', 'midnightmagnolia.com/jobs', '🎁 Free with tier 3+'],
        ['🏛️ Know Your Rights', '🎥 Video Series', '⚖️ Legal Education', 'members.midnightmagnolia.com', '📺 Drip content monthly'],
        ['🤝 Community Directory', '📊 Database', '🌍 Mutual Aid', 'midnightmagnolia.com/community', '🔄 User-submitted']
    ]
    
    for row_num, row_data in enumerate(justice_data):
        for col_num, cell_data in enumerate(row_data):
            if row_num == 0:
                sheet13.write(row_num, col_num, cell_data, header_format)
            else:
                sheet13.write(row_num, col_num, cell_data, cell_format)
    
    # Create Summary Dashboard Sheet
    dashboard = workbook.add_worksheet('🌟 Dashboard')
    dashboard.set_column('A:D', 25)
    
    # Dashboard header
    dashboard.merge_range(0, 0, 0, 3, '🌙 MIDNIGHT MAGNOLIA DASHBOARD 🌸', header_format)
    
    # Quick Stats
    dashboard.write(2, 0, '📊 Quick Stats', header_format)
    dashboard.write(3, 0, '💰 Products: 5', accent_format)
    dashboard.write(3, 1, '🌟 Tiers: 5', accent_format)
    dashboard.write(3, 2, '💼 Services: 5', accent_format)
    dashboard.write(3, 3, '⚡ Automations: 6', accent_format)
    
    # Visual Brand Journey
    dashboard.write(5, 0, '🗺️ Brand Journey Map', header_format)
    dashboard.merge_range(6, 0, 14, 3, '''
    🌱 SEED (Awareness)          🌸 BLOOM (Engagement)        🌙 HARVEST (Transformation)
    │                            │                            │
    ├─ Social Media              ├─ Email Nurture            ├─ Premium Membership
    ├─ Blog Content              ├─ Free Resources           ├─ 1:1 Services  
    ├─ SEO Magic                 ├─ Community Access         ├─ Automation Setup
    │                            │                            │
    └────────────────────────────┴────────────────────────────┘
                        ✨ Guided by ancestral wisdom ✨
    ''', accent_format)
    
    # Close workbook
    workbook.close()
    print("✨ Enhanced workbook created successfully!")
    print("🌸 File saved as: MidnightMagnolia_Enhanced_WithDiagrams.xlsx")

# Run the creation
create_enhanced_workbook()
