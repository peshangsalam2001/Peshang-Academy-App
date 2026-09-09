import { ArrowRight, Bell, CreditCard, ShoppingBag, BookOpen, Settings } from 'lucide-react';
import { AppNotification } from '../types';
import { motion } from 'motion/react';

interface NotificationsModalProps {
  notifications: AppNotification[];
  onClose: () => void;
  onMarkAllRead: () => void;
  onNotificationClick?: (notification: AppNotification) => void;
}

export function NotificationsModal({ notifications, onClose, onMarkAllRead, onNotificationClick }: NotificationsModalProps) {
  
  const getIcon = (type: string) => {
    switch(type) {
      case 'topup': return <CreditCard size={20} className="text-blue-500" />;
      case 'purchase': return <ShoppingBag size={20} className="text-emerald-500" />;
      case 'course': return <BookOpen size={20} className="text-indigo-500" />;
      case 'system': return <Settings size={20} className="text-gray-500" />;
      default: return <Bell size={20} className="text-gray-500" />;
    }
  };

  const getBg = (type: string) => {
    switch(type) {
      case 'topup': return 'bg-blue-50 dark:bg-blue-900/20';
      case 'purchase': return 'bg-emerald-50 dark:bg-emerald-900/20';
      case 'course': return 'bg-indigo-50 dark:bg-indigo-900/20';
      case 'system': return 'bg-gray-100 dark:bg-gray-800';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
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
        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">ئاگادارکردنەوەکان</h1>
        <button onClick={onClose} className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white cursor-pointer">
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 no-scrollbar pb-32">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {notifications.filter(n => !n.read).length} نامەی نوێ
          </p>
          <button 
            onClick={onMarkAllRead}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer"
          >
            هەمووی بخوێنەوە
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {notifications.map((notification) => {
            const isClickable = notification.type !== 'system' && notification.actionId;
            return (
              <div 
                key={notification.id} 
                onClick={() => {
                  if (isClickable && onNotificationClick) {
                    onNotificationClick(notification);
                  }
                }}
                className={`p-4 rounded-[20px] flex gap-4 ${isClickable ? 'cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors' : ''} ${
                  notification.read 
                    ? 'bg-transparent border border-gray-100 dark:border-gray-800' 
                    : 'bg-white dark:bg-gray-800 shadow-sm border border-indigo-100 dark:border-indigo-900/30 relative overflow-hidden'
                }`}
              >
                {!notification.read && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                )}
                
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getBg(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold text-sm ${notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium whitespace-nowrap mr-2">
                      {notification.date.split(' ')[0]}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${notification.read ? 'text-gray-500 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'}`}>
                    {notification.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
