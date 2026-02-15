import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export function Card({ children, className = '', glow = true, hover = true }: CardProps) {
  const glowStyles = glow ? 'shadow-[0_0_30px_rgba(176,38,255,0.15)]' : '';
  const hoverStyles = hover
    ? 'hover:translate-y-[-4px] hover:shadow-[0_0_40px_rgba(176,38,255,0.25)] transition-all duration-300'
    : '';

  return (
    <div
      className={`
        bg-[rgba(20,20,35,0.8)] backdrop-blur-xl
        border border-purple-500/30
        rounded-2xl p-6
        ${glowStyles} ${hoverStyles} ${className}
      `}
    >
      {children}
    </div>
  );
}

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-2xl p-6
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}