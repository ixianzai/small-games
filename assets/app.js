/* ============================================================
   粤掂 YutDim · 站点公共脚本
   提供：简繁切换、粤语 TTS（含降级提示）、统一进度 + 错题本
   挂载到 window.YutDim，供首页 / 粤拼 / 声调 / 复习 / 三个游戏使用
   ============================================================ */
(function () {
  'use strict';

  var CHARMODE_KEY = 'yutdim_charmode';
  var PROGRESS_KEY = 'yutdim_progress_v1';

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
    var toggle = document.querySelector('.lang-toggle');
    if (toggle) toggle.textContent = (charMode === 'tc') ? '简' : '繁';
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
    var voices = window.speechSynthesis.getVoices();
    var found = null;
    for (var i = 0; i < voices.length; i++) {
      var lang = (voices[i].lang || '').toLowerCase();
      if (lang.indexOf('yue') >= 0 || lang.indexOf('zh-hk') >= 0 || lang.indexOf('zh-yue') >= 0) {
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
  function checkTts() {
    var banner = document.querySelector('.tts-banner');
    if (!banner || !('speechSynthesis' in window)) return;
    function detect() {
      var ok = hasCantoneseVoice();
      if (!ok) banner.classList.add('show');
    }
    detect();
    window.speechSynthesis.onvoiceschanged = detect;
    setTimeout(detect, 900); // 首次 getVoices 常为空，延迟再查
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

  window.YutDim = {
    charMode: function () { return charMode; },
    setCharMode: setCharMode,
    applyCharMode: applyCharMode,
    speak: speak,
    hasCantoneseVoice: hasCantoneseVoice,
    checkTts: checkTts,
    progress: { record: record, clearWrong: clearWrong, getWrong: getWrong, getStats: getStats }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { applyCharMode(); checkTts(); });
  } else {
    applyCharMode(); checkTts();
  }
})();
