import { useState, useRef } from 'react';
import { APP_CONFIG, type Prize } from '../config';
import { i18n } from '../lib/i18n';
import { getRandomPrize, getRandomRotation, easeOutCubic } from '../lib/random';

interface WheelProps {
  isSpinning: boolean;
  onSpinComplete: (prize: Prize) => void;
  disabled: boolean;
  alreadyPlayed?: boolean;
  showPrizeModal?: boolean;
}

export const Wheel = ({ isSpinning, onSpinComplete, disabled, alreadyPlayed = false, showPrizeModal = false }: WheelProps) => {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleSpin = () => {
    if (isSpinning || disabled) return;

    const finalRotation = getRandomRotation();
    const prize = getRandomPrize();
    
    setRotation(prev => prev + finalRotation);
    
    // Simulate spinning animation
    const startTime = performance.now();
    const duration = APP_CONFIG.WHEEL.durationMs;
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentRotation = rotation + (finalRotation * easedProgress);
      
      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${currentRotation}deg)`;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        onSpinComplete(prize);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const sliceAngle = 360 / APP_CONFIG.PRIZES.length;
  const colors = [
    { start: '#FFD700', end: '#FFA500' }, // Altın
    { start: '#8A2BE2', end: '#9932CC' }, // Mor
    { start: '#20B2AA', end: '#00CED1' }, // Turkuaz
    { start: '#32CD32', end: '#00FF7F' }, // Yeşil
    { start: '#FFD700', end: '#FFA500' }, // Altın
    { start: '#8A2BE2', end: '#9932CC' }, // Mor
    { start: '#20B2AA', end: '#00CED1' }, // Turkuaz
    { start: '#32CD32', end: '#00FF7F' }, // Yeşil
    { start: '#FFD700', end: '#FFA500' }  // Altın
  ];

  return (
    <div className="flex flex-col items-center space-y-6 sm:space-y-8">
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white text-center mb-2 sm:mb-4">
        {i18n.t('wheel.title')}
      </h3>
      <p className="text-base sm:text-lg text-gray-200 text-center mb-6 sm:mb-8">
        Çevirmek için dokun!
      </p>
      
      <div className="relative">
        {/* Wheel Container */}
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem]">
          {/* Modern Arrow with glow effect */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 z-20">
            <div className="relative">
              {/* Arrow Shadow */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-10 border-r-10 border-b-24 border-l-transparent border-r-transparent border-b-black/30 blur-sm"></div>
              {/* Main Arrow */}
              <div className="w-0 h-0 border-l-10 border-r-10 border-b-24 border-l-transparent border-r-transparent border-b-yellow-400 drop-shadow-2xl"></div>
              {/* Arrow Highlight */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-8 border-r-8 border-b-20 border-l-transparent border-r-transparent border-b-yellow-300"></div>
              {/* Arrow Glow */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 w-0 h-0 border-l-12 border-r-12 border-b-28 border-l-transparent border-r-transparent border-b-yellow-400/40 blur-lg"></div>
              {/* Arrow Base */}
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-30 blur-xl animate-pulse"></div>
          
          {/* Wheel */}
          <div
            ref={wheelRef}
            className={`relative w-full h-full rounded-full border-4 border-white/30 shadow-2xl transition-transform duration-1000 ease-out overflow-hidden ${
              isSpinning ? 'animate-glow' : ''
            }`}
            style={{ 
              transform: `rotate(${rotation}deg)`,
              boxShadow: '0 0 50px rgba(255, 255, 255, 0.3), inset 0 0 50px rgba(255, 255, 255, 0.1)'
            }}
          >
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <defs>
                {colors.map((color, index) => (
                  <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={color.start} />
                    <stop offset="100%" stopColor={color.end} />
                  </linearGradient>
                ))}
                <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.7)" />
                </radialGradient>
              </defs>
              {APP_CONFIG.PRIZES.map((prize, index) => {
                // Add small gap between slices
                const gapAngle = 3; // 3 degrees gap
                const adjustedSliceAngle = sliceAngle - gapAngle;
                const startAngle = index * sliceAngle + gapAngle / 2;
                const endAngle = startAngle + adjustedSliceAngle;
                const largeArcFlag = adjustedSliceAngle > 180 ? 1 : 0;
                
                const x1 = 250 + 220 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 250 + 220 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 250 + 220 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 250 + 220 * Math.sin((endAngle * Math.PI) / 180);
                
                const pathData = [
                  `M 250 250`,
                  `L ${x1} ${y1}`,
                  `A 220 220 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  'Z'
                ].join(' ');
                
                const textAngle = (startAngle + endAngle) / 2;
                const textX = 250 + 160 * Math.cos((textAngle * Math.PI) / 180);
                const textY = 250 + 160 * Math.sin((textAngle * Math.PI) / 180);
                
                return (
                  <g key={prize.id}>
                    {/* Main slice */}
                    <path
                      d={pathData}
                      fill={`url(#gradient-${index % colors.length})`}
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="2"
                    />
                    {/* Inner border for separation */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="1"
                    />
                    {/* Text background circle */}
                    <circle
                      cx={textX}
                      cy={textY}
                      r="35"
                      fill="rgba(0, 0, 0, 0.4)"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="2"
                    />
                    <text
                      x={textX}
                      y={textY - 5}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-sm font-bold fill-white drop-shadow-lg"
                      transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                      style={{ 
                        fontSize: '16px',
                        fontWeight: '900',
                        textShadow: '0 3px 6px rgba(0,0,0,0.9)',
                        letterSpacing: '1px'
                      }}
                    >
                      {prize.label}
                    </text>
                  </g>
                );
              })}
              
              {/* Center Circle */}
              <circle
                cx="250"
                cy="250"
                r="60"
                fill="url(#centerGradient)"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="5"
              />
              {/* Center Circle Inner Glow */}
              <circle
                cx="250"
                cy="250"
                r="55"
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="2"
              />
              <text
                x="250"
                y="235"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-lg font-bold fill-gray-800"
                style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '4px' }}
              >
                SPIN
              </text>
              <text
                x="250"
                y="265"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-bold fill-gray-600"
                style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '2px' }}
              >
                WHEEL
              </text>
              {/* Center Decorative Elements */}
              <circle cx="250" cy="250" r="3" fill="rgba(255, 255, 255, 0.6)" />
              <circle cx="250" cy="250" r="1.5" fill="rgba(0, 0, 0, 0.3)" />
            </svg>
          </div>
          
          {/* Inner Glow Effect */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
        </div>
      </div>
      
            <button
              onClick={handleSpin}
              disabled={disabled || isSpinning}
              className={`relative px-16 py-6 rounded-3xl text-2xl font-black transition-all duration-300 overflow-hidden group ${
                disabled || isSpinning
                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 text-white shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-110 hover:-translate-y-2'
              }`}
            >
        {/* Button Glow Effect */}
        {!disabled && !isSpinning && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
        )}
        
        {/* Button Content */}
        <span className="relative z-10 flex items-center gap-4">
          {isSpinning ? (
            <>
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-2xl font-black">{i18n.t('wheel.spinning')}</span>
            </>
          ) : (
            <>
              <span className="text-3xl">🎯</span>
              <span className="text-2xl font-black">{i18n.t('wheel.spin')}</span>
            </>
          )}
        </span>
        
        {/* Ripple Effect */}
        {!disabled && !isSpinning && (
          <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-active:scale-100 transition-transform duration-150"></div>
        )}
      </button>
      
            {disabled && alreadyPlayed && !showPrizeModal && (
              <p className="text-red-400 text-center max-w-md text-lg font-semibold">
                ⚠️ Bu e-posta adresi ile zaten oynadınız!
              </p>
            )}
            {disabled && !alreadyPlayed && !showPrizeModal && (
              <p className="text-yellow-300 text-center max-w-md">
                {i18n.t('wheel.disabled')}
              </p>
            )}
    </div>
  );
};
