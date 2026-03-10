/* ============================================================
   PRIME LOGIC LTD — Main JavaScript
   Version: 2.0 — Enterprise Redesign
   ============================================================ */

(function () {
  'use strict';

  /* ─── NAV ACTIVE STATE ──────────────────────────────────── */
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-nav]').forEach(function (a) {
    if (a.getAttribute('href').toLowerCase() === path) a.classList.add('active');
  });

  /* ─── SMART NAVBAR — sticky with scrolled state ────────────
   *
   * Behaviour:
   *  • Header sits directly below the hero in the HTML flow.
   *  • Uses CSS position:sticky to lock at the top of the viewport.
   *  • JS only adds a 'scrolled' class for the shrink / shadow effect.
   * ─────────────────────────────────────────────────────────── */
  var header       = document.getElementById('site-header');

  if (header) {
    var ticking = false;

    function updateNav() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateNav();
  }

  /* ─── MOBILE MENU TOGGLE ────────────────────────────────── */
  var menuToggle = document.getElementById('menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-open', isOpen);
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        menuToggle.focus();
      }
    });
  }

  /* ─── SCROLL REVEAL ANIMATIONS ──────────────────────────── */
  var revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ─── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
        var elementPosition = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset - 16,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ─── WHATSAPP FORM HANDLER ─────────────────────────────── */
  var form = document.querySelector('[data-wa-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var org = (data.get('org') || '').toString().trim();
      var email = (data.get('email') || '').toString().trim();
      var need = (data.get('need') || '').toString().trim();
      var msg = (data.get('message') || '').toString().trim();

      var lines = [
        'Hello Prime Logic Team.',
        'Name: ' + name,
        'Organization: ' + org
      ];
      if (email) lines.push('Email: ' + email);
      if (need) lines.push('Service interest: ' + need);
      lines.push('Message: ' + msg);

      var text = encodeURIComponent(lines.join('\n'));
      var waBase = form.getAttribute('data-wa-base');
      window.open(waBase + text, '_blank');
    });
  }

  /* ─── CINEMATIC INTRO ANIMATIONS ────────────────────────── */
  var introSection = document.getElementById('cinematic-intro');
  if (introSection) {
    // 1. Parallax Icons
    var icons = introSection.querySelectorAll('.ci-icon');
    introSection.addEventListener('mousemove', function(e) {
      var x = (e.clientX - window.innerWidth / 2);
      var y = (e.clientY - window.innerHeight / 2);
      
      icons.forEach(function(icon) {
        var speed = parseFloat(icon.getAttribute('data-speed')) || 0;
        icon.style.transform = 'translate(' + (x * speed) + 'px, ' + (y * speed) + 'px)';
      });
    });

    // 2. Word Rotator
    var words = introSection.querySelectorAll('.ci-rotator-word');
    if (words.length > 0) {
      var currentWord = 0;
      setInterval(function() {
        words[currentWord].classList.remove('active');
        words[currentWord].classList.add('out');
        
        var prevWord = currentWord;
        setTimeout(function() {
          words[prevWord].classList.remove('out');
        }, 500);
        
        currentWord = (currentWord + 1) % words.length;
        words[currentWord].classList.add('active');
      }, 2500);
    }
  }

})();
// ─── TIMELINE ANIMATION ───────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap !== 'undefined') {
    var timelineSteps = document.querySelectorAll('.timeline-step');
    timelineSteps.forEach(function(step, i) {
      var num = step.querySelector('.timeline-num');
      var title = step.querySelector('.timeline-title');
      var text = step.querySelector('.timeline-text');
      // Hide initially
      gsap.set(num, { x: -60, opacity: 0 });
      gsap.set([title, text], { opacity: 0 });
    });
    // Animate in sequence
    timelineSteps.forEach(function(step, i) {
      var num = step.querySelector('.timeline-num');
      var title = step.querySelector('.timeline-title');
      var text = step.querySelector('.timeline-text');
      gsap.to(num, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        delay: i * 0.4,
        ease: 'power3.out',
        onComplete: function() {
          gsap.to([title, text], {
            opacity: 1,
            duration: 0.5,
            stagger: 0.15
          });
        }
      });
    });
  }
});
