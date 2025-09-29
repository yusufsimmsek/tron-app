# TRON DAO - Çarkı Çevir Uygulaması

TRON DAO sponsorlu etkinlikte "Çarkı Çevir - Hediyeni Kap" uygulaması. Kullanıcılar 5 görevi tamamlayıp e-postalarını girdikten sonra çarkı çevirebilirler.

## Özellikler

- ✅ 5 zorunlu sosyal medya görevi
- ✅ E-posta toplama ve KVKK onayı
- ✅ SVG tabanlı çark animasyonu
- ✅ LocalStorage ile veri saklama
- ✅ Admin paneli (PIN korumalı)
- ✅ CSV dışa aktarım
- ✅ Mobil uyumlu tasarım
- ✅ Framer Motion animasyonları

## Teknoloji Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Emoji (native)
- **Storage**: LocalStorage

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
pnpm install
```

2. Ortam değişkenlerini ayarlayın:
```bash
# .env.local dosyası oluşturun
VITE_ADMIN_PIN=4782
```

3. Geliştirme sunucusunu başlatın:
```bash
pnpm dev
```

4. Tarayıcıda `http://localhost:3000` adresini açın.

## Build ve Deploy

```bash
# Production build
pnpm build

# Preview
pnpm preview
```

### Vercel Deploy

1. Vercel hesabınıza giriş yapın
2. GitHub repository'nizi bağlayın
3. Build komutunu `pnpm build` olarak ayarlayın
4. Output directory'yi `dist` olarak ayarlayın
5. Deploy edin

## Kullanım

### Kullanıcı Akışı

1. **Görevleri Tamamla**: 5 sosyal medya görevini tamamlayın
2. **E-posta Gir**: Geçerli e-posta adresinizi girin
3. **KVKK Onayı**: KVKK metnini kabul edin
4. **Çarkı Çevir**: Çarkı çevirerek ödülünüzü kazanın

### Admin Paneli

- Sağ üst köşedeki "Admin" butonuna tıklayın
- PIN: `4782` (varsayılan)
- Kayıtları görüntüleyin, CSV indirin veya verileri temizleyin

## Görevler

1. **Çankaya Blockchain Instagram**: [Takip Et](https://www.instagram.com/cankayablockchain/?hl=en)
2. **Çankaya Blockchain X**: [Takip Et](https://x.com/cankayachain)
3. **TRON DAO Instagram**: [Takip Et](https://www.instagram.com/trondaoofficial/)
4. **TRON DAO X**: [Takip Et](https://x.com/trondao)
5. **Tweet Paylaş**: [#TRONDAO8 #Turkey #sTRONg](https://twitter.com/intent/tweet?text=%23TRONDAO8%20%23Turkey%20%23sTRONg)

## Ödüller

- 🖱️ Mousepad
- 🧦 Çorap Seti
- 🎒 Çanta

## Dosya Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── AdminPanel.tsx
│   ├── EmailCapture.tsx
│   ├── Header.tsx
│   ├── PrizeModal.tsx
│   ├── ProgressSteps.tsx
│   ├── TaskItem.tsx
│   └── Wheel.tsx
├── lib/                # Yardımcı fonksiyonlar
│   ├── csv.ts
│   ├── i18n.ts
│   ├── random.ts
│   └── storage.ts
├── pages/              # Sayfa bileşenleri
│   └── App.tsx
├── config.ts           # Uygulama konfigürasyonu
├── index.css           # Global stiller
└── main.tsx            # Uygulama giriş noktası
```

## Konfigürasyon

`src/config.ts` dosyasından uygulama ayarlarını değiştirebilirsiniz:

- Organizatör ve sponsor bilgileri
- Sosyal medya linkleri
- Ödül listesi
- Çark animasyon ayarları
- Admin PIN

## Güvenlik

- Admin paneli PIN ile korunmuştur
- E-posta adresleri sadece etkinlik iletişimi için kullanılır
- Sosyal medya hesaplarına erişim yok, sadece yönlendirme

## Lisans

Bu proje TRON DAO etkinliği için geliştirilmiştir.

## Destek

Herhangi bir sorun yaşarsanız, lütfen GitHub Issues bölümünden bildirin.
