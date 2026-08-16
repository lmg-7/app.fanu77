const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/#DAB674/g, '#D7B46A');

fs.writeFileSync('src/App.tsx', code);

// also in MainStepper.tsx
let code2 = fs.readFileSync('src/components/MainStepper.tsx', 'utf8');
code2 = code2.replace(/#C79B5C/g, '#D7B46A');
fs.writeFileSync('src/components/MainStepper.tsx', code2);

// also in index.css
let code3 = fs.readFileSync('src/index.css', 'utf8');
// rgba(218, 182, 116 -> this is #DAB674 roughly
code3 = code3.replace(/218, 182, 116/g, '215, 180, 106');
fs.writeFileSync('src/index.css', code3);

