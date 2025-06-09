import React from 'react';
import { useTheme } from '@/components/Hooks/themeHook';
import VerticalTimeline from '@/components/VerticalTimeline';

interface TimelinePageProps {
  onNavigateBack?: () => void;
}

const TimelinePage: React.FC<TimelinePageProps> = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme.name === 'light' ? 'bg-white' : 'bg-slate-900'} ${theme.body.text}`}>
      {/* Header */}
      <div className="relative z-10 px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Sleek Title */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-black tracking-wider mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Timeline <span className="text-gray-400">v2.0</span>*
            </h1>
            <div className="relative">
              <p className={`text-lg md:text-xl font-light tracking-wide ${theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                A timeline of growth, achievements & milestones
              </p>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 blur-xl opacity-30 -z-10" />
            </div>
          </div>

          {/* Enhanced decorative elements */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-purple-500/50" />
            <div className="mx-4 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-purple-500/50" />
          </div>

          {/* Navigation hint */}
          <p className={`text-sm font-medium opacity-60 ${theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
            Navigate with <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">Shift+L+L</kbd>
          </p>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="px-8 pb-16">
        <VerticalTimeline />
      </div>
    </div>
  );
};

export default TimelinePage; 