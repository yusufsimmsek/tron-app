import { useState } from 'react';
import { APP_CONFIG, type TaskKey } from '../config';
import { i18n } from '../lib/i18n';

interface TaskItemProps {
  taskKey: TaskKey;
  completed: boolean;
  onToggle: (taskKey: TaskKey) => void;
}

const taskConfig = {
  ig_cb: {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    text: 'tasks.ig_cb',
    url: APP_CONFIG.LINKS.CB_IG,
    color: 'from-pink-500 to-purple-600'
  },
  x_cb: {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    text: 'tasks.x_cb', 
    url: APP_CONFIG.LINKS.CB_X,
    color: 'from-blue-500 to-cyan-600'
  },
  ig_tron: {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    text: 'tasks.ig_tron',
    url: APP_CONFIG.LINKS.TRON_IG,
    color: 'from-pink-500 to-purple-600'
  },
  x_tron: {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    text: 'tasks.x_tron',
    url: APP_CONFIG.LINKS.TRON_X,
    color: 'from-blue-500 to-cyan-600'
  },
  tweet: {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    text: 'tasks.tweet',
    url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(APP_CONFIG.LINKS.TWEET_TEXT)}`,
    color: 'from-cyan-500 to-blue-600'
  }
};

export const TaskItem = ({ taskKey, completed, onToggle }: TaskItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = taskConfig[taskKey];

  const handleGoClick = () => {
    window.open(config.url, '_blank');
    // Git butonuna basıldığında otomatik olarak görevi tamamla
    if (!completed) {
      onToggle(taskKey);
    }
  };

  const getTaskStyles = () => {
    if (completed) {
      return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400 text-green-100 shadow-lg shadow-green-500/20';
    }
    if (isHovered) {
      const colorMap = {
        'from-pink-500 to-purple-600': 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-400 text-white shadow-lg shadow-pink-500/20',
        'from-blue-500 to-cyan-600': 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400 text-white shadow-lg shadow-blue-500/20',
        'from-cyan-500 to-blue-600': 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
      };
      return colorMap[config.color] || 'bg-white/20 border-white/50 text-white shadow-lg';
    }
    return 'bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50';
  };

  const getGlowStyles = () => {
    if (isHovered && !completed) {
      const glowMap = {
        'from-pink-500 to-purple-600': 'bg-gradient-to-r from-pink-500/10 to-purple-500/10',
        'from-blue-500 to-cyan-600': 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10',
        'from-cyan-500 to-blue-600': 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10'
      };
      return glowMap[config.color] || 'bg-gradient-to-r from-blue-500/10 to-purple-500/10';
    }
    return '';
  };

  return (
    <div 
      className={`group relative flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${getTaskStyles()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow Effect */}
      {isHovered && !completed && (
        <div className={`absolute inset-0 ${getGlowStyles()} rounded-2xl blur-sm`}></div>
      )}
      
      <div className="relative z-10 flex items-center gap-6">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${config.color} shadow-lg`}>
          {config.icon}
        </div>
        <span className="text-lg font-semibold">
          {i18n.t(config.text as any)}
        </span>
      </div>
      
      <div className="relative z-10 flex items-center gap-4">
        <button
          onClick={handleGoClick}
          className={`px-6 py-3 bg-gradient-to-r ${config.color} hover:scale-105 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl`}
        >
          {i18n.t('tasks.go')}
        </button>
        
        <label className="flex items-center gap-3 cursor-default select-none">
          <div className="relative">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => {}}
              readOnly
              disabled
              className="w-6 h-6 text-blue-600 bg-white/20 border-2 border-white/30 rounded-lg focus:ring-0 pointer-events-none opacity-80"
            />
            {completed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <span className="text-sm font-medium">
            {completed ? i18n.t('tasks.completed') : ''}
          </span>
        </label>
      </div>
    </div>
  );
};
