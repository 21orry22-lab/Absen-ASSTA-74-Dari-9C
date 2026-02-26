import { useState } from 'react';
import { useStudents } from '@/hooks/useStudents';
import { useSettings } from '@/hooks/useSettings';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Search, 
  AlertCircle,
  Check,
  Calendar,
  User,
  X,
  History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import type { Student } from '@/types';

export function LateRecorder() {
  const { students, records, addRecord, deleteRecord, getStudentRecords } = useStudents();
  const { settings, isLate, getLateMinutes } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [recordForm, setRecordForm] = useState({
    arrivalTime: new Date().toTimeString().slice(0, 5),
    reason: '',
    isExcused: false,
  });

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todayRecords = records.filter(record => {
    const today = new Date().toISOString().split('T')[0];
    return record.date === today;
  });

  const handleRecord = () => {
    if (selectedStudent) {
      addRecord({
        studentId: selectedStudent.id,
        date: new Date().toISOString().split('T')[0],
        arrivalTime: recordForm.arrivalTime,
        scheduledTime: settings.scheduledTime,
        reason: recordForm.reason,
        isExcused: recordForm.isExcused,
      });
      setIsRecordDialogOpen(false);
      setSelectedStudent(null);
      setRecordForm({
        arrivalTime: new Date().toTimeString().slice(0, 5),
        reason: '',
        isExcused: false,
      });
    }
  };

  const openRecordDialog = (student: Student) => {
    setSelectedStudent(student);
    setRecordForm({
      arrivalTime: new Date().toTimeString().slice(0, 5),
      reason: '',
      isExcused: false,
    });
    setIsRecordDialogOpen(true);
  };

  const openHistoryDialog = (student: Student) => {
    setSelectedStudent(student);
    setIsHistoryDialogOpen(true);
  };

  const getStudentName = (studentId: string) => {
    return students.find(s => s.id === studentId)?.name || 'Unknown';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-emerald-800 flex items-center gap-2">
            <Clock className="w-6 h-6" />
            Catat Keterlambatan
          </h2>
          <p className="text-emerald-600/70">
            Waktu masuk: <span className="font-semibold">{settings.scheduledTime}</span>
          </p>
        </div>
      </div>

      {/* Today's Late Students */}
      {todayRecords.length > 0 && (
        <Card className="border-0 shadow-lg border-l-4 border-l-amber-500">
          <CardHeader>
            <CardTitle className="text-lg text-amber-700 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Siswa Terlambat Hari Ini ({todayRecords.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {todayRecords.map((record) => (
                <Badge
                  key={record.id}
                  variant="secondary"
                  className={`px-3 py-1.5 text-sm ${
                    record.isExcused
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {getStudentName(record.studentId)}
                  <span className="ml-2 text-xs opacity-70">
                    ({record.arrivalTime})
                  </span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Cari siswa untuk mencatat keterlambatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filteredStudents.map((student) => {
            const isAlreadyLateToday = todayRecords.some(r => r.studentId === student.id);
            
            return (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <Card className={`border-0 shadow-lg hover:shadow-xl transition-all ${
                  isAlreadyLateToday ? 'bg-amber-50/50' : ''
                }`}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                          isAlreadyLateToday 
                            ? 'bg-gradient-gold' 
                            : 'bg-gradient-islamic'
                        }`}>
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{student.name}</h3>
                          <p className="text-sm text-slate-500">{student.class}</p>
                        </div>
                      </div>
                      {isAlreadyLateToday && (
                        <Badge className="bg-amber-100 text-amber-700">
                          <Check className="w-3 h-3 mr-1" />
                          Tercatat
                        </Badge>
                      )}
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button
                        onClick={() => openRecordDialog(student)}
                        className={`flex-1 ${
                          isAlreadyLateToday
                            ? 'bg-amber-500 hover:bg-amber-600'
                            : 'bg-gradient-islamic hover:opacity-90'
                        } text-white`}
                        size="sm"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        {isAlreadyLateToday ? 'Catat Lagi' : 'Catat'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => openHistoryDialog(student)}
                        className="border-slate-200"
                        size="sm"
                      >
                        <History className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredStudents.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-600 mb-1">
              Tidak ada siswa yang cocok
            </h3>
            <p className="text-sm text-slate-400">
              Coba kata kunci lain
            </p>
          </CardContent>
        </Card>
      )}

      {/* Record Dialog */}
      <Dialog open={isRecordDialogOpen} onOpenChange={setIsRecordDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-emerald-800 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Catat Keterlambatan
            </DialogTitle>
            <DialogDescription>
              Mencatat keterlambatan untuk <strong>{selectedStudent?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            {/* Warning if late */}
            {isLate(recordForm.arrivalTime) && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-700">Peringatan Keterlambatan!</p>
                    <p className="text-sm text-red-600">
                      Siswa terlambat {getLateMinutes(recordForm.arrivalTime)} menit dari waktu yang ditentukan.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="arrival-time">Waktu Kedatangan</Label>
              <Input
                id="arrival-time"
                type="time"
                value={recordForm.arrivalTime}
                onChange={(e) => setRecordForm({ ...recordForm, arrivalTime: e.target.value })}
                className="border-emerald-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Alasan Keterlambatan (Opsional)</Label>
              <Textarea
                id="reason"
                placeholder="Masukkan alasan keterlambatan..."
                value={recordForm.reason}
                onChange={(e) => setRecordForm({ ...recordForm, reason: e.target.value })}
                className="border-emerald-200 min-h-[80px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="excused"
                checked={recordForm.isExcused}
                onCheckedChange={(checked) => 
                  setRecordForm({ ...recordForm, isExcused: checked as boolean })
                }
              />
              <Label htmlFor="excused" className="text-sm cursor-pointer">
                Keterlambatan dimaafkan (izin/sakit)
              </Label>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsRecordDialogOpen(false)}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                onClick={handleRecord}
                className="flex-1 bg-gradient-islamic hover:opacity-90 text-white"
              >
                Simpan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-emerald-800 flex items-center gap-2">
              <History className="w-5 h-5" />
              Riwayat Keterlambatan
            </DialogTitle>
            <DialogDescription>
              Riwayat keterlambatan <strong>{selectedStudent?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 pt-4">
            {selectedStudent && getStudentRecords(selectedStudent.id).length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-500" />
                </div>
                <p className="text-slate-600 font-medium">Belum pernah terlambat</p>
                <p className="text-sm text-slate-400">Alhamdulillah, siswa ini selalu tepat waktu</p>
              </div>
            ) : (
              selectedStudent && getStudentRecords(selectedStudent.id).map((record) => (
                <div
                  key={record.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium">
                          {new Date(record.date).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">
                          Datang: {record.arrivalTime} (Seharusnya: {record.scheduledTime})
                        </span>
                      </div>
                      {record.reason && (
                        <p className="text-sm text-slate-500 mt-2">
                          Alasan: {record.reason}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {record.isExcused ? (
                        <Badge className="bg-emerald-100 text-emerald-700">Dimaafkan</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700">Tidak Dimaafkan</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteRecord(record.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 px-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
