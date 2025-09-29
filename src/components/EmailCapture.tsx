import { useState } from 'react';
import { i18n } from '../lib/i18n';
import { validateEmail } from '../lib/storage';

interface EmailCaptureProps {
  email: string;
  kvkkAccepted: boolean;
  onEmailChange: (email: string) => void;
  onKvkkChange: (accepted: boolean) => void;
  alreadyPlayed?: boolean;
}

export const EmailCapture = ({ 
  email, 
  kvkkAccepted, 
  onEmailChange, 
  onKvkkChange,
  alreadyPlayed = false
}: EmailCaptureProps) => {
  const [showKvkkModal, setShowKvkkModal] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (value: string) => {
    onEmailChange(value);
    setEmailError('');
  };

  const handleEmailBlur = () => {
    const normalized = email.trim().toLowerCase();
    onEmailChange(normalized);
    if (normalized && !validateEmail(normalized)) {
      setEmailError(i18n.t('email.invalid'));
    }
  };

  return (
    <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/20 to-cyan-500/20 rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {i18n.t('email.title')}
        </h3>
        
        <div className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={handleEmailBlur}
              placeholder={i18n.t('email.placeholder')}
              className={`w-full px-6 py-4 rounded-xl border-2 text-lg font-medium transition-all duration-200 ${
                emailError 
                  ? 'border-red-400 bg-red-500/10 text-red-100 placeholder-red-300' 
                  : 'border-white/30 bg-white/10 text-white placeholder-gray-300 hover:border-white/50 focus:border-purple-400 focus:bg-white/20'
              } focus:outline-none focus:ring-4 focus:ring-purple-500/20 backdrop-blur-sm`}
            />
            {emailError && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {emailError}
              </p>
            )}
            {alreadyPlayed && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2 font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Bu e-posta adresi ile zaten oynadınız!
              </p>
            )}
          </div>
          
          <div className="flex items-start gap-4">
            <div className="relative">
              <input
                type="checkbox"
                id="kvkk"
                checked={kvkkAccepted}
                onChange={(e) => onKvkkChange(e.target.checked)}
                className="w-6 h-6 text-purple-600 bg-white/20 border-2 border-white/30 rounded-lg focus:ring-4 focus:ring-purple-500/20 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200"
              />
              {kvkkAccepted && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <label htmlFor="kvkk" className="text-white text-sm cursor-pointer flex-1">
              <span className="font-medium">{i18n.t('email.kvkk')}</span>
              <button
                type="button"
                onClick={() => setShowKvkkModal(true)}
                className="text-purple-400 hover:text-purple-300 underline ml-2 font-semibold transition-colors duration-200"
              >
                (Detay)
              </button>
            </label>
          </div>
        </div>
      </div>

      {/* KVKK Modal */}
      {showKvkkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              KVKK Aydınlatma Metni
            </h4>
            <p className="text-gray-600 mb-6">
              {i18n.t('email.kvkkText')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowKvkkModal(false)}
                className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                {i18n.t('close')}
              </button>
              <button
                onClick={() => {
                  onKvkkChange(true);
                  setShowKvkkModal(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {i18n.t('confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
