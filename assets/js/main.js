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

  /* ─── PRIME FORMS — validation + WhatsApp + spam protection ── */
  var PrimeForms = (function () {
    var WA_NUMBER = '250796694798';
    var COOLDOWN_MS = 10000;
    var lastSubmit = {};

    /* ── Validation rules ── */
    var rules = {
      required: function (v) { return v.trim() !== ''; },
      email:    function (v) { return v === '' || /^[^\s@]+@[^^\s@]+\.[^\s@]+$/.test(v); },
      minlen:   function (v, n) { return v.trim().length >= parseInt(n, 10); },
      phone:    function (v) { return v === '' || /^[\d\s+\-().]{7,20}$/.test(v); }
    };

    var messages = {
      required: 'This field is required.',
      email:    'Please enter a valid email address.',
      minlen:   'Please provide a bit more detail (min {n} characters).',
      phone:    'Please enter a valid phone number.'
    };

    function getVal(field) {
      return (field.value || '').toString().trim();
    }

    function setError(field, msg) {
      field.classList.add('field--error');
      field.classList.remove('field--valid');
      var wrap = field.closest('.form-field-wrap');
      if (wrap) {
        var err = wrap.querySelector('.field-error');
        if (err) err.textContent = msg;
      }
    }

    function clearError(field) {
      field.classList.remove('field--error');
      if (getVal(field)) field.classList.add('field--valid');
      var wrap = field.closest('.form-field-wrap');
      if (wrap) {
        var err = wrap.querySelector('.field-error');
        if (err) err.textContent = '';
      }
    }

    function validateField(field) {
      var v = getVal(field);
      var reqs = (field.dataset.validate || '').split(' ').filter(Boolean);
      for (var i = 0; i < reqs.length; i++) {
        var parts = reqs[i].split(':');
        var rule = parts[0];
        var param = parts[1];
        if (rules[rule] && !rules[rule](v, param)) {
          var msg = messages[rule] || 'Invalid value.';
          if (param) msg = msg.replace('{n}', param);
          setError(field, msg);
          return false;
        }
      }
      clearError(field);
      return true;
    }

    function validateForm(form) {
      var fields = form.querySelectorAll('[data-validate]');
      var valid = true;
      var first = null;
      fields.forEach(function (f) {
        if (!validateField(f)) {
          valid = false;
          if (!first) first = f;
        }
      });
      if (first) first.focus();
      return valid;
    }

    /* ── WhatsApp message builders per form type ── */
    var builders = {
      'logic-audit': function (d) {
        var lines = [
          'Hello Prime Logic Team. I\'d like to request a Logic Audit.',
          '',
          'Name: ' + d('name'),
          'Organization: ' + d('company'),
          'Role / Title: ' + d('role')
        ];
        if (d('email'))   lines.push('Email: ' + d('email'));
        if (d('phone'))   lines.push('Phone: ' + d('phone'));
        lines.push('');
        lines.push('Audit Focus: ' + (d('focus') || 'Full four-pillar audit'));
        lines.push('Organization Size: ' + (d('org_size') || 'Not specified'));
        lines.push('Timeline: ' + (d('timeline') || 'Not specified'));
        lines.push('Budget Range: ' + (d('budget') || 'Not specified'));
        lines.push('Preferred Meeting Time: ' + (d('meeting_time') || 'Not specified'));
        lines.push('');
        lines.push('Challenge / Goal:');
        lines.push(d('challenge'));
        lines.push('');
        lines.push('Please advise on next steps.');
        return lines.join('\n');
      },

      'proposal': function (d) {
        var lines = [
          'Hello Prime Logic Team. I\'d like to request a Proposal.',
          '',
          'Name: ' + d('name'),
          'Organization: ' + d('company'),
          'Role / Title: ' + d('role')
        ];
        if (d('email'))   lines.push('Email: ' + d('email'));
        if (d('phone'))   lines.push('Phone: ' + d('phone'));
        lines.push('');
        lines.push('Service Interest: ' + (d('service') || 'Not specified'));
        lines.push('Budget Range: ' + (d('budget') || 'Not specified'));
        lines.push('Timeline: ' + (d('timeline') || 'Not specified'));
        lines.push('Preferred Meeting Time: ' + (d('meeting_time') || 'Not specified'));
        lines.push('');
        lines.push('Project / Challenge Description:');
        lines.push(d('challenge'));
        if (d('goals')) {
          lines.push('');
          lines.push('Desired Outcomes:');
          lines.push(d('goals'));
        }
        lines.push('');
        lines.push('Please send a scoped proposal.');
        return lines.join('\n');
      },

      'newsletter': function (d) {
        var lines = [
          'Hello Prime Logic Team. I\'d like to subscribe to your Insights newsletter.',
          '',
          'Name: ' + d('name'),
          'Email: ' + d('email')
        ];
        if (d('company')) lines.push('Organization: ' + d('company'));
        if (d('role'))    lines.push('Role: ' + d('role'));
        lines.push('Topics of Interest: ' + (d('topics') || 'All topics'));
        lines.push('');
        lines.push('Please add me to your mailing list.');
        return lines.join('\n');
      },

      /* Legacy fallback for old [data-wa-form] without data-form-type */
      'default': function (d, form) {
        var lines = ['Hello Prime Logic Team.'];
        if (d('name'))    lines.push('Name: ' + d('name'));
        if (d('org'))     lines.push('Organization: ' + d('org'));
        if (d('email'))   lines.push('Email: ' + d('email'));
        if (d('need'))    lines.push('Service interest: ' + d('need'));
        if (d('message')) lines.push('Message: ' + d('message'));
        return lines.join('\n');
      }
    };

    function showSuccess(form) {
      var banner = form.querySelector('.form-success');
      if (banner) {
        banner.classList.add('visible');
        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    function bindForm(form) {
      /* Live validation on blur */
      form.querySelectorAll('[data-validate]').forEach(function (field) {
        field.addEventListener('blur', function () { validateField(field); });
        field.addEventListener('input', function () {
          if (field.classList.contains('field--error')) validateField(field);
        });
      });

      /* Character counter */
      form.querySelectorAll('[data-maxlen]').forEach(function (field) {
        var max = parseInt(field.dataset.maxlen, 10);
        var wrap = field.closest('.form-field-wrap');
        var counter = wrap && wrap.querySelector('.field-counter');
        if (!counter) return;
        function update() {
          var len = field.value.length;
          counter.textContent = len + ' / ' + max;
          counter.className = 'field-counter' +
            (len > max ? ' field-counter--over' : len > max * 0.85 ? ' field-counter--warn' : '');
        }
        field.addEventListener('input', update);
        update();
      });

      /* Submit */
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        /* Honeypot check */
        var pot = form.querySelector('.form-pot input');
        if (pot && pot.value !== '') return;

        /* Cooldown */
        var formId = form.id || form.dataset.formType || 'form';
        var now = Date.now();
        if (lastSubmit[formId] && now - lastSubmit[formId] < COOLDOWN_MS) {
          var remaining = Math.ceil((COOLDOWN_MS - (now - lastSubmit[formId])) / 1000);
          alert('Please wait ' + remaining + ' seconds before submitting again.');
          return;
        }

        /* Validate */
        if (!validateForm(form)) return;

        /* Build message */
        var fd = new FormData(form);
        function d(key) { return (fd.get(key) || '').toString().trim(); }

        var type = form.dataset.formType || 'default';
        var builder = builders[type] || builders['default'];
        var text = encodeURIComponent(builder(d, form));

        /* Record submit time */
        lastSubmit[formId] = Date.now();

        /* Disable button briefly */
        var btn = form.querySelector('[type="submit"]');
        if (btn) {
          btn.setAttribute('data-loading', '1');
          btn.textContent = 'Opening WhatsApp…';
          setTimeout(function () {
            btn.removeAttribute('data-loading');
            btn.textContent = btn.dataset.label || 'Open WhatsApp Message';
          }, 3000);
        }

        showSuccess(form);
        window.open('https://wa.me/' + WA_NUMBER + '?text=' + text, '_blank');
      });
    }

    /* Bind all forms on the page */
    document.querySelectorAll('[data-wa-form]').forEach(bindForm);

    return { bindForm: bindForm };
  }());

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

