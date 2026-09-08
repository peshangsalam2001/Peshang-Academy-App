import { useState } from 'react';
import { Check, Circle } from 'lucide-react';
import { Task } from '../types';

interface TasksTabProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onOpenTask: (taskId: string) => void;
}

export function TasksTab({ tasks, onToggle, onOpenTask }: TasksTabProps) {
  const [activeFilter, setActiveFilter] = useState<'pending' | 'completed'>('pending');
  
  const filteredTasks = tasks.filter(t => 
    activeFilter === 'completed' ? t.completed : !t.completed
  );

  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-gray-900 animate-in fade-in duration-500 px-6 pt-12 transition-colors duration-300">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">ئەرکەکان</h1>
      
      <div className="flex gap-4 border-b border-gray-100 dark:border-gray-800 mb-6">
        <button 
          onClick={() => setActiveFilter('pending')}
          className={`pb-4 text-sm font-medium transition-all relative cursor-pointer ${activeFilter === 'pending' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
        >
          تەواونەکراو
          {activeFilter === 'pending' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveFilter('completed')}
          className={`pb-4 text-sm font-medium transition-all relative cursor-pointer ${activeFilter === 'completed' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
        >
          تەواوکراو
          {activeFilter === 'completed' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white rounded-t-full"></div>}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500 flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-gray-700">
               <Check size={24} className="text-gray-300 dark:text-gray-600" strokeWidth={2} />
            </div>
            <p className="text-sm font-medium">هیچ ئەرکێک نییە</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              onClick={() => onOpenTask(task.id)}
              className="bg-white dark:bg-gray-800 rounded-[24px] p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex gap-4 items-start group cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(task.id);
                }}
                className="pt-0.5 shrink-0 transition-colors text-gray-300 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white cursor-pointer"
              >
                {task.completed ? (
                  <div className="w-5 h-5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center shadow-sm">
                    <Check size={12} strokeWidth={3} />
                  </div>
                ) : (
                  <Circle size={22} strokeWidth={1.5} />
                )}
              </button>
              
              <div className="flex-1">
                <h3 className={`text-sm mb-1.5 font-bold ${task.completed ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>
                  {task.title}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{task.course}</p>
                  <span className="w-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></span>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">{task.dueDate}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
