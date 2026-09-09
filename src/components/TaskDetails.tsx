import { ArrowRight, Clock, AlertCircle, Play } from 'lucide-react';
import { Exam } from '../types';
import { motion } from 'motion/react';

interface ExamDetailsProps {
  exam: Exam;
  onClose: () => void;
}

export function ExamDetails({ exam, onClose }: ExamDetailsProps) {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col overflow-hidden"
    >
      <div className="px-6 pt-12 pb-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-20">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">زانیاری تاقیکردنەوە</h1>
        <button onClick={onClose} className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white cursor-pointer">
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 no-scrollbar pb-32">
        <div className="mb-6">
          <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg mb-4 inline-block">
            {exam.courseName}
          </span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">{exam.title}</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
              <AlertCircle size={24} className="text-indigo-600 dark:text-indigo-400 mb-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">کۆی نمرە</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">{exam.totalMarks} نمرە</span>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
              <Clock size={24} className="text-indigo-600 dark:text-indigo-400 mb-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">کاتی دیاریکراو</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">{exam.durationMinutes} خولەک</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-[24px] p-5 border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">ڕوونکردنەوەی تاقیکردنەوە:</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {exam.description}
          </p>
        </div>
        
        {exam.status === 'upcoming' && (
          <div className="mt-6 flex flex-col gap-2 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-[20px] text-blue-700 dark:text-blue-400 text-center">
             <span className="text-sm font-bold block mb-1">وادەی دەستپێکردن:</span>
             <span className="text-sm">{exam.date}</span>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-20">
        <button 
          onClick={() => {
            if (exam.status === 'upcoming') {
                alert('هێشتا کاتی تاقیکردنەوە نەهاتووە!');
            }
          }}
          disabled={exam.status !== 'upcoming'}
          className={`w-full py-4 rounded-[20px] font-bold shadow-xl flex items-center justify-center gap-2 transition-all ${
            exam.status !== 'upcoming'
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 shadow-none opacity-50 cursor-not-allowed' 
              : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-gray-900/10 cursor-pointer active:scale-95'
          }`}
        >
          {exam.status === 'completed' ? 'تاقیکردنەوە کراوە' : 'دەستپێکردنی تاقیکردنەوە'}
          {exam.status === 'upcoming' && <Play size={18} fill="currentColor" />}
        </button>
      </div>
    </motion.div>
  );
}
