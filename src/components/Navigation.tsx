import { useState } from 'react';
import { Home, CreditCard, Trophy, BarChart3, Shield, User, Menu, X, Zap } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'pay', label: 'Pay', icon: CreditCard },
  { id: 'compete', label: 'Compete', icon: Trophy },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'guilt-meter', label: 'Guilt Meter', icon: Shield },
  { id: 'profile', label: 'Profile', icon: User },
];

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,15,0.8)] backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
              <Zap className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-black gradient-text">NexPay</span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all duration-300
                      flex items-center gap-2
                      ${isActive
                        ? 'text-purple-300 bg-purple-500/20 shadow-[0_0_15px_rgba(176,38,255,0.3)]'
                        : 'text-purple-400/70 hover:text-purple-300 hover:bg-purple-500/10'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <button
              className="md:hidden p-2 text-purple-300 hover:text-purple-200 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-[rgba(20,20,35,0.98)] backdrop-blur-xl border-b border-purple-500/20 p-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      px-4 py-3 rounded-xl font-medium transition-all duration-300
                      flex items-center gap-3
                      ${isActive
                        ? 'text-purple-300 bg-purple-500/20 shadow-[0_0_15px_rgba(176,38,255,0.3)]'
                        : 'text-purple-400/70 hover:text-purple-300 hover:bg-purple-500/10'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}