(function () {
  function initHashRoutes() {
    const routeViews = document.querySelectorAll('[data-route-view]');
    const routeLinks = document.querySelectorAll('[data-route-link]');

    if (routeViews.length === 0) {
      return;
    }

    const viewMap = new Map();
    routeViews.forEach((el) => viewMap.set(el.getAttribute('data-route-view'), el));

    const externalRoutes = {
      'auth/login': '/login',
      'auth/register': '/register',
      dashboard: '/dashboard',
      admin: '/admin'
    };

    const aliases = {
      courses: 'clubs',
      'special-courses': 'special',
      'special-students': 'special',
      contact: 'our-contact',
      contacts: 'our-contact'
    };

    const normalizeRoute = () => {
      const hash = window.location.hash || '';
      const cleaned = hash.replace(/^#\/?/, '').replace(/^\/+/, '');
      const route = cleaned || 'home';
      return aliases[route] || route;
    };

    const renderRoute = () => {
      const currentRoute = normalizeRoute();

      if (Object.prototype.hasOwnProperty.call(externalRoutes, currentRoute)) {
        window.location.href = externalRoutes[currentRoute];
        return;
      }

      const targetRoute = viewMap.has(currentRoute) ? currentRoute : 'not-found';

      routeViews.forEach((el) => {
        el.classList.toggle('active', el.getAttribute('data-route-view') === targetRoute);
      });

      routeLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('data-route-link') === currentRoute);
      });

      const nav = document.querySelector('[data-site-nav]');
      if (nav) {
        nav.classList.remove('open');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!window.location.hash) {
      window.location.hash = '#/home';
    } else {
      renderRoute();
    }

    window.addEventListener('hashchange', renderRoute);
  }

  function initNav() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-site-nav]');

    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  function initCountdown() {
    const countdown = document.querySelector('.countdown');

    if (!countdown) {
      return;
    }

    const eventDate = countdown.getAttribute('data-event-date');
    const daysEl = countdown.querySelector('[data-days]');
    const hoursEl = countdown.querySelector('[data-hours]');
    const minutesEl = countdown.querySelector('[data-minutes]');

    const tick = () => {
      if (!eventDate || !daysEl || !hoursEl || !minutesEl) {
        return;
      }

      const target = new Date(eventDate + 'T09:00:00');
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        daysEl.textContent = '0';
        hoursEl.textContent = '0';
        minutesEl.textContent = '0';
        return;
      }

      const totalMinutes = Math.floor(diff / 60000);
      const days = Math.floor(totalMinutes / (60 * 24));
      const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
      const minutes = totalMinutes % 60;

      daysEl.textContent = String(days);
      hoursEl.textContent = String(hours);
      minutesEl.textContent = String(minutes);
    };

    tick();
    setInterval(tick, 30000);
  }

  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');

    if (reveals.length === 0) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('shown'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('shown');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach((el) => observer.observe(el));
  }

  initHashRoutes();
  initNav();
  initCountdown();
  initReveal();
})();
