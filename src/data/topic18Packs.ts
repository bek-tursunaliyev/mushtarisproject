import type { TopicPack } from '../types/quiz';

export const TOPIC_18_PACKS: TopicPack[] = [
  {
    id: 'hokimiyatlar-bolinishi',
    topicNumber: 18,
    title: 'Hokimiyatlar bo‘linishi prinsipi',
    subtitle: '18-Mavzu · Qonun chiqaruvchi, ijro etuvchi va sud hokimiyati muvozanati',
    description:
      'Qonun chiqaruvchi, ijro etuvchi va sud hokimiyatining o‘zaro hamkorligi hamda bir-birini tiyib turish (Checks & Balances) mexanizmlari bo‘yicha 10 ta mantiqiy-tahliliy kazus va savol.',
    questions: [
      {
        id: 1,
        category: 'Qonun chiqaruvchi · Ijro',
        title: 'Prezident vetosi va malakali ko‘pchilik',
        prompt:
          'Parlament qonunni oddiy ko‘pchilik ovoz bilan qabul qildi, biroq davlat rahbari (ijro etuvchi hokimiyat) unga veto qo‘yib qaytardi. Qonunni qabul qilishga 51% ovoz yetgan bo‘lsa, nega vetoni yengib o‘tish uchun ko‘pchilik davlatlarda aynan malakali ko‘pchilik (masalan, 2/3 qism) ovoz talab qilinadi?',
        options: [
          'Parlament ishini ataylab sekinlashtirish va qonun sonini kamaytirish uchun',
          'Bir tarmoqning tasodifiy ustunligini cheklab, kengroq siyosiy konsensusni majburiy qilish uchun',
          'Ijro etuvchi hokimiyat parlamentdan har doim yuqori turishini ko‘rsatish uchun',
          'Sud hokimiyatiga qo‘shimcha ish yuklamaslik uchun',
        ],
        correctIndex: 1,
        hint: 'Agar vetoni yana 51% bilan bekor qilish mumkin bo‘lganida, veto huquqi amalda ma’nosini yo‘qotgan bo‘larmidi?',
        explanation:
          'Agar oddiy ko‘pchilik (51%) vetoni bekor qila olganida, veto shunchaki rasmiyatchilikka aylanardi. 2/3 (malakali ko‘pchilik) talabi qonun chiqaruvchi va ijro etuvchi hokimiyat o‘rtasida jiddiy muloqot va keng kelishuvni ta’minlaydi — bu tiyib turish mexanizmining asosiy tayanchidir.',
      },
      {
        id: 2,
        category: 'Sud nazorati',
        title: 'Konstitutsiyaga zid qonun kazusi',
        prompt:
          'Tasavvur qiling, xalq saylagan Parlament ko‘pchilik ovoz bilan fuqarolarning asosiy huquqlaridan birini cheklovchi qonun qabul qildi va Prezident uni imzoladi. Shunga qaramay, Konstitutsiyaviy sud bu qonunni haqiqiy emas deb topdi. Nima uchun saylanmagan sudyalar saylangan parlament qarorini bekor qila oladi?',
        options: [
          'Sudyalar parlament deputatlaridan ko‘ra yuqori lavozimli mansabdor bo‘lgani uchun',
          'Chunki demokratik tizimda “ko‘pchilik xohishi” ham Konstitutsiyadan ustun emas — sud Oliy Qomusni himoya qiladi',
          'Chunki sud hokimiyati davlatdagi yagona oliy boshqaruv organi hisoblanadi',
          'Faqat xalqaro shartnomalar talab qilgan paytdagina shunday qilinadi',
        ],
        correctIndex: 1,
        hint: 'Oddiy qonun va Konstitutsiya o‘rtasidagi yuridik iyerarxiyani eslang: xalq birinchi navbatda nimani tasdiqlagan?',
        explanation:
          'Xalqning eng oliy irodasi Konstitutsiyada mujassam. Agar parlament Konstitutsiyaga zid qonun chiqarsa, u o‘z vakolat doirasidan chetga chiqqan bo‘ladi. Konstitutsiyaviy sud esa boshqa ikki tarmoqni Konstitutsiya doirasida ushlab turuvchi posbondir.',
      },
      {
        id: 3,
        category: 'Moliyaviy muvozanat',
        title: '“Hamyon qudrati” va Davlat byudjeti',
        prompt:
          'Mamlakatda vazirliklar, maktablar va barcha ijro idoralarini bevosita Hukumat boshqaradi. Biroq yillik Davlat byudjetini tasdiqlash va ijrosini nazorat qilish huquqi qat’iy ravishda Parlament qo‘lida. Agar Hukumat byudjetni o‘zi tasdiqlaganida qanday xavf yuzaga kelardi?',
        options: [
          'Soliqlar avtomatik ravishda bekor bo‘lib ketardi',
          'Ijro etuvchi hokimiyat moliyaviy nazoratdan chiqib, cheksiz vakolat to‘plashi va parlament ta’sirini yo‘qqa chiqarishi mumkin edi',
          'Sudlar moliyaviy ishlarni ko‘ra olmay qolardi',
          'Hech qanday xavf yo‘q, aksincha davlat boshqaruvi tezlashardi',
        ],
        correctIndex: 1,
        hint: 'Huquqda “Power of the Purse” (Hamyon qudrati) deyiladi: pul kimning nazoratida bo‘lsa, hisobdorlik o‘shanga bog‘liq.',
        explanation:
          '“Hamyon qudrati” parlamentning ijro hokimiyatini tiyib turuvchi eng kuchli vositasidir. Hukumat har bir mablag‘ni qonun chiqaruvchi belgilagan yo‘nalishda sarflashga va hisobot berishga majbur bo‘lgani uchun muvozanat saqlanadi.',
      },
      {
        id: 4,
        category: 'Nazariy asos',
        title: 'Mutlaq bo‘linishmi yoki o‘zaro kesishuv?',
        prompt:
          'Sharl Lui Monteskyo g‘oyasiga tayangan ayrim talabalar “uchala hokimiyat bir-biriga umuman tegmasdan, mutlaq izolyatsiyada ishlashi kerak” deb hisoblaydi. Nima uchun uch tarmoqning mutlaq izolyatsiyasi amalda davlat mexanizmini ishdan chiqaradi?',
        options: [
          'Chunki davlat organlari uchun alohida binolar yetishmay qoladi',
          'Chunki o‘zaro nazoratsiz har bir tarmoq o‘z sohasida monopoliyaga aylanadi va davlat yagona tizim sifatida ishlay olmaydi',
          'Chunki qonunlarni faqat sud binosida yozish mumkin',
          'Chunki ijro hokimiyati qonunlarni o‘zi tasdiqlashi shart',
        ],
        correctIndex: 1,
        hint: 'Soat ichidagi uchta g‘ildirak bir-biriga ulanmasdan alohida aylansa, soat vaqtni ko‘rsatadimi?',
        explanation:
          'Hokimiyatlar bo‘linishi — devor qurish emas, balki funksiyalarni taqsimlab, o‘zaro hamkorlik va tiyib turish rishtalarini o‘rnatishdir. Tarmoqlar mustaqil, ammo biri haddan oshganda boshqalari uni qonuniy to‘xtata oladigan darajada o‘zaro bog‘langan bo‘ladi.',
      },
      {
        id: 5,
        category: 'Qonun ustuvorligi',
        title: 'Vazirlik buyrug‘i qonunga zid kelsa',
        prompt:
          'Tasavvur qiling: Parlament “Tadbirkorlarga ruxsatnoma 5 ish kunida berilsin” deb qonun chiqardi. Ammo bir vazirlik o‘z ichki buyrug‘ida “Hujjatlar 30 kunda ko‘rib chiqiladi” deb belgiladi. Hokimiyatlar bo‘linishi prinsipiga ko‘ra qaysi chora to‘g‘ri?',
        options: [
          'Vazirlik buyrug‘i ustun, chunki vazirlik soha amaliyotini yaxshiroq biladi',
          'Qonun ustun turadi; ijro organining qonunga zid hujjati sud yoki nazorat tartibida bekor qilinishi shart',
          'Tadbirkor o‘rtacha muddat — 17 kun kutishi lozim',
          'Parlament vazirlikka moslashib qonunni o‘zgartirishi kerak',
        ],
        correctIndex: 1,
        hint: 'Ijro etuvchi hokimiyat qonunni IJRO ETISH uchun hujjat chiqaradi — uni o‘zgartirish yoki bekor qilish uchun emas!',
        explanation:
          'Parlament qabul qilgan qonun oliy yuridik kuchga ega. Ijro hokimiyatining qaror va buyruqlari (qonunosti hujjatlar) faqat qonunni amalga oshirishga xizmat qiladi; aks holda ijro organi yashirincha qonun chiqaruvchiga aylanib qoladi.',
      },
      {
        id: 6,
        category: 'Sud mustaqilligi',
        title: 'Nega sudyani vazir bo‘shata olmaydi?',
        prompt:
          'Agar fuqaro biror vazirlikning noqonuniy qarori ustidan sudga shikoyat qilsa-yu, ammo o‘sha sudyani ishga olish va bo‘shatish huquqi to‘liq o‘sha vazirlik qo‘lida bo‘lsa, hokimiyatlar bo‘linishining qaysi muhim sharti buziladi?',
        options: [
          'Faqat ichki mehnat tartib-qoidalari buziladi',
          'Sud mustaqilligi va xolisligi buziladi — sud ijro hokimiyatini tiyib turuvchi organ bo‘la olmaydi',
          'Davlat byudjeti daromadi kamayib ketadi',
          'Parlament deputatlarining soni qisqaradi',
        ],
        correctIndex: 1,
        hint: '“Hech kim o‘z ishida o‘zi hakam bo‘lishi mumkin emas” (Nemo iudex in causa sua) qoidasini eslang.',
        explanation:
          'Sud davlat organlari va fuqarolar o‘rtasidagi nizolarni xolis hal qilishi uchun sudyalar ma’muriy va moliyaviy jihatdan ijro hokimiyatiga qaram bo‘lmasligi, ularning daxlsizligi Konstitutsiya bilan kafolatlanishi shart.',
      },
      {
        id: 7,
        category: 'Parlament nazorati',
        title: 'Qonun yozishdan tashqari vazifa',
        prompt:
          'Ko‘pchilik “Parlamentning yagona vazifasi — qonun qabul qilish” deb o‘ylaydi. Aslida parlament qo‘mitalari vazirlarni chaqirib hisobot eshitadi, parlament tekshiruvi o‘tkazadi va parlamentar tizimlarda hukumatga ishonchsizlik votumi bildiradi. Buning bosh maqsadi nima?',
        options: [
          'Ommaviy axborot vositalari uchun qiziqarli bahslar uyushtirish',
          'Qabul qilingan qonunlarning amalda ijro etilishini nazorat qilish va hukumatning hisobdorligini ta’minlash',
          'Vazirlarning ish jadvalini murakkablashtirish',
          'Sud hokimiyati o‘rniga jinoiy jazo tayinlash',
        ],
        correctIndex: 1,
        hint: 'Qonunni qabul qilish — birinchi qadam; uning hayotda qanday ishlayotganini tekshirish esa...',
        explanation:
          'Parlament nazorati (hisobot eshitish, deputatlik so‘rovi, parlament tekshiruvi, ishonchsizlik votumi) qonun chiqaruvchi va ijro etuvchi hokimiyat o‘rtasidagi muntazam teskari aloqa va tiyib turish mexanizmidir.',
      },
      {
        id: 8,
        category: 'O‘zaro hamkorlik',
        title: 'Nega Hukumat va Oliy sud ham qonun loyihasi kiritadi?',
        prompt:
          'Hokimiyatlar bo‘linishi prinsipiga ko‘ra qonunni Parlament qabul qiladi. Shunga qaramay, amaliyotda ko‘plab qonun loyihalarini Hukumat yoki Oliy sud ishlab chiqib parlamentga taqdim etadi. Bu holat hokimiyatlar bo‘linishini buzadimi?',
        options: [
          'Ha, bu prinsipning qo‘pol buzilishi hisoblanadi',
          'Yo‘q, bu qonunchilik tashabbusi va o‘zaro hamkorlikdir — yakuniy qabul qilish huquqi baribir Parlamentda qoladi',
          'Ha, chunki loyiha kiritgan organ uni o‘zi tasdiqlashga majbur',
          'Faqat Oliy sud loyiha kirita oladi, Hukumat kira olmaydi',
        ],
        correctIndex: 1,
        hint: 'Loyihani TAKLIF QILISH bilan uni QONUNGA AYLANTIRISH o‘rtasidagi farqni o‘ylab ko‘ring!',
        explanation:
          'Mavzuda bejiz “o‘zaro hamkorlik” deyilmagan! Hukumat va sudlar amaliyotdagi bo‘shliqlarni yaxshi bilgani uchun qonunchilik tashabbusi huquqidan foydalanadi, ammo loyihani muhokama qilish, o‘zgartirish va qabul qilish faqat Parlament vakolatida qoladi.',
      },
      {
        id: 9,
        category: 'Inqiroz muvozanati',
        title: 'Favqulodda holatda vakolatlar chegarasi',
        prompt:
          'Katta tabiiy ofat paytida ijro etuvchi hokimiyat tezkor choralar ko‘rish uchun vaqtincha kengaytirilgan vakolat so‘raydi. Demokratik huquqiy davlatda bu vakolatlar qanday mexanizm bilan cheklanadi ki, inqirozdan keyin yakka hokimlikka aylanib ketmasin?',
        options: [
          'Hech qanday muddat belgilanmaydi va parlament tarqatib yuboriladi',
          'Qat’iy vaqt chegarasi, parlament tasdig‘i va inson huquqlari bo‘yicha sud nazorati saqlab qolinadi',
          'Inqiroz vaqtida Konstitutsiya butunlay bekor qilinadi',
          'Barcha sudlarning faoliyati noma’lum muddatga to‘xtatiladi',
        ],
        correctIndex: 1,
        hint: 'Tezkor boshqaruv zarurati va hokimiyatni suiiste’mol qilish xavfi o‘rtasida qanday qonuniy to‘siq qo‘yiladi?',
        explanation:
          'Favqulodda holatda ham tiyib turish mexanizmi o‘chirilmaydi: ijro organi tezkor harakat qiladi, ammo parlament favqulodda holat muddatini tasdiqlaydi va nazorat qiladi, sudlar esa fuqarolarning poymol qilib bo‘lmaydigan huquqlarini himoya qiladi.',
      },
      {
        id: 10,
        category: 'Tizimli kazus',
        title: 'Uch ustundan biri ishlamasa nima bo‘ladi?',
        prompt:
          'Tasavvuriy davlatda uchta organ mavjud: 1) Parlament qonun chiqaradi; 2) Hukumat ularni ijro etadi; 3) Ammo sudlar barcha bahsli ishlarda doimo Hukumat foydasiga qaror chiqarishga majbur. Bu davlatda hokimiyatlar bo‘linishi amalda ishlayaptimi?',
        options: [
          'Ha, chunki uchta alohida tashkilot rasman mavjud',
          'Yo‘q, chunki mustaqil hakam (sud) bo‘lmasa, tiyib turish zanjiri uzilib, hokimiyat amalda bir qo‘lda jamlanadi',
          'Ha, agar iqtisodiy ko‘rsatkichlar yuqori bo‘lsa yetarli',
          'Faqat poytaxtdagi sudlar yaxshi ishlasa kifoya',
        ],
        correctIndex: 1,
        hint: 'O‘yin maydonida ikki jamoa bor, lekin hakam bir jamoaga bo‘ysunsa, qoidalar haqiqatda ishlaydimi?',
        explanation:
          'Hokimiyatlar bo‘linishi — shunchaki 3 ta nom yoki bino emas, balki real vakolat va mustaqillikdir. Mustaqil sud hokimiyatisiz qonun chiqaruvchi va ijro tarmoqlari o‘rtasidagi muvozanat ham, fuqaro huquqlari himoyasi ham barbod bo‘ladi.',
      },
    ],
  },
  {
    id: 'davlat-huquq-amaliyot',
    topicNumber: 18,
    title: '18-Mavzu: Qiyosiy Modellar va Amaliy Kazuslar',
    subtitle: '18-Mavzu · Prezidentlik, Parlamentar va Aralash tizimlarda muvozanat',
    description:
      'Turli davlat boshqaruvi shakllarida uchta hokimiyat tarmog‘i o‘zaro qanday tiyib turishi va hamkorlik qilishini solishtiruvchi qo‘shimcha 10 ta savol to‘plami.',
    questions: [
      {
        id: 1,
        category: 'Boshqaruv shakli',
        title: 'Prezidentlik respublikasida qat’iy bo‘linish',
        prompt:
          'Klassik prezidentlik respublikasida (masalan, AQSh modelida) bir shaxs bir vaqtning o‘zida ham vazir, ham parlament deputati bo‘la olmaydi. Nima uchun bu taqiq qo‘yilgan?',
        options: [
          'Maosh to‘lashni osonlashtirish uchun',
          'Qonun chiqaruvchi va ijro etuvchi hokimiyatlar bir shaxs qo‘lida qo‘shilib ketishining oldini olish uchun',
          'Deputatlar sonini sun’iy ko‘paytirish uchun',
          'Vazirlar majlisga kech qolmasligi uchun',
        ],
        correctIndex: 1,
        hint: 'Agar qonun yozuvchi odam o‘zi uni ijro etuvchi vazir ham bo‘lsa, u o‘zini qanday nazorat qiladi?',
        explanation:
          'Qat’iy hokimiyatlar bo‘linishida kadrlar va mandatlar ham ajratiladi: qonun chiqaruvchi ijrochining ustidan mustaqil nazorat olib borishi uchun bir shaxs ikkala tarmoqda baravar o‘tira olmaydi.',
      },
      {
        id: 2,
        category: 'Parlamentar tizim',
        title: 'Hukumat parlament oldida javobgar bo‘lsa',
        prompt:
          'Parlamentar respublikada Hukumat ko‘pincha parlamentdagi ko‘pchilik partiyadan shakllanadi. Bunday tizimda ijro va qonun chiqaruvchi o‘rtasidagi muvozanatni nima ushlab turadi?',
        options: [
          'Parlamentning hukumatga ishonchsizlik votumi va hukumatning parlamentni tarqatishni so‘rash huquqi (hamda muxolifat nazorati)',
          'Hech narsa ushlab turmaydi, parlamentar tizimda nazorat yo‘q',
          'Faqat mahalliy hokimiyatlar qarori',
          'Vazirlarning umrbod tayinlanishi',
        ],
        correctIndex: 0,
        hint: 'Bu yerda tarmoqlar hamkorligi juda kuchli, lekin har ikki tomonda “o‘zaro tarqatish/iste’fo” dastagi bor!',
        explanation:
          'Parlamentar tizimda hokimiyatlar “yumshoq” bo‘linadi: hukumat parlament ishonchisiz ishlay olmaydi, ammo siyosiy boshi berk ko‘chada yangi saylovlar e’lon qilish imkoniyati va kuchli sud nazorati muvozanatni saqlaydi.',
      },
      {
        id: 3,
        category: 'Impichment',
        title: 'Oliy mansabdorning mas’uliyati',
        prompt:
          'Ko‘pgina konstitutsiyalarda davlat rahbarini yoki oliy sudyani lavozimidan chetlatish (impichment) jarayonida ham Parlament, ham Oliy/Konstitutsiyaviy sud ishtirok etadi. Nega bu huquq faqat bitta organga berilmagan?',
        options: [
          'Hujjatlarni ikki marta tekshirish orqali vaqtni cho‘zish uchun',
          'Siyosiy ayblovlar bilan hokimiyatni osonlikcha ag‘darib yuborishning oldini olish va xolis huquqiy baho berish uchun',
          'Sudyalar ish yukini oshirish uchun',
          'Bunday jarayon hech qachon qo‘llanilmaydi',
        ],
        correctIndex: 1,
        hint: 'Agar parlament istalgan kuni oddiy ko‘pchilik bilan prezidentni ishdan bo‘shata olsa, prezident mustaqil ishlay olarmidi?',
        explanation:
          'Impichment — favqulodda tiyib turish chorasi. Unda siyosiy baho (Parlament) va yuridik xulosa (Sud) birgalikda talab etiladi, aks holda bu vosita siyosiy raqobat quroliga aylanib qolardi.',
      },
      {
        id: 4,
        category: 'Qonun ijodkorligi',
        title: 'Ikki palatali parlament (Senat va Qonunchilik palatasi)',
        prompt:
          'Parlamentning ikki palatadan iborat bo‘lishi (quyi palata va yuqori palata) qonun chiqaruvchi hokimiyatning ichki tuzilishida qanday vazifani bajaradi?',
        options: [
          'Qonunlarni shunchaki ikki marta chop etish uchun xizmat qiladi',
          'Qonun chiqaruvchi hokimiyatning o‘z ichida ham “tiyib turish” va shoshma-shosharlik bilan qonun qabul qilishning oldini olish vazifasini bajaradi',
          'Ijro hokimiyatini butunlay almashtiradi',
          'Faqat tashqi savdo bilan shug‘ullanadi',
        ],
        correctIndex: 1,
        hint: 'Tiyib turish faqat tarmoqlar O‘RTASIDA emas, tarmoqning O‘Z ICHIDA ham bo‘lishi mumkin!',
        explanation:
          'Bikamerizm (ikki palatali tizim) — qonunchilik ichidagi filtrdir. Quyi palata tezkor xalq vakilligini ta’minlasa, yuqori palata (Senat) hududiy manfaatlar va chuqur tahlil nuqtai nazaridan qonunlarni qayta elakdan o‘tkazadi.',
      },
      {
        id: 5,
        category: 'Sud tizimi',
        title: 'Ma’muriy sudlarning roli',
        prompt:
          'Fuqaro hokimiyat yoki soliq idorasining jarima qaroridan norozi bo‘lib ma’muriy sudga murojaat qildi. Bunday sudlarning alohida ishlashi hokimiyatlar bo‘linishiga qanday hissa qo‘shadi?',
        options: [
          'Davlat organlari xodimlariga imtiyoz beradi',
          'Oddiy fuqaro ijro etuvchi hokimiyat organini qonun oldida teng tomon sifatida sudga bera olishini ta’minlaydi',
          'Soliq stavkalarini o‘zi belgilaydi',
          'Parlament saylovlarini o‘tkazadi',
        ],
        correctIndex: 1,
        hint: 'Davlat organi nohaq bo‘lsa, fuqaro uni qayerda va kim orqali to‘xtatishi mumkin?',
        explanation:
          'Ma’muriy sudlar — fuqarolarning ijro etuvchi hokimiyat o‘zboshimchaligidan himoyalanish maydoni. Bu yerda vazirlik yoki hokimlik ham oddiy fuqaro bilan teng javobgar sifatida sud oldida turadi.',
      },
      {
        id: 6,
        category: 'Konstitutsiyaviy islohot',
        title: '“Boshqa tarmoq roziligi” bilan tayinlash',
        prompt:
          'Ko‘p davlatlarda Oliy sud sudyalarini yoki Markaziy bank rahbarini Prezident tavsiya qiladi, lekin Parlament (Senat) tasdiqlaydi. Bu ikki bosqichli jarayon nimani kafolatlaydi?',
        options: [
          'Nomzodning faqat bir shaxsga sodiqligini',
          'Nomzodning professional va jamoatchilik nazarida maqbul ekanini hamda tarmoqlararo kelishuvni',
          'Kadrlar tanlashni imkon qadar qiyinlashtirishni',
          'Sudyalarning parlament a’zosiga aylanishini',
        ],
        correctIndex: 1,
        hint: 'Bitta organ taklif qiladi, boshqa organ esa tekshirib tasdiqlaydi — bu “hamkorlik + filtr”.',
        explanation:
          'Tayinlash vakolatining bo‘linishi (tavsiya + tasdiqlash) muhim davlat lavozimlariga bir tomonlama, noxolis kadrlar o‘tib ketishining oldini oladi va tarmoqlar o‘rtasida ishonchni oshiradi.',
      },
      {
        id: 7,
        category: 'Prokuratura va nazorat',
        title: 'Qonun ijrosi va odil sudlov farqi',
        prompt:
          'Ba’zan odamlar tergovchi/prokuror faoliyati bilan sudya faoliyatini chalkashtirib yuboradi. Hokimiyatlar bo‘linishi nuqtai nazaridan ayblov (tergov) va hukm chiqarish (sud) nima uchun bir qo‘lda bo‘lmasligi shart?',
        options: [
          'Ish hujjatlari ko‘payib ketmasligi uchun',
          'Ayblovchi tomonning o‘zi hukm chiqarsa, aybsizlik prezumpsiyasi va xolis odil sudlov yo‘qoladi',
          'Sud binolari kichik bo‘lgani uchun',
          'Tergovchilar qonunni bilmagani uchun',
        ],
        correctIndex: 1,
        hint: 'Ayblov tomoni dalil to‘playdi, himoya tomoni e’tiroz bildiradi — ikkalasini eshitib xolis qaror beruvchi esa...',
        explanation:
          'Agar ayblovchi va hakam bir organ bo‘lsa, adolat buziladi. Sud ayblovdan ham, himoyadan ham mustaqil uchinchi kuch bo‘lib, faqat qonun va dalillar asosida hukm chiqaradi.',
      },
      {
        id: 8,
        category: 'Pretsedent va talqin',
        title: 'Sud qonunni sharhlaganda',
        prompt:
          'Parlament qabul qilgan qonun matnida ikki xil tushunish mumkin bo‘lgan noaniq jumla uchradi. Sud ishni ko‘rayotganda qonunga rasmiy talqin (sharh) beradi. Bunda sud yangi qonun yaratgan hisoblanadimi?',
        options: [
          'Ha, sud parlamentni almashtirib qo‘yadi',
          'Yo‘q, sud qonun matnidagi asl maqsad va konstitutsiyaviy prinsiplarga tayanib mavjud normani aniqlashtiradi',
          'Sud noaniq qonunni umuman qo‘llamay tashlab ketadi',
          'Sud darhol yangi soliq joriy qiladi',
        ],
        correctIndex: 1,
        hint: 'Qonun yaratish bilan mavjud qonunni aniq vaziyatga tatbiq etish va sharhlash o‘rtasida farq bor.',
        explanation:
          'Parlament umumiy qoidalarni yaratadi, sud esa ularni aniq hayotiy nizolarga nisbatan konstitutsiyaviy mantiq asosida sharhlab qo‘llaydi. Agar parlament sud talqiniga qo‘shilmasa, qonunga aniqroq tuzatish kiritishi mumkin.',
      },
      {
        id: 9,
        category: 'OAV va Jamoatchilik',
        title: '“To‘rtinchi hokimiyat” nimani anglatadi?',
        prompt:
          'Konstitutsiyada hokimiyat 3 ta tarmoqqa bo‘lingan bo‘lsa-da, siyosatshunoslikda erkin OAV va fuqarolik jamiyati ko‘pincha “to‘rtinchi hokimiyat” deb ataladi. Ular 3 ta tarmoq muvozanatiga qanday ta’sir ko‘rsatadi?',
        options: [
          'Qonunlarga imzo chekadi va sud hukmini bekor qiladi',
          'Tarmoqlar faoliyatidagi shaffoflikni ta’minlab, jamoatchilik nazorati orqali tiyib turish mexanizmini kuchaytiradi',
          'Vazirlar maoshini tasdiqlaydi',
          'Hech qanday ta’siri yo‘q',
        ],
        correctIndex: 1,
        hint: 'Agar jamoatchilik parlament yoki hukumat nima qilayotganini bilmasa, tiyib turish qanchalik samarali bo‘ladi?',
        explanation:
          'Erkin matbuot va jamoatchilik nazorati rasmiy davlat tarmog‘i bo‘lmasa-da, qonun chiqaruvchi, ijro etuvchi va sud faoliyatini yoritish orqali ularni ochiqlikka va qonunga rioya qilishga undaydi.',
      },
      {
        id: 10,
        category: 'Xulosa',
        title: 'Tiyib turishning bosh maqsadi',
        prompt:
          'Hokimiyatlar bo‘linishi hamda bir-birini tiyib turish mexanizmining ENG OLIY yakuniy maqsadi nima?',
        options: [
          'Davlat organlari o‘rtasida doimiy janjal va raqobat keltirib chiqarish',
          'Hokimiyat suiiste’mol qilinishining oldini olish va pirovardida inson huquq hamda erkinliklarini kafolatlash',
          'Qonunlar sonini ko‘paytirish',
          'Faqat mansabdor shaxslar sonini oshirish',
        ],
        correctIndex: 1,
        hint: 'Bu tizim davlatning o‘zi uchun o‘ylab topilganmi yoki fuqaro erkinligini himoya qilish uchunmi?',
        explanation:
          'Barcha muvozanat, veto, konstitutsiyaviy nazorat va parlament so‘rovlari bitta bosh g‘oyaga xizmat qiladi: hokimiyat bir qo‘lda jamlanib qolmasligi va har bir fuqaroning huquq-erkinliklari ishonchli himoya qilinishi!',
      },
    ],
  },
];
