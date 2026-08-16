# Yılmaz Yapı — Kurumsal Web Sitesi

İnşaat ve kentsel dönüşüm firması **Yılmaz Yapı** için vitrin (showcase) web sitesi.

Cosmic Hub projesinden tamamen bağımsızdır.

## Hızlı başlangıç

```bash
cd ~/Projects/yilmaz-yapi-web
npm run dev
```

Tarayıcıda: [http://localhost:3000](http://localhost:3000)

## Sayfalar

| Sayfa | URL |
|-------|-----|
| Anasayfa | `/` |
| Kurumsal | `/kurumsal` |
| Projeler | `/projeler` |
| Proje detay | `/projeler/[slug]` |
| Kentsel Dönüşüm | `/kentsel-donusum` |
| İletişim | `/iletisim` |
| KVKK | `/kvkk` |
| Gizlilik | `/gizlilik` |
| Admin (iskelet) | `/admin` |

## İletişim bilgileri

- **Telefon:** +90 532 732 90 60
- **WhatsApp:** +90 553 139 32 20

(`src/lib/site-config.ts` dosyasından güncellenir)

## Mevcut durum

- ✅ Mockup'a uygun tasarım (krem/altın palet, serif başlıklar)
- ✅ 12 placeholder proje
- ✅ Telefon + WhatsApp entegrasyonu
- ✅ Mobil uyumlu navigasyon
- ⏳ Admin panel (iskelet — Supabase sonraki aşama)
- ⏳ Gerçek proje fotoğrafları
- ⏳ Domain + yayın

## İletişim formu gerekli mi?

**Şu an hayır.** Telefon ve WhatsApp inşaat sektöründe daha etkili. İleride form eklemek isterseniz Supabase'e kayıt veya e-posta bildirimi eklenebilir.

## Sonraki adımlar (Supabase admin)

1. Supabase projesi oluştur
2. `projects` tablosu + Storage (fotoğraf/video)
3. Tek admin kullanıcı (Auth)
4. `/admin` girişi ve CRUD paneli
5. Vercel deploy + domain bağlama

## Deploy

```bash
npm run build
```

Vercel'e push edildiğinde otomatik deploy olur. Domain en son adımda bağlanır.
