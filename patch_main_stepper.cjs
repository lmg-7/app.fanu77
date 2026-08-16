const fs = require('fs');
let code = fs.readFileSync('src/components/MainStepper.tsx', 'utf8');

code = code.replace(/font-manrope/g, 'font-inter');
code = code.replace(/font-sans/g, 'font-inter');

fs.writeFileSync('src/components/MainStepper.tsx', code);
