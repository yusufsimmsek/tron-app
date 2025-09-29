import { i18n } from '../lib/i18n';
import { APP_CONFIG } from '../config';

export const Header = () => {
  return (
    <header className="relative text-center py-12 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-l from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        {/* Title */}
        <div className="text-center mb-8 px-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-3 drop-shadow-2xl leading-tight">
            {i18n.t('title')}
          </h1>
          <div className="w-28 sm:w-36 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-medium">
          {i18n.t('subtitle')}
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <span className="text-gray-300">{i18n.t('organizer')}</span>
            <span className="font-bold text-white text-lg">{APP_CONFIG.ORGANIZER}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
