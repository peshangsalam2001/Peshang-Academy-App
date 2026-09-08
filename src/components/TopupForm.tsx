import { useState } from 'react';
import { ArrowRight, Upload, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface TopupFormProps {
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

export function TopupForm({ onClose, onSuccess }: TopupFormProps) {
  const [method, setMethod] = useState<'fib' | 'fastpay' | 'asiacell'>('fib');
  const [formData, setFormData] = useState({ name: '', number: '', amount: '' });

  const methods = [
    { id: 'fib', name: 'FIB', color: 'bg-indigo-600', text: 'text-white' },
    { id: 'fastpay', name: 'FastPay', color: 'bg-red-500', text: 'text-white' },
    { id: 'asiacell', name: 'Asiacell', color: 'bg-gray-900', text: 'text-white' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) {
      return; // Could show local error here
    }
    
    // Simulate API request processing
    onSuccess(Number(formData.amount));
  };

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col overflow-hidden"
    >
      <div className="px-6 pt-12 pb-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl z-20 sticky top-0">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">پڕکردنەوەی جزدان</h1>
        <button onClick={onClose} className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white cursor-pointer">
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar pb-32">
        {/* Method Selector */}
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">ڕێگەی پارەدان هەڵبژێرە</h2>
        <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar pb-2">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id as any)}
              className={`px-6 py-3 rounded-[16px] font-bold text-sm shrink-0 transition-all border ${
                method === m.id 
                  ? `${m.color} ${m.text} border-transparent shadow-md` 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Owner Details Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-[24px] p-5 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <Info size={20} className="text-gray-500 dark:text-gray-400" />
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">زانیاری ناردنی پارە</h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
            تکایە بڕی پارەی مەبەست بنێرە بۆ ئەم هەژمارەی خوارەوە لە ڕێگەی <span className="font-bold text-gray-900 dark:text-white">{methods.find(m=>m.id === method)?.name}</span>، پاشان فۆڕمەکە پڕبکەرەوە و وێنەی پسوڵەکە دابنێ.
          </p>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-[16px] border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">ژمارەی هەژمار</p>
            <p className="font-bold text-2xl tracking-widest text-gray-900 dark:text-white font-mono">0750 123 4567</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">بە ناوی: ئارام ئەحمەد</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">ناوی نێرەر (سێیانی)</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[16px] px-4 py-3.5 text-sm focus:outline-none focus:border-gray-900 dark:focus:border-gray-500"
              placeholder="ناوی خۆت بنووسە..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">ژمارەی مۆبایل / FIB ID</label>
            <input 
              type="text" 
              value={formData.number}
              onChange={e => setFormData({...formData, number: e.target.value})}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[16px] px-4 py-3.5 text-sm text-left font-mono focus:outline-none focus:border-gray-900 dark:focus:border-gray-500"
              placeholder="07..."
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">بڕی پارە (بە دینار)</label>
            <input 
              type="number" 
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[16px] px-4 py-3.5 text-sm text-left font-mono focus:outline-none focus:border-gray-900 dark:focus:border-gray-500"
              placeholder="25000"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">وێنەی پسوڵە (سکرینشۆت)</label>
            <div className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-[16px] p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-gray-400">
                <Upload size={20} />
              </div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">کلیک بکە بۆ دانانی وێنە</p>
            </div>
          </div>
        </form>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-20">
        <button 
          onClick={handleSubmit}
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-[20px] font-bold shadow-xl shadow-gray-900/10 cursor-pointer active:scale-95 transition-transform"
        >
          ناردنی داواکاری
        </button>
      </div>
    </motion.div>
  );
}
