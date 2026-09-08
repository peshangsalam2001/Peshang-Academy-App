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

export interface Task {
  id: string;
  course: string;
  title: string;
  dueDate: string;
  completed: boolean;
  description: string;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: 'topup' | 'purchase' | 'course' | 'system';
}
