import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch_media_catalog.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

queries = [
    'cyber', 'sweet', 'pentera', 'mindfly', 'nba', 'euroleague', 'solties', 'summer', 'קיץ',
    'עדן', 'בן זקן', 'מנורה', 'ארצי', 'קיסריה', 'ארנה', 'פראלימפ', 'starburst', 'astra', 'drone',
    'שס', 'redbull', 'flugtag', 'wiz', 'live', 'concert', 'bts', 'zoom', 'vmix', 'capture'
]

results = {q: [] for q in queries}

for line in lines:
    low = line.lower()
    for q in queries:
        if q.lower() in low:
            results[q].append(line.strip())

with open('scratch_query_results.txt', 'w', encoding='utf-8') as out:
    for q, found in results.items():
        if found:
            out.write(f"\n=== KEYWORD: {q} ({len(found)} matches) ===\n")
            for item in found[:25]:
                out.write(f"  {item}\n")

print("Wrote results to scratch_query_results.txt")
