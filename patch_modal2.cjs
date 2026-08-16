const fs = require('fs');
let code = fs.readFileSync('src/components/journal/JournalWizardModal.tsx', 'utf8');

// Update Entries Card background
code = code.replace(
  /backgroundColor: 'rgba\\(54, 48, 43, 0\\.92\\)'/,
  `background: 'rgba(104,92,81,0.75)',\n              backdropFilter: 'blur(14px)',\n              WebkitBackdropFilter: 'blur(14px)',\n              border: '1px solid rgba(255,255,255,0.08)',\n              borderRadius: '28px'`
);

// Remove the old border and bg classes on entries-card
code = code.replace(
  /rounded-\[24px\] p-6 sm:p-8 border border-\[#D7B46A\]\/25 shadow-2xl backdrop-blur-xl/,
  `p-6 sm:p-8 shadow-2xl`
);

// Update success modal
code = code.replace(
  /background: 'rgba\\(20,17,13,0\\.85\\)'/,
  `background: 'rgba(82,73,65,0.88)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(14px)', borderRadius: '28px', boxShadow: '0 25px 60px rgba(0,0,0,0.35)'`
);

// Update success modal classes
code = code.replace(
  /border border-\[rgba\\(242,236,221,0\\.22\\)\] backdrop-blur-\[20px\] backdrop-saturate-\[140%\]/,
  ``
);
code = code.replace(
  /rounded-\[22px\]/,
  ``
);


fs.writeFileSync('src/components/journal/JournalWizardModal.tsx', code);
