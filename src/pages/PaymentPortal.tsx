import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { QrCode, ShoppingBag, Utensils, Gamepad2, Car, BookOpen, FileText, MoreHorizontal } from 'lucide-react';

interface PaymentPortalProps {
  onNavigate: (page: string, data?: { amount: number; category: string; mood: string }) => void;
}

const quickAmounts = [50, 100, 200, 500, 1000, 2000, 5000];

const categories = [
  { id: 'food', name: 'Food', icon: Utensils, emoji: '🍕' },
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag, emoji: '🛍️' },
  { id: 'entertainment', name: 'Entertainment', icon: Gamepad2, emoji: '🎮' },
  { id: 'transport', name: 'Transport', icon: Car, emoji: '🚗' },
  { id: 'education', name: 'Education', icon: BookOpen, emoji: '📚' },
  { id: 'bills', name: 'Bills', icon: FileText, emoji: '📄' },
  { id: 'other', name: 'Other', icon: MoreHorizontal, emoji: '💫' },
];

const moods = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'excited', emoji: '🤩', label: 'Excited' },
  { id: 'neutral', emoji: '😐', label: 'Neutral' },
  { id: 'stressed', emoji: '😰', label: 'Stressed' },
  { id: 'sad', emoji: '😔', label: 'Sad' },
  { id: 'bored', emoji: '😑', label: 'Bored' },
  { id: 'frustrated', emoji: '😤', label: 'Frustrated' },
];

export function PaymentPortal({ onNavigate }: PaymentPortalProps) {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [recipientUPI, setRecipientUPI] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [isNeed, setIsNeed] = useState(false);

  const handleQuickAmount = (amt: number) => {
    setAmount(amt.toString());
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setCustomAmount(numValue);
    setAmount(numValue);
  };

  const handleAnalyze = () => {
    if (amount && selectedCategory && selectedMood) {
      onNavigate('guilt-meter', {
        amount: parseFloat(amount),
        category: selectedCategory,
        mood: selectedMood,
      });
    }
  };

  const canProceed = amount && recipientUPI && selectedCategory && selectedMood;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            <span className="gradient-text">Make a Payment</span>
          </h1>
          <p className="text-purple-300/70 text-lg">Let's make sure this is a smart decision</p>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold text-purple-200 mb-6">Amount</h2>

            <div className="mb-6">
              <div className="text-center mb-4">
                <div className="text-6xl font-black font-mono gradient-text mb-2">
                  ₹{amount || '0'}
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 mb-4">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleQuickAmount(amt)}
                    className={`
                      py-3 px-4 rounded-xl font-semibold transition-all duration-300
                      ${amount === amt.toString()
                        ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(176,38,255,0.4)]'
                        : 'bg-white/5 text-purple-300 hover:bg-white/10 border border-purple-500/30'
                      }
                    `}
                  >
                    ₹{amt}
                  </button>
                ))}
                <button
                  onClick={() => document.getElementById('custom-amount')?.focus()}
                  className={`
                    py-3 px-4 rounded-xl font-semibold transition-all duration-300
                    ${customAmount
                      ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(176,38,255,0.4)]'
                      : 'bg-white/5 text-purple-300 hover:bg-white/10 border border-purple-500/30'
                    }
                  `}
                >
                  Custom
                </button>
              </div>

              <Input
                id="custom-amount"
                type="text"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
              />
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-purple-200 mb-6">Recipient</h2>
            <div className="space-y-4">
              <Input
                label="UPI ID"
                placeholder="username@upi"
                value={recipientUPI}
                onChange={(e) => setRecipientUPI(e.target.value)}
              />
              <Button variant="secondary" className="w-full">
                <QrCode className="w-5 h-5 mr-2" />
                Scan QR Code
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-purple-200 mb-6">
              Purchase Category
              <span className="text-sm text-pink-400 ml-2">*Required</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    p-4 rounded-xl transition-all duration-300 text-center
                    ${selectedCategory === cat.id
                      ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(176,38,255,0.5)] scale-105'
                      : 'bg-white/5 text-purple-300 hover:bg-white/10 border border-purple-500/30 hover:scale-105'
                    }
                  `}
                >
                  <div className="text-3xl mb-2">{cat.emoji}</div>
                  <div className="text-sm font-semibold">{cat.name}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="border-2 border-pink-500/40">
            <h2 className="text-2xl font-bold text-purple-200 mb-2">
              Current Mood
              <span className="text-sm text-pink-400 ml-2">*Required</span>
            </h2>
            <p className="text-sm text-purple-300/70 mb-6">Be honest - this helps us help you</p>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`
                    p-4 rounded-xl transition-all duration-300 text-center
                    ${selectedMood === mood.id
                      ? 'bg-pink-600 text-white shadow-[0_0_25px_rgba(255,0,110,0.6)] scale-110 animate-pulse-glow'
                      : 'bg-white/5 text-purple-300 hover:bg-white/10 border border-purple-500/30 hover:scale-105'
                    }
                  `}
                >
                  <div className="text-3xl mb-1">{mood.emoji}</div>
                  <div className="text-xs font-semibold">{mood.label}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-purple-200 mb-6">Purchase Type</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setIsNeed(true)}
                className={`
                  flex-1 py-4 rounded-xl font-semibold transition-all duration-300
                  ${isNeed
                    ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(0,255,136,0.3)]'
                    : 'bg-white/5 text-purple-300 hover:bg-white/10 border border-purple-500/30'
                  }
                `}
              >
                Need
              </button>
              <button
                onClick={() => setIsNeed(false)}
                className={`
                  flex-1 py-4 rounded-xl font-semibold transition-all duration-300
                  ${!isNeed
                    ? 'bg-pink-600 text-white shadow-[0_0_20px_rgba(255,0,110,0.3)]'
                    : 'bg-white/5 text-purple-300 hover:bg-white/10 border border-purple-500/30'
                  }
                `}
              >
                Want
              </button>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="flex-1"
              disabled={!canProceed}
              onClick={handleAnalyze}
            >
              Analyze Payment
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="flex-1"
              disabled={!amount}
            >
              Save for Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}