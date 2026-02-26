import { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('id-ID', options);
  };

  const getHijriDate = () => {
    // Approximate Hijri date calculation
    const today = new Date();
    const hijriYear = Math.floor((today.getTime() - new Date('622-07-16').getTime()) / (1000 * 60 * 60 * 24 * 354.367)) + 1;
    const months = ['Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir', 'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban', 'Ramadhan', 'Syawal', 'Dzulqa\'dah', 'Dzulhijjah'];
    const hijriMonth = months[today.getMonth()];
    const hijriDay = today.getDate();
    return `${hijriDay} ${hijriMonth} ${hijriYear} H`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full p-6 rounded-2xl bg-gradient-islamic text-white shadow-islamic relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-300 rounded-full blur-2xl" />
      </div>

      {/* Islamic Pattern */}
      <div className="absolute inset-0 opacity-5 pattern-islamic" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-emerald-100">Waktu Sekarang</span>
        </div>

        <div className="text-center py-4">
          <motion.div
            key={currentTime.getSeconds()}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            className="text-5xl sm:text-6xl font-bold tracking-wider font-mono"
          >
            {formatTime(currentTime)}
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-4 text-emerald-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{formatDate(currentTime)}</span>
          </div>
          <span className="hidden sm:inline text-emerald-300">|</span>
          <span className="text-sm font-medium text-amber-300">{getHijriDate()}</span>
        </div>
      </div>
    </motion.div>
  );
}
