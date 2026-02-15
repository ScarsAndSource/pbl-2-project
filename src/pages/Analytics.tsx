import { Card } from '../components/ui/Card';
import { moodData, categoryData, formatCurrency } from '../lib/mockData';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export function Analytics() {
  const getColorClass = (regretRate: number) => {
    if (regretRate < 30) return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40';
    if (regretRate < 60) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40';
    return 'text-pink-400 bg-pink-500/20 border-pink-500/40';
  };

  const getOverspendColor = (overspend: number) => {
    if (overspend > 40) return 'text-pink-400';
    if (overspend > 0) return 'text-yellow-400';
    return 'text-emerald-400';
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            <span className="gradient-text">Mood Analytics</span>
          </h1>
          <p className="text-purple-300/70 text-lg">
            Understanding your emotional spending patterns
          </p>
        </div>

        <Card className="mb-8 bg-gradient-to-br from-pink-600/20 to-purple-600/20 border-2 border-pink-500/40">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-pink-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-pink-300 mb-2">Key Insights</h3>
              <ul className="space-y-2 text-purple-200">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>You spend <strong>82% more when bored</strong> compared to neutral state</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span><strong>Stressed purchases are regretted 87% of the time</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Your happiest purchases are typically <strong>under ₹500</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Friday evenings are your <strong>highest-risk spending time</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-200 mb-6">Mood-Based Spending Matrix</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {moodData.map((mood) => (
              <Card key={mood.name} className={`text-center ${getColorClass(mood.regretRate)}`}>
                <div className="text-5xl mb-3">{mood.emoji}</div>
                <h3 className="text-lg font-bold text-purple-200 mb-4">{mood.name}</h3>

                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-purple-300/70 mb-1">Avg. Spending</div>
                    <div className="text-2xl font-bold font-mono">
                      {formatCurrency(mood.avgSpending)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-xs text-purple-300/70 mb-1">Transactions</div>
                      <div className="font-semibold">{mood.transactions}</div>
                    </div>
                    <div>
                      <div className="text-xs text-purple-300/70 mb-1">Regret Rate</div>
                      <div className="font-semibold">{mood.regretRate}%</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-purple-500/20">
                    <div className="flex items-center justify-center gap-2">
                      {mood.overspend > 0 ? (
                        <>
                          <TrendingUp className={`w-4 h-4 ${getOverspendColor(mood.overspend)}`} />
                          <span className={`text-sm font-semibold ${getOverspendColor(mood.overspend)}`}>
                            +{mood.overspend}% vs baseline
                          </span>
                        </>
                      ) : mood.overspend < 0 ? (
                        <>
                          <TrendingDown className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm font-semibold text-emerald-400">
                            {mood.overspend}% vs baseline
                          </span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm font-semibold text-emerald-400">At baseline</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-200 mb-6">Category Breakdown</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-bold text-purple-200 mb-6">Spending by Category</h3>
              <div className="space-y-4">
                {categoryData.map((cat) => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="font-semibold text-purple-200">{cat.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-200">
                          {formatCurrency(cat.spent)}
                        </div>
                        <div className="text-xs text-purple-400/70">
                          of {formatCurrency(cat.budget)}
                        </div>
                      </div>
                    </div>
                    <div className="h-2 bg-purple-950/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          cat.spent > cat.budget
                            ? 'bg-gradient-to-r from-pink-500 to-red-500'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}
                        style={{ width: `${Math.min((cat.spent / cat.budget) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-purple-400/70 mt-1">
                      {cat.percentage}% of total spending
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 border-emerald-500/40">
                <div className="flex items-start gap-4 mb-4">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-emerald-300 mb-2">Best Spending Mood</h3>
                    <div className="text-4xl mb-2">😊</div>
                    <p className="text-sm text-purple-200">
                      When happy, you make the smartest decisions with only <strong>15% regret rate</strong>
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-pink-600/20 to-red-600/20 border-pink-500/40">
                <div className="flex items-start gap-4 mb-4">
                  <AlertTriangle className="w-6 h-6 text-pink-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-pink-300 mb-2">Highest Risk Mood</h3>
                    <div className="text-4xl mb-2">😤</div>
                    <p className="text-sm text-purple-200">
                      Frustrated spending leads to <strong>92% regret rate</strong> - wait it out!
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-purple-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-purple-200 mb-2">Peak Risk Times</h3>
                    <ul className="space-y-2 text-sm text-purple-300">
                      <li className="flex justify-between">
                        <span>Friday 8-10 PM</span>
                        <span className="text-pink-400 font-semibold">High Risk</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sunday afternoon</span>
                        <span className="text-yellow-400 font-semibold">Medium Risk</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Tuesday morning</span>
                        <span className="text-emerald-400 font-semibold">Low Risk</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20">
          <h3 className="text-xl font-bold text-purple-200 mb-4">Personalized Recommendations</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-purple-400 text-xl flex-shrink-0">1.</span>
              <div>
                <strong className="text-purple-200">Set spending limits for high-risk moods:</strong>
                <span className="text-purple-300/70 ml-2">
                  Cap stressed/frustrated purchases at ₹500 to minimize regret
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 text-xl flex-shrink-0">2.</span>
              <div>
                <strong className="text-purple-200">Use the 24-hour rule:</strong>
                <span className="text-purple-300/70 ml-2">
                  When bored or sad, wait a day before purchasing - you avoid 73% of regrets this way
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 text-xl flex-shrink-0">3.</span>
              <div>
                <strong className="text-purple-200">Identify triggers:</strong>
                <span className="text-purple-300/70 ml-2">
                  Keep a journal of what makes you stressed/bored, then find alternative coping activities
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 text-xl flex-shrink-0">4.</span>
              <div>
                <strong className="text-purple-200">Friday evening alerts:</strong>
                <span className="text-purple-300/70 ml-2">
                  We'll send you extra reminders during your highest-risk time window
                </span>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}