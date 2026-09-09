import { useState } from 'react';
import { ArrowRight, Plus, Edit2, Trash2, Bell, Users, Clock, CheckCircle, Search, ShieldAlert, X } from 'lucide-react';
import { motion } from 'motion/react';
import { mockCourses } from '../data';

interface AdminDashboardProps {
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function AdminDashboard({ onClose, onToast }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'courses' | 'users' | 'notifications' | 'transactions'>('transactions');

  // Interactive mock states
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [isSendingNotification, setIsSendingNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationBody, setNotificationBody] = useState('');

  // Mock Data for Admin
  const mockAdminTransactions = [
    {
      id: 'tr1',
      user: { name: 'ئارام ئەحمەد', email: 'aram.ahmad@example.com', phone: '0750 123 4567' },
      courseName: 'مایکرۆسۆفت وۆرد لە سفرەوە',
      amount: 25000,
      method: 'FastPay',
      date: '2023-10-28 10:30 AM',
      reference: 'FP-982374',
      status: 'pending' as const, // Waiting / within 5 mins
    },
    {
      id: 'tr2',
      user: { name: 'سارا محەمەد', email: 'sara.m@example.com', phone: '0770 987 6543' },
      courseName: 'ئۆتۆکاد بۆ ئەندازیاران',
      amount: 50000,
      method: 'FIB',
      date: '2023-10-27 02:15 PM',
      reference: 'FIB-556128',
      status: 'completed' as const,
    },
    {
      id: 'tr3',
      user: { name: 'کاروان کامەران', email: 'karwan99@example.com', phone: '0751 333 4444' },
      courseName: 'پڕکردنەوەی جزدان',
      amount: 10000,
      method: 'ZainCash',
      date: '2023-10-26 09:00 AM',
      reference: 'ZC-112233',
      status: 'completed' as const,
    }
  ];

  const mockUsers = [
    { id: 'u1', name: 'ئارام ئەحمەد', email: 'aram.ahmad@example.com', role: 'user' },
    { id: 'u2', name: 'سارا محەمەد', email: 'sara.m@example.com', role: 'user' },
    { id: 'u3', name: 'شڤان خالید', email: 'shvan@example.com', role: 'admin' },
  ];

  const handleSendNotification = () => {
    if (!notificationTitle || !notificationBody) {
      onToast('تکایە سەردێڕ و ناوەڕۆک پڕبکەرەوە');
      return;
    }
    setIsSendingNotification(true);
    setTimeout(() => {
      setIsSendingNotification(false);
      setNotificationTitle('');
      setNotificationBody('');
      onToast('ئاگادارکردنەوەکە بە سەرکەوتوویی نێردرا بۆ هەموو بەکارهێنەران');
    }, 1500);
  };

  const renderCourseForm = (isEdit: boolean) => (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-[24px] border border-gray-200 dark:border-gray-800 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{isEdit ? 'دەستکاریکردنی کۆرس' : 'زیادکردنی کۆرسی نوێ'}</h3>
        <button onClick={() => { setIsAddingCourse(false); setEditingCourseId(null); }} className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <X size={24} />
        </button>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">ناوی کۆرس</label>
        <input type="text" placeholder="بۆ نموونە: فێربوونی پایتۆن" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none" />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">مامۆستا</label>
          <input type="text" placeholder="ناوی مامۆستا" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none" />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">نرخ (دینار)</label>
          <input type="number" placeholder="50000" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">وێنەی کۆرس (لینک)</label>
        <input type="text" placeholder="https://..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none" dir="ltr" />
      </div>
      <button 
        onClick={() => {
          onToast(isEdit ? 'گۆڕانکارییەکان پاشەکەوت کران' : 'کۆرسەکە بە سەرکەوتوویی زیادکرا');
          setIsAddingCourse(false);
          setEditingCourseId(null);
        }}
        className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3.5 rounded-xl font-bold text-sm mt-2"
      >
        {isEdit ? 'پاشەکەوتکردن' : 'زیادکردن'}
      </button>
    </div>
  );

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-gray-50 dark:bg-gray-950 z-[80] flex flex-col overflow-hidden"
    >
      <div className="px-6 pt-12 pb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-20">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">داشبۆردی ئەدمین</h1>
        <button onClick={onClose} className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white cursor-pointer hover:bg-gray-200 transition-colors">
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="flex border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-2 gap-4 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('transactions')}
          className={`pb-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'transactions' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          مامەڵەکان
        </button>
        <button 
          onClick={() => setActiveTab('courses')}
          className={`pb-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'courses' ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          کۆرسەکان
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          className={`pb-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'users' ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          بەکارهێنەران
        </button>
        <button 
          onClick={() => setActiveTab('notifications')}
          className={`pb-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'notifications' ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          ئاگادارکردنەوە
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 no-scrollbar pb-32">
        
        {/* TRANSACTIONS TAB */}
        {activeTab === 'transactions' && (
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-gray-900 dark:text-white mb-2">دوایین مامەڵەکان</h2>
            {mockAdminTransactions.map(tr => (
              <div key={tr.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[24px] p-5 shadow-sm">
                <div className="flex justify-between items-start mb-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{tr.user.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mb-1">{tr.user.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono" dir="ltr">{tr.user.phone}</p>
                  </div>
                  <div className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold ${
                    tr.status === 'completed' 
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' 
                      : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                  }`}>
                    {tr.status === 'completed' ? <CheckCircle size={14} /> : <Clock size={14} />}
                    {tr.status === 'completed' ? 'سەرکەوتوو' : 'لە چاوەڕوانیدا (٥ خولەک)'}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">جۆری مامەڵە:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{tr.courseName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">بڕی پارە:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{tr.amount.toLocaleString()} د.ع</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ڕێگەی پارەدان:</span>
                    <span className="font-bold text-gray-700 dark:text-gray-300">{tr.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ژمارەی وەسڵ (Reference):</span>
                    <span className="font-mono text-gray-700 dark:text-gray-300">{tr.reference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">بەروار و کات:</span>
                    <span className="font-mono text-gray-700 dark:text-gray-300">{tr.date}</span>
                  </div>
                </div>
                
                {tr.status === 'pending' && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-2">
                    <button onClick={() => onToast('پارەدانەکە پەسەند کرا')} className="flex-1 bg-emerald-500 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-600 transition-colors">
                      پەسەندکردن
                    </button>
                    <button onClick={() => onToast('پارەدانەکە ڕەتکرایەوە')} className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2.5 rounded-xl font-bold text-xs hover:bg-red-100 transition-colors">
                      ڕەتکردنەوە
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* COURSES TAB */}
        {activeTab === 'courses' && (
          <div className="flex flex-col gap-4">
            {!isAddingCourse && !editingCourseId && (
              <button 
                onClick={() => setIsAddingCourse(true)}
                className="bg-indigo-600 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
              >
                <Plus size={20} strokeWidth={2.5} />
                زیادکردنی کۆرسی نوێ
              </button>
            )}

            {isAddingCourse && renderCourseForm(false)}
            {editingCourseId && renderCourseForm(true)}
            
            {!isAddingCourse && !editingCourseId && (
              <>
                <h2 className="font-bold text-gray-900 dark:text-white mt-4 mb-2">لیستی کۆرسەکان</h2>
                {mockCourses.map(course => (
                  <div key={course.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[20px] p-4 flex gap-4 items-center shadow-sm">
                    <div className="w-16 h-16 rounded-[14px] overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
                      {course.image && (
                        <img src={course.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white truncate">{course.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{course.price.toLocaleString()} د.ع</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingCourseId(course.id)} className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => onToast('کۆرسەکە سڕایەوە')} className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center cursor-pointer hover:bg-red-100 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="flex flex-col gap-5">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                value={searchUserQuery}
                onChange={(e) => setSearchUserQuery(e.target.value)}
                placeholder="گەڕان بۆ بەکارهێنەر (ناو یان ئیمەیڵ)..." 
                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl py-4 pr-12 pl-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-gray-500 transition-all shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-3">
              {mockUsers.filter(u => u.name.includes(searchUserQuery) || u.email.includes(searchUserQuery)).map(user => (
                <div key={user.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[20px] p-4 flex flex-col sm:flex-row gap-4 justify-between sm:items-center shadow-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">{user.name}</h3>
                      {user.role === 'admin' && (
                        <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-0.5 rounded-md text-[10px] font-bold">ئەدمین</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 font-mono">{user.email}</p>
                  </div>
                  <div className="flex gap-2">
                    {user.role !== 'admin' && (
                      <button onClick={() => onToast(`${user.name} کرا بە ئەدمین`)} className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-2 rounded-xl text-xs font-bold hover:opacity-90">
                        بکە بە ئەدمین
                      </button>
                    )}
                    <button onClick={() => onToast(`${user.name} بلۆک کرا`)} className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-2 rounded-xl hover:bg-red-100 transition-colors" title="بلۆک کردن">
                      <ShieldAlert size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && (
          <div className="flex flex-col gap-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-[24px] border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Bell className="text-indigo-600 dark:text-indigo-400" /> 
                ناردنی ئاگادارکردنەوەی گشتی
              </h3>
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">سەردێڕی نامە</label>
                <input 
                  type="text" 
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                  placeholder="بۆ نموونە: داشکاندنی تایبەت بۆ کۆرسەکان" 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors" 
                />
              </div>
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">ناوەڕۆکی نامە</label>
                <textarea 
                  value={notificationBody}
                  onChange={(e) => setNotificationBody(e.target.value)}
                  placeholder="ناوەڕۆکی نامەکە لێرە بنووسە..." 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm h-32 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                ></textarea>
              </div>
              <button 
                onClick={handleSendNotification} 
                disabled={isSendingNotification}
                className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSendingNotification ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Bell size={18} />
                    ناردن بۆ هەمووان
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
