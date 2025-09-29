
interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressSteps = ({ currentStep, totalSteps }: ProgressStepsProps) => {
  return (
    <div className="mb-12">
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 md:gap-4 flex-nowrap">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div key={index} className="flex items-center flex-shrink-0">
              <div className="relative">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base font-bold transition-all duration-500 shadow-lg ${
                    index < currentStep
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white sm:scale-105 md:scale-110'
                      : index === currentStep
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white sm:scale-105 md:scale-110 animate-pulse'
                      : 'bg-white/20 text-gray-300 border border-white/30'
                  }`}
                >
                  {index < currentStep ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                {index === currentStep && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-sm sm:blur-md opacity-50"></div>
                )}
              </div>
              {index < totalSteps - 1 && (
                <div className="relative mx-1 sm:mx-2">
                  <div
                    className={`w-10 sm:w-12 md:w-16 h-0.5 sm:h-1 rounded-full transition-all duration-500 ${
                      index < currentStep 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-white/20'
                    }`}
                  />
                  {index < currentStep && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 blur-[2px] sm:blur-sm opacity-40"></div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