// ─── FORM TAB SWITCHER ────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.form-tabs').forEach(function (tabs) {
    tabs.querySelectorAll('.form-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.dataset.tab;
        var container = tabs.closest('.form-tabs-container') || document;

        tabs.querySelectorAll('.form-tab').forEach(function (t) {
          t.classList.toggle('active', t === tab);
        });

        container.querySelectorAll('.form-panel').forEach(function (panel) {
          panel.classList.toggle('active', panel.id === target);
        });
      });
    });
  });
});

// ─── BLOG SEARCH & FILTER ─────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('blogSearch');
  var filterBtns = document.querySelectorAll('.blog-filter-btn');
  var blogCards = document.querySelectorAll('.blog-card');
  var noResults = document.getElementById('noResults');
  
  if (!searchInput || !blogCards.length) return;
  
  var currentCategory = 'all';
  var currentSearch = '';
  
  function filterCards() {
    var visibleCount = 0;
    
    blogCards.forEach(function (card) {
      var category = card.dataset.category || '';
      var title = card.querySelector('.blog-card__title')?.textContent.toLowerCase() || '';
      var excerpt = card.querySelector('.blog-card__excerpt')?.textContent.toLowerCase() || '';
      var searchText = (title + ' ' + excerpt).toLowerCase();
      
      var matchesCategory = currentCategory === 'all' || category === currentCategory;
      var matchesSearch = currentSearch === '' || searchText.includes(currentSearch);
      
      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
        // Re-trigger reveal animation
        setTimeout(function() {
          card.classList.add('visible');
        }, 50);
      } else {
        card.style.display = 'none';
        card.classList.remove('visible');
      }
    });
    
    // Show/hide no results message
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }
  
  // Search input handler
  searchInput.addEventListener('input', function () {
    currentSearch = this.value.toLowerCase().trim();
    filterCards();
  });
  
  // Filter button handlers
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active state
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');
      
      // Update current category
      currentCategory = this.dataset.category || 'all';
      filterCards();
    });
  });
  
  // Initial filter
  filterCards();
});
