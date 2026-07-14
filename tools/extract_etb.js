const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'src', 'app', 'data', 'programs.ts');
const s = fs.readFileSync(p, 'utf8');
const re = /"etb":\s*"([^\"]+)"/g;
const arr = [];
let m;
while ((m = re.exec(s)) !== null) arr.push(m[1]);
const uniq = [...new Set(arr)];
const outDir = require('path').join(__dirname, '..', 'tmp');
const fs = require('fs');
try { fs.mkdirSync(outDir, { recursive: true }); } catch (e) {}
const outFile = require('path').join(outDir, 'etb_list.txt');
fs.writeFileSync(outFile, uniq.join('\n'));
console.log('WROTE', outFile);
