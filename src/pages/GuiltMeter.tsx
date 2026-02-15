import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';
import { formatCurrency, moodData } from '../lib/mockData';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  MessageCircle,
  Heart,
  XCircle,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';

interface GuiltMeterProps {
  paymentData?: {
    amount: number;
    category: string;
    mood: string;
  };
  onNavigate: (page: string) => void;
}

export function GuiltMeter({ paymentData, onNavigate }: GuiltMeterProps) {
  const [guiltScore, setGuiltScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [longPressProgress, setLongPressProgress] = useState(0);
  const [isLongPressing, setIsLongPressing] = useState(false);

  useEffect(() => {
    if (paymentData) {
      setTimeout(() => {
        const calculatedScore = calculateGuiltScore(paymentData);
        setGuiltScore(calculatedScore);
        setShowResults(true);
      }, 1500);
    }
  }, [paymentData]);

  const calculateGuiltScore = (data: { amount: number; category: string; mood: string }) => {
    const moodInfo = moodData.find((m) => m.name.toLowerCase() === data.mood);
    const baseScore = moodInfo ? moodInfo.regretRate : 50;

    let score = baseScore;

    if (data.amount > 1000) score += 15;
    else if (data.amount > 500) score += 8;

    if (data.category === 'shopping') score += 10;
    else if (data.category === 'entertainment') score += 5;

    return Math.min(Math.round(score), 100);
  };

  const getScoreMessage = () => {
    if (guiltScore <= 30) {
      return {
        icon: <CheckCircle className="w-12 h-12 text-emerald-400" />,
        title: '✅ Looks good!',
        message: 'This aligns with your smart spending habits',
        color: 'text-emerald-400',
      };
    } else if (guiltScore <= 60) {
      return {
        icon: <AlertTriangle className="w-12 h-12 text-yellow-400" />,
        title: '🤔 Think carefully',
        message: 'You might regret this one',
        color: 'text-yellow-400',
      };
    } else {
      return {
        icon: <XCircle className="w-12 h-12 text-pink-400" />,
        title: '⚠️ Hold on!',
        message: `This purchase has a ${guiltScore}% regret probability`,
        color: 'text-pink-400',
      };
    }
  };

  const handleLongPressStart = () => {
    setIsLongPressing(true);
    const interval = setInterval(() => {
      setLongPressProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleProceedAnyway();
          return 0;
        }
        return prev + 3.33;
      });
    }, 100);

    const handleEnd = () => {
      clearInterval(interval);
      setIsLongPressing(false);
      setLongPressProgress(0);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
  };

  const handleProceedAnyway = () => {
    alert('Payment processed! (Demo mode)');
    onNavigate('home');
  };

  const handleSaveToWishlist = () => {
    alert('Added to wishlist! We\'ll remind you tomorrow.');
    onNavigate('home');
  };

  const handleCancel = () => {
    alert(`Congratulations! You saved ${formatCurrency(paymentData?.amount || 0)}! 🎉`);
    onNavigate('home');
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <Card className="text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-purple-200 mb-2">No Payment Data</h2>
          <p className="text-purple-300/70 mb-6">Start a payment to see the guilt meter analysis</p>
          <Button onClick={() => onNavigate('pay')}>Make a Payment</Button>
        </Card>
      </div>
    );
  }

  const scoreMessage = getScoreMessage();
  const moodInfo = moodData.find((m) => m.name.toLowerCase() === paymentData.mood);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            <span className="gradient-text">AI Guilt Meter</span>
          </h1>
          <p className="text-purple-300/70 text-lg">Let's analyze your purchase decision</p>
        </div>

        <div className="mb-8">
          <Card className="text-center py-12">
            {!showResults ? (
              <div className="space-y-6">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-purple-200">Analyzing your purchase...</p>
                  <p className="text-sm text-purple-300/70">
                    Checking patterns, mood data, and peer comparisons
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex justify-center">
                  <ProgressRing percentage={guiltScore} size={240} strokeWidth={12}>
                    <div className="text-center">
                      <div className={`text-6xl font-black ${scoreMessage.color}`}>{guiltScore}%</div>
                      <div className="text-sm text-purple-300/70 mt-2">Guilt Score</div>
                    </div>
                  </ProgressRing>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-center">{scoreMessage.icon}</div>
                  <h2 className="text-3xl font-black text-purple-200">{scoreMessage.title}</h2>
                  <p className="text-lg text-purple-300/70">{scoreMessage.message}</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {showResults && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <h3 className="font-bold text-purple-200 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  Factors Analyzed
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-purple-300">Historical regret rate for this category</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-purple-300">Current mood impact analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-purple-300">Budget consumption trajectory</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-purple-300">Peer comparison data</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-purple-300">Time of day risk factor</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-purple-300">Recent spending velocity</span>
                  </li>
                </ul>
              </Card>

              <Card>
                <h3 className="font-bold text-purple-200 mb-4">Risk Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-purple-300/70">Mood Impact</span>
                      <span className="text-purple-200 font-semibold">35%</span>
                    </div>
                    <div className="h-2 bg-purple-950/50 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500 rounded-full" style={{ width: '35%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-purple-300/70">Budget Impact</span>
                      <span className="text-purple-200 font-semibold">25%</span>
                    </div>
                    <div className="h-2 bg-purple-950/50 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-purple-300/70">Peer Comparison</span>
                      <span className="text-purple-200 font-semibold">20%</span>
                    </div>
                    <div className="h-2 bg-purple-950/50 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '20%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-purple-300/70">Historical Pattern</span>
                      <span className="text-purple-200 font-semibold">20%</span>
                    </div>
                    <div className="h-2 bg-purple-950/50 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '20%' }} />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="border-pink-500/40">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-pink-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-pink-300 mb-2">Reconsider This Purchase</h3>
                    <p className="text-sm text-purple-300 mb-3">
                      You've bought similar items when <strong>{paymentData.mood}</strong> before.
                    </p>
                    <p className="text-sm text-purple-300">
                      <strong className="text-pink-400">{moodInfo?.regretRate}%</strong> were regretted within 24 hours.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-yellow-500/40">
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-yellow-300 mb-2">Wait & See Strategy</h3>
                    <p className="text-sm text-purple-300 mb-3">Try the 24-hour rule</p>
                    <p className="text-sm text-purple-300">
                      <strong className="text-yellow-400">85%</strong> of your delayed purchases felt better
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-cyan-500/40">
                <div className="flex items-start gap-3 mb-4">
                  <Users className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-cyan-300 mb-2">Peer Comparison</h3>
                    <p className="text-sm text-purple-300 mb-3">
                      Your friends spend <strong className="text-cyan-400">30% less</strong> in this scenario
                    </p>
                    <Button variant="secondary" size="sm" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ask Peer Network
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="border-purple-500/40">
                <div className="flex items-start gap-3 mb-4">
                  <Heart className="w-6 h-6 text-purple-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-purple-300 mb-2">Emotional Check-In</h3>
                    <p className="text-sm text-purple-300 mb-3">Are you shopping to feel better?</p>
                    <p className="text-sm text-purple-300">
                      Your <strong>{paymentData.mood}</strong> spending costs <strong>₹2,850/month</strong>
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Button
                  variant="danger"
                  size="lg"
                  className="w-full relative overflow-hidden"
                  onMouseDown={handleLongPressStart}
                  onTouchStart={handleLongPressStart}
                >
                  {isLongPressing && (
                    <div
                      className="absolute inset-0 bg-pink-600"
                      style={{ width: `${longPressProgress}%`, transition: 'width 0.1s linear' }}
                    />
                  )}
                  <span className="relative z-10">
                    {isLongPressing ? `${Math.floor(longPressProgress / 33)}s` : 'Proceed Anyway'}
                  </span>
                </Button>
                <p className="text-xs text-purple-400/60 text-center mt-2">Hold for 3 seconds</p>
              </div>

              <Button variant="primary" size="lg" className="w-full" onClick={handleSaveToWishlist}>
                <Bookmark className="w-5 h-5 mr-2" />
                Save to Wishlist
              </Button>

              <Button variant="success" size="lg" className="w-full" onClick={handleCancel}>
                <CheckCircle className="w-5 h-5 mr-2" />
                Cancel Payment
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}