import { ArrowRight, Star, Clock, PlayCircle, Users, CheckCircle2 } from 'lucide-react';
import { Course } from '../types';
import { motion } from 'motion/react';

interface CourseDetailsProps {
  course: Course;
  hasPurchased: boolean;
  onClose: () => void;
  onBuy: () => void;
}

export function CourseDetails({ course, hasPurchased, onClose, onBuy }: CourseDetailsProps) {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col overflow-hidden"
    >
      {/* Header Image Area */}
      <div className="relative h-64 bg-gray-100 dark:bg-gray-800 shrink-0 border-b border-gray-100 dark:border-gray-800 overflow-hidden">
        {course.image && (
          <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
        )}
        {course.image && <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />}
        <button 
          onClick={onClose}
          className="absolute top-12 right-6 w-10 h-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 dark:text-white shadow-sm z-10 cursor-pointer"
        >
          <ArrowRight size={20} strokeWidth={2} />
        </button>
        
        {!course.image && (
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle size={64} strokeWidth={1} className="text-gray-300 dark:text-gray-600" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32 no-scrollbar">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-lg text-xs font-bold">
            {course.category}
          </span>
          <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
            <Star size={14} fill="currentColor" />
            {course.rating}
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
          {course.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-6">
          لەگەڵ مامۆستا <span className="text-gray-900 dark:text-gray-200 font-bold">{course.instructor}</span>
        </p>

        {/* Stats Row */}
        <div className="flex gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
              <Users size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">بەشداربووان</p>
              <p className="font-bold text-gray-900 dark:text-white">{course.students}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">وانەکان</p>
              <p className="font-bold text-gray-900 dark:text-white">{course.lessonsCount} وانە</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">دەربارەی کۆرس</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Lessons Placeholder */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">ناوەڕۆکی کۆرس</h2>
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-[20px] flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-gray-900 dark:text-white font-bold shrink-0">
                  {num}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">ناوی وانەی {num} لێرەدایە</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">12 خولەک • ڤیدیۆ</p>
                </div>
                {hasPurchased ? (
                  <PlayCircle size={24} className="text-indigo-500" strokeWidth={2} />
                ) : (
                  <PlayCircle size={24} className="text-gray-300 dark:text-gray-600" strokeWidth={1.5} />
                )}
              </div>
            ))}
            <button className="text-sm font-bold text-gray-500 dark:text-gray-400 py-3">
              بینینی هەموو وانەکان...
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-4 pb-8 flex items-center justify-between z-20">
        {!hasPurchased ? (
          <>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">نرخی کۆرس</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {course.price.toLocaleString()} <span className="text-sm">د.ع</span>
                </h3>
                {course.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {course.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <button 
              onClick={onBuy}
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-[20px] font-bold shadow-xl shadow-gray-900/10 cursor-pointer active:scale-95 transition-transform"
            >
              بەشداریکردن
            </button>
          </>
        ) : (
          <div className="w-full">
            <button 
              onClick={onClose}
              className="w-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 py-4 rounded-[20px] font-bold cursor-pointer transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={20} strokeWidth={2.5} />
              لە کۆرسەکە بەشداربوویت
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
