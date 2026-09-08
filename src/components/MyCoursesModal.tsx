import { ArrowRight, Search, PlayCircle, Calendar, CreditCard } from 'lucide-react';
import { PurchasedCourse } from '../types';
import { motion } from 'motion/react';
import { useState } from 'react';

interface MyCoursesModalProps {
  courses: PurchasedCourse[];
  onClose: () => void;
  onOpenCourse: (id: string) => void;
}

export function MyCoursesModal({ courses, onClose, onOpenCourse }: MyCoursesModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(c => 
    c.title.includes(searchQuery) || 
    c.instructor.includes(searchQuery)
  );

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white dark:bg-gray-900 z-[70] flex flex-col overflow-hidden"
    >
      <div className="px-6 pt-12 pb-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-20">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">کۆرسەکانم</h1>
        <button onClick={onClose} className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 transition-colors">
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar pb-32">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="گەڕان لەناو کۆرسەکانم..." 
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl py-4 pr-12 pl-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-300 dark:focus:border-gray-500 transition-all"
          />
        </div>

        <div className="flex flex-col gap-4">
          {filteredCourses.length === 0 ? (
            <p className="text-center text-sm text-gray-400 mt-10">هیچ کۆرسێک نەدۆزرایەوە</p>
          ) : (
            filteredCourses.map(course => (
              <div 
                key={course.id}
                onClick={() => onOpenCourse(course.id)}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="p-4 flex gap-4 border-b border-gray-50 dark:border-gray-700/50">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ${course.color} bg-opacity-10 dark:bg-opacity-20 text-${course.color.replace('bg-', '')}`}>
                    <PlayCircle size={32} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base truncate mb-1">{course.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 truncate">م. {course.instructor}</p>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-1">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold">0% تەواوکراوە</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 font-medium font-mono" dir="ltr">
                    <Calendar size={12} />
                    {course.purchaseDate}
                  </div>
                  <div className="flex flex-col items-end gap-1 text-[11px] font-bold text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <CreditCard size={12} />
                      {course.paymentMethod}
                    </div>
                    <span className="text-gray-900 dark:text-white text-xs">{course.purchasePrice.toLocaleString()} د.ع</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
