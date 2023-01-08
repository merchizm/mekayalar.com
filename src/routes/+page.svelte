<script>
	import SocialSection from '../component/SocialSection.svelte';
	import DateListSection from '../component/DateListSection.svelte';

	let projects = [
		{
			label: '2021-Hala',
			title: 'Todoiva',
			location: 'Vue.js-Electron.js-SCSS-Node.js',
			desc: 'Todoiva yarışma amacı gütmeyen, kendi çizgisinde usulce ilerleyen basit ama şık bir to-do uygulamasıdır. İlk olarak plain javascriptle yazılmıştır fakat layout hatalarının önüne geçilememesi sebebiyle Vue.js kullanılmaya başlanacaktır.'
		},
		{
			label: '2022-Hala',
			title: 'mekayalar.com',
			location: 'Javascript-Svelte-SCSS-HTML',
			desc: 'Şu an üzerinde gezdiğiniz sitenin ta kendisi. Aşırı hızlı ve günümüzün teknolojik yaklaşımı incelenerek hazırlandı.'
		},
		{
			label: '2019-2022',
			title: 'InstagramUnfollower',
			location: 'Python',
			desc: 'Normalde Instagram uygulamasının kendi kullandığı end-pointler üzerinden çalışan bir uygulama olacakken, end-pointlerin değişimi sonucu köşeye kaldırdığım bir projeydi fakat düzgün çalışmasa da bir unoffical api ile projeyi ayağı kaldırdım. Arayüzü geliştirmek için Qt5 kullandım. '
		},
		{
			label: '2022',
			title: 'PHPSecureLogin',
			location: 'PHP',
			desc: 'PDO, Redis, JWT, hCaptcha, Google Authenticator gibi teknolojilerin ve servislerin üzerine kurulmuş bir güvenli giriş/üyelik sistemi.'
		},
		{
			label: '2022',
			title: 'CalypsoCore',
			location: 'Discord.js-MongoDB',
			desc: 'Eski bir botu yeniden kullanılabilmesi adına temellerine indirdiğim bir proje. Bu temeller sayesinde çok daha hızlı bir şekilde discord botu geliştirme imkanı sağlıyor.'
		},
		{
			label: '2022',
			title: 'SQLite Helper',
			location: 'Python',
			desc: 'Nesne tabanlı programlama dersimden aldığım proje ödevi, Oluşturduğum Python sınıfı sayesinde SQLite CRUD işlemlerinizi terminal üzerinden basit bir arayüzle gerçekleştirebiliyorsunuz.'
		},
		{
			label: '2018',
			title: 'Meido',
			location: 'PHP-JavaScript',
			desc: 'Meido, en başta Facebook uygulamasındaki gizli gruplar içerisinde paylaşılan fotoğrafları ve videoları indirebilmek amacıyla gerçekleştirilmiş bir projedir. Proje ilerledikçe sadece Facebook platform’u üzerinden değil, Instagram, Izlesene gibi platformları da desteklemiştir. Proje PHP ile geliştirilmiş olup, uzak siteden verileri işleyerek kullanıcılara medyalara kolay bir şekilde indirme imkanı sunmuştur. Ne yazık ki platformların sık sık güncellenmesi sonucu oluşan değişiklikler projenin devamlılığına çapa vurdu. Zaten hali hazırda az kullanıcıya erişmesi nedeniyle projeyi devam ettirmeme kararı aldım.'
		},
		{
			label: '2018',
			title: 'EK.Ask Me',
			location: 'PHP-JavaScript',
			desc: 'Bu yazılımda ilk defa PDO kullandım, yazılım üzerinde hem bir tasarım değiştirme düzeneği ekledim hemde veritabanı yedekleme sistemi ekledim. Bana sorulan soruların hepsini yönetim paneli üzerinden kontrol edebiliyordum.'
		},
		{
			label: '2018',
			title: 'Mocean Cleaner',
			location: 'VB.NET/C#',
			desc: 'Mocean Cleaner, Toyota’nın Sakarya ilçesinde gerçekleştirdiği Teknik Yarışma için geliştirilmiştir. Mocean Cleaner çıkmadan önce internet üzerindeki bir forum için Mocean Personalize olarak ortaya çıkmıştır. Mocean Cleaner’in kullanıcıya sağladığı özellikler ise; Gereksiz veya Artık Dosyaları tepsit etmek ve temizlemek, (Popüler) Programların ürettiği ve kaldırılırken silmediği kayıt defteri kayıtlarını tespit etmesi ve temizlemesi, Gereksiz RAM Kullanımını azaltmak ve kullanıcının performansının sürekliliğini sağlamak, Kullanıcıya yaptığı tarama/temizlik üzerine istatistik sunmak ve uygulamanın kullanıldığı cihaza faydalarını göstermekti. Programın kullanıcı arabirim bileşenleri VisualBasic.NET ile Program içerisinde kullanılan sınıflar C# ile geliştirilmiştir.'
		},
		{
			label: '2017',
			title: 'ViaBot',
			location: 'VB.NET veya C#',
			desc: "İlk oluşturulduğunda facebook hesabı yönetmek için kullanılan fakat ilerleyen versiyonlarda Instagram hesabı yönetmek adına geliştirilen proje. Facebook hesap yönetmek için geliştirdiğim zamanlarda browserView üzerinden işlemleri gerçekleştiriyordum. Instagram hesabı yönetmek için geliştirdiğim zamanda ise unoffical bir instagram api'nı nuget paket yöneticisi üzerinden indirip yazılımı geliştirmiştim."
		},
		{
			label: '2017',
			title: 'Mocean Personalize',
			location: 'VB.NET veya C#',
			desc: 'Bir forum için geliştirilmiş, kullanılan bilgisayarın performans artışını hedefleyen basit bir temizlik uygulaması. Yazılım üzerinden web sayfası engelleyebiliyordunuz ekstra olarak belli reklam veren sitelerin hazır listelerini direkt olarak engelleyip reklamları eklenti kullanmadan engelleyebiliyordunuz. Ayrıca kullanıcıların bilgisayarını temizleyebilmesi için birçok araç bulunuyordu. Gerek kullanıcı önbelleği olsun gerek gereksiz dosyalar olsun gerek kaldırılan bazı popüler programların artıkları olsun, bu dosyaların hepsini temizleyebiliyordunuz. Ayrıca yazılımın içerisinde bilgisayarın hızlı açılabilmesi için bir bash komut dosyası vardı. İnternet Explorer ve Firefox üzerindeki verilerinizi internet ayarları sekmesinden temizleyebiliyordunuz.'
		},
		{
			label: '2016-2017',
			title: 'Mocean Updater',
			location: 'VB.NET',
			desc: 'Geliştiricilerin windows cihazlarda uygulamaları güncellemek adına kullanabileceği güncelleme sistemiydi. Uygulamayı kişiselleştirmek için ini dosyasını düzenliyordunuz ve kendinize göre ayarlıyordunuz.'
		},
		{
			label: '2016-2017',
			title: 'Mocean Depo',
			location: 'PHP-HTML-CSS',
			desc: "Eski bir dosya yükleme scripti'ini hem tasarımsal olarak güncelleyip hemde ekstra olarak VirusTotal API'si ile yüklenen dosyaları taratıp zararlı olup olmadığını kontrol eden, Hemde indirme bağlantılarını aynı websitede 5 saniye bekletmek yerine link kısaltma servisinde 5 saniye bekletip yazılımı kullananın gelir elde etmesini sağlayan bir script yaptım."
		},
		{
			label: '2016',
			title: 'Link Kısaltma Scripti',
			location: 'PHP-HTML-CSS',
			desc: 'Veritabanları o zamanlar maliyetli olduğu için sürekli olarak dosya üreten ve dosya üzerinden 5 saniye bekletip yönlendirmeyi yapan çok basit bir bağlantı kısaltma scriptiydi.'
		}
	];
	let work = [
		{
			label: '2020-2022',
			title: 'Freelance Web Developer',
			location: 'Bionluk - Fiverr / Remote',
			desc: 'Bu iş serüvenimde tamamen yazılım odaklı çalıştım. PHP üzerinde Kendi View-Controller-Model Yapısını kurma şansım oldu. ReflectionClass ile Controller yapısını gerçekleştirdim. View için ise Twig ve OOP’den yararlandım, Sınıfları genellikle composer ile otomatik olarak yükledim. Bazı zamanlar PHP üzerine eklemeler yapmam gerekti, IMAP, REDIS gibi eklentileri kurdum. Zaten pekte uzak olmadığım SOLID, KISS prensiplerini kullandım. Kodların okunabilirliği ve geriye dönük düzenlemeler için PHPDoc’tan vazgeçmedim. Çoğu zaman işin kısalığından dolayı manuel olarak kod kontrolü gerçekleştirsemde PHPUnit Test kütüphanesini genel olarak öğrendim ve bir kaç işimde ve projelerde kullandım.'
		},
		{
			label: '2018-2019',
			title: 'IT Intern',
			location: 'Ak Gıda Sanayi ve Ticaret A.Ş / Sakarya',
			desc: 'Bir şirketin tam olarak nasıl sorunsuz bir şekilde işlemesi için gereken donanımları, çalışanların isimleriyle LDAP ağına nasıl bağlı olduklarını ve bu ağa nasıl giriş yaptıklarını, kayıtlarını nasıl oluşturduğumuzu tecrübe ettim. Bunun yanı sıra Bilgisayar Donanımlarıyla ilişkimi kuvvetlendirerek cihazların yanıtlarına göre hangi donanımın sıkıntılı olduğunu çözebilecek konuma geldim. Bir IT Çalışanının rutin olarak neleri kontrol ettiğini ve problemleri hangi prensipler ile çözdüklerini, görev yönetimini nasıl gerçekleştirdiklerini ve gelişimi nasıl takip ettiklerini öğrendim.'
		}
	];
