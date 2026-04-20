const fs = require('fs');

const path = './js/tools';
const files = fs.readdirSync(path).filter(f => f.endsWith('.js'));

for(let file of files) {
   let p = path + '/' + file;
   let content = fs.readFileSync(p, 'utf8');
   
   // Replace text colors
   content = content.replace(/text-(gray|slate|zinc)-(700|800|900)/g, 'text-slate-200');
   content = content.replace(/text-slate-600/g, 'text-slate-300');
   
   // Replace background colors roughly
   content = content.replace(/bg-white/g, 'bg-slate-800/50');
   content = content.replace(/bg-slate-50/g, 'bg-slate-800/40');
   content = content.replace(/bg-slate-100/g, 'bg-slate-700/50');
   
   // Fix borders
   content = content.replace(/border-slate-200/g, 'border-slate-600/50');
   content = content.replace(/border-white/g, 'border-slate-600/50');
   
   fs.writeFileSync(p, content);
}

console.log("Done replacing light mode classes in tools.");
