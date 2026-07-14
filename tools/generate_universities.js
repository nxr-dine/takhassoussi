const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'src', 'app', 'data', 'programs.ts');
const out = path.join(__dirname, '..', 'src', 'app', 'data', 'universities.json');

function normalize(s){
  return s.normalize('NFKD').replace(/\p{Diacritic}/gu, '');
}

function mkAcronym(name){
  const words = name.replace(/[^\p{L}\s]/gu,'').split(/\s+/).filter(Boolean);
  const initials = words.filter(w=>w.length>2).map(w=>w[0].toUpperCase()).join('');
  if(initials.length>=2) return initials;
  return words.map(w=>w[0].toUpperCase()).join('');
}

function genMisspellings(name){
  const out = new Set();
  const n = normalize(name).toLowerCase();
  out.add(n.replace(/\s+/g,'')); // remove spaces
  out.add(n.replace(/é/g,'e'));
  out.add(n.replace(/è/g,'e'));
  // drop a vowel
  out.add(n.replace(/[aeiouy]/,''));
  out.add(n.replace(/[aeiouy]/g,''));
  // simple adjacent swap for first two letters
  if(n.length>2) out.add(n[1]+n[0]+n.slice(2));
  return Array.from(out).slice(0,6);
}

const raw = fs.readFileSync(p,'utf8');
const start = raw.indexOf('[');
const end = raw.lastIndexOf(']');
if(start===-1||end===-1) throw new Error('Failed to find array in programs.ts');
const arrText = raw.slice(start, end+1);
const programs = JSON.parse(arrText);

const byEtb = new Map();
for(const pr of programs){
  const etb = pr.etb && pr.etb.trim() ? pr.etb.trim() : pr.etbCode || 'Unknown';
  if(!byEtb.has(etb)) byEtb.set(etb, {name: etb, codes: new Set(), wilayas: new Set(), samples: new Set()});
  const rec = byEtb.get(etb);
  if(pr.etbCode) rec.codes.add(pr.etbCode);
  if(pr.wilaya) rec.wilayas.add(pr.wilaya);
  if(pr.major) rec.samples.add(pr.major);
}

const universities = [];
for(const [etb, info] of byEtb.entries()){
  const name = info.name;
  const codes = Array.from(info.codes);
  const wilayas = Array.from(info.wilayas).filter(Boolean);
  const samples = Array.from(info.samples).slice(0,6);

  const aliases = new Set();
  aliases.add(name);
  aliases.add(name.replace(/^Univ\.\s*/i,'Universite '));
  aliases.add(name.replace(/^Univ\.?\s*/i,'University '));
  aliases.add(name.replace(/^Ecole\s+/i,'Ecole '));
  // Arabic and English heuristics
  aliases.add(normalize(name));
  aliases.add(name.toLowerCase());
  const acr = mkAcronym(name);
  if(acr) aliases.add(acr);
  if(codes.length) aliases.add(codes[0]);
  for(const w of wilayas) aliases.add(w);
  // common expansions
  aliases.add(name.replace(/Univ\./ig,'Univ'));

  // generate misspellings
  for(const m of genMisspellings(name)) aliases.add(m);

  // remove empty/duplicates and keep concise
  const finalAliases = Array.from(aliases).filter(Boolean).map(s=>String(s).trim()).filter((v,i,a)=>a.indexOf(v)===i).slice(0,40);

  universities.push({
    id: universities.length+1,
    name: name,
    etbCode: codes[0] || null,
    wilayas,
    sampleMajors: samples,
    aliases: finalAliases
  });
}

fs.writeFileSync(out, JSON.stringify(universities, null, 2), 'utf8');
console.log('WROTE', out);