</script>

<svelte:head>
	<title>Meriç Enes Kayalar</title>
	<meta
		name="description"
		content="Sakarya'da yaşıyorum. Alaylı bir geliştiriciyim. Bahçeyle ilgilenmeyi, kahve içmeyi ve felsefi kitaplar okumayı seviyorum. Bir şeyler üretmekten aşırı haz duyuyorum, bu yüzden yazılım geliştirme ile ilgileniyorum. "
	/>
	<meta
		property="og:description"
		content="Sakarya'da yaşıyorum. Alaylı bir geliştiriciyim. Bahçeyle ilgilenmeyi, kahve içmeyi ve felsefi kitaplar okumayı seviyorum. Bir şeyler üretmekten aşırı haz duyuyorum, bu yüzden yazılım geliştirme ile ilgileniyorum. "
	/>
	<meta
		property="twitter:description"
		content="Sakarya'da yaşıyorum. Alaylı bir geliştiriciyim. Bahçeyle ilgilenmeyi, kahve içmeyi ve felsefi kitaplar okumayı seviyorum. Bir şeyler üretmekten aşırı haz duyuyorum, bu yüzden yazılım geliştirme ile ilgileniyorum. "
	/>
</svelte:head>

<section>
	<h1>Merhaba, Ben Meriç 🖖🏻</h1>
	<p>
		Sakarya'da yaşıyorum. Alaylı bir geliştiriciyim. Bahçeyle ilgilenmeyi, kahve içmeyi ve felsefi
		kitaplar okumayı seviyorum. Bir şeyler üretmekten aşırı haz duyuyorum, bu yüzden yazılım
		geliştirme ile ilgileniyorum.
	</p>
</section>
<SocialSection />
<DateListSection dateList={projects}>
	<h2 slot="title">Proje Deneyimlerim</h2>
</DateListSection>
<DateListSection dateList={work}>
	<h2 slot="title">İş Deneyimlerim</h2>
</DateListSection>

<style lang="scss">
	section {
		p {
			margin-top: 10px;
			color: var(--light-color);
			margin-bottom: 1.3em;
			font-size: 1.1em;
		}
		h1 {
			font-size: 1.4em;
			font-weight: 800;
		}
	}
</style>
