import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';

const payload = window.__KELAJAK_DATA__ || {};

function appendQuery(url, key, value) {
  const [path, hash = ''] = String(url || '').split('#');
  const [base, query = ''] = path.split('?');
  const params = new URLSearchParams(query);
  params.set(key, value);
  const queryString = params.toString();
  const normalized = `${base || ''}${queryString ? `?${queryString}` : ''}`;
  return hash ? `${normalized}#${hash}` : normalized;
}

const dashboardApplicationUrl = appendQuery(payload.dashboardUrl || '/dashboard', 'tab', 'applications');
const guestApplicationUrl = appendQuery(payload.registerUrl || '/register', 'next', 'applications');

const defaultStats = [
  { value: '9 809', label: 'Hamkor tashkilotlar', tone: 'violet' },
  { value: '27 397', label: "Faol to'garak o'rinlari", tone: 'blue' },
  { value: '162 665', label: "Qiziqish bildirgan o'quvchilar", tone: 'orange' },
  { value: '60 231', label: "Haftalik dars sig'imi", tone: 'green' },
];

const defaultDirections = [
  { title: 'IT va suniy intellekt', text: 'Kod, data, robototexnika va AI loyihalar.', meta: '6 oy' },
  { title: 'Xorijiy tillar', text: 'Speaking club va sertifikatga tayyorgarlik.', meta: '4 oy' },
  { title: 'Fan olimpiadalari', text: "Aniq reja, o'qituvchi nazorati va test tahlili.", meta: 'Doimiy' },
  { title: 'Ijod va media', text: 'Dizayn, video, sahna va raqamli portfolio.', meta: '3 oy' },
];

const defaultContact = {
  storeUrl: '/contact-messages',
  phone: '+998 93 534 90 80',
  phoneRaw: '+998935349080',
  email: 'samarqandviloyatkelajakmarkazi@gmail.com',
  address: "140129, Samarqand sh. Maxmud Qoshg‘ariy, 52-uy. Mo‘ljal: Xotira maydoni",
  hours: 'Dushanba - Shanba · 09:00 - 18:00',
  mapUrl: 'https://maps.google.com/maps?q=39.655984,66.949152&ll=39.655984,66.949152&z=16',
  mapEmbedUrl: 'https://www.google.com/maps?q=39.655984,66.949152&z=16&output=embed',
};

const defaultLeadershipMembers = [
  {
    id: 'd1',
    name: 'Abdulla Xasanov',
    position: 'Maktab direktori',
    employeeInfo: "Ta'lim sifati va boshqaruv bo'yicha mas'ul.",
    workActivity: "Markaz boshqaruvi, ta'lim jarayonlari nazorati va strategik rejalashtirish bo'yicha faoliyat yuritadi.",
    imageUrl: payload.logoUrl,
  },
  {
    id: 'd2',
    name: 'Madina Karimova',
    position: "O'quv ishlari bo'yicha direktor o'rinbosari",
    employeeInfo: "Dars jarayonlari va metodika sifatini nazorat qiladi.",
    workActivity: "O'quv rejalari, ichki monitoring va o'qituvchilar metodik ishlarini muvofiqlashtiradi.",
    imageUrl: payload.logoUrl,
  },
  {
    id: 'd3',
    name: 'Jasur Norqulov',
    position: "Tashkiliy ishlar bo'yicha direktor o'rinbosari",
    employeeInfo: 'Tashkiliy jarayonlar va ichki koordinatsiyani yuritadi.',
    workActivity: "Tashkiliy ishlar, jamoa koordinatsiyasi hamda tadbirlarni rejalashtirish bilan shug'ullanadi.",
    imageUrl: payload.logoUrl,
  },
];

const defaultAnnouncements = [
  {
    id: 'a1',
    title: "Kelajak markazida yangi o'quv mavsumi boshlandi",
    body: "Yangi o'quv mavsumi uchun ro'yxatdan o'tish boshlandi. Dars jadvali va yo'nalishlar bo'yicha yangilangan ma'lumotlar admin panel orqali muntazam e'lon qilinadi.",
    publishedAt: '2026-04-21T09:00:00+05:00',
    isPinned: true,
  },
  {
    id: 'a2',
    title: "O'qituvchilar uchun ochiq seminar o'tkazildi",
    body: "Hududdagi o'qituvchilar ishtirokida tajriba almashish seminari o'tkazildi. Unda metodika, monitoring va o'quvchi bilan ishlash bo'yicha amaliy tavsiyalar berildi.",
    publishedAt: '2026-04-19T14:30:00+05:00',
    isPinned: false,
  },
];

const defaultStudentCouncilMembers = [
  {
    id: 'sc1',
    name: 'Abdullayeva Mohira',
    work: "Maktabda kitobxonlik haftaligini tashkil etdi va 120+ o'quvchini jalb qildi.",
    imageUrl: payload.heroImageUrl,
  },
  {
    id: 'sc2',
    name: 'Karimov Azizbek',
    work: "Robototexnika to'garagi uchun ichki mini-musobaqa o'tkazib, jamoalarni tayyorladi.",
    imageUrl: payload.heroImageUrl,
  },
  {
    id: 'sc3',
    name: 'Jumayeva Madina',
    work: "O'quvchilar kengashi ijtimoiy loyihasi doirasida ekologik aksiyani boshqardi.",
    imageUrl: payload.heroImageUrl,
  },
  {
    id: 'sc4',
    name: 'Nazarov Shohruh',
    work: "IT yo'nalishida yangi a'zolar uchun onboarding darsi va mentorlik sessiyalarini o'tdi.",
    imageUrl: payload.heroImageUrl,
  },
];

const defaultStudentCouncilAdvisor = {
  fullName: 'Abdullaeva Sevinch Rustamovna',
  title: 'Maslahatchi haqida',
  description:
    "O‘quvchilarning shaxsiy rivojlanishi, o‘qishdagi muvaffaqiyati va ruhiy holatini qo‘llab-quvvatlaydi. Har bir bolaning qiziqishi va qobiliyatiga mos yo‘nalish topishda yordam beradi. O‘quvchi, o‘qituvchi va ota-onalar o‘rtasida ishonchli aloqa o‘rnatadi.",
  imageUrl: payload.heroImageUrl,
};

const toneClasses = {
  violet: 'from-violet-500 to-fuchsia-500 text-violet-600 dark:text-violet-200',
  blue: 'from-blue-500 to-cyan-400 text-blue-600 dark:text-blue-200',
  orange: 'from-orange-500 to-amber-400 text-orange-600 dark:text-orange-200',
  green: 'from-emerald-500 to-teal-400 text-emerald-600 dark:text-emerald-200',
};

const I18N = {
  uz: {
    navHome: 'Asosiy sahifa',
    navClubs: "To'garaklar",
    navSchedule: 'Dars jadvali',
    navContacts: 'Kontaktlar',
    aboutMenu: 'Markaz haqida',
    aboutLeadership: 'Rahbariyat',
    aboutCouncil: "O'quvchilar kengashi",
    aboutNews: 'Yangiliklar',
    aboutUs: 'Biz haqimizda',
    langUz: "O'z",
    langRu: 'Ru',
    heroBadge: "Ta’lim bilan porloq kelajak sari",
    heroTitle: 'Kelajagingiz sari ilk qadamni bugundan boshlang',
    heroText: "Kelajak Markazi platformasi orqali o‘quvchilar va o‘qituvchilarni boshqarish, darslarni tashkil etish va natijalarni kuzatish imkoniyati yaratadi.",
    sectionNews: 'Yangiliklar',
    sectionNewsTitle: "So'nggi e'lonlardan birinchi 3 ta",
    allNews: 'Barcha yangiliklar',
    clubsLabel: "To'garaklar",
    clubsTitle: "Siz uchun mos to'garaklar",
    clubsText: "Har bir to'garak mentor, jadval va amaliy mashg'ulotlar bilan olib boriladi.",
    footerSections: "Bo'limlar",
    footerContact: 'Aloqa',
    footerQuick: 'Tezkor kirish',
    newsSearch: 'Izlash',
    filter: 'Filter',
    periodFrom: "Davr oralig'i",
    periodTo: 'Davr gacha',
    clearFilters: 'Filtrlarni tozalash',
    details: 'Batafsil',
    close: 'Yopish',
  },
  ru: {
    navHome: 'Главная',
    navClubs: 'Кружки',
    navSchedule: 'Расписание',
    navContacts: 'Контакты',
    aboutMenu: 'О центре',
    aboutLeadership: 'Руководство',
    aboutCouncil: 'Совет учащихся',
    aboutNews: 'Новости',
    aboutUs: 'О нас',
    langUz: "Уз",
    langRu: 'Ru',
    heroBadge: 'Национальная образовательная экосистема',
    heroTitle: 'Сделайте первый шаг к будущему уже сегодня',
    heroText: 'Платформа центра Kelajak позволяет управлять учащимися и преподавателями, организовывать занятия и отслеживать результаты.',
    sectionNews: 'Новости',
    sectionNewsTitle: 'Первые 3 из последних объявлений',
    allNews: 'Все новости',
    clubsLabel: 'Кружки',
    clubsTitle: 'Подходящие кружки для вас',
    clubsText: 'Каждый кружок ведется с наставником, расписанием и практическими занятиями.',
    footerSections: 'Разделы',
    footerContact: 'Контакты',
    footerQuick: 'Быстрый вход',
    newsSearch: 'Поиск',
    filter: 'Фильтр',
    periodFrom: 'Период от',
    periodTo: 'Период до',
    clearFilters: 'Сбросить фильтры',
    details: 'Подробнее',
    close: 'Закрыть',
  },
};

function t(lang, key) {
  return I18N[lang]?.[key] ?? I18N.uz[key] ?? key;
}

function getInitialTheme() {
  return 'light';
}

function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return [theme, () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))];
}

function useLanguage() {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem('kelajak-lang');
    return stored === 'ru' ? 'ru' : 'uz';
  });

  useEffect(() => {
    localStorage.setItem('kelajak-lang', lang);
  }, [lang]);

  return [lang, () => setLang((current) => (current === 'uz' ? 'ru' : 'uz'))];
}

