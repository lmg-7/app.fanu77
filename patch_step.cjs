const fs = require('fs');
let code = fs.readFileSync('src/components/journal/StepIndicator.tsx', 'utf8');

code = code.replace(/duration-450/g, 'duration-500');

fs.writeFileSync('src/components/journal/StepIndicator.tsx', code);
