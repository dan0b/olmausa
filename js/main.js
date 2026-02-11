/* ========================================
   OLMA USA — Main JavaScript
   ======================================== */

(function () {
  'use strict';

  // --- DOM Elements ---
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  // --- Sticky Nav on Scroll ---
  function handleScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    updateActiveLink();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Mobile Menu Toggle ---
  hamburger.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('nav__menu--open');
    hamburger.classList.toggle('nav__hamburger--open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('nav__menu--open');
      hamburger.classList.remove('nav__hamburger--open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && navMenu.classList.contains('nav__menu--open')) {
      navMenu.classList.remove('nav__menu--open');
      hamburger.classList.remove('nav__hamburger--open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // --- Active Nav Link Highlighting ---
  function updateActiveLink() {
    var sections = document.querySelectorAll('section[id]');
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  // --- Contact Form Handling ---
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    var name = contactForm.querySelector('#name').value.trim();
    var email = contactForm.querySelector('#email').value.trim();
    var message = contactForm.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Check if Formspree is configured
    var action = contactForm.getAttribute('action');
    if (action.indexOf('YOUR_FORM_ID') !== -1) {
      showStatus('Contact form is not yet configured. Please email us directly.', 'error');
      return;
    }

    // Submit via fetch
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          showStatus('Message sent! We\'ll get back to you soon.', 'success');
          contactForm.reset();
        } else {
          return response.json().then(function (data) {
            if (data.errors) {
              var messages = data.errors.map(function (err) { return err.message; });
              showStatus(messages.join(', '), 'error');
            } else {
              showStatus('Something went wrong. Please try again.', 'error');
            }
          });
        }
      })
      .catch(function () {
        showStatus('Network error. Please check your connection and try again.', 'error');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      });
  });

  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form__status form__status--' + type;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // --- Scroll Fade-in Animations ---
  var fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in--visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeEls.forEach(function (el) {
      el.classList.add('fade-in--visible');
    });
  }

  // --- Particle Network Canvas ---
  var canvas = document.getElementById('hero-canvas');
  var heroSection = document.querySelector('.hero');

  if (canvas && heroSection) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = window.innerWidth < 768 ? 30 : 60;
    var connectionDistance = 120;
    var animFrameId = null;
    var heroVisible = true;

    function resizeCanvas() {
      var dpr = window.devicePixelRatio || 1;
      var rect = heroSection.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      particles = [];
      var rect = heroSection.getBoundingClientRect();
      for (var i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1
        });
      }
    }

    function drawParticles() {
      if (!heroVisible) {
        animFrameId = requestAnimationFrame(drawParticles);
        return;
      }

      var w = canvas.width / (window.devicePixelRatio || 1);
      var h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 180, 216, 0.6)';
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var dx = p.x - p2.x;
          var dy = p.y - p2.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            var opacity = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(0, 180, 216, ' + (opacity * 0.3) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameId = requestAnimationFrame(drawParticles);
    }

    // Track hero visibility to skip drawing when off-screen
    if ('IntersectionObserver' in window) {
      var heroObserver = new IntersectionObserver(function (entries) {
        heroVisible = entries[0].isIntersecting;
      }, { threshold: 0 });
      heroObserver.observe(heroSection);
    }

    // Debounced resize
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        particleCount = window.innerWidth < 768 ? 30 : 60;
        resizeCanvas();
        createParticles();
      }, 200);
    });

    // Respect reduced motion
    var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!motionQuery.matches) {
      resizeCanvas();
      createParticles();
      drawParticles();
    }

    motionQuery.addEventListener('change', function () {
      if (motionQuery.matches) {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        resizeCanvas();
        createParticles();
        drawParticles();
      }
    });
  }

  // --- Initialize ---
  handleScroll();
})();
