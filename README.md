# mekayalar.com

Bu repoda [mekayalar.com](mekayalar.com) üzerinde çalışan kodları bulabilirsiniz. Bu yazılım [Vercel](https://vercel.com) üzerinde barındırılmaktadır.

## 1.0 Sürümü için Geliştirme Süreci

* [ ] İngilizce dilinin desteklenmesi
* [ ] Skillset için hakkımda kısmına yeni bir component yazılması
* [ ] Notlar kısmına arama modülünün yazılması
* [ ] Mobil görünümde tooltiplerin kapatılması/çalıştırılmaması
* [x] ~~Gönderileri çevrim dışı olarak kaydetme modülünün bitirilmesi~~
* [x] ~~Not sayfasındaki stillerin gözden geçirilmesi ve iyileştirilmesi~~
* [x] ~~Bionic Reader modülünün bitirilmesi~~

## Planlanan Geliştirmeler
* Dinamik CV, yazdığınız yazılım dillerine göre değişen CV
* Takvim üzerinden müsaitlik kontrolü
* belki randevu almak için bir modül
* projeler için detay içeren modal veya sayfa
* makale sayfasında ekranın uykuya geçmesini engellemek
* makale için paylaşım butonları/menüsü
* ekran koruyucusunun üst üste aynı hoşçakalı göstermemesi üzerine düzenleme

geliştirme sürecini [buradan](https://github.com/users/merchizm/projects/7) takip edebilirsiniz.

## Kurulum

Kurulum gayet basit, öncelikle repoyu klonlayın:

```bash
git clone https://github.com/merchizm/mekayalar.com.git
```

klonlama işleminden sonra gerekli modülleri yükleyin:

```bash
npm install
```

modüllerinizi yüklediklten sonra ana dizinde `.env` dosyası oluşturun, içerisine;

* VITE_RAINDROP_ACCESS_TOKEN = [Raindrop.io](https://developer.raindrop.io/v1/authentication/token) API tokeniniz,
* [Giscus](https://giscus.app/) üzerinden alacağınız repo bilgileri,
  * VITE_GISCUS_CATEGORY_ID = kategorinizin ID'si,
  * VITE_GISCUS_REPO_ID = repo ID'niz
* VITE_GH_TOKEN = [GitHub API](https://docs.github.com/en/rest) tokeniniz

`.env` dosyanızı oluşturduktan sonra yapmanız gereken `src/lib/siteConfig.js` dosyasını kendinize göre düzenlemeniz. Düzenleme ardından projeyi çalıştırabilirsiniz: (spotify API'ı unuttum, onu da şuradan [şey edi ver.](https://github.com/merchizm/mekayalar.com-spotify-api))

```bash
npm run dev
## production için
npm run build
## preview için ilk build sonra
npm run preview
```

## Teşekkürler
[Zeynep](https://github.com/zynpnaz)'e bana projeyi geliştirirken yardımcı olduğu için özel teşekkürlerimi borçluyum.