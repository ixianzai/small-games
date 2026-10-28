/* ============================================================
   粤语词条发音（预录音频优先）
   ------------------------------------------------------------
   两个游戏原来都靠 speechSynthesis + 系统粤语语音包，问题是：
     1. 没装粤语语音包（Windows / 多数安卓）就完全没声音；
     2. 系统 TTS 会按自己的判断读多音字，同一个字可能读错
        （例如 行 / 長 / 樂 都有两个读音）；
     3. 每台设备的音色、语速都不一样。

   所以词条改用「按粤拼预录」的音频文件：
     assets/audio/words/jp/<粤拼 slug>.m4a
   键是读音不是汉字 —— 猫 / 貓 共用一个文件，简繁两版也不会
   各录一遍；同音字（詩 / 師 / 司 都是 si1）也自动复用。
   录音是 `say -v Sinji "<粤拼>"` 合成的（Sinji 支持粤拼输入），
   所以不受多音字影响。

   兜底顺序：jp/ 录音 → 系统 TTS。
   文件缺失（老师自己加的词）也不会没声音。
   ============================================================ */
(function () {
  'use strict';

  var DIR = 'assets/audio/words/jp/';
  var SOURCES = [DIR];

  var miss = Object.create(null);   /* 已知 404 的完整路径，避免每次点都重试 */
  var cur = null;                   /* 当前正在播的 Audio，用于互相打断 */

  /* 粤拼 → 文件名：maau1 → maau1，hung4 maau1 → hung4_maau1 */
  function slug(jyutping) {
    return String(jyutping || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  }

  function has(jyutping) {
    var s = slug(jyutping);
    return !!s && !miss[DIR + s + '.m4a'];
  }

  function stop() {
    if (cur) {
      try { cur.pause(); cur.currentTime = 0; } catch (e) {}
      cur = null;
    }
    if (window.speechSynthesis) {
      try { speechSynthesis.cancel(); } catch (e) {}
    }
  }

  /* play(jyutping, { fallback, rate }) —— fallback 是念不出文件时用的系统 TTS；
     rate 是播放倍速（录音本身是自然语速，1.0 = 原速） */
  function play(jyutping, opts) {
    opts = opts || {};
    var fallback = opts.fallback;
    var s = slug(jyutping);

    if (!s) { if (fallback) fallback(); return false; }

    /* 语速档位：录音按倍速播，音高不变（现代浏览器 preservesPitch 默认开） */
    var rate = Number(opts.rate);
    if (rate && isFinite(rate)) rate = Math.max(0.6, Math.min(1.35, rate));
    else rate = 0;

    stop();
    trySource(0);

    function trySource(i) {
      if (i >= SOURCES.length) { if (fallback) fallback(); return; }

      var url = SOURCES[i] + s + '.m4a';
      if (miss[url]) { trySource(i + 1); return; }

      var a;
      try { a = new Audio(url); } catch (e) { trySource(i + 1); return; }

      cur = a;
      if (rate) a.playbackRate = rate;

      /* 文件不存在 / 解码失败 → 记住这个路径，换下一个来源 */
      a.addEventListener('error', function () {
        miss[url] = true;
        if (cur === a) cur = null;
        trySource(i + 1);
      }, { once: true });

      a.addEventListener('ended', function () {
        if (cur === a) cur = null;
      }, { once: true });

      var p = a.play();
      if (p && typeof p.catch === 'function') {
        /* 自动播放被浏览器拦下时不用补救，用户本来就是点出来的；
           真正的加载失败由上面的 error 事件处理，这里只是吞掉 unhandled rejection */
        p.catch(function () {});
      }
    }

    return true;
  }

  window.JyutDimAudio = { play: play, stop: stop, has: has, slug: slug, dir: DIR };
})();
