const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'src', 'app', 'data', 'universities.json')
const raw = fs.readFileSync(filePath, 'utf8')
const data = JSON.parse(raw)

function stripPunct(s) {
  return s.replace(/[\p{P}\p{S}]/gu, '')
}

function asciiFold(s) {
  // basic accent folding
  return s.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

function words(s) {
  return s.split(/\s+/).filter(Boolean)
}

function addVariants(entry) {
  const aliases = new Set(entry.aliases || [])
  const name = entry.name || ''
  const folded = asciiFold(name)
  aliases.add(name)
  aliases.add(folded)
  aliases.add(name.toLowerCase())
  aliases.add(folded.toLowerCase())

  // English/French small translations
  const eng = folded.replace(/\bUniversite\b/gi, 'University').replace(/\bEcole\b/gi, 'School').replace(/\bInstitut\b/gi, 'Institute')
  aliases.add(eng)
  aliases.add(eng.toLowerCase())

  const frShort = folded.replace(/\bUniversite\b/gi, 'Univ').replace(/\bEcole Nationale Superieure\b/gi, 'ENS').replace(/\bEcole Superieure\b/gi, 'ES')
  aliases.add(frShort)
  aliases.add(frShort.toLowerCase())

  // compact/no-space forms
  aliases.add(folded.replace(/\s+/g, ''))
  aliases.add(folded.replace(/\s+/g, '').toLowerCase())

  // with/without dots
  aliases.add(folded.replace(/\./g, ''))

  // etbCode and wilaya tokens
  if (entry.etbCode) aliases.add(entry.etbCode)
  if (entry.wilayas && Array.isArray(entry.wilayas)) {
    for (const w of entry.wilayas) {
      if (w && w !== '—') {
        aliases.add(w)
        aliases.add(w.toLowerCase())
        aliases.add(asciiFold(w).toLowerCase())
      }
    }
  }

  // plausible small misspellings: drop one vowel from each word
  const ws = words(folded)
  for (let i = 0; i < ws.length; i++) {
    const w = ws[i]
    const mv = w.replace(/[aeiouyAEIOUYàáâãäåèéêëìíîïòóôõöùúûüç]/, '')
    if (mv !== w) {
      const copy = [...ws]
      copy[i] = mv
      aliases.add(copy.join(' '))
      aliases.add(copy.join(' ').toLowerCase())
    }
  }

  // swap adjacent letters in full name (one swap)
  const joined = folded
  for (let i = 0; i < Math.min(6, joined.length - 1); i++) {
    const arr = joined.split('')
    const t = arr[i]
    arr[i] = arr[i+1]
    arr[i+1] = t
    aliases.add(arr.join(''))
  }

  // clean, dedupe, minimal length filter
  const cleaned = Array.from(aliases).map(a => {
    if (typeof a !== 'string') return ''
    let s = a.trim()
    s = asciiFold(s)
    s = s.replace(/[\x00-\x1F\x7F]/g, '')
    s = s.replace(/\s+/g, ' ')
    return s
  }).filter(s => s && s.length > 1)

  // final dedupe case-insensitive, preserve mixed-case originals
  const seen = new Map()
  for (const s of cleaned) {
    const key = s.toLowerCase()
    if (!seen.has(key)) seen.set(key, s)
  }
  entry.aliases = Array.from(seen.values()).slice(0, 300)
}

for (const entry of data) {
  try {
    addVariants(entry)
  } catch (err) {
    console.error('entry error', entry.id, err && err.message)
  }
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
console.log('ENRICHED', filePath)
