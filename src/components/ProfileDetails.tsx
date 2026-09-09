import { ArrowRight, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface ProfileDetailsProps {
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function ProfileDetails({ onClose, onToast }: ProfileDetailsProps) {
  const [profile, setProfile] = useState({
    name: 'ئارام ئەحمەد',
    email: 'aram.ahmad@example.com',
    phone: '0750 123 4567'
  });

  const handleSave = () => {
    onToast('زانیارییەکان بە سەرکەوتوویی نوێکرانەوە');
    onClose();
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col overflow-hidden"
    >
      <div className="px-6 pt-12 pb-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-20">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">زانیارییە کەسییەکان</h1>
        <button onClick={onClose} className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white cursor-pointer">
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar pb-32">
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" alt="avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center shadow-sm cursor-pointer border-2 border-white dark:border-gray-900 z-10 hover:scale-105 transition-transform">
              <span className="text-lg leading-none mb-1">+</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">ناوی تەواو</label>
            <input 
              type="text" 
              value={profile.name}
              onChange={e => setProfile({...profile, name: e.target.value})}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[16px] px-4 py-3.5 text-sm focus:outline-none focus:border-gray-900 dark:focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">ئیمەیڵ (Email)</label>
            <input 
              type="email" 
              value={profile.email}
              onChange={e => setProfile({...profile, email: e.target.value})}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[16px] px-4 py-3.5 text-sm text-left font-mono focus:outline-none focus:border-gray-900 dark:focus:border-gray-500"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">ژمارەی مۆبایل</label>
            <input 
              type="text" 
              value={profile.phone}
              onChange={e => setProfile({...profile, phone: e.target.value})}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[16px] px-4 py-3.5 text-sm text-left font-mono focus:outline-none focus:border-gray-900 dark:focus:border-gray-500"
              dir="ltr"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-20">
        <button 
          onClick={handleSave}
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-[20px] font-bold shadow-xl shadow-gray-900/10 cursor-pointer active:scale-95 transition-transform"
        >
          پاشەکەوتکردنی گۆڕانکارییەکان
        </button>
      </div>
    </motion.div>
  );
}
