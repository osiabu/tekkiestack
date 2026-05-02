/**
 * TekkieStack 2.0 — Educational Games Module (Phase F)
 *
 * 4 playable, replayable mini-games designed for daily return:
 *   1. Bug Hunt        — speed-run debugging (60s timer)
 *   2. Tag Match       — match HTML opening + closing tags (memory game)
 *   3. CSS Painter     — match a target shape with CSS values
 *   4. Logic Loops     — pattern completion (what comes next?)
 *
 * Each game:
 *   - Persists high score to profile
 *   - Awards XP on play, bonus XP on personal best
 *   - Works offline
 *   - Mobile-friendly
 *
 * Author: Aperintel Ltd
 */

const TSAGames = (() => {

  // ── Game registry ────────────────────────────────────────────────────────
  const GAMES = {
    bug_hunt: {
      id: 'bug_hunt',
      title: 'Bug Hunt',
      tagline: 'Spot the typo. Beat the clock.',
      icon: 'bug',
      description: 'A snippet of broken JavaScript appears every 5 seconds. Click the bug. The faster, the more points. Miss three and game over.',
      xp: 25,
    },
    tag_match: {
      id: 'tag_match',
      title: 'Tag Match',
      tagline: 'Pair every opening tag with its closer.',
      icon: 'puzzle',
      description: 'A grid of HTML tags is shuffled. Click an opening tag, then its matching closing tag. Match all pairs in the fewest clicks.',
      xp: 25,
    },
    css_painter: {
      id: 'css_painter',
      title: 'CSS Painter',
      tagline: 'Match the target shape using sliders.',
      icon: 'palette',
      description: 'A target appearance is shown. Adjust width / height / radius / colour sliders to match it. Pixel-diff scoring.',
      xp: 25,
    },
    logic_loops: {
      id: 'logic_loops',
      title: 'Logic Loops',
      tagline: 'What comes next in the pattern?',
      icon: 'pattern',
      description: 'A sequence appears. Pick the correct next item. 10 rounds, escalating difficulty.',
      xp: 25,
    },
  };

  // ── Buggy snippets for Bug Hunt ──────────────────────────────────────────
  const BUG_SNIPPETS = [
    { code: 'function add(a, b) {\n  return a + B;\n}', bug: 'B', explain: 'Variable name should be lowercase b.' },
    { code: 'const arr = [1, 2, 3];\narr.lenght;', bug: 'lenght', explain: 'Typo: should be `length`.' },
    { code: 'if (x = 5) {\n  console.log("five");\n}', bug: '=', explain: '`=` is assignment. Should be `==` or `===`.' },
    { code: 'for (let i = 0; i < 10 i++) {\n  total += i;\n}', bug: ';', explain: 'Missing semicolon between condition and increment.' },
    { code: 'document.getElementByID("btn")', bug: 'ID', explain: '`getElementById`, capital I, lowercase d.' },
    { code: 'const name = "Alex"\nconsole.log(nme);', bug: 'nme', explain: 'Typo: variable is `name`, not `nme`.' },
    { code: 'function greet() {\n  return "Hello"\n}', bug: '"Hello"', explain: 'Missing semicolon after the return value.' },
    { code: 'arr.map(n => n * 2;)', bug: ';)', explain: '`;` should be inside the function body, not after the arrow.' },
    { code: 'if (x > 0)\n  console.log(x)\n  console.log("done");', bug: 'done', explain: 'Without braces, only the first line is part of the if. Both lines run regardless, silent bug.' },
    { code: 'const obj = { name: "Sam"; age: 10 };', bug: ';', explain: 'Object properties separate with commas, not semicolons.' },
    { code: 'console.log("hello world);', bug: ');', explain: 'Missing closing `"` before `)`.' },
    { code: 'let x == 10;', bug: '==', explain: '`let x == 10` is a comparison, not an assignment. Use `=`.' },
    { code: 'const colors = ["red", "blue" "green"];', bug: '"green"', explain: 'Missing comma between array items.' },
    { code: 'if (count > 5) {\n  alert("big")\n}\nelse {\n  alert("small")\n}', bug: 'else', explain: 'In strict style, `else` should be on the same line as the closing `}`.' },
    { code: 'document.querySelector(".btn").style.colour = "red";', bug: 'colour', explain: 'CSS property in JS uses American spelling: `color`.' },
  ];

  // ── HTML tag pairs for Tag Match ─────────────────────────────────────────
  const TAG_PAIRS = ['div','p','h1','h2','span','a','ul','li','section','header','footer','nav','article','button','strong','em'];

  // ── Pattern sequences for Logic Loops ────────────────────────────────────
  const PATTERN_ROUNDS = [
    { seq: ['2','4','6','8'], options: ['9','10','11','12'], answer: '10' },
    { seq: ['A','C','E','G'], options: ['H','I','J','K'], answer: 'I' },
    { seq: ['1','1','2','3','5'], options: ['6','7','8','9'], answer: '8' },
    { seq: ['10','9','8','7'], options: ['5','6','7','8'], answer: '6' },
    { seq: ['Mon','Tue','Wed','Thu'], options: ['Sat','Sun','Fri','Mon'], answer: 'Fri' },
    { seq: ['🔵','🔴','🔵','🔴'], options: ['🔴','🟡','🟢','🔵'], answer: '🔵' },
    { seq: ['1','4','9','16'], options: ['20','25','30','36'], answer: '25' },
    { seq: ['Z','X','V','T'], options: ['Q','R','S','U'], answer: 'R' },
    { seq: ['2','3','5','7','11'], options: ['12','13','14','15'], answer: '13' },
    { seq: ['→','↓','←','↑'], options: ['↑','↗','→','↘'], answer: '→' },
  ];

  // ── State ────────────────────────────────────────────────────────────────
  let _state = {
    activeGame: null,
    score: 0,
    bestScore: 0,
    timeLeft: 60,
    timer: null,
    misses: 0,
    round: 0,
  };

  // ── Render games hub ─────────────────────────────────────────────────────
  function renderHub() {
    const screen = document.getElementById('s-games');
    if (!screen) return;
    const cards = Object.values(GAMES).map(g => `
      <div class="game-card" onclick="TSAGames.startGame('${g.id}')" role="button" tabindex="0">
        <div class="game-card-icon"><span class="ts-i ts-i-${g.icon}" aria-hidden="true"></span></div>
        <div class="game-card-title">${g.title}</div>
        <div class="game-card-tagline">${g.tagline}</div>
        <div class="game-card-desc">${g.description}</div>
        <div class="game-card-xp">+${g.xp} XP per play</div>
      </div>
    `).join('');
    screen.innerHTML = `
      <div class="games-screen">
        <div class="games-header">
          <h2 class="games-title">Games</h2>
          <p class="games-sub">Quick brain workouts. Code-flavoured. Daily-return-worthy.</p>
        </div>
        <div class="games-grid">${cards}</div>
        <div id="gameStage"></div>
      </div>
    `;
    _loadHighScores();
  }

  async function _loadHighScores() {
    if (!window.TSA?.services?.sessionManager) return;
    const p = await TSA.services.sessionManager.getActiveProfile();
    if (!p) return;
    const stats = p.gameStats || {};
    document.querySelectorAll('.game-card').forEach(card => {
      const onclick = card.getAttribute('onclick') || '';
      const m = onclick.match(/startGame\('(\w+)'\)/);
      if (!m) return;
      const id = m[1];
      const best = stats[id]?.bestScore;
      if (typeof best === 'number') {
        const xpEl = card.querySelector('.game-card-xp');
        if (xpEl) xpEl.innerHTML += ` &middot; <strong>Best: ${best}</strong>`;
      }
    });
  }

  // ── Start a game ─────────────────────────────────────────────────────────
  function startGame(gameId) {
    if (gameId === 'bug_hunt')      _startBugHunt();
    else if (gameId === 'tag_match') _startTagMatch();
    else if (gameId === 'css_painter') _startCSSPainter();
    else if (gameId === 'logic_loops') _startLogicLoops();
  }

  // ── Bug Hunt ─────────────────────────────────────────────────────────────
  function _startBugHunt() {
    _state = { activeGame: 'bug_hunt', score: 0, timeLeft: 60, misses: 0, timer: null, round: 0 };
    const stage = document.getElementById('gameStage');
    if (!stage) return;
    stage.innerHTML = `
      <div class="game-stage">
        <div class="game-stage-bar">
          <button class="btn btn-gh" onclick="TSAGames.exitGame()"><span class="ts-i ts-i-close" aria-hidden="true"></span>Exit</button>
          <div class="game-stat">Score: <strong id="bhScore">0</strong></div>
          <div class="game-stat">Time: <strong id="bhTime">60s</strong></div>
          <div class="game-stat">Misses: <strong id="bhMisses">0/3</strong></div>
        </div>
        <div id="bhSnippetWrap" class="game-snippet-wrap">
          <div class="game-instructions">Click the bug in the code below, the bit that\'s wrong.</div>
          <div id="bhSnippet" class="game-snippet"></div>
          <div id="bhFeedback" class="game-feedback"></div>
        </div>
      </div>
    `;
    _bhNextRound();
    _state.timer = setInterval(() => {
      _state.timeLeft--;
      const t = document.getElementById('bhTime');
      if (t) t.textContent = _state.timeLeft + 's';
      if (_state.timeLeft <= 0) _bhEnd();
    }, 1000);
  }

  function _bhNextRound() {
    const snippet = BUG_SNIPPETS[Math.floor(Math.random() * BUG_SNIPPETS.length)];
    _state.currentBug = snippet.bug;
    _state.currentExplain = snippet.explain;
    const wrap = document.getElementById('bhSnippet');
    const fb = document.getElementById('bhFeedback');
    if (!wrap) return;
    if (fb) fb.textContent = '';
    // Render code with each token clickable
    const lines = snippet.code.split('\n');
    wrap.innerHTML = lines.map(line =>
      `<div class="bh-line">${line.split(/(\s+)/).map(tok =>
        tok.match(/^\s+$/) ? tok : `<span class="bh-tok" data-tok="${tok.replace(/"/g,'&quot;')}">${tok.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</span>`
      ).join('')}</div>`
    ).join('');
    wrap.querySelectorAll('.bh-tok').forEach(t => {
      t.onclick = () => _bhCheck(t);
    });
  }

  function _bhCheck(el) {
    const tok = el.dataset.tok;
    const fb = document.getElementById('bhFeedback');
    if (tok === _state.currentBug || tok.includes(_state.currentBug)) {
      _state.score += 10;
      el.classList.add('bh-correct');
      if (fb) fb.innerHTML = `<strong class="game-fb-good">Got it!</strong> ${_state.currentExplain}`;
      _setEl('bhScore', _state.score);
      setTimeout(_bhNextRound, 900);
    } else {
      _state.misses++;
      el.classList.add('bh-wrong');
      _setEl('bhMisses', `${_state.misses}/3`);
      if (fb) fb.innerHTML = `<strong class="game-fb-bad">Not quite, try again.</strong>`;
      if (_state.misses >= 3) _bhEnd();
    }
  }

  function _bhEnd() {
    clearInterval(_state.timer);
    _finishGame('bug_hunt', _state.score);
  }

  // ── Tag Match ────────────────────────────────────────────────────────────
  function _startTagMatch() {
    _state = { activeGame: 'tag_match', score: 0, clicks: 0, matched: 0, firstPick: null, timer: null };
    const stage = document.getElementById('gameStage');
    if (!stage) return;
    // Use 8 random pairs (16 cards total)
    const pairs = [...TAG_PAIRS].sort(() => Math.random()-0.5).slice(0, 8);
    const cards = [];
    pairs.forEach(t => {
      cards.push({ tag: t, kind: 'open' });
      cards.push({ tag: t, kind: 'close' });
    });
    cards.sort(() => Math.random()-0.5);
    _state.deck = cards;
    _state.totalPairs = pairs.length;

    stage.innerHTML = `
      <div class="game-stage">
        <div class="game-stage-bar">
          <button class="btn btn-gh" onclick="TSAGames.exitGame()"><span class="ts-i ts-i-close" aria-hidden="true"></span>Exit</button>
          <div class="game-stat">Pairs: <strong id="tmPairs">0/${pairs.length}</strong></div>
          <div class="game-stat">Clicks: <strong id="tmClicks">0</strong></div>
        </div>
        <div class="game-instructions">Match opening tags to their closing tags. Fewer clicks = better score.</div>
        <div class="tm-grid" id="tmGrid">
          ${cards.map((c, i) => `
            <button class="tm-card" data-i="${i}" data-tag="${c.tag}" data-kind="${c.kind}" onclick="TSAGames._tmFlip(${i})">
              <span class="tm-q">?</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function _tmFlip(i) {
    const card = document.querySelector(`.tm-card[data-i="${i}"]`);
    if (!card || card.classList.contains('matched') || card.classList.contains('flipped')) return;
    const c = _state.deck[i];
    card.classList.add('flipped');
    card.querySelector('.tm-q').textContent = c.kind === 'open' ? `<${c.tag}>` : `</${c.tag}>`;
    _state.clicks++;
    _setEl('tmClicks', _state.clicks);

    if (!_state.firstPick) {
      _state.firstPick = { i, c };
    } else {
      const prev = _state.firstPick;
      _state.firstPick = null;
      // Match if same tag, opposite kinds
      if (prev.c.tag === c.tag && prev.c.kind !== c.kind) {
        document.querySelector(`.tm-card[data-i="${prev.i}"]`)?.classList.add('matched');
        card.classList.add('matched');
        _state.matched++;
        _setEl('tmPairs', `${_state.matched}/${_state.totalPairs}`);
        if (_state.matched === _state.totalPairs) {
          // Score: more pairs / fewer clicks = higher.
          const score = Math.max(0, Math.round((_state.totalPairs * 20) - (_state.clicks - _state.totalPairs * 2) * 5));
          _finishGame('tag_match', score);
        }
      } else {
        // Flip back after a beat
        const prevCard = document.querySelector(`.tm-card[data-i="${prev.i}"]`);
        setTimeout(() => {
          prevCard?.classList.remove('flipped');
          card.classList.remove('flipped');
          if (prevCard) prevCard.querySelector('.tm-q').textContent = '?';
          card.querySelector('.tm-q').textContent = '?';
        }, 700);
      }
    }
  }

  // ── CSS Painter ──────────────────────────────────────────────────────────
  function _startCSSPainter() {
    _state = { activeGame: 'css_painter', round: 0, score: 0 };
    const stage = document.getElementById('gameStage');
    if (!stage) return;

    // Generate a random target
    const tw = 30 + Math.floor(Math.random() * 70);   // 30-100%
    const th = 30 + Math.floor(Math.random() * 70);
    const tr = Math.floor(Math.random() * 50);        // 0-50% radius
    const targetHues = [200, 0, 30, 180, 120, 280, 320];
    const th_hue = targetHues[Math.floor(Math.random() * targetHues.length)];
    _state.target = { w: tw, h: th, r: tr, hue: th_hue };

    stage.innerHTML = `
      <div class="game-stage">
        <div class="game-stage-bar">
          <button class="btn btn-gh" onclick="TSAGames.exitGame()"><span class="ts-i ts-i-close" aria-hidden="true"></span>Exit</button>
          <div class="game-stat">Match the shape!</div>
          <button class="btn btn-cy" onclick="TSAGames._cssCheck()"><span class="ts-i ts-i-check" aria-hidden="true"></span>Score it</button>
        </div>
        <div class="cssp-row">
          <div class="cssp-pane">
            <div class="cssp-label">Target</div>
            <div class="cssp-stage">
              <div id="cspTarget" style="width:${tw}%;height:${th}%;border-radius:${tr}%;background:hsl(${th_hue},70%,52%)"></div>
            </div>
          </div>
          <div class="cssp-pane">
            <div class="cssp-label">Your version</div>
            <div class="cssp-stage">
              <div id="cspYou" style="width:50%;height:50%;border-radius:0%;background:hsl(180,70%,52%)"></div>
            </div>
          </div>
        </div>
        <div class="cssp-controls">
          <label>Width <input type="range" min="10" max="100" value="50" oninput="TSAGames._cssUpdate('w',this.value)"><span id="cspWv">50%</span></label>
          <label>Height <input type="range" min="10" max="100" value="50" oninput="TSAGames._cssUpdate('h',this.value)"><span id="cspHv">50%</span></label>
          <label>Border radius <input type="range" min="0" max="50" value="0" oninput="TSAGames._cssUpdate('r',this.value)"><span id="cspRv">0%</span></label>
          <label>Hue <input type="range" min="0" max="360" value="180" oninput="TSAGames._cssUpdate('hue',this.value)"><span id="cspHv2">180</span></label>
        </div>
        <div id="cspFeedback" class="game-feedback"></div>
      </div>
    `;
    _state.you = { w: 50, h: 50, r: 0, hue: 180 };
  }

  function _cssUpdate(field, val) {
    _state.you[field] = parseInt(val);
    const e = document.getElementById('cspYou');
    if (!e) return;
    e.style.width = _state.you.w + '%';
    e.style.height = _state.you.h + '%';
    e.style.borderRadius = _state.you.r + '%';
    e.style.background = `hsl(${_state.you.hue},70%,52%)`;
    _setEl('cspWv', _state.you.w + '%');
    _setEl('cspHv', _state.you.h + '%');
    _setEl('cspRv', _state.you.r + '%');
    _setEl('cspHv2', _state.you.hue);
  }

  function _cssCheck() {
    const t = _state.target, y = _state.you;
    // Score: 100 minus average % difference, clamped
    const dw = Math.abs(t.w - y.w);
    const dh = Math.abs(t.h - y.h);
    const dr = Math.abs(t.r - y.r);
    let dhue = Math.abs(t.hue - y.hue);
    if (dhue > 180) dhue = 360 - dhue;
    const avg = (dw + dh + dr + dhue/3.6) / 4;
    const score = Math.max(0, Math.round(100 - avg * 1.6));
    const fb = document.getElementById('cspFeedback');
    if (fb) fb.innerHTML = `<strong class="game-fb-good">Score: ${score}/100</strong> ${score >= 90 ? ', pixel perfect!' : score >= 70 ? ', close!' : score >= 50 ? ', getting there.' : ', off by a lot, try again.'}`;
    _finishGame('css_painter', score);
  }

  // ── Logic Loops ──────────────────────────────────────────────────────────
  function _startLogicLoops() {
    _state = { activeGame: 'logic_loops', round: 0, score: 0, totalRounds: PATTERN_ROUNDS.length };
    _llRender();
  }

  function _llRender() {
    const stage = document.getElementById('gameStage');
    if (!stage) return;
    if (_state.round >= _state.totalRounds) {
      _finishGame('logic_loops', _state.score);
      return;
    }
    const round = PATTERN_ROUNDS[_state.round];
    stage.innerHTML = `
      <div class="game-stage">
        <div class="game-stage-bar">
          <button class="btn btn-gh" onclick="TSAGames.exitGame()"><span class="ts-i ts-i-close" aria-hidden="true"></span>Exit</button>
          <div class="game-stat">Round: <strong>${_state.round + 1}/${_state.totalRounds}</strong></div>
          <div class="game-stat">Score: <strong>${_state.score}</strong></div>
        </div>
        <div class="game-instructions">What comes next?</div>
        <div class="ll-seq">
          ${round.seq.map(s => `<div class="ll-cell">${s}</div>`).join('')}
          <div class="ll-cell ll-cell-q">?</div>
        </div>
        <div class="ll-options">
          ${round.options.map(o => `<button class="ll-opt" onclick="TSAGames._llPick('${o.replace(/'/g,"\\'")}')">${o}</button>`).join('')}
        </div>
      </div>
    `;
  }

  function _llPick(answer) {
    const round = PATTERN_ROUNDS[_state.round];
    const stage = document.getElementById('gameStage');
    if (answer === round.answer) {
      _state.score += 10;
      const banner = document.createElement('div');
      banner.className = 'game-banner game-banner-good';
      banner.textContent = 'Correct!';
      stage?.appendChild(banner);
      setTimeout(() => { banner.remove(); _state.round++; _llRender(); }, 600);
    } else {
      const banner = document.createElement('div');
      banner.className = 'game-banner game-banner-bad';
      banner.innerHTML = `Not quite, answer was <strong>${round.answer}</strong>`;
      stage?.appendChild(banner);
      setTimeout(() => { banner.remove(); _state.round++; _llRender(); }, 1500);
    }
  }

  // ── Finish a game (shared logic) ─────────────────────────────────────────
  async function _finishGame(gameId, score) {
    const game = GAMES[gameId];
    if (!window.TSA?.services?.sessionManager) {
      _showResult(game, score, false);
      return;
    }
    const p = await TSA.services.sessionManager.getActiveProfile();
    if (!p) { _showResult(game, score, false); return; }

    const stats = p.gameStats || {};
    const prev = stats[gameId] || { bestScore: 0, plays: 0 };
    const isPB = score > prev.bestScore;
    stats[gameId] = {
      bestScore: Math.max(prev.bestScore, score),
      plays: prev.plays + 1,
      lastScore: score,
      lastPlayed: new Date().toISOString().slice(0, 10),
    };
    await TSA.services.sessionManager.updateProfile(p.profileId, { gameStats: stats });

    // Award XP
    if (TSA.services.xp?.addXP) {
      await TSA.services.xp.addXP('GAME_PLAY', isPB ? game.xp + 10 : game.xp);
    }
    _showResult(game, score, isPB);
  }

  function _showResult(game, score, isPB) {
    const stage = document.getElementById('gameStage');
    if (!stage) return;
    stage.innerHTML += `
      <div class="game-result">
        <div class="game-result-icon"><span class="ts-i ts-i-${isPB ? 'trophy' : 'check_circle'} ts-i-on-cyan" aria-hidden="true"></span></div>
        <div class="game-result-title">${isPB ? 'Personal Best!' : 'Game over'}</div>
        <div class="game-result-score">${score}</div>
        <div class="game-result-xp">+${isPB ? game.xp + 10 : game.xp} XP</div>
        <div class="game-result-actions">
          <button class="btn btn-cy" onclick="TSAGames.startGame('${game.id}')"><span class="ts-i ts-i-refresh" aria-hidden="true"></span>Play Again</button>
          <button class="btn btn-gh" onclick="TSAGames.exitGame()"><span class="ts-i ts-i-arrow_left" aria-hidden="true"></span>Back to Games</button>
        </div>
      </div>
    `;
    if (typeof celebrate === 'function' && isPB) {
      celebrate('trophy', 'Personal Best!', `${game.title}: ${score}`, `+${game.xp + 10} XP`);
    }
  }

  function exitGame() {
    if (_state.timer) clearInterval(_state.timer);
    _state = { activeGame: null, score: 0, timeLeft: 60, misses: 0, timer: null, round: 0 };
    renderHub();
  }

  function _setEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  // ── Register screen route ────────────────────────────────────────────────
  if (window.TSA) {
    TSA.routes['games'] = renderHub;
  }

  return { renderHub, startGame, exitGame, _tmFlip, _cssUpdate, _cssCheck, _llPick, GAMES };
})();

if (typeof window !== 'undefined') {
  window.TSAGames = TSAGames;
}
