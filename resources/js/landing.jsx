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

function Header() {
  const navItems = [
    ['Asosiy sahifa', '#top'],
    ["To'garaklar", '#directions'],
    ['Dars jadvali', '#features'],
    ['Markaz haqida', '#cta'],
    ['Kontaktlar', '#cta'],
  ];

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

        <a
          href={payload.isAuthenticated ? payload.dashboardUrl : payload.loginUrl}
          className="fixed right-3.5 top-7 z-[70] inline-grid h-12 w-12 place-items-center rounded-2xl bg-white text-violet-700 shadow-xl shadow-violet-500/20 ring-1 ring-white/70 transition hover:-translate-y-0.5 hover:bg-cyan-50 sm:hidden"
          aria-label={payload.isAuthenticated ? 'Dashboard' : 'Kirish'}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M13 4h5a3 3 0 013 3v10a3 3 0 01-3 3h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>

        <nav className="hidden justify-self-center rounded-2xl border border-slate-200/80 bg-white/62 p-1 shadow-inner shadow-slate-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/8 xl:flex">
          {navItems.map(([label, href], index) => (
            <a
              key={href}
              href={href}
              className={`whitespace-nowrap rounded-xl px-4 py-3 text-base font-bold tracking-normal transition-all duration-300 ${
                index === 0
                  ? 'bg-slate-950 text-white shadow-lg shadow-violet-500/15 dark:bg-white dark:text-slate-950'
                  : 'text-slate-700 hover:bg-violet-50 hover:text-[#3a1b78] dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-cyan-100'
              }`}
            >
              {label}
            </a>
          ))}
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

function Footer() {
  const year = new Date().getFullYear();
  const footerLinks = [
    ['Asosiy sahifa', '#top'],
    ["To'garaklar", '#directions'],
    ['Dars jadvali', '#features'],
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
            <a href="tel:+998712171871" className="transition hover:text-violet-700 dark:hover:text-cyan-200">+998 (71) 217-18-71</a>
            <a href="mailto:kelajakmarkazlari@gmail.com" className="break-words transition hover:text-violet-700 dark:hover:text-cyan-200">kelajakmarkazlari@gmail.com</a>
            <span>Samarqand viloyati, Kelajak markazlari</span>
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
  const stats = useMemo(() => payload.stats?.length ? payload.stats : defaultStats, []);
  const directions = useMemo(() => payload.directions?.length ? payload.directions : defaultDirections, []);
  const features = payload.features || [];

  return (
    <main className="premium-bg relative min-h-screen overflow-hidden text-slate-950 transition-colors duration-500 dark:text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="neon-orb absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
        <div className="neon-orb absolute right-[-10rem] top-10 h-96 w-96 rounded-full bg-cyan-400/25 blur-3xl [animation-delay:1.6s]" />
        <div className="neon-orb absolute bottom-[-12rem] left-1/3 h-96 w-96 rounded-full bg-orange-400/18 blur-3xl [animation-delay:3s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.07)_1px,transparent_1px)] bg-[size:54px_54px] opacity-40 dark:opacity-20" />
      </div>

      <div className="relative z-10">
        <Header />
        <div className="fixed bottom-5 right-5 z-50">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
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
      </div>
    </main>
  );
}

const root = createRoot(document.getElementById('premium-kelajak-root'));
root.render(<App />);
