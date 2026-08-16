const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/text-white/g, 'text-[#F7F7F7]');
code = code.replace(/text-gray-[0-9]{3}/g, 'text-[#B0A89C]');
code = code.replace(/border-white\/[0-9]{1,2}/g, 'border-[#DAB674]/20');
code = code.replace(/bg-white\/[0-9]{1,2}/g, 'bg-[#3A352F]/60');

fs.writeFileSync('src/App.tsx', code);
