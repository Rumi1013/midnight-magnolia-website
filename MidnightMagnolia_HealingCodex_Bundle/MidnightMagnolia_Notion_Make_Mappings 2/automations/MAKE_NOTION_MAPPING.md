# Midnight Magnolia — Notion + Make.com Field Mapping Guide

## Required Secrets (.env in Replit and Make's Connection)
- `NOTION_API_KEY` — Notion internal integration token
- `NOTION_DB_PRODUCTS` — Notion database ID for **Product Catalog**
- `NOTION_DB_CONTENT` — Notion database ID for **Content Calendar**

## PRODUCT SYNC (Scenario A)
**Trigger:** Custom Webhook → URL in `MAKE_WEBHOOK_PRODUCT`  
**Next:** Notion → *Create/Update Page* in **Product Catalog**

### JSON Payload (from Replit)
```json
{
  "slug": "soft-steps-90-day",
  "title": "Soft Steps: 90-Day Journal (Digital)",
  "price_cents": 1900,
  "status": "published",
  "type": "Digital",
  "tags": ["journal","healing"]
}
```

### Notion Property Mapping
- `Title` (title): **{{1.body.title}}**
- `Slug` (rich_text): **{{1.body.slug}}**
- `Price (USD)` (number): **{{round(1.body.price_cents / 100; 2)}}**
- `Type` (select): **{{1.body.type}}**
- `Status` (status): map *published* → **Published**, else **Draft**
- `Tags` (multi_select): **{{1.body.tags[]}}**
- `Last Synced` (date): **{{now}}**

> **Upsert tip:** Search the DB by `Slug` first (Notion "Search pages" → Filter by text contains slug). If exists → Update. Else → Create.

## CONTENT SYNC (Scenario B)
**Trigger:** Custom Webhook → URL in `MAKE_WEBHOOK_CONTENT`  
**Next:** Notion → *Create/Update Page* in **Content Calendar**

### JSON Payload
```json
{
  "title": "Midnight Letters — October",
  "excerpt": "Rest is strategy. Creation is power.",
  "cta_url": "https://midnight-magnolia.com/shop",
  "publish_date": "2025-10-15",
  "channel": "Newsletter",
  "tags": ["ai-with-heart","sacred-story"]
}
```

### Notion Mapping
- `Title` (title): **{{1.body.title}}**
- `Excerpt` (rich_text): **{{1.body.excerpt}}**
- `CTA` (url): **{{1.body.cta_url}}**
- `Publish Date` (date): **{{1.body.publish_date}}**
- `Channel` (select): **{{1.body.channel}}**
- `Tags` (multi_select): **{{1.body.tags[]}}**
- `Status` (status): default **Draft** → later set to **Scheduled/Published** by automation.

## BACKUP LOG (Scenario C)
**Trigger:** Custom Webhook → `MAKE_WEBHOOK_BACKUP`  
**Action:** Notion → *Create Page* in a **Backups** DB (optional) with date/time and file URL if available.

---

## Make Modules (Example Order — Scenario A: Product Sync)
1. **Webhook (Custom)** — capture product JSON  
2. **Notion: Search Pages** — filter by Slug contains `{{1.body.slug}}`  
3. **Router**: If found → Update Page; Else → Create Page  
4. **Airtable/Mailchimp (optional)** — fan-out

Use the included `notion_*_schema.json` files as reference when creating properties.