import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { PaymentPortal } from './pages/PaymentPortal';
import { Leaderboard } from './pages/Leaderboard';
import { Analytics } from './pages/Analytics';
import { GuiltMeter } from './pages/GuiltMeter';
import { Profile } from './pages/Profile';

type Page = 'home' | 'pay' | 'compete' | 'analytics' | 'guilt-meter' | 'profile';

interface PaymentData {
  amount: number;
  category: string;
  mood: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [paymentData, setPaymentData] = useState<PaymentData | undefined>();

  const handleNavigate = (page: string, data?: PaymentData) => {
    setCurrentPage(page as Page);
    if (data) {
      setPaymentData(data);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'pay':
        return <PaymentPortal onNavigate={handleNavigate} />;
      case 'compete':
        return <Leaderboard />;
      case 'analytics':
        return <Analytics />;
      case 'guilt-meter':
        return <GuiltMeter paymentData={paymentData} onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;
