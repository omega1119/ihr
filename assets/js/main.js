(function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Cookie Consent Injector ──────────────────────────────
  // Usage: <body data-cookie-consent>
  function initCookieConsent() {
    if (!document.body || !document.body.hasAttribute('data-cookie-consent')) return;

    // Avoid double-injecting if the script runs more than once.
    if (document.querySelector('.cookie-consent')) return;

    // Resolve a root-relative privacy link so it works from any page depth.
    const privacyHref = '/privacy.html';

    const banner = document.createElement('div');
    banner.className = 'cookie-consent';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<div class="cookie-consent__content">' +
        '<div class="cookie-consent__text">' +
          'We use cookies to analyse site traffic and improve your experience. ' +
          'By clicking "Accept", you consent to our use of cookies. ' +
          '<a href="' + privacyHref + '">Privacy Policy</a>' +
        '</div>' +
        '<div class="cookie-consent__buttons">' +
          '<button type="button" class="cookie-consent__btn cookie-consent__btn--accept">Accept</button>' +
          '<button type="button" class="cookie-consent__btn cookie-consent__btn--deny">Deny</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    const acceptBtn = banner.querySelector('.cookie-consent__btn--accept');
    const denyBtn = banner.querySelector('.cookie-consent__btn--deny');
    const consent = (function () {
      try { return localStorage.getItem('cookieConsent'); } catch (_) { return null; }
    })();

    if (!consent) {
      banner.classList.add('show');
    } else if (consent === 'accepted') {
      enableAnalytics();
    }

    acceptBtn.addEventListener('click', function () {
      try { localStorage.setItem('cookieConsent', 'accepted'); } catch (_) { /* ignore */ }
      banner.classList.remove('show');
      enableAnalytics();
    });

    denyBtn.addEventListener('click', function () {
      try { localStorage.setItem('cookieConsent', 'denied'); } catch (_) { /* ignore */ }
      banner.classList.remove('show');
      disableAnalytics();
    });
  }

  function enableAnalytics() {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  }

  function disableAnalytics() {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
  }

  initCookieConsent();

  const revealNodes = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealNodes.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealNodes.forEach(function (node) {
      observer.observe(node);
    });
  } else {
    revealNodes.forEach(function (node) {
      node.classList.add('is-visible');
    });
  }

  const feedContainer = document.getElementById('instagram-feed');
  if (!feedContainer) {
    return;
  }

  const BEHOLD_FEED_URL = 'https://feeds.behold.so/gyBRr7hGsNpXajj6h7E4';
  const MAX_POSTS = 9;

  function formatDate(value) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function pickThumbnail(post) {
    const sizes = post.sizes || {};
    const medium = sizes.medium && sizes.medium.mediaUrl;
    const small = sizes.small && sizes.small.mediaUrl;
    const large = sizes.large && sizes.large.mediaUrl;
    if (medium) return medium;
    if (small) return small;
    if (large) return large;
    if (post.mediaType === 'VIDEO' && post.thumbnailUrl) return post.thumbnailUrl;
    return post.mediaUrl || '';
  }

  function renderPosts(posts) {
    feedContainer.innerHTML = '';

    if (!posts.length) {
      renderEmpty();
      return;
    }

    posts.forEach(function (post) {
      const a = document.createElement('a');
      a.className = 'feed-tile';
      a.href = post.permalink || 'https://www.instagram.com/vosforisofficial/';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';

      const thumb = pickThumbnail(post);
      if (thumb) {
        const img = document.createElement('img');
        img.className = 'feed-tile__image';
        img.src = thumb;
        img.alt = (post.prunedCaption || '').slice(0, 120);
        img.loading = 'lazy';
        a.appendChild(img);
      }

      if (post.mediaType === 'VIDEO' || post.isReel) {
        const badge = document.createElement('span');
        badge.className = 'feed-tile__badge';
        badge.textContent = post.isReel ? 'Reel' : 'Video';
        a.appendChild(badge);
      } else if (post.mediaType === 'CAROUSEL_ALBUM') {
        const badge = document.createElement('span');
        badge.className = 'feed-tile__badge';
        badge.textContent = 'Album';
        a.appendChild(badge);
      }

      const overlay = document.createElement('div');
      overlay.className = 'feed-tile__overlay';

      if (post.timestamp) {
        const time = document.createElement('time');
        time.className = 'feed-tile__date';
        time.dateTime = post.timestamp;
        time.textContent = formatDate(post.timestamp);
        overlay.appendChild(time);
      }

      const caption = post.prunedCaption || post.caption || '';
      if (caption) {
        const p = document.createElement('p');
        p.className = 'feed-tile__caption';
        p.textContent = caption.length > 110 ? caption.slice(0, 107) + '...' : caption;
        overlay.appendChild(p);
      }

      a.appendChild(overlay);
      feedContainer.appendChild(a);
    });
  }

  function renderEmpty() {
    feedContainer.innerHTML = '';
    const a = document.createElement('a');
    a.className = 'feed-tile feed-tile--empty';
    a.href = 'https://www.instagram.com/vosforisofficial/';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML =
      '<div class="feed-tile__overlay"><p class="feed-tile__caption">Open Instagram Profile</p></div>';
    feedContainer.appendChild(a);
  }

  function renderLoading() {
    feedContainer.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      const div = document.createElement('div');
      div.className = 'feed-tile feed-tile--skeleton';
      feedContainer.appendChild(div);
    }
  }

  async function loadInstagramFeed() {
    renderLoading();

    const controller = new AbortController();
    const timeout = setTimeout(function () {
      controller.abort();
    }, 8000);

    try {
      const response = await fetch(BEHOLD_FEED_URL, { signal: controller.signal });
      if (!response.ok) {
        throw new Error('Feed request failed: ' + response.status);
      }

      const data = await response.json();
      const posts = Array.isArray(data.posts) ? data.posts.slice(0, MAX_POSTS) : [];
      renderPosts(posts);
    } catch (_error) {
      renderEmpty();
    } finally {
      clearTimeout(timeout);
    }
  }

  loadInstagramFeed();
})();
