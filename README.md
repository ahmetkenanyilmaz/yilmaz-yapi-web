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
| Admin giriş | `/admin/login` |
| Admin paneli | `/admin` |

## İletişim bilgileri

- **Telefon:** +90 532 732 90 60
- **WhatsApp:** +90 553 139 32 20

(`src/lib/site-config.ts` dosyasından güncellenir)

## Mevcut durum

- ✅ Mockup'a uygun tasarım (krem/altın palet, serif başlıklar)
- ✅ Projeler Supabase üzerinden yönetilir (admin paneli)
- ✅ Telefon + WhatsApp entegrasyonu
- ✅ Mobil uyumlu navigasyon

## Admin / Supabase kurulumu

Sahte URL veya API anahtarı kullanmayın. Aşağıdaki adımları kendi Supabase hesabınızda uygulayın.

1. [supabase.com](https://supabase.com) üzerinde yeni bir proje oluşturun.
2. **Authentication > Providers** içinde Email girişini açık tutun.
3. **Authentication > Users** üzerinden tek bir yönetici kullanıcı ekleyin (e-posta + şifre).
4. **SQL Editor** içinde `supabase/migrations/202608160001_projects_admin.sql` dosyasının tamamını çalıştırın.
5. Aynı SQL Editor’da yöneticiyi yetkilendirin (e-postayı kendi adresinizle değiştirin):

```sql
insert into public.admin_users (user_id)
select id from auth.users
where email = 'sizin-admin@adresiniz.com';
```

6. **Project Settings > API** bölümünden değerleri kopyalayıp proje köküne `.env.local` dosyası oluşturun:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

`service_role` anahtarını bu dosyaya veya istemci koda koymayın.

7. Geliştirme sunucusunu yeniden başlatın ve `/admin/login` ile giriş yapın.

## İletişim formu (Resend)

Formun çalışması için [resend.com](https://resend.com) hesabı ve doğrulanmış gönderen domain gerekir.

1. Resend’de ücretsiz hesap açın.
2. **API Keys** → yeni anahtar oluşturun (`re_...`).
3. **Domains** → `yilmazyapi.ltd` ekleyin. Paneldeki TXT / MX kayıtlarını domain DNS’ine ekleyin ve yeşil “Verified” olana kadar bekleyin.
4. `.env.local` (ve yayın sonrası Vercel Environment Variables) içine:

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=info@yilmazyapi.ltd
CONTACT_FROM_EMAIL=Yılmaz Yapı <info@yilmazyapi.ltd>
```

Domain doğrulanmadan `CONTACT_FROM_EMAIL` boş bırakılırsa form 503 döner. Test için geçici olarak `onboarding@resend.dev` kullanılabilir; bu adres yalnızca Resend hesap e-postanıza mail atar.

## Deploy

```bash
npm run build
```

Vercel’e taşıyınca şu değişkenleri proje ayarlarına ekleyin:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
