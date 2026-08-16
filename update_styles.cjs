const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

const imports = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Inter:wght@400;500;600&display=swap');\n`;

code = imports + code;

code += `\n.font-cormorant {\n  font-family: 'Cormorant Garamond', serif;\n}\n\n.font-inter {\n  font-family: 'Inter', sans-serif;\n  letter-spacing: 0.2px;\n}\n`;

fs.writeFileSync('src/index.css', code);
