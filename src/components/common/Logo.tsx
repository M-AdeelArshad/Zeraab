import React from 'react';
import { Droplets } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withGlow?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  withGlow = true,
}) => {
  const sizeMap = {
    sm: { container: 'w-5 h-5', icon: 'w-3 h-3' },
    md: { container: 'w-6 h-6', icon: 'w-3.5 h-3.5' },
    lg: { container: 'w-8 h-8', icon: 'w-5 h-5' },
    xl: { container: 'w-10 h-10', icon: 'w-6 h-6' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`rounded-full bg-gradient-to-tr from-[#00D4C8] to-[#1599E1] flex items-center justify-center shrink-0 transition-transform ${
        withGlow ? 'shadow-[0_0_12px_rgba(0,212,200,0.4)]' : ''
      } ${currentSize.container} ${className}`}
    >
      <Droplets className={`${currentSize.icon} text-[#020B18] fill-current`} />
    </div>
  );
};
