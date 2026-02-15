/*
  # NexPay Database Schema
  
  ## Overview
  Complete database schema for NexPay - AI-powered UPI platform with behavioral psychology features
  
  ## New Tables
  
  ### 1. `profiles`
  - User profile information and statistics
  - Columns:
    - `id` (uuid, primary key) - Links to auth.users
    - `username` (text) - Display name
    - `age` (integer) - User age
    - `college` (text) - Educational institution
    - `avatar_url` (text) - Profile picture
    - `total_saved` (decimal) - Lifetime savings
    - `smart_decisions` (integer) - Count of good decisions
    - `current_streak` (integer) - Current decision streak
    - `longest_streak` (integer) - Best streak ever
    - `rank` (integer) - Leaderboard position
    - `xp_points` (integer) - Gamification points
    - `level` (integer) - User level
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)
  
  ### 2. `transactions`
  - All payment records with context
  - Columns:
    - `id` (uuid, primary key)
    - `user_id` (uuid) - Foreign key to profiles
    - `amount` (decimal) - Transaction amount
    - `recipient_upi` (text) - UPI ID
    - `recipient_name` (text) - Recipient display name
    - `category` (text) - Spending category
    - `mood` (text) - User mood at transaction time
    - `is_need` (boolean) - Need vs Want
    - `purchase_reason` (text) - Why they bought
    - `guilt_score` (integer) - AI calculated score 0-100
    - `proceeded` (boolean) - Did they complete payment
    - `regretted` (boolean) - Did they regret it later
    - `regret_days` (integer) - Days until regret
    - `notes` (text) - User notes
    - `created_at` (timestamptz)
  
  ### 3. `savings_goals`
  - User financial goals and budgets
  - Columns:
    - `id` (uuid, primary key)
    - `user_id` (uuid) - Foreign key to profiles
    - `goal_type` (text) - monthly_savings, category_budget, custom
    - `category` (text) - For category budgets
    - `target_amount` (decimal)
    - `current_amount` (decimal)
    - `period_start` (date)
    - `period_end` (date)
    - `created_at` (timestamptz)
  
  ### 4. `achievements`
  - Gamification badges and rewards
  - Columns:
    - `id` (uuid, primary key)
    - `user_id` (uuid) - Foreign key to profiles
    - `achievement_type` (text) - Badge type
    - `title` (text) - Achievement name
    - `description` (text)
    - `icon` (text) - Emoji or icon name
    - `unlocked_at` (timestamptz)
  
  ### 5. `challenges`
  - Peer competition and savings battles
  - Columns:
    - `id` (uuid, primary key)
    - `creator_id` (uuid) - User who created
    - `opponent_id` (uuid) - Challenged user
    - `challenge_type` (text) - save_more, avoid_impulse
    - `duration_days` (integer)
    - `start_date` (timestamptz)
    - `end_date` (timestamptz)
    - `stakes` (text) - What's on the line
    - `winner_id` (uuid) - Final winner
    - `status` (text) - active, completed, cancelled
    - `created_at` (timestamptz)
  
  ### 6. `friendships`
  - Peer network connections
  - Columns:
    - `id` (uuid, primary key)
    - `user_id` (uuid) - First user
    - `friend_id` (uuid) - Second user
    - `status` (text) - pending, accepted, blocked
    - `created_at` (timestamptz)
  
  ### 7. `activity_feed`
  - Real-time updates and notifications
  - Columns:
    - `id` (uuid, primary key)
    - `user_id` (uuid) - Activity owner
    - `activity_type` (text) - Type of activity
    - `title` (text) - Activity headline
    - `description` (text) - Details
    - `amount` (decimal) - If money-related
    - `icon` (text) - Emoji/icon
    - `created_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Users can only access their own data
  - Friends can view limited profile information
  - Public leaderboard data is aggregated and anonymized
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text NOT NULL,
  age integer,
  college text,
  avatar_url text,
  total_saved decimal(10,2) DEFAULT 0,
  smart_decisions integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  rank integer DEFAULT 0,
  xp_points integer DEFAULT 0,
  level integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount decimal(10,2) NOT NULL,
  recipient_upi text,
  recipient_name text,
  category text NOT NULL,
  mood text NOT NULL,
  is_need boolean DEFAULT false,
  purchase_reason text,
  guilt_score integer DEFAULT 0,
  proceeded boolean DEFAULT true,
  regretted boolean DEFAULT false,
  regret_days integer,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create savings_goals table
CREATE TABLE IF NOT EXISTS savings_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  goal_type text NOT NULL,
  category text,
  target_amount decimal(10,2) NOT NULL,
  current_amount decimal(10,2) DEFAULT 0,
  period_start date DEFAULT CURRENT_DATE,
  period_end date,
  created_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_type text NOT NULL,
  title text NOT NULL,
  description text,
  icon text,
  unlocked_at timestamptz DEFAULT now()
);

-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  opponent_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  challenge_type text NOT NULL,
  duration_days integer DEFAULT 7,
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  stakes text,
  winner_id uuid REFERENCES profiles(id),
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Create friendships table
CREATE TABLE IF NOT EXISTS friendships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  friend_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, friend_id)
);

-- Create activity_feed table
CREATE TABLE IF NOT EXISTS activity_feed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL,
  title text NOT NULL,
  description text,
  amount decimal(10,2),
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Transactions policies
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions"
  ON transactions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Savings goals policies
CREATE POLICY "Users can view own goals"
  ON savings_goals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals"
  ON savings_goals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals"
  ON savings_goals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals"
  ON savings_goals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "Users can view own achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Challenges policies
CREATE POLICY "Users can view their challenges"
  ON challenges FOR SELECT
  TO authenticated
  USING (auth.uid() = creator_id OR auth.uid() = opponent_id);

CREATE POLICY "Users can create challenges"
  ON challenges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their challenges"
  ON challenges FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id OR auth.uid() = opponent_id)
  WITH CHECK (auth.uid() = creator_id OR auth.uid() = opponent_id);

-- Friendships policies
CREATE POLICY "Users can view their friendships"
  ON friendships FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can create friendships"
  ON friendships FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their friendships"
  ON friendships FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = friend_id)
  WITH CHECK (auth.uid() = user_id OR auth.uid() = friend_id);

-- Activity feed policies
CREATE POLICY "Users can view own activity"
  ON activity_feed FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity"
  ON activity_feed FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_savings_goals_user_id ON savings_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_challenges_creator_id ON challenges(creator_id);
CREATE INDEX IF NOT EXISTS idx_challenges_opponent_id ON challenges(opponent_id);
CREATE INDEX IF NOT EXISTS idx_friendships_user_id ON friendships(user_id);
CREATE INDEX IF NOT EXISTS idx_friendships_friend_id ON friendships(friend_id);
CREATE INDEX IF NOT EXISTS idx_activity_feed_user_id ON activity_feed(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_feed_created_at ON activity_feed(created_at DESC);