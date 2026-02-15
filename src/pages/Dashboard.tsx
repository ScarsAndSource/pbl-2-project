import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';
import { mockCurrentUser, mockActivityFeed, getRelativeTime, formatCurrency } from '../lib/mockData';
import { TrendingUp, Target, Award, Flame, ArrowRight } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const user = mockCurrentUser;
  const impulseControlScore = 87;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            <span className="gradient-text">Welcome back, {user.username.split(' ')[0]}</span>
          </h1>
          <p className="text-purple-300/70 text-lg">Your financial wingman preventing future regrets</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <div className="text-emerald-400 mb-3">
              <TrendingUp className="w-8 h-8 mx-auto" />
            </div>
            <div className="text-3xl font-bold font-mono text-emerald-400 mb-2">
              {formatCurrency(user.total_saved)}
            </div>
            <div className="text-sm text-purple-300/70">Saved This Month</div>
          </Card>

          <Card className="text-center">
            <div className="text-cyan-400 mb-3">
              <Target className="w-8 h-8 mx-auto" />
            </div>
            <div className="text-3xl font-bold font-mono text-cyan-400 mb-2 flex items-center justify-center gap-2">
              {user.smart_decisions}
              <span className="text-lg">🔥</span>
            </div>
            <div className="text-sm text-purple-300/70">Smart Decisions Made</div>
          </Card>

          <Card className="text-center">
            <div className="text-yellow-400 mb-3">
              <Award className="w-8 h-8 mx-auto" />
            </div>
            <div className="text-3xl font-bold font-mono text-yellow-400 mb-2">
              #{user.rank}
            </div>
            <div className="text-sm text-purple-300/70">Current Rank</div>
          </Card>

          <Card className="text-center">
            <ProgressRing percentage={impulseControlScore} size={100} strokeWidth={6}>
              <div className="text-2xl font-bold text-emerald-400">{impulseControlScore}%</div>
            </ProgressRing>
            <div className="text-sm text-purple-300/70 mt-3">Impulse Control Score</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-200">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {mockActivityFeed.map((activity) => (
                <Card key={activity.id} hover={false} className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{activity.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-purple-200 mb-1">{activity.title}</h3>
                        <p className="text-sm text-purple-300/70">{activity.description}</p>
                      </div>
                      {activity.amount && (
                        <div className={`font-mono font-bold flex-shrink-0 ${
                          activity.activity_type === 'avoided' ? 'text-emerald-400' : 'text-purple-300'
                        }`}>
                          {formatCurrency(activity.amount)}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-purple-400/50 mt-2">{getRelativeTime(activity.created_at)}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-6 h-6 text-orange-400" />
                <h3 className="text-lg font-bold text-purple-200">Current Streak</h3>
              </div>
              <div className="text-center py-6">
                <div className="text-5xl font-black text-orange-400 mb-2">{user.current_streak}</div>
                <div className="text-sm text-purple-300/70 mb-4">days without regrets</div>
                <div className="text-xs text-purple-400/60">
                  Personal best: {user.longest_streak} days
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20">
              <h3 className="text-lg font-bold text-purple-200 mb-4">Weekly Challenge</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-purple-300/70">Progress</span>
                    <span className="text-purple-200 font-semibold">₹8,450 / ₹12,000</span>
                  </div>
                  <div className="h-3 bg-purple-950/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(176,38,255,0.5)]"
                      style={{ width: '70%' }}
                    />
                  </div>
                </div>
                <p className="text-xs text-purple-300/60">
                  You're 15% ahead of peer average!
                </p>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="text-center py-8">
            <h3 className="text-xl font-bold text-purple-200 mb-4">Ready to make a payment?</h3>
            <Button size="lg" onClick={() => onNavigate('pay')} className="w-full sm:w-auto">
              Make Payment
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Button>
          </Card>

          <Card className="text-center py-8">
            <h3 className="text-xl font-bold text-purple-200 mb-4">Check your standing</h3>
            <Button size="lg" variant="secondary" onClick={() => onNavigate('compete')} className="w-full sm:w-auto">
              View Leaderboard
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}