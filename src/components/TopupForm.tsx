import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface TopupFormProps {
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

export function TopupForm({ onClose, onSuccess }: TopupFormProps) {
  const [amount, setAmount] = useState('');

  const amounts = [10000, 25000, 50000, 100000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    // Will be sent to ZainCash API
    onSuccess(Number(amount));
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
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">پڕکردنەوەی باڵانس</h1>
        <button onClick={onClose} className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white cursor-pointer">
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 no-scrollbar pb-32">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">بڕی پارە هەڵبژێرە یان بنووسە</h2>
        
        <div className="grid grid-cols-2 gap-3 mb-8">
          {amounts.map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt.toString())}
              className={`py-4 rounded-[20px] font-bold text-sm font-mono transition-all border ${
                amount === amt.toString()
                  ? 'bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-600/20' 
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {amt.toLocaleString()} IQD
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">بڕی پارەی خوازراو (بە دینار)</label>
            <input 
              type="number" 
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] px-4 py-4 text-sm text-left font-mono focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
              placeholder="بۆ نموونە: 15000"
              dir="ltr"
            />
          </div>
        </form>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-20">
        <button 
          onClick={handleSubmit}
          disabled={!amount || Number(amount) <= 0}
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-[20px] font-bold shadow-xl shadow-gray-900/10 cursor-pointer active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          پارەدان
        </button>
      </div>
    </motion.div>
  );
}
