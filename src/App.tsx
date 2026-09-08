import { useState, useEffect } from 'react';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { CoursesTab } from './components/CoursesTab';
import { WalletTab } from './components/WalletTab';
import { TasksTab } from './components/TasksTab';
import { SettingsTab } from './components/SettingsTab';
import { CourseDetails } from './components/CourseDetails';
import { TopupForm } from './components/TopupForm';
import { ProfileDetails } from './components/ProfileDetails';
import { LanguageModal } from './components/LanguageModal';
import { TaskDetails } from './components/TaskDetails';
import { TransactionDetails } from './components/TransactionDetails';
import { NotificationsModal } from './components/NotificationsModal';
import { MyCoursesModal } from './components/MyCoursesModal';
import { AuthScreen } from './components/AuthScreen';
import { EmailVerificationScreen } from './components/EmailVerificationScreen';
import { TabType, Task, PurchasedCourse, AppNotification } from './types';
import { mockTasks, mockCourses, mockTransactions, mockNotifications, mockPurchasedCourses } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface ToastState {
  msg: string;
  type: 'success' | 'error' | 'warning' | 'info';
  action?: { label: string; onClick: () => void; };
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);
  const [purchasedCourses, setPurchasedCourses] = useState<PurchasedCourse[]>(mockPurchasedCourses);
  const [balance, setBalance] = useState(40000);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [userName, setUserName] = useState('بەکارهێنەر');
  const [userEmail, setUserEmail] = useState('');

  // Overlay states
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [showTopup, setShowTopup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMyCourses, setShowMyCourses] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        setUserEmail(user.email || '');
        if (user.emailVerified) {
          setIsAuthenticated(true);
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists() && userDoc.data().name) {
              setUserName(userDoc.data().name);
            } else {
              setUserName('بەکارهێنەر');
            }
          } catch (error) {
            console.error("Error fetching user data: ", error);
          }
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setAuthUser(null);
        setIsAuthenticated(false);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCheckVerification = async () => {
    if (authUser) {
      setIsAuthLoading(true);
      try {
        await authUser.reload();
        // Create a new reference or force state update by relying on the reloaded authUser.emailVerified
        if (authUser.emailVerified) {
          setIsAuthenticated(true);
          try {
            const userDoc = await getDoc(doc(db, 'users', authUser.uid));
            if (userDoc.exists() && userDoc.data().name) {
              setUserName(userDoc.data().name);
            }
          } catch (error) {}
        } else {
           // still not verified
           setAuthUser({...authUser} as User); // force re-render
        }
      } catch (err) {
        console.error("Reload error", err);
      }
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showToast('چوونەدەرەوە سەرکەوتوو بوو', 'success');
    } catch (error) {
      showToast('کێشەیەک ڕوویدا لە کاتی چوونەدەرەوە', 'error');
    }
  };

  const showToast = (msg: string, type: ToastState['type'] = 'info', action?: ToastState['action']) => {
    setToast({ msg, type, action });
    if (!action) {
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleTopupSuccess = (amount: number) => {
    setBalance(prev => prev + amount);
    const newNotif: AppNotification = {
      id: `n_${Date.now()}`,
      title: 'باڵانس زیادکرا',
      description: `بڕی ${amount.toLocaleString()} دینار بە سەرکەوتوویی خرایە سەر هەژمارەکەت.`,
      date: new Date().toLocaleString('en-US', { hour12: true }),
      read: false,
      type: 'topup'
    };
    setNotifications([newNotif, ...notifications]);
    showToast(`بڕی ${amount.toLocaleString()} دینار خرایە سەر هەژمارەکەت`, 'success');
    setShowTopup(false);
  };

  const handleBuyCourse = (courseId: string) => {
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) return;

    if (balance < course.price) {
      showToast('بڕی باڵانسی پێویستت نییە بۆ بەشداری کردن', 'error', {
        label: 'پڕکردنەوە',
        onClick: () => {
          setToast(null);
          setSelectedCourseId(null);
          setShowTopup(true);
        }
      });
      return;
    }

    // Success Purchase
    setBalance(prev => prev - course.price);
    const newPurchased: PurchasedCourse = {
      ...course,
      purchaseDate: new Date().toLocaleDateString('en-GB'),
      purchasePrice: course.price,
      paymentMethod: 'جزدان'
    };
    setPurchasedCourses([newPurchased, ...purchasedCourses]);
    
    const newNotif: AppNotification = {
      id: `n_${Date.now()}`,
      title: 'پیرۆزە! کڕینی کۆرس',
      description: `بە سەرکەوتوویی بەشداربوویت لە کۆرسی ${course.title}.`,
      date: new Date().toLocaleString('en-US', { hour12: true }),
      read: false,
      type: 'purchase'
    };
    setNotifications([newNotif, ...notifications]);
    
    showToast(`بە سەرکەوتوویی بەشداربوویت لە کۆرسی ${course.title}`, 'success');
    setSelectedCourseId(null);
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <Loader2 size={40} className="animate-spin text-indigo-600 dark:text-indigo-400" />
      </div>
    );
  }

  if (authUser && !authUser.emailVerified) {
    return (
      <EmailVerificationScreen 
        user={authUser} 
        onLogout={handleLogout} 
        onVerified={handleCheckVerification} 
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center w-full min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
        <div className="w-full max-w-[480px] bg-white dark:bg-gray-900 h-[100dvh] relative shadow-2xl overflow-hidden">
          <AuthScreen onLoginSuccess={() => {}} />
        </div>
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'home': return <HomeTab userName={userName} onNavigate={setActiveTab} onOpenCourse={setSelectedCourseId} unreadCount={unreadCount} onOpenNotifications={() => setShowNotifications(true)} onOpenMyCourses={() => setShowMyCourses(true)} />;
      case 'courses': return <CoursesTab onOpenCourse={setSelectedCourseId} onOpenMyCourses={() => setShowMyCourses(true)} />;
      case 'wallet': return <WalletTab balance={balance} onOpenTopup={() => setShowTopup(true)} onOpenTransaction={setSelectedTransactionId} />;
      case 'tasks': return <TasksTab tasks={tasks} onToggle={handleToggleTask} onOpenTask={setSelectedTaskId} />;
      case 'settings': return <SettingsTab userName={userName} userEmail={userEmail} onToast={(m) => showToast(m, 'info')} onOpenProfile={() => setShowProfile(true)} onOpenLanguage={() => setShowLanguage(true)} onOpenMyCourses={() => setShowMyCourses(true)} onLogout={handleLogout} />;
      default: return <HomeTab userName={userName} onNavigate={setActiveTab} onOpenCourse={setSelectedCourseId} unreadCount={unreadCount} onOpenNotifications={() => setShowNotifications(true)} onOpenMyCourses={() => setShowMyCourses(true)} />;
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      <div className="w-full max-w-[480px] bg-white dark:bg-gray-900 h-[100dvh] flex flex-col relative shadow-2xl overflow-hidden text-gray-900 dark:text-white transition-colors duration-300">
        
        {/* Global Complex Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 16, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className={`absolute top-0 left-6 right-6 z-[110] px-5 py-4 rounded-2xl shadow-xl flex items-center justify-between gap-3 ${
                toast.type === 'error' ? 'bg-red-500 text-white' : 
                toast.type === 'success' ? 'bg-emerald-600 text-white' : 
                'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
              }`}
            >
              <span className="text-sm font-bold flex-1">{toast.msg}</span>
              {toast.action && (
                <button 
                  onClick={toast.action.onClick}
                  className="bg-white/20 hover:bg-white/30 dark:bg-black/10 dark:hover:bg-black/20 px-4 py-2 rounded-xl text-xs font-bold transition-colors shrink-0"
                >
                  {toast.action.label}
                </button>
              )}
              {toast.action && (
                <button onClick={() => setToast(null)} className="opacity-70 hover:opacity-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay Modals/Pages */}
        <AnimatePresence>
          {selectedCourseId && (
            <CourseDetails 
              course={mockCourses.find(c => c.id === selectedCourseId)!}
              hasPurchased={purchasedCourses.some(c => c.id === selectedCourseId)}
              onClose={() => setSelectedCourseId(null)} 
              onBuy={() => handleBuyCourse(selectedCourseId)}
            />
          )}
          
          {selectedTaskId && (
            <TaskDetails 
              task={tasks.find(t => t.id === selectedTaskId)!} 
              onClose={() => setSelectedTaskId(null)} 
              onToggle={handleToggleTask} 
            />
          )}

          {selectedTransactionId && (
            <TransactionDetails 
              transaction={mockTransactions.find(t => t.id === selectedTransactionId)!} 
              onClose={() => setSelectedTransactionId(null)} 
            />
          )}

          {showNotifications && (
            <NotificationsModal 
              notifications={notifications}
              onClose={() => setShowNotifications(false)}
              onMarkAllRead={handleMarkAllRead}
            />
          )}

          {showMyCourses && (
            <MyCoursesModal 
              courses={purchasedCourses}
              onClose={() => setShowMyCourses(false)}
              onOpenCourse={setSelectedCourseId}
            />
          )}

          {showTopup && (
            <TopupForm onClose={() => setShowTopup(false)} onSuccess={handleTopupSuccess} />
          )}

          {showProfile && (
            <ProfileDetails onClose={() => setShowProfile(false)} onToast={(m) => showToast(m)} />
          )}

          {showLanguage && (
            <LanguageModal onClose={() => setShowLanguage(false)} onToast={(m) => showToast(m)} />
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
          {renderTab()}
        </div>
        
        <BottomNav activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}

