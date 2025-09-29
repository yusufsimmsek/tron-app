import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storage, type Entry } from '../lib/storage';
import { downloadCSV, downloadExcel } from '../lib/csv';
import { APP_CONFIG } from '../config';
import { i18n } from '../lib/i18n';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [pinError, setPinError] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setEntries(storage.getEntries());
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (pin === APP_CONFIG.ADMIN.PIN) {
      setIsAuthenticated(true);
      setPinError(false);
      storage.setAdminAuth(true);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin('');
    setPinError(false);
    storage.clearAdminAuth();
  };

  const handleDownloadCSV = () => {
    downloadCSV(entries, `tran-app-entries-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleDownloadExcel = () => {
    downloadExcel(entries, `tran-app-entries-${new Date().toISOString().split('T')[0]}.xls`);
  };

  const handleClearData = () => {
    if (confirm(i18n.t('admin.confirmClear'))) {
      storage.clearEntries();
      storage.clearPlayedEmails();
      setEntries([]);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('tr-TR');
  };

  if (!isOpen) return null;

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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {i18n.t('admin.title')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {!isAuthenticated ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {i18n.t('admin.pin')}
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder={i18n.t('admin.pinPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
                {pinError && (
                  <p className="text-red-500 text-sm mt-1">
                    {i18n.t('admin.pinError')}
                  </p>
                )}
              </div>
              <button
                onClick={handleLogin}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {i18n.t('admin.login')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {i18n.t('admin.entries')} ({entries.length})
                </h3>
                <div className="space-x-2">
                  <button
                    onClick={handleDownloadCSV}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    {i18n.t('admin.download')}
                  </button>
                  <button
                    onClick={handleDownloadExcel}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                  >
                    Excel
                  </button>
                  <button
                    onClick={handleClearData}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    {i18n.t('admin.clear')}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    {i18n.t('admin.logout')}
                  </button>
                </div>
              </div>

              {entries.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  {i18n.t('admin.noEntries')}
                </p>
              ) : (
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left">ID</th>
                        <th className="px-3 py-2 text-left">E-posta</th>
                        <th className="px-3 py-2 text-left">Tarih</th>
                        <th className="px-3 py-2 text-left">IG CB</th>
                        <th className="px-3 py-2 text-left">X CB</th>
                        <th className="px-3 py-2 text-left">IG TRON</th>
                        <th className="px-3 py-2 text-left">X TRON</th>
                        <th className="px-3 py-2 text-left">Tweet</th>
                        <th className="px-3 py-2 text-left">Ödül</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry) => (
                        <tr key={entry.id} className="border-b">
                          <td className="px-3 py-2 font-mono text-xs">{entry.id}</td>
                          <td className="px-3 py-2">{entry.email}</td>
                          <td className="px-3 py-2">{formatDate(entry.ts)}</td>
                          <td className="px-3 py-2 text-center">
                            {entry.tasks.ig_cb ? '✅' : '❌'}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {entry.tasks.x_cb ? '✅' : '❌'}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {entry.tasks.ig_tron ? '✅' : '❌'}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {entry.tasks.x_tron ? '✅' : '❌'}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {entry.tasks.tweet ? '✅' : '❌'}
                          </td>
                          <td className="px-3 py-2 font-semibold">{entry.prize}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
