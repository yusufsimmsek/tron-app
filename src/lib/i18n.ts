export const translations = {
  tr: {
    // Header
    title: "Çarkı Çevir - Hediyeni Kap",
    subtitle: "5 görevi tamamla, e-postanı gir ve çarkı çevir!",
    
    // Tasks
    tasks: {
      title: "Görevleri Tamamla",
      ig_cb: "Çankaya Blockchain'i Instagram'da takip et",
      x_cb: "Çankaya Blockchain'i X'te takip et", 
      ig_tron: "TRON DAO'yu Instagram'da takip et",
      x_tron: "TRON DAO'yu X'te takip et",
      tweet: "X'te tweet paylaş",
      go: "Git",
      completed: "Tamamlandı"
    },
    
    // Email capture
    email: {
      title: "E-posta Adresin",
      placeholder: "ornek@email.com",
      required: "E-posta adresi gerekli",
      invalid: "Geçerli bir e-posta adresi girin",
      kvkk: "KVKK'yı kabul ediyorum",
      kvkkText: "E-postanız yalnızca etkinlik iletişimi için kullanılacaktır, üçüncü kişilerle paylaşılmaz.",
      kvkkRequired: "KVKK onayı gerekli"
    },
    
    // Wheel
    wheel: {
      title: "Çarkı Çevir",
      spin: "Çarkı Çevir",
      spinning: "Çevriliyor...",
      disabled: "Önce tüm görevleri tamamla ve e-postanı gir"
    },
    
    // Prize modal
    prize: {
      title: "Tebrikler!",
      subtitle: "Kazandığın ödül:",
      close: "Kapat",
      alreadyPlayed: "Bu e-posta adresi ile daha önce oynadınız!"
    },
    
    // Admin
    admin: {
      title: "Admin Paneli",
      pin: "PIN Girin",
      pinPlaceholder: "PIN",
      login: "Giriş Yap",
      logout: "Çıkış Yap",
      entries: "Kayıtlar",
      download: "CSV İndir",
      clear: "Verileri Temizle",
      noEntries: "Henüz kayıt yok",
      confirmClear: "Tüm verileri temizlemek istediğinizden emin misiniz?",
      pinError: "Yanlış PIN!"
    },
    
    // Common
    loading: "Yükleniyor...",
    error: "Hata oluştu",
    success: "Başarılı",
    close: "Kapat",
    cancel: "İptal",
    confirm: "Onayla",
    
    // Footer
    footer: "Bu uygulama sosyal medya hesaplarınıza erişmez; yalnızca yönlendirir.",
    organizer: "Düzenleyen:",
    sponsor: "Sponsor:"
  },
  
  en: {
    // Header
    title: "Spin the Wheel - Win Your Prize",
    subtitle: "Complete 5 tasks, enter your email and spin the wheel!",
    
    // Tasks
    tasks: {
      title: "Complete Tasks",
      ig_cb: "Follow Çankaya Blockchain on Instagram",
      x_cb: "Follow Çankaya Blockchain on X",
      ig_tron: "Follow TRON DAO on Instagram", 
      x_tron: "Follow TRON DAO on X",
      tweet: "Share tweet on X",
      go: "Go",
      completed: "Completed"
    },
    
    // Email capture
    email: {
      title: "Your Email",
      placeholder: "example@email.com",
      required: "Email address is required",
      invalid: "Please enter a valid email address",
      kvkk: "I accept KVKK",
      kvkkText: "Your email will only be used for event communication and will not be shared with third parties.",
      kvkkRequired: "KVKK approval is required"
    },
    
    // Wheel
    wheel: {
      title: "Spin the Wheel",
      spin: "Spin the Wheel",
      spinning: "Spinning...",
      disabled: "Complete all tasks and enter your email first"
    },
    
    // Prize modal
    prize: {
      title: "Congratulations!",
      subtitle: "Your prize:",
      close: "Close",
      alreadyPlayed: "You have already played with this email address!"
    },
    
    // Admin
    admin: {
      title: "Admin Panel",
      pin: "Enter PIN",
      pinPlaceholder: "PIN",
      login: "Login",
      logout: "Logout",
      entries: "Entries",
      download: "Download CSV",
      clear: "Clear Data",
      noEntries: "No entries yet",
      confirmClear: "Are you sure you want to clear all data?",
      pinError: "Wrong PIN!"
    },
    
    // Common
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
    close: "Close",
    cancel: "Cancel",
    confirm: "Confirm",
    
    // Footer
    footer: "This app does not access your social media accounts; it only redirects.",
    organizer: "Organized by:",
    sponsor: "Sponsored by:"
  }
} as const;

export type Language = keyof typeof translations;
let currentLanguage: Language = 'tr';

export const i18n = {
  setLanguage: (lang: Language): void => {
    currentLanguage = lang;
  },
  
  getLanguage: (): Language => {
    return currentLanguage;
  },
  
  t: (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }
};
