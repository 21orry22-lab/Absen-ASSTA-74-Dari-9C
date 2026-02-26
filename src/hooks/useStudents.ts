import { useState, useEffect, useCallback } from 'react';
import type { Student, LateRecord } from '@/types';

const STUDENTS_KEY = 'sipintar_students';
const RECORDS_KEY = 'sipintar_records';

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [records, setRecords] = useState<LateRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedStudents = localStorage.getItem(STUDENTS_KEY);
    const savedRecords = localStorage.getItem(RECORDS_KEY);
    
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
    }
  }, [students, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
    }
  }, [records, isLoaded]);

  const addStudent = useCallback((student: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...student,
      id: crypto.randomUUID(),
    };
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  }, []);

  const updateStudent = useCallback((id: string, updates: Partial<Student>) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, ...updates } : student
      )
    );
  }, []);

  const deleteStudent = useCallback((id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
    setRecords(prev => prev.filter(record => record.studentId !== id));
  }, []);

  const addRecord = useCallback((record: Omit<LateRecord, 'id'>) => {
    const newRecord: LateRecord = {
      ...record,
      id: crypto.randomUUID(),
    };
    setRecords(prev => [newRecord, ...prev]);
    return newRecord;
  }, []);

  const deleteRecord = useCallback((id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  }, []);

  const getStudentRecords = useCallback((studentId: string) => {
    return records.filter(record => record.studentId === studentId);
  }, [records]);

  const getTodayRecords = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return records.filter(record => record.date === today);
  }, [records]);

  const getStudentLateCount = useCallback((studentId: string) => {
    return records.filter(record => record.studentId === studentId).length;
  }, [records]);

  const getFrequentLateStudents = useCallback((limit: number = 5) => {
    const studentLateCounts = students.map(student => ({
      student,
      count: getStudentLateCount(student.id),
    }));
    return studentLateCounts
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }, [students, getStudentLateCount]);

  return {
    students,
    records,
    isLoaded,
    addStudent,
    updateStudent,
    deleteStudent,
    addRecord,
    deleteRecord,
    getStudentRecords,
    getTodayRecords,
    getStudentLateCount,
    getFrequentLateStudents,
  };
}
