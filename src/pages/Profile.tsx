import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockCurrentUser, mockAchievements, formatCurrency, getRelativeTime } from '../lib/mockData';
import {
  User,
  Mail,
  School,
  Calendar,
  TrendingUp,
  Target,
  Flame,
  Award,
  Settings,
  Bell,
  Shield,
  LogOut,
} from 'lucide-react';

export function Profile() {
  const user = mockCurrentUser;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-purple-300/70 text-lg">Manage your account and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="text-center lg:col-span-1">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-5xl font-black">
              {user.username.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold text-purple-200 mb-2">{user.username}</h2>
            <p className="text-purple-300/70 mb-4">{user.college}</p>
            <div className="flex items-center justify-center gap-2 text-yellow-400 mb-6">
              <Award className="w-5 h-5" />
              <span className="font-semibold">Level {user.level}</span>
            </div>
            <Button variant="secondary" className="w-full mb-3">
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="danger" className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-xl font-bold text-purple-200 mb-6">Personal Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-emerald-400 mb-1">
                    {formatCurrency(user.total_saved)}
                  </div>
                  <div className="text-sm text-purple-300/70">Lifetime Savings</div>
                </div>

                <div className="text-center p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                  <Target className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-cyan-400 mb-1">{user.smart_decisions}</div>
                  <div className="text-sm text-purple-300/70">Smart Decisions</div>
                </div>

                <div className="text-center p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                  <Flame className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-orange-400 mb-1">{user.current_streak}</div>
                  <div className="text-sm text-purple-300/70">Current Streak</div>
                </div>

                <div className="text-center p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  <Award className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-purple-400 mb-1">{user.longest_streak}</div>
                  <div className="text-sm text-purple-300/70">Longest Streak</div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-purple-200 mb-6">Account Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-purple-300">
                  <User className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-purple-300/70">Username:</span>
                  <span className="font-semibold">{user.username}</span>
                </div>
                <div className="flex items-center gap-3 text-purple-300">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-purple-300/70">Email:</span>
                  <span className="font-semibold">vaibhav.chaudhary@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-purple-300">
                  <School className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-purple-300/70">College:</span>
                  <span className="font-semibold">{user.college}</span>
                </div>
                <div className="flex items-center gap-3 text-purple-300">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-purple-300/70">Member Since:</span>
                  <span className="font-semibold">June 15, 2024</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <h3 className="text-xl font-bold text-purple-200 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-purple-400" />
              Achievements
            </h3>
            <div className="space-y-4">
              {mockAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-purple-200 mb-1">{achievement.title}</h4>
                    <p className="text-sm text-purple-300/70">{achievement.description}</p>
                  </div>
                  <div className="text-xs text-purple-400/60">
                    {getRelativeTime(achievement.unlocked_at)}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-bold text-purple-200 mb-6">Monthly Savings Goal</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-purple-300/70">Current Progress</span>
                  <span className="text-2xl font-bold text-purple-200">
                    {formatCurrency(user.total_saved)} / {formatCurrency(15000)}
                  </span>
                </div>
                <div className="h-4 bg-purple-950/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(176,38,255,0.5)]"
                    style={{ width: `${(user.total_saved / 15000) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-purple-300/70">
                  You're <strong className="text-emerald-400">83%</strong> towards your monthly goal!
                </p>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-purple-200 mb-6 flex items-center gap-2">
                <Bell className="w-6 h-6 text-purple-400" />
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-purple-300">Payment confirmations</span>
                  <input type="checkbox" defaultChecked className="toggle" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-purple-300">Guilt meter alerts</span>
                  <input type="checkbox" defaultChecked className="toggle" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-purple-300">Leaderboard updates</span>
                  <input type="checkbox" defaultChecked className="toggle" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-purple-300">Friend challenges</span>
                  <input type="checkbox" defaultChecked className="toggle" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-purple-300">Daily digest</span>
                  <input type="checkbox" className="toggle" />
                </label>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-purple-200 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-purple-400" />
                Security
              </h3>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  Enable Biometric Auth
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  View Transaction History
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  Manage Linked Accounts
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <Card className="text-center py-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20">
          <p className="text-sm text-purple-300/70 mb-4">Need help or have feedback?</p>
          <div className="flex gap-4 justify-center">
            <Button variant="secondary" size="sm">
              Contact Support
            </Button>
            <Button variant="secondary" size="sm">
              Send Feedback
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}