-- Midnight Ritual Helper (AppleScript)
set notionURL to "https://www.notion.so/your-healing-view-page"
do shell script "open " & quoted form of notionURL
do shell script "shortcuts run " & quoted form of "Midnight Ritual"
