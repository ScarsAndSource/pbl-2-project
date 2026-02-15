import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  username: string;
  age?: number;
  college?: string;
  avatar_url?: string;
  total_saved: number;
  smart_decisions: number;
  current_streak: number;
  longest_streak: number;
  rank: number;
  xp_points: number;
  level: number;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  amount: number;
  recipient_upi?: string;
  recipient_name?: string;
  category: string;
  mood: string;
  is_need: boolean;
  purchase_reason?: string;
  guilt_score: number;
  proceeded: boolean;
  regretted: boolean;
  regret_days?: number;
  notes?: string;
  created_at: string;
};

export type SavingsGoal = {
  id: string;
  user_id: string;
  goal_type: string;
  category?: string;
  target_amount: number;
  current_amount: number;
  period_start: string;
  period_end?: string;
  created_at: string;
};

export type Achievement = {
  id: string;
  user_id: string;
  achievement_type: string;
  title: string;
  description?: string;
  icon?: string;
  unlocked_at: string;
};

export type Challenge = {
  id: string;
  creator_id: string;
  opponent_id?: string;
  challenge_type: string;
  duration_days: number;
  start_date: string;
  end_date?: string;
  stakes?: string;
  winner_id?: string;
  status: string;
  created_at: string;
};

export type ActivityFeed = {
  id: string;
  user_id: string;
  activity_type: string;
  title: string;
  description?: string;
  amount?: number;
  icon?: string;
  created_at: string;
};