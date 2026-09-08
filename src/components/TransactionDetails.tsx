import { ArrowRight, ArrowDownLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Transaction } from '../types';
import { motion } from 'motion/react';

interface TransactionDetailsProps {
  transaction: Transaction;
  onClose: () => void;
}

export function TransactionDetails({ transaction, onClose }: TransactionDetailsProps) {
  const isCredit = transaction.type === 'credit';

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-gray-50 dark:bg-gray-950 z-50 flex flex-col overflow-hidden"
    >
      <div className="px-6 pt-12 pb-4 flex items-center justify-between bg-gray-50 dark:bg-gray-950 sticky top-0 z-20">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">پسوڵەی مامەڵە</h1>
        <button onClick={onClose} className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white shadow-sm cursor-pointer">
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar pb-32">
        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center relative overflow-hidden">
          
          {/* Top Decoration */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isCredit ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
          }`}>
            {isCredit ? <ArrowDownLeft size={32} strokeWidth={1.5} /> : <ArrowUpRight size={32} strokeWidth={1.5} />}
          </div>
          
          <h2 className="text-base text-gray-500 dark:text-gray-400 font-medium mb-2">{transaction.title}</h2>
          
          <div className="flex items-end gap-1 mb-6">
            <span className={`text-4xl font-bold tracking-tight ${isCredit ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
              {isCredit ? '+' : '-'}{transaction.amount.toLocaleString()}
            </span>
            <span className="text-gray-400 dark:text-gray-500 text-sm mb-1">د.ع</span>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full text-xs font-bold mb-8">
            <CheckCircle2 size={14} className={transaction.status === 'completed' ? 'text-emerald-500' : 'text-amber-500'} />
            <span>{transaction.status === 'completed' ? 'سەرکەوتوو' : 'لە چاوەڕوانیدا'}</span>
          </div>

          <div className="w-full border-t border-dashed border-gray-200 dark:border-gray-800 my-2"></div>
          
          <div className="w-full flex flex-col gap-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">ڕێکەوت و کات</span>
              <span className="text-xs font-bold text-gray-900 dark:text-white font-mono" dir="ltr">{transaction.date}</span>
            </div>
            {transaction.method && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">شێوازی پارەدان</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{transaction.method}</span>
              </div>
            )}
            {transaction.reference && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">ژمارەی پسوڵە</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white font-mono tracking-widest">{transaction.reference}</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
