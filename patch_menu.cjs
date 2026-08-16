const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add Menu, ChevronDown to imports
code = code.replace(
  /import \{ CheckCircle2, ArrowLeft, RotateCcw, Clock, Download, BarChart2, X, Flame, Check, BookHeart, Bell, Plus, Trash2, Moon, Sun, Share2, Lock, Mail, ShieldAlert, LogOut, Loader2, Sparkles, KeyRound \} from 'lucide-react';/,
  `import { CheckCircle2, ArrowLeft, RotateCcw, Clock, Download, BarChart2, X, Flame, Check, BookHeart, Bell, Plus, Trash2, Moon, Sun, Share2, Lock, Mail, ShieldAlert, LogOut, Loader2, Sparkles, KeyRound, Menu, ChevronDown } from 'lucide-react';`
);

// 2. Add isMenuOpen state
code = code.replace(
  /const \[isStatsOpen, setIsStatsOpen\] = useState\(false\);/,
  `const [isStatsOpen, setIsStatsOpen] = useState(false);\n  const [isMenuOpen, setIsMenuOpen] = useState(false);`
);

// 3. Replace the Top Actions buttons with a dropdown
const topActionsRegex = /<div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 w-full md:w-auto">.*?<\/div>\s*\{\/\* Daily Streak/s;
const topActionsReplacement = `<div className="relative w-full md:w-auto z-40">
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="glass-button px-4 py-2.5 flex items-center gap-2 text-sm font-bold hover:bg-[#3A352F]/60 justify-center w-full md:w-auto"
            >
              <Menu className="w-5 h-5" />
              <span>القائمة</span>
              <ChevronDown className={\`w-4 h-4 transition-transform \${isMenuOpen ? 'rotate-180' : ''}\`} />
            </motion.button>

            <AnimatePresence>
              {isMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsMenuOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 glass-panel py-2 z-50 flex flex-col gap-1 shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-[#DAB674]/20 origin-top-right"
                    style={{ backgroundColor: 'rgba(58, 53, 47, 0.95)' }}
                  >
                    <button onClick={() => { setIsStatsOpen(true); setIsMenuOpen(false); }} className="w-full text-right px-4 py-2.5 hover:bg-white/10 flex items-center gap-3 transition-colors text-sm font-bold">
                      <BarChart2 className="w-4 h-4 text-[#DAB674]" /> إحصائيات
                    </button>
                    <button onClick={() => { setIsJournalOpen(true); setIsMenuOpen(false); }} className="w-full text-right px-4 py-2.5 hover:bg-white/10 flex items-center gap-3 transition-colors text-sm font-bold">
                      <BookHeart className="w-4 h-4 text-[#DAB674]" /> المذكرات
                    </button>
                    <button onClick={() => { setIsReminderOpen(true); setIsMenuOpen(false); }} className="w-full text-right px-4 py-2.5 hover:bg-white/10 flex items-center gap-3 transition-colors text-sm font-bold">
                      <Bell className="w-4 h-4 text-[#DAB674]" /> تذكيرات
                    </button>
                    <button onClick={() => { handleShare(); setIsMenuOpen(false); }} className="w-full text-right px-4 py-2.5 hover:bg-white/10 flex items-center gap-3 transition-colors text-sm font-bold">
                      <Share2 className="w-4 h-4 text-[#DAB674]" /> مشاركة
                    </button>
                    <button onClick={() => { handleExport(); setIsMenuOpen(false); }} className="w-full text-right px-4 py-2.5 hover:bg-white/10 flex items-center gap-3 transition-colors text-sm font-bold">
                      <Download className="w-4 h-4 text-[#DAB674]" /> تصدير
                    </button>
                    <div className="h-px bg-white/10 my-1 mx-2" />
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-right px-4 py-2.5 hover:bg-red-500/10 text-red-300 flex items-center gap-3 transition-colors text-sm font-bold">
                      <LogOut className="w-4 h-4" /> خروج
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Daily Streak`;

code = code.replace(topActionsRegex, topActionsReplacement);

fs.writeFileSync('src/App.tsx', code);
