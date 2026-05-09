import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';

const payload = window.__KELAJAK_DATA__ || {};

const defaultStats = [
  { value: '9 809', label: 'Hamkor tashkilotlar', tone: 'violet' },
  { value: '27 397', label: "Faol to'garak o'rinlari", tone: 'blue' },
  { value: '162 665', label: "Qiziqish bildirgan o'quvchilar", tone: 'orange' },
  { value: '60 231', label: "Haftalik dars sig'imi", tone: 'green' },
];

const defaultDirections = [
  { title: 'IT va suniy intellekt', text: 'Kod, data, robototexnika va AI loyihalar.', meta: '6 oy' },
  { title: 'Xorijiy tillar', text: 'Speaking club va sertifikatga tayyorgarlik.', meta: '4 oy' },
  { title: 'Fan olimpiadalari', text: 'Aniq reja, mentor nazorati va test tahlili.', meta: 'Doimiy' },
  { title: 'Ijod va media', text: 'Dizayn, video, sahna va raqamli portfolio.', meta: '3 oy' },
];

const defaultContact = {
  storeUrl: '/contact-messages',
  phone: '+998 (71) 217-18-71',
  phoneRaw: '+998712171871',
  email: 'kelajakmarkazlari@gmail.com',
  address: "100011, O'zbekiston, Toshkent, Shayxontohur tumani, Navoiy ko'chasi, 2A-uy",
  hours: 'Dushanba - Shanba · 09:00 - 18:00',
  responseTime: 'Odatda 30 daqiqa ichida javob',
  mapUrl: 'https://maps.google.com/?q=Toshkent%20Navoiy%202A',
  mapEmbedUrl: 'https://www.google.com/maps?q=Toshkent%20Navoiy%202A&z=15&output=embed',
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
    workActivity: "O'quv rejalari, ichki monitoring va mentorlar metodik ishlarini muvofiqlashtiradi.",
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

const toneClasses = {
  violet: 'from-violet-500 to-fuchsia-500 text-violet-600 dark:text-violet-200',
  blue: 'from-blue-500 to-cyan-400 text-blue-600 dark:text-blue-200',
  orange: 'from-orange-500 to-amber-400 text-orange-600 dark:text-orange-200',
  green: 'from-emerald-500 to-teal-400 text-emerald-600 dark:text-emerald-200',
};

function getInitialTheme() {
  const stored = localStorage.getItem('kelajak-theme');

  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('kelajak-theme', theme);
  }, [theme]);

  return [theme, () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))];
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

  return ['clubs', 'schedule', 'contact', 'leadership'].includes(route) ? route : 'home';
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
        className={`absolute top-1 h-9 w-9 rounded-lg bg-gradient-to-br transition-all duration-300 ${
          theme === 'dark'
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

function Header({ route }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    ['Asosiy sahifa', '#top'],
    ["To'garaklar", '#clubs'],
    ['Dars jadvali', '#lessonSchedule'],
    ['Kontaktlar', '#our-contact'],
  ];
  const aboutItems = [
    ['Rahbariyat', '#/leadership'],
    ["O'quvchilar kengashi", '#student-council'],
    ['Yangiliklar', '#news'],
    ['Biz haqimizda', '#about-us'],
  ];
  const currentHash = typeof window !== 'undefined' ? window.location.hash : '';
  const aboutIsActive = route === 'leadership' || (route === 'home' && aboutItems.some(([, href]) => currentHash === href));

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
              className={`whitespace-nowrap rounded-xl px-4 py-3 text-base font-bold tracking-normal transition-all duration-300 ${
                isActive
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
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-base font-bold tracking-normal transition-all duration-300 ${
                aboutIsActive
                  ? 'bg-slate-950 text-white shadow-lg shadow-violet-500/15 dark:bg-white dark:text-slate-950'
                  : 'text-slate-700 hover:bg-violet-50 hover:text-[#3a1b78] dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-cyan-100'
              }`}
              aria-haspopup="menu"
              aria-label="Markaz haqida bo'limlari"
            >
              Markaz haqida
              <span className="text-xs">▼</span>
            </button>
            <div className="pointer-events-none absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="min-w-[300px] rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-2xl dark:border-white/10 dark:bg-slate-900">
                {aboutItems.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
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
          <button
            type="button"
            className="hidden min-h-12 items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/74 px-4 text-base font-bold text-slate-800 shadow-lg shadow-slate-950/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-[#3a1b78]/30 hover:shadow-xl dark:border-white/10 dark:bg-white/8 dark:text-white sm:inline-flex"
            aria-label="Til tanlash"
          >
            <span className="relative block h-5 w-7 overflow-hidden rounded-[4px] shadow-sm ring-1 ring-black/5">
              <span className="absolute inset-x-0 top-0 h-1/3 bg-[#0099b5]" />
              <span className="absolute inset-x-0 top-1/3 h-1/3 bg-white" />
              <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[#1eb53a]" />
              <span className="absolute left-0 right-0 top-[31%] h-[1px] bg-[#ce1126]" />
              <span className="absolute left-0 right-0 top-[64%] h-[1px] bg-[#ce1126]" />
            </span>
            <span>O'z</span>
            <span className="text-lg leading-none text-slate-500">⌄</span>
          </button>
          <a
            href={payload.isAuthenticated ? payload.dashboardUrl : payload.loginUrl}
            className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-slate-950 bg-slate-950 px-3 text-base font-bold text-white shadow-xl shadow-violet-500/18 transition hover:-translate-y-0.5 hover:bg-[#3a1b78] hover:shadow-2xl dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-100 sm:px-5 sm:text-lg"
          >
            <svg className="h-5 w-5 text-cyan-200 dark:text-violet-700" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M13 4h5a3 3 0 013 3v10a3 3 0 01-3 3h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="hidden sm:inline">{payload.isAuthenticated ? 'Dashboard' : 'Kirish'}</span>
            <span className="hidden text-2xl leading-none sm:inline">›</span>
          </a>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-slate-200/70 bg-white/96 px-4 transition-[max-height,opacity] duration-300 dark:border-white/10 dark:bg-slate-950/96 sm:hidden ${
          mobileMenuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
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
                className={`rounded-2xl px-4 py-3 text-base font-bold transition ${
                  isActive
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
              Markaz haqida
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
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 text-base font-bold text-slate-800 dark:border-white/10 dark:bg-white/8 dark:text-white"
              aria-label="Til tanlash"
            >
              <span className="inline-flex items-center gap-2">
                <span className="relative block h-5 w-7 overflow-hidden rounded-[4px] shadow-sm ring-1 ring-black/5">
                  <span className="absolute inset-x-0 top-0 h-1/3 bg-[#0099b5]" />
                  <span className="absolute inset-x-0 top-1/3 h-1/3 bg-white" />
                  <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[#1eb53a]" />
                  <span className="absolute left-0 right-0 top-[31%] h-[1px] bg-[#ce1126]" />
                  <span className="absolute left-0 right-0 top-[64%] h-[1px] bg-[#ce1126]" />
                </span>
                O'z
              </span>
              <span className="text-lg leading-none text-slate-500">⌄</span>
            </button>

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
              {payload.isAuthenticated ? 'Dashboard' : 'Kirish'}
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

function HeroStudentVisual({ imageUrl, schedules }) {
  const lessons = schedules?.length ? schedules : [
    { title: 'IT va Suniy Intellekt', time: 'Dushanba · 09:00', mentor: 'Azizbek mentor' },
    { title: 'Xorijiy Tillar', time: 'Seshanba · 14:00', mentor: 'Madina mentor' },
  ];

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

        <div className="relative z-10 grid gap-3 p-3 sm:absolute sm:bottom-6 sm:left-6 sm:right-auto sm:w-[360px] sm:p-0">
          <div className="rounded-3xl border border-white/24 bg-white/18 p-4 text-white shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100">Premium profil</p>
                <h3 className="mt-2 text-xl font-black">Kelajak o'quvchisi</h3>
              </div>
              <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-black text-emerald-100">faol</span>
            </div>
            <p className="mt-3 text-sm font-bold leading-6 text-white/78">{lessons[0].title} · {lessons[0].time}</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/18">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '84%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-300"
              />
            </div>
          </div>
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
        <Button href={payload.isAuthenticated ? payload.dashboardUrl : payload.registerUrl} variant="ghost">Ariza boshlash</Button>
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
        className={`w-full appearance-none border border-slate-200 bg-white px-4 pr-11 text-sm font-bold text-slate-700 shadow-sm outline-none transition focus:border-violet-300 focus:ring-4 focus:ring-violet-100 ${
          compact ? 'h-11 rounded-xl' : 'h-12 rounded-2xl'
        }`}
      >
        <option value="all">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">⌄</span>
    </label>
  );
}

function ClubDetailsModal({ club, onClose }) {
  if (!club) {
    return null;
  }

  const imageUrl = club.imageUrl || payload.heroImageUrl;

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
          ✕
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
                href={payload.isAuthenticated ? payload.dashboardUrl : payload.loginUrl}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 text-base font-black text-white transition hover:-translate-y-0.5"
              >
                Ariza qoldirish
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClubCard({ club, onSelect }) {
  const applicationUrl = payload.isAuthenticated ? payload.dashboardUrl : payload.loginUrl;

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
            <h3 className="break-words text-[2rem] font-black leading-tight text-slate-950">{club.title}</h3>
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
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#43207f] text-white">⌖</span>
              <span className="truncate">{club.locationName}</span>
            </div>
            {club.description ? (
              <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-600">{club.description}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <strong className="inline-flex w-fit rounded-xl border border-violet-100 bg-white px-4 py-2 text-2xl font-black text-violet-400">
            {club.priceText}
          </strong>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={applicationUrl} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 px-5 text-base font-bold text-orange-600 transition hover:-translate-y-0.5 hover:bg-orange-100">
              Ariza qoldirish
            </a>
            <button
              type="button"
              onClick={() => onSelect(club)}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#c8b8ff] px-5 text-base font-bold text-[#43207f] transition hover:-translate-y-0.5 hover:bg-[#bbabfb]"
            >
              Batafsil ma'lumot ›
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ClubsHeroPreview({ clubs, categories, regions }) {
  const previewItems = clubs.slice(0, 3);
  const avgPrice = clubs.length
    ? Math.round(clubs.reduce((sum, club) => sum + (club.price || 0), 0) / clubs.length)
    : 0;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#2a1453_0%,#43207f_44%,#5a2ea8_100%)]">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-fuchsia-400/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[280px] max-w-[1536px] gap-8 px-5 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 text-lg font-black text-white/90">
            <span className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-cyan-400/95 text-[13px] font-black text-[#23114f] shadow-lg shadow-cyan-400/20">⌂</span>
            <span>›</span>
            <span>To'garaklar</span>
          </div>

          <h1 className="mt-5 max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl">
            To'garaklar
          </h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/75">
            Yo'nalishlar, hududlar va narxlarni bitta tizimda ko'rib chiqing. O'quvchi uchun mos
            to'garakni tez topish, solishtirish va ariza yuborish shu yerda jamlangan.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3 text-sm font-black text-white backdrop-blur">
              {clubs.length} ta to'garak
            </span>
            <span className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3 text-sm font-black text-white/90 backdrop-blur">
              {regions.length} ta hudud
            </span>
            <span className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3 text-sm font-black text-white/90 backdrop-blur">
              O'rtacha {avgPrice.toLocaleString('en-US').replace(/,/g, ' ')} so'm
            </span>
          </div>
        </div>

        <div className="relative flex items-center justify-end">
          <div className="grid w-full max-w-[560px] gap-4 rounded-[2rem] border border-white/12 bg-white/8 p-4 shadow-2xl shadow-slate-950/25 backdrop-blur-xl lg:grid-cols-[1fr_190px]">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/18 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100">Katalog preview</p>
                  <h3 className="mt-2 text-xl font-black text-white">Mashhur yo'nalishlar</h3>
                </div>
                <span className="rounded-full bg-amber-300/18 px-3 py-1 text-xs font-black text-amber-100">Top tanlov</span>
              </div>

              <div className="mt-4 grid gap-3">
                {previewItems.map((club) => (
                  <div key={club.id || club.title} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-white">{club.title}</p>
                      <p className="mt-1 truncate text-xs font-bold text-white/65">{club.category} · {extractRegion(club)}</p>
                    </div>
                    <span className="rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white">
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
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-slate-950/20">
              <img src={payload.heroImageUrl} alt="To'garaklar preview" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/12 bg-slate-950/38 px-3 py-3 backdrop-blur">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-cyan-100">Asosiy yo'nalishlar</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {categories.slice(0, 3).map((category) => (
                    <span key={category} className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-black text-white">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClubsPage({ clubs }) {
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [category, setCategory] = useState('all');
  const [clubType, setClubType] = useState('all');
  const [region, setRegion] = useState('all');
  const [district, setDistrict] = useState('all');
  const [organization, setOrganization] = useState('all');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [selectedClub, setSelectedClub] = useState(null);

  const categories = useMemo(() => [...new Set(clubs.map((club) => club.category).filter(Boolean))], [clubs]);
  const clubTypes = useMemo(() => [...new Set(clubs.map((club) => club.clubType).filter(Boolean))], [clubs]);
  const regions = useMemo(() => [...new Set(clubs.map(extractRegion).filter(Boolean))], [clubs]);
  const districts = useMemo(() => [...new Set(clubs.map(extractDistrict).filter(Boolean))], [clubs]);
  const organizations = useMemo(() => [...new Set(clubs.map(getOrganizationLabel).filter(Boolean))], [clubs]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return clubs.filter((club) => {
      const matchesCategory = category === 'all' || club.category === category;
      const matchesClubType = clubType === 'all' || club.clubType === clubType;
      const matchesRegion = region === 'all' || extractRegion(club) === region;
      const matchesDistrict = district === 'all' || extractDistrict(club) === district;
      const matchesOrganization = organization === 'all' || getOrganizationLabel(club) === organization;
      const haystack = `${club.title} ${club.address} ${club.category} ${club.phone} ${club.locationName} ${club.clubType}`.toLowerCase();

      return matchesCategory && matchesClubType && matchesRegion && matchesDistrict && matchesOrganization && (!needle || haystack.includes(needle));
    });
  }, [category, clubType, clubs, district, organization, query, region]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const paginatedClubs = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, perPage, safePage]);

  useEffect(() => {
    setPage(1);
  }, [query, category, clubType, region, district, organization, perPage]);

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
      <ClubsHeroPreview clubs={clubs} categories={categories} regions={regions} />

      <section className="mx-auto grid max-w-[1536px] gap-4 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-16">
        <div className="min-w-0">
          <div className="grid gap-3 xl:grid-cols-[1.2fr_0.9fr_0.9fr_auto]">
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
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`inline-grid h-11 w-11 place-items-center rounded-xl border text-lg transition ${
                  viewMode === 'list'
                    ? 'border-violet-200 bg-violet-50 text-[#43207f]'
                    : 'border-slate-200 bg-white text-slate-400 hover:border-violet-100 hover:text-[#43207f]'
                }`}
                aria-label="Ro'yxat ko'rinishi"
              >
                ☷
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-grid h-11 w-11 place-items-center rounded-xl border text-lg transition ${
                  viewMode === 'grid'
                    ? 'border-violet-200 bg-violet-50 text-[#43207f]'
                    : 'border-slate-200 bg-white text-slate-400 hover:border-violet-100 hover:text-[#43207f]'
                }`}
                aria-label="Katak ko'rinishi"
              >
                ▦
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap items-end gap-3">
              <h2 className="text-3xl font-black text-slate-950 sm:text-[2.2rem]">Mavjud to'garaklar</h2>
              <span className="pb-1 text-3xl font-black text-orange-500">{filtered.length}</span>
            </div>

            <div className="mt-5 inline-flex rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600">
              ⓘ To'garakni tanlang, so'ng ariza yoki batafsil ma'lumot bo'limiga o'ting
            </div>

            <div className={`mt-5 grid gap-4 ${viewMode === 'grid' ? 'xl:grid-cols-2' : ''}`}>
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
                    className={`inline-grid h-11 w-11 place-items-center rounded-xl border text-sm font-black transition ${
                      pageNumber === safePage
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
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#e9eef8_25%,transparent_25%),linear-gradient(-45deg,#e9eef8_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e9eef8_75%),linear-gradient(-45deg,transparent_75%,#e9eef8_75%)] bg-[length:28px_28px] opacity-80" />
            <div className="absolute inset-4 rounded-xl border border-violet-200 bg-white/60" />
            <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#3a1b78] text-2xl text-white shadow-xl">⌖</span>
            <a href={filtered[0]?.mapUrl || 'https://maps.google.com'} target="_blank" rel="noreferrer" className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-[#43207f] px-5 py-3 text-base font-bold text-white">
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
                <FilterSelect value={region} onChange={setRegion} options={regions} placeholder="Hududni tanlang" compact />
                <FilterSelect value={district} onChange={setDistrict} options={districts} placeholder="Tumanni tanlang" compact />
                <FilterSelect value={organization} onChange={setOrganization} options={organizations} placeholder="Tashkilotni tanlang" compact />
              </div>
            </div>
          </div>
        </aside>
      </section>

      <ClubDetailsModal club={selectedClub} onClose={() => setSelectedClub(null)} />
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
          ✕
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
          <div className="grid gap-4 md:grid-cols-2">
            {slots.map((slot) => (
              <article key={`${slot.programId || club.id}-${slot.time}-${slot.mentor}`} className="rounded-[1.1rem] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">{slot.dayLabel}</p>
                    <h4 className="mt-2 text-xl font-black text-slate-950">{slot.startTime} - {slot.endTime}</h4>
                  </div>
                  <span className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-black text-violet-700">
                    {slot.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>

                <dl className="mt-4 grid gap-3 text-sm font-semibold text-slate-600">
                  <div className="flex items-center justify-between gap-4 rounded-xl bg-white px-3 py-2">
                    <dt>Mentor</dt>
                    <dd className="font-black text-slate-900">{slot.mentor}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-xl bg-white px-3 py-2">
                    <dt>Xona</dt>
                    <dd className="font-black text-slate-900">{slot.room || 'Belgilanmagan'}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-xl bg-white px-3 py-2">
                    <dt>Sig'im</dt>
                    <dd className="font-black text-slate-900">{slot.capacity || '—'} ta</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          {!slots.length ? (
            <div className="rounded-[1.1rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm font-bold text-slate-500">
              Bu to'garak uchun dars slotlari hali kiritilmagan.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ScheduleProgramCard({ item, onOpen }) {
  const applicationUrl = payload.isAuthenticated ? payload.dashboardUrl : payload.loginUrl;

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
            ✎ Ariza qoldirish
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function ScheduleHeroPreview({ schedules }) {
  const previewSlots = schedules.slice(0, 3);
  const onlineCount = schedules.filter((slot) => slot.isOnline).length;
  const uniqueDays = new Set(schedules.map((slot) => slot.dayLabel || slot.time?.split('·')[0]?.trim()).filter(Boolean)).size;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#241047_0%,#3a1b78_42%,#1f4f7a_100%)]">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-cyan-400/18 blur-3xl" />
      <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-fuchsia-400/12 blur-3xl" />

      <div className="relative mx-auto grid min-h-[280px] max-w-[1536px] gap-8 px-5 py-10 lg:grid-cols-[1.1fr_0.95fr] lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 text-lg font-black text-white/90">
            <span className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-cyan-400/95 text-[13px] font-black text-[#23114f] shadow-lg shadow-cyan-400/20">◔</span>
            <span>›</span>
            <span>Dars jadvali</span>
          </div>

          <h1 className="mt-5 max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl">
            Dars jadvali
          </h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/75">
            Har bir to'garak bo'yicha dars kunlari, mentorlar va mavjud slotlar bir joyda jamlangan.
            Avval yo'nalishni tanlang, keyin jadvalni batafsil ko'ring.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3 text-sm font-black text-white backdrop-blur">
              {schedules.length} ta faol slot
            </span>
            <span className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3 text-sm font-black text-white/90 backdrop-blur">
              {uniqueDays} kunlik jadval
            </span>
            <span className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3 text-sm font-black text-white/90 backdrop-blur">
              {onlineCount} ta online dars
            </span>
          </div>
        </div>

        <div className="relative flex items-center justify-end">
          <div className="grid w-full max-w-[560px] gap-4 rounded-[2rem] border border-white/12 bg-white/8 p-4 shadow-2xl shadow-slate-950/25 backdrop-blur-xl lg:grid-cols-[1fr_190px]">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/18 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100">Hafta preview</p>
                  <h3 className="mt-2 text-xl font-black text-white">Yaqin darslar</h3>
                </div>
                <span className="rounded-full bg-emerald-400/18 px-3 py-1 text-xs font-black text-emerald-100">Real vaqt</span>
              </div>

              <div className="mt-4 grid gap-3">
                {previewSlots.map((slot, index) => (
                  <div key={`${slot.programId || slot.title}-${slot.time}-${index}`} className="grid grid-cols-[88px_1fr] items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-3 py-3">
                    <div className="rounded-xl bg-white/10 px-3 py-2 text-center text-sm font-black text-white">
                      {slot.startTime || slot.time?.split('·')[1]?.trim() || '09:00'}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-white">{slot.title}</p>
                      <p className="mt-1 truncate text-xs font-bold text-white/65">{slot.dayLabel || slot.time?.split('·')[0]?.trim()} · {slot.mentor}</p>
                    </div>
                  </div>
                ))}

                {!previewSlots.length ? (
                  <div className="rounded-2xl border border-dashed border-white/18 px-4 py-6 text-center text-sm font-bold text-white/60">
                    Dars slotlari admin paneldan qo'shiladi
                  </div>
                ) : null}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-slate-950/20">
              <img src={payload.heroImageUrl} alt="Dars jadvali preview" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/12 bg-slate-950/38 px-3 py-3 backdrop-blur">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-cyan-100">Kelasi slot</p>
                <p className="mt-2 text-sm font-black text-white">
                  {previewSlots[0]?.dayLabel || 'Dushanba'} · {previewSlots[0]?.startTime || '09:00'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SchedulePage({ schedules, clubs }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [clubType, setClubType] = useState('all');
  const [region, setRegion] = useState('all');
  const [district, setDistrict] = useState('all');
  const [organization, setOrganization] = useState('all');
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
  const regions = useMemo(() => [...new Set(schedulePrograms.map(extractRegion).filter(Boolean))], [schedulePrograms]);
  const districts = useMemo(() => [...new Set(schedulePrograms.map(extractDistrict).filter(Boolean))], [schedulePrograms]);
  const organizations = useMemo(() => [...new Set(schedulePrograms.map(getOrganizationLabel).filter(Boolean))], [schedulePrograms]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return schedulePrograms.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesClubType = clubType === 'all' || item.clubType === clubType;
      const matchesRegion = region === 'all' || extractRegion(item) === region;
      const matchesDistrict = district === 'all' || extractDistrict(item) === district;
      const matchesOrganization = organization === 'all' || getOrganizationLabel(item) === organization;
      const haystack = `${item.title} ${item.address} ${item.category} ${item.phone} ${item.locationName} ${item.clubType}`.toLowerCase();

      return matchesCategory && matchesClubType && matchesRegion && matchesDistrict && matchesOrganization && (!needle || haystack.includes(needle));
    });
  }, [category, clubType, district, organization, query, region, schedulePrograms]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, perPage, safePage]);

  useEffect(() => {
    setPage(1);
  }, [query, category, clubType, region, district, organization, perPage]);

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
        <div className="grid gap-3 xl:grid-cols-[1.2fr_repeat(5,minmax(0,1fr))]">
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
          <FilterSelect value={region} onChange={setRegion} options={regions} placeholder="Hududni tanlang" compact />
          <FilterSelect value={district} onChange={setDistrict} options={districts} placeholder="Tumanni tanlang" compact />
          <FilterSelect value={organization} onChange={setOrganization} options={organizations} placeholder="Tashkilotni tanlang" compact />
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap items-end gap-3">
            <h2 className="text-3xl font-black text-slate-950 sm:text-[2.2rem]">Mavjud to'garaklar</h2>
            <span className="pb-1 text-3xl font-black text-orange-500">{filtered.length}</span>
          </div>

          <div className="mt-5 inline-flex rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600">
            ⓘ Dars jadvalini ko'rish uchun to'garakni tanlang
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
                  className={`inline-grid h-11 w-11 place-items-center rounded-xl border text-sm font-black transition ${
                    pageNumber === safePage
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
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">⌄</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      <ScheduleProgramModal club={selectedProgram} slots={selectedProgram?.slots || []} onClose={() => setSelectedProgram(null)} />
    </div>
  );
}

function ContactHeroPreview({ contact }) {
  return (
    <section id="our-contact" className="relative overflow-hidden bg-[linear-gradient(135deg,#2d1459_0%,#43207f_52%,#244a9a_100%)]">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute -left-16 top-8 h-56 w-56 rounded-full bg-cyan-400/14 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-fuchsia-500/12 blur-3xl" />

      <div className="relative mx-auto grid min-h-[290px] max-w-[1536px] gap-8 px-5 py-10 lg:grid-cols-[1fr_0.96fr] lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 text-lg font-black text-white/90">
            <span className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-cyan-400/95 text-[13px] font-black text-[#23114f] shadow-lg shadow-cyan-400/20">◔</span>
            <span>›</span>
            <span>Kontaktlar</span>
          </div>

          <h1 className="mt-5 max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl">
            Biz bilan bog'laning
          </h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/78">
            Savol, taklif yoki hamkorlik bo'lsa, murojaatni shu yerdan yuboring. Platforma, to'garaklar va dars jarayonlari bo'yicha jamoamiz tezkor javob beradi.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3 text-sm font-black text-white backdrop-blur">
              {contact.responseTime}
            </span>
            <span className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3 text-sm font-black text-white/90 backdrop-blur">
              {contact.hours}
            </span>
          </div>
        </div>

        <div className="relative flex items-center justify-end">
          <div className="grid w-full max-w-[560px] gap-4 rounded-[2rem] border border-white/12 bg-white/8 p-4 shadow-2xl shadow-slate-950/25 backdrop-blur-xl lg:grid-cols-[1fr_210px]">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/18 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100">Aloqa markazi</p>
              <h3 className="mt-2 text-2xl font-black text-white">Bir nechta kanal, bitta javob markazi</h3>

              <div className="mt-5 grid gap-3">
                <a href={`tel:${contact.phoneRaw}`} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white transition hover:bg-white/12">
                  <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-white/55">Telefon</span>
                  <span className="mt-2 block text-lg font-black">{contact.phone}</span>
                </a>
                <a href={`mailto:${contact.email}`} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white transition hover:bg-white/12">
                  <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-white/55">Elektron manzil</span>
                  <span className="mt-2 block break-words text-lg font-black">{contact.email}</span>
                </a>
                <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white">
                  <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-white/55">Ish vaqti</span>
                  <span className="mt-2 block text-lg font-black">{contact.hours}</span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-slate-950/20">
              <img src={payload.heroImageUrl} alt="Kelajak Markazi aloqa preview" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/12 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/12 bg-slate-950/40 px-3 py-3 backdrop-blur">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-cyan-100">Qabul punkti</p>
                <p className="mt-2 text-sm font-bold leading-6 text-white/88">Murojaatlar bir nuqtada yig'iladi, keyin tegishli jamoaga yo'naltiriladi.</p>
              </div>
            </div>
          </div>
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
      <ContactHeroPreview contact={contact} />

      <section className="mx-auto grid max-w-[1536px] gap-6 px-5 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:px-16">
        <div className="grid gap-4">
          {infoCards.map((item) => {
            const content = (
              <div className="grid gap-3 rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-slate-900/5">
                <span className="inline-grid h-11 w-11 place-items-center rounded-2xl bg-violet-50 text-violet-700">
                  {item.icon}
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-2xl font-black leading-tight text-slate-950">{item.value}</p>
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

          <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">Xarita</p>
              <h3 className="mt-2 text-2xl font-black text-slate-950">Qabul punktiga yo'l</h3>
            </div>
            <iframe
              title="Kelajak Markazi xarita"
              src={contact.mapEmbedUrl}
              className="h-[320px] w-full"
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
                To'garak, dars jadvali, hamkorlik yoki texnik masala bo'lsa, shu formadan yuboring. Xabar admin panelga tushadi.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">
              {contact.responseTime}
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

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm font-semibold leading-6 text-slate-500">
                Yuborilgan murojaatlar admin paneldagi “Murojaatlar” bo'limida ko'rinadi va status bilan boshqariladi.
              </p>
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

function Hero({ stats, schedules }) {
  return (
    <section id="top" className="mx-auto w-full max-w-[1208px] min-w-0 px-3.5 pb-16 pt-10 lg:pb-24 lg:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="mx-auto max-w-5xl text-center"
      >
        <div className="inline-flex rounded-full border border-violet-300/50 bg-white/60 px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-violet-700 shadow-lg shadow-violet-500/10 backdrop-blur dark:border-cyan-300/20 dark:bg-white/8 dark:text-cyan-100">
          Milliy ta'lim ekotizimi
        </div>
        <h1 className="mx-auto mt-7 max-w-[21rem] text-[1.42rem] font-black leading-[1.18] tracking-normal text-slate-950 dark:text-white sm:hidden">
          <span className="block">Istalgan joyda va vaqtda</span>
          <span className="block">o'rganing,</span>
          <span className="block">kelajagingizni biz bilan quring</span>
        </h1>
        <h1 className="mx-auto mt-7 hidden max-w-[58rem] text-6xl font-black leading-[0.98] tracking-normal text-slate-950 dark:text-white sm:block lg:text-7xl">
          Istalgan joyda va vaqtda o'rganing, kelajagingizni biz bilan quring
        </h1>
        <p
          className="mx-auto mt-7 max-w-[21rem] text-base font-semibold leading-7 text-slate-600 dark:text-slate-300 sm:max-w-[48rem] sm:text-lg sm:leading-8"
          style={{ overflowWrap: 'anywhere' }}
        >
          Kelajak Markazi to'garak, mentor, dars jadvali, ariza va yutuqlarni bitta premium platformaga jamlaydi. Natija ko'rinadi, jarayon boshqariladi, imkoniyatlar yaqinlashadi.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={payload.isAuthenticated ? payload.dashboardUrl : payload.registerUrl} variant="glow">Platformaga kirish</Button>
          <Button href="#features" variant="ghost">Imkoniyatlarni ko'rish</Button>
        </div>
      </motion.div>

      <HeroStudentVisual imageUrl={payload.heroImageUrl} schedules={schedules} />

      <div className="relative z-20 -mt-8 grid grid-cols-2 gap-3 sm:-mt-12 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
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
    },
    {
      id: 'news',
      title: 'Yangiliklar',
      text: "Markazda bo'layotgan tadbirlar, tanlovlar va yangi imkoniyatlar bo'yicha e'lonlar.",
    },
    {
      id: 'about-us',
      title: 'Biz haqimizda',
      text: "Kelajak Markazining maqsadi, qadriyatlari va ta'limni natijaga aylantirish yondashuvi.",
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

function Footer() {
  const year = new Date().getFullYear();
  const contact = payload.contact || defaultContact;
  const footerLinks = [
    ['Asosiy sahifa', '#top'],
    ["To'garaklar", '#clubs'],
    ['Dars jadvali', '#lessonSchedule'],
    ['Kontaktlar', '#our-contact'],
    ['Rahbariyat', '#/leadership'],
    ['Maxsus katalog', '#special'],
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
            To'garaklar, dars jadvali, maxsus katalog va murojaatlarni yagona raqamli tajribaga jamlaydigan zamonaviy ta'lim platformasi.
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
            <span>{contact.address}</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-950 dark:text-white">Tezkor kirish</h3>
          <p className="mt-5 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
            O'quvchi, ota-ona va adminlar uchun platformaga xavfsiz kirish.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <Button href={payload.isAuthenticated ? payload.dashboardUrl : payload.loginUrl} variant="glow">
              {payload.isAuthenticated ? 'Dashboard' : 'Kirish'}
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
  const route = useHashRoute();
  const stats = useMemo(() => payload.stats?.length ? payload.stats : defaultStats, []);
  const directions = useMemo(() => payload.directions?.length ? payload.directions : defaultDirections, []);
  const features = payload.features || [];
  const clubs = payload.clubs?.length ? payload.clubs : [];
  const schedules = payload.lessonSchedules?.length ? payload.lessonSchedules : [];
  const leadershipMembers = payload.leadershipMembers?.length ? payload.leadershipMembers : defaultLeadershipMembers;

  return (
    <main className="premium-bg relative min-h-screen overflow-hidden text-slate-950 transition-colors duration-500 dark:text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="neon-orb absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
        <div className="neon-orb absolute right-[-10rem] top-10 h-96 w-96 rounded-full bg-cyan-400/25 blur-3xl [animation-delay:1.6s]" />
        <div className="neon-orb absolute bottom-[-12rem] left-1/3 h-96 w-96 rounded-full bg-orange-400/18 blur-3xl [animation-delay:3s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.07)_1px,transparent_1px)] bg-[size:54px_54px] opacity-40 dark:opacity-20" />
      </div>

      <div className="relative z-10">
        <Header route={route} />
        <div className="fixed bottom-5 right-5 z-50">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        {route === 'clubs' ? (
          <>
            <ClubsPage clubs={clubs} />
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
        ) : (
          <>
            <Hero stats={stats} schedules={payload.lessonSchedules} />

            <section className="mx-auto w-[calc(100%_-_28px)] max-w-[1180px] py-12">
              <div className="mb-8 max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-600 dark:text-cyan-200">Nega bu platforma kuchli</p>
                <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white sm:text-5xl">Oddiy landing emas, markaz ishini yuritadigan raqamli boshqaruv</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {features.map((feature, index) => (
                  <FeatureCard key={feature.title} feature={feature} index={index} />
                ))}
              </div>
            </section>

            <section id="directions" className="mx-auto w-[calc(100%_-_28px)] max-w-[1180px] py-12">
              <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div className="max-w-3xl">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-600 dark:text-cyan-200">Yo'nalishlar</p>
                  <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white sm:text-5xl">Qiziqishdan kasbgacha olib boradigan yo'nalishlar</h2>
                </div>
                <p className="max-w-sm text-base font-semibold leading-7 text-slate-600 dark:text-slate-300">
                  Har bir guruh mentor, jadval va progress bilan boshqariladi. O'quvchi qayerdan boshlaganini ham, qayerga ketayotganini ham ko'radi.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {directions.map((item, index) => (
                  <DirectionCard key={item.title} item={item} index={index} />
                ))}
              </div>
            </section>

            <AboutCenterSection />

            <SpecialStrip items={payload.specialCourses} />

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
                    <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">O'quvchi imkoniyatini sezdiradigan, ota-onaga ishonch beradigan platforma.</h2>
                    <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/70 dark:text-slate-600">
                      Endi markaz faqat kurslar ro'yxati emas. Bu natija, nazorat, ilhom va real rivojlanish uchun milliy darajadagi raqamli tajriba.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <Button href={payload.isAuthenticated ? payload.dashboardUrl : payload.registerUrl} variant="glow">Boshlash</Button>
                    <Button href={payload.isAuthenticated ? payload.dashboardUrl : payload.loginUrl} variant="ghost">Kirish</Button>
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
