/* eslint-disable func-names */
/* eslint-disable no-new */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
(function () {
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    }
    return document.querySelector(el);
  };

  /**
     * Easy event listener function
     */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach((e) => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };

  /**
     * Easy on scroll event listener
     */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
     * Sidebar toggle
     */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', () => {
      select('body').classList.toggle('toggle-sidebar');
    });
  }

  const path = window.location.pathname;
  const page = path.split('/').pop();

  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    link.classList.remove('active');
  });

  switch (page) {
    case 'dashboard':
      document.getElementById('dashboard-link').classList.add('active');
      break;
    case 'user':
      document.getElementById('user-link').classList.add('active');
      break;
    case 'mpasi':
      document.getElementById('mpasi-link').classList.add('active');
      break;
    case 'artikel':
      document.getElementById('artikel-link').classList.add('active');
      break;
    case 'logpage':
      document.getElementById('logpage-link').classList.add('active');
      break;

    default:
      break;
  }
  /**
     * Search bar toggle
     */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', () => {
      select('.search-bar').classList.toggle('search-bar-show');
    });
  }

  /**
     * Navbar links active state on scroll
     */
  const navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    const position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      const section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop
          && position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
  const selectHeader = select('#header');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
     * Back to top button
     */
  const backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
     * Initiate Bootstrap validation check
     */
  const needsValidation = document.querySelectorAll('.needs-validation');

  Array.prototype.slice.call(needsValidation).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      },
      false,
    );
  });

  /**
     * Autoresize echart charts
     */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(() => {
        select('.echart', true).forEach((getEchart) => {
          echarts.getInstanceByDom(getEchart).resize();
        });
      }).observe(mainContainer);
    }, 200);
  }
}());
