import { useState } from 'react';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { StudentManager } from '@/components/StudentManager';
import { LateRecorder } from '@/components/LateRecorder';
import { Settings } from '@/components/Settings';
import { motion, AnimatePresence } from 'framer-motion';
import type { ViewMode } from '@/types';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewChange={setCurrentView} />;
      case 'students':
        return <StudentManager />;
      case 'records':
        return <LateRecorder />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pattern-islamic">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-100 bg-white/50 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-islamic flex items-center justify-center">
                <span className="text-white text-sm font-bold">☪</span>
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-800">ASSTA Pintar</p>
                <p className="text-xs text-emerald-600/70">Pencatat Keterlambatan Siswa</p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm text-slate-600">
                Dibuat oleh Kelompok 18 Kelas 9C
              </p>
              <p className="text-xs text-slate-400 mt-1">
                "Menuntut ilmu itu wajib bagi setiap muslim"
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
