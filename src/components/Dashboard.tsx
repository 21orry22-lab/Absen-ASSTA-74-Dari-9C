import { useStudents } from '@/hooks/useStudents';
import { useSettings } from '@/hooks/useSettings';
import { DailyQuote } from './DailyQuote';
import { CurrentTime } from './CurrentTime';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  UserCheck,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ViewMode } from '@/types';

interface DashboardProps {
  onViewChange: (view: ViewMode) => void;
}

export function Dashboard({ onViewChange }: DashboardProps) {
  const { students, records, getTodayRecords, getFrequentLateStudents } = useStudents();
  const { settings } = useSettings();

  const todayRecords = getTodayRecords();
  const frequentLateStudents = getFrequentLateStudents(5);

  const stats = [
    {
      title: 'Total Siswa',
      value: students.length,
      icon: Users,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Terlambat Hari Ini',
      value: todayRecords.length,
      icon: Clock,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      title: 'Total Pelanggaran',
      value: records.length,
      icon: AlertTriangle,
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
    {
      title: 'Tepat Waktu',
      value: Math.max(0, students.length - todayRecords.length),
      icon: UserCheck,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="text-center py-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-2">
          Selamat Datang di {settings.schoolName}
        </h2>
        <p className="text-emerald-600/70">
          Sistem Pencatatan Keterlambatan Siswa
        </p>
      </motion.div>

      {/* Current Time & Quote */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <CurrentTime />
        </motion.div>
        <motion.div variants={itemVariants}>
          <DailyQuote />
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className={`text-2xl sm:text-3xl font-bold ${stat.textColor}`}>
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.lightColor} p-2 sm:p-3 rounded-xl`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.textColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-emerald-800">Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => onViewChange('students')}
                className="bg-gradient-islamic hover:opacity-90 text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                Kelola Siswa
              </Button>
              <Button
                onClick={() => onViewChange('records')}
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <Clock className="w-4 h-4 mr-2" />
                Catat Keterlambatan
              </Button>
              <Button
                onClick={() => onViewChange('settings')}
                variant="outline"
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Pengaturan
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Frequent Late Students */}
      {frequentLateStudents.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-emerald-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                Siswa Sering Terlambat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {frequentLateStudents.map(({ student, count }, index) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-islamic flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-red-600">{count}x</span>
                      <span className="text-xs text-slate-400">terlambat</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
