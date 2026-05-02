/**
 * TekkieStack 2.0 — Icon Registry
 *
 * Premium SVG icon set replacing all emojis in the app.
 * Style spec: 24×24 viewBox, 1.5px stroke, currentColor stroke (so they tint
 * via CSS color), no fills unless filled variant explicitly used.
 *
 * Usage:
 *   <span class="ts-i ts-i-hint" aria-hidden="true"></span>
 *   TSAIcons.render('hint')                  // returns inline SVG markup string
 *   TSAIcons.replaceEmojis(string)           // helper for migrating lesson HTML
 *
 * Author: Aperintel Ltd
 */

const TSAIcons = (() => {

  // ── Style helper ─────────────────────────────────────────────────────────
  // Every icon is wrapped with the same SVG header/footer so the registry only
  // stores the inner geometry. This keeps each entry tiny and consistent.
  const SVG = (inner, viewBox = '0 0 24 24') =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

  // ── Icon library ─────────────────────────────────────────────────────────
  // Categories: actions, status, content, gamification, navigation, lesson,
  // celebration, ui-chrome, weather/world.
  // Geometric, two-tone capable (cyan accent via "stroke" override on inner).
  const ICONS = {
    // ── ACTIONS ───────────────────────────────────────────────────────────
    play:        SVG('<path d="M8 5l11 7-11 7V5z" fill="currentColor" stroke="none"/>'),
    pause:       SVG('<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>'),
    stop:        SVG('<rect x="6" y="6" width="12" height="12" rx="1.5"/>'),
    refresh:     SVG('<path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/>'),
    next:        SVG('<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>'),
    prev:        SVG('<path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/>'),
    add:         SVG('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'),
    close:       SVG('<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>'),
    edit:        SVG('<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>'),
    save:        SVG('<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>'),
    copy:        SVG('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
    delete:      SVG('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1.5 14a2 2 0 0 1-2 2H8.5a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>'),
    search:      SVG('<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/>'),
    settings:    SVG('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
    link:        SVG('<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7.1 7.1l1.7-1.7"/>'),
    send:        SVG('<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>'),
    expand:      SVG('<polyline points="6 9 12 15 18 9"/>'),
    collapse:    SVG('<polyline points="18 15 12 9 6 15"/>'),
    backspace:   SVG('<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/>'),

    // ── STATUS ────────────────────────────────────────────────────────────
    check:       SVG('<polyline points="20 6 9 17 4 12"/>'),
    check_circle: SVG('<circle cx="12" cy="12" r="9"/><polyline points="9 12 11 14 15 9.5"/>'),
    cross:       SVG('<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>'),
    cross_circle: SVG('<circle cx="12" cy="12" r="9"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>'),
    warning:     SVG('<path d="M10.3 3.86L1.82 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.86a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/>'),
    info:        SVG('<circle cx="12" cy="12" r="9"/><line x1="12" y1="16" x2="12" y2="12"/><circle cx="12" cy="8" r="0.6" fill="currentColor"/>'),
    help:        SVG('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/>'),
    lock:        SVG('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
    unlock:      SVG('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7-2.6"/>'),
    shield:      SVG('<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z"/>'),
    bug:         SVG('<rect x="8" y="9" width="8" height="11" rx="3"/><path d="M9 9V7a3 3 0 0 1 6 0v2"/><line x1="3" y1="13" x2="8" y2="13"/><line x1="16" y1="13" x2="21" y2="13"/><line x1="3" y1="21" x2="6.5" y2="18"/><line x1="21" y1="21" x2="17.5" y2="18"/><line x1="3" y1="5" x2="7" y2="9"/><line x1="21" y1="5" x2="17" y2="9"/>'),
    sparkle:     SVG('<path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13"/>'),
    fire:        SVG('<path d="M12 2s4 4 4 9a4 4 0 0 1-8 0c0-2 1-3 1-3s-1.5 4 1 5c0-2 1-3 2-4z"/><path d="M9 13a3 3 0 0 0 6 0c0-1.5-1.5-2-1.5-2"/>'),
    bolt:        SVG('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" stroke="none"/>'),

    // ── CONTENT / SUBJECT ─────────────────────────────────────────────────
    globe:       SVG('<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    book:        SVG('<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/>'),
    code:        SVG('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/>'),
    code_brackets: SVG('<path d="M8 4l-4 8 4 8"/><path d="M16 4l4 8-4 8"/>'),
    terminal:    SVG('<rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="7 9 11 12 7 15"/><line x1="13" y1="15" x2="17" y2="15"/>'),
    document:    SVG('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="14 3 14 9 20 9"/>'),
    palette:     SVG('<path d="M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3-3h-2.5a2.5 2.5 0 0 1 0-5H17A6 6 0 0 0 12 3z"/><circle cx="7.5" cy="11" r="1" fill="currentColor"/><circle cx="9" cy="7" r="1" fill="currentColor"/><circle cx="13" cy="6" r="1" fill="currentColor"/><circle cx="16" cy="9" r="1" fill="currentColor"/>'),
    grid:        SVG('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>'),
    layout:      SVG('<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>'),
    image:       SVG('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><polyline points="21 15 16 10 5 21"/>'),
    list:        SVG('<line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="5" cy="6" r="0.8" fill="currentColor"/><circle cx="5" cy="12" r="0.8" fill="currentColor"/><circle cx="5" cy="18" r="0.8" fill="currentColor"/>'),
    table:       SVG('<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>'),
    form:        SVG('<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="7" y1="8" x2="13" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="17" y2="16"/>'),

    // ── GAMIFICATION ──────────────────────────────────────────────────────
    trophy:      SVG('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 5h3a2 2 0 0 1 0 4 4 4 0 0 1-3 1.5"/><path d="M7 5H4a2 2 0 0 0 0 4 4 4 0 0 0 3 1.5"/>'),
    medal:       SVG('<circle cx="12" cy="14" r="6"/><path d="M9 9L7 3h10l-2 6"/><path d="M12 11l1 2 2 .3-1.5 1.5.4 2.2L12 16l-2 1 .4-2.2L9 13.3l2-.3 1-2z" fill="currentColor" stroke="none"/>'),
    badge:       SVG('<polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8 12 2"/>'),
    star:        SVG('<polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.7 5.8 21 7 14.1 2 9.3 9 8.5 12 2"/>'),
    star_filled: SVG('<polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.7 5.8 21 7 14.1 2 9.3 9 8.5 12 2" fill="currentColor"/>'),
    crown:       SVG('<path d="M3 7l4 8h10l4-8-5 4-4-7-4 7z"/><line x1="6" y1="19" x2="18" y2="19"/>'),
    diamond:     SVG('<path d="M2 9h20l-10 13z"/><path d="M5 9l3-5h8l3 5"/><line x1="8" y1="9" x2="12" y2="22"/><line x1="16" y1="9" x2="12" y2="22"/>'),
    target:      SVG('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>'),
    xp:          SVG('<circle cx="12" cy="12" r="9"/><path d="M8 8l4 4-4 4M12 12h5"/>'),
    coin:        SVG('<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 9h4a2 2 0 0 1 0 4H9M9 13h5a2 2 0 0 1 0 4h-5"/>'),

    // ── NAVIGATION ────────────────────────────────────────────────────────
    home:        SVG('<path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9z"/>'),
    dashboard:   SVG('<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/>'),
    profile:     SVG('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
    keyboard:    SVG('<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10v0M10 10v0M14 10v0M18 10v0M6 14v0M18 14v0"/><line x1="9" y1="14" x2="15" y2="14"/>'),
    robot:       SVG('<rect x="4" y="7" width="16" height="13" rx="3"/><circle cx="9" cy="13" r="1.2" fill="currentColor"/><circle cx="15" cy="13" r="1.2" fill="currentColor"/><line x1="12" y1="3" x2="12" y2="7"/><circle cx="12" cy="3" r="1" fill="currentColor"/><line x1="2" y1="13" x2="4" y2="13"/><line x1="20" y1="13" x2="22" y2="13"/>'),
    chat:        SVG('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
    games:       SVG('<rect x="2" y="7" width="20" height="11" rx="3"/><line x1="7" y1="11" x2="7" y2="14"/><line x1="5.5" y1="12.5" x2="8.5" y2="12.5"/><circle cx="15" cy="11.5" r="0.9" fill="currentColor"/><circle cx="17.5" cy="14" r="0.9" fill="currentColor"/>'),
    rocket:      SVG('<path d="M5 14l-2 7 7-2"/><path d="M14.5 4.5C18 1 21 3 21 3s2 3-1.5 6.5L13 16l-5-5 6.5-6.5z"/><circle cx="15" cy="9" r="1.5"/>'),

    // ── CELEBRATION / EMOTION ─────────────────────────────────────────────
    celebrate:   SVG('<path d="M3 21l5-13 7 7-5 5z"/><path d="M14 4l1 4M19 7l-3 1M16 13l4-1M14 4l4 1"/>'),
    heart:       SVG('<path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.6l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'),
    smile:       SVG('<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="10" r="0.8" fill="currentColor"/><circle cx="15" cy="10" r="0.8" fill="currentColor"/>'),
    wave:        SVG('<path d="M3 11h.5a2 2 0 0 0 2-2V5a2 2 0 0 1 4 0v8M9.5 11V3a2 2 0 0 1 4 0v8M13.5 11V5a2 2 0 0 1 4 0v8"/><path d="M5.5 13a8 8 0 0 0 14.5 4"/>'),
    party:       SVG('<path d="M3 21l5-13 7 7-5 5z"/><circle cx="13" cy="6" r="0.8" fill="currentColor"/><circle cx="18" cy="3" r="0.8" fill="currentColor"/><circle cx="20" cy="9" r="0.8" fill="currentColor"/><circle cx="15" cy="11" r="0.8" fill="currentColor"/>'),

    // ── UI CHROME ─────────────────────────────────────────────────────────
    hint:        SVG('<path d="M9 21h6"/><path d="M10 18h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>'),
    bell:        SVG('<path d="M18 16V11a6 6 0 0 0-12 0v5a3 3 0 0 1-1 2h14a3 3 0 0 1-1-2z"/><path d="M10 21a2 2 0 0 0 4 0"/>'),
    email:       SVG('<rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/>'),
    coffee:      SVG('<path d="M5 9h13v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9z"/><path d="M18 11h2a2 2 0 0 1 0 4h-2"/><path d="M8 4v2M12 4v2M16 4v2"/>'),
    qr:          SVG('<rect x="3" y="3" width="7" height="7" rx="0.5"/><rect x="14" y="3" width="7" height="7" rx="0.5"/><rect x="3" y="14" width="7" height="7" rx="0.5"/><line x1="14" y1="14" x2="17" y2="14"/><line x1="20" y1="14" x2="20" y2="17"/><line x1="14" y1="17" x2="14" y2="21"/><line x1="17" y1="17" x2="17" y2="21"/><line x1="20" y1="20" x2="21" y2="20"/>'),
    card:        SVG('<rect x="3" y="6" width="18" height="13" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="7" y1="15" x2="11" y2="15"/>'),
    bitcoin:     SVG('<circle cx="12" cy="12" r="9"/><path d="M9 7h5a2.5 2.5 0 0 1 0 5H9zM9 12h6a2.5 2.5 0 0 1 0 5H9z"/><line x1="11" y1="5" x2="11" y2="7"/><line x1="13" y1="5" x2="13" y2="7"/><line x1="11" y1="17" x2="11" y2="19"/><line x1="13" y1="17" x2="13" y2="19"/>'),
    pray:        SVG('<path d="M9 21V11l-2-3 1-3 4 1 4-1 1 3-2 3v10"/><line x1="9" y1="21" x2="15" y2="21"/>'),
    weather:     SVG('<path d="M17 9a5 5 0 0 0-9.6-1.5A4 4 0 0 0 6 15h12a3.5 3.5 0 0 0 0-7 5 5 0 0 0-1-.5z"/>'),
    music:       SVG('<path d="M9 17V5l11-2v14"/><circle cx="6" cy="17" r="3"/><circle cx="17" cy="15" r="3"/>'),
    pencil:      SVG('<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>'),
    pin:         SVG('<path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>'),
    download:    SVG('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
    upload:      SVG('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>'),
    eye:         SVG('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>'),
    clock:       SVG('<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/>'),
    calendar:    SVG('<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>'),

    // ── CONCEPT / LEARNING (used in lesson content) ───────────────────────
    brain:       SVG('<path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3 3 3 0 0 0 1.5 2.6V15a3 3 0 0 0 3 3h1a3 3 0 0 0 3 3"/><path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 3 3 3 3 0 0 1-1.5 2.6V15a3 3 0 0 1-3 3h-1a3 3 0 0 1-3 3"/><line x1="12" y1="4" x2="12" y2="21"/>'),
    cog_brain:   SVG('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M22 12h-3M5 12H2M19 5l-2 2M7 17l-2 2M19 19l-2-2M7 7L5 5"/>'),
    ai:          SVG('<rect x="4" y="6" width="16" height="13" rx="3"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/><circle cx="15" cy="12" r="1.2" fill="currentColor"/><line x1="12" y1="2" x2="12" y2="6"/><circle cx="12" cy="2" r="1" fill="currentColor"/>'),
    flask:       SVG('<path d="M9 3v6l-5 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V3"/><line x1="8" y1="3" x2="16" y2="3"/>'),
    puzzle:      SVG('<path d="M3 7h4V5a2 2 0 0 1 4 0v2h4v4h2a2 2 0 0 1 0 4h-2v4h-4v-2a2 2 0 0 0-4 0v2H3v-4h2a2 2 0 0 0 0-4H3z"/>'),
    layers:      SVG('<polygon points="12 2 22 8 12 14 2 8 12 2"/><polyline points="2 12 12 18 22 12"/><polyline points="2 16 12 22 22 16"/>'),
    flag:        SVG('<path d="M5 21V4a1 1 0 0 1 1-1h11l-2 4 2 4H6"/>'),
    door:        SVG('<rect x="6" y="3" width="12" height="18" rx="1"/><circle cx="14" cy="12" r="0.8" fill="currentColor"/>'),
    cap:         SVG('<polygon points="2 10 12 5 22 10 12 15 2 10"/><path d="M6 12v4a6 4 0 0 0 12 0v-4"/><line x1="22" y1="10" x2="22" y2="15"/>'),
    pattern:     SVG('<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="9" y1="18" x2="15" y2="18"/><line x1="6" y1="9" x2="6" y2="15"/><line x1="18" y1="9" x2="18" y2="15"/>'),

    // ── DIRECTION ─────────────────────────────────────────────────────────
    arrow_right: SVG('<line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/>'),
    arrow_left:  SVG('<line x1="19" y1="12" x2="5" y2="12"/><polyline points="11 6 5 12 11 18"/>'),
    arrow_up:    SVG('<line x1="12" y1="19" x2="12" y2="5"/><polyline points="6 11 12 5 18 11"/>'),
    arrow_down:  SVG('<line x1="12" y1="5" x2="12" y2="19"/><polyline points="6 13 12 19 18 13"/>'),
    chevron_right: SVG('<polyline points="9 18 15 12 9 6"/>'),
    enter:       SVG('<polyline points="9 11 13 15 9 19"/><line x1="5" y1="15" x2="13" y2="15"/><polyline points="13 15 13 5 19 5"/>'),

    // ── AVATARS / FUN ─────────────────────────────────────────────────────
    fox:         SVG('<polygon points="12 4 7 9 4 7 5 13 12 20 19 13 20 7 17 9"/><circle cx="9" cy="12" r="0.8" fill="currentColor"/><circle cx="15" cy="12" r="0.8" fill="currentColor"/><path d="M11 16l1 1 1-1"/>'),
    dragon:      SVG('<path d="M3 14c2-3 5-5 9-5s7 2 9 5"/><path d="M3 14c0 4 5 6 9 6s9-2 9-6"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/><circle cx="15" cy="13" r="0.8" fill="currentColor"/><path d="M5 8l3 2M19 8l-3 2"/>'),
    lion:        SVG('<circle cx="12" cy="13" r="5"/><circle cx="10" cy="12" r="0.7" fill="currentColor"/><circle cx="14" cy="12" r="0.7" fill="currentColor"/><path d="M5 9l-2-2M19 9l2-2M3 13h2M19 13h2M5 17l-2 2M19 17l2 2M12 4V2M9 5l-1-2M15 5l1-2"/>'),
    controller:  SVG('<rect x="2" y="7" width="20" height="11" rx="3"/><line x1="7" y1="11" x2="7" y2="14"/><line x1="5.5" y1="12.5" x2="8.5" y2="12.5"/><circle cx="15" cy="11.5" r="0.9" fill="currentColor"/><circle cx="17.5" cy="14" r="0.9" fill="currentColor"/>'),
  };

  // ── Aliases (so old emoji-style names still work where useful) ───────────
  const ALIASES = {
    'tick': 'check',
    'success': 'check_circle',
    'error': 'cross_circle',
    'phases': 'layers',
    'ai_lab': 'ai',
    'support': 'chat',
    'typing': 'keyboard',
    'editor': 'code',
    'avatar': 'profile',
    'idea': 'hint',
    'lightbulb': 'hint',
  };

  // ── Emoji → icon-name lookup (for migrating string-embedded emojis) ──────
  const EMOJI_MAP = {
    '🎉': 'celebrate', '✨': 'sparkle', '🎊': 'party',
    '🚀': 'rocket', '⚡': 'bolt', '🔥': 'fire',
    '✅': 'check_circle', '✓': 'check', '❌': 'cross_circle', '✕': 'cross',
    '⚠': 'warning', '⚠️': 'warning',
    '💡': 'hint', '🔍': 'search', '🔧': 'settings', '⚙': 'settings', '⚙️': 'settings',
    '🐛': 'bug', '🤖': 'ai', '🧠': 'brain',
    '🌐': 'globe', '🌍': 'globe', '🌎': 'globe',
    '📚': 'book', '📖': 'book', '📋': 'document', '📝': 'pencil', '✏': 'pencil', '✏️': 'pencil', '✍': 'pencil', '✍️': 'pencil',
    '💻': 'code', '⌨': 'keyboard', '⌨️': 'keyboard', '⌫': 'backspace',
    '🏆': 'trophy', '🏅': 'medal', '🎖': 'medal', '🌟': 'star_filled', '⭐': 'star_filled',
    '👤': 'profile', '👋': 'wave', '🙏': 'pray',
    '🔒': 'lock', '🔐': 'lock', '🛡': 'shield',
    '💬': 'chat', '📬': 'email', '📧': 'email', '📨': 'email',
    '🎮': 'controller', '🎯': 'target',
    '🦊': 'fox', '🦁': 'lion', '🐉': 'dragon',
    '🎨': 'palette', '📐': 'layout', '📊': 'grid', '🏗': 'puzzle', '🏗️': 'puzzle',
    '☕': 'coffee', '💳': 'card', '💰': 'coin', '💎': 'diamond',
    '🤔': 'help', '❓': 'help', '❔': 'help',
    '🍎': 'card', '🍳': 'flask',
    '➕': 'add', '↺': 'refresh', '↵': 'enter', '►': 'play', '▶': 'play', '◀': 'arrow_left',
    '▾': 'arrow_down', '▴': 'arrow_up', '→': 'arrow_right', '←': 'arrow_left',
    '🌤': 'weather', '🌤️': 'weather', '🌿': 'sparkle',
    '💭': 'chat', '💼': 'document', '🎓': 'cap', '🔨': 'puzzle',
    '🖱': 'controller', '🖱️': 'controller',
    '🩵': 'heart', '❤': 'heart', '❤️': 'heart',
    '₿': 'bitcoin',
  };

  // ── Render an icon by name. Optionally style via inline attrs. ────────────
  function render(name, opts = {}) {
    const resolved = ALIASES[name] || name;
    const svg = ICONS[resolved];
    if (!svg) {
      // Missing icons fall back to a small dot — never break the page.
      return `<span class="ts-i-missing" aria-hidden="true" title="missing icon: ${name}">·</span>`;
    }
    if (!opts.size && !opts.color) return svg;
    const sizeAttr  = opts.size  ? `width="${opts.size}" height="${opts.size}"` : '';
    const colorAttr = opts.color ? `style="color:${opts.color}"` : '';
    return svg.replace('<svg ', `<svg ${sizeAttr} ${colorAttr} `);
  }

  // ── Replace emojis inside a string with rendered icons (for migrating
  //     lesson HTML strings without rewriting every line by hand). ─────────
  function replaceEmojis(text) {
    if (!text) return text;
    let out = text;
    for (const [emoji, name] of Object.entries(EMOJI_MAP)) {
      if (out.includes(emoji)) {
        out = out.split(emoji).join(`<span class="ts-i ts-i-${name}" aria-hidden="true"></span>`);
      }
    }
    return out;
  }

  // ── Hydrate any <span class="ts-i ts-i-NAME"> markers in the DOM. ───────
  // Called once on DOMContentLoaded; idempotent on later calls.
  function hydrate(root = document) {
    const nodes = root.querySelectorAll('.ts-i:not(.ts-i-hydrated)');
    nodes.forEach(el => {
      const cls = Array.from(el.classList).find(c => c.startsWith('ts-i-') && c !== 'ts-i-hydrated');
      if (!cls) return;
      const name = cls.slice(5); // strip "ts-i-"
      el.innerHTML = render(name);
      el.classList.add('ts-i-hydrated');
    });
  }

  // ── DOM-wide emoji sweep ─────────────────────────────────────────────────
  // Walks text nodes and replaces any emoji characters with an icon span.
  // This means we don't have to hand-edit every emoji-containing line.
  // Idempotent: nodes get tagged so we only sweep new content.
  // Skips: <script>, <style>, <textarea>, <input>, <code>, <pre>, [data-no-icons].
  const EMOJI_RE = /[\uD83C-\uDBFF][\uDC00-\uDFFF]|[☀-➿⌀-⏿]/g;
  const SKIP_TAGS = new Set(['SCRIPT','STYLE','TEXTAREA','INPUT','CODE','PRE','OPTION','SVG']);
  function _sweepNode(root) {
    if (!root || root.nodeType !== 1) return;
    if (root.dataset && root.dataset.iconsDone === '1') return;
    if (SKIP_TAGS.has(root.tagName)) return;
    // Use TreeWalker to find text nodes, but ALSO descend into shadow / etc.
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        let p = n.parentNode;
        while (p && p !== root) {
          if (SKIP_TAGS.has(p.tagName)) return NodeFilter.FILTER_REJECT;
          if (p.classList && p.classList.contains('ts-i')) return NodeFilter.FILTER_REJECT;
          if (p.dataset && p.dataset.noIcons === '1') return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return EMOJI_RE.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const targets = [];
    let n;
    while ((n = walker.nextNode())) targets.push(n);
    targets.forEach(textNode => {
      const text = textNode.nodeValue;
      if (!EMOJI_RE.test(text)) return;
      EMOJI_RE.lastIndex = 0;
      // Build replacement fragment
      const frag = document.createDocumentFragment();
      let last = 0;
      let m;
      EMOJI_RE.lastIndex = 0;
      while ((m = EMOJI_RE.exec(text)) !== null) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        const name = EMOJI_MAP[m[0]];
        if (name) {
          const span = document.createElement('span');
          span.className = 'ts-i ts-i-' + name + ' ts-i-hydrated';
          span.setAttribute('aria-hidden','true');
          span.innerHTML = render(name);
          frag.appendChild(span);
        } else {
          // Unmapped emoji: drop it silently (keeps the page emoji-free)
          // — alternative: keep as text. We choose drop to honor the
          // "zero emoji anywhere" policy.
          frag.appendChild(document.createTextNode(''));
        }
        last = m.index + m[0].length;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  function sweepEmojis(root = document.body) {
    _sweepNode(root || document.body);
  }

  // ── Auto-hydrate on load + observe for new nodes ─────────────────────────
  function _init() {
    hydrate();
    sweepEmojis();
    // Watch for dynamically-injected icons + emoji content (lesson rendering)
    if (typeof MutationObserver !== 'undefined') {
      const obs = new MutationObserver(muts => {
        for (const m of muts) {
          for (const n of m.addedNodes) {
            if (n.nodeType === 1) {
              hydrate(n);
              _sweepNode(n);
            } else if (n.nodeType === 3 && n.parentNode) {
              // Text node with emoji injected directly (e.g. el.textContent = '🚀')
              _sweepNode(n.parentNode);
            }
          }
          if (m.type === 'characterData' && m.target.parentNode) {
            _sweepNode(m.target.parentNode);
          }
        }
      });
      obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    }
  }
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', _init);
    } else {
      _init();
    }
  }

  return { render, replaceEmojis, sweepEmojis, hydrate, ICONS, EMOJI_MAP, ALIASES };
})();

if (typeof window !== 'undefined') {
  window.TSAIcons = TSAIcons;
  // Convenience global so template strings stay terse: `${icon('hint')}`
  window.icon = (name, opts) => TSAIcons.render(name, opts);
}
