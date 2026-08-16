const fs = require('fs');
let code = fs.readFileSync('src/components/journal/JournalWizardModal.tsx', 'utf8');

code = code.replace(
  /className="font-fraunces font-semibold text-\[#F5F1E7\] text-\[clamp\(1.7rem,4vw,2.3rem\)\] text-center m-0 mb-\[2.4rem\] drop-shadow-\[0_2px_20px_rgba\(0,0,0,0.4\)\]"/,
  `className="font-cormorant font-bold text-[#FFFFFF] text-[clamp(2rem,4.5vw,2.8rem)] text-center m-0 mb-[3rem]"`
);

code = code.replace(
  /font-fraunces font-medium text-\[1.2rem\] leading-\[1.5\] text-\[#F5F1E7\] m-0 mb-\[1.8rem\]/,
  `font-cormorant font-bold text-[1.5rem] leading-[1.4] text-[#FFFFFF] m-0 mb-[1.8rem]`
);

fs.writeFileSync('src/components/journal/JournalWizardModal.tsx', code);
