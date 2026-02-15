import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockLeaderboard, mockCurrentUser, formatCurrency } from '../lib/mockData';
import { Crown, Medal, TrendingUp, Flame, Swords } from 'lucide-react';

export function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState('month');
  const currentUser = mockCurrentUser;

  const timeFilters = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'all', label: 'All Time' },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
    return null;
  };

  const getRankClass = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      return 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-2 border-purple-500 shadow-[0_0_30px_rgba(176,38,255,0.4)]';
    }
    if (rank === 1) {
      return 'bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/40 shadow-[0_0_25px_rgba(234,179,8,0.3)]';
    }
    if (rank === 2) {
      return 'bg-gradient-to-r from-gray-400/20 to-gray-300/20 border border-gray-400/40';
    }
    if (rank === 3) {
      return 'bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/40';
    }
    return 'border border-purple-500/20';
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            <span className="gradient-text">Savings Leaderboard</span>
          </h1>
          <p className="text-purple-300/70 text-lg">Compete with peers and climb the ranks</p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-xl bg-white/5 p-1 backdrop-blur-sm border border-purple-500/30">
            {timeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setTimeFilter(filter.id)}
                className={`
                  px-6 py-2 rounded-lg font-semibold transition-all duration-300
                  ${timeFilter === filter.id
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(176,38,255,0.4)]'
                    : 'text-purple-300 hover:text-purple-200'
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <Card className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-sm text-purple-300/70 mb-1">Your Current Rank</div>
              <div className="text-4xl font-black gradient-text">#{currentUser.rank}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-purple-300/70 mb-1">Gap to Next Rank</div>
              <div className="text-2xl font-bold text-pink-400">
                {formatCurrency(mockLeaderboard[0].total_saved - currentUser.total_saved)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-purple-300/70 mb-1">Your Savings</div>
              <div className="text-2xl font-bold text-emerald-400">
                {formatCurrency(currentUser.total_saved)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-purple-300/70 mb-1">Current Streak</div>
              <div className="text-2xl font-bold text-orange-400 flex items-center gap-2">
                <Flame className="w-6 h-6" />
                {currentUser.current_streak}
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4 mb-8">
          {mockLeaderboard.map((user, index) => {
            const isCurrentUser = user.id === currentUser.id;
            return (
              <Card
                key={user.id}
                className={`${getRankClass(user.rank, isCurrentUser)} transition-all duration-300`}
                hover={!isCurrentUser}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-16 text-center">
                    {getRankIcon(user.rank) || (
                      <div className="text-3xl font-black text-purple-400">#{user.rank}</div>
                    )}
                  </div>

                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {user.username.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-purple-200 text-lg">
                      {user.username}
                      {isCurrentUser && <span className="text-cyan-400 ml-2">(You)</span>}
                    </div>
                    <div className="text-sm text-purple-300/70">{user.college}</div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-black font-mono text-emerald-400 mb-1">
                      {formatCurrency(user.total_saved)}
                    </div>
                    <div className="text-xs text-purple-300/70 flex items-center justify-end gap-2">
                      <TrendingUp className="w-3 h-3" />
                      {user.smart_decisions} smart decisions
                    </div>
                  </div>

                  {user.current_streak > 0 && (
                    <div className="flex items-center gap-1 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/40">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span className="text-sm font-bold text-orange-400">{user.current_streak}</span>
                    </div>
                  )}

                  {!isCurrentUser && (
                    <Button variant="secondary" size="sm" className="flex-shrink-0">
                      <Swords className="w-4 h-4 mr-2" />
                      Challenge
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="text-center py-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20">
          <h3 className="text-xl font-bold text-purple-200 mb-4">Want to climb higher?</h3>
          <p className="text-purple-300/70 mb-6">
            Make smarter spending decisions and watch your rank soar!
          </p>
          <Button size="lg">Start Making Smart Decisions</Button>
        </Card>
      </div>
    </div>
  );
}