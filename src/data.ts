import { Course, Transaction, Task } from './types';

export const mockCourses: Course[] = [
  {
    id: 'c1',
    title: 'مایکرۆسۆفت وۆرد لە سفرەوە',
    instructor: 'ئەحمەد قادر',
    category: 'ئۆفیس',
    price: 25000,
    originalPrice: 35000,
    rating: 4.8,
    students: 1250,
    color: 'bg-blue-500',
    icon: 'FileText',
    image: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b38?q=80&w=800&auto=format&fit=crop',
    description: 'لە ڕێگەی ئەم کۆرسەوە فێری هەموو تایبەتمەندییەکانی مایکرۆسۆفت وۆرد دەبیت لە ئاستی سەرەتاییەوە تا پێشکەوتوو. فێری دروستکردنی سیڤی، ڕاپۆرت، و خشتەی پێشکەوتوو دەبیت.',
    lessonsCount: 24
  },
  {
    id: 'c2',
    title: 'مایکرۆسۆفت ئەکسێس بۆ پێشکەوتووان',
    instructor: 'سۆران محەمەد',
    category: 'داتابەیس',
    price: 35000,
    rating: 4.9,
    students: 840,
    color: 'bg-rose-500',
    icon: 'Database',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop',
    description: 'باشترین کۆرس بۆ دروستکردنی بنکەدراوەیەکی بەهێز بۆ کۆمپانیا و فرۆشگاکان. فێری دروستکردنی فۆڕم و ڕاپۆرتی ئاڵۆز دەبیت.',
    lessonsCount: 18
  },
  {
    id: 'c3',
    title: 'ئۆتۆکاد بۆ ئەندازیاران',
    instructor: 'نەریمان جەلال',
    category: 'ئەندازیاری',
    price: 50000,
    originalPrice: 75000,
    rating: 4.7,
    students: 2100,
    color: 'bg-slate-700',
    icon: 'PenTool',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
    description: 'کۆرسێکی تەواوەتی بۆ ئەندازیاران بۆ کێشانی نەخشەی 2D و 3D بە وردی. پڕۆژەی ڕاستەقینەی تێدایە بۆ دروستکردنی نەخشەی بینا.',
    lessonsCount: 42
  },
  {
    id: 'c4',
    title: 'فێربوونی مایکرۆسۆفت ئێکسڵ',
    instructor: 'ئەحمەد قادر',
    category: 'ئۆفیس',
    price: 30000,
    originalPrice: 40000,
    rating: 4.6,
    students: 1560,
    color: 'bg-green-600',
    icon: 'Table',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    description: 'لە ڕێگەی ئەم کۆرسەوە فێری هاوکێشە بیرکارییەکان، ڤیلکئەپ (VLOOKUP)، و دروستکردنی داشبۆردی داتاکان دەبیت لە ئێکسڵ.',
    lessonsCount: 30
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    title: 'پڕکردنەوەی هەژمار - FastPay',
    amount: 50000,
    date: '2023-10-25 10:30 AM',
    type: 'credit',
    status: 'completed',
    method: 'FastPay',
    reference: 'FP-982374'
  },
  {
    id: 't2',
    title: 'کڕینی کۆرسی مایکرۆسۆفت ئەکسێس',
    amount: 35000,
    date: '2023-10-26 02:15 PM',
    type: 'debit',
    status: 'completed',
    method: 'Wallet',
    reference: 'ORD-10923'
  },
  {
    id: 't3',
    title: 'پڕکردنەوەی هەژمار - FIB',
    amount: 25000,
    date: '2023-10-28 09:00 AM',
    type: 'credit',
    status: 'completed',
    method: 'FIB',
    reference: 'FIB-556128'
  }
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'n1',
    title: 'پڕکردنەوەی باڵانس',
    description: 'بڕی 50,000 دینار خرایە سەر هەژمارەکەت لە ڕێگەی FastPay.',
    date: '2023-10-25 10:30 AM',
    read: false,
    type: 'topup',
    actionId: 't1'
  },
  {
    id: 'n2',
    title: 'کۆرسی نوێ بڵاوکرایەوە',
    description: 'کۆرسی نوێی "ئۆتۆکاد بۆ ئەندازیاران" لەلایەن م. نەریمان جەلال بڵاوکرایەوە. ئێستا دەتوانیت بەشداری بکەیت!',
    date: '2023-10-25 04:00 PM',
    read: false,
    type: 'course',
    actionId: 'c3'
  },
  {
    id: 'n3',
    title: 'کڕینی کۆرس',
    description: 'پیرۆزە! بە سەرکەوتوویی بەشداربوویت لە کۆرسی مایکرۆسۆفت ئەکسێس.',
    date: '2023-10-26 02:15 PM',
    read: false,
    type: 'purchase',
    actionId: 'c2'
  },
  {
    id: 'n4',
    title: 'وەشانی نوێ',
    description: 'ئەپلیکەیشنەکە نوێکرایەوە بۆ وەشانی 1.2.0. کۆمەڵێک تایبەتمەندی نوێ زیادکراون.',
    date: '2023-10-27 09:00 AM',
    read: true,
    type: 'system'
  }
];

