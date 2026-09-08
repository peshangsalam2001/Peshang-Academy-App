import { Plus, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { mockTransactions } from '../data';

interface WalletTabProps {
  onToast: (msg: string) => void;
  onOpenTopup: () => void;
  onOpenTransaction: (id: string) => void;
}

export function WalletTab({ onToast, onOpenTopup, onOpenTransaction }: WalletTabProps) {
  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-gray-900 animate-in fade-in duration-500 px-6 pt-12 transition-colors duration-300">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">جزدان</h1>

      {/* Wallet Card - Minimalist Dark */}
      <div className="bg-gray-900 dark:bg-black rounded-[32px] p-8 text-white shadow-2xl shadow-gray-900/15 dark:shadow-none relative overflow-hidden mb-10 border dark:border-gray-800">
        <div className="relative z-10 flex flex-col h-full justify-between gap-8">
          <div>
            <p className="text-gray-400 text-sm mb-2 font-medium">باڵانسی گشتی</p>
            <div className="flex items-end gap-2">
              <h2 className="text-4xl font-bold tracking-tight">40,000</h2>
              <span className="text-gray-400 text-base mb-1">د.ع</span>
            </div>
          </div>
          
          <button 
            onClick={onOpenTopup}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full py-4 rounded-[18px] text-sm font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Plus size={18} strokeWidth={2.5} />
            پڕکردنەوەی هەژمار
          </button>
        </div>
        
        {/* Subtle Decorations */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-[0.02] dark:opacity-[0.05] rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Transactions */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-5 px-1 uppercase tracking-wider">دوایین چالاکییەکان</h3>
        <div className="flex flex-col gap-3">
          {mockTransactions.map((tx) => (
            <div 
              key={tx.id} 
              onClick={() => onOpenTransaction(tx.id)}
              className="bg-white dark:bg-gray-800 rounded-[24px] p-4 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:border-gray-200 dark:hover:border-gray-600 transition-colors cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${
                tx.type === 'credit' 
                  ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white' 
                  : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-400 dark:text-gray-500'
              }`}>
                {tx.type === 'credit' ? <ArrowDownLeft size={20} strokeWidth={1.5} /> : <ArrowUpRight size={20} strokeWidth={1.5} />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{tx.title}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{tx.date}</p>
              </div>
              <div className={`font-bold text-sm tracking-tight ${tx.type === 'credit' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                {tx.type === 'credit' ? '+' : '-'}{tx.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
