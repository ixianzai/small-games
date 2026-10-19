/* ============================================================
   粤掂 JyutDim · 站点图标系统
   ------------------------------------------------------------
   两套图标，共用同一支「画笔」（与 slang-challenge.html 的茶楼点心
   同源）：深棕描边 #8D6E63 + 平涂色块 + 底部一层淡椭圆投影。

   - ICONS     120×120 手绘彩色图标（广府符号），用于卡片、空状态、
               页脚等「大图位」。母题：
                 蒸笼 → 看图配对    茶壶 → 词句连连
                 麻将 → 粤闯粤掂    折扇 → 粤拼速成
                 铜锣 → 声调练习    簿册 → 错题复习
   - NAV_ICONS  24×24 单色线稿（同一母题的简化版），用于顶栏等小尺寸、
               需要跟随文字颜色的位置。
   - UI_ICONS   24×24 单色线稿（界面图标），用于替换散落各页的系统 emoji
               （⭐🏆🔥🎯🎉📖⌂…）。尺寸跟随 1em，塞进原 emoji 位置即可。

   用法（自动填充）：
     <div class="card__icon" data-icon="steamer"></div>
     <span class="nav-ico" data-nav-icon="steamer"></span>
     <span data-ui-icon="star"></span>
   也可直接取字符串：JyutIcon('steamer') / JyutIcon('star','ui')
   ============================================================ */
