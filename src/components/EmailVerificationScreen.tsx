import { useState } from 'react';
import { Mail, RefreshCw, LogOut } from 'lucide-react';
import { sendEmailVerification, User } from 'firebase/auth';

interface Props {
  user: User;
  onLogout: () => void;
  onVerified: () => void;
}

export function EmailVerificationScreen({ user, onLogout, onVerified }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleResend = async () => {
    try {
      setIsLoading(true);
      setMsg('');
      await sendEmailVerification(user);
      setMsg('لینکەکە دووبارە نێردرا بۆ ئیمەیڵەکەت. تکایە سەیری ئیمەیڵەکەت بکە.');
    } catch (e: any) {
      if (e.code === 'auth/too-many-requests') {
        setMsg('تکایە کەمێکی تر هەوڵ بدەرەوە.');
      } else {
        setMsg('کێشەیەک ڕوویدا لە ناردنی لینکەکە.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheck = async () => {
    setIsLoading(true);
    setMsg('');
    try {
      await user.reload();
      // user.reload() mutates the object but doesn't always trigger react state if reference is the same,
      // so we check the actual property now.
      if (user.emailVerified) {
        onVerified();
      } else {
        setMsg('هێشتا ئیمەیڵەکەت پشتڕاست نەکراوەتەوە.');
      }
    } catch (e) {
      setMsg('کێشەیەک ڕوویدا، تکایە دووبارە هەوڵبدەرەوە.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-100 dark:bg-gray-950 px-4 transition-colors duration-300" dir="rtl">
      <div className="w-full max-w-[400px] bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-2xl text-center border border-gray-100 dark:border-gray-800">
        <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400">
          <Mail size={32} />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          پشتڕاستکردنەوەی ئیمەیڵ
        </h2>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
          لینکێکی پشتڕاستکردنەوە نێردراوە بۆ ئیمەیڵەکەت (<span className="text-gray-900 dark:text-white font-medium" dir="ltr">{user.email}</span>). تکایە کلیک لەو لینکە بکە بۆ ئەوەی بتوانیت بچیتە ناو ئەپڵیکەیشنەکە.
        </p>

        {msg && (
          <div className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm py-3 px-4 rounded-xl mb-6 font-medium">
            {msg}
          </div>
        )}

        <div className="space-y-3">
          <button 
            onClick={handleCheck}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-[20px] font-bold shadow-xl shadow-gray-900/10 cursor-pointer active:scale-95 transition-all disabled:opacity-70"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
            دڵنیابوونەوە لە پشتڕاستکردنەوە
          </button>
          
          <button 
            onClick={handleResend}
            disabled={isLoading}
            className="w-full py-4 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-[20px] transition-colors cursor-pointer"
          >
            دووبارە ناردنەوەی لینک
          </button>
          
          <button 
            onClick={onLogout}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-4 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 rounded-[20px] transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            چوونەدەرەوە
          </button>
        </div>
      </div>
    </div>
  );
}
