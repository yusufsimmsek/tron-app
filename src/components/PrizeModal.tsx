import { motion, AnimatePresence } from 'framer-motion';
import { i18n } from '../lib/i18n';

interface PrizeModalProps {
  isOpen: boolean;
  prize: { id: string; label: string } | null;
  onClose: () => void;
  alreadyPlayed: boolean;
}

export const PrizeModal = ({ isOpen, prize, onClose, alreadyPlayed }: PrizeModalProps) => {
  if (!isOpen) return null;

  const iconAndTheme = (() => {
    const name = (prize?.label || '').toLowerCase();
    if (name.includes('mouse')) return { icon: '🖱️', from: '#6366F1', to: '#8B5CF6' };
    if (name.includes('çorap')) return { icon: '🧦', from: '#10B981', to: '#34D399' };
    if (name.includes('bag') || name.includes('çanta')) return { icon: '👜', from: '#F59E0B', to: '#F97316' };
    return { icon: '🎁', from: '#3B82F6', to: '#8B5CF6' };
  })();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Confetti Effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{ 
                  x: Math.random() * 400 - 200, 
                  y: -10,
                  rotate: 0,
                  scale: 0
                }}
                animate={{ 
                  y: 400,
                  rotate: 360,
                  scale: [0, 1, 0],
                  x: Math.random() * 400 - 200
                }}
                transition={{ 
                  duration: 3,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10">
            {alreadyPlayed ? (
              <>
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {i18n.t('prize.alreadyPlayed')}
                </h2>
              </>
            ) : (
              <>
                <motion.div
                  className="mx-auto mb-4 w-24 h-24 rounded-2xl shadow-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${iconAndTheme.from}, ${iconAndTheme.to})`,
                    color: 'white'
                  }}
                  initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
                  animate={{ scale: [0.6, 1.05, 1], rotate: [ -10, 5, 0 ], opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <span className="text-5xl drop-shadow-lg">{iconAndTheme.icon}</span>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {i18n.t('prize.title')}
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  {i18n.t('prize.subtitle')}
                </p>
                <motion.div 
                  className="text-white text-2xl font-extrabold py-4 px-6 rounded-xl mb-6 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${iconAndTheme.from}, ${iconAndTheme.to})` }}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {prize?.label}
                </motion.div>
              </>
            )}
            
            <button
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              {i18n.t('prize.close')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
