# Midnight Magnolia Code Consolidation

## Canonical Frontend
- Use `MidnightMagnolia-2/` as the active React + Express workspace.
- Duplicate folder `MidnightMagnolia-2 2/` kept for reference only; contains archival copies of Blog/Gallery pages now ported into the primary app.

## Newly Added Routes
- `/blog` renders Notion-powered "Mystical Musings" page (`client/src/pages/blog.tsx`).
- `/gallery` delivers the Adobe Portfolio art showcase with tabs for Illustrations, Tarot, Mixed Media, and Digital pieces (`client/src/pages/gallery.tsx`).
- Navigation links updated to point to these dedicated pages; homepage still offers anchored highlights for quick scrolling.

## Next Steps
1. Remove `MidnightMagnolia-2 2/` or archive externally once verified no additional unique assets are needed.
2. Wire Blog/Gallery CTAs to live content feeds (Notion API, Adobe embeds) and track analytics events if desired.
3. Continue porting any outstanding changes from reference copies before deleting the duplicate directory.
