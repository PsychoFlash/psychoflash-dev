import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for fname in ['Elastic.fla', 'Elastic_new.fla', 'PhysicEngine.as', 'PhysicEngine_Hills.as', 'Elastic.swf']:
    path = os.path.join('public', 'archive', fname)
    if not os.path.exists(path):
        continue
    with open(path, 'rb') as f:
        d = f.read()
    print(f"=====================================\nFILE: {fname} (size: {len(d)})\n=====================================")
    
    # Check if text
    if fname.endswith('.as'):
        print(d.decode('utf-8', errors='ignore'))
        continue
        
    # Search for ActionScript patterns
    chunks = re.findall(rb'([a-zA-Z0-9_\s\+\-\*\/\=\(\)\{\}\[\]\.\:\;\,\'\"\\<\>]{5,})', d)
    meaningful = []
    for c in chunks:
        s = c.decode('latin1', errors='ignore').strip()
        if any(w in s for w in ['_x', '_y', 'speed', 'elastic', 'spring', 'mouse', 'friction', 'gravity', 'Math.', 'onEnterFrame', 'onPress', 'onRelease', 'startDrag', 'stopDrag']):
            meaningful.append(s)
    
    print("\n".join(meaningful[:40]))
