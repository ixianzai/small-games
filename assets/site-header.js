/* ============================================================
   粤掂 JyutDim · 全站页头注入器
   —— 7 个页面共用一套 markup，页面里不用手写导航条；
   —— 六个活动入口 + 简繁切换，当前页自动高亮；
   —— 简繁切换不另起一套状态，而是去点各页「自己的」切换按钮：
        · 首页 / 粤拼 / 声调 / 复习 → JyutDim.setCharMode()
        · 看图配对 / 词汇连连   → [data-char="trad|simp"]
        · 闯关                → .font-seg__btn[data-font="tc|sc"]
      这样各页原有的重渲染、存档、选中态全部照旧走，不产生第二份真相。
   用法：在 <body> 开头放 <script src="assets/site-header.js"></script>
   ============================================================ */
(function () {
  'use strict';

  var ITEMS = [
    { key: 'picture-match',   href: 'picture-match.html',   icon: 'steamer',  tc: '入門', sc: '入门' },
    { key: 'word-match',      href: 'word-match.html',      icon: 'teapot',   tc: '詞彙', sc: '词汇' },
    { key: 'slang-challenge', href: 'slang-challenge.html', icon: 'mahjong',  tc: '闖掂', sc: '闯掂' },
    { key: 'jyutping',        href: 'jyutping.html',        icon: 'fan',      tc: '粵拼', sc: '粤拼' },
    { key: 'tones',           href: 'tones.html',           icon: 'gong',     tc: '聲調', sc: '声调' },
    { key: 'review',          href: 'review.html',          icon: 'notebook', tc: '複習', sc: '复习' }
  ];

  var BY_KEY = {};
  for (var i = 0; i < ITEMS.length; i++) BY_KEY[ITEMS[i].key] = ITEMS[i];

  /* ---------- 当前页 ---------- */
  function currentKey() {
    var file = (location.pathname || '').split('/').pop() || 'index.html';
    file = file.replace(/\.html?$/i, '');
    return file || 'index';
  }

  /* ---------- markup ---------- */
  function navHTML() {
    var cur = currentKey();
    var links = '';
    for (var i = 0; i < ITEMS.length; i++) {
      var it = ITEMS[i];
      var active = (it.key === cur);
      links +=
        '<a href="' + it.href + '"' +
          (active ? ' class="is-active" aria-current="page"' : '') +
          ' title="' + it.tc + '" aria-label="' + it.tc + '">' +
          '<span class="nav-ico" data-nav-icon="' + it.icon + '" aria-hidden="true"></span>' +
          '<span class="nav-label" data-key="' + it.key + '">' + it.tc + '</span>' +
        '</a>';
    }
    return '' +
      '<nav class="site-nav" aria-label="站点导航">' +
        '<a class="site-nav__brand" href="index.html" title="返回首页">' +
          '<span class="seal" aria-hidden="true">粵</span>' +
          '<span class="brand-text">粵掂</span>' +
        '</a>' +
        '<div class="site-nav__links">' + links + '</div>' +
        '<button class="lang-toggle" type="button" aria-label="切换字体">繁</button>' +
      '</nav>' +
      '<div class="site-nav-spacer" aria-hidden="true"></div>';
  }

  /* ---------- 图标：不依赖 icons.js 的渲染时机，自己填一次 ---------- */
  function fillIcons(root) {
    if (!window.JyutIcon) return;
    var els = root.querySelectorAll('.nav-ico[data-nav-icon]');
    for (var i = 0; i < els.length; i++) {
      els[i].innerHTML = window.JyutIcon(els[i].getAttribute('data-nav-icon'), 'nav');
    }
  }

  /* ---------- 当前字体：三种实现各读各的 ---------- */
  function pageMode() {
    var g = document.querySelector('[data-char].on');
    if (g) return g.getAttribute('data-char') === 'simp' ? 'sc' : 'tc';

    var f = document.querySelector('.font-seg__btn.on');
    if (f) return f.getAttribute('data-font') === 'sc' ? 'sc' : 'tc';

    if (window.JyutDim && typeof window.JyutDim.charMode === 'function') {
      return window.JyutDim.charMode() === 'sc' ? 'sc' : 'tc';
    }
    return 'tc';
  }

  /* ---------- 把页头文字同步到当前字体 ---------- */
  function syncHeader() {
    var nav = document.querySelector('.site-nav');
    if (!nav) return;
    var mode = pageMode();
    var sc = (mode === 'sc');

    var brand = nav.querySelector('.brand-text');
    if (brand) brand.textContent = sc ? '粤掂' : '粵掂';

    var labels = nav.querySelectorAll('.nav-label');
    for (var i = 0; i < labels.length; i++) {
      var it = BY_KEY[labels[i].getAttribute('data-key')];
      if (!it) continue;
      labels[i].textContent = sc ? it.sc : it.tc;
      var link = labels[i].parentNode;
      if (link && link.tagName === 'A') {
        /* 手机上文字会换成图标，所以 title / aria-label 要一直跟着字体走 */
        link.title = sc ? it.sc : it.tc;
        link.setAttribute('aria-label', sc ? it.sc : it.tc);
      }
    }

    var btn = nav.querySelector('.lang-toggle');
    if (btn) {
      /* 与游戏内 繁 / 简 选中态一致：显示「当前」用的字体 */
      btn.textContent = sc ? '简' : '繁';
      btn.setAttribute('aria-label', sc ? '当前为简体，点击切到繁体' : '当前为繁体，点击切到简体');
      btn.title = btn.getAttribute('aria-label');
    }
  }

  /* ---------- 切换：借各页自己的按钮，不另存状态 ---------- */
  function toggleChar() {
    var next = pageMode() === 'tc' ? 'sc' : 'tc';

    var gameBtn = document.querySelector('[data-char="' + (next === 'sc' ? 'simp' : 'trad') + '"]');
    if (gameBtn) { gameBtn.click(); setTimeout(syncHeader, 0); return; }

    var slangBtn = document.querySelector('.font-seg__btn[data-font="' + next + '"]');
    if (slangBtn) { slangBtn.click(); setTimeout(syncHeader, 0); return; }

    if (window.JyutDim && typeof window.JyutDim.setCharMode === 'function') {
      window.JyutDim.setCharMode(next);
    }
    syncHeader();
  }

  /* ---------- 注入 ---------- */
  function inject() {
    if (document.querySelector('.site-nav')) { syncHeader(); return; }

    var host = document.body;
    if (!host) return;
    host.insertAdjacentHTML('afterbegin', navHTML());

    var nav = document.querySelector('.site-nav');
    fillIcons(nav);

    var btn = nav.querySelector('.lang-toggle');
    if (btn) btn.addEventListener('click', toggleChar);

    syncHeader();
  }

  inject();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncHeader);
  }
  window.addEventListener('load', syncHeader);

  /* 各页自己的字体按钮被点时，页头跟着更新 */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('.lang-toggle, [data-char], [data-font]')) setTimeout(syncHeader, 0);
  }, true);

  /* 给会在运行时整块重渲染的页面（闯关）留个手动同步的口子 */
  window.JyutDimHeader = { sync: syncHeader, toggle: toggleChar };
})();
