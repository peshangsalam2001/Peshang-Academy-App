export type TabType = 'home' | 'courses' | 'wallet' | 'tasks' | 'settings';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  color: string;
  icon: string;
  image?: string;
  description: string;
  lessonsCount: number;
}

export interface PurchasedCourse extends Course {
  purchaseDate: string;
  purchasePrice: number;
  paymentMethod: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  status?: 'completed' | 'pending' | 'failed';
  method?: string;
  reference?: string;
}

export interface Exam {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  date: string;
  durationMinutes: number;
  totalMarks: number;
  status: 'upcoming' | 'active' | 'completed';
  description: string;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: 'topup' | 'purchase' | 'course' | 'system';
  actionId?: string; // id of the related item (courseId, transactionId, etc)
}
