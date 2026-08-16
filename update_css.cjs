const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

const darkModeCss = `
/* Deep Dark Mode Overrides for Journal Aesthetic */
.dark-mode .glass-panel {
  background: rgba(58, 53, 47, 0.85);
  border: 1px solid rgba(218, 182, 116, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}
.dark-mode .glass-input {
  background: rgba(40, 36, 32, 0.7);
  border: 1px solid rgba(218, 182, 116, 0.2);
  color: #F7F7F7;
}
.dark-mode .glass-input:focus {
  background: rgba(40, 36, 32, 0.9);
  border-color: rgba(218, 182, 116, 0.5);
}
.dark-mode .glass-button {
  background: rgba(58, 53, 47, 0.6);
  border: 1px solid rgba(218, 182, 116, 0.2);
  color: #DFDFDF;
}
.dark-mode .glass-button:hover:not(:disabled) {
  background: rgba(75, 68, 59, 0.8);
  border-color: rgba(218, 182, 116, 0.4);
}
.dark-mode .glass-button-primary {
  background: rgba(218, 182, 116, 0.9);
  color: #222222;
  border: 1px solid rgba(227, 194, 133, 0.8);
  font-weight: 700;
}
.dark-mode .glass-button-primary:hover:not(:disabled) {
  background: rgba(227, 194, 133, 1);
  box-shadow: 0 8px 20px rgba(218, 182, 116, 0.3);
}
`;

code = code.replace(/\/\* Deep Dark Mode Overrides \*\/[\s\S]*$/, darkModeCss);

fs.writeFileSync('src/index.css', code);
