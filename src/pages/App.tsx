import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { TaskItem } from '../components/TaskItem';
import { EmailCapture } from '../components/EmailCapture';
import { Wheel } from '../components/Wheel';
import { PrizeModal } from '../components/PrizeModal';
import { ProgressSteps } from '../components/ProgressSteps';
import { AdminPanel } from '../components/AdminPanel';
import { storage, generateId, validateEmail, type Entry, type TaskKey } from '../lib/storage';
import { i18n } from '../lib/i18n';
import { APP_CONFIG } from '../config';

const TASK_KEYS: TaskKey[] = ['ig_cb', 'x_cb', 'ig_tron', 'x_tron', 'tweet'];

export const App = () => {
  const [tasks, setTasks] = useState<Record<TaskKey, boolean>>({
    ig_cb: false,
    x_cb: false,
    ig_tron: false,
    x_tron: false,
    tweet: false
  });
  
  const [email, setEmail] = useState('');
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [prize, setPrize] = useState<string | null>(null);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [wasAlreadyPlayedAtSpin, setWasAlreadyPlayedAtSpin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const completedTasks = Object.values(tasks).filter(Boolean).length;
  const canSpin = completedTasks === TASK_KEYS.length && email && kvkkAccepted && validateEmail(email) && !alreadyPlayed;

  useEffect(() => {
    // Check if email was already played
    if (email && storage.isEmailPlayed(email)) {
      setAlreadyPlayed(true);
    } else {
      setAlreadyPlayed(false);
    }
  }, [email]);

  const handleTaskToggle = (taskKey: TaskKey) => {
    setTasks(prev => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  };

  const handleSpinComplete = (prize: { id: string; label: string }) => {
    setIsSpinning(false);
    setPrize(prize.label);
    setShowPrizeModal(true);
    
    // Save entry
    const entry: Entry = {
      id: generateId(),
      email: email.toLowerCase(),
      ts: new Date().toISOString(),
      tasks: { ...tasks },
      prize: prize.label
    };
    
    storage.addEntry(entry);
    storage.addPlayedEmail(email);
    setAlreadyPlayed(true);
  };

  const handleSpin = () => {
    if (!canSpin || isSpinning) return;
    setWasAlreadyPlayedAtSpin(alreadyPlayed);
    setIsSpinning(true);
  };

  const handleClosePrizeModal = () => {
    setShowPrizeModal(false);
    setPrize(null);
  };


  const currentStep = Math.min(completedTasks + (email && validateEmail(email) ? 1 : 0) + (kvkkAccepted ? 1 : 0), 7);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"></div>
      

      <div className="relative z-10 max-w-[1100px] mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <Header />
        
        <ProgressSteps currentStep={currentStep} totalSteps={7} />
        
        <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
          {/* Tasks Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {i18n.t('tasks.title')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid gap-4 sm:gap-6">
              {TASK_KEYS.map((taskKey) => (
                <TaskItem
                  key={taskKey}
                  taskKey={taskKey}
                  completed={tasks[taskKey]}
                  onToggle={handleTaskToggle}
                />
              ))}
            </div>
          </div>

          {/* Email Section */}
          <EmailCapture
            email={email}
            kvkkAccepted={kvkkAccepted}
            onEmailChange={setEmail}
            onKvkkChange={setKvkkAccepted}
            alreadyPlayed={alreadyPlayed}
          />

          {/* Wheel Section */}
          <div className="flex justify-center">
            <Wheel
              isSpinning={isSpinning}
              onSpinComplete={handleSpinComplete}
              disabled={!canSpin}
              alreadyPlayed={alreadyPlayed}
              showPrizeModal={showPrizeModal}
            />
          </div>
        </div>

        {/* Footer with inline logos */}
        <footer className="text-center text-gray-300 text-sm mt-16 relative z-10">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <p className="font-medium mb-4">{i18n.t('footer')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12">
              <img
                src="/logo-1.svg"
                alt="CB"
                className="h-[90px] sm:h-[120px] md:h-[160px] lg:h-[200px] object-contain drop-shadow-xl transition-transform duration-300 ease-out hover:scale-105 motion-safe:animate-float"
              />
              <img
                src="/logo-2.svg"
                alt="TRON"
                className="h-[90px] sm:h-[120px] md:h-[160px] lg:h-[200px] object-contain drop-shadow-xl transition-transform duration-300 ease-out hover:scale-105 motion-safe:animate-float"
              />
            </div>
          </div>
          
          {/* Admin Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowAdminPanel(true)}
              className="px-4 py-2 text-sm bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Admin
              </div>
            </button>
          </div>
        </footer>
      </div>

      {/* Prize Modal */}
      <PrizeModal
        isOpen={showPrizeModal}
        prize={prize ? { id: '', label: prize } : null}
        onClose={handleClosePrizeModal}
        alreadyPlayed={wasAlreadyPlayedAtSpin}
      />

      {/* Admin Panel */}
      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />
    </div>
  );
};