function getRouteFromHash() {
  const route = window.location.hash.replace(/^#\/?/, '');

  if (route === 'lessonSchedule') {
    return 'schedule';
  }

  if (route === 'our-contact') {
    return 'contact';
  }

  if (route === 'leadership') {
    return 'leadership';
  }

  if (route === 'news') {
    return 'news';
  }

  if (route === 'student-council') {
    return 'student-council';
  }

  if (route === 'about-us') {
    return 'about-us';
  }

  return ['clubs', 'schedule', 'contact', 'leadership', 'news', 'student-council', 'about-us'].includes(route) ? route : 'home';
}

function useHashRoute() {
  const [route, setRoute] = useState(getRouteFromHash);

  useEffect(() => {
    const syncRoute = () => setRoute(getRouteFromHash());

    window.addEventListener('hashchange', syncRoute);

    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  return route;
}

function Button({ children, href, variant = 'primary', className = '' }) {
  const display = className.includes('hidden') ? '' : 'inline-flex';
  const base = `${display} min-h-12 items-center justify-center rounded-full px-6 text-sm font-black tracking-normal transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-violet-400/30`;
  const variants = {
    primary: 'bg-slate-950 text-white shadow-2xl shadow-violet-500/20 hover:-translate-y-1 hover:bg-violet-700 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-100',
    ghost: 'border border-slate-300/70 bg-white/55 text-slate-900 backdrop-blur-xl hover:-translate-y-1 hover:border-violet-400 hover:bg-white dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/16',
    glow: 'bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 text-white shadow-2xl shadow-cyan-500/25 hover:-translate-y-1 hover:shadow-violet-500/30',
  };

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="group relative inline-flex h-11 w-[78px] items-center rounded-xl border border-slate-200 bg-white p-1 shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-xl"
      aria-label="Rang rejimini almashtirish"
    >
      <span
        className={`absolute top-1 h-9 w-9 rounded-lg bg-gradient-to-br transition-all duration-300 ${theme === 'dark'
          ? 'translate-x-[35px] from-cyan-300 to-violet-500 shadow-lg shadow-cyan-400/25'
          : 'translate-x-0 from-amber-300 to-orange-400 shadow-lg shadow-orange-400/25'
          }`}
      />
      <span className={`relative z-10 flex-1 text-[11px] font-black transition-colors ${theme === 'light' ? 'text-slate-950' : 'text-slate-400'}`}>
        Kun
      </span>
      <span className={`relative z-10 flex-1 text-[11px] font-black transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-400'}`}>
        Tun
      </span>
    </button>
  );
}

function LanguageToggle({ lang, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/74 px-4 text-base font-bold text-slate-800 shadow-lg shadow-slate-950/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-[#3a1b78]/30 hover:shadow-xl dark:border-white/10 dark:bg-white/8 dark:text-white"
      aria-label="Til tanlash"
    >
      <span>{lang === 'uz' ? I18N.uz.langUz : I18N.ru.langUz}</span>
      <span className="text-slate-400">/</span>
      <span>{lang === 'ru' ? I18N.ru.langRu : I18N.uz.langRu}</span>
    </button>
  );
}

function Header({ route, lang, onToggleLanguage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const navItems = [
    [t(lang, 'navHome'), '#top'],
    [t(lang, 'navClubs'), '#clubs'],
    [t(lang, 'navSchedule'), '#lessonSchedule'],
    [t(lang, 'navContacts'), '#our-contact'],
  ];
  const aboutItems = [
    [t(lang, 'aboutLeadership'), '#/leadership'],
    [t(lang, 'aboutCouncil'), '#/student-council'],
    [t(lang, 'aboutNews'), '#/news'],
    [t(lang, 'aboutUs'), '#/about-us'],
  ];
  const currentHash = typeof window !== 'undefined' ? window.location.hash : '';
  const aboutIsActive = ['leadership', 'news', 'student-council', 'about-us'].includes(route) || (route === 'home' && aboutItems.some(([, href]) => currentHash === href));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-screen max-w-full border-b border-white/60 bg-white/82 text-slate-950 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/78 dark:text-white"
    >
      <div className="h-1.5 bg-gradient-to-r from-[#3a1b78] via-fuchsia-500 to-cyan-400" />
      <div className="relative mx-auto grid min-h-[104px] w-full max-w-[1508px] grid-cols-[auto_auto] items-center justify-between gap-3 px-3.5 py-3 sm:min-h-[118px] sm:px-6 xl:grid-cols-[auto_1fr_auto] xl:px-10">
        <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-300/70 to-transparent dark:via-cyan-300/30" />

        <a href="#top" className="group flex shrink-0 items-center gap-3 rounded-2xl p-1.5 transition duration-300 hover:bg-slate-950/5 dark:hover:bg-white/8">
          <span className="relative">
            <span className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-500/28 to-cyan-400/18 opacity-0 blur-lg transition duration-300 group-hover:opacity-100" />
            <img
              src={payload.navLogoUrl || payload.logoUrl}
              alt="Kelajak Markazi"
              className="relative h-20 w-20 rounded-2xl object-contain shadow-xl shadow-violet-500/15 sm:h-24 sm:w-24 lg:h-28 lg:w-28"
            />
          </span>
          <span className="hidden md:block">
            <strong className="block text-lg font-black leading-tight text-slate-950 dark:text-white">Kelajak Markazi</strong>
            <span className="mt-1 block text-xs font-black uppercase tracking-[0.18em] text-violet-700 dark:text-cyan-200">Samarqand viloyati</span>
          </span>
        </a>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((current) => !current)}
          className="fixed right-3.5 top-7 z-[70] inline-grid h-12 w-12 place-items-center rounded-2xl bg-white text-violet-700 shadow-xl shadow-violet-500/20 ring-1 ring-white/70 transition hover:-translate-y-0.5 hover:bg-cyan-50 sm:hidden"
          aria-label="Menyuni ochish"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {mobileMenuOpen ? (
              <>
                <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>

        <nav className="hidden items-center justify-self-center rounded-2xl border border-slate-200/80 bg-white/62 p-1 shadow-inner shadow-slate-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/8 xl:flex">
          {navItems.map(([label, href], index) => {
            const isActive =
              (route === 'clubs' && href === '#clubs')
              || (route === 'schedule' && href === '#lessonSchedule')
              || (route === 'contact' && href === '#our-contact')
              || (route === 'home' && index === 0);

            return (
              <a
                key={href}
                href={href}
                className={`whitespace-nowrap rounded-xl px-4 py-3 text-base font-bold tracking-normal transition-all duration-300 ${isActive
                  ? 'bg-slate-950 text-white shadow-lg shadow-violet-500/15 dark:bg-white dark:text-slate-950'
                  : 'text-slate-700 hover:bg-violet-50 hover:text-[#3a1b78] dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-cyan-100'
                  }`}
              >
                {label}
              </a>
            );
          })}

          <div className="group relative">
            <button
              type="button"
              onClick={() => setAboutMenuOpen((current) => !current)}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-base font-bold tracking-normal transition-all duration-300 ${aboutIsActive
                ? 'bg-slate-950 text-white shadow-lg shadow-violet-500/15 dark:bg-white dark:text-slate-950'
                : 'text-slate-700 hover:bg-violet-50 hover:text-[#3a1b78] dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-cyan-100'
                }`}
              aria-haspopup="menu"
              aria-label="Markaz haqida bo'limlari"
            >
              {t(lang, 'aboutMenu')}
              <span className={`text-xs transition-transform ${aboutMenuOpen ? 'rotate-180' : ''}`}>v</span>
            </button>
            <div className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 ${aboutMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100'}`}>
              <div className="min-w-[300px] rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-2xl dark:border-white/10 dark:bg-slate-900">
                {aboutItems.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setAboutMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-2xl font-bold text-slate-700 transition hover:bg-white hover:text-[#3a1b78] dark:text-slate-100 dark:hover:bg-white/10 dark:hover:text-cyan-200"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden shrink-0 items-center justify-self-end gap-2 sm:flex sm:gap-3">
          <div className="hidden sm:inline-flex">
            <LanguageToggle lang={lang} onToggle={onToggleLanguage} />
          </div>
          <a
            href={payload.isAuthenticated ? payload.dashboardUrl : payload.loginUrl}
            className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-slate-950 bg-slate-950 px-3 text-base font-bold text-white shadow-xl shadow-violet-500/18 transition hover:-translate-y-0.5 hover:bg-[#3a1b78] hover:shadow-2xl dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-100 sm:px-5 sm:text-lg"
          >
            <svg className="h-5 w-5 text-cyan-200 dark:text-violet-700" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M13 4h5a3 3 0 013 3v10a3 3 0 01-3 3h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="hidden sm:inline">{payload.isAuthenticated ? 'Profil' : 'Kirish'}</span>
            <span className="hidden text-2xl leading-none sm:inline">›</span>
          </a>
        </div>
      </div>

      <div
        className={`border-t border-slate-200/70 bg-white/96 px-4 transition-[max-height,opacity] duration-300 dark:border-white/10 dark:bg-slate-950/96 sm:hidden ${mobileMenuOpen ? 'max-h-[calc(100vh-104px)] overflow-y-auto opacity-100' : 'max-h-0 overflow-hidden opacity-0'
          }`}
      >
        <nav className="grid gap-2 py-4">
          {navItems.map(([label, href], index) => {
            const isActive =
              (route === 'clubs' && href === '#clubs')
              || (route === 'schedule' && href === '#lessonSchedule')
              || (route === 'contact' && href === '#our-contact')
              || (route === 'home' && index === 0);

            return (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-2xl px-4 py-3 text-base font-bold transition ${isActive
                  ? 'bg-slate-950 text-white'
                  : 'bg-slate-50 text-slate-700 hover:bg-violet-50 hover:text-[#3a1b78] dark:bg-white/6 dark:text-slate-200'
                  }`}
              >
                {label}
              </a>
            );
          })}

          <div className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-white/6">
            <div className="px-2 pb-1 text-sm font-black uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">
              {t(lang, 'aboutMenu')}
            </div>
            {aboutItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-white px-4 py-3 text-base font-bold text-slate-700 transition hover:bg-violet-50 hover:text-[#3a1b78] dark:bg-white/8 dark:text-slate-100 dark:hover:bg-white/14 dark:hover:text-cyan-100"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="mt-2 grid gap-2 border-t border-slate-200 pt-4 dark:border-white/10">
            <LanguageToggle lang={lang} onToggle={onToggleLanguage} />

            <a
              href={payload.isAuthenticated ? payload.dashboardUrl : payload.loginUrl}
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 text-base font-bold text-white shadow-lg shadow-violet-500/15 dark:bg-white dark:text-slate-950"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M13 4h5a3 3 0 013 3v10a3 3 0 01-3 3h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {payload.isAuthenticated ? 'Profil' : 'Kirish'}
            </a>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}

function StatCard({ stat, index }) {
  const tone = toneClasses[stat.tone] || toneClasses.violet;

  return (
    <motion.article
      initial={{ y: 18, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-panel rounded-3xl p-5"
    >
      <div className={`mb-4 h-1.5 w-16 rounded-full bg-gradient-to-r ${tone}`} />
      <strong className={`block whitespace-nowrap text-xl font-black sm:text-2xl xl:text-3xl ${tone.split(' ').slice(2).join(' ')}`}>{stat.value}</strong>
      <span className="mt-2 block text-sm font-extrabold text-slate-600 dark:text-slate-300">{stat.label}</span>
    </motion.article>
  );
}

function HeroStudentVisual({ imageUrl }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 34, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.72, ease: 'easeOut' }}
      className="relative mx-auto mt-12 max-w-[1180px]"
    >
      <div className="absolute inset-x-6 -top-8 h-28 rounded-full bg-gradient-to-r from-violet-500/30 via-cyan-400/20 to-orange-400/20 blur-3xl sm:inset-x-16 sm:h-40" />
      <motion.figure
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-slate-950 shadow-2xl shadow-violet-500/20 dark:border-white/10"
      >
        <img
          src={imageUrl}
          alt="Kelajak Markazi o'quvchisi"
          className="h-[310px] w-full object-cover sm:h-[440px] lg:h-[540px]"
          style={{ objectPosition: '62% center' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/56 via-transparent to-slate-950/12" />

        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/16 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white shadow-xl backdrop-blur sm:left-6 sm:top-6">
          Kelajak sen bilan boshlanadi
        </div>

      </motion.figure>
    </motion.div>
  );
}

function FeatureCard({ feature, index }) {
  const labels = ['01', '02', '03'];

  return (
    <motion.article
      id={index === 0 ? 'features' : undefined}
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="glass-panel group rounded-[1.6rem] p-6 transition duration-300 hover:border-violet-300/70 dark:hover:border-cyan-300/30"
    >
      <span className="mb-8 inline-grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white transition group-hover:scale-110 dark:bg-white dark:text-slate-950">
        {labels[index] || '0'}
      </span>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-600 dark:text-cyan-200">{feature.accent}</p>
      <h3 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{feature.title}</h3>
      <p className="mt-4 text-base font-semibold leading-7 text-slate-600 dark:text-slate-300">{feature.text}</p>
    </motion.article>
  );
}

function DirectionCard({ item, index }) {
  const gradients = [
    'from-violet-600 to-blue-500',
    'from-cyan-500 to-emerald-500',
    'from-orange-500 to-pink-500',
    'from-slate-900 to-violet-700',
  ];

  return (
    <motion.article
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      whileHover={{ y: -7, scale: 1.01 }}
      className="relative min-h-[230px] overflow-hidden rounded-[1.6rem] border border-white/50 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/7"
    >
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${gradients[index % gradients.length]} opacity-20 blur-xl`} />
      <span className={`relative inline-flex rounded-full bg-gradient-to-r ${gradients[index % gradients.length]} px-4 py-2 text-xs font-black text-white shadow-lg`}>
        {item.meta}
      </span>
      <h3 className="relative mt-8 text-2xl font-black text-slate-950 dark:text-white">{item.title}</h3>
      <p className="relative mt-4 text-base font-semibold leading-7 text-slate-600 dark:text-slate-300">{item.text}</p>
    </motion.article>
  );
}

function SpecialStrip({ items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <section id="special" className="mx-auto w-[calc(100%_-_28px)] max-w-[1180px] py-10">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-600 dark:text-cyan-200">Maxsus katalog</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">Ayrim toifadagi o'quvchilar uchun</h2>
        </div>
        <Button href={payload.isAuthenticated ? dashboardApplicationUrl : guestApplicationUrl} variant="ghost">Ariza boshlash</Button>
      </div>

      <div className="grid auto-cols-[minmax(250px,1fr)] grid-flow-col gap-4 overflow-x-auto pb-3 xl:grid-flow-row xl:grid-cols-5 xl:overflow-visible">
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            whileHover={{ y: -6 }}
            className="glass-panel min-h-[390px] rounded-[1.35rem] p-3"
          >
            <div className="relative aspect-[1/0.84] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900">
              <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
              <span className="absolute bottom-3 left-3 right-3 truncate rounded-full bg-slate-950/78 px-3 py-2 text-xs font-black text-white backdrop-blur">
                {item.category}
              </span>
            </div>
            <strong className="mt-4 block text-sm font-black text-violet-600 dark:text-cyan-200">{item.price}</strong>
            <h3 className="mt-2 text-xl font-black text-slate-950 dark:text-white">{item.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
              {item.description || item.address}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function getAddressPart(address, index) {
  return address?.split(',').map((part) => part.trim()).filter(Boolean)[index] || '';
}

function extractRegion(club) {
  return getAddressPart(club.address, 0) || 'Boshqa hudud';
}

function extractDistrict(club) {
  return getAddressPart(club.address, 1) || 'Boshqa tuman';
}

function getOrganizationLabel(club) {
  return club.locationName || getAddressPart(club.address, 2) || "Tashkilot ko'rsatilmagan";
}

function FilterSelect({ value, onChange, options, placeholder, compact = false }) {
  return (
    <label className="relative block">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full appearance-none border border-slate-200 bg-white px-4 pr-11 text-sm font-bold text-slate-700 shadow-sm outline-none transition focus:border-violet-300 focus:ring-4 focus:ring-violet-100 ${compact ? 'h-11 rounded-xl' : 'h-12 rounded-2xl'
          }`}
      >
        <option value="all">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">v</span>
    </label>
  );
}

function weekdayToIndex(slot) {
  const raw = String(slot?.weekday || slot?.dayLabel || '').toLowerCase().trim();
  const key = raw
    .replace(/['’`]/g, '')
    .replace(/ё/g, 'e')
    .replace(/\s+/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const map = {
    monday: 0,
    dushanba: 0,
    tuesday: 1,
    seshanba: 1,
    wednesday: 2,
    chorshanba: 2,
    thursday: 3,
    payshanba: 3,
    friday: 4,
    juma: 4,
    saturday: 5,
    shanba: 5,
    sunday: 6,
    yakshanba: 6,
  };

  return map[key] ?? null;
}

function formatMonthLabel(date) {
  return date.toLocaleDateString('uz-UZ', {
    month: 'long',
    year: 'numeric',
  }).replace(/^\p{L}/u, (char) => char.toUpperCase());
}

function buildCalendarGrid(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // monday = 0
  const gridStart = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, i) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + i);
    return day;
  });
}

function ScheduleCalendarView({ slots }) {
  const [monthCursor, setMonthCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const headers = ['DUSH', 'SESH', 'CHOR', 'PAY', 'JUM', 'SHAN', 'YAK'];
  const today = new Date();
  const monthGrid = useMemo(() => buildCalendarGrid(monthCursor), [monthCursor]);

  const slotSummary = useMemo(() => {
    const unique = new Map();
    (slots || []).forEach((slot) => {
      const idx = weekdayToIndex(slot);
      if (idx === null) {
        return;
      }
      const key = `${idx}-${slot.startTime}-${slot.endTime}`;
      if (!unique.has(key)) {
        unique.set(key, {
          idx,
          label: slot.dayLabel || headers[idx],
          time: `${slot.startTime} - ${slot.endTime}`,
        });
      }
    });
    return Array.from(unique.values()).sort((a, b) => a.idx - b.idx || a.time.localeCompare(b.time));
  }, [slots]);

  const slotsByWeekday = useMemo(() => {
    const map = new Map();
    (slots || []).forEach((slot) => {
      const idx = weekdayToIndex(slot);
      if (idx === null) {
        return;
      }
      const list = map.get(idx) || [];
      list.push(slot);
      list.sort((a, b) => String(a.startTime || '').localeCompare(String(b.startTime || '')));
      map.set(idx, list);
    });
    return map;
  }, [slots]);

  return (
    <div className="mt-4 rounded-[1.2rem] border border-slate-200 bg-white p-4 sm:p-5">
      <h5 className="text-2xl font-black text-slate-950">Dars jadvali</h5>

      {slotSummary.length ? (
        <div className="mt-4 flex flex-wrap gap-3">
          {slotSummary.slice(0, 1).map((item, index) => (
            <article key={`${item.label}-${item.time}-${index}`} className="min-w-[180px] rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3">
              <p className="truncate text-sm font-bold text-slate-400">Boshlang'ich...</p>
              <p className="mt-1 text-3xl font-black text-[#3a1b78]">{item.time}</p>
            </article>
          ))}
        </div>
      ) : null}

      <div className="mt-4 h-px bg-slate-200" />

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMonthCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
          className="inline-grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-xl font-black text-slate-500 transition hover:border-violet-300 hover:text-violet-700"
          aria-label="Oldingi oy"
        >
          ‹
        </button>
        <div className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-center text-2xl font-black text-slate-900">
          {formatMonthLabel(monthCursor)}
        </div>
        <button
          type="button"
          onClick={() => setMonthCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
          className="inline-grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-xl font-black text-slate-500 transition hover:border-violet-300 hover:text-violet-700"
          aria-label="Keyingi oy"
        >
          ›
        </button>
      </div>

      <div className="mt-3 overflow-x-auto">
        <div className="min-w-[840px] rounded-xl border border-slate-200">
          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
            {headers.map((header) => (
              <div key={header} className="px-2 py-2 text-center text-sm font-black tracking-wide text-slate-500">
                {header}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {monthGrid.map((day) => {
              const isCurrentMonth = day.getMonth() === monthCursor.getMonth();
              const dayIndex = (day.getDay() + 6) % 7;
              const daySlots = slotsByWeekday.get(dayIndex) || [];
              const isToday =
                day.getFullYear() === today.getFullYear()
                && day.getMonth() === today.getMonth()
                && day.getDate() === today.getDate();

              return (
                <div key={day.toISOString()} className={`min-h-[106px] border-r border-b border-slate-200 px-2 py-2 ${isCurrentMonth ? 'bg-white' : 'bg-slate-50/70'}`}>
                  <div className={`mb-2 text-right text-sm font-bold ${isCurrentMonth ? 'text-slate-800' : 'text-slate-400'}`}>
                    <span className={`inline-flex h-7 min-w-7 items-center justify-center rounded-lg px-1.5 ${isToday ? 'bg-blue-100 text-blue-700' : ''}`}>
                      {day.getDate()}
                    </span>
                  </div>
                  <div className="grid gap-1">
                    {daySlots.slice(0, 2).map((slot, idx) => (
                      <span key={`${slot.startTime}-${slot.endTime}-${idx}`} className="truncate rounded-md bg-blue-500 px-2 py-1 text-xs font-black text-white">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    ))}
                    {daySlots.length > 2 ? (
                      <span className="text-xs font-bold text-slate-500">+{daySlots.length - 2} ta</span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClubDetailsModal({ club, slots, onClose }) {
  if (!club) {
    return null;
  }

  const imageUrl = club.imageUrl || payload.heroImageUrl;
  const adminLessonsLink = payload.isAdmin && payload.adminLessonsUrl
    ? appendQuery(payload.adminLessonsUrl, 'program', String(club.id))
    : null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-950/30"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-grid h-11 w-11 place-items-center rounded-full bg-white/90 text-lg font-black text-slate-700 shadow-lg transition hover:bg-white"
          aria-label="Yopish"
        >
          X
        </button>

        <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[1.05fr_1fr]">
          <div className="relative min-h-[280px] bg-[#3a1b78]">
            <img src={imageUrl} alt={club.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="inline-flex rounded-full bg-white/18 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur">
                {club.category}
              </span>
              <h3 className="mt-4 text-3xl font-black text-white">{club.title}</h3>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-black text-violet-700">{club.clubType || "To'garak"}</span>
              {club.priceText ? <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-black text-orange-600">{club.priceText}</span> : null}
            </div>

            <p className="mt-6 text-base font-semibold leading-7 text-slate-600">
              {club.description || "Mazkur yo'nalish bo'yicha o'quvchilar uchun sifatli mashg'ulotlar tashkil etiladi."}
            </p>

            <dl className="mt-8 grid gap-4 text-sm font-semibold text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <dt className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Manzil</dt>
                <dd className="mt-2 text-base font-bold text-slate-900">{club.address}</dd>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <dt className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Tashkilot</dt>
                <dd className="mt-2 text-base font-bold text-slate-900">{club.locationName}</dd>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <dt className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Telefon</dt>
                  <dd className="mt-2 text-base font-bold text-slate-900">{club.phone}</dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <dt className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Yo'nalish</dt>
                  <dd className="mt-2 text-base font-bold text-slate-900">{club.category}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={club.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-6 text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-[#3a1b78]"
              >
                Xaritadan ko'rish
              </a>
              <a
                href={payload.isAuthenticated ? dashboardApplicationUrl : guestApplicationUrl}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 text-base font-black text-white transition hover:-translate-y-0.5"
              >
                Ariza qoldirish
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-white px-6 py-6 sm:px-8">
          {slots?.length ? (
            <ScheduleCalendarView slots={slots} />
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-600">
              Bu to'garak uchun dars jadvali hali kiritilmagan.
              {adminLessonsLink ? (
                <a
                  href={adminLessonsLink}
                  className="mt-3 inline-flex min-h-10 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-[#3a1b78]"
                >
                  Admin panelda jadval qo'shish
                </a>
              ) : null}
            </div>
          )}

          {adminLessonsLink && slots?.length ? (
            <div className="mt-4">
              <a
                href={adminLessonsLink}
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-violet-300 hover:text-violet-700"
              >
                Admin panelda ushbu to'garak jadvalini tahrirlash
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ClubCard({ club, onSelect }) {
  const applicationUrl = payload.isAuthenticated ? dashboardApplicationUrl : guestApplicationUrl;

  return (
    <motion.article
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      className="grid gap-4 rounded-[1.1rem] border border-slate-200 bg-white p-3 shadow-sm transition hover:border-violet-200 hover:shadow-lg hover:shadow-slate-900/8 md:grid-cols-[216px_1fr]"
    >
      <div className="overflow-hidden rounded-[0.95rem] bg-slate-100">
        <img src={club.imageUrl} alt={club.title} className="h-52 w-full object-cover md:h-full" />
      </div>

      <div className="grid min-w-0 gap-4">
        <div className="grid gap-3 xl:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <h3 className="break-words text-2xl font-black leading-tight text-slate-950 sm:text-[2rem]">{club.title}</h3>
            <p className="mt-3 text-base font-medium leading-7 text-slate-800">{club.address}</p>
            <a href={club.mapUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-base font-bold text-[#4a3298] underline-offset-4 hover:underline">
              <span className="text-slate-300">•</span>
              Xaritadan ko'rish
            </a>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-base">
              <span className="font-medium text-slate-500">Yo'nalish:</span>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              <strong className="font-black text-slate-900">{club.category}</strong>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-base">
              <span className="font-medium text-slate-500">Telefon raqam</span>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              <strong className="font-black text-slate-900">{club.phone}</strong>
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#43207f] text-white">›</span>
              <span className="truncate">{club.locationName}</span>
            </div>
            {club.description ? (
              <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-600">{club.description}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <strong className="inline-flex w-fit rounded-xl border border-violet-100 bg-white px-4 py-2 text-xl font-black text-violet-400 sm:text-2xl">
            {club.priceText}
          </strong>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={applicationUrl} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 px-4 text-sm font-bold text-orange-600 transition hover:-translate-y-0.5 hover:bg-orange-100 sm:px-5 sm:text-base">
              Ariza qoldirish
            </a>
            <button
              type="button"
              onClick={() => onSelect(club)}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#c8b8ff] px-4 text-sm font-bold text-[#43207f] transition hover:-translate-y-0.5 hover:bg-[#bbabfb] sm:px-5 sm:text-base"
            >
              Batafsil ma'lumot ›
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ClubsHeroPreview({ clubs, categories }) {
  const previewItems = clubs.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#2a1453_0%,#43207f_44%,#5a2ea8_100%)]">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-fuchsia-400/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[260px] max-w-[1536px] gap-8 px-5 py-8 lg:grid-cols-[1.05fr_0.9fr] lg:px-16 lg:py-10">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-cyan-400/95 text-[#23114f] shadow-lg shadow-cyan-400/20">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 7.5L12 4l6 3.5v9L12 20l-6-3.5v-9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9.5 11.5h5M9.5 14.5h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl">
              To'garaklar
            </h1>
          </div>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/75">
            Yo'nalishlar, hududlar va narxlarni bitta tizimda ko'rib chiqing. O'quvchi uchun mos
            to'garakni tez topish, solishtirish va ariza yuborish shu yerda jamlangan.
          </p>
        </div>

        <div className="hidden lg:flex lg:items-center lg:justify-end">
          <div className="w-full max-w-[390px] rounded-[1.7rem] border border-white/12 bg-white/8 p-3 shadow-2xl shadow-slate-950/25 backdrop-blur-xl">
            <div className="rounded-[1.3rem] border border-white/10 bg-slate-950/18 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-black text-white">Mashhur yo'nalishlar</h3>
                <span className="rounded-full bg-amber-300/18 px-2.5 py-1 text-[11px] font-black text-amber-100">Top tanlov</span>
              </div>

              <div className="mt-3 grid gap-2.5">
                {previewItems.map((club) => (
                  <div key={club.id || club.title} className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-[1.05rem] border border-white/10 bg-white/8 px-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-white">{club.title}</p>
                      <p className="mt-0.5 truncate text-[11px] font-bold text-white/65">{club.category} · {extractRegion(club)}</p>
                    </div>
                    <span className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[11px] font-black text-white">
                      {club.priceText}
                    </span>
                  </div>
                ))}

                {!previewItems.length ? (
                  <div className="rounded-2xl border border-dashed border-white/18 px-4 py-6 text-center text-sm font-bold text-white/60">
                    To'garaklar admin paneldan qo'shiladi
                  </div>
                ) : null}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {categories.slice(0, 3).map((category) => (
                  <div key={category} className="rounded-xl border border-white/10 bg-white/8 px-2.5 py-2 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100">Yo'nalish</p>
                    <p className="mt-1 text-[11px] font-black leading-4 text-white">{category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClubsPage({ clubs, schedules }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [clubType, setClubType] = useState('all');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [selectedClub, setSelectedClub] = useState(null);

  const clubSlotsMap = useMemo(() => {
    const map = new Map();
    const weekdayOrder = {
      dushanba: 1,
      seshanba: 2,
      chorshanba: 3,
      payshanba: 4,
      juma: 5,
      shanba: 6,
      yakshanba: 7,
    };

    (schedules || []).forEach((slot) => {
      const key = Number(slot.programId);
      if (!key) {
        return;
      }
      const list = map.get(key) || [];
      list.push(slot);
      map.set(key, list);
    });

    map.forEach((items, key) => {
      const sorted = [...items].sort((a, b) => {
        const dayA = weekdayOrder[(a.dayLabel || '').toLowerCase()] || 99;
        const dayB = weekdayOrder[(b.dayLabel || '').toLowerCase()] || 99;
        if (dayA !== dayB) {
          return dayA - dayB;
        }
        return String(a.startTime || '').localeCompare(String(b.startTime || ''));
      });
      map.set(key, sorted);
    });

    return map;
  }, [schedules]);

  const selectedClubSlots = selectedClub ? (clubSlotsMap.get(Number(selectedClub.id)) || []) : [];

  const categories = useMemo(() => [...new Set(clubs.map((club) => club.category).filter(Boolean))], [clubs]);
  const clubTypes = useMemo(() => [...new Set(clubs.map((club) => club.clubType).filter(Boolean))], [clubs]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return clubs.filter((club) => {
      const matchesCategory = category === 'all' || club.category === category;
      const matchesClubType = clubType === 'all' || club.clubType === clubType;
      const haystack = `${club.title} ${club.address} ${club.category} ${club.phone} ${club.locationName} ${club.clubType}`.toLowerCase();

      return matchesCategory && matchesClubType && (!needle || haystack.includes(needle));
    });
  }, [category, clubType, clubs, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const paginatedClubs = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, perPage, safePage]);

  useEffect(() => {
    setPage(1);
  }, [query, category, clubType, perPage]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pageNumbers = useMemo(() => {
    const start = Math.max(1, safePage - 2);
    const end = Math.min(totalPages, start + 4);
    const adjustedStart = Math.max(1, end - 4);

    return Array.from({ length: end - adjustedStart + 1 }, (_, index) => adjustedStart + index);
  }, [safePage, totalPages]);

  const mapEmbedUrl = payload.contact?.mapEmbedUrl || defaultContact.mapEmbedUrl;
  const mapLinkUrl = filtered[0]?.mapUrl || payload.contact?.mapUrl || defaultContact.mapUrl;

  return (
    <div className="bg-[#f4f5fb] text-slate-950">
      <ClubsHeroPreview clubs={clubs} categories={categories} />

      <section className="mx-auto grid max-w-[1536px] gap-4 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-16">
        <div className="min-w-0">
          <div className="grid gap-3 xl:grid-cols-[1.2fr_0.9fr_0.9fr]">
            <label className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
              <span className="text-2xl text-[#3a1b78]">⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-base font-semibold outline-none placeholder:text-slate-400"
                placeholder="Izlash"
              />
            </label>
            <FilterSelect value={category} onChange={setCategory} options={categories} placeholder="To'garak yo'nalishlari" compact />
            <FilterSelect value={clubType} onChange={setClubType} options={clubTypes} placeholder="To'garak turi" compact />
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap items-end gap-3">
              <h2 className="text-3xl font-black text-slate-950 sm:text-[2.2rem]">Mavjud to'garaklar</h2>
              <span className="pb-1 text-3xl font-black text-orange-500">{filtered.length}</span>
            </div>

            <div className="mt-5 inline-flex rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600">
              ⓘ To'garakni tanlang, so'ng ariza yoki batafsil ma'lumot bo'limiga o'ting
            </div>

            <div className="mt-5 grid gap-4">
              {paginatedClubs.map((club) => (
                <ClubCard key={club.id || club.title} club={club} onSelect={setSelectedClub} />
              ))}

              {!paginatedClubs.length && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center font-bold text-slate-500">
                  Bu filtr bo'yicha to'garak topilmadi.
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 xl:flex-row">
              <p className="text-sm font-bold text-slate-500">
                Topilgan to'garaklar soni: <strong className="text-slate-950">{filtered.length}</strong>
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage(1)}
                  disabled={safePage === 1}
                  className="inline-grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-400 disabled:opacity-50"
                >
                  «
                </button>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={safePage === 1}
                  className="inline-grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-400 disabled:opacity-50"
                >
                  ‹
                </button>

                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`inline-grid h-11 w-11 place-items-center rounded-xl border text-sm font-black transition ${pageNumber === safePage
                      ? 'border-orange-200 bg-white text-orange-500'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:text-violet-700'
                      }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={safePage === totalPages}
                  className="inline-grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-400 disabled:opacity-50"
                >
                  ›
                </button>
                <button
                  type="button"
                  onClick={() => setPage(totalPages)}
                  disabled={safePage === totalPages}
                  className="inline-grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-400 disabled:opacity-50"
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="grid h-fit gap-4 lg:sticky lg:top-36">
          <div className="relative h-44 overflow-hidden rounded-[1.1rem] border border-slate-200 bg-white shadow-sm">
            <iframe
              title="Kelajak Markazi xarita preview"
              src={mapEmbedUrl}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/22 via-transparent to-white/10" />
            <a href={mapLinkUrl} target="_blank" rel="noreferrer" className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-[#43207f] px-5 py-3 text-base font-bold text-white shadow-xl">
              Xaritadan ko'rish
            </a>
          </div>

          <div className="rounded-[1.1rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-black">Filtr</h2>
            <div className="mt-4 border-t border-slate-100 pt-4">
              <h3 className="mb-4 text-base font-black text-slate-900">To'garak yo'nalishlari</h3>
              <div className="grid gap-3">
                {['all', ...categories].map((item) => (
                  <label key={item} className="flex cursor-pointer items-start gap-3 text-base font-medium text-slate-700">
                    <input
                      type="radio"
                      name="club-category-sidebar"
                      checked={category === item}
                      onChange={() => setCategory(item)}
                      className="mt-1 accent-[#43207f]"
                    />
                    <span>{item === 'all' ? 'Hammasi' : item}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5">
                <FilterSelect value={clubType} onChange={setClubType} options={clubTypes} placeholder="To'garak turi" compact />
              </div>
            </div>
          </div>
        </aside>
      </section>

      <ClubDetailsModal club={selectedClub} slots={selectedClubSlots} onClose={() => setSelectedClub(null)} />
    </div>
  );
}

function normalizeText(value) {
  return (value || '').toLowerCase().replace(/[^a-z0-9\u0400-\u04FF\u0100-\u017f]+/g, ' ').trim();
}

function ScheduleProgramModal({ club, slots, onClose }) {
  if (!club) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-950/30"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-grid h-11 w-11 place-items-center rounded-full bg-white/90 text-lg font-black text-slate-700 shadow-lg transition hover:bg-white"
          aria-label="Yopish"
        >
          X
        </button>

        <div className="border-b border-slate-200 bg-[#3a1b78] px-6 py-6 text-white sm:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/14 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-100">
              Dars jadvali
            </span>
            <span className="rounded-full bg-white/14 px-4 py-2 text-xs font-black text-white/90">
              {club.category}
            </span>
          </div>
          <h3 className="mt-4 text-3xl font-black">{club.title}</h3>
          <p className="mt-2 text-sm font-semibold text-white/75">{club.locationName}</p>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6 sm:p-8">
          {slots.length ? (
            <ScheduleCalendarView slots={slots} />
          ) : (
            <div className="rounded-[1.1rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm font-bold text-slate-500">
              Bu to'garak uchun dars slotlari hali kiritilmagan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScheduleProgramCard({ item, onOpen }) {
  const applicationUrl = payload.isAuthenticated ? dashboardApplicationUrl : guestApplicationUrl;

  return (
    <motion.article
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="flex h-full flex-col rounded-[1.1rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:border-violet-200 hover:shadow-lg hover:shadow-slate-900/8"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 text-[1.15rem] font-black leading-tight text-slate-950 sm:text-[1.2rem]">{item.title}</h3>
        <span className="max-w-[52%] truncate rounded-xl border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-bold text-[#43207f]">
          {item.locationName}
        </span>
      </div>

      <p className="mt-4 line-clamp-2 text-[15px] font-medium leading-7 text-slate-800">{item.address}</p>

      <a
        href={item.mapUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-1 inline-flex items-center gap-2 text-[15px] font-bold text-[#4a3298] underline-offset-4 hover:underline"
      >
        <span className="text-slate-300">•</span>
        Xaritadan ko'rish
      </a>

      <div className="mt-3 space-y-2 text-[15px]">
        <div className="flex flex-wrap items-center gap-2 text-slate-500">
          <span className="font-medium">Yo'nalish:</span>
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <strong className="font-black text-slate-900">{item.category}</strong>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-slate-500">
          <span className="font-medium">Telefon raqam</span>
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <strong className="font-black text-slate-900">{item.phone}</strong>
        </div>
      </div>

      <div className="mt-auto pt-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#c8b8ff] px-5 text-base font-bold text-[#43207f] transition hover:-translate-y-0.5 hover:bg-[#bbabfb]"
          >
            Batafsil ma'lumot ›
          </button>
          <a href={applicationUrl} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 px-5 text-base font-bold text-orange-600 transition hover:-translate-y-0.5 hover:bg-orange-100">
            Ariza qoldirish
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function ScheduleHeroPreview({ schedules }) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#241047_0%,#3a1b78_42%,#1f4f7a_100%)]">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-cyan-400/18 blur-3xl" />
      <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-fuchsia-400/12 blur-3xl" />

      <div className="relative mx-auto min-h-[280px] max-w-[1536px] px-5 py-10 lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 text-lg font-black text-white/90">
            <span className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-cyan-400/95 text-[#23114f] shadow-lg shadow-cyan-400/20">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <span>›</span>
            <span>Dars jadvali</span>
          </div>

          <h1 className="mt-5 max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl">
            Dars jadvali
          </h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/75">
            Har bir to'garak bo'yicha dars kunlari, o'qituvchilar va mavjud slotlar bir joyda jamlangan.
            Avval yo'nalishni tanlang, keyin jadvalni batafsil ko'ring.
          </p>
        </div>
      </div>
    </section>
  );
}

function TypewriterText({ text, speed = 120, restartDelay = 5000 }) {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    let typingTimer = null;
    let restartTimer = null;
    let stopped = false;

    const startTyping = () => {
      let index = 0;
      setVisibleText('');

      typingTimer = window.setInterval(() => {
        if (stopped) {
          window.clearInterval(typingTimer);
          return;
        }

        index += 1;
        setVisibleText(text.slice(0, index));

        if (index >= text.length) {
          window.clearInterval(typingTimer);
          restartTimer = window.setTimeout(startTyping, restartDelay);
        }
      }, speed);
    };

    startTyping();

    return () => {
      stopped = true;
      if (typingTimer) window.clearInterval(typingTimer);
      if (restartTimer) window.clearTimeout(restartTimer);
    };
  }, [text, speed, restartDelay]);

  return (
    <>
      {visibleText}
      {visibleText.length < text.length ? <span className="ml-0.5 animate-pulse">|</span> : null}
    </>
  );
}

function SchedulePage({ schedules, clubs }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [clubType, setClubType] = useState('all');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const schedulePrograms = useMemo(() => {
    const grouped = new Map();

    schedules.forEach((schedule, index) => {
      const matchedClub = clubs.find((club) => {
        if (schedule.programId && club.id === schedule.programId) {
          return true;
        }

        return normalizeText(schedule.title).includes(normalizeText(club.title)) || normalizeText(club.title).includes(normalizeText(schedule.title));
      });

      if (!matchedClub) {
        return;
      }

      const key = matchedClub.id || `${matchedClub.title}-${index}`;
      const existing = grouped.get(key) || {
        ...matchedClub,
        slots: [],
      };

      existing.slots.push(schedule);
      grouped.set(key, existing);
    });

    return Array.from(grouped.values());
  }, [clubs, schedules]);

  const categories = useMemo(() => [...new Set(schedulePrograms.map((item) => item.category).filter(Boolean))], [schedulePrograms]);
  const clubTypes = useMemo(() => [...new Set(schedulePrograms.map((item) => item.clubType).filter(Boolean))], [schedulePrograms]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return schedulePrograms.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesClubType = clubType === 'all' || item.clubType === clubType;
      const haystack = `${item.title} ${item.address} ${item.category} ${item.phone} ${item.locationName} ${item.clubType}`.toLowerCase();

      return matchesCategory && matchesClubType && (!needle || haystack.includes(needle));
    });
  }, [category, clubType, query, schedulePrograms]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, perPage, safePage]);

  useEffect(() => {
    setPage(1);
  }, [query, category, clubType, perPage]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pageNumbers = useMemo(() => {
    const start = Math.max(1, safePage - 2);
    const end = Math.min(totalPages, start + 4);
    const adjustedStart = Math.max(1, end - 4);

    return Array.from({ length: end - adjustedStart + 1 }, (_, index) => adjustedStart + index);
  }, [safePage, totalPages]);

  return (
    <div className="bg-[#f4f5fb] text-slate-950">
      <ScheduleHeroPreview schedules={schedules} />

      <section className="mx-auto max-w-[1536px] px-5 py-12 lg:px-16">
        <div className="grid gap-3 xl:grid-cols-[1.2fr_repeat(2,minmax(0,1fr))]">
          <label className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
            <span className="text-2xl text-[#3a1b78]">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-base font-semibold outline-none placeholder:text-slate-400"
              placeholder="Izlash"
            />
          </label>

          <FilterSelect value={category} onChange={setCategory} options={categories} placeholder="To'garak yo'nalishlari" compact />
          <FilterSelect value={clubType} onChange={setClubType} options={clubTypes} placeholder="To'garak turi" compact />
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap items-end gap-3">
            <h2 className="text-3xl font-black text-slate-950 sm:text-[2.2rem]">Mavjud to'garaklar</h2>
            <span className="pb-1 text-3xl font-black text-orange-500">{filtered.length}</span>
          </div>

          <div className="mt-5 inline-flex rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600">
            • Dars jadvalini ko'rish uchun to'garakni tanlang
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {paginated.map((item) => (
              <ScheduleProgramCard key={item.id || item.title} item={item} onOpen={setSelectedProgram} />
            ))}

            {!paginated.length && (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center font-bold text-slate-500">
                Bu filtr bo'yicha jadvali bor to'garak topilmadi.
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 xl:flex-row">
            <p className="text-sm font-bold text-slate-500">
              Topilgan to'garaklar soni: <strong className="text-slate-950">{filtered.length}</strong>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage(1)}
                disabled={safePage === 1}
                className="inline-grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-400 disabled:opacity-50"
              >
                «
              </button>
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={safePage === 1}
                className="inline-grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-400 disabled:opacity-50"
              >
                ‹
              </button>

              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`inline-grid h-11 w-11 place-items-center rounded-xl border text-sm font-black transition ${pageNumber === safePage
                    ? 'border-orange-200 bg-white text-orange-500'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:text-violet-700'
                    }`}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={safePage === totalPages}
                className="inline-grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-400 disabled:opacity-50"
              >
                ›
              </button>
              <button
                type="button"
                onClick={() => setPage(totalPages)}
                disabled={safePage === totalPages}
                className="inline-grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-400 disabled:opacity-50"
              >
                »
              </button>

              <label className="relative ml-1 block">
                <select
                  value={perPage}
                  onChange={(event) => setPerPage(Number(event.target.value))}
                  className="h-11 appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-bold text-slate-600 shadow-sm outline-none"
                >
                  {[6, 9, 12].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">v</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      <ScheduleProgramModal club={selectedProgram} slots={selectedProgram?.slots || []} onClose={() => setSelectedProgram(null)} />
    </div>
  );
}

function ContactHeroPreview() {
  return (
    <section id="our-contact" className="relative overflow-hidden bg-[linear-gradient(135deg,#2d1459_0%,#43207f_52%,#244a9a_100%)]">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute -left-16 top-8 h-56 w-56 rounded-full bg-cyan-400/14 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-fuchsia-500/12 blur-3xl" />

      <div className="relative mx-auto max-w-[1536px] px-5 py-10 lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 text-lg font-black text-white/90">
            <span className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-cyan-400/95 text-[#23114f] shadow-lg shadow-cyan-400/20">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 5h3l2 5-2 1.5a16.2 16.2 0 004.5 4.5L14 14l5 2v3a2 2 0 01-2.2 2A17 17 0 015 7.2 2 2 0 015 5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>›</span>
            <span>Kontaktlar</span>
          </div>

          <h1 className="mt-5 max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl">
            Biz bilan bog'laning
          </h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/78">
            Savol, taklif yoki hamkorlik bo'lsa, murojaatni shu yerdan yuboring. Platforma, to'garaklar va dars jarayonlari bo'yicha jamoamiz tezkor javob beradi.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  const contact = payload.contact || defaultContact;
  const flashMessage = payload.flashMessage;

  const infoCards = [
    {
      label: 'Telefon',
      value: contact.phone,
      href: `tel:${contact.phoneRaw}`,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 5h3l2 5-2 1.5a16.2 16.2 0 004.5 4.5L14 14l5 2v3a2 2 0 01-2.2 2A17 17 0 015 7.2 2 2 0 015 5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: 'Elektron manzil',
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      label: 'Manzil',
      value: contact.address,
      href: contact.mapUrl,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 21s6-5.6 6-11a6 6 0 10-12 0c0 5.4 6 11 6 11z" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      label: 'Ish vaqti',
      value: contact.hours,
      href: null,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  const fieldClass = 'min-h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-200/40';

  return (
    <div className="bg-[#f4f5fb] text-slate-950">
      <ContactHeroPreview />

      <section className="mx-auto grid max-w-[1536px] gap-6 px-5 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:px-16">
        <div className="grid gap-4">
          {infoCards.map((item) => {
            const content = (
              <div className="grid gap-3 rounded-[1.2rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-slate-900/5 sm:rounded-[1.35rem] sm:p-5">
                <span className="inline-grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-700 sm:h-11 sm:w-11 sm:rounded-2xl">
                  {item.icon}
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-lg font-black leading-tight text-slate-950 [overflow-wrap:anywhere] sm:text-2xl">
                    {item.value}
                  </p>
                </div>
              </div>
            );

            return item.href ? (
              <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}

          <div className="overflow-hidden rounded-[1.2rem] border border-slate-200 bg-white shadow-sm sm:rounded-[1.6rem]">
            <div className="border-b border-slate-100 px-5 py-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">Xarita</p>
              <h3 className="mt-2 text-xl font-black text-slate-950 sm:text-2xl">Qabul punktiga yo'l</h3>
            </div>
            <iframe
              title="Kelajak Markazi xarita"
              src={contact.mapEmbedUrl}
              className="h-[260px] w-full sm:h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">Murojaat qoldirish</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-[2.4rem]">Savolingizni yozing, biz javob beramiz</h2>
              <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                To'garak, dars jadvali, hamkorlik yoki texnik masala bo'lsa, shu formadan yuboring.
              </p>
            </div>
          </div>

          {flashMessage ? (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-bold text-emerald-700">
              {flashMessage}
            </div>
          ) : null}

          <form method="POST" action={contact.storeUrl} className="mt-6 grid gap-4">
            <input type="hidden" name="_token" value={payload.csrfToken} />

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-black text-slate-700">Ism familiya</span>
                <input className={fieldClass} type="text" name="name" placeholder="Ismingizni kiriting" required />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-black text-slate-700">Telefon raqam</span>
                <input className={fieldClass} type="text" name="phone" placeholder="+998 90 000 00 00" required />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
              <label className="grid gap-2">
                <span className="text-sm font-black text-slate-700">Elektron pochta</span>
                <input className={fieldClass} type="email" name="email" placeholder="example@mail.uz" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-black text-slate-700">Mavzu</span>
                <input className={fieldClass} type="text" name="subject" placeholder="Qaysi masala bo'yicha?" required />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-black text-slate-700">Xabar</span>
              <textarea className={`${fieldClass} min-h-[180px] py-4`} name="message" placeholder="Murojaatingizni batafsil yozing" required />
            </label>

            <div className="flex border-t border-slate-100 pt-5 sm:justify-end">
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 px-7 text-base font-black text-white shadow-2xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/25"
              >
                Murojaat yuborish
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function EmployeeInfo({ text }) {
  const [expanded, setExpanded] = useState(false);
  const content = (text || '').trim();

  if (!content) {
    return null;
  }

  return (
    <div className="grid gap-2">
      <p
        className="text-sm font-semibold leading-6 text-slate-600 whitespace-pre-line"
        style={expanded ? undefined : {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 5,
          overflow: 'hidden',
          minHeight: '7.5rem',
        }}
      >
        {content}
      </p>
      {content.length > 220 ? (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="mx-auto w-fit rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-slate-700 transition hover:bg-slate-100"
        >
          {expanded ? 'Yopish' : 'Batafsil'}
        </button>
      ) : null}
    </div>
  );
}

function WorkActivityToggle({ text }) {
  const [expanded, setExpanded] = useState(false);
  const content = (text || '').trim();

  if (!content) {
    return null;
  }

  return (
    <div className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        className="mx-auto w-fit rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-slate-700 transition hover:bg-slate-100"
      >
        {expanded ? 'Yopish' : "Mehnat faoliyati"}
      </button>
      {expanded ? (
        <p className="text-sm font-semibold leading-6 text-slate-600 whitespace-pre-line">
          {content}
        </p>
      ) : null}
    </div>
  );
}

function LeadershipPage({ members }) {
  return (
    <div className="bg-[#f4f5fb] text-slate-950">
      <section className="relative overflow-hidden bg-[linear-gradient(130deg,#1f2e57_0%,#2f3d78_50%,#1f6a89_100%)]">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative mx-auto max-w-[1536px] px-5 py-14 lg:px-16 lg:py-16">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-100">
            Rahbariyat
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl">
            Samarqand viloyat "Kelajak" markazi boshqaruv jamoasi
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1536px] px-5 py-10 lg:px-16 lg:py-14">
        <div className="grid gap-5 justify-items-center md:grid-cols-2 xl:grid-cols-3">
          {members.map((member, index) => {
            const name = (member.name || '').trim();
            const position = (member.position || '').trim();
            const nameLower = name.toLowerCase();
            const positionLower = position.toLowerCase();
            const showName = name && position && !nameLower.includes(positionLower) && !positionLower.includes(nameLower);

            return (
              <motion.article
                key={member.id || `${member.name || member.position}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-90px' }}
                transition={{ delay: index * 0.06, duration: 0.42 }}
                className="flex h-full w-full max-w-[540px] flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm"
              >
                <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                  <img
                    src={member.imageUrl || payload.logoUrl}
                    alt={member.position || member.name || 'Rahbar'}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="grid flex-1 content-start gap-3 p-5">
                  <h2 className="min-h-[5.6rem] text-2xl font-black leading-tight text-slate-950">{member.position}</h2>
                  {showName ? <p className="min-h-[2rem] text-base font-semibold text-slate-700">{member.name}</p> : <div className="min-h-[2rem]" />}
                  <EmployeeInfo text={member.employeeInfo} />
                  <WorkActivityToggle text={member.workActivity} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function formatNewsDate(value) {
  if (!value) {
    return "Sana ko'rsatilmagan";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return "Sana ko'rsatilmagan";
  }

  return new Intl.DateTimeFormat('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsed);
}

function NewsPage({ announcements, lang }) {
  const [query, setQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const normalizedItems = useMemo(() => (
    (announcements || [])
      .map((item, index) => ({
        id: item.id || `news-${index}`,
        title: (item.title || "Nomsiz yangilik").trim(),
        body: (item.body || '').trim(),
        imageUrl: item.imageUrl || payload.heroImageUrl || payload.logoUrl,
        publishedAt: item.publishedAt || null,
        isPinned: Boolean(item.isPinned),
      }))
      .sort((a, b) => {
        if (a.isPinned !== b.isPinned) {
          return a.isPinned ? -1 : 1;
        }

        const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;

        return bTime - aTime;
      })
  ), [announcements]);

  const filteredItems = useMemo(() => {
    const queryValue = query.trim().toLowerCase();
    const from = fromDate ? new Date(`${fromDate}T00:00:00`) : null;
    const to = toDate ? new Date(`${toDate}T23:59:59`) : null;

    return normalizedItems.filter((item) => {
      if (queryValue) {
        const source = `${item.title} ${item.body}`.toLowerCase();
        if (!source.includes(queryValue)) {
          return false;
        }
      }

      if (!from && !to) {
        return true;
      }

      if (!item.publishedAt) {
        return false;
      }

      const published = new Date(item.publishedAt);

      if (Number.isNaN(published.getTime())) {
        return false;
      }

      if (from && published < from) {
        return false;
      }

      if (to && published > to) {
        return false;
      }

      return true;
    });
  }, [normalizedItems, query, fromDate, toDate]);

  const resetFilters = () => {
    setQuery('');
    setFromDate('');
    setToDate('');
  };

  return (
    <div className="bg-[#f4f5fb] text-slate-950">
      <section className="relative overflow-hidden bg-[linear-gradient(130deg,#1f2e57_0%,#2f3d78_50%,#1f6a89_100%)]">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative mx-auto max-w-[1536px] px-5 py-14 lg:px-16 lg:py-16">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-100">
            Yangiliklar
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl">
            Markaz yangiliklari va e'lonlari
          </h1>
        </div>
      </section>

      <section className="mx-auto grid w-[calc(100%_-_28px)] max-w-[1180px] gap-6 py-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t(lang, 'newsSearch')}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {filteredItems.length ? filteredItems.map((item) => {
              const expanded = expandedId === item.id;
              const shortBody = item.body.length > 160 ? `${item.body.slice(0, 160)}...` : item.body;

              return (
                <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/65 to-transparent px-3 py-2 text-xs font-bold text-white">
                      <span>{formatNewsDate(item.publishedAt)}</span>
                      {item.isPinned ? <span className="rounded-full bg-fuchsia-500/90 px-2 py-0.5 text-[11px] font-black">Muhim</span> : null}
                    </div>
                  </div>
                  <div className="grid gap-3 p-4">
                    <h2 className="text-2xl font-black leading-tight text-slate-950">{item.title}</h2>
                    <p className="whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">
                      {expanded ? item.body : shortBody}
                    </p>
                    {item.body.length > 160 ? (
                      <button
                        type="button"
                        onClick={() => setExpandedId((current) => (current === item.id ? null : item.id))}
                        className="mt-1 inline-flex w-full items-center justify-center rounded-xl bg-violet-200 px-4 py-2 text-lg font-bold text-[#3a1b78] transition hover:bg-violet-300"
                      >
                        {expanded ? t(lang, 'close') : t(lang, 'details')}
                      </button>
                    ) : null}
                  </div>
                </article>
              );
            }) : (
              <article className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-base font-semibold text-slate-500 sm:col-span-2">
                {lang === 'ru' ? 'По вашему запросу новости не найдены.' : "So'rovingiz bo'yicha yangilik topilmadi."}
              </article>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <h3 className="text-3xl font-black text-slate-950">{t(lang, 'filter')}</h3>
          <div className="mt-5 grid gap-3">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-600">{t(lang, 'periodFrom')}</span>
              <input
                type="date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-600">{t(lang, 'periodTo')}</span>
              <input
                type="date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white"
              />
            </label>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-bold text-slate-700 transition hover:bg-white"
            >
              {t(lang, 'clearFilters')}
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Hero({ stats, schedules, lang }) {
  return (
    <section id="top" className="mx-auto w-full max-w-[1208px] min-w-0 px-3.5 pb-16 pt-10 lg:pb-24 lg:pt-16">
      <HeroStudentVisual imageUrl={payload.heroImageUrl} schedules={schedules} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="mx-auto mt-10 max-w-5xl text-center"
      >
        <div className="inline-flex rounded-full border border-violet-300/50 bg-white/60 px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-violet-700 shadow-lg shadow-violet-500/10 backdrop-blur dark:border-cyan-300/20 dark:bg-white/8 dark:text-cyan-100">
          <TypewriterText text={t(lang, 'heroBadge')} speed={120} restartDelay={5000} />
        </div>
        <h1 className="mx-auto mt-7 max-w-[21rem] text-[1.42rem] font-black leading-[1.18] tracking-normal text-slate-950 dark:text-white sm:hidden">
          <span className="block">{t(lang, 'heroTitle')}</span>
        </h1>
        <h1 className="mx-auto mt-7 hidden max-w-[58rem] text-6xl font-black leading-[0.98] tracking-normal text-slate-950 dark:text-white sm:block lg:text-7xl">
          {t(lang, 'heroTitle')}
        </h1>
        <p
          className="mx-auto mt-7 max-w-[21rem] text-base font-semibold leading-7 text-slate-600 dark:text-slate-300 sm:max-w-[48rem] sm:text-lg sm:leading-8"
          style={{ overflowWrap: 'anywhere' }}
        >
          {t(lang, 'heroText')}
        </p>

      </motion.div>

      <div className="relative z-20 mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}

function StudentCouncilSection({ members, hideHeading = false }) {
  return (
    <section id="student-council" className="mx-auto w-[calc(100%_-_28px)] max-w-[1180px] py-12">
      {!hideHeading ? (
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-600 dark:text-cyan-200">O'quvchilar kengashi</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white sm:text-5xl">Amalga oshirilgan ishlar</h2>
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {members.map((member, index) => (
          <motion.article
            key={member.id || `${member.name}-${index}`}
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
              <img src={member.imageUrl || payload.logoUrl} alt={member.name} className="h-full w-full object-cover" />
            </div>
            <h3 className="text-2xl font-black text-slate-950">{member.name}</h3>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{member.work}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function StudentCouncilPage({ members }) {
  const advisor = payload.studentCouncilAdvisor || defaultStudentCouncilAdvisor;

  return (
    <div className="bg-[#f4f5fb] text-slate-950">
      <section className="relative overflow-hidden bg-[linear-gradient(130deg,#1f2e57_0%,#2f3d78_50%,#1f6a89_100%)]">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative mx-auto max-w-[1536px] px-5 py-14 lg:px-16 lg:py-16">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-100">
            O'quvchilar kengashi
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl">
            O'quvchilar kengashi faoliyati
          </h1>
        </div>
      </section>
      <section className="mx-auto w-[calc(100%_-_28px)] max-w-[1180px] py-10">
        <article className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[250px_minmax(0,1fr)] md:items-start">
          <div className="overflow-hidden rounded-2xl bg-slate-100">
            <img src={advisor.imageUrl || payload.logoUrl} alt={advisor.fullName} className="h-full w-full object-cover" />
          </div>
          <div>
            <h2 className="text-4xl font-black leading-tight text-slate-950">{advisor.fullName}</h2>
            <div className="my-5 h-px bg-slate-200" />
            <h3 className="text-2xl font-bold text-slate-900">{advisor.title}</h3>
            <p className="mt-3 text-base font-semibold leading-8 text-slate-700">{advisor.description}</p>
          </div>
        </article>
      </section>
      <StudentCouncilSection members={members} hideHeading />
    </div>
  );
}

function AboutCenterSection() {
  const blocks = [
    {
      id: 'leadership',
      title: 'Rahbariyat',
      text: "Markaz strategiyasi, boshqaruv qarorlari va yo'nalishlar bo'yicha mas'ul jamoa.",
      href: '#/leadership',
    },
    {
      id: 'student-council',
      title: "O'quvchilar kengashi",
      text: "O'quvchi tashabbuslarini yig'ib, tadbirlar va ijtimoiy loyihalarni hamkorlikda olib boradigan kengash.",
      href: '#/student-council',
    },
    {
      id: 'news',
      title: 'Yangiliklar',
      text: "Markazda bo'layotgan tadbirlar, tanlovlar va yangi imkoniyatlar bo'yicha e'lonlar.",
      href: '#/news',
    },
    {
      id: 'about-us',
      title: 'Biz haqimizda',
      text: "Kelajak Markazining maqsadi, qadriyatlari va ta'limni natijaga aylantirish yondashuvi.",
      href: '#/about-us',
    },
  ];

  return (
    <section className="mx-auto w-[calc(100%_-_28px)] max-w-[1180px] py-12">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-600 dark:text-cyan-200">Markaz haqida</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white sm:text-5xl">Asosiy bo'limlar</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {blocks.map((block) => (
          <article
            key={block.id}
            id={block.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-slate-900/5 dark:border-white/10 dark:bg-white/8"
          >
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">
              {block.href ? <a href={block.href}>{block.title}</a> : block.title}
            </h3>
            <p className="mt-3 text-base font-semibold leading-7 text-slate-600 dark:text-slate-300">{block.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutUsPage() {
  return (
    <div className="bg-[#f4f5fb] text-slate-950">
      <section className="relative overflow-hidden bg-[linear-gradient(130deg,#1f2e57_0%,#2f3d78_50%,#1f6a89_100%)]">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative mx-auto max-w-[1536px] px-5 py-14 lg:px-16 lg:py-16">
          
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl">
            Kelajak markazlari haqida
          </h1>
        </div>
      </section>

      <section className="mx-auto w-[calc(100%_-_28px)] max-w-[1180px] py-10">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-lg font-semibold leading-8 text-slate-800">
            “Kelajak markazlari” — bu bolalarning ijodiy, intellektual va ijtimoiy salohiyatini rivojlantirishga xizmat qiluvchi ochiq makon.
          </p>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-800">
            Bu markazlarda har bir o‘quvchining qiziqishi, iste’dodi va tashabbusiga e’tibor qaratiladi.
          </p>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-800">
            Bizning maqsad — bolalarga bilimni faqat darslikdan emas, balki hayotdan, amaliy faoliyatdan o‘rganish imkonini yaratishdir.
          </p>
          <p className="mt-5 text-xl font-black leading-8 text-slate-950">
            Kelajak ta’limdan boshlanadi!
          </p>

          <div className="mt-7 rounded-2xl border border-violet-200 bg-violet-50 p-4">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-violet-700">Hujjat</p>
            <a
              href="https://search.app/p2sKoQoEcN743Wps9"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-base font-black text-violet-800 transition hover:text-violet-950"
            >
              “Kelajak” markazi nizomi <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </section>
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const contact = payload.contact || defaultContact;
  const footerLinks = [
    ['Asosiy sahifa', '#top'],
    ["To'garaklar", '#clubs'],
    ['Dars jadvali', '#lessonSchedule'],
    ['Kontaktlar', '#our-contact'],
    ['Yangiliklar', '#/news'],
    ['Rahbariyat', '#/leadership'],
    ['Markaz haqida', '#cta'],
  ];

  return (
    <footer className="relative border-t border-white/40 bg-white/72 px-3.5 py-12 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/72 sm:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" />
      <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1.15fr_0.7fr_0.75fr_0.8fr]">
        <div>
          <a href="#top" className="inline-flex items-center gap-4">
            <img
              src={payload.logoUrl}
              alt="Kelajak Markazi"
              className="h-20 w-20 rounded-xl object-contain shadow-lg shadow-violet-500/15"
            />
            <div>
              <strong className="block text-xl font-black text-slate-950 dark:text-white">Kelajak Markazi</strong>
              <span className="mt-1 block text-sm font-black uppercase tracking-[0.16em] text-violet-600 dark:text-cyan-200">Samarqand viloyati</span>
            </div>
          </a>
          <p className="mt-5 max-w-sm text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
            To'garaklar, dars jadvali va murojaatlarni yagona raqamli tajribaga jamlaydigan zamonaviy ta'lim platformasi.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-950 dark:text-white">Bo'limlar</h3>
          <nav className="mt-5 grid gap-3">
            {footerLinks.map(([label, href]) => (
              <a key={href} href={href} className="text-sm font-bold text-slate-600 transition hover:text-violet-700 dark:text-slate-300 dark:hover:text-cyan-200">
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-950 dark:text-white">Aloqa</h3>
          <div className="mt-5 grid gap-3 text-sm font-bold text-slate-600 dark:text-slate-300">
            <a href={`tel:${contact.phoneRaw}`} className="transition hover:text-violet-700 dark:hover:text-cyan-200">{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="break-words transition hover:text-violet-700 dark:hover:text-cyan-200">{contact.email}</a>
            <span className="break-words leading-6">{contact.address}</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-950 dark:text-white">Tezkor kirish</h3>
          <p className="mt-5 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
            O'quvchi, ota-ona va adminlar uchun platformaga xavfsiz kirish.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <Button href={payload.isAuthenticated ? payload.dashboardUrl : payload.loginUrl} variant="glow">
              {payload.isAuthenticated ? 'Profil' : 'Kirish'}
            </Button>
            <Button href={payload.isAuthenticated ? payload.dashboardUrl : payload.registerUrl} variant="ghost">
              Ro'yxatdan o'tish
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1180px] flex-col gap-3 border-t border-slate-200/70 pt-6 text-sm font-bold text-slate-500 dark:border-white/10 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <span>{year} Kelajak Markazi. Barcha huquqlar himoyalangan.</span>
        <span>Milliy ta'lim ekotizimi uchun premium raqamli platforma.</span>
      </div>
    </footer>
  );
}

function App() {
  const [theme, toggleTheme] = useTheme();
  const [lang, toggleLanguage] = useLanguage();
  const route = useHashRoute();
  const stats = useMemo(() => payload.stats?.length ? payload.stats : defaultStats, []);
  const directions = useMemo(() => payload.directions?.length ? payload.directions : defaultDirections, []);
  const clubs = payload.clubs?.length ? payload.clubs : [];
  const schedules = payload.lessonSchedules?.length ? payload.lessonSchedules : [];
  const leadershipMembers = payload.leadershipMembers?.length ? payload.leadershipMembers : defaultLeadershipMembers;
  const announcements = payload.announcements?.length ? payload.announcements : defaultAnnouncements;
  const studentCouncilMembers = payload.studentCouncilMembers?.length ? payload.studentCouncilMembers : defaultStudentCouncilMembers;

  return (
    <main className="premium-bg relative min-h-screen overflow-hidden text-slate-950 transition-colors duration-500 dark:text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="neon-orb absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
        <div className="neon-orb absolute right-[-10rem] top-10 h-96 w-96 rounded-full bg-cyan-400/25 blur-3xl [animation-delay:1.6s]" />
        <div className="neon-orb absolute bottom-[-12rem] left-1/3 h-96 w-96 rounded-full bg-orange-400/18 blur-3xl [animation-delay:3s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.07)_1px,transparent_1px)] bg-[size:54px_54px] opacity-40 dark:opacity-20" />
      </div>

      <div className="relative z-10">
        <Header route={route} lang={lang} onToggleLanguage={toggleLanguage} />
        <div className="fixed bottom-4 right-3 z-50 hidden sm:block sm:bottom-5 sm:right-5">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        {route === 'clubs' ? (
          <>
            <ClubsPage clubs={clubs} schedules={schedules} />
            <Footer />
          </>
        ) : route === 'schedule' ? (
          <>
            <SchedulePage schedules={schedules} clubs={clubs} />
            <Footer />
          </>
        ) : route === 'contact' ? (
          <>
            <ContactPage />
            <Footer />
          </>
        ) : route === 'leadership' ? (
          <>
            <LeadershipPage members={leadershipMembers} />
            <Footer />
          </>
        ) : route === 'news' ? (
          <>
            <NewsPage announcements={announcements} lang={lang} />
            <Footer />
          </>
        ) : route === 'student-council' ? (
          <>
            <StudentCouncilPage members={studentCouncilMembers} />
            <Footer />
          </>
        ) : route === 'about-us' ? (
          <>
            <AboutUsPage />
            <Footer />
          </>
        ) : (
          <>
            <Hero stats={stats} schedules={payload.lessonSchedules} lang={lang} />

            <section className="mx-auto w-[calc(100%_-_28px)] max-w-[1180px] py-12">
              <div className="mb-8 max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-600 dark:text-cyan-200">{t(lang, 'sectionNews')}</p>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {announcements.slice(0, 3).map((item, index) => (
                  <motion.article
                    key={item.id || `home-news-${index}`}
                    initial={{ y: 18, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: index * 0.08, duration: 0.45 }}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                      <img src={item.imageUrl || payload.heroImageUrl || payload.logoUrl} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="grid gap-3 p-5">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-violet-700">{formatNewsDate(item.publishedAt)}</p>
                      <h3 className="line-clamp-2 text-2xl font-black leading-tight text-slate-950">{item.title}</h3>
                      <p className="line-clamp-3 text-sm font-semibold leading-7 text-slate-600">{item.body}</p>
                      <a href="#/news" className="mt-1 inline-flex items-center gap-2 text-sm font-black text-violet-700 hover:text-violet-900">
                        {t(lang, 'details')} <span aria-hidden="true">›</span>
                      </a>
                    </div>
                  </motion.article>
                ))}
              </div>
              <div className="mt-7">
                <a href="#/news" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-sm font-black text-slate-800 transition hover:-translate-y-0.5 hover:border-violet-300 hover:text-violet-700">
                  {t(lang, 'allNews')}
                </a>
              </div>
            </section>

            <section id="directions" className="mx-auto w-[calc(100%_-_28px)] max-w-[1180px] py-12">
              <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div className="max-w-3xl">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-600 dark:text-cyan-200">{t(lang, 'clubsLabel')}</p>
                  <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white sm:text-5xl">{t(lang, 'clubsTitle')}</h2>
                </div>
                <p className="max-w-sm text-base font-semibold leading-7 text-slate-600 dark:text-slate-300">
                  {t(lang, 'clubsText')}
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {clubs.slice(0, 4).map((club, index) => (
                  <DirectionCard
                    key={club.id || club.title}
                    item={{
                      title: club.title,
                      text: club.description,
                      meta: club.priceText || club.clubType || club.category || "To'garak",
                    }}
                    index={index}
                  />
                ))}
              </div>
            </section>

            <StudentCouncilSection members={studentCouncilMembers} />

            <AboutCenterSection />

            <section id="cta" className="mx-auto w-[calc(100%_-_28px)] max-w-[1180px] py-16">
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.55 }}
                className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-2xl shadow-violet-500/20 dark:bg-white dark:text-slate-950 sm:p-10 lg:p-14"
              >
                <div className="absolute right-[-6rem] top-[-6rem] h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl" />
                <div className="absolute bottom-[-8rem] left-[-8rem] h-80 w-80 rounded-full bg-violet-500/25 blur-3xl" />
                <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200 dark:text-violet-700">Kelajak shu yerdan boshlanadi</p>
                    <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">Farzandingiz salohiyatini ochib beradigan, natijasi bilan ishonch uyg‘otadigan ta’lim markazi.</h2>
                    <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/70 dark:text-slate-600">
                      Zamonaviy metodika, tajribali o‘qituvchilar va doimiy nazorat orqali har bir o‘quvchining rivojlanishiga yordam beramiz.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <Button href={payload.isAuthenticated ? dashboardApplicationUrl : guestApplicationUrl} variant="glow">To'garaklarga ariza qoldirish</Button>
                    <Button href="#clubs" variant="ghost">To'garaklarni ko'rish</Button>
                    <Button href="#lessonSchedule" variant="ghost">Dars jadvalini ko'rish</Button>
                  </div>
                </div>
              </motion.div>
            </section>

            <Footer />
          </>
        )}
      </div>
    </main>
  );
}

const root = createRoot(document.getElementById('premium-kelajak-root'));
root.render(<App />);