export const mockExams = [
  {
    id: 'ex1',
    courseId: 'c1',
    courseName: 'مایکرۆسۆفت وۆرد لە سفرەوە',
    title: 'تاقیکردنەوەی مایکرۆسۆفت وۆرد',
    date: 'دوای ٢ ڕۆژی تر - پێنجشەممە',
    durationMinutes: 15,
    totalMarks: 50,
    status: 'upcoming' as const,
    description: 'ئەم تاقیکردنەوەیە لەسەر بابەتەکانی دروستکردنی خشتە، دیزاینی پەڕە و نووسینی ڕاپۆرتە. تەنها خاوەنەکانی ئەم کۆرسە دەتوانن بەشداری بکەن.'
  },
  {
    id: 'ex2',
    courseId: 'c2',
    courseName: 'مایکرۆسۆفت ئەکسێس بۆ پێشکەوتووان',
    title: 'تاقیکردنەوەی کۆتایی ئەکسێس',
    date: 'ڕۆژی شەممە',
    durationMinutes: 30,
    totalMarks: 100,
    status: 'upcoming' as const,
    description: 'تاقیکردنەوەیەکی گشتگیر لەسەر دروستکردنی فۆڕم، ڕاپۆرت، و پەیوەندی نێوان خشتەکان. تەنها خاوەنەکانی ئەم کۆرسە دەتوانن بەشداری بکەن.'
  },
  {
    id: 'ex3',
    courseId: 'c4',
    courseName: 'فێربوونی مایکرۆسۆفت ئێکسڵ',
    title: 'تاقیکردنەوەی هاوکێشەکان (VLOOKUP)',
    date: 'هەفتەی پێشوو',
    durationMinutes: 10,
    totalMarks: 20,
    status: 'completed' as const,
    description: 'تاقیکردنەوەیەک سەبارەت بە دۆزینەوەی زانیاری بە بەکارهێنانی هاوکێشە سەرەکییەکان.'
  }
];

export const mockContinueLearning = [
  {
    courseId: 'c1',
    course: mockCourses[0], // Word
    currentLesson: 'وانەی ٤: دروستکردنی خشتە',
    progress: 45
  },
  {
    courseId: 'c3',
    course: mockCourses[2], // AutoCAD
    currentLesson: 'وانەی ١٠: کێشانی نەخشەی سەرەتایی',
    progress: 24
  }
];

export const mockPurchasedCourses = [
  {
    ...mockCourses[0],
    purchaseDate: '2023-10-15 08:30 PM',
    purchasePrice: 25000,
    paymentMethod: 'FIB'
  }
];
