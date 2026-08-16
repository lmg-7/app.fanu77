const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /const \[isDeepDark, setIsDeepDark\] = useState\(\(\) => \{\n    return localStorage.getItem\('app_deep_dark'\) === 'true';\n  \}\);/,
  `const [isDeepDark, setIsDeepDark] = useState(() => {
    const saved = localStorage.getItem('app_deep_dark');
    return saved !== null ? saved === 'true' : true;
  });`
);

fs.writeFileSync('src/App.tsx', code);
