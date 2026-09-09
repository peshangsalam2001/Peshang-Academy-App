import { TabType } from '../types';
import { Home, BookOpen, Wallet, CheckSquare, Settings } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'سەرەتا', icon: Home },
    { id: 'courses', label: 'کۆرسەکان', icon: BookOpen },
    { id: 'wallet', label: 'جزدان', icon: Wallet },
    { id: 'tasks', label: 'تاقیکردنەوەکان', icon: CheckSquare },
    { id: 'settings', label: 'ڕێکخستن', icon: Settings },
  ];

  return (
    <div className="absolute bottom-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 rounded-t-[32px] px-4 py-4 z-40 transition-colors duration-300">
      <div className="flex justify-between items-center relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id as TabType)}
              className="relative flex flex-col items-center justify-center w-[20%] gap-1.5 cursor-pointer"
            >
              <Icon size={24} strokeWidth={isActive ? 2 : 1.5} className={`transition-colors duration-300 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`} />
              <span className={`text-[10px] font-medium transition-colors duration-300 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-3 w-1 h-1 bg-gray-900 dark:bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
