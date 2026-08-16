const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /backgroundImage: 'linear-gradient\\(to bottom, rgba\\(34, 30, 26, 0\\.8\\), rgba\\(20, 18, 15, 0\\.95\\)\\), url\\("https:\/\/images\\.unsplash\\.com\/photo-1601314167099-232717ea2c28\?q=80&w=2576&auto=format&fit=crop"\\)'/,
  `backgroundImage: 'linear-gradient(rgba(25,20,18,0.42), rgba(25,20,18,0.42)), url("https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=2000&q=80")'`
);

// update headings in App.tsx to use the new fonts?
// Maybe not necessary, but won't hurt.
code = code.replace(
  /font-sans/g,
  `font-inter`
);
code = code.replace(
  /font-bold tracking-tight drop-shadow-sm/g,
  `font-cormorant font-bold tracking-normal drop-shadow-sm`
);

fs.writeFileSync('src/App.tsx', code);
