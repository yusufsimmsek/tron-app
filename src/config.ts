export const APP_CONFIG = {
  ORGANIZER: "Çankaya Blockchain",
  SPONSOR: "TRON DAO",
  LINKS: {
    CB_IG: "https://www.instagram.com/cankayablockchain/?hl=en",
    CB_X:  "https://x.com/cankayachain",
    TRON_IG: "https://www.instagram.com/trondaoofficial/",
    TRON_X:  "https://x.com/trondao",
    TWEET_TEXT: "#TRONDAO8 #Turkey #sTRONg",
    TWEET_URL: "" // opsiyonel: "https://cankayablockchain.com"
  },
  PRIZES: [
    { id: "mousepad", label: "Mousepad" },
    { id: "socks",    label: "Çorap Seti" },
    { id: "bag",      label: "Çanta" },
    { id: "mousepad2", label: "Mousepad" },
    { id: "socks2",    label: "Çorap Seti" },
    { id: "bag2",      label: "Çanta" },
    { id: "mousepad3", label: "Mousepad" },
    { id: "socks3",    label: "Çorap Seti" },
    { id: "bag3",      label: "Çanta" }
  ],
  WHEEL: { spinsMin: 3, spinsMax: 4, durationMs: 4500, easing: "easeOutCubic" },
  ADMIN: { PIN: "4782" }
} as const;

export type Prize = typeof APP_CONFIG.PRIZES[0];
export type TaskKey = 'ig_cb' | 'x_cb' | 'ig_tron' | 'x_tron' | 'tweet';
