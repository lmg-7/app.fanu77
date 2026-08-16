const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the background gradient and blobs
code = code.replace(
  /\{(\/\* Background Animated Blobs for Glass Effect \*\/)\}[\s\S]*?(?=\{\/\* Toast Notification \*\/)/m,
  `{/* Background Image */}
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(34, 30, 26, 0.8), rgba(20, 18, 15, 0.95)), url("https://images.unsplash.com/photo-1601314167099-232717ea2c28?q=80&w=2576&auto=format&fit=crop")'
        }}
      />\n\n      `
);

// Force dark-mode (which we will style in index.css as the journal aesthetic)
code = code.replace(
  /className=\{\`min-h-screen relative font-sans text-white selection:bg-white\/30 pb-20 transition-colors duration-500 \$\{isDeepDark \? 'dark-mode' : ''\}\`\}/,
  `className="min-h-screen relative font-sans text-[#DFDFDF] selection:bg-[#DAB674]/30 pb-20 transition-colors duration-500 dark-mode"`
);

// Replace verification page styles
code = code.replace(/bg-purple-500\/30/g, 'bg-[#DAB674]/30');
code = code.replace(/text-purple-300/g, 'text-[#DAB674]');
code = code.replace(/text-purple-200\/60/g, 'text-[#DAB674]/80');

// Replace progress bar color
code = code.replace(/color: '#a855f7'/g, "color: '#DAB674'");
code = code.replace(/bg-white rounded-full/g, 'bg-[#DAB674] rounded-full');
code = code.replace(/bg-white\/40 blur-\[2px\]/g, 'bg-[#DAB674]/50 blur-[3px]');

// Replace statistics colors
code = code.replace(/fill="#a855f7"/g, 'fill="#DAB674"');
code = code.replace(/fill="#60a5fa"/g, 'fill="#A39C93"');
code = code.replace(/bg-gradient-to-r from-purple-200 to-indigo-200/g, 'bg-gradient-to-r from-[#F7F7F7] to-[#DAB674]');

// Export print styles
code = code.replace(/background: \$\{isDeepDark \? 'linear-gradient.*? \}/, "background: ${isDeepDark ? '#1a1815' : '#221e1a'}");
code = code.replace(/#a855f7/g, '#DAB674');
code = code.replace(/#d8b4fe/g, '#DAB674');
code = code.replace(/#e9d5ff/g, '#DAB674');
code = code.replace(/#f3e8ff/g, '#F7F7F7');

fs.writeFileSync('src/App.tsx', code);
