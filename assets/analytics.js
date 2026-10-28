/* ============================================================
   粵掂 JyutDim · 站点统计（免费方案）
   ------------------------------------------------------------
   当前状态：已配置（百度统计）。
   已配置时会在页面加载后异步加载对应统计脚本。

   想开始统计，只需在下面 CONFIG 里填【一项】，保存后重新上传即可：

   ① Cloudflare Web Analytics（推荐：免费、不限流量、无 cookie、不用同意弹窗）
      站点部署到 Cloudflare Pages 后 → CF 后台 → Analytics → Web Analytics
      → 添加你的域名 → 复制 JS Snippet 里的 token（一串 32 位字符）
      CONFIG.cloudflare = '你的token'

   ② Google Analytics 4
      CONFIG.ga4 = 'G-XXXXXXXXXX'

   ③ 百度统计（面向国内用户时更稳）
      CONFIG.baidu = '你的站点ID'（hm.js? 后面那串）

   三个只填一个即可；都留空 = 关闭统计。

   自定义事件（可选）：window.JyutDimTrack('事件名', { label: '...' })
   ============================================================ */
(function () {
  'use strict';

  var CONFIG = {
    cloudflare: '',
    ga4: '',
    baidu: 'cf43ef5541b267270d38225f083b9c83'
  };

  function addScript(src, attrs) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    if (attrs) {
      for (var k in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, k)) s.setAttribute(k, attrs[k]);
      }
    }
    (document.head || document.documentElement).appendChild(s);
    return s;
  }

  var provider = '';

  if (CONFIG.cloudflare) {
    provider = 'cloudflare';
    addScript('https://static.cloudflareinsights.com/beacon.min.js', {
      defer: '',
      'data-cf-beacon': JSON.stringify({ token: CONFIG.cloudflare })
    });
  } else if (CONFIG.ga4) {
    provider = 'ga4';
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', CONFIG.ga4);
    addScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.ga4));
  } else if (CONFIG.baidu) {
    provider = 'baidu';
    window._hmt = window._hmt || [];
    addScript('https://hm.baidu.com/hm.js?' + encodeURIComponent(CONFIG.baidu));
  }

  window.JyutDimTrack = function (name, params) {
    if (!name) return;
    try {
      if (provider === 'ga4' && window.gtag) {
        window.gtag('event', name, params || {});
      } else if (provider === 'baidu') {
        var action = (params && params.action) ? params.action : 'click';
        var label = (params && params.label) ? params.label : '';
        window._hmt.push(['_trackEvent', name, action, label]);
      }
    } catch (e) {}
  };

  window.JyutDimAnalytics = { provider: provider || 'off', config: CONFIG };
})();
