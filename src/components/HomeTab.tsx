import { useState } from 'react';
import { Bell, Search, Play, ArrowLeft, Star, Library } from 'lucide-react';
import { mockCourses } from '../data';
import { TabType } from '../types';

interface HomeTabProps {
  onNavigate: (tab: TabType) => void;
  onToast: (msg: string) => void;
  onOpenCourse: (courseId: string) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenMyCourses: () => void;
  userName: string;
}

export function HomeTab({ onNavigate, onToast, onOpenCourse, unreadCount, onOpenNotifications, onOpenMyCourses, userName }: HomeTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredCourse = mockCourses[2];

  // Search logic
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : mockCourses.filter(c => 
        c.title.includes(searchQuery) || 
        c.instructor.includes(searchQuery) || 
        c.category.includes(searchQuery)
      );
  
  return (
    <div className="flex flex-col animate-in fade-in duration-500 bg-white dark:bg-gray-900 min-h-full transition-colors duration-300">
      {/* Header */}
      <div className="pt-12 pb-6 px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">سڵاو، بەیانیت باش</p>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{userName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onOpenMyCourses}
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3.5 py-2 rounded-2xl flex items-center gap-1.5 font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              <Library size={16} strokeWidth={2} />
              <span>کۆرسەکانم</span>
            </button>
            <button 
              onClick={onOpenNotifications}
              className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-800 flex items-center justify-center relative text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer shrink-0"
            >
              <Bell size={20} strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center text-[8px] font-bold text-white leading-none font-mono pb-px">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="گەڕان بۆ کۆرس، مامۆستا..." 
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl py-4 pr-12 pl-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-300 dark:focus:border-gray-500 transition-all"
          />
        </div>
      </div>

      <div className="px-6 flex flex-col gap-10 mt-2">
        {/* Render Search Results OR Default View */}
        {searchQuery.trim() !== '' ? (
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">ئەنجامەکانی گەڕان</h2>
            {searchResults.length === 0 ? (
              <p className="text-sm text-gray-400 text-center mt-8">هیچ ئەنجامێک نەدۆزرایەوە بۆ "{searchQuery}"</p>
            ) : (
              <div className="flex flex-col gap-4">
                {searchResults.map(course => (
                  <div 
                    key={course.id} 
                    onClick={() => onOpenCourse(course.id)}
                    className="bg-white dark:bg-gray-800 rounded-[24px] p-3 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex gap-4 items-center cursor-pointer"
                  >
                    <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-[18px] shrink-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                      <Play size={20} />
                    </div>
                    <div className="flex-1 min-w-0 py-1 pr-1">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate mb-1">{course.title}</h3>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-2 truncate">م. {course.instructor}</p>
                      <span className="font-bold text-gray-900 dark:text-white text-sm">{course.price.toLocaleString()} د.ع</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Continue Learning */}
            <div>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">بەردەوام بە</h2>
              </div>
              <div 
                onClick={() => onOpenCourse(mockCourses[0].id)}
                className="bg-white dark:bg-gray-800 rounded-[24px] p-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4"
              >
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-600">
                  <Play size={24} className="text-gray-900 dark:text-white ml-1" fill="currentColor" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">مایکرۆسۆفت وۆرد</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">وانەی ٤: دروستکردنی خشتە</p>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1">
                    <div className="bg-gray-900 dark:bg-white h-1 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured */}
            <div>
              <div className="flex justify-between items-end mb-5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">پێشنیارکراو بۆ تۆ</h2>
                <button 
                  onClick={() => onNavigate('courses')}
                  className="text-gray-400 dark:text-gray-500 text-sm flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  هەمووی <ArrowLeft size={16} />
                </button>
              </div>
              
              <div 
                onClick={() => onOpenCourse(featuredCourse.id)}
                className="bg-white dark:bg-gray-800 rounded-[24px] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="h-48 bg-gray-50 dark:bg-gray-700 relative flex items-center justify-center border-b border-gray-50 dark:border-gray-600">
                   <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-sm flex items-center justify-center text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700">
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                   </div>
                   <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-600 shadow-sm">
                     {featuredCourse.category}
                   </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{featuredCourse.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">م. {featuredCourse.instructor}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 dark:text-white">{featuredCourse.price.toLocaleString()} د.ع</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        onOpenCourse(featuredCourse.id);
                      }}
                      className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      بەشداریکردن
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

