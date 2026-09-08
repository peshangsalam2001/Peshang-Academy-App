import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Lock, User, ArrowRight, KeyRound, Loader2 } from 'lucide-react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface AuthScreenProps {
  onLoginSuccess: (name?: string) => void;
}

type AuthMode = 'login' | 'register' | 'forgot';

export function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    loginIdentifier: '', // Email
  });
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 4000);
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const getErrorMessage = (errCode: string) => {
    switch (errCode) {
      case 'auth/invalid-email': return 'ئیمەیڵەکە هەڵەیە';
      case 'auth/user-disabled': return 'ئەم هەژمارە ڕاگیراوە';
      case 'auth/user-not-found': return 'هیچ هەژمارێک بەم زانیارییانە نییە';
      case 'auth/wrong-password': return 'وشەی نهێنی هەڵەیە';
      case 'auth/invalid-credential': return 'زانیارییەکانت هەڵە داخل کراوە، تکایە دڵنیابەرەوە.';
      case 'auth/email-already-in-use': return 'ئەم ئیمەیڵە پێشتر بەکارهاتووە';
      case 'auth/weak-password': return 'وشەی نهێنییەکەت لاوازە (لانی کەم ٦ پیت/ژمارە بنووسە)';
      default: return 'کێشەیەک ڕوویدا، تکایە دووبارە هەوڵبدەرەوە';
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.loginIdentifier || !formData.password) {
      showError('تکایە هەموو زانیارییەکان پڕبکەرەوە');
      return;
    }
    
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.loginIdentifier, formData.password);
      // Let App.tsx handle the redirect through onAuthStateChanged
    } catch (err: any) {
      showError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      showError('تکایە هەموو زانیارییەکان پڕبکەرەوە');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      showError('وشەی نهێنییەکان هاوشێوە نین');
      return;
    }
    
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      try {
        await sendEmailVerification(user);
      } catch (emailError) {
        console.error("Failed to send verification email", emailError);
      }
      
      // Save profile data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date().toISOString()
      });
      
      // We manually sign them out or wait for the onAuthStateChange to pick it up,
      // but since Firebase keeps them signed in, our App.tsx will show the Verification Screen.
    } catch (err: any) {
      showError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.loginIdentifier) {
      showError('تکایە ئیمەیڵەکەت بنووسە');
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, formData.loginIdentifier);
      showSuccess('لینکی گۆڕینی پاسۆرد نێردرا بۆ ئیمەیڵەکەت!');
      setMode('login');
    } catch (err: any) {
      showError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-white dark:bg-gray-950 z-[100] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Dynamic Background Pattern */}
      <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-indigo-50 dark:from-indigo-900/10 to-transparent pointer-events-none"></div>
      
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-12 left-6 right-6 bg-red-500 text-white px-4 py-3 rounded-2xl shadow-xl text-sm font-bold flex justify-center text-center z-50"
          >
            {error}
          </motion.div>
        )}
        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-12 left-6 right-6 bg-emerald-500 text-white px-4 py-3 rounded-2xl shadow-xl text-sm font-bold flex justify-center text-center z-50"
          >
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full px-8 z-10 max-w-sm">
        <AnimatePresence mode="wait">
          
          {/* LOGIN */}
          {mode === 'login' && (
            <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gray-900 dark:bg-white rounded-3xl mx-auto flex items-center justify-center text-white dark:text-gray-900 shadow-xl shadow-gray-900/20 dark:shadow-white/10 mb-6">
                  <KeyRound size={36} strokeWidth={1.5} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">بەخێربێیتەوە</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">تکایە زانیارییەکانت بنووسە بۆ چوونەژوورەوە</p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="ئیمەیڵ (Email)" 
                    value={formData.loginIdentifier}
                    onChange={e => setFormData({...formData, loginIdentifier: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[20px] py-4 pr-12 pl-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors text-right placeholder-gray-400"
                    dir="rtl"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="وشەی نهێنی" 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[20px] py-4 pr-12 pl-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors text-right placeholder-gray-400"
                    dir="rtl"
                  />
                </div>

                <div className="flex justify-end mt-1 mb-2">
                  <button type="button" onClick={() => setMode('forgot')} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                    وشەی نهێنیت لەبیرکردووە؟
                  </button>
                </div>

                <button disabled={isLoading} type="submit" className="w-full flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-[20px] font-bold shadow-xl shadow-gray-900/10 cursor-pointer active:scale-95 transition-all disabled:opacity-70">
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'چوونەژوورەوە'}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
                هەژمارت نییە؟ <button onClick={() => setMode('register')} className="font-bold text-gray-900 dark:text-white hover:underline">هەژمار دروست بکە</button>
              </p>
            </motion.div>
          )}

          {/* REGISTER */}
          {mode === 'register' && (
            <motion.div key="register" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full">
              <button onClick={() => setMode('login')} className="absolute top-10 right-6 w-10 h-10 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-900 dark:text-white">
                <ArrowRight size={20} />
              </button>
              
              <div className="text-center mb-8 mt-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">هەژماری نوێ</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">زانیارییەکانت بنووسە بۆ دروستکردنی هەژمار</p>
              </div>

              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input type="text" placeholder="ناوی سێیانی" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[20px] py-4 pr-12 pl-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors text-right placeholder-gray-400" dir="rtl" />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input type="email" placeholder="ئیمەیڵ (Email)" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[20px] py-4 pr-12 pl-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors text-right placeholder-gray-400" dir="rtl" />
                </div>

                <div className="flex gap-2" dir="rtl">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                      <Phone size={18} />
                    </div>
                    <input type="tel" placeholder="ژمارەی مۆبایل" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[20px] py-4 pr-12 pl-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors text-right placeholder-gray-400" dir="rtl" />
                  </div>
                  <div className="w-[100px] shrink-0 relative">
                    <select className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[20px] py-4 pl-2 pr-2 text-sm text-gray-900 dark:text-white focus:outline-none appearance-none font-mono text-center cursor-pointer" dir="ltr">
                      <option value="+964">+964</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+971">+971</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input type="password" placeholder="وشەی نهێنی (لانی کەم ٦ پیت)" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[20px] py-4 pr-12 pl-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors text-right placeholder-gray-400" dir="rtl" />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input type="password" placeholder="دووپاتکردنەوەی وشەی نهێنی" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[20px] py-4 pr-12 pl-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors text-right placeholder-gray-400" dir="rtl" />
                </div>

                <button disabled={isLoading} type="submit" className="w-full flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-[20px] font-bold shadow-xl shadow-gray-900/10 mt-2 cursor-pointer active:scale-95 transition-all disabled:opacity-70">
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'دروستکردنی هەژمار'}
                </button>
              </form>
            </motion.div>
          )}

          {/* FORGOT PASSWORD */}
          {mode === 'forgot' && (
            <motion.div key="forgot" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full">
              <button onClick={() => setMode('login')} className="absolute top-10 right-6 w-10 h-10 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-900 dark:text-white">
                <ArrowRight size={20} />
              </button>
              
              <div className="text-center mb-8 mt-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">وشەی نهێنی</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">ئیمەیڵەکەت بنووسە بۆ گەڕاندنەوەی وشەی نهێنی</p>
              </div>

              <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input type="email" placeholder="ئیمەیڵەکەت لێرە بنووسە" value={formData.loginIdentifier} onChange={e => setFormData({...formData, loginIdentifier: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[20px] py-4 pr-12 pl-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors text-right placeholder-gray-400" dir="rtl" />
                </div>

                <button disabled={isLoading} type="submit" className="w-full flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-[20px] font-bold shadow-xl shadow-gray-900/10 mt-2 cursor-pointer active:scale-95 transition-all disabled:opacity-70">
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'ناردنی لینکی گەڕاندنەوە'}
                </button>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
