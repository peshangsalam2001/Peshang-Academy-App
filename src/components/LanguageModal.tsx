import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface LanguageModalProps {
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function LanguageModal({ onClose, onToast }: LanguageModalProps) {
  const [lang, setLang] = useState('ku');

  const languages = [
    { id: 'ku', name: 'کوردی (سۆرانی)', dir: 'rtl' },
    { id: 'en', name: 'English', dir: 'ltr' },
    { id: 'ar', name: 'العربية', dir: 'rtl' },
  ];

  const handleSave = () => {
    onToast('زمانەکە بە سەرکەوتوویی گۆڕدرا');
    onClose();
  };

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col overflow-hidden"
    >
      <div className="px-6 pt-12 pb-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-20">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">زمانی ئەپلیکەیشن</h1>
        <button onClick={onClose} className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white cursor-pointer">
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar pb-32">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">زمانی دڵخوازی خۆت هەڵبژێرە بۆ بەکارهێنانی ئەپلیکەیشنەکە:</p>
        
        <div className="flex flex-col gap-3">
          {languages.map((l) => (
            <div 
              key={l.id}
              onClick={() => setLang(l.id)}
              className={`p-5 rounded-[24px] border flex justify-between items-center cursor-pointer transition-colors ${
                lang === l.id 
                  ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800' 
                  : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300'
              }`}
            >
              <span className={`font-bold ${lang === l.id ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                {l.name}
              </span>
              {lang === l.id && (
                <div className="w-6 h-6 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-20">
        <button 
          onClick={handleSave}
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-[20px] font-bold shadow-xl shadow-gray-900/10 cursor-pointer active:scale-95 transition-transform"
        >
          هەڵبژاردنی زمان
        </button>
      </div>
    </motion.div>
  );
}
