/* ============================================================
   粤掂 JyutDim · 站点公共脚本
   提供：简繁切换、粤语 TTS（含降级提示）、统一进度 + 错题本
   挂载到 window.JyutDim，供首页 / 粤拼 / 声调 / 复习 / 三个游戏使用
   ============================================================ */
(function () {
  'use strict';

  var CHARMODE_KEY = 'jyutdim_charmode';
  var PROGRESS_KEY = 'jyutdim_progress_v1';

  /* ---------- 旧键名迁移 ----------
     品牌拼写由 YutDim 统一为 JyutDim，旧键（yutdim_*）里的数据自动搬到新键，
     免得用户已经攒下的错题 / 已学词条 / 简繁偏好丢掉。 */
  function migrateKey(oldKey, newKey) {
    try {
      var v = localStorage.getItem(oldKey);
      if (v === null) return;
      if (localStorage.getItem(newKey) === null) localStorage.setItem(newKey, v);
      localStorage.removeItem(oldKey);
    } catch (e) {}
  }
  migrateKey('yutdim_charmode', CHARMODE_KEY);
  migrateKey('yutdim_progress_v1', PROGRESS_KEY);

  /* ---------- 简繁切换 ----------
     页面里把繁体写成元素文本，简体写在 data-sc 属性；
     首次运行时自动把繁体回填到 data-tc。 */
  var charMode = 'tc';
  try { charMode = localStorage.getItem(CHARMODE_KEY) || 'tc'; } catch (e) {}

  function applyCharMode() {
    document.documentElement.setAttribute('data-charmode', charMode);
    var els = document.querySelectorAll('[data-sc]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (!el.hasAttribute('data-tc')) el.setAttribute('data-tc', el.textContent);
      el.textContent = (charMode === 'sc') ? el.getAttribute('data-sc') : el.getAttribute('data-tc');
    }
    /* 按钮标签显示「当前」界面所用的字体，而非「点击后会切到」的字体，
       与游戏内的 繁 / 简 选中态保持一致，避免误导。 */
    var toggle = document.querySelector('.lang-toggle');
    if (toggle) toggle.textContent = (charMode === 'sc') ? '简' : '繁';
  }
  function setCharMode(mode) {
    charMode = (mode === 'sc') ? 'sc' : 'tc';
    try { localStorage.setItem(CHARMODE_KEY, charMode); } catch (e) {}
    applyCharMode();
  }

  /* ---------- 粤语 TTS ---------- */
  var cachedVoice = null;
  function getCantoneseVoice() {
    if (cachedVoice !== null) return cachedVoice;
    if (!('speechSynthesis' in window)) { cachedVoice = false; return false; }
    var voices = [];
    try { voices = window.speechSynthesis.getVoices() || []; } catch (e) { voices = []; }
    var found = null;
    for (var i = 0; i < voices.length; i++) {
      var lang = (voices[i].lang || '').toLowerCase();
      var name = voices[i].name || '';
      var lname = name.toLowerCase();
      if (lang.indexOf('yue') >= 0 || lang.indexOf('zh-hk') >= 0 || lang.indexOf('zh-yue') >= 0 ||
          lname.indexOf('cantonese') >= 0 || lname.indexOf('hong kong') >= 0 ||
          name.indexOf('粵語') >= 0 || name.indexOf('粤语') >= 0 || name.indexOf('廣東話') >= 0 || name.indexOf('广东话') >= 0) {
        found = voices[i]; break;
      }
    }
    cachedVoice = found || false;
    return cachedVoice;
  }
  function hasCantoneseVoice() { cachedVoice = null; return !!getCantoneseVoice(); }
  function speak(text) {
    if (!('speechSynthesis' in window) || !text) return false;
    try { window.speechSynthesis.cancel(); } catch (e) {}
    var u = new SpeechSynthesisUtterance(text);
    var v = getCantoneseVoice();
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'zh-HK'; }
    u.rate = 0.82; u.pitch = 1;
    window.speechSynthesis.speak(u);
    return true;
  }

  /* ---------- 粤语语音包提示（统一组件） ----------
     页面里只要有 .voice-warn 或 .tts-banner 容器，就会自动接管它的内容：
     更早出现、可重试、可暂时关掉；关掉只作用于本次浏览（下次再来会再提醒一次）。 */
  var VOICE_DISMISS_KEY = 'jyutdim_voice_dismissed';

  function voiceDismissed() {
    try { return sessionStorage.getItem(VOICE_DISMISS_KEY) === '1'; } catch (e) { return false; }
  }
  function dismissVoiceNotice() {
    try { sessionStorage.setItem(VOICE_DISMISS_KEY, '1'); } catch (e) {}
    var box = document.querySelector('.voice-warn') || document.querySelector('.tts-banner');
    if (box) box.classList.remove('show');
  }
  function voiceSteps() {
    var ua = (navigator.userAgent || '').toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) return 'iPhone：设置 → 辅助功能 → 朗读内容 → 声音 → 中文 → 粤语（香港）';
    if (/android/.test(ua)) return '安卓：设置 → 系统 → 语言和输入法 → 文字转语音 → 安装「中文（粤语）」';
    if (/windows/.test(ua)) return 'Windows：设置 → 时间和语言 → 语言和区域 → 添加「中文（粤语）」';
    if (/mac os|macintosh/.test(ua)) return 'Mac：系统设置 → 辅助功能 → 朗读内容 → 系统声音 → 管理声音 → 粤语';
    return '在系统设置里找到「语言 / 朗读内容」，安装「中文（粤语）」语音包';
  }
  function voiceNoticeCSS() {
    if (document.getElementById('jyutdim-voice-css')) return;
    var css = document.createElement('style');
    css.id = 'jyutdim-voice-css';
    css.textContent =
      '.yvd-host{max-width:960px;margin:14px auto 0;padding:0 20px;border:none;background:transparent;box-shadow:none;}' +
      '.yvd{display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border:1px solid #e8c97a;border-radius:14px;' +
      'background:#fffaf0;color:#7a5c1e;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;' +
      'font-size:13.5px;line-height:1.65;box-shadow:0 4px 14px rgba(201,162,74,.16);}' +
      '.yvd__ico{font-size:20px;line-height:1.3;flex:0 0 auto;}' +
      '.yvd__body{flex:1;min-width:0;}' +
      '.yvd__title{margin:0 0 3px;font-weight:900;color:#8a5a1e;font-size:14px;}' +
      '.yvd__sub{margin:0 0 6px;color:#96702c;font-size:12.5px;}' +
      '.yvd__how{margin:0;color:#8a6a1e;font-size:12.5px;font-weight:700;word-break:break-word;}' +
      '.yvd__btns{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;}' +
      '.yvd__btn{font:inherit;font-size:12.5px;font-weight:800;cursor:pointer;padding:7px 14px;border-radius:999px;' +
      'border:1px solid #d8b562;background:#fff;color:#7a5c1e;}' +
      '.yvd__btn:hover{background:#fff6e0;}' +
      '.yvd__btn--ghost{background:transparent;border-color:#e3d0a0;color:#96702c;}' +
      '@media(max-width:720px){.yvd{flex-direction:column;gap:6px;}.yvd__ico{font-size:18px;}}';
    document.head.appendChild(css);
  }
  function renderVoiceNotice(hasVoice, box) {
    box = box || document.querySelector('.voice-warn') || document.querySelector('.tts-banner');
    if (!box) return;
    if (hasVoice || voiceDismissed()) { box.classList.remove('show'); return; }
    voiceNoticeCSS();
    box.classList.add('yvd-host');
    box.innerHTML =
      '<div class="yvd">' +
        '<span class="yvd__ico"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" style="vertical-align:-0.125em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l4 4M21 9l-4 4"/></svg></span>' +
        '<div class="yvd__body">' +
          '<p class="yvd__title">未检测到粤语语音包</p>' +
          '<p class="yvd__sub">发音按钮暂时没声音，游戏其他部分照常玩；装好语音包再点「重新检测」就行。</p>' +
          '<p class="yvd__how">' + voiceSteps() + '</p>' +
          '<div class="yvd__btns">' +
            '<button class="yvd__btn" type="button" data-yvd="retry"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" style="vertical-align:-0.125em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 1 0-2 5.5"/><path d="M20 5v6h-6"/></svg> 我已装好，重新检测</button>' +
            '<button class="yvd__btn yvd__btn--ghost" type="button" data-yvd="dismiss">先不管，继续玩</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    if (!box.__yvdWired) {
      box.__yvdWired = true;
      box.addEventListener('click', function (e) {
        var t = e.target;
        var hit = (t && t.closest) ? t.closest('[data-yvd]') : null;
        if (!hit) return;
        var act = hit.getAttribute('data-yvd');
        if (act === 'retry') {
          cachedVoice = null;
          try { document.dispatchEvent(new CustomEvent('jyutdim:voiceretry')); } catch (err) {}
          setTimeout(checkTts, 400);
        } else if (act === 'dismiss') {
          dismissVoiceNotice();
        }
      });
    }
    box.classList.add('show');
  }

  /* ---------- 轻提示（toast） ---------- */
  var toastTimer = null;
  var toastCssReady = false;
  function toast(msg) {
    if (!msg) return;
    if (!toastCssReady) {
      toastCssReady = true;
      var tcss = document.createElement('style');
      tcss.id = 'jyutdim-toast-css';
      tcss.textContent =
        '.jyut-toast{position:fixed;left:50%;bottom:30px;transform:translate(-50%,10px);max-width:86vw;' +
        'padding:11px 18px;border-radius:999px;background:rgba(35,35,35,.92);color:#fff;font-size:13px;' +
        'line-height:1.5;text-align:center;opacity:0;pointer-events:none;z-index:99999;' +
        'transition:opacity .2s ease,transform .2s ease;}' +
        '.jyut-toast.show{opacity:1;transform:translate(-50%,0);}';
      document.head.appendChild(tcss);
    }
    var el = document.getElementById('jyutdim-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'jyutdim-toast';
      el.className = 'jyut-toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2800);
  }

  /* 点了发音但没有语音包时调用：给一句即时反馈，并把提示条重新亮出来。
     连点多个词条时做个节流，避免提示一直闪。 */
  var lastVoiceHintAt = 0;
  function voiceHint() {
    var now = Date.now();
    if (now - lastVoiceHintAt < 1600) return;
    lastVoiceHintAt = now;
    try { sessionStorage.removeItem(VOICE_DISMISS_KEY); } catch (e) {}
    renderVoiceNotice(false);
    toast('还没装粤语语音包，暂时没声音；看页面上的提示条');
  }

  function checkTts() {
    var box = document.querySelector('.voice-warn') || document.querySelector('.tts-banner');
    if (!box || !('speechSynthesis' in window)) return;
    var tries = 0;
    function detect() {
      var voices = [];
      try { voices = window.speechSynthesis.getVoices() || []; } catch (e) { voices = []; }
      // 语音列表未就绪时不要急着下结论，否则会误报
      if (!voices.length && tries < 10) { tries++; setTimeout(detect, 400); return; }
      renderVoiceNotice(!!getCantoneseVoice(), box);
    }
    detect();
    try { window.speechSynthesis.addEventListener('voiceschanged', detect); } catch (e) {}
    setTimeout(detect, 1200);
    // iOS 上首次 getVoices 常为空，用户第一次交互后再查一次
    var once = function () {
      document.removeEventListener('pointerdown', once);
      setTimeout(detect, 300);
    };
    document.addEventListener('pointerdown', once);
  }

  /* ---------- 统一进度 + 错题本 ---------- */
  function loadProgress() {
    try {
      var raw = localStorage.getItem(PROGRESS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { words: {} };
  }
  function saveProgress(p) {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
  }
  function record(term, correct, jyutping) {
    if (!term) return;
    term = String(term).trim();
    if (!term) return;
    var p = loadProgress();
    var w = p.words[term] || { seen: 0, correct: 0, wrong: 0, lastAt: 0 };
    if (jyutping) w.jyutping = jyutping;
    w.seen++;
    if (correct) w.correct++; else { w.wrong++; w.lastAt = Date.now(); }
    p.words[term] = w;
    saveProgress(p);
  }
  function clearWrong(term) {
    if (!term) return;
    var p = loadProgress();
    if (p.words[term]) { p.words[term].wrong = 0; saveProgress(p); }
  }
  function getWrong() {
    var p = loadProgress();
    var list = [];
    for (var term in p.words) {
      var w = p.words[term];
      if (w.wrong > 0) list.push({ term: term, wrong: w.wrong, correct: w.correct, lastAt: w.lastAt || 0 });
    }
    list.sort(function (a, b) { return b.lastAt - a.lastAt; });
    return list;
  }
  function getStats() {
    var p = loadProgress();
    var terms = Object.keys(p.words);
    var mastered = 0;
    for (var i = 0; i < terms.length; i++) if (p.words[terms[i]].correct > 0) mastered++;
    return { words: terms.length, mastered: mastered };
  }

  window.JyutDim = {
    charMode: function () { return charMode; },
    setCharMode: setCharMode,
    applyCharMode: applyCharMode,
    speak: speak,
    hasCantoneseVoice: hasCantoneseVoice,
    checkTts: checkTts,
    renderVoiceNotice: renderVoiceNotice,
    dismissVoiceNotice: dismissVoiceNotice,
    toast: toast,
    voiceHint: voiceHint,
    progress: { record: record, clearWrong: clearWrong, getWrong: getWrong, getStats: getStats }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { applyCharMode(); checkTts(); });
  } else {
    applyCharMode(); checkTts();
  }
})();
