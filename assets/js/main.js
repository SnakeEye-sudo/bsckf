/* भगवान श्री चित्रगुप्त कल्याण फाउंडेशन — shared JS (हर page पर चलता है) */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- extra.css + display font + PWA manifest inject ---- */
  if (!document.querySelector('link[href*="extra.css"]')) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = 'assets/css/extra.css';
    document.head.appendChild(l);
  }
  if (!document.querySelector('link[href*="Yatra"]')) {
    const f = document.createElement('link');
    f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Yatra+One&display=swap';
    document.head.appendChild(f);
  }
  if (!document.querySelector('link[rel="manifest"]')) {
    const m = document.createElement('link'); m.rel = 'manifest'; m.href = 'manifest.json';
    document.head.appendChild(m);
    const tc = document.createElement('meta'); tc.name = 'theme-color'; tc.content = '#6b0f1a';
    document.head.appendChild(tc);
  }

  const WA1 = (typeof NGO !== 'undefined') ? NGO.whatsapp1 : '919301353166';

  /* ============ SPLASH: सिर्फ़ Homepage पर — logo प्रकट → expand → reveal ============ */
  const isHomePage = /(^|\/)(index\.html)?$/.test(location.pathname);
  if (isHomePage) {
    const splash = document.createElement('div');
    splash.className = 'splash';
    splash.innerHTML = `
      <div class="splash-core">
        <span class="splash-ring"></span><span class="splash-ring2"></span>
        <img class="splash-logo" src="assets/img/logo.png" alt="श्री चित्रगुप्त"
             onerror="this.onerror=null;this.src='assets/img/deity.png'">
        <div class="splash-mantra">॥ श्री चित्रगुप्ताय नमः ॥</div>
      </div>`;
    document.body.prepend(splash);
    document.body.classList.add('splash-lock');
    let closed = false;
    const closeSplash = () => {
      if (closed) return; closed = true;
      splash.classList.add('hide');
      document.body.classList.remove('splash-lock');
      setTimeout(() => splash.remove(), 850);
    };
    setTimeout(closeSplash, 2300);   /* logo bloom के बाद अपने आप खुले */
    splash.addEventListener('click', closeSplash);
  }

  /* ============ NAV: नए links inject (एक्सप्लोर, परिवार) ============ */
  const navUl = document.querySelector('.main-nav ul');
  if (navUl && !navUl.querySelector('a[href="explore.html"]')) {
    const galleryLi = navUl.querySelector('a[href="gallery.html"]')?.parentElement;
    const mk = (href, txt) => { const li = document.createElement('li'); li.innerHTML = `<a href="${href}">${txt}</a>`; return li; };
    if (galleryLi) {
      navUl.insertBefore(mk('explore.html', 'एक्सप्लोर'), galleryLi);
      navUl.insertBefore(mk('parivar.html', 'परिवार'), galleryLi);
    }
  }

  /* ---- Header scroll state ---- */
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        nav.classList.remove('open');
      })
    );
  }

  /* ---- Active nav link ---- */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* ---- Reveal-on-scroll ---- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---- Animated counters ---- */
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / 1800, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('hi-IN') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

  /* ============ AMBIENT SPARKLES (alive feel — हर page) ============ */
  const amb = document.createElement('div');
  amb.className = 'ambience';
  const glyphs = ['🪔', '✦', '✧', '🖋️', '✦', '✧', '🪔', '✦'];
  amb.innerHTML = glyphs.map((g, i) =>
    `<span class="amb-spark" style="left:${(i * 13 + 5) % 95}%; animation-delay:${i * 2.3}s; animation-duration:${14 + (i % 4) * 4}s; font-size:${.7 + (i % 3) * .35}rem">${g}</span>`
  ).join('');
  document.body.appendChild(amb);

  /* ============ WHATSAPP FLOAT BUTTON ============ */
  const waFloat = document.createElement('a');
  waFloat.className = 'wa-float';
  waFloat.href = `https://wa.me/${WA1}?text=${encodeURIComponent('🙏 जय चित्रगुप्त! मुझे फाउंडेशन के बारे में जानकारी चाहिए।')}`;
  waFloat.target = '_blank'; waFloat.rel = 'noopener';
  waFloat.title = 'WhatsApp पर संपर्क करें';
  waFloat.innerHTML = `<svg viewBox="0 0 32 32" width="30" height="30" fill="#fff"><path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.2c1.9 1 4 1.6 6.2 1.6h.5c6.6 0 12-5.3 12-11.9C30 8.3 24.6 3 16 3zm5.9 16.8c-.3.8-1.5 1.5-2.4 1.7-.6.1-1.4.2-4.2-.9-3.5-1.5-5.8-5-6-5.3-.2-.2-1.4-1.9-1.4-3.7s.9-2.6 1.3-3c.3-.3.7-.4 1-.4h.7c.2 0 .5-.1.8.6.3.8 1 2.7 1.1 2.9.1.2.2.4 0 .7-.1.2-.2.4-.4.6l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.7 2.2 2.7 1.5 1.4 2.8 1.8 3.2 2 .4.2.6.1.9-.1.2-.3 1-1.2 1.3-1.6.3-.4.5-.3.9-.2.4.1 2.2 1 2.6 1.2.4.2.6.3.7.5.1.2.1 1-.2 1.8z"/></svg>`;
  document.body.appendChild(waFloat);

  /* ============ SUGGESTION PANEL (सुझाव → WhatsApp) ============ */
  const sugBtn = document.createElement('button');
  sugBtn.className = 'sug-btn';
  sugBtn.innerHTML = '💡 <span>सुझाव दें</span>';
  document.body.appendChild(sugBtn);

  const sugModal = document.createElement('div');
  sugModal.className = 'sug-modal';
  sugModal.innerHTML = `
    <div class="sug-card">
      <button class="sug-close" aria-label="बंद करें">✕</button>
      <h3>💡 अपना सुझाव दें</h3>
      <p>आपका सुझाव सीधे फाउंडेशन के WhatsApp पर पहुँचेगा।</p>
      <input type="text" id="sugName" placeholder="आपका नाम">
      <input type="text" id="sugCity" placeholder="जिला / शहर">
      <textarea id="sugText" rows="4" placeholder="अपना सुझाव लिखें..."></textarea>
      <button class="btn btn-saffron sug-send">WhatsApp पर भेजें ➤</button>
    </div>`;
  document.body.appendChild(sugModal);

  sugBtn.addEventListener('click', () => sugModal.classList.add('open'));
  sugModal.querySelector('.sug-close').addEventListener('click', () => sugModal.classList.remove('open'));
  sugModal.addEventListener('click', e => { if (e.target === sugModal) sugModal.classList.remove('open'); });
  sugModal.querySelector('.sug-send').addEventListener('click', () => {
    const name = document.getElementById('sugName').value.trim();
    const city = document.getElementById('sugCity').value.trim();
    const text = document.getElementById('sugText').value.trim();
    if (!text) { document.getElementById('sugText').focus(); return; }
    const msg = `💡 *सुझाव — फाउंडेशन वेबसाइट*\n👤 नाम: ${name || '—'}\n📍 स्थान: ${city || '—'}\n\n📝 ${text}`;
    window.open(`https://wa.me/${WA1}?text=${encodeURIComponent(msg)}`, '_blank');
    sugModal.classList.remove('open');
  });

  /* ============ FOOTER GIFT CREDIT (हर page) ============ */
  const fb = document.querySelector('.footer-bottom');
  if (fb && !document.querySelector('.gift-credit')) {
    const credit = document.createElement('div');
    credit.className = 'gift-credit';
    credit.innerHTML = `🎁 यह वेबसाइट समाज के हित के लिए <strong>चित्रांश इं. संगम कृष्णा (IITian)</strong> द्वारा सहर्ष आजीवन भेंट 💛<br>
      <span style="font-size:.82rem;opacity:.85"><a href="terms.html" style="color:#fff3c4;text-decoration:underline">नियम व शर्तें</a></span>`;
    fb.parentElement.insertBefore(credit, fb);
  }

  /* ============ SMOOTH PAGE TRANSITIONS ============ */
  document.body.classList.add('page-enter');
  document.querySelectorAll('a[href$=".html"]').forEach(a => {
    if (a.target === '_blank' || a.href.startsWith('http') && !a.href.includes(location.host) ) return;
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#')) return;
      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(() => location.href = href, 320);
    });
  });

  /* ============ NAV: कथाएँ + कैथी लिपि links ============ */
  const navUl2 = document.querySelector('.main-nav ul');
  if (navUl2 && !navUl2.querySelector('a[href="kathayen.html"]')) {
    const kathaLi = navUl2.querySelector('a[href="katha.html"]')?.parentElement;
    const mk2 = (href, txt) => { const li = document.createElement('li'); li.innerHTML = `<a href="${href}">${txt}</a>`; return li; };
    if (kathaLi) {
      kathaLi.after(mk2('kaithi.html', 'कैथी लिपि'));
      kathaLi.after(mk2('kathayen.html', 'कथाएँ'));
    }
  }

  /* ============ SCROLL PROGRESS — कलम की स्याही रेखा ============ */
  const ink = document.createElement('div');
  ink.className = 'ink-progress';
  ink.innerHTML = '<div class="ink-line"></div><span class="ink-pen">🖋️</span>';
  document.body.appendChild(ink);
  const inkLine = ink.querySelector('.ink-line');
  const inkPen = ink.querySelector('.ink-pen');
  const updInk = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    const p = h > 0 ? (scrollY / h) * 100 : 0;
    inkLine.style.width = p + '%';
    inkPen.style.left = `calc(${p}% - 12px)`;
  };
  addEventListener('scroll', updInk, { passive: true }); updInk();

  /* ============ MOUSE FOLLOWER — कलम + सुनहरी स्याही ============ */
  if (matchMedia('(pointer: fine)').matches) {
    const quill = document.createElement('div');
    quill.className = 'quill-cursor';
    quill.textContent = '🖋️';
    document.body.appendChild(quill);
    let mx = -100, my = -100, qx = -100, qy = -100, lastDot = 0;
    addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      const now = performance.now();
      if (now - lastDot > 50) {
        lastDot = now;
        const dot = document.createElement('span');
        dot.className = 'ink-dot';
        dot.style.left = (mx + (Math.random() * 10 - 5)) + 'px';
        dot.style.top = (my + 10 + Math.random() * 6) + 'px';
        document.body.appendChild(dot);
        setTimeout(() => dot.remove(), 900);
      }
    });
    (function follow() {
      qx += (mx - qx) * .18; qy += (my - qy) * .18;
      quill.style.transform = `translate(${qx + 8}px, ${qy - 26}px) rotate(38deg)`;
      requestAnimationFrame(follow);
    })();
    document.addEventListener('mouseleave', () => quill.style.opacity = 0);
    document.addEventListener('mouseenter', () => quill.style.opacity = 1);
  }

  /* ============ VISIT COUNTER (footer) ============ */
  const fb2 = document.querySelector('.footer-bottom');
  if (fb2) {
    const vc = document.createElement('div');
    vc.className = 'visit-counter';
    vc.innerHTML = '🪔 दर्शन संख्या: <strong id="visitNum">…</strong>';
    fb2.appendChild(vc);
    const show = n => document.getElementById('visitNum').textContent = Number(n).toLocaleString('hi-IN');
    fetch('https://abacus.jasoncameron.dev/hit/bsckf-bihar/darshan')
      .then(r => r.json()).then(d => show(d.value))
      .catch(() => {
        const n = (parseInt(localStorage.getItem('localVisits') || '0', 10) + 1);
        localStorage.setItem('localVisits', n); show(n);
      });
  }

  /* ============ PWA: service worker + install banner ============ */
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  let deferredPrompt = null;
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; maybeShowInstall(); });
  function maybeShowInstall() {
    if (localStorage.getItem('pwaDismissed') || document.querySelector('.pwa-banner')) return;
    setTimeout(() => {
      const b = document.createElement('div');
      b.className = 'pwa-banner';
      b.innerHTML = `
        <img src="assets/img/icon-192.png" alt="App icon">
        <div class="pwa-text"><strong>App बनाइए! 📲</strong><span>फाउंडेशन को अपने phone की home screen पर रखें — एक tap में।</span></div>
        <button class="btn btn-saffron pwa-install">Install</button>
        <button class="pwa-later">बाद में</button>`;
      document.body.appendChild(b);
      requestAnimationFrame(() => b.classList.add('show'));
      b.querySelector('.pwa-install').addEventListener('click', async () => {
        if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; }
        else alert('📲 अपने browser के menu में "Add to Home Screen / Install App" चुनें।');
        b.remove(); localStorage.setItem('pwaDismissed', '1');
      });
      b.querySelector('.pwa-later').addEventListener('click', () => {
        b.classList.remove('show'); setTimeout(() => b.remove(), 400);
        localStorage.setItem('pwaDismissed', '1');
      });
    }, 3500);
  }
  /* iOS / fallback: install prompt event नहीं आता, फिर भी एक बार बताओ */
  if (!localStorage.getItem('pwaDismissed') && !matchMedia('(display-mode: standalone)').matches
      && location.protocol.startsWith('http')) {
    setTimeout(() => { if (!deferredPrompt) maybeShowInstall(); }, 6000);
  }

  /* ---- Contact / membership form (demo handler) ---- */
  document.querySelectorAll('form[data-demo]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('🙏 धन्यवाद! आपका संदेश प्राप्त हुआ। हम शीघ्र ही आपसे संपर्क करेंगे।');
      form.reset();
    });
  });
});
