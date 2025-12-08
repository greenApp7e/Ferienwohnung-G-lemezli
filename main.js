// Firebase Compat Implementation for file:// support
// Note: We assume firebase-app-compat.js and firebase-firestore-compat.js are loaded in index.html

// --- TRANSLATIONS (Inlined to avoid Import errors) ---
const translations = {
    de: {
        nav_home: "Start",
        nav_apartments: "Wohnungen",
        nav_gallery: "Galerie",
        nav_amenities: "Ausstattung",
        nav_reviews: "Bewertungen",
        nav_location: "Lage",
        nav_book: "Buchen",
        hero_title: "Willkommen in der <br> Wohlfühlhome Gölemezli",
        hero_subtitle: "Ihr modernes Zuhause in Weißenburg. Entspannen Sie in stilvollem Ambiente.",
        hero_cta: "Jetzt Aufenthalt anfragen",
        apt_title: "Unsere Wohnungen",
        apt_subtitle: "Wählen Sie Ihr perfektes Urlaubsdomizil in der Nördlinger Straße.",
        apt15_meta: "1. Obergeschoss • 98 m² • Bis zu 3 Personen",
        apt15_desc1: "Herzlich Willkommen in unserer gemütlich eingerichteten Wohlfühlhome. Genießen Sie Ihren Aufenthalt in unserem schönen Weißenburg. Unsere großzügig geschnittene und neu renovierte Wohnung im 1. OG bietet auf 98 m² viel Platz für Entfaltung.",
        apt15_desc2: "Die Wohnung verfügt über <strong>2 separate Schlafräume</strong>, ein geräumiges Wohnzimmer mit <strong>Kamin</strong> für gemütliche Abende sowie einen <strong>Balkon</strong>.",
        feat_kitchen: "Komplett ausgestattete Küche (Backofen, Mikrowelle)",
        feat_bath: "Bad mit Fenster & separates WC",
        feat_tech: "WLAN, Smart-TV & Waschmaschine",
        feat_pets: "Haustiere erlaubt",
        apt13_meta: "Gemütlich & Zentral",
        apt13_desc: "Unsere Wohnung in der Nördlinger Str. 13 wird derzeit für Sie fertiggestellt. Sie erwartet der gleiche hohe Standard und Komfort, den Sie von uns gewohnt sind. Zentral gelegen und mit allem ausgestattet, was Sie für einen entspannten Aufenthalt benötigen.",
        apt13_placeholder: "Wohnung 13 (Bilder folgen)",
        amenities_title: "Ausstattung & Komfort",
        amenities_subtitle: "Es soll Ihnen an nichts fehlen.",
        am_fireplace: "Kamin / Kachelofen",
        am_balcony: "Balkon / Terrasse",
        am_kitchen: "Volle Küche (Separat)",
        am_wifi: "WLAN & Internet-TV",
        am_washer: "Waschmaschine",
        am_bath: "Bad + Sep. WC",
        am_parking: "Parkplatz",
        am_pets: "Haustiere erlaubt",
        gallery_title: "Galerie",
        gallery_subtitle: "Einblicke in Ihr Urlaubsdomizil.",
        reviews_title: "Das sagen unsere Gäste",
        reviews_summary: "\"Sehr netter Kontakt und unkomplizierte Abwicklung. Die Wohnung hat alles was man braucht.\"",
        review1_text: "\"Ein sehr gut geführter und mega freundlicher Familienbetrieb. Ausgezeichnete Ausstattung der sauberen und modernen Zimmer. Sehr nette und entspannte Atmosphäre, die Lage liegt hervorragend.\"",
        review2_text: "\"Sehr schöne Wohnung modern sauber. Vermieter sehr sehr nett und hilfsbereit. Gerne wieder.\"",
        review3_text: "\"Große, schön eingerichtete Wohnung mit allem, was man für ein erholsames Wochenende in Weißenburg braucht. Vielen Dank für eure Gastfreundschaft 🤗 wir kommen gerne wieder.\"",
        review4_text: "\"Wir waren vom 26.11.-01.12.24 bei Familie Gölemezli. Tolle Wohnung und nette Gastgeber. Wir haben uns sehr wohl gefühlt.\"",
        review5_text: "\"Eine schöne, großzügige und ruhige Ferienwohnung bei sehr angenehmen Gastgebern. Wir können die Wohlfühlhome und die Familie Gölemezli bestens empfehlen.\"",
        location_title: "Lage & Umgebung",
        location_subtitle: "Weißenburg in Bayern entdecken.",
        loc_info_title: "Historisches Flair & Moderne",
        loc_info_desc: "Unsere Wohnung liegt direkt in der Nördlinger Straße, nur wenige Schritte von der historischen Altstadt entfernt.",
        loc_sights_title: "Sehenswürdigkeiten",
        sight1_title: "Römermuseum & Limes-Infozentrum:",
        sight1_desc: "Tauchen Sie ein in die römische Geschichte.",
        sight2_title: "Ellinger Tor:",
        sight2_desc: "Eines der schönsten Stadttore Bayerns.",
        sight3_title: "Wülzburg:",
        sight3_desc: "Imposante Festung mit tollem Ausblick.",
        loc_shopping_title: "Einkaufen & Genuss",
        loc_shopping_desc: "Direkt in der Umgebung finden Sie zahlreiche Einkaufsmöglichkeiten, Cafés und Restaurants. Supermärkte für den täglichen Bedarf sind ebenfalls schnell erreichbar.",
        booking_title: "Verfügbarkeit & Buchung",
        booking_subtitle: "Wählen Sie Ihren Reisezeitraum.",
        legend_free: "Frei",
        legend_booked: "Belegt",
        legend_selected: "Ihre Auswahl",
        booking_summary_title: "Ihre Buchung",
        label_apartment: "Wohnung wählen:",
        label_guests: "Personen:",
        label_checkin: "Check-in",
        label_checkout: "Check-out",
        msg_select_dates: "Wählen Sie Reisedaten für die Preisberechnung",
        label_total: "Gesamt",
        btn_book_now: "Jetzt buchen",
        booking_note: "45€ pro Person / Nacht.<br>Zahlung per Überweisung.",
        modal_title: "Buchung abschließen",
        modal_subtitle: "Bitte geben Sie Ihre Daten ein, um die Reservierungsanfrage zu senden.",
        label_name: "Name",
        label_email: "E-Mail",
        label_phone: "Telefon",
        success_title: "Vielen Dank!",
        success_msg: "Ihre Anfrage wurde gesendet. Wir melden uns in Kürze bei Ihnen.",
        btn_submit_request: "Jetzt unverbindlich anfragen",
        disclaimer: "Hinweis: Ihre Anfrage ist zunächst unverbindlich. Wir melden uns danach bei Ihnen.",
        footer_copyright: "&copy; 2024 Wohlfühlhome Gölemezli. Alle Rechte vorbehalten.",
        footer_impressum: "Impressum",
        footer_privacy: "Datenschutz"
    },
    en: {
        nav_home: "Home",
        nav_apartments: "Apartments",
        nav_gallery: "Gallery",
        nav_amenities: "Amenities",
        nav_reviews: "Reviews",
        nav_location: "Location",
        nav_book: "Book Now",
        hero_title: "Welcome to <br> Wohlfühlhome Gölemezli",
        hero_subtitle: "Your modern home in Weißenburg. Relax in a stylish ambiance.",
        hero_cta: "Request Stay Now",
        apt_title: "Our Apartments",
        apt_subtitle: "Choose your perfect holiday home on Nördlinger Straße.",
        apt15_meta: "1st Floor • 98 m² • Up to 3 Persons",
        apt15_desc1: "Welcome to our comfortably furnished holiday apartment. Enjoy your stay in beautiful Weißenburg. Our spacious and newly renovated apartment on the 1st floor offers 98 m² of space to relax.",
        apt15_desc2: "The apartment features <strong>2 separate bedrooms</strong>, a spacious living room with a <strong>fireplace</strong> for cozy evenings, and a <strong>balcony</strong>.",
        feat_kitchen: "Fully equipped kitchen (Oven, Microwave)",
        feat_bath: "Bathroom with window & separate WC",
        feat_tech: "WiFi, Smart TV & Washing Machine",
        feat_pets: "Pets allowed",
        apt13_meta: "Cozy & Central",
        apt13_desc: "Our apartment at Nördlinger Str. 13 is currently being finished for you. Expect the same high standard and comfort you comprise from us. Centrally located and equipped with everything you need for a relaxing stay.",
        apt13_placeholder: "Apartment 13 (Pictures coming soon)",
        amenities_title: "Amenities & Comfort",
        amenities_subtitle: "You shouldn't miss anything.",
        am_fireplace: "Fireplace / Stove",
        am_balcony: "Balcony / Terrace",
        am_kitchen: "Full Kitchen (Separate)",
        am_wifi: "WiFi & Internet TV",
        am_washer: "Washing Machine",
        am_bath: "Bath + Sep. WC",
        am_parking: "Parking",
        am_pets: "Pets allowed",
        gallery_title: "Gallery",
        gallery_subtitle: "Insights into your holiday home.",
        reviews_title: "Guest Reviews",
        reviews_summary: "\"Very nice contact and uncomplicated processing. The apartment has everything you need.\"",
        review1_text: "\"A very well-run and mega friendly family business. Excellent equipment of the clean and modern rooms. Very nice and relaxed atmosphere, the location is excellent.\"",
        review2_text: "\"Very beautiful apartment, modern and clean. Landlord very very nice and helpful. Gladly again.\"",
        review3_text: "\"Large, beautifully furnished apartment with everything you need for a relaxing weekend in Weißenburg. Thank you for your hospitality 🤗 we will gladly come back.\"",
        review4_text: "\"We stayed with the Gölemezli family from 26.11.-01.12.24. Great apartment and nice hosts. We felt very comfortable.\"",
        review5_text: "\"A beautiful, spacious and quiet holiday apartment with very pleasant hosts. We can highly recommend the holiday apartment and the Gölemezli family.\"",
        location_title: "Location & Surroundings",
        location_subtitle: "Discover Weißenburg in Bavaria.",
        loc_info_title: "Historic Flair & Modernity",
        loc_info_desc: "Our apartment is located directly on Nördlinger Straße, just a few steps from the historic old town.",
        loc_sights_title: "Sights",
        sight1_title: "Roman Museum & Limes Info Center:",
        sight1_desc: "Immerse yourself in Roman history.",
        sight2_title: "Ellinger Tor:",
        sight2_desc: "One of the most beautiful city gates in Bavaria.",
        sight3_title: "Wülzburg:",
        sight3_desc: "Imposing fortress with a great view.",
        loc_shopping_title: "Shopping & Dining",
        loc_shopping_desc: "Directly in the vicinity you will find numerous shopping opportunities, cafes, and restaurants. Supermarkets for daily needs are also quickly accessible.",
        booking_title: "Availability & Booking",
        booking_subtitle: "Choose your travel dates.",
        legend_free: "Free",
        legend_booked: "Occupied",
        legend_selected: "Your Selection",
        booking_summary_title: "Your Booking",
        label_apartment: "Choose Apartment:",
        label_guests: "Guests:",
        label_checkin: "Check-in",
        label_checkout: "Check-out",
        msg_select_dates: "Select travel dates for price calculation",
        label_total: "Total",
        btn_book_now: "Book Now",
        booking_note: "45€ per person / night.<br>Payment via bank transfer.",
        modal_title: "Complete Booking",
        modal_subtitle: "Please enter your details to send the reservation request.",
        label_name: "Name",
        label_email: "E-Mail",
        label_phone: "Phone",
        success_title: "Thank You!",
        success_msg: "Your request has been sent. We will get back to you shortly.",
        btn_submit_request: "Send non-binding request",
        disclaimer: "Note: Your request is initially non-binding. We will contact you afterwards.",
        footer_copyright: "&copy; 2024 Ferienwohnung Gölemezli. All rights reserved.",
        footer_impressum: "Imprint",
        footer_privacy: "Privacy Policy",
        msg_range_occupied: "The selected period contains occupied days.",
        msg_price_calc_prefix: "Nights x",
        msg_price_calc_middle: "Pers. x",
        booking_ref_prefix: "Apt",
        btn_processing: "Processing...",
        btn_pay_booking: "Book with obligation to pay",
        error_transfer: "There was an error transmitting. Please check your connection.",
        error_load: "Error loading bookings:",
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    },
    tr: {
        nav_home: "Anasayfa",
        nav_apartments: "Daireler",
        nav_gallery: "Galeri",
        nav_amenities: "Olanaklar",
        nav_reviews: "Yorumlar",
        nav_location: "Konum",
        nav_book: "Rezervasyon",
        hero_title: "Wohlfühlhome Gölemezli'ye <br> Hoşgeldiniz",
        hero_subtitle: "Weißenburg'daki modern eviniz. Şık bir ortamda rahatlayın.",
        hero_cta: "Şimdi Yer Ayırtın",
        apt_title: "Dairelerimiz",
        apt_subtitle: "Nördlinger Straße'deki mükemmel tatil evinizi seçin.",
        apt15_meta: "1. Kat • 98 m² • 3 Kişiye Kadar",
        apt15_desc1: "Konforlu bir şekilde döşenmiş tatil dairemize hoş geldiniz. Güzel Weißenburg'da konaklamanızın tadını çıkarın. 1. kattaki geniş ve yeni yenilenmiş dairemiz, 98 m² ile rahatlamanız için bolca alan sunuyor.",
        apt15_desc2: "Dairede <strong>2 ayrı yatak odası</strong>, rahat akşamlar için <strong>şömineli</strong> geniş bir oturma odası ve <strong>balkon</strong> bulunmaktadır.",
        feat_kitchen: "Tam donanımlı mutfak (Fırın, Mikrodalga)",
        feat_bath: "Pencereli banyo & ayrı WC",
        feat_tech: "WiFi, Smart TV & Çamaşır Makinesi",
        feat_pets: "Evcil hayvan kabul edilir",
        apt13_meta: "Rahat & Merkezi",
        apt13_desc: "Nördlinger Str. 13'teki dairemiz şu anda sizin için hazırlanıyor. Bizden beklediğiniz aynı yüksek standart ve konfor sizi bekliyor. Merkezi konumda ve rahat bir konaklama için ihtiyacınız olan her şeyle donatılmış.",
        apt13_placeholder: "Daire 13 (Resimler yakında)",
        amenities_title: "Olanaklar & Konfor",
        amenities_subtitle: "Hiçbir eksiğiniz olmasın.",
        am_fireplace: "Şömine / Soba",
        am_balcony: "Balkon / Teras",
        am_kitchen: "Tam Mutfak (Ayrı)",
        am_wifi: "WiFi & İnternet TV",
        am_washer: "Çamaşır Makinesi",
        am_bath: "Banyo + Ayrı WC",
        am_parking: "Otopark",
        am_pets: "Evcil hayvanlar",
        gallery_title: "Galeri",
        gallery_subtitle: "Tatil evinizden kareler.",
        reviews_title: "Misafir Yorumları",
        reviews_summary: "\"Çok nazik iletişim ve sorunsuz işlem. Dairede ihtiyacınız olan her şey var.\"",
        review1_text: "\"Çok iyi yönetilen ve mega dost canlısı bir aile işletmesi. Temiz ve modern odaların mükemmel donanımı. Çok hoş ve rahat bir atmosfer, konumu harika.\"",
        review2_text: "\"Çok güzel daire, modern ve temiz. Ev sahibi çok çok nazik ve yardımsever. Memnuniyetle tekrar.\"",
        review3_text: "\"Weißenburg'da dinlendirici bir hafta sonu için ihtiyacınız olan her şeye sahip büyük, güzel döşenmiş daire. Misafirperverliğiniz için teşekkürler 🤗 memnuniyetle tekrar geleceğiz.\"",
        review4_text: "\"26.11.-01.12.24 tarihleri arasında Gölemezli ailesinde kaldık. Harika daire ve nazik ev sahipleri. Kendimizi çok rahat hissettik.\"",
        review5_text: "\"Çok hoş ev sahipleri ile güzel, ferah ve sessiz bir tatil dairesi. Tatil dairesini ve Gölemezli ailesini şiddetle tavsiye edebiliriz.\"",
        location_title: "Konum & Çevre",
        location_subtitle: "Bavyera'daki Weißenburg'u keşfedin.",
        loc_info_title: "Tarihi Atmosfer & Modernlik",
        loc_info_desc: "Dairemiz doğrudan Nördlinger Straße üzerinde, tarihi eski şehre sadece birkaç adım mesafededir.",
        loc_sights_title: "Gezilecek Yerler",
        sight1_title: "Roma Müzesi & Limes Merkezi:",
        sight1_desc: "Roma tarihine dalın.",
        sight2_title: "Ellinger Tor:",
        sight2_desc: "Bavyera'nın en güzel şehir kapılarından biri.",
        sight3_title: "Wülzburg:",
        sight3_desc: "Harika manzaralı etkileyici kale.",
        loc_shopping_title: "Alışveriş & Yeme İçme",
        loc_shopping_desc: "Hemen yakında çok sayıda alışveriş imkanı, kafe ve restoran bulabilirsiniz. Günlük ihtiyaçlar için süpermarketler de hızla ulaşılabilir.",
        booking_title: "Müsaitlik & Rezervasyon",
        booking_subtitle: "Seyahat tarihlerinizi seçin.",
        legend_free: "Boş",
        legend_booked: "Dolu",
        legend_selected: "Seçiminiz",
        booking_summary_title: "Rezervasyonunuz",
        label_apartment: "Daire Seçin:",
        label_guests: "Kişi Sayısı:",
        label_checkin: "Giriş",
        label_checkout: "Çıkış",
        msg_select_dates: "Fiyat hesaplaması için tarih seçin",
        label_total: "Toplam",
        btn_book_now: "Şimdi Rezervasyon Yap",
        booking_note: "Kişi başı gecelik 45€.<br>Ödeme havale ile.",
        modal_title: "Rezervasyonu Tamamla",
        modal_subtitle: "Rezervasyon isteğini göndermek için lütfen bilgilerinizi girin.",
        label_name: "İsim",
        label_email: "E-Posta",
        label_phone: "Telefon",
        success_title: "Teşekkürler!",
        success_msg: "İsteğiniz gönderildi. Kısa süre içinde size dönüş yapacağız.",
        btn_submit_request: "Bağlayıcı olmayan istek gönder",
        disclaimer: "Not: İsteğiniz başlangıçta bağlayıcı değildir. Daha sonra sizinle iletişime geçeceğiz.",
        footer_copyright: "&copy; 2024 Wohlfühlhome Gölemezli. Tüm hakları saklıdır.",
        footer_impressum: "Künye",
        footer_privacy: "Gizlilik Politikası",
        msg_range_occupied: "Seçilen dönem dolu günleri içeriyor.",
        msg_price_calc_prefix: "Gece x",
        msg_price_calc_middle: "Kişi x",
        booking_ref_prefix: "Daire",
        btn_processing: "İşleniyor...",
        btn_pay_booking: "Ücretli rezervasyon yap",
        error_transfer: "İletim sırasında bir hata oluştu. Lütfen bağlantınızı kontrol edin.",
        error_load: "Rezervasyonlar yüklenirken hata:",
        months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        weekdays: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
    },
    ru: {
        nav_home: "Главная",
        nav_apartments: "Апартаменты",
        nav_gallery: "Галерея",
        nav_amenities: "Удобства",
        nav_reviews: "Отзывы",
        nav_location: "Расположение",
        nav_book: "Бронь",
        hero_title: "Добро пожаловать в <br> Wohlfühlhome Gölemezli",
        hero_subtitle: "Ваш современный дом в Вайсенбурге. Отдыхайте в стильной обстановке.",
        hero_cta: "Запросить проживание",
        apt_title: "Наши Квартиры",
        apt_subtitle: "Выберите идеальное место для отдыха на Nördlinger Straße.",
        apt15_meta: "1-й этаж • 98 м² • До 3 человек",
        apt15_desc1: "Добро пожаловать в нашу уютно обставленную квартиру. Наслаждайтесь отдыхом в прекрасном Вайсенбурге. Наша просторная и недавно отремонтированная квартира на 2-м этаже предлагает 98 м² пространства.",
        apt15_desc2: "В квартире есть <strong>2 отдельные спальни</strong>, просторная гостиная с <strong>камином</strong> для уютных вечеров и <strong>балкон</strong>.",
        feat_kitchen: "Полностью оборудованная кухня (духовка, СВЧ)",
        feat_bath: "Ванная с окном и отдельный туалет",
        feat_tech: "Wi-Fi, Smart TV и стиральная машина",
        feat_pets: "Можно с питомцами",
        apt13_meta: "Уютно и в центре",
        apt13_desc: "Наша квартира на Nördlinger Str. 13 в настоящее время готовится. Вас ожидает тот же высокий стандарт и комфорт. Центральное расположение и всё необходимое для расслабленного отдыха.",
        apt13_placeholder: "Квартира 13 (Фото скоро)",
        amenities_title: "Удобства и Комфорт",
        amenities_subtitle: "Вам ни в чем не будет нужды.",
        am_fireplace: "Камин / Печь",
        am_balcony: "Балкон / Терраса",
        am_kitchen: "Полная кухня (Отдельно)",
        am_wifi: "Wi-Fi и Интернет ТВ",
        am_washer: "Стиральная машина",
        am_bath: "Ванная + Отд. туалет",
        am_parking: "Парковка",
        am_pets: "Питомцы разрешены",
        gallery_title: "Галерея",
        gallery_subtitle: "Взгляд на ваше место отдыха.",
        reviews_title: "Отзывы гостей",
        reviews_summary: "\"Очень приятный контакт и простое оформление. В квартире есть все необходимое.\"",
        location_title: "Расположение",
        location_subtitle: "Откройте для себя Вайсенбург в Баварии.",
        loc_info_title: "Исторический шарм и современность",
        loc_info_desc: "Наша квартира находится прямо на Nördlinger Straße, всего в нескольких шагах от исторического старого города.",
        loc_sights_title: "Достопримечательности",
        sight1_title: "Римский музей и Лимес-центр:",
        sight1_desc: "Погрузитесь в римскую историю.",
        sight2_title: "Эллингер Тор:",
        sight2_desc: "Одни из самых красивых городских ворот Баварии.",
        sight3_title: "Wülzburg:",
        sight3_desc: "Внушительная крепость с великолепным видом.",
        loc_shopping_title: "Шопинг и еда",
        loc_shopping_desc: "В непосредственной близости вы найдете множество магазинов, кафе и ресторанов. Супермаркеты также в быстрой доступности.",
        booking_title: "Наличие и Бронирование",
        booking_subtitle: "Выберите даты поездки.",
        legend_free: "Свободно",
        legend_booked: "Занято",
        legend_selected: "Ваш выбор",
        booking_summary_title: "Ваше бронирование",
        label_apartment: "Выберите квартиру:",
        label_guests: "Гостей:",
        label_checkin: "Заезд",
        label_checkout: "Выезд",
        msg_select_dates: "Выберите даты для расчета цены",
        label_total: "Итого",
        btn_book_now: "Забронировать",
        booking_note: "45€ с человека / ночь.<br>Оплата банковским переводом.",
        modal_title: "Завершить бронирование",
        modal_subtitle: "Пожалуйста, введите данные для отправки запроса.",
        label_name: "Имя",
        label_email: "E-Mail",
        label_phone: "Телефон",
        success_title: "Спасибо!",
        success_msg: "Ваш запрос отправлен. Мы свяжемся с вами в ближайшее время.",
        btn_submit_request: "Отправить запрос",
        disclaimer: "Примечание: Запрос не является обязывающим. Мы свяжемся с вами.",
        footer_copyright: "&copy; 2024 Wohlfühlhome Gölemezli. Все права защищены.",
        footer_impressum: "Импрессум",
        footer_privacy: "Конфиденциальность",
        msg_range_occupied: "Выбранный период содержит занятые дни.",
        msg_price_calc_prefix: "Ночи х",
        msg_price_calc_middle: "Чел. x",
        booking_ref_prefix: "Кв",
        btn_processing: "Обработка...",
        btn_pay_booking: "Забронировать платно",
        error_transfer: "Ошибка передачи. Пожалуйста, проверьте подключение.",
        error_load: "Ошибка загрузки:",
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    }
};

