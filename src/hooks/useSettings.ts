import { useState, useEffect, useCallback } from 'react';
import type { AppSettings } from '@/types';

const SETTINGS_KEY = 'sipintar_settings';

const defaultSettings: AppSettings = {
  scheduledTime: '07:00',
  schoolName: 'Madrasah Islamiyah',
  warningMessage: 'Waktu masuk sekolah telah lewat. Mohon datang tepat waktu!',
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
  }, [settings, isLoaded]);

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const isLate = useCallback((arrivalTime: string): boolean => {
    const [scheduledHour, scheduledMinute] = settings.scheduledTime.split(':').map(Number);
    const [arrivalHour, arrivalMinute] = arrivalTime.split(':').map(Number);
    
    const scheduledMinutes = scheduledHour * 60 + scheduledMinute;
    const arrivalMinutes = arrivalHour * 60 + arrivalMinute;
    
    return arrivalMinutes > scheduledMinutes;
  }, [settings.scheduledTime]);

  const getLateMinutes = useCallback((arrivalTime: string): number => {
    const [scheduledHour, scheduledMinute] = settings.scheduledTime.split(':').map(Number);
    const [arrivalHour, arrivalMinute] = arrivalTime.split(':').map(Number);
    
    const scheduledMinutes = scheduledHour * 60 + scheduledMinute;
    const arrivalMinutes = arrivalHour * 60 + arrivalMinute;
    
    return Math.max(0, arrivalMinutes - scheduledMinutes);
  }, [settings.scheduledTime]);

  return {
    settings,
    isLoaded,
    updateSettings,
    isLate,
    getLateMinutes,
  };
}
