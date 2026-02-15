import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-purple-300 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-white/5 backdrop-blur-sm
            border ${error ? 'border-pink-500' : 'border-purple-500/30'}
            text-white placeholder-purple-400/50
            focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20
            focus:scale-[1.02]
            transition-all duration-300
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-pink-400">{error}</p>
        )}
      </div>
    );
  }
);