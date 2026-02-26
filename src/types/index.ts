export interface Student {
  id: string;
  name: string;
  class: string;
}

export interface LateRecord {
  id: string;
  studentId: string;
  date: string;
  arrivalTime: string;
  scheduledTime: string;
  reason?: string;
  isExcused: boolean;
}

export interface DailyQuote {
  text: string;
  author: string;
  source: string;
  lastUpdated: string;
}

export interface AppSettings {
  scheduledTime: string;
  schoolName: string;
  warningMessage: string;
}

export type ViewMode = 'dashboard' | 'students' | 'records' | 'settings';
