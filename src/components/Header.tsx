import { Clock, BookOpen, Users, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ViewMode } from '@/types';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const navItems: { id: ViewMode; label: string; icon: typeof Clock }[] = [
  { id: 'dashboard', label: 'Beranda', icon: Clock },
  { id: 'students', label: 'Data Siswa', icon: Users },
  { id: 'records', label: 'Riwayat', icon: BookOpen },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
];

export function Header({ currentView, onViewChange, isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass-islamic border-b border-emerald-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-islamic flex items-center justify-center shadow-islamic">
              <span className="text-white text-xl font-bold">☪</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-emerald-800 leading-tight">ASSTA Pintar</h1>
              <p className="text-xs text-emerald-600/70">Pencatat Keterlambatan</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => onViewChange(item.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'bg-emerald-100 text-emerald-700 shadow-inner' 
                      : 'text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-emerald-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-100 bg-white/95 backdrop-blur-xl">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => {
                    onViewChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl justify-start
                    ${isActive 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'text-emerald-600 hover:bg-emerald-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