(function () {
  'use strict';

  var ICONS = {
    /* 蒸笼 · 看图配对 */
    steamer:
      '<ellipse cx="60" cy="104" rx="40" ry="7" fill="#C9A87C" opacity="0.22"/>' +
      '<path d="M18 60 L102 60 L97 96 Q60 104 23 96 Z" fill="#E3B778" stroke="#8D6E63" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M24 74 Q60 82 96 74" fill="none" stroke="#C9954E" stroke-width="3"/>' +
      '<rect x="14" y="48" width="92" height="16" rx="8" fill="#EFCB92" stroke="#8D6E63" stroke-width="4"/>' +
      '<ellipse cx="60" cy="50" rx="34" ry="9" fill="#FBF3E2" stroke="#8D6E63" stroke-width="2.5"/>' +
      '<path d="M40 50 C42 34 52 27 60 27 C68 27 78 34 80 50 Z" fill="#FFE0C4" stroke="#8D6E63" stroke-width="3.2" stroke-linejoin="round"/>' +
      '<path d="M48 40 Q52 34 56 40" fill="none" stroke="#D9A47C" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M64 40 Q68 34 72 40" fill="none" stroke="#D9A47C" stroke-width="2.4" stroke-linecap="round"/>' +
      '<ellipse cx="44" cy="34" rx="7" ry="4" fill="#FFFFFF" opacity="0.45"/>',

    /* 茶壶 · 词句连连 */
    teapot:
      '<ellipse cx="60" cy="104" rx="34" ry="7" fill="#C9A87C" opacity="0.22"/>' +
      '<path d="M34 66 Q18 62 14 48 Q16 44 21 45 Q24 56 36 59 Z" fill="#F3E4D0" stroke="#8D6E63" stroke-width="3.4" stroke-linejoin="round"/>' +
      '<path d="M86 62 Q104 70 86 86" fill="none" stroke="#8D6E63" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="60" cy="72" r="28" fill="#F7EFE2" stroke="#8D6E63" stroke-width="4"/>' +
      '<path d="M36 60 Q60 50 84 60" fill="none" stroke="#006938" stroke-width="5" stroke-linecap="round" opacity="0.9"/>' +
      '<ellipse cx="60" cy="45" rx="16" ry="6" fill="#EDE0C8" stroke="#8D6E63" stroke-width="3.2"/>' +
      '<circle cx="60" cy="38" r="4.5" fill="#8D6E63"/>' +
      '<ellipse cx="48" cy="66" rx="7" ry="5" fill="#FFFFFF" opacity="0.5"/>',

    /* 麻将牌 · 粤闯粤掂 */
    mahjong:
      '<ellipse cx="60" cy="104" rx="32" ry="6" fill="#C9A87C" opacity="0.22"/>' +
      '<rect x="30" y="20" width="60" height="80" rx="9" fill="#FFF9EC" stroke="#8D6E63" stroke-width="4"/>' +
      '<rect x="30" y="20" width="60" height="17" rx="9" fill="#EDE0C8" stroke="#8D6E63" stroke-width="3"/>' +
      '<rect x="48" y="54" width="24" height="18" fill="none" stroke="#006938" stroke-width="4.5"/>' +
      '<path d="M60 42 V86" stroke="#006938" stroke-width="4.5" stroke-linecap="round"/>',

    /* 折扇 · 粤拼速成 */
    fan:
      '<ellipse cx="60" cy="102" rx="36" ry="7" fill="#C9A87C" opacity="0.22"/>' +
      '<path d="M60 92 L11.5 64 A56 56 0 0 1 108.5 64 Z" fill="#FBF3E2" stroke="#8D6E63" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M11.5 64 A56 56 0 0 1 108.5 64" fill="none" stroke="#006938" stroke-width="5" opacity="0.9"/>' +
      '<path d="M60 92 L20 52 M60 92 L36 41 M60 92 L60 36 M60 92 L84 41 M60 92 L100 52" stroke="#D9B77E" stroke-width="2.6"/>' +
      '<circle cx="60" cy="92" r="5.5" fill="#8D6E63"/>',

    /* 铜锣 · 声调练习 */
    gong:
      '<ellipse cx="60" cy="106" rx="30" ry="6" fill="#C9A87C" opacity="0.22"/>' +
      '<path d="M34 26 Q60 12 86 26" fill="none" stroke="#8D6E63" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="60" cy="68" r="38" fill="#D9A44A" stroke="#8D6E63" stroke-width="4"/>' +
      '<circle cx="60" cy="68" r="29" fill="#E8BC6A" stroke="#B07C2A" stroke-width="2.6"/>' +
      '<circle cx="60" cy="68" r="10" fill="#B07C2A" stroke="#8D6E63" stroke-width="3"/>' +
      '<ellipse cx="46" cy="50" rx="9" ry="6" fill="#FFF3D6" opacity="0.5"/>',

    /* 簿册红笔 · 错题复习 */
    notebook:
      '<ellipse cx="60" cy="104" rx="32" ry="6" fill="#C9A87C" opacity="0.22"/>' +
      '<rect x="26" y="24" width="62" height="74" rx="7" fill="#FBF3E2" stroke="#8D6E63" stroke-width="4"/>' +
      '<path d="M38 24 V98" stroke="#8D6E63" stroke-width="3"/>' +
      '<circle cx="38" cy="42" r="4" fill="#EDE0C8" stroke="#8D6E63" stroke-width="2.4"/>' +
      '<circle cx="38" cy="62" r="4" fill="#EDE0C8" stroke="#8D6E63" stroke-width="2.4"/>' +
      '<circle cx="38" cy="82" r="4" fill="#EDE0C8" stroke="#8D6E63" stroke-width="2.4"/>' +
      '<path d="M54 46 H78" stroke="#B03028" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M54 60 H70" stroke="#B03028" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M54 78 L61 86 L80 62" fill="none" stroke="#B03028" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'
  };

  /* 顶栏用单色线稿：同一母题，去掉彩色与投影，跟随文字颜色 */
  var NAV_ICONS = {
    steamer:
      '<path d="M3.6 9.6h16.8"/>' +
      '<path d="M5 9.6 L6.2 19.6 H17.8 L19 9.6"/>' +
      '<path d="M8.6 9.6 c0-2.2 1.5-3.6 3.4-3.6 s3.4 1.4 3.4 3.6"/>' +
      '<path d="M4.6 13.6h14.8"/>',
    teapot:
      '<circle cx="12.4" cy="14" r="6"/>' +
      '<path d="M6.9 12 Q3.6 11.6 2.9 8.8"/>' +
      '<path d="M18.4 12.2 q2.8 1.8 0 3.6"/>' +
      '<path d="M9.2 8.6h6.4"/>' +
      '<path d="M12.4 8.6V7"/>',
    mahjong:
      '<rect x="6.8" y="3" width="10.4" height="18" rx="2.4"/>' +
      '<path d="M12 8.4v8"/>' +
      '<rect x="9.7" y="10.1" width="4.6" height="4"/>',
    fan:
      '<path d="M12 20 L2.5 14.5 A11 11 0 0 1 21.5 14.5 Z"/>' +
      '<path d="M12 20V9"/>' +
      '<path d="M12 20 L7.4 10"/>' +
      '<path d="M12 20 L16.6 10"/>',
    gong:
      '<path d="M7.6 4.2 Q12 1.4 16.4 4.2"/>' +
      '<circle cx="12" cy="13.6" r="7.2"/>' +
      '<circle cx="12" cy="13.6" r="1.9"/>',
    notebook:
      '<rect x="4.8" y="3.2" width="13.2" height="17.6" rx="2"/>' +
      '<path d="M8.4 3.2v17.6"/>' +
      '<path d="M11.4 11.4h4.4"/>' +
      '<path d="M11.4 16l1.5 1.7 3-4.2"/>'
  };

  /* ============================================================
     界面图标 UI_ICONS —— 24×24 单色线稿，尺寸跟随 1em。
     用来替换散落在各页的系统 emoji（⭐🏆🔥🎯🎉📖⌂…）：
     系统 emoji 在 Mac / Windows / 安卓 上长得不一样，且与本站
     「电车绿·怀旧极简」的纸感质感不搭。
     注意：只换「界面」，游戏内容里的 emoji（题面素材、单词配图）
     一律不动。
     ============================================================ */
  var UI_ICONS = {
    star:
      '<path d="M12 3.6 L14.29 9.44 L20.56 9.82 L15.71 13.81 L17.29 19.88 L12 16.5 L6.71 19.88 L8.29 13.81 L3.44 9.82 L9.71 9.44 Z"' +
      ' fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
    starDim:
      '<path d="M12 3.6 L14.29 9.44 L20.56 9.82 L15.71 13.81 L17.29 19.88 L12 16.5 L6.71 19.88 L8.29 13.81 L3.44 9.82 L9.71 9.44 Z"' +
      ' opacity="0.32" stroke-linejoin="round"/>',
    mahjong:
      '<rect x="6.8" y="3" width="10.4" height="18" rx="2.4"/>' +
      '<path d="M12 8.4v8"/>' +
      '<rect x="9.7" y="10.1" width="4.6" height="4"/>',
    trophy:
      '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/>' +
      '<path d="M8 5H5.4v1.6A3 3 0 0 0 8 9.6"/>' +
      '<path d="M16 5h2.6v1.6A3 3 0 0 1 16 9.6"/>' +
      '<path d="M12 13v3.4"/>' +
      '<path d="M9 19.6h6"/>',
    party:
      '<path d="M3.8 20.2l4.8-9.8 5 5z" stroke-linejoin="round"/>' +
      '<circle cx="15.6" cy="5.4" r="1.1" fill="currentColor" stroke="none"/>' +
      '<circle cx="20" cy="9.8" r="1.1" fill="currentColor" stroke="none"/>' +
      '<circle cx="12.6" cy="2.8" r="1.1" fill="currentColor" stroke="none"/>' +
      '<circle cx="19" cy="3.6" r="1" fill="currentColor" stroke="none"/>',
    clap:
      '<path d="M8.6 11.4V6.6a1.4 1.4 0 0 1 2.8 0v4.2"/>' +
      '<path d="M11.4 10.8V5.4a1.4 1.4 0 0 1 2.8 0v5.4"/>' +
      '<path d="M14.2 10.8V6.8a1.4 1.4 0 0 1 2.8 0V14a5.6 5.6 0 0 1-5.6 5.6h-.8a4.6 4.6 0 0 1-3.7-1.9L5 13.6a1.5 1.5 0 0 1 2.5-1.7l1.1 1.5"/>',
    medal:
      '<path d="M8.4 3.2 L12 10 M15.6 3.2 L12 10"/>' +
      '<circle cx="12" cy="14.8" r="5.2"/>' +
      '<path d="M12 12.6l.85 1.75 1.9.26-1.38 1.34.33 1.9L12 16.95l-1.7.9.33-1.9-1.38-1.34 1.9-.26z"' +
      ' fill="currentColor" stroke="none"/>',
    book:
      '<path d="M12 6.4C10 5 7 5 5 5.4v12c2-.4 5-.4 7 1 2-1.4 5-1.4 7-1V5.4c-2-.4-5-.4-7 1z" stroke-linejoin="round"/>' +
      '<path d="M12 6.4v12"/>',
    flame:
      '<path d="M12 3.2c1.6 4.2 4.6 6 4.6 9.6a4.6 4.6 0 0 1-9.2 0c0-3.6 3-5.4 4.6-9.6z" stroke-linejoin="round"/>' +
      '<path d="M12 11.4c.9 1.8 2 2.4 2 4a2 2 0 0 1-4 0c0-1.6 1.1-2.2 2-4z"/>',
    target:
      '<circle cx="12" cy="12" r="8.4"/>' +
      '<circle cx="12" cy="12" r="4.8"/>' +
      '<circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
    check:
      '<circle cx="12" cy="12" r="8.6"/>' +
      '<path d="M8.2 12.4l2.6 2.6 5-5.6"/>',
    cross:
      '<circle cx="12" cy="12" r="8.6"/>' +
      '<path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6"/>',
    sparkle:
      '<path d="M11 3.4l1.6 4.4 4.4 1.6-4.4 1.6L11 15.4 9.4 11 5 9.4l4.4-1.6z"' +
      ' fill="currentColor" stroke="none"/>' +
      '<path d="M17.6 14.4l.75 2.05 2.05.75-2.05.75-.75 2.05-.75-2.05-2.05-.75 2.05-.75z"' +
      ' fill="currentColor" stroke="none"/>',
    home:
      '<path d="M3.6 10.6 L12 3.6 L20.4 10.6" stroke-linejoin="round"/>' +
      '<path d="M5.8 10.4V20h12.4v-9.6"/>' +
      '<path d="M10.2 20v-5.6h3.6V20"/>',
    speaker:
      '<path d="M4 9.4v5.2h3.4L12 18.6V5.4L7.4 9.4z" stroke-linejoin="round"/>' +
      '<path d="M15.4 9.2a4 4 0 0 1 0 5.6"/>' +
      '<path d="M17.8 6.8a7.4 7.4 0 0 1 0 10.4"/>',
    back:
      '<path d="M14.6 5.4 L8 12 L14.6 18.6"/>',
    arrowRight:
      '<path d="M4.6 12h14.4"/>' +
      '<path d="M13.4 6.6 L19.4 12 L13.4 17.4"/>',
    sprout:
      '<path d="M12 20.4V11"/>' +
      '<path d="M12 11c0-3-2.2-5-5.4-5 0 3 2.2 5 5.4 5z" stroke-linejoin="round"/>' +
      '<path d="M12 13.4c0-2.6 1.9-4.4 4.6-4.4 0 2.6-1.9 4.4-4.6 4.4z" stroke-linejoin="round"/>',
    leaf:
      '<path d="M20 4.4c0 8.4-4.4 13.2-11 13.2-1.6 0-3-.4-4.2-1C6 9 11.2 4.4 20 4.4z" stroke-linejoin="round"/>' +
      '<path d="M4.8 19.6C7.6 14.8 12 10.4 17.6 7.6"/>',
    chart:
      '<path d="M4 20.2h16"/>' +
      '<path d="M7.4 20.2v-7.4"/>' +
      '<path d="M12 20.2V6.4"/>' +
      '<path d="M16.6 20.2v-5.2"/>',
    speakerOff:
      '<path d="M4 9.4v5.2h3.4L12 18.6V5.4L7.4 9.4z" stroke-linejoin="round"/>' +
      '<path d="M15.6 9.8l5 4.4M20.6 9.8l-5 4.4"/>',
    refresh:
      '<path d="M20 11a8 8 0 1 0-2 5.5"/>' +
      '<path d="M20 5.4v5.6h-5.6"/>',
    bolt:
      '<path d="M13.4 2.8 L5.6 13.4h5.4L10.6 21.2 18.4 10.6h-5.4z" stroke-linejoin="round"/>',
    turtle:
      '<path d="M4 14.4a7 7 0 0 1 14 0z" stroke-linejoin="round"/>' +
      '<path d="M4 14.4h14"/>' +
      '<circle cx="19.8" cy="12.2" r="1.8"/>' +
      '<path d="M6.4 14.4v3.6M10 14.4v3.6M14 14.4v3.6M17.6 14.4v3.6"/>',
    walk:
      '<circle cx="12.8" cy="4.2" r="2"/>' +
      '<path d="M12.6 6.4 L11.4 12.4"/>' +
      '<path d="M8.4 9.4 L11.6 10.6 L15.4 8.2"/>' +
      '<path d="M11.4 12.4 L14.6 15.4 L13.6 20.6"/>' +
      '<path d="M11.4 12.4 L8.6 15.6 L7.6 20.6"/>',
    rabbit:
      '<ellipse cx="11.4" cy="15.6" rx="6.4" ry="4.4"/>' +
      '<circle cx="18" cy="11.6" r="3.2"/>' +
      '<path d="M16.4 8.8 L14.6 3.8"/>' +
      '<path d="M19.2 8.8 L20 3.8"/>' +
      '<circle cx="5.2" cy="14.6" r="1.6"/>',
    bulb:
      '<path d="M12 3.4a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.2 2.3h4.8c.1-.9.5-1.7 1.2-2.3A6 6 0 0 0 12 3.4z" stroke-linejoin="round"/>' +
      '<path d="M9.8 19.2h4.4"/>' +
      '<path d="M10.6 21.4h2.8"/>',
    bookCross:
      '<rect x="6" y="3.6" width="12" height="16.8" rx="1.8"/>' +
      '<path d="M9.2 3.6v16.8"/>' +
      '<path d="M12.2 9.4l3.6 3.6M15.8 9.4l-3.6 3.6"/>',
    pause:
      '<rect x="7.4" y="4.6" width="3.4" height="14.8" rx="1.1" fill="currentColor" stroke="none"/>' +
      '<rect x="13.2" y="4.6" width="3.4" height="14.8" rx="1.1" fill="currentColor" stroke="none"/>',
    play:
      '<path d="M7.6 4.8 L18.8 12 L7.6 19.2z" fill="currentColor" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    speak:
      '<circle cx="8.8" cy="9" r="3.8"/>' +
      '<path d="M2.8 20.6a6 6 0 0 1 12 0"/>' +
      '<path d="M16.4 6.6a5.6 5.6 0 0 1 0 8"/>' +
      '<path d="M19.4 4a9.4 9.4 0 0 1 0 13.2"/>',
    gamepad:
      '<rect x="2.6" y="7.6" width="18.8" height="9.2" rx="4.6"/>' +
      '<path d="M7.6 10.6v3.2M6 12.2h3.2"/>' +
      '<circle cx="16.4" cy="11.4" r="1.1" fill="currentColor" stroke="none"/>' +
      '<circle cx="18.6" cy="13.6" r="1.1" fill="currentColor" stroke="none"/>',
    timer:
      '<circle cx="12" cy="13.6" r="7.4"/>' +
      '<path d="M12 9.8v3.8l2.6 1.6"/>' +
      '<path d="M9.4 3.4h5.2"/>' +
      '<path d="M12 3.4v2.8"/>',
    trash:
      '<path d="M4.6 6.8h14.8"/>' +
      '<path d="M9.4 6.8V4.4h5.2v2.4"/>' +
      '<path d="M6.6 6.8l1 13.2h8.8l1-13.2"/>' +
      '<path d="M10.2 10.4v6M13.8 10.4v6"/>',
    crown:
      '<path d="M3.6 8.2 L7.2 15.6 H16.8 L20.4 8.2 L15.6 11 L12 5 L8.4 11 Z" stroke-linejoin="round"/>' +
      '<path d="M6.6 19.2h10.8"/>' +
      '<path d="M7.2 15.6v3.6M16.8 15.6v3.6"/>',
    gift:
      '<rect x="3.6" y="9.8" width="16.8" height="10.2" rx="1.6"/>' +
      '<path d="M2.8 6.8h18.4v3H2.8z" stroke-linejoin="round"/>' +
      '<path d="M12 6.8v13.2"/>' +
      '<path d="M12 6.8C11 4.6 9.6 3.2 8.2 3.2a2.1 2.1 0 0 0 0 4.2h3.8z" stroke-linejoin="round"/>' +
      '<path d="M12 6.8c1-2.2 2.4-3.6 3.8-3.6a2.1 2.1 0 0 1 0 4.2H12z" stroke-linejoin="round"/>',
    pin:
      '<path d="M8.6 3.6h6.8v1.4l-1 4.6 2.6 3.2H7l2.6-3.2-1-4.6z" stroke-linejoin="round"/>' +
      '<path d="M12 12.8v7.6"/>',
    flower:
      '<circle cx="12" cy="6.6" r="2.6"/>' +
      '<circle cx="17.1" cy="10.3" r="2.6"/>' +
      '<circle cx="15.2" cy="16.4" r="2.6"/>' +
      '<circle cx="8.8" cy="16.4" r="2.6"/>' +
      '<circle cx="6.9" cy="10.3" r="2.6"/>' +
      '<circle cx="12" cy="12.2" r="2.2" fill="currentColor" stroke="none"/>',
    dumbbell:
      '<path d="M4.4 9.4v5.2M7.6 7.6v8.8M16.4 7.6v8.8M19.6 9.4v5.2"/>' +
      '<path d="M7.6 12h8.8"/>',
    sweat:
      '<path d="M12 3.4c3.1 4.6 5.2 7.3 5.2 10a5.2 5.2 0 0 1-10.4 0c0-2.7 2.1-5.4 5.2-10z" stroke-linejoin="round"/>'
  };

  function bigSvg(name) {
    var art = ICONS[name];
    if (!art) return '';
    return '<svg class="yd-ico" viewBox="0 0 120 120" aria-hidden="true" focusable="false">' + art + '</svg>';
  }

  function navSvg(name) {
    var art = NAV_ICONS[name];
    if (!art) return '';
    return '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor"' +
      ' stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"' +
      ' aria-hidden="true" focusable="false">' + art + '</svg>';
  }

  function uiSvg(name) {
    var art = UI_ICONS[name];
    if (!art) return '';
    return '<svg class="yd-ui" viewBox="0 0 24 24" width="1em" height="1em" fill="none"' +
      ' stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"' +
      ' aria-hidden="true" focusable="false">' + art + '</svg>';
  }

  var SETS = {
    big: { attr: 'data-icon',      draw: bigSvg },
    nav: { attr: 'data-nav-icon',  draw: navSvg },
    ui:  { attr: 'data-ui-icon',   draw: uiSvg  }
  };

  function JyutIcon(name, set) {
    var s = SETS[set] || SETS.big;
    return s.draw(name);
  }

  /* 基础样式由脚本注入，这样没引 style.css 的游戏页也能用 */
  function baseCss() {
    if (document.getElementById('jyutdim-icon-css')) return;
    var css = document.createElement('style');
    css.id = 'jyutdim-icon-css';
    css.textContent =
      '.yd-ico{display:block;width:100%;height:100%;overflow:visible}' +
      '.yd-ui{display:inline-block;vertical-align:-0.125em}' +
      '.yd-ico-inline{margin-right:5px}' +
      '.yd-with-ico{display:inline-flex;align-items:center;gap:6px}';
    document.head.appendChild(css);
  }

  function render() {
    baseCss();
    for (var key in SETS) {
      if (!Object.prototype.hasOwnProperty.call(SETS, key)) continue;
      var set = SETS[key];
      var els = document.querySelectorAll('[' + set.attr + ']');
      for (var i = 0; i < els.length; i++) {
        var html = set.draw(els[i].getAttribute(set.attr));
        if (html) els[i].innerHTML = html;
      }
    }
  }

  window.JyutIcon = JyutIcon;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
