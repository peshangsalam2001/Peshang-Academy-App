import { User, Bell, Globe, Moon, Shield, HelpCircle, LogOut, ChevronLeft, Library } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SettingsTabProps {
  onToast: (msg: string) => void;
  onOpenProfile: () => void;
  onOpenLanguage: () => void;
  onOpenMyCourses: () => void;
  onOpenAdmin: () => void;
  onLogout: () => void;
  userName: string;
  userEmail: string;
}

export function SettingsTab({ onToast, onOpenProfile, onOpenLanguage, onOpenMyCourses, onOpenAdmin, onLogout, userName, userEmail }: SettingsTabProps) {
  const [isDark, setIsDark] = useState(false);

  // Check initial dark mode state
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  // Logical toggle for dark mode
  const handleToggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const isAdmin = userEmail === 'corestorenetflix@gmail.com';

  const settingGroups = [
    ...(isAdmin ? [{
      title: 'بەڕێوەبردن (تەنها بۆ ئەدمین)',
      items: [
        { id: 'admin', icon: Shield, label: 'داشبۆردی ئەدمین' }
      ]
    }] : []),
    {
      title: 'هەژمار',
      items: [
        { id: 'profile', icon: User, label: 'زانیارییە کەسییەکان' },
        { id: 'my_courses', icon: Library, label: 'کۆرسەکانم' },
        { id: 'security', icon: Shield, label: 'پاسۆرد و پاراستن' },
      ]
    },
    {
      title: 'گشتی',
      items: [
        { id: 'notifs', icon: Bell, label: 'ئاگادارکردنەوەکان' },
        { id: 'lang', icon: Globe, label: 'زمان (Language)', value: 'کوردی' },
        { id: 'dark', icon: Moon, label: 'دۆخی تاریک', toggle: true },
      ]
    },
    {
      title: 'پاڵپشتی',
      items: [
        { id: 'help', icon: HelpCircle, label: 'یارمەتی و پرسیار' },
      ]
    }
  ];

  const handleAction = (item: any) => {
    if (item.toggle) {
      handleToggleDark();
    } else if (item.id === 'profile') {
      onOpenProfile();
    } else if (item.id === 'my_courses') {
      onOpenMyCourses();
    } else if (item.id === 'lang') {
      onOpenLanguage();
    } else if (item.id === 'admin') {
      onOpenAdmin();
    } else {
      onToast(`کردنەوەی بەشی: ${item.label}`);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-gray-900 animate-in fade-in duration-500 pb-12 transition-colors duration-300">
      {/* Profile Header */}
      <div className="pt-12 pb-8 px-6 flex items-center gap-5 border-b border-gray-50 dark:border-gray-800 mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" alt="avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="absolute bottom-0 right-1 w-5 h-5 bg-gray-900 dark:bg-white rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center z-10">
            <div className="w-1.5 h-1.5 bg-white dark:bg-gray-900 rounded-full"></div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">{userName}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium">{userEmail}</p>
          <button 
            onClick={onOpenProfile}
            className="text-xs font-bold text-gray-900 dark:text-white hover:underline cursor-pointer"
          >
            دەستکاری پڕۆفایل
          </button>
        </div>
      </div>

      <div className="px-6 flex flex-col gap-8">
        {settingGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-3 px-1 uppercase tracking-wider">{group.title}</h3>
            <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              {group.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={i} 
                    onClick={() => handleAction(item)}
                    className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${i !== group.items.length - 1 ? 'border-b border-gray-50 dark:border-gray-700/50' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon size={20} className="text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
                      <span className="font-bold text-gray-700 dark:text-gray-200 text-sm">{item.label}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {item.value && <span className="text-xs text-gray-400 font-medium">{item.value}</span>}
                      
                      {item.toggle ? (
                        <div className={`w-10 h-6 rounded-full relative p-1 transition-colors ${isDark ? 'bg-gray-900 dark:bg-white' : 'bg-gray-200'}`}>
                          <div className={`w-4 h-4 rounded-full shadow-sm absolute top-1 transition-all ${isDark ? 'bg-white dark:bg-gray-900 left-5' : 'bg-white left-1'}`}></div>
                        </div>
                      ) : (
                        <ChevronLeft size={16} className="text-gray-300 dark:text-gray-600" strokeWidth={2} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        <button 
          onClick={onLogout}
          className="flex items-center justify-center gap-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 py-4 font-bold text-sm mt-2 transition-colors cursor-pointer"
        >
          <LogOut size={18} strokeWidth={2} />
          <span>چوونەدەرەوە</span>
        </button>
      </div>
    </div>
  );
}
