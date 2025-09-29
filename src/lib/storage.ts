
export type Entry = {
  id: string;
  email: string;
  ts: string;
  tasks: { 
    ig_cb: boolean; 
    x_cb: boolean; 
    ig_tron: boolean; 
    x_tron: boolean; 
    tweet: boolean; 
  };
  prize: string;
};

const STORAGE_KEYS = {
  ENTRIES: 'tran_app_entries',
  PLAYED_EMAILS: 'tran_app_played_emails',
  ADMIN_AUTH: 'tran_app_admin_auth'
} as const;

export const storage = {
  // Entries
  getEntries: (): Entry[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENTRIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addEntry: (entry: Entry): void => {
    const entries = storage.getEntries();
    entries.push(entry);
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
  },

  clearEntries: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ENTRIES);
  },

  // Played emails
  getPlayedEmails: (): string[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PLAYED_EMAILS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addPlayedEmail: (email: string): void => {
    const emails = storage.getPlayedEmails();
    if (!emails.includes(email.toLowerCase())) {
      emails.push(email.toLowerCase());
      localStorage.setItem(STORAGE_KEYS.PLAYED_EMAILS, JSON.stringify(emails));
    }
  },

  isEmailPlayed: (email: string): boolean => {
    const emails = storage.getPlayedEmails();
    return emails.includes(email.toLowerCase());
  },

  clearPlayedEmails: (): void => {
    localStorage.removeItem(STORAGE_KEYS.PLAYED_EMAILS);
  },

  // Admin auth
  setAdminAuth: (isAuthenticated: boolean): void => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(isAuthenticated));
  },

  getAdminAuth: (): boolean => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      return data ? JSON.parse(data) : false;
    } catch {
      return false;
    }
  },

  clearAdminAuth: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
