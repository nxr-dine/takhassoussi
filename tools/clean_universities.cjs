const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'src', 'app', 'data', 'universities.json')
let text = fs.readFileSync(filePath, 'utf8')

// Fix literal escaped unicode sequences that encode control chars (e.g. "\\u0000")
text = text.replace(/\\u0000/g, '')
text = text.replace(/\\u0003/g, '')
text = text.replace(/\\u00/g, '')

let data
try {
  data = JSON.parse(text)
} catch (err) {
  console.error('JSON parse error after unescaping:', err.message)
  process.exit(1)
}

function cleanStr(s) {
  if (typeof s !== 'string') return s
  // remove remaining C0 control chars including NUL
  s = s.replace(/[\x00-\x1F\x7F]/g, '')
  // collapse multiple spaces
  s = s.replace(/\s+/g, ' ').trim()
  return s
}

function dedupeAliases(arr) {
  if (!Array.isArray(arr)) return arr
  const seen = new Set()
  const out = []
  for (let a of arr) {
    a = cleanStr(a)
    if (!a) continue
    const key = a.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(a)
  }
  return out
}

for (const entry of data) {
  if (entry.name) entry.name = cleanStr(entry.name)
  if (entry.etbCode) entry.etbCode = cleanStr(entry.etbCode)
  if (entry.wilayas && Array.isArray(entry.wilayas)) entry.wilayas = entry.wilayas.map(cleanStr)
  if (entry.sampleMajors && Array.isArray(entry.sampleMajors)) entry.sampleMajors = entry.sampleMajors.map(cleanStr)
  if (entry.aliases) entry.aliases = dedupeAliases(entry.aliases)
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
console.log('CLEANED', filePath)
