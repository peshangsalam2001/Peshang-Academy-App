import { useState } from 'react';
import { FileText, Clock, AlertCircle } from 'lucide-react';
import { Exam } from '../types';

interface TasksTabProps {
  tasks: Exam[];
  onOpenTask: (taskId: string) => void;
}

export function TasksTab({ tasks, onOpenTask }: TasksTabProps) {
  const [activeFilter, setActiveFilter] = useState<'upcoming' | 'completed'>('upcoming');
  
  const filteredExams = tasks.filter(t => 
    activeFilter === 'completed' ? t.status === 'completed' : t.status !== 'completed'
  );

  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-gray-900 animate-in fade-in duration-500 px-6 pt-12 transition-colors duration-300">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">تاقیکردنەوەکان</h1>
      
      <div className="flex gap-4 border-b border-gray-100 dark:border-gray-800 mb-6">
        <button 
          onClick={() => setActiveFilter('upcoming')}
          className={`pb-4 text-sm font-medium transition-all relative cursor-pointer ${activeFilter === 'upcoming' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
        >
          داهاتوو
          {activeFilter === 'upcoming' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveFilter('completed')}
          className={`pb-4 text-sm font-medium transition-all relative cursor-pointer ${activeFilter === 'completed' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
        >
          ئەنجامدراو
          {activeFilter === 'completed' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white rounded-t-full"></div>}
        </button>
      </div>

      <div className="flex flex-col gap-3 pb-32">
        {filteredExams.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500 flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-gray-700">
               <FileText size={24} className="text-gray-300 dark:text-gray-600" strokeWidth={2} />
            </div>
            <p className="text-sm font-medium">هیچ تاقیکردنەوەیەک نییە</p>
          </div>
        ) : (
          filteredExams.map((exam) => (
            <div 
              key={exam.id} 
              onClick={() => onOpenTask(exam.id)}
              className="bg-white dark:bg-gray-800 rounded-[24px] p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col gap-3 group cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-[12px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm mb-1 font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {exam.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium line-clamp-1">{exam.courseName}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                  <AlertCircle size={14} />
                  <span>{exam.totalMarks} نمرە</span>
                </div>
                <span className="w-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></span>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                  <Clock size={14} />
                  <span>{exam.durationMinutes} خولەک</span>
                </div>
              </div>
              
              {exam.status === 'upcoming' && (
                <div className="mt-2 bg-gray-50 dark:bg-gray-900 py-2.5 px-3 rounded-xl border border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-400 text-center font-medium">
                  دەستپێدەکات: {exam.date}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
