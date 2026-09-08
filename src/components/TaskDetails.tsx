import { ArrowRight, Check, Calendar } from 'lucide-react';
import { Task } from '../types';
import { motion } from 'motion/react';

interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
  onToggle: (id: string) => void;
}

export function TaskDetails({ task, onClose, onToggle }: TaskDetailsProps) {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col overflow-hidden"
    >
      <div className="px-6 pt-12 pb-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-20">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">زانیاری ئەرک</h1>
        <button onClick={onClose} className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white cursor-pointer">
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 no-scrollbar pb-32">
        <div className="mb-6">
          <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg mb-4 inline-block">
            {task.course}
          </span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{task.title}</h2>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
            <Calendar size={16} />
            <span>وادەی ڕادەستکردن: {task.dueDate}</span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-[24px] p-5 border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">ڕوونکردنەوەی ئەرک:</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {task.description}
          </p>
        </div>
        
        {task.completed && (
          <div className="mt-6 flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-[20px] text-emerald-700 dark:text-emerald-400">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800/50 rounded-full flex items-center justify-center shrink-0">
              <Check size={16} strokeWidth={3} />
            </div>
            <p className="text-sm font-bold">ئەم ئەرکە بە سەرکەوتوویی تەواو کراوە!</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-20">
        <button 
          onClick={() => {
            onToggle(task.id);
            onClose();
          }}
          className={`w-full py-4 rounded-[20px] font-bold shadow-xl cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-2 ${
            task.completed 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-none' 
              : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-gray-900/10'
          }`}
        >
          {task.completed ? 'گەڕاندنەوە بۆ تەواونەکراو' : 'ئەرکەکەم تەواو کرد'}
          {!task.completed && <Check size={18} strokeWidth={2.5} />}
        </button>
      </div>
    </motion.div>
  );
}
