import { useSettings } from '@/hooks/useSettings';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Clock, 
  School, 
  AlertTriangle,
  Save,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';

export function Settings() {
  const { settings, updateSettings, isLoaded } = useSettings();
  const [formData, setFormData] = useState(settings);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setFormData(settings);
    }
  }, [settings, isLoaded]);

  const handleSave = () => {
    updateSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    setFormData(settings);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-emerald-800 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6" />
          Pengaturan
        </h2>
        <p className="text-emerald-600/70">Atur preferensi aplikasi sesuai kebutuhan</p>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* School Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-emerald-800 flex items-center gap-2">
              <School className="w-5 h-5" />
              Informasi Sekolah
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="school-name">Nama Sekolah</Label>
              <Input
                id="school-name"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                placeholder="Masukkan nama sekolah"
                className="border-emerald-200"
              />
              <p className="text-xs text-slate-500">
                Nama ini akan ditampilkan di beranda aplikasi
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Time Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-emerald-800 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Pengaturan Waktu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scheduled-time">Waktu Masuk Sekolah</Label>
              <Input
                id="scheduled-time"
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                className="border-emerald-200"
              />
              <p className="text-xs text-slate-500">
                Waktu ini digunakan sebagai patokan untuk menentukan keterlambatan
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Warning Settings */}
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg text-emerald-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Pesan Peringatan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="warning-message">Pesan Peringatan Keterlambatan</Label>
              <Textarea
                id="warning-message"
                value={formData.warningMessage}
                onChange={(e) => setFormData({ ...formData, warningMessage: e.target.value })}
                placeholder="Masukkan pesan peringatan..."
                className="border-emerald-200 min-h-[100px]"
              />
              <p className="text-xs text-slate-500">
                Pesan ini akan ditampilkan saat siswa terlambat melebihi waktu yang ditentukan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-islamic hover:opacity-90 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaved ? 'Tersimpan!' : 'Simpan Pengaturan'}
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1 border-slate-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <SettingsIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-800 mb-2">Tentang Pengaturan</h3>
              <ul className="space-y-2 text-sm text-emerald-700/70">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Waktu masuk sekolah digunakan sebagai patokan untuk menghitung keterlambatan siswa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Pesan peringatan akan muncul otomatis saat waktu kedatangan melebihi waktu yang ditentukan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Semua pengaturan akan disimpan secara otomatis di perangkat Anda</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
