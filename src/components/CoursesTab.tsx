import { useState } from 'react';
import { Star, Search, Library } from 'lucide-react';
import { mockCourses } from '../data';

interface CoursesTabProps {
  onOpenCourse: (courseId: string) => void;
  onOpenMyCourses: () => void;
}

export function CoursesTab({ onOpenCourse, onOpenMyCourses }: CoursesTabProps) {
  const categories = ['هەمووی', 'ئۆفیس', 'ئەندازیاری', 'داتابەیس', 'دیزاین'];
  const [activeCat, setActiveCat] = useState('هەمووی');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Logic to filter courses based on category and search query
  const filteredCourses = mockCourses.filter(c => {
    const matchesCategory = activeCat === 'هەمووی' || c.category === activeCat;
    const matchesSearch = c.title.includes(searchQuery) || c.instructor.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-gray-900 animate-in fade-in duration-500 transition-colors duration-300">
      <div className="px-6 pt-12 pb-4 sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl z-20 border-b border-gray-50 dark:border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Library size={20} strokeWidth={2} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">کۆرسەکان</h1>
          </div>
          <button 
            onClick={onOpenMyCourses}
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3.5 py-2 rounded-2xl flex items-center gap-1.5 font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            <Library size={16} strokeWidth={2} />
            <span>کۆرسەکانم</span>
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" strokeWidth={2} />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ناوی کۆرس یان مامۆستا بنووسە..." 
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl py-3 pr-10 pl-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat, i) => {
            const isActive = activeCat === cat;
            return (
              <button 
                key={i}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all border cursor-pointer shrink-0
                  ${isActive 
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-sm' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4">
        {filteredCourses.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-10">هیچ کۆرسێک نەدۆزرایەوە بۆ گەڕانەکەت.</p>
        )}
        
        {filteredCourses.map((course) => (
          <div 
            key={course.id} 
            onClick={() => onOpenCourse(course.id)}
            className="bg-white dark:bg-gray-800 rounded-[24px] p-3 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex gap-4 items-center cursor-pointer"
          >
            <div className="w-24 h-24 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-[18px] shrink-0 flex items-center justify-center text-gray-400 dark:text-gray-500 overflow-hidden relative">
              {course.image ? (
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              )}
            </div>
            
            <div className="flex-1 min-w-0 py-1 pr-1">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate mb-1">{course.title}</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-3 truncate">م. {course.instructor}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-[11px] font-medium">
                  <Star size={12} className="text-gray-900 dark:text-white" fill="currentColor" />
                  <span>{course.rating}</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white text-sm">{course.price.toLocaleString()} د.ع</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
