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

  const fallbackPosts = [
    {
      title: 'Follow @vosforisofficial on Instagram',
      url: 'https://www.instagram.com/vosforisofficial/'
    },
    {
      title: 'Watch: Decoherence Lyric Video',
      url: 'https://www.youtube.com/watch?v=hMjrpQq2tEE'
    },
    {
      title: 'Listen: Cosmic Cenotaph',
      url: 'https://vosforis.bandcamp.com/album/cosmic-cenotaph'
    }
  ];

  function renderPosts(posts, withDate) {
    feedContainer.innerHTML = '';

    posts.forEach(function (post) {
      const article = document.createElement('article');
      article.className = 'card feed-item';

      const title = document.createElement('h3');
      title.textContent = post.title;

      article.appendChild(title);

      if (withDate && post.date) {
        const time = document.createElement('time');
        const d = new Date(post.date);
        time.dateTime = d.toISOString();
        time.textContent = d.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        article.appendChild(time);
      }

      const link = document.createElement('a');
      link.className = 'text-link';
      link.href = post.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Open Post';

      article.appendChild(link);
      feedContainer.appendChild(article);
    });
  }

  function parseRss(xmlText) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, 'text/xml');
    const items = Array.from(xml.querySelectorAll('item')).slice(0, 6);

    return items
      .map(function (item) {
        const title = (item.querySelector('title') || {}).textContent || '';
        const link = (item.querySelector('link') || {}).textContent || '';
        const pubDate = (item.querySelector('pubDate') || {}).textContent || '';

        if (!title || !link) {
          return null;
        }

        return {
          title: title.replace(/^\s*\[[^\]]+\]\s*/, '').trim(),
          url: link.trim(),
          date: pubDate.trim()
        };
      })
      .filter(Boolean);
  }

  async function loadInstagramFeed() {
    const baseFeed = 'https://rsshub.app/instagram/user/vosforisofficial';
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(baseFeed);

    const controller = new AbortController();
    const timeout = setTimeout(function () {
      controller.abort();
    }, 7000);

    try {
      const response = await fetch(proxyUrl, { signal: controller.signal });
      if (!response.ok) {
        throw new Error('Feed request failed');
      }

      const xmlText = await response.text();
      const posts = parseRss(xmlText);

      if (!posts.length) {
        throw new Error('No posts available');
      }

      renderPosts(posts, true);
    } catch (_error) {
      renderPosts(fallbackPosts, false);
    } finally {
      clearTimeout(timeout);
    }
  }

  loadInstagramFeed();
})();
