<script>
  import WelcomeSection from "../component/WelcomeSection.svelte";
  import SocialSection from "../component/SocialSection.svelte";
  import DateListSection from "../component/DateListSection.svelte";

  export const prerender = true; // index page is most visited, lets prerender

  let projects = [
    {
      label: "2022",
      title: "mekayalar.com",
      location: "Typescript-Svelte-SCSS-HTML",
      desc: "Kişisel Blog/Portfolio Yazılımım olur kendisi. Açık kaynaklı bir şekilde github hesabımda, dileyen herkes bu yazılımı kendince kullanabilir.",
    },
    {
      label: "2019-2022",
      title: "InstagramUnfollower",
      location: "Python",
      desc: "Normalde Instagram uygulamasının kendi kullandığı end-pointler üzerinden çalışan bir uygulama olacakken, end-pointlerin değişimi sonucu köşeye kaldırdığım bir projeydi fakat düzgün çalışmasa da bir unoffical api ile projeyi ayağı kaldırdım. Arayüzü geliştirmek için Qt5 kullandım. ",
    },
    {
      label: "2022",
      title: "PHPSecureLogin",
      location: "PHP",
      desc: "PDO, Redis, JWT, hCaptcha, Google Authenticator gibi teknolojilerin ve servislerin üzerine kurulmuş bir güvenli giriş/üyelik sistemi.",
    },
    {
      label: "2022",
      title: "SQLite Helper",
      location: "Python",
      desc: "Nesne tabanlı programlama dersimden aldığım proje ödevi, Oluşturduğum Python sınıfı sayesinde SQLite tablolarınızı daha kolay bir şekilde Terminal üzerinden yönetebileceğiniz yazılımım.",
    },
    {
      label: "2018",
      title: "Meido",
      location: "PHP-JavaScript",
      desc: "Meido, en başta Facebook uygulamasındaki gizli gruplar içerisinde paylaşılan fotoğrafları ve videoları indirebilmek amacıyla gerçekleştirilmiş bir projedir. Proje ilerledikçe sadece Facebook platform’u üzerinden değil, Instagram, Izlesene platformlarını da desteklemiştir. Proje PHP ile geliştirildi, uzak siteden verileri işleyerek kullanıcılara medyalara kolay bir şekilde indirme imkanı sundu. Ne yazık ki platformların sık sık güncellenmesi sonucu oluşan değişiklikler projenin devamlılığına çapa vurdu. Zaten hali hazırda az kullanıcıya erişmesi nedeniyle projeyi devam ettirmeme kararı aldım.",
    },
    {
      label: "2018",
      title: "EK.Ask Me",
      location: "PHP-JavaScript",
      desc: "Bu yazılımda ilk defa PDO kullandım, yazılım üzerinde hem bir tasarım değiştirme düzeneği ekledim hemde veritabanı yedekleme sistemi ekledim. Bana sorulan soruların hepsini yönetim paneli üzerinden kontrol edebiliyordum.",
    },
    {
      label: "2018",
      title: "Mocean Cleaner",
      location: "VB.NET veya C#",
      desc: "Mocean Cleaner, Toyota’nın Sakarya ilçesinde gerçekleştirdiği Teknik Yarışma için geliştirilmiştir. Mocean Cleaner çıkmadan önce internet üzerindeki bir forum için Mocean Personalize olarak ortaya çıkmıştır. Mocean Cleaner’in kullanıcıya sağladığı özellikler ise; Gereksiz veya Artık Dosyaları tepsit etmek ve temizlemek, Programların(Popüler) ürettiği ve kaldırılırken silmediği kayıt defteri kayıtlarını tespit etmesi ve temizlemesi, Gereksiz RAM Kullanımını azaltmak ve kullanıcının performansının sürekliliğini sağlamak, Kullanıcıya yaptığı tarama/temizlik üzerine istatistik sunmak ve uygulamanın kullanıldığı cihaza faydalarını göstermekti. Programın kullanıcı arabirim bileşenleri VisualBasic.NET ile Program içerisinde kullanılan sınıflar C# ile geliştirilmiştir.",
    },
    {
      label: "2017",
      title: "ViaBot",
      location: "VB.NET veya C#",
      desc: "İlk oluşturulduğunda facebook hesabı yönetmek için kullanılan fakat ilerleyen versiyonlarda Instagram hesabı yönetmek adına geliştirilen proje. Facebook hesap yönetmek için geliştirdiğim zamanlarda browserView üzerinden işlemleri gerçekleştiriyordum. Instagram hesabı yönetmek için geliştirdiğim zamanda ise unoffical bir instagram api'nı nuget paket yöneticisi üzerinden indirip yazılımı geliştirmiştim."
    },
    {
      label: "2017",
      title: "Mocean Personalize",
      location: "VB.NET veya C#",
      desc: "Bir forum için geliştirilmiş, kullanılan bilgisayarın performans artışını hedefleyen basit bir temizlik uygulaması. Yazılım üzerinden web sayfası engelleyebiliyordunuz ekstra olarak belli reklam veren sitelerin hazır listelerini direkt olarak engelleyip reklamları eklenti kullanmadan engelleyebiliyordunuz. Ayrıca kullanıcıların bilgisayarını temizleyebilmesi için birçok araç bulunuyordu. Gerek kullanıcı önbelleği olsun gerek gereksiz dosyalar olsun gerek kaldırılan bazı popüler programların artıkları olsun, bu dosyaların hepsini temizleyebiliyordunuz. Ayrıca yazılımın içerisinde bilgisayarın hızlı açılabilmesi için bir bash komut dosyası vardı. İnternet Explorer ve Firefox üzerindeki verilerinizi internet ayarları sekmesinden temizleyebiliyordunuz.",
    },
    {
      label: "2016-2017",
      title: "Mocean Updater",
      location: "VB.NET",
      desc: "Geliştiricilerin windows cihazlarda uygulamaları güncellemek adına kullanabileceği güncelleme sistemiydi. Uygulamayı kişiselleştirmek için ini dosyasını düzenliyordunuz ve kendinize göre ayarlıyordunuz.",
    },
    {
      label: "2016-2017",
      title: "Mocean Depo",
      location: "PHP-HTML-CSS",
      desc: "Eski bir dosya yükleme scripti'ini hem tasarımsal olarak güncelleyip hemde ekstra olarak VirusTotal API'si ile yüklenen dosyaları taratıp zararlı olup olmadığını kontrol eden, Hemde indirme bağlantılarını aynı websitede 5 saniye bekletmek yerine link kısaltma servisinde 5 saniye bekletip yazılımı kullananın gelir elde etmesini sağlayan bir script yaptım."
    },
    {
      label: "2016",
      title: "Link Kısaltma Scripti",
      location: "PHP-HTML-CSS",
      desc: "Veritabanları o zamanlar maliyetli olduğu için sürekli olarak dosya üreten ve dosya üzerinden 5 saniye bekletip yönlendirmeyi yapan çok basit bir bağlantı kısaltma scriptiydi."
    }
  ];
  let work = [
    {
      label: "2020",
      title: "Freelance Web Developer",
      location: "Bionluk - Fiverr / Remote",
      desc: "Bu iş serüvenimde tamamen yazılım odaklı çalıştım. PHP üzerinde Kendi View-Controller-Model Yapısını kurma şansım oldu. ReflectionClass ile Controller yapısını gerçekleştirdim. View için ise Twig ve OOP’den yararlandım, Sınıfları genellikle composer ile otomatik olarak yükledim. Bazı zamanlar PHP üzerine eklemeler yapmam gerekti, IMAP, REDIS gibi eklentileri kurdum. Zaten pekte uzak olmadığım SOLID, KISS prensiplerini kullandım. Kodların okunabilirliği ve geriye dönük düzenlemeler için PHPDoc’tan vazgeçmedim. Çoğu zaman işin kısalığından dolayı manuel olarak kod kontrolü gerçekleştirsemde PHPUnit Test kütüphanesini genel olarak öğrendim ve bir kaç işimde ve projelerde kullandım."
    },
    {
      label: "2018-2019",
      title: "IT Intern",
      location: "Ak Gıda Sanayi ve Ticaret A.Ş / Sakarya",
      desc: "Bir şirketin tam olarak nasıl sorunsuz bir şekilde işlemesi için gereken donanımları, çalışanların isimleriyle LDAP ağına nasıl bağlı olduklarını ve bu ağa nasıl giriş yaptıklarını, kayıtlarını nasıl oluşturduğumuzu tecrübe ettim. Bunun yanı sıra Bilgisayar Donanımlarıyla ilişkimi kuvvetlendirerek cihazların yanıtlarına göre hangi donanımın sıkıntılı olduğunu çözebilecek konuma geldim. Bir IT Çalışanının rutin olarak neleri kontrol ettiğini ve problemleri hangi prensipler ile çözdüklerini, görev yönetimini nasıl gerçekleştirdiklerini ve gelişimi nasıl takip ettiklerini öğrendim."
    }
  ];
</script>

<WelcomeSection>
  <h2 slot="title">moonlight uh, spotlight uh</h2>
  <p slot="paragraph">
    lorem impsum dolor sit amet
  </p>
</WelcomeSection>
<SocialSection/>
<DateListSection dateList={projects}>
  <h2 slot="title">Proje Deneyimlerim</h2>
</DateListSection>
<DateListSection dateList={work}>
  <h2 slot="title">İş Deneyimlerim</h2>
</DateListSection>