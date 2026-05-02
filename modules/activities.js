/**
 * TekkieStack 2.0 — Interactive Activity Widgets
 *
 * Self-grading activity types used inside lesson HTML. Every widget
 * registers itself with TSAActivities so Mark Complete can verify
 * that all activities on the screen have been answered correctly
 * before awarding XP. NO free-text input, NO AI calls, NO ambiguity:
 * every widget produces a binary correct / not-correct answer.
 *
 * Widget types:
 *   - drag-order   — drag steps into the right sequence
 *   - choice       — single-answer multiple choice
 *   - multi-choice — multi-answer "tick all that apply"
 *   - classify     — drag items into labelled buckets
 *   - tap-fill     — tap word chips to fill blanks in a template
 *
 * Usage in a lesson HTML string:
 *   <div class="ts-activity"
 *        data-type="drag-order"
 *        data-id="j1-l1-a1"
 *        data-config='{"prompt":"...","items":[...],"correctOrder":[2,0,1,3]}'>
 *   </div>
 *
 * The library auto-mounts every .ts-activity inside the lesson view
 * on render and tracks completion state in window._tsActivityState.
 *
 * Author: Aperintel Ltd
 */

const TSAActivities = (() => {

  // ── State ────────────────────────────────────────────────────────────────
  // Map of activityId -> { type, correct, attempts, host }
  const _state = new Map();

  function _markCorrect(id, host) {
    const rec = _state.get(id) || {};
    rec.correct = true;
    _state.set(id, rec);
    if (host) {
      host.classList.add('ts-act-done');
      const banner = host.querySelector('.ts-act-feedback');
      if (banner) {
        banner.className = 'ts-act-feedback ts-act-feedback-good';
        banner.innerHTML = '<span class="ts-i ts-i-check_circle" aria-hidden="true"></span> Correct!';
      }
    }
  }
  function _markWrong(id, host, msg) {
    const rec = _state.get(id) || {};
    rec.correct = false;
    rec.attempts = (rec.attempts || 0) + 1;
    _state.set(id, rec);
    if (host) {
      host.classList.add('ts-act-shake');
      setTimeout(() => host.classList.remove('ts-act-shake'), 400);
      const banner = host.querySelector('.ts-act-feedback');
      if (banner) {
        banner.className = 'ts-act-feedback ts-act-feedback-bad';
        banner.innerHTML = `<span class="ts-i ts-i-warning" aria-hidden="true"></span> ${msg || 'Not quite, try again.'}`;
      }
    }
  }

  // Public: are all activities currently mounted answered correctly?
  function allCorrect(rootEl) {
    const root = rootEl || document;
    const widgets = root.querySelectorAll('.ts-activity');
    if (widgets.length === 0) return true;
    let allOk = true;
    widgets.forEach(w => {
      const id = w.dataset.id;
      const rec = _state.get(id);
      if (!rec || !rec.correct) {
        allOk = false;
        // Highlight the unfinished one so the user can find it
        w.classList.add('ts-act-needs-answer');
        setTimeout(() => w.classList.remove('ts-act-needs-answer'), 1600);
      }
    });
    return allOk;
  }

  // Public: list which activities are unanswered (used for friendlier error)
  function pending(rootEl) {
    const root = rootEl || document;
    const widgets = root.querySelectorAll('.ts-activity');
    const out = [];
    widgets.forEach(w => {
      const id = w.dataset.id;
      const rec = _state.get(id);
      if (!rec || !rec.correct) out.push({ id, label: w.dataset.label || w.dataset.id });
    });
    return out;
  }

  function reset(rootEl) {
    const root = rootEl || document;
    root.querySelectorAll('.ts-activity').forEach(w => {
      _state.delete(w.dataset.id);
    });
  }

  // ── Mount: scan DOM for .ts-activity nodes and wire each up ─────────────
  function mountAll(rootEl) {
    const root = rootEl || document;
    root.querySelectorAll('.ts-activity:not(.ts-act-mounted)').forEach(host => {
      const type   = host.dataset.type;
      const id     = host.dataset.id;
      let cfg = {};
      try { cfg = JSON.parse(host.dataset.config || '{}'); }
      catch (e) { console.warn('[Activities] bad config for', id, e); cfg = {}; }
      host.classList.add('ts-act-mounted');
      _state.set(id, { type, correct: false, attempts: 0 });

      switch (type) {
        case 'drag-order':   _renderDragOrder(host, id, cfg);   break;
        case 'choice':       _renderChoice(host, id, cfg);      break;
        case 'multi-choice': _renderMultiChoice(host, id, cfg); break;
        case 'classify':     _renderClassify(host, id, cfg);    break;
        case 'tap-fill':     _renderTapFill(host, id, cfg);     break;
        default:             host.innerHTML = '<em>Unknown activity type: ' + type + '</em>';
      }
    });
  }

  // ── Widget: drag-order ───────────────────────────────────────────────────
  // cfg: { prompt, items: [string,...], correctOrder: [int,...] }
  // correctOrder gives the index of cfg.items that should appear at each
  // position. e.g. items=['A','B','C'], correctOrder=[2,0,1] means C,A,B.
  function _renderDragOrder(host, id, cfg) {
    const items = (cfg.items || []).map((text, i) => ({ text, originalIdx: i }));
    // Shuffle the displayed order
    const display = [...items].sort(() => Math.random() - 0.5);

    host.innerHTML = `
      <div class="ts-act-card ts-act-drag-order">
        <div class="ts-act-prompt">${cfg.prompt || 'Drag the steps into the right order:'}</div>
        <ol class="ts-act-list" id="${_escId(id)}-list"></ol>
        <div class="ts-act-bar">
          <button class="ts-act-check" type="button">Check answer</button>
          <span class="ts-act-feedback"></span>
        </div>
      </div>
    `;
    const list = host.querySelector('.ts-act-list');
    display.forEach(it => {
      const li = document.createElement('li');
      li.className = 'ts-act-item';
      li.draggable = true;
      li.dataset.idx = it.originalIdx;
      li.innerHTML = `
        <span class="ts-act-grip" aria-hidden="true">⋮⋮</span>
        <span class="ts-act-text">${_esc(it.text)}</span>
        <span class="ts-act-arrows">
          <button type="button" class="ts-act-up" aria-label="Move up">▲</button>
          <button type="button" class="ts-act-down" aria-label="Move down">▼</button>
        </span>`;
      list.appendChild(li);
    });

    // Drag-and-drop reordering
    let dragged = null;
    list.querySelectorAll('.ts-act-item').forEach(li => {
      li.addEventListener('dragstart', e => { dragged = li; li.classList.add('ts-act-dragging'); e.dataTransfer.effectAllowed = 'move'; });
      li.addEventListener('dragend',   () => { li.classList.remove('ts-act-dragging'); dragged = null; });
      li.addEventListener('dragover',  e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
      li.addEventListener('drop', e => {
        e.preventDefault();
        if (!dragged || dragged === li) return;
        const rect = li.getBoundingClientRect();
        const after = (e.clientY - rect.top) > rect.height / 2;
        list.insertBefore(dragged, after ? li.nextSibling : li);
      });
    });

    // Up/down arrow buttons (mobile + accessibility fallback)
    list.addEventListener('click', e => {
      const li = e.target.closest('.ts-act-item');
      if (!li) return;
      if (e.target.classList.contains('ts-act-up')) {
        if (li.previousElementSibling) list.insertBefore(li, li.previousElementSibling);
      } else if (e.target.classList.contains('ts-act-down')) {
        if (li.nextElementSibling) list.insertBefore(li.nextElementSibling, li);
      }
    });

    // Check answer
    host.querySelector('.ts-act-check').addEventListener('click', () => {
      const order = Array.from(list.querySelectorAll('.ts-act-item')).map(li => parseInt(li.dataset.idx));
      const correct = JSON.stringify(order) === JSON.stringify(cfg.correctOrder || []);
      if (correct) {
        _markCorrect(id, host);
        list.querySelectorAll('.ts-act-item').forEach(li => li.draggable = false);
      } else {
        // Highlight items that are out of position
        list.querySelectorAll('.ts-act-item').forEach((li, pos) => {
          const isInRightSpot = parseInt(li.dataset.idx) === (cfg.correctOrder || [])[pos];
          li.classList.toggle('ts-act-misplaced', !isInRightSpot);
        });
        _markWrong(id, host, cfg.wrongMsg || 'Some items are out of order. Adjust and check again.');
      }
    });
  }

  // ── Widget: choice (single-answer multi-choice) ─────────────────────────
  // cfg: { prompt, options: [string,...], correctIndex: int, explainCorrect?, explainWrong? }
  function _renderChoice(host, id, cfg) {
    host.innerHTML = `
      <div class="ts-act-card ts-act-choice">
        <div class="ts-act-prompt">${cfg.prompt || 'Pick one:'}</div>
        <div class="ts-act-options">
          ${(cfg.options || []).map((opt, i) => `
            <label class="ts-act-opt">
              <input type="radio" name="${_escId(id)}" value="${i}">
              <span>${_esc(opt)}</span>
            </label>
          `).join('')}
        </div>
        <div class="ts-act-bar">
          <button class="ts-act-check" type="button">Check answer</button>
          <span class="ts-act-feedback"></span>
        </div>
      </div>
    `;
    host.querySelector('.ts-act-check').addEventListener('click', () => {
      const sel = host.querySelector(`input[name="${_escId(id)}"]:checked`);
      if (!sel) { _markWrong(id, host, 'Pick one of the options first.'); return; }
      const chosen = parseInt(sel.value);
      const correct = chosen === cfg.correctIndex;
      // Mark each option visually
      host.querySelectorAll('.ts-act-opt').forEach((label, i) => {
        label.classList.toggle('ts-act-opt-correct', i === cfg.correctIndex && correct);
        label.classList.toggle('ts-act-opt-wrong',   i === chosen        && !correct);
      });
      if (correct) {
        _markCorrect(id, host);
        if (cfg.explainCorrect) {
          const fb = host.querySelector('.ts-act-feedback');
          if (fb) fb.innerHTML += ' <span class="ts-act-explain">' + _esc(cfg.explainCorrect) + '</span>';
        }
      } else {
        _markWrong(id, host, cfg.explainWrong || 'Not that one. Try again.');
      }
    });
  }

  // ── Widget: multi-choice (tick-all-that-apply) ──────────────────────────
  // cfg: { prompt, options: [string,...], correctIndices: [int,...] }
  function _renderMultiChoice(host, id, cfg) {
    host.innerHTML = `
      <div class="ts-act-card ts-act-choice">
        <div class="ts-act-prompt">${cfg.prompt || 'Tick all that apply:'}</div>
        <div class="ts-act-options">
          ${(cfg.options || []).map((opt, i) => `
            <label class="ts-act-opt ts-act-opt-multi">
              <input type="checkbox" data-idx="${i}">
              <span>${_esc(opt)}</span>
            </label>
          `).join('')}
        </div>
        <div class="ts-act-bar">
          <button class="ts-act-check" type="button">Check answer</button>
          <span class="ts-act-feedback"></span>
        </div>
      </div>
    `;
    host.querySelector('.ts-act-check').addEventListener('click', () => {
      const checked = Array.from(host.querySelectorAll('input[type="checkbox"]:checked')).map(c => parseInt(c.dataset.idx)).sort();
      const expect = [...(cfg.correctIndices || [])].sort();
      const correct = JSON.stringify(checked) === JSON.stringify(expect);
      // Visual feedback
      host.querySelectorAll('.ts-act-opt').forEach((label, i) => {
        const isExpected = expect.includes(i);
        const isChecked = checked.includes(i);
        label.classList.toggle('ts-act-opt-correct', isExpected && isChecked && correct);
        label.classList.toggle('ts-act-opt-wrong',  !isExpected && isChecked);
      });
      if (correct) _markCorrect(id, host);
      else _markWrong(id, host, cfg.wrongMsg || 'Not quite, check your selection.');
    });
  }

  // ── Widget: classify (drag items into labelled buckets) ─────────────────
  // cfg: { prompt, items: [{text,bucket}...], buckets: [string,...] }
  function _renderClassify(host, id, cfg) {
    const itemsShuffled = [...(cfg.items || [])].sort(() => Math.random() - 0.5);
    host.innerHTML = `
      <div class="ts-act-card ts-act-classify">
        <div class="ts-act-prompt">${cfg.prompt || 'Drag each item into the correct group.'}</div>
        <div class="ts-act-pool" id="${_escId(id)}-pool">
          ${itemsShuffled.map((it, i) => `
            <div class="ts-act-chip" draggable="true" data-correct="${_esc(it.bucket)}" data-i="${i}">${_esc(it.text)}</div>
          `).join('')}
        </div>
        <div class="ts-act-buckets">
          ${(cfg.buckets || []).map(b => `
            <div class="ts-act-bucket" data-bucket="${_esc(b)}">
              <div class="ts-act-bucket-label">${_esc(b)}</div>
              <div class="ts-act-bucket-drop"></div>
            </div>
          `).join('')}
        </div>
        <div class="ts-act-bar">
          <button class="ts-act-check" type="button">Check answer</button>
          <span class="ts-act-feedback"></span>
        </div>
      </div>
    `;
    let dragged = null;
    host.querySelectorAll('.ts-act-chip').forEach(chip => {
      chip.addEventListener('dragstart', () => { dragged = chip; chip.classList.add('ts-act-dragging'); });
      chip.addEventListener('dragend',   () => { chip.classList.remove('ts-act-dragging'); dragged = null; });
    });
    // Buckets + pool both accept drops (move chip back if needed)
    host.querySelectorAll('.ts-act-bucket-drop, .ts-act-pool').forEach(zone => {
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('ts-act-drop-hover'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('ts-act-drop-hover'));
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('ts-act-drop-hover');
        if (dragged) zone.appendChild(dragged);
      });
    });
    // Tap fallback for mobile: tap chip then tap target bucket/pool
    let tapSelected = null;
    host.querySelectorAll('.ts-act-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        host.querySelectorAll('.ts-act-chip').forEach(c => c.classList.remove('ts-act-tap-selected'));
        if (tapSelected === chip) { tapSelected = null; return; }
        tapSelected = chip;
        chip.classList.add('ts-act-tap-selected');
      });
    });
    host.querySelectorAll('.ts-act-bucket-drop, .ts-act-pool').forEach(zone => {
      zone.addEventListener('click', () => {
        if (tapSelected) { zone.appendChild(tapSelected); tapSelected.classList.remove('ts-act-tap-selected'); tapSelected = null; }
      });
    });

    host.querySelector('.ts-act-check').addEventListener('click', () => {
      let allOk = true;
      host.querySelectorAll('.ts-act-bucket').forEach(bucket => {
        const want = bucket.dataset.bucket;
        bucket.querySelectorAll('.ts-act-chip').forEach(chip => {
          const ok = chip.dataset.correct === want;
          chip.classList.toggle('ts-act-chip-correct', ok);
          chip.classList.toggle('ts-act-chip-wrong', !ok);
          if (!ok) allOk = false;
        });
      });
      // Any chips still in the pool means incomplete
      const stillInPool = host.querySelectorAll('#' + CSS.escape(id) + '-pool .ts-act-chip').length;
      if (stillInPool > 0) allOk = false;
      if (allOk) _markCorrect(id, host);
      else _markWrong(id, host, cfg.wrongMsg || 'Some items are in the wrong group. Move them and try again.');
    });
  }

  // ── Widget: tap-fill (tap chips to fill blanks) ─────────────────────────
  // cfg: { prompt, template, blanks: [{answer:'X', options:['X','Y','Z']}, ...] }
  // template uses ___ as the blank marker, in order.
  function _renderTapFill(host, id, cfg) {
    const blanks = cfg.blanks || [];
    let parts = (cfg.template || '').split('___');
    // Pool of all options (deduped, shuffled)
    const pool = [...new Set(blanks.flatMap(b => b.options))].sort(() => Math.random() - 0.5);
    host.innerHTML = `
      <div class="ts-act-card ts-act-tap-fill">
        <div class="ts-act-prompt">${cfg.prompt || 'Tap a word to fill each blank:'}</div>
        <div class="ts-act-tf-template">${
          parts.map((p, i) => `
            ${_esc(p)}${i < blanks.length ? `<button class="ts-act-tf-blank" type="button" data-blank="${i}" data-answer="${_esc(blanks[i].answer)}">_____</button>` : ''}
          `).join('')
        }</div>
        <div class="ts-act-tf-pool">
          ${pool.map(p => `<button class="ts-act-tf-chip" type="button">${_esc(p)}</button>`).join('')}
        </div>
        <div class="ts-act-bar">
          <button class="ts-act-check" type="button">Check answer</button>
          <span class="ts-act-feedback"></span>
        </div>
      </div>
    `;
    let activeBlank = null;
    host.querySelectorAll('.ts-act-tf-blank').forEach(b => {
      b.addEventListener('click', () => {
        host.querySelectorAll('.ts-act-tf-blank').forEach(x => x.classList.remove('ts-act-tf-active'));
        // Tapping a filled blank: clear it
        if (b.dataset.filled) {
          const word = b.textContent;
          b.textContent = '_____';
          delete b.dataset.filled;
          _restoreToPool(host, word);
          return;
        }
        activeBlank = b;
        b.classList.add('ts-act-tf-active');
      });
    });
    host.querySelectorAll('.ts-act-tf-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        if (!activeBlank) {
          // Auto-pick the first empty blank
          activeBlank = host.querySelector('.ts-act-tf-blank:not([data-filled])');
        }
        if (!activeBlank) return;
        // If the blank already had a value, return that to the pool
        if (activeBlank.dataset.filled) _restoreToPool(host, activeBlank.textContent);
        activeBlank.textContent = chip.textContent;
        activeBlank.dataset.filled = '1';
        activeBlank.classList.remove('ts-act-tf-active');
        chip.remove();
        activeBlank = null;
      });
    });

    host.querySelector('.ts-act-check').addEventListener('click', () => {
      let allOk = true;
      host.querySelectorAll('.ts-act-tf-blank').forEach(b => {
        const want = b.dataset.answer;
        const got  = b.dataset.filled ? b.textContent : '';
        const ok = got === want;
        b.classList.toggle('ts-act-tf-correct', ok);
        b.classList.toggle('ts-act-tf-wrong',   !ok);
        if (!ok) allOk = false;
      });
      if (allOk) _markCorrect(id, host);
      else _markWrong(id, host, cfg.wrongMsg || 'Some blanks are not right. Tap a wrong word to clear it and try again.');
    });
  }
  function _restoreToPool(host, word) {
    const pool = host.querySelector('.ts-act-tf-pool');
    if (!pool) return;
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'ts-act-tf-chip';
    chip.textContent = word;
    chip.addEventListener('click', () => {
      // Find the active or first empty blank
      const blank = host.querySelector('.ts-act-tf-blank.ts-act-tf-active') || host.querySelector('.ts-act-tf-blank:not([data-filled])');
      if (!blank) return;
      if (blank.dataset.filled) _restoreToPool(host, blank.textContent);
      blank.textContent = chip.textContent;
      blank.dataset.filled = '1';
      blank.classList.remove('ts-act-tf-active');
      chip.remove();
    });
    pool.appendChild(chip);
  }

  // ── Helpers ─────────────────────────────────────────────────────────────
  function _esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }
  function _escId(s) { return String(s).replace(/[^a-zA-Z0-9_-]/g, '_'); }

  // Auto-mount on DOM additions (so lesson HTML strings can include
  // <div class="ts-activity"> nodes without manually calling mount).
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => mountAll());
    } else {
      mountAll();
    }
    if (typeof MutationObserver !== 'undefined') {
      const obs = new MutationObserver(muts => {
        for (const m of muts) {
          for (const n of m.addedNodes) {
            if (n.nodeType === 1) mountAll(n);
          }
        }
      });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }

  return { mountAll, allCorrect, pending, reset };
})();

if (typeof window !== 'undefined') {
  window.TSAActivities = TSAActivities;
}
