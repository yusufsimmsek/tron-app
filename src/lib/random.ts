import { APP_CONFIG, type Prize } from '../config';

export const getRandomPrize = (): Prize => {
  const prizes = APP_CONFIG.PRIZES;
  const randomIndex = Math.floor(Math.random() * prizes.length);
  return prizes[randomIndex] as Prize;
};

export const getRandomRotation = (): number => {
  const { spinsMin, spinsMax } = APP_CONFIG.WHEEL;
  const spins = Math.random() * (spinsMax - spinsMin) + spinsMin;
  const baseRotation = Math.random() * 360;
  return spins * 360 + baseRotation;
};

export const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export const animateValue = (
  start: number,
  end: number,
  duration: number,
  easing: (t: number) => number,
  onUpdate: (value: number) => void,
  onComplete?: () => void
): void => {
  const startTime = performance.now();
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);
    const currentValue = start + (end - start) * easedProgress;
    
    onUpdate(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else if (onComplete) {
      onComplete();
    }
  };
  
  requestAnimationFrame(animate);
};
