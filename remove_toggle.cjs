const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<motion\.button whileHover=\{\{ scale: 1\.05 \}\} whileTap=\{\{ scale: 0\.95 \}\} onClick=\{\(\) => setIsDeepDark\(!isDeepDark\)\}[\s\S]*?<\/motion\.button>/g,
  ''
);

fs.writeFileSync('src/App.tsx', code);
