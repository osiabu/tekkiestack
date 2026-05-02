/**
 * TekkieStack 2.0 — Typing Trainer Module (Phase B redesign)
 *
 * Adds virtual SVG hands above the keyboard with per-finger guidance:
 *   - Each next key highlights the correct finger via a glow ring
 *   - Hand fingers translate to reach the target row
 *   - Wrong-key feedback briefly flashes the wrong finger red and the
 *     correct finger green
 *   - Expanded passage library across 7 levels including code symbols
 *     and keyboard shortcut drills
 *   - Per-key error tracking → "weakest key" report after each session
 *   - Toggle to hide hands once kid is touch-typing comfortably
 *
 * Author: Aperintel Ltd
 */

const TSATyping = (() => {

  // ── Keyboard layout ──────────────────────────────────────────────────────
  const KB_ROWS = [
    ['`','1','2','3','4','5','6','7','8','9','0','-','=','⌫'],
    ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
    ['Caps','a','s','d','f','g','h','j','k','l',';',"'",'↵'],
    ['Shift','z','x','c','v','b','n','m',',','.','/','Shift'],
    ['Space'],
  ];
  const HOME_ROW = new Set(['a','s','d','f','j','k','l',';']);
  const WIDE     = new Set(['Tab','Caps','Shift','⌫','↵','\\']);

  // ── Finger map ───────────────────────────────────────────────────────────
  // L1=left index, L2=middle, L3=ring, L4=pinky. Same on right.
  // Thumbs handle space.
  const FINGER_MAP = {
    // Left hand
    '`':'L4','1':'L4','q':'L4','a':'L4','z':'L4',
    '2':'L3','w':'L3','s':'L3','x':'L3',
    '3':'L2','e':'L2','d':'L2','c':'L2',
    '4':'L1','5':'L1','r':'L1','t':'L1','f':'L1','g':'L1','v':'L1','b':'L1',
    // Right hand
    '6':'R1','7':'R1','y':'R1','u':'R1','h':'R1','j':'R1','n':'R1','m':'R1',
    '8':'R2','i':'R2','k':'R2',',':'R2',
    '9':'R3','o':'R3','l':'R3','.':'R3',
    '0':'R4','-':'R4','=':'R4','p':'R4','[':'R4',']':'R4','\\':'R4',
    ';':'R4',"'":'R4','/':'R4',
    ' ':'thumb',
  };

  // Row index per key (for finger reach translation).
  // 0 = number row (top reach), 1 = top-letter row, 2 = home row, 3 = bottom row
  const KEY_ROW = {
    '`':0,'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'0':0,'-':0,'=':0,
    'q':1,'w':1,'e':1,'r':1,'t':1,'y':1,'u':1,'i':1,'o':1,'p':1,'[':1,']':1,'\\':1,
    'a':2,'s':2,'d':2,'f':2,'g':2,'h':2,'j':2,'k':2,'l':2,';':2,"'":2,
    'z':3,'x':3,'c':3,'v':3,'b':3,'n':3,'m':3,',':3,'.':3,'/':3,
    ' ':3,
  };

  // Keys that need shift (so we light up the OPPOSITE pinky as the modifier).
  const SHIFT_PINKY = (key) => {
    // Capital letter or shifted symbol — rough heuristic
    if (/^[A-Z]$/.test(key)) return true;
    return ['!','@','#','$','%','^','&','*','(',')','_','+','{','}','|',':','"','<','>','?','~'].includes(key);
  };

  // Map shifted symbols back to their unshifted base key (for finger lookup).
  const UNSHIFT = {
    '!':'1','@':'2','#':'3','$':'4','%':'5','^':'6','&':'7','*':'8','(':'9',')':'0',
    '_':'-','+':'=','{':'[','}':']','|':'\\',':':';','"':"'",'<':',','>':'.','?':'/','~':'`',
  };
  const baseKeyOf = (key) => {
    if (/^[A-Z]$/.test(key)) return key.toLowerCase();
    return UNSHIFT[key] || key;
  };

  // ── Lesson pools (massive expansion: 25+ passages per level) ─────────────
  const LEVELS = {
    home: {
      label: 'Home Row',
      passages: [
        'asdf jkl; asdf jkl;',
        'fdsa ;lkj fdsa ;lkj',
        'asdfjkl; fdsajkl; asdf',
        'jkl; asdf jkl; fdsa',
        'afjk dsla fjdk slaf',
        'sad lad fad jak ask',
        'lass fall jaks ada salad',
        'flask glad ad ask hall',
        'a sad lad asks a sad dad',
        'dad fads jak alfa salad',
        'fall fads gala salad asks',
        'has all jak; ask dads alas',
        'flask alas jakals salad',
        'a half full flask all day',
        'gas as a flask asks',
        'salads dad fads halls',
        'jak asks dad alas alas',
        'all gala jak salads asks',
        'jak ad dad fad as ask',
        'half a salad lad asks dad',
        'dada haha lala jaja kaka',
        'a lad asks a dad for jak',
        'jaks adds salads halfly',
        'flagged daddy alas alas',
        'has had all flask salads',
      ],
      gateWpm: 0, gateAcc: 0,
    },
    alpha: {
      label: 'All Letters',
      passages: [
        'the quick brown fox jumps over the lazy dog',
        'pack my box with five dozen liquor jugs',
        'sphinx of black quartz judge my vow',
        'how vexingly quick daft zebras jump',
        'jackdaws love my big sphinx of quartz',
        'the five boxing wizards jump quickly',
        'amazingly few discotheques provide jukeboxes',
        'crazy fredrick bought many very exquisite opal jewels',
        'we promptly judged antique ivory buckles for the next prize',
        'a wizards job is to vex chumps quickly in fog',
        'waltz nymph for quick jigs vex bud',
        'glib jocks quiz nymph to vex dwarf',
        'two driven jocks help fax my big quiz',
        'public junk dwarves hug my quartz fox',
        'quick zephyrs blow vexing daft jim',
        'sympathizing would fix quaker objectives',
        'when zombies arrive quickly fax judge pat',
        'the explorer was frozen in his big kayak',
        'big july earthquakes confound zany experimental vow',
        'jumping wizards quickly vex many bored phlegmatic frogs',
        'fix problem quickly with galvanized jets',
        'cwm fjord bank glyphs vext quiz',
        'jumpy halflings dwarves and gnomes vex blackbirds',
        'mr jock tv quiz phd bags few lynx',
        'six javelins thrown by the quick savages whizzed forty paces beyond the mark',
      ],
      gateWpm: 20, gateAcc: 90,
    },
    words: {
      label: 'Common Words',
      passages: [
        'code build create learn play write think',
        'web page style design colour layout grid',
        'function return let const var array object',
        'click input button form div span section',
        'true false null undefined string number',
        'event listener click hover focus blur input',
        'if else for while loop break continue switch',
        'open close save edit delete add remove update',
        'public private static class method interface',
        'request response server client browser tab',
        'data list table row column cell key value',
        'red blue green yellow orange purple pink',
        'small medium large huge tiny narrow wide',
        'begin end first last next previous middle',
        'morning evening night day week month year',
        'happy clever curious patient kind thoughtful brave',
        'pizza burger pasta salad apple bread cheese',
        'computer keyboard mouse screen speaker laptop',
        'school home park street market library garden',
        'code editor browser console terminal file folder',
        'react angular vue svelte node express django',
        'python javascript ruby rust java kotlin swift',
        'select option label legend fieldset textarea',
        'bold italic underline strike highlight quote',
        'header main footer aside article navigation',
      ],
      gateWpm: 30, gateAcc: 88,
    },
    code: {
      label: 'Code Snippets',
      passages: [
        'let x = 10;',
        'function add(a, b) { return a + b; }',
        'const name = "Alex";',
        'document.getElementById("btn")',
        'if (x > 0) { console.log(x); }',
        'for (let i = 0; i < 10; i++) { sum += i; }',
        'const arr = [1, 2, 3, 4, 5];',
        'arr.map(n => n * 2);',
        'try { run(); } catch (e) { console.error(e); }',
        'class Cat { constructor(name) { this.name = name; } }',
        'async function load() { const r = await fetch(url); }',
        'export default function App() { return <div />; }',
        'import React from "react";',
        'const { name, age } = user;',
        'arr.filter(n => n % 2 === 0);',
        'setTimeout(() => alert("hi"), 1000);',
        'window.addEventListener("load", init);',
        'let total = 0; arr.forEach(n => total += n);',
        'const isEven = n => n % 2 === 0;',
        'const promise = new Promise(resolve => resolve(42));',
        'JSON.stringify({ a: 1, b: 2 });',
        'Object.keys(obj).length;',
        'arr.reduce((a, b) => a + b, 0);',
        'const re = /^\\d+$/;',
        'fetch("/api").then(r => r.json());',
      ],
      gateWpm: 35, gateAcc: 86, gateYr: 5,
    },
    symbols: {
      label: 'Code Symbols',
      passages: [
        '{ } ( ) [ ] < > = + - * / ; :',
        '() => { return 0; }',
        '<div className="card">{x}</div>',
        '`Hello, ${name}!`',
        'a && b || c ?? d',
        '/^[a-z]+$/i',
        '<input type="text" />',
        'arr[0] + arr[arr.length - 1]',
        '{ ...obj, name: "x" }',
        '[a, b] = [b, a];',
        '#define PI 3.14',
        '<!-- comment --> /* style */ // js',
        'SELECT * FROM users WHERE id = 1;',
        'const url = `https://api.example.com/users/${id}`;',
        '@media (max-width: 768px) { .grid { gap: 1rem; } }',
        'p::before { content: ""; }',
        '$.ajax({ url: "/x", method: "GET" });',
        'git commit -m "fix: bug #42"',
        'docker run -p 3000:3000 myapp',
        'npm install --save-dev typescript',
      ],
      gateWpm: 30, gateAcc: 88,
    },
    speed: {
      label: 'Speed Run',
      passages: [
        'the quick brown fox jumps over the lazy dog',
        'over the lazy dog and then runs back to the start',
        'speed comes from daily practice and steady focus',
        'keep your eyes on the text always not the keys',
        'the more you practise the more natural it feels',
        'rhythm matters more than raw speed',
        'consistency builds muscle memory faster than spurts',
        'mistakes are part of learning move on quickly',
        'breathe slowly and tap each key with intention',
        'every great typist was once a slow beginner too',
        'good posture wins quiet confidence at the keyboard',
        'mind the wrists and rest the elbows on the desk',
        'eyes ahead fingers loose and shoulders relaxed always',
        'small daily wins beat occasional intense sprints by miles',
        'a hundred clean words beats two hundred messy ones',
      ],
      gateWpm: 50, gateAcc: 85,
    },
    pangrams: {
      label: 'Pangrams',
      passages: [
        'the quick brown fox jumps over the lazy dog',
        'pack my box with five dozen liquor jugs',
        'sphinx of black quartz judge my vow',
        'how vexingly quick daft zebras jump',
        'jackdaws love my big sphinx of quartz',
        'a quick movement of the enemy will jeopardize six gunboats',
        'all questions asked by five watched experts amaze the judge',
        'the five boxing wizards jump quickly each day every dawn',
        'jaded zombies acted quaintly but kept driving their oxen forward',
        'two driven jocks help fax my big quiz',
      ],
      gateWpm: 40, gateAcc: 88,
    },
  };

  // ── State ────────────────────────────────────────────────────────────────
  let _level    = 'home';
  let _text     = '';
  let _pos      = 0;
  let _errors   = 0;
  let _correct  = 0;
  let _start    = null;
  let _timer    = null;
  let _active   = false;
  let _showHands = true;
  let _keyErrors = {}; // { 'a': 3, 'b': 1, ... }

  // ── SVG hand rendering ───────────────────────────────────────────────────
  // Two stylised hands above the keyboard. Each finger is its own <g> so it
  // can translate (reach) and glow (active) independently.
  function _handsSVG() {
    return `
      <svg class="vh-svg" viewBox="0 0 600 130" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <!-- LEFT HAND -->
        <g class="vh-hand vh-hand-L">
          <!-- palm / wrist -->
          <path class="vh-palm" d="M40 110 Q 30 80 60 70 L 230 70 Q 260 80 250 110 Z"/>
          <!-- fingers (right-to-left in the group: index → pinky) -->
          <g class="vh-finger" id="vh-finger-L1" data-finger="L1">
            <rect class="vh-finger-rect" x="206" y="20" width="22" height="62" rx="9"/>
            <circle class="vh-finger-tip" cx="217" cy="22" r="11"/>
          </g>
          <g class="vh-finger" id="vh-finger-L2" data-finger="L2">
            <rect class="vh-finger-rect" x="166" y="14" width="22" height="68" rx="9"/>
            <circle class="vh-finger-tip" cx="177" cy="16" r="11"/>
          </g>
          <g class="vh-finger" id="vh-finger-L3" data-finger="L3">
            <rect class="vh-finger-rect" x="126" y="20" width="22" height="62" rx="9"/>
            <circle class="vh-finger-tip" cx="137" cy="22" r="11"/>
          </g>
          <g class="vh-finger" id="vh-finger-L4" data-finger="L4">
            <rect class="vh-finger-rect" x="86" y="36" width="22" height="46" rx="9"/>
            <circle class="vh-finger-tip" cx="97" cy="38" r="11"/>
          </g>
          <!-- thumb (slightly diagonal) -->
          <g class="vh-finger" id="vh-finger-L-thumb" data-finger="thumb-L">
            <rect class="vh-finger-rect" x="232" y="60" width="20" height="36" rx="9" transform="rotate(20 242 78)"/>
            <circle class="vh-finger-tip" cx="247" cy="62" r="10"/>
          </g>
        </g>

        <!-- RIGHT HAND -->
        <g class="vh-hand vh-hand-R" transform="translate(280 0)">
          <path class="vh-palm" d="M70 110 Q 60 80 90 70 L 260 70 Q 290 80 280 110 Z"/>
          <g class="vh-finger" id="vh-finger-R1" data-finger="R1">
            <rect class="vh-finger-rect" x="92" y="20" width="22" height="62" rx="9"/>
            <circle class="vh-finger-tip" cx="103" cy="22" r="11"/>
          </g>
          <g class="vh-finger" id="vh-finger-R2" data-finger="R2">
            <rect class="vh-finger-rect" x="132" y="14" width="22" height="68" rx="9"/>
            <circle class="vh-finger-tip" cx="143" cy="16" r="11"/>
          </g>
          <g class="vh-finger" id="vh-finger-R3" data-finger="R3">
            <rect class="vh-finger-rect" x="172" y="20" width="22" height="62" rx="9"/>
            <circle class="vh-finger-tip" cx="183" cy="22" r="11"/>
          </g>
          <g class="vh-finger" id="vh-finger-R4" data-finger="R4">
            <rect class="vh-finger-rect" x="212" y="36" width="22" height="46" rx="9"/>
            <circle class="vh-finger-tip" cx="223" cy="38" r="11"/>
          </g>
          <g class="vh-finger" id="vh-finger-R-thumb" data-finger="thumb-R">
            <rect class="vh-finger-rect" x="60" y="60" width="20" height="36" rx="9" transform="rotate(-20 70 78)"/>
            <circle class="vh-finger-tip" cx="65" cy="62" r="10"/>
          </g>
        </g>
      </svg>
    `;
  }

  // ── Build keyboard ───────────────────────────────────────────────────────
  function buildKeyboard() {
    KB_ROWS.forEach((row, ri) => {
      const rowEl = document.getElementById(`kbRow${ri}`);
      if (!rowEl) return;
      rowEl.innerHTML = '';
      row.forEach(k => {
        const div = document.createElement('div');
        div.className = 'kk';
        if (k === 'Space') { div.classList.add('sp'); div.textContent = 'Space'; div.id = 'kk-space'; }
        else if (WIDE.has(k)) { div.classList.add(k === 'Shift' || k === 'Caps' ? 'w3' : 'w2'); div.textContent = k; }
        else { div.textContent = k; }
        if (HOME_ROW.has(k.toLowerCase())) div.classList.add('home-row');
        div.id = div.id || ('kk-' + k.replace(/[^a-zA-Z0-9]/g, '_'));
        rowEl.appendChild(div);
      });
    });
  }

  // ── Inject hands SVG into the typing screen ──────────────────────────────
  function buildHands() {
    const host = document.getElementById('virtualHands');
    if (!host) return;
    host.innerHTML = _handsSVG();
  }

  // ── Active finger glow + reach ────────────────────────────────────────────
  function _resetFingers() {
    document.querySelectorAll('.vh-finger').forEach(g => {
      g.classList.remove('active', 'shift', 'wrong', 'correct');
      g.style.transform = '';
    });
  }
  function _setFingerActive(fingerId, opts = {}) {
    const id = fingerId.startsWith('thumb') ? `vh-finger-L-thumb` : `vh-finger-${fingerId}`;
    const id2 = fingerId.startsWith('thumb') ? `vh-finger-R-thumb` : null;
    const apply = (el) => {
      if (!el) return;
      if (opts.shift)   el.classList.add('shift');
      else if (opts.wrong)   el.classList.add('wrong');
      else if (opts.correct) el.classList.add('correct');
      else el.classList.add('active');
      // Reach offset: y-translate based on row, only for non-thumb fingers
      if (!fingerId.startsWith('thumb') && typeof opts.row === 'number') {
        // Row 2 = home (no offset). Up = negative, down = positive.
        const offsets = { 0: -8, 1: -4, 2: 0, 3: 6 };
        const dy = offsets[opts.row] ?? 0;
        // Slightly press down on contact
        const press = (opts.active || opts.correct) ? 4 : 0;
        el.style.transform = `translateY(${dy + press}px)`;
      }
    };
    apply(document.getElementById(id));
    if (id2) apply(document.getElementById(id2));
  }

  // ── Set level ─────────────────────────────────────────────────────────────
  function setTypingLevel(el, lvl) {
    document.querySelectorAll('.lp').forEach(p => p.classList.remove('on'));
    if (el) el.classList.add('on');
    _level = lvl;
    resetTyping();
  }

  // ── Reset ─────────────────────────────────────────────────────────────────
  function resetTyping() {
    clearInterval(_timer);
    _active = false; _pos = 0; _errors = 0; _correct = 0; _start = null;
    _keyErrors = {};
    const pool = LEVELS[_level]?.passages || LEVELS.home.passages;
    _text = pool[Math.floor(Math.random() * pool.length)];
    _setEl('wpmStat', '0'); _setEl('accStat', '100%');
    _setEl('timeStat', '0s'); _setEl('corStat', '0');
    _renderPrompt();
    _resetFingers();
    _highlightNextKey();
  }

  // ── Start ─────────────────────────────────────────────────────────────────
  function startTyping() { resetTyping(); _active = true; focusTyping(); }
  function focusTyping() { document.getElementById('typingHidden')?.focus(); }

  // ── Render prompt ─────────────────────────────────────────────────────────
  function _renderPrompt() {
    const el = document.getElementById('typingPrompt');
    if (!el) return;
    el.innerHTML = _text.split('').map((c, i) => {
      let cls = 'ch';
      if (i < _pos)    cls += ' ck';
      if (i === _pos)  cls += ' cc';
      return `<span class="${cls}">${c === ' ' ? '&nbsp;' : c}</span>`;
    }).join('');
  }

  // ── Highlight next key ────────────────────────────────────────────────────
  function _highlightNextKey() {
    document.querySelectorAll('.kk').forEach(k => k.classList.remove('next','ok','bad'));
    _resetFingers();
    if (_pos >= _text.length) return;

    const nextChar = _text[_pos];
    const nextLower = nextChar.toLowerCase();
    const id = 'kk-' + (nextChar === ' ' ? 'space' : nextLower.replace(/[^a-zA-Z0-9]/g, '_'));
    document.getElementById(id)?.classList.add('next');

    if (!_showHands) return;
    const base = baseKeyOf(nextChar);
    const finger = FINGER_MAP[base];
    if (!finger) return;

    const row = KEY_ROW[base];
    _setFingerActive(finger, { active: true, row });

    // Shift modifier — light up the OPPOSITE pinky as the modifier
    if (SHIFT_PINKY(nextChar)) {
      // Letter on left half (a-g, q-t, z-b) → use right shift (R4)
      // Letter on right half → use left shift (L4)
      const leftHalf = ['L1','L2','L3','L4'].includes(finger);
      const shiftFinger = leftHalf ? 'R4' : 'L4';
      _setFingerActive(shiftFinger, { shift: true, row: 2 });
    }
  }

  // ── Handle input ──────────────────────────────────────────────────────────
  function handleTypingInput(e) {
    const inp = document.getElementById('typingHidden');
    const typed = inp.value; inp.value = '';
    if (!_text || _pos >= _text.length) return;
    if (!_start) { _start = Date.now(); _startTimer(); }

    const expected = _text[_pos];
    const id = 'kk-' + (expected === ' ' ? 'space' : expected.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_'));
    const kEl = document.getElementById(id);

    if (typed === expected) {
      _correct++;
      if (kEl) { kEl.classList.add('ok'); setTimeout(() => kEl.classList.remove('ok'), 180); }
      _pos++;
      _setEl('corStat', _correct);
    } else {
      _errors++;
      // Track the *expected* key as the one the kid is struggling with
      _keyErrors[expected] = (_keyErrors[expected] || 0) + 1;

      if (kEl) { kEl.classList.add('bad'); setTimeout(() => kEl.classList.remove('bad'), 280); }

      // Live error visualisation: flash the wrong + correct fingers briefly
      if (_showHands) {
        const wrongFinger = FINGER_MAP[baseKeyOf(typed)];
        const rightFinger = FINGER_MAP[baseKeyOf(expected)];
        if (wrongFinger) _setFingerActive(wrongFinger, { wrong: true, row: KEY_ROW[baseKeyOf(typed)] });
        if (rightFinger) _setFingerActive(rightFinger, { correct: true, row: KEY_ROW[baseKeyOf(expected)] });
        setTimeout(() => _highlightNextKey(), 480);
        return; // _highlightNextKey will re-render in 480ms
      }
    }

    const acc = Math.round((_correct / (_correct + _errors)) * 100);
    _setEl('accStat', acc + '%');
    _renderPrompt();
    _highlightNextKey();

    if (_pos >= _text.length) {
      clearInterval(_timer);
      const elapsed = (Date.now() - _start) / 1000;
      const wpm = Math.round((_text.split(' ').length / (elapsed / 60)));
      _setEl('wpmStat', wpm);
      const best = parseInt(document.getElementById('bestStat')?.textContent) || 0;
      if (wpm > best) _setEl('bestStat', wpm);

      // Find weakest key for feedback
      const weakestKey = Object.entries(_keyErrors).sort((a,b) => b[1]-a[1])[0];
      const weakHint = weakestKey ? `Weakest key: "${weakestKey[0]}" (${weakestKey[1]} miss${weakestKey[1]===1?'':'es'})` : 'Clean run!';

      // Award XP
      const xpKey = wpm > best ? 'TYPING_PERSONAL_BEST' : 'TYPING_SESSION';
      if (window.TSA?.services?.xp) {
        TSA.services.xp.addXP(xpKey).then(() => {
          if (typeof celebrate === 'function') {
            celebrate('keyboard', 'Session Complete!', `WPM: ${wpm} · Acc: ${acc}% · ${weakHint}`, xpKey === 'TYPING_PERSONAL_BEST' ? '+15 XP' : '+10 XP');
          }
          if (wpm >= 40) TSA.services.xp.awardBadge?.('speed_typer');
        });
      }

      // Persist best WPM + showHands setting to profile
      if (window.TSA?.services?.sessionManager) {
        TSA.services.sessionManager.getActiveProfile().then(p => {
          if (p && wpm > (p.typingStats?.bestWpm || 0)) {
            TSA.services.sessionManager.updateProfile(p.profileId, {
              typingStats: { ...p.typingStats, bestWpm: wpm, sessionsCompleted: (p.typingStats?.sessionsCompleted || 0) + 1, showHands: _showHands }
            });
          }
        });
      }

      setTimeout(resetTyping, 2800);
    }
  }

  function handleTypingKey(e) {
    if (!_active && e.key.length === 1) { _active = true; _start = Date.now(); _startTimer(); }
  }

  function _startTimer() {
    clearInterval(_timer);
    _timer = setInterval(() => {
      const s = Math.round((Date.now() - _start) / 1000);
      _setEl('timeStat', s + 's');
      if (_pos > 0 && s > 0) {
        const wpm = Math.round(_text.slice(0, _pos).split(' ').length / (s / 60));
        _setEl('wpmStat', wpm);
      }
    }, 500);
  }

  function _setEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  // ── Toggle finger guide ──────────────────────────────────────────────────
  function toggleHands(force) {
    _showHands = (typeof force === 'boolean') ? force : !_showHands;
    const host = document.getElementById('virtualHands');
    if (host) host.style.display = _showHands ? '' : 'none';
    const cb = document.getElementById('vhToggle');
    if (cb) cb.checked = _showHands;
    // Persist preference
    if (window.TSA?.services?.sessionManager) {
      TSA.services.sessionManager.getActiveProfile().then(p => {
        if (p) {
          TSA.services.sessionManager.updateProfile(p.profileId, {
            typingStats: { ...p.typingStats, showHands: _showHands }
          });
        }
      });
    }
    _highlightNextKey();
  }

  // ── Wire DOM events ───────────────────────────────────────────────────────
  function _wireEvents() {
    const hidden = document.getElementById('typingHidden');
    if (hidden) {
      hidden.oninput   = handleTypingInput;
      hidden.onkeydown = handleTypingKey;
    }
    const prompt = document.getElementById('typingPrompt');
    if (prompt) prompt.onclick = focusTyping;
    const tog = document.getElementById('vhToggle');
    if (tog) tog.onchange = (e) => toggleHands(e.target.checked);
  }

  // ── Init (called when typing screen loads) ────────────────────────────────
  function init() {
    buildKeyboard();
    buildHands();
    _wireEvents();
    resetTyping();
    // Load profile prefs: best WPM and showHands default
    if (window.TSA?.services?.sessionManager) {
      TSA.services.sessionManager.getActiveProfile().then(p => {
        if (p?.typingStats?.bestWpm) _setEl('bestStat', p.typingStats.bestWpm);
        // Default showHands by age: ON for <12, OFF otherwise — but profile pref wins
        if (typeof p?.typingStats?.showHands === 'boolean') {
          _showHands = p.typingStats.showHands;
        } else {
          const yr = p?.yearGroup || p?.year || 0;
          _showHands = (yr === 0) || (yr >= 3 && yr <= 7);
        }
        toggleHands(_showHands);
      });
    }
  }

  // Register screen route
  if (window.TSA) {
    TSA.routes['typing'] = init;
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  return { init, buildKeyboard, buildHands, resetTyping, startTyping, focusTyping, setTypingLevel, toggleHands, LEVELS, FINGER_MAP };
})();

// Expose globals used by inline HTML onclick handlers
window.TSATyping        = TSATyping;
window.resetTyping      = TSATyping.resetTyping;
window.startTyping      = TSATyping.startTyping;
window.focusTyping      = TSATyping.focusTyping;
window.setTypingLevel   = TSATyping.setTypingLevel;
window.toggleTypingHands = TSATyping.toggleHands;