// --- APP LOGIC ---

// Firebase Compat Config
const firebaseConfig = {
    apiKey: "AIzaSyDB9AZS4_TLNwYERDqnRff0Qv-CMV0D-UQ",
    authDomain: "ferienwohnung-d31ec.firebaseapp.com",
    projectId: "ferienwohnung-d31ec",
    storageBucket: "ferienwohnung-d31ec.firebasestorage.app",
    messagingSenderId: "979312887124",
    appId: "1:979312887124:web:76ff37c6590389aa29f4c1"
};

// Initialize Firebase (Compat)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', async () => {

    /* --- INITIALIZATION & STATE (Moved up to avoid ReferenceErrors) --- */

    // Selectors
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const languageSelect = document.getElementById('languageSelect');

    const calendarGrid = document.querySelector('.calendar-grid');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    // Form Inputs
    const guestCountInput = document.getElementById('guestCount');
    const apartmentSelect = document.getElementById('apartmentSelect');
    const modal = document.getElementById('bookingModal');
    const openModalBtn = document.getElementById('openBookingModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');

    // State Variables
    const pricePerPerson = 45;
    let currentDate = new Date();
    let selectionStart = null;
    let selectionEnd = null;
    let bookedDates = []; // YYYY-MM-DD strings

    /* --- FUNCTIONS --- */

    function getDatesInRange(startDate, endDate) {
        const date = new Date(startDate.getTime());
        const dates = [];
        while (date <= endDate) {
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            dates.push(`${y}-${m}-${d}`);
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }

    function renderCalendar(date) {
        if (!calendarGrid) return;

        // Get current language dictionary
        const curLang = languageSelect ? languageSelect.value : 'de';
        const t = translations[curLang] || translations['de'];

        // Clear grid
        calendarGrid.innerHTML = '';

        const year = date.getFullYear();
        const month = date.getMonth();

        // Use translated months
        const monthNames = t.months || ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        if (currentMonthYear) {
            currentMonthYear.textContent = `${monthNames[month]} ${year}`;
        }

        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon
        const startDay = firstDay === 0 ? 6 : firstDay - 1; // 0 = Mon, ... 6 = Sun
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Use translated weekdays
        const weekdays = t.weekdays || ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

        // Headers
        weekdays.forEach(day => {
            const header = document.createElement('div');
            header.classList.add('calendar-day-header');
            header.textContent = day;
            calendarGrid.appendChild(header);
        });

        // Empty Slots
        for (let i = 0; i < startDay; i++) {
            const empty = document.createElement('div');
            calendarGrid.appendChild(empty);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day');
            dayEl.textContent = i;

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            dayEl.dataset.date = dateStr;

            if (bookedDates.includes(dateStr)) {
                dayEl.classList.add('booked');
                dayEl.title = t.legend_booked || "Belegt";
            }

            const checkDate = new Date(year, month, i);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (checkDate < today) {
                dayEl.classList.add('disabled');
            }

            dayEl.addEventListener('click', () => handleDateClick(dateStr));
            calendarGrid.appendChild(dayEl);
        }
        updateCalendarSelection();
    }

    function handleDateClick(dateStr) {
        if (bookedDates.includes(dateStr)) return;

        // Check if date is in past
        const clickedDate = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (clickedDate < today) return;

        // Translation helper
        const curLang = languageSelect ? languageSelect.value : 'de';
        const t = translations[curLang] || translations['de'];

        if (!selectionStart || (selectionStart && selectionEnd)) {
            selectionStart = dateStr;
            selectionEnd = null;
        } else {
            // Check if range is valid (no booked dates in between)
            if (new Date(dateStr) < new Date(selectionStart)) {
                selectionStart = dateStr;
                selectionEnd = null;
            } else {
                if (isRangeAvailable(selectionStart, dateStr)) {
                    selectionEnd = dateStr;
                } else {
                    alert(t.msg_range_occupied || "Der gewählte Zeitraum enthält bereits belegte Tage.");
                    selectionStart = dateStr;
                    selectionEnd = null;
                }
            }
        }
        updateCalendarSelection();
        updateBookingSummary();
    }

    function isRangeAvailable(start, end) {
        let curr = new Date(start);
        const endDate = new Date(end);
        while (curr <= endDate) {
            const d = curr.toISOString().split('T')[0];
            if (bookedDates.includes(d)) return false;
            curr.setDate(curr.getDate() + 1);
        }
        return true;
    }

    function updateCalendarSelection() {
        document.querySelectorAll('.calendar-day').forEach(el => {
            el.classList.remove('selected', 'in-range');
            const d = el.dataset.date;
            if (d === selectionStart || d === selectionEnd) {
                el.classList.add('selected');
            }
            if (selectionStart && selectionEnd) {
                if (d > selectionStart && d < selectionEnd) {
                    el.classList.add('in-range');
                }
            }
        });
    }

    function updateBookingSummary() {
        const checkinEl = document.getElementById('summaryCheckin');
        const checkoutEl = document.getElementById('summaryCheckout');
        const totalEl = document.getElementById('summaryTotal');
        const dateNote = document.getElementById('dateSelectionNote');
        const submitBtn = document.getElementById('openBookingModal');

        const curLang = languageSelect ? languageSelect.value : 'de';
        const t = translations[curLang] || translations['de'];

        if (selectionStart && selectionEnd) {
            checkinEl.textContent = selectionStart;
            checkoutEl.textContent = selectionEnd;

            const start = new Date(selectionStart);
            const end = new Date(selectionEnd);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const guests = parseInt(guestCountInput.value) || 1;
            const total = diffDays * guests * pricePerPerson;

            totalEl.textContent = `${total} €`;
            dateNote.textContent = `${diffDays} ${t.msg_price_calc_prefix || 'Nächte x'} ${guests} ${t.msg_price_calc_middle || 'Pers. x'} ${pricePerPerson} €`;

            submitBtn.disabled = false;
        } else {
            checkinEl.textContent = "-";
            checkoutEl.textContent = "-";
            totalEl.textContent = "-";
            dateNote.textContent = t.msg_select_dates || "Wählen Sie Reisedaten für die Preisberechnung";
            submitBtn.disabled = true;
        }
    }

    function changeLanguage(lang) {
        const t = translations[lang];
        const fallback = translations['en'] || translations['de'];

        if (!t) return;

        // Save selection
        localStorage.setItem('preferredLanguage', lang);

        // Update all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const newText = t[key] || fallback[key] || "";
            if (newText) {
                if (newText.includes('<')) {
                    el.innerHTML = newText;
                } else {
                    el.textContent = newText;
                }
            }
        });

        // Re-render things that depend on language (Calendar, etc.)
        renderCalendar(currentDate);
        updateBookingSummary();
    }

    async function loadBookings() {
        try {
            const querySnapshot = await db.collection("bookings").get();
            bookedDates = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if ((data.status === 'confirmed' || data.status === 'pending' || data.name === 'Admin Block') && data.checkinDateISO && data.checkoutDateISO) {
                    const start = new Date(data.checkinDateISO);
                    const end = new Date(data.checkoutDateISO);
                    bookedDates.push(...getDatesInRange(start, end));
                }
            });
            renderCalendar(currentDate);
        } catch (error) {
            console.error("Fehler beim Laden der Buchungen:", error);
            const curLang = languageSelect ? languageSelect.value : 'de';
            const t = translations[curLang] || translations['de'];
            console.log(t.error_load || "Fehler beim Laden.");
            renderCalendar(currentDate);
        }
    }

    /* --- EVENT LISTENERS --- */

    // Theme Toggle
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        body.classList.add('dark-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // Mobile Menu
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });
    }

    // Language
    const savedLang = localStorage.getItem('preferredLanguage') || 'de';
    if (languageSelect) {
        languageSelect.value = savedLang;
        languageSelect.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
        // Apply initial language
        changeLanguage(savedLang);
    }

    // Calendar Navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
        });
    }

    // Inputs
    if (guestCountInput) {
        guestCountInput.addEventListener('change', updateBookingSummary);
        guestCountInput.addEventListener('input', updateBookingSummary);
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('open');
                }
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Modal Events
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            if (!selectionStart || !selectionEnd) return;
            modal.style.display = "flex";
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Form Submit
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const curLang = languageSelect ? languageSelect.value : 'de';
            const t = translations[curLang] || translations['de'];

            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = t.btn_processing || "Verarbeite...";

            const name = document.getElementById('b_name').value;
            const email = document.getElementById('b_email').value;
            const phone = document.getElementById('b_phone').value;
            const apartment = apartmentSelect.value;
            const guests = guestCountInput.value;
            const refPrefix = t.booking_ref_prefix || "Whg";
            const bookingRef = `${refPrefix}-${Date.now().toString().slice(-6)}`;

            try {
                await db.collection("bookings").add({
                    selectionStart: selectionStart,
                    selectionEnd: selectionEnd,
                    checkinDateISO: new Date(selectionStart).toISOString(),
                    checkoutDateISO: new Date(selectionEnd).toISOString(),
                    apartment: apartment,
                    guests: parseInt(guests),
                    totalPrice: document.getElementById('summaryTotal').textContent,
                    name: name,
                    email: email,
                    phone: phone,
                    bookingRef: bookingRef,
                    status: 'pending',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                alert(`${t.success_title || 'Vielen Dank!'} \n${t.success_msg || 'Ihre Anfrage wurde gesendet.'}\nRef: ${bookingRef}`);
                modal.style.display = "none";
                bookingForm.reset();
                selectionStart = null;
                selectionEnd = null;
                updateCalendarSelection();
                updateBookingSummary();

            } catch (error) {
                console.error("Error adding booking: ", error);
                alert(t.error_transfer || "Es gab einen Fehler bei der Übertragung.");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                loadBookings();
            }
        });
    }

    /* --- Lightbox Logic --- */
    if (!document.getElementById('lightbox')) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';

        const close = document.createElement('span');
        close.className = 'lightbox-close';
        close.innerHTML = '&times;';

        const img = document.createElement('img');
        img.className = 'lightbox-content';
        img.id = 'lightbox-img';

        lightbox.appendChild(close);
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);

        const galleryImages = document.querySelectorAll('.gallery-grid img');
        galleryImages.forEach(image => {
            image.style.cursor = 'pointer';
            image.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                img.src = image.src;
                lightbox.classList.add('active');
            });
        });

        close.addEventListener('click', () => {
            lightbox.style.display = 'none';
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                lightbox.classList.remove('active');
            }
        });
    }

    // Initial Data Load
    await loadBookings();

});
