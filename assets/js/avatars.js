/**
 * TekkieStack 2.0 — Colourful Avatar System
 *
 * Replaces flat emoji avatars with hand-drawn, vibrant SVG characters.
 * Each avatar is a self-contained inline-SVG string designed at a 64x64
 * viewBox so it scales crisply from 24px (nav chip) to 80px (modal hero).
 *
 * Storage compat: profile.avatar may be either a new avatar id ('rocket',
 * 'dragon', etc.) OR an old emoji character ('🚀'). render() handles both.
 *
 * Author: Aperintel Ltd
 */

const TSAAvatars = (() => {

  // ── Avatar SVGs ──────────────────────────────────────────────────────────
  // Each SVG uses gradients + multiple bright fills so the character reads
  // as a real little illustration, not a flat icon.
  const AVATARS = {

    rocket: { name: 'Rocket Pilot', bg: '#FFE5B4', svg: `
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rkBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="100%" stop-color="#D8E0F0"/>
          </linearGradient>
          <linearGradient id="rkFlame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFD93D"/>
            <stop offset="100%" stop-color="#FF6B6B"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#FFE5B4"/>
        <circle cx="14" cy="18" r="1.5" fill="#fff"/>
        <circle cx="50" cy="20" r="1" fill="#fff"/>
        <circle cx="48" cy="46" r="1.2" fill="#fff"/>
        <path d="M 22 50 Q 22 22 32 12 Q 42 22 42 50 Z" fill="url(#rkBody)" stroke="#0F1F3D" stroke-width="1.5"/>
        <path d="M 22 44 L 14 52 L 22 50 Z" fill="#FF6B6B" stroke="#0F1F3D" stroke-width="1.2"/>
        <path d="M 42 44 L 50 52 L 42 50 Z" fill="#FF6B6B" stroke="#0F1F3D" stroke-width="1.2"/>
        <circle cx="32" cy="28" r="6.5" fill="#0F1F3D"/>
        <circle cx="32" cy="28" r="5" fill="#00C9B1"/>
        <circle cx="30" cy="26" r="1.5" fill="#fff"/>
        <path d="M 26 50 Q 32 58 38 50 Q 35 56 32 56 Q 29 56 26 50 Z" fill="url(#rkFlame)"/>
      </svg>
    ` },

    dragon: { name: 'Lil Dragon', bg: '#E8F8E0', svg: `
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dgBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7DD87D"/>
            <stop offset="100%" stop-color="#3BA84A"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#E8F8E0"/>
        <path d="M 18 24 L 14 14 L 22 18 Z" fill="#FF9500" stroke="#0F1F3D" stroke-width="1.2"/>
        <path d="M 46 24 L 50 14 L 42 18 Z" fill="#FF9500" stroke="#0F1F3D" stroke-width="1.2"/>
        <ellipse cx="32" cy="36" rx="20" ry="18" fill="url(#dgBody)" stroke="#0F1F3D" stroke-width="1.5"/>
        <ellipse cx="32" cy="42" rx="11" ry="8" fill="#A8E8A8"/>
        <circle cx="22" cy="34" r="2.3" fill="#FFB3D9" opacity="0.7"/>
        <circle cx="42" cy="34" r="2.3" fill="#FFB3D9" opacity="0.7"/>
        <circle cx="25" cy="30" r="3.5" fill="#fff"/>
        <circle cx="39" cy="30" r="3.5" fill="#fff"/>
        <circle cx="26" cy="31" r="1.8" fill="#0F1F3D"/>
        <circle cx="40" cy="31" r="1.8" fill="#0F1F3D"/>
        <circle cx="26.5" cy="30.5" r="0.7" fill="#fff"/>
        <circle cx="40.5" cy="30.5" r="0.7" fill="#fff"/>
        <path d="M 28 44 Q 32 47 36 44" stroke="#0F1F3D" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <circle cx="29" cy="43" r="0.7" fill="#fff"/>
        <circle cx="35" cy="43" r="0.7" fill="#fff"/>
      </svg>
    ` },

    robot: { name: 'Code-Bot', bg: '#E0E8FF', svg: `
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rbBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#6C63FF"/>
            <stop offset="100%" stop-color="#3F35C9"/>
          </linearGradient>
          <radialGradient id="rbEye" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#80E8DE"/>
            <stop offset="100%" stop-color="#00C9B1"/>
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#E0E8FF"/>
        <line x1="24" y1="14" x2="22" y2="8" stroke="#0F1F3D" stroke-width="1.5"/>
        <line x1="40" y1="14" x2="42" y2="8" stroke="#0F1F3D" stroke-width="1.5"/>
        <circle cx="22" cy="7" r="2.5" fill="#FF6B6B"/>
        <circle cx="42" cy="7" r="2.5" fill="#FFD93D"/>
        <rect x="14" y="16" width="36" height="34" rx="6" fill="url(#rbBody)" stroke="#0F1F3D" stroke-width="1.5"/>
        <rect x="18" y="22" width="28" height="14" rx="3" fill="#0F1F3D"/>
        <circle cx="25" cy="29" r="3.5" fill="url(#rbEye)"/>
        <circle cx="39" cy="29" r="3.5" fill="url(#rbEye)"/>
        <circle cx="25" cy="29" r="1.2" fill="#fff"/>
        <circle cx="39" cy="29" r="1.2" fill="#fff"/>
        <rect x="22" y="40" width="20" height="3" rx="1.5" fill="#80E8DE"/>
        <circle cx="17" cy="20" r="1.3" fill="#FFD93D"/>
        <circle cx="47" cy="20" r="1.3" fill="#FFD93D"/>
        <circle cx="17" cy="46" r="1.3" fill="#FFD93D"/>
        <circle cx="47" cy="46" r="1.3" fill="#FFD93D"/>
      </svg>
    ` },

    wizard: { name: 'Code Wizard', bg: '#1F0F3D', svg: `
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wzHat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#6C63FF"/>
            <stop offset="100%" stop-color="#2E1A6B"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#1F0F3D"/>
        <circle cx="14" cy="14" r="0.8" fill="#FFD93D"/>
        <circle cx="50" cy="16" r="0.7" fill="#fff"/>
        <circle cx="52" cy="44" r="0.8" fill="#FFD93D"/>
        <path d="M 32 8 L 22 38 L 42 38 Z" fill="url(#wzHat)" stroke="#0F1F3D" stroke-width="1.5"/>
        <path d="M 32 8 Q 36 14 32 18" stroke="#0F1F3D" stroke-width="1" fill="none"/>
        <path d="M 28 18 L 30 14 L 32 18 L 30 22 Z" fill="#FFD93D"/>
        <path d="M 36 26 L 37.5 23 L 39 26 L 37.5 29 Z" fill="#FFD93D"/>
        <path d="M 25 30 L 26 28 L 27 30 L 26 32 Z" fill="#FFFFFF"/>
        <ellipse cx="32" cy="40" rx="14" ry="3.5" fill="#0F1F3D"/>
        <circle cx="32" cy="48" r="10" fill="#FFE0BD"/>
        <circle cx="28" cy="46" r="1.5" fill="#0F1F3D"/>
        <circle cx="36" cy="46" r="1.5" fill="#0F1F3D"/>
        <circle cx="28.3" cy="45.7" r="0.5" fill="#fff"/>
        <circle cx="36.3" cy="45.7" r="0.5" fill="#fff"/>
        <path d="M 26 56 Q 32 52 38 56 Q 38 60 32 60 Q 26 60 26 56 Z" fill="#FFFFFF" stroke="#0F1F3D" stroke-width="1"/>
        <path d="M 27 50 Q 32 53 37 50" stroke="#0F1F3D" stroke-width="1" fill="none" stroke-linecap="round"/>
      </svg>
    ` },

    bolt: { name: 'Bolt', bg: '#FFF4D4', svg: `
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bzMain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFE74C"/>
            <stop offset="100%" stop-color="#FF9500"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#FFF4D4"/>
        <circle cx="14" cy="20" r="0.7" fill="#FFD93D"/>
        <circle cx="50" cy="18" r="0.7" fill="#FF9500"/>
        <circle cx="48" cy="48" r="0.7" fill="#FFD93D"/>
        <path d="M 36 6 L 16 34 L 28 36 L 24 58 L 50 28 L 36 26 Z" fill="url(#bzMain)" stroke="#0F1F3D" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M 30 18 L 22 30 L 30 32 L 26 46 L 40 30 L 32 28 Z" fill="#FFFFFF" opacity="0.35"/>
        <circle cx="29" cy="34" r="2" fill="#0F1F3D"/>
        <circle cx="36" cy="32" r="2" fill="#0F1F3D"/>
        <circle cx="29.5" cy="33.5" r="0.7" fill="#fff"/>
        <circle cx="36.5" cy="31.5" r="0.7" fill="#fff"/>
        <path d="M 28 40 Q 32 43 36 40" stroke="#0F1F3D" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      </svg>
    ` },

    owl: { name: 'Galaxy Owl', bg: '#1A1240', svg: `
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="owBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#8B5CF6"/>
            <stop offset="100%" stop-color="#4C1D95"/>
          </linearGradient>
          <radialGradient id="owEye" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFE74C"/>
            <stop offset="100%" stop-color="#FF9500"/>
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#1A1240"/>
        <circle cx="14" cy="14" r="0.6" fill="#fff"/>
        <circle cx="48" cy="16" r="0.5" fill="#fff"/>
        <circle cx="16" cy="48" r="0.5" fill="#fff"/>
        <circle cx="50" cy="46" r="0.7" fill="#FFD93D"/>
        <path d="M 18 18 L 22 8 L 26 18 Z" fill="url(#owBody)" stroke="#0F1F3D" stroke-width="1"/>
        <path d="M 38 18 L 42 8 L 46 18 Z" fill="url(#owBody)" stroke="#0F1F3D" stroke-width="1"/>
        <ellipse cx="32" cy="36" rx="22" ry="20" fill="url(#owBody)" stroke="#0F1F3D" stroke-width="1.5"/>
        <path d="M 32 18 Q 14 28 18 50 Q 32 56 46 50 Q 50 28 32 18 Z" fill="#A78BFA" opacity="0.4"/>
        <circle cx="22" cy="20" r="0.4" fill="#fff"/>
        <circle cx="42" cy="48" r="0.4" fill="#fff"/>
        <circle cx="38" cy="22" r="0.5" fill="#FFD93D"/>
        <circle cx="24" cy="32" r="7" fill="#fff"/>
        <circle cx="40" cy="32" r="7" fill="#fff"/>
        <circle cx="24" cy="32" r="5" fill="url(#owEye)"/>
        <circle cx="40" cy="32" r="5" fill="url(#owEye)"/>
        <circle cx="24" cy="32" r="2.3" fill="#0F1F3D"/>
        <circle cx="40" cy="32" r="2.3" fill="#0F1F3D"/>
        <circle cx="24.7" cy="31.3" r="0.8" fill="#fff"/>
        <circle cx="40.7" cy="31.3" r="0.8" fill="#fff"/>
        <path d="M 30 40 L 32 46 L 34 40 Z" fill="#FF9500" stroke="#0F1F3D" stroke-width="0.8"/>
      </svg>
    ` },

    panda: { name: 'DJ Panda', bg: '#FFF5C4', svg: `
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pdHead" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="100%" stop-color="#E8E8E8"/>
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#FFF5C4"/>
        <circle cx="18" cy="18" r="6" fill="#0F1F3D"/>
        <circle cx="46" cy="18" r="6" fill="#0F1F3D"/>
        <path d="M 8 28 Q 8 18 18 18" stroke="#00C9B1" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M 56 28 Q 56 18 46 18" stroke="#00C9B1" stroke-width="3" fill="none" stroke-linecap="round"/>
        <ellipse cx="14" cy="34" rx="6" ry="4.5" fill="#00C9B1" stroke="#0F1F3D" stroke-width="1.2"/>
        <ellipse cx="50" cy="34" rx="6" ry="4.5" fill="#00C9B1" stroke="#0F1F3D" stroke-width="1.2"/>
        <circle cx="32" cy="36" r="18" fill="url(#pdHead)" stroke="#0F1F3D" stroke-width="1.5"/>
        <ellipse cx="24" cy="32" rx="4.5" ry="6" fill="#0F1F3D" transform="rotate(-15 24 32)"/>
        <ellipse cx="40" cy="32" rx="4.5" ry="6" fill="#0F1F3D" transform="rotate(15 40 32)"/>
        <circle cx="24.5" cy="32" r="1.6" fill="#fff"/>
        <circle cx="39.5" cy="32" r="1.6" fill="#fff"/>
        <circle cx="24.7" cy="31.5" r="0.5" fill="#0F1F3D"/>
        <circle cx="39.7" cy="31.5" r="0.5" fill="#0F1F3D"/>
        <ellipse cx="32" cy="40" rx="2.5" ry="1.8" fill="#0F1F3D"/>
        <path d="M 28 44 Q 32 47 36 44" stroke="#0F1F3D" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      </svg>
    ` },

    knight: { name: 'Pixel Knight', bg: '#FFE5E5', svg: `
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ktHelm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#E8EAF6"/>
            <stop offset="50%" stop-color="#9FA8DA"/>
            <stop offset="100%" stop-color="#5C6BC0"/>
          </linearGradient>
          <linearGradient id="ktPlume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FF6B6B"/>
            <stop offset="100%" stop-color="#C92A2A"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#FFE5E5"/>
        <path d="M 32 6 Q 36 8 36 14 Q 34 14 32 14 Q 30 14 28 14 Q 28 8 32 6 Z" fill="url(#ktPlume)" stroke="#0F1F3D" stroke-width="1.2"/>
        <path d="M 28 14 Q 28 10 32 8 Q 36 10 36 14" stroke="#FFD93D" stroke-width="1" fill="none"/>
        <path d="M 18 22 Q 20 12 32 12 Q 44 12 46 22 L 46 48 Q 44 54 32 54 Q 20 54 18 48 Z" fill="url(#ktHelm)" stroke="#0F1F3D" stroke-width="1.8"/>
        <rect x="22" y="22" width="20" height="3" fill="#FFD93D" stroke="#0F1F3D" stroke-width="0.8"/>
        <rect x="22" y="48" width="20" height="3" fill="#FFD93D" stroke="#0F1F3D" stroke-width="0.8"/>
        <rect x="22" y="32" width="6" height="6" rx="1" fill="#0F1F3D"/>
        <rect x="36" y="32" width="6" height="6" rx="1" fill="#0F1F3D"/>
        <circle cx="25" cy="35" r="1.4" fill="#00C9B1"/>
        <circle cx="39" cy="35" r="1.4" fill="#00C9B1"/>
        <rect x="28" y="42" width="8" height="2" fill="#0F1F3D"/>
        <circle cx="22" cy="22" r="1.5" fill="#FFD93D" stroke="#0F1F3D" stroke-width="0.5"/>
        <circle cx="42" cy="22" r="1.5" fill="#FFD93D" stroke="#0F1F3D" stroke-width="0.5"/>
      </svg>
    ` },

    unicorn: { name: 'Rainbow Uni', bg: '#FFE0F0', svg: `
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="unMane" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#FF6B6B"/>
            <stop offset="20%" stop-color="#FF9500"/>
            <stop offset="40%" stop-color="#FFD93D"/>
            <stop offset="60%" stop-color="#7DD87D"/>
            <stop offset="80%" stop-color="#5BD8FF"/>
            <stop offset="100%" stop-color="#8B5CF6"/>
          </linearGradient>
          <linearGradient id="unHorn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFE74C"/>
            <stop offset="100%" stop-color="#FF9500"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#FFE0F0"/>
        <path d="M 12 18 Q 18 14 24 22 Q 16 28 14 36 Q 10 28 12 18 Z" fill="url(#unMane)" stroke="#0F1F3D" stroke-width="1"/>
        <path d="M 16 30 Q 22 28 26 34 Q 18 40 14 44 Q 12 36 16 30 Z" fill="url(#unMane)" stroke="#0F1F3D" stroke-width="1"/>
        <ellipse cx="34" cy="38" rx="18" ry="16" fill="#FFFFFF" stroke="#0F1F3D" stroke-width="1.5"/>
        <ellipse cx="40" cy="44" rx="6" ry="4" fill="#FFD0E0"/>
        <path d="M 28 18 L 32 6 L 36 18 Z" fill="url(#unHorn)" stroke="#0F1F3D" stroke-width="1.2"/>
        <line x1="30" y1="14" x2="34" y2="13" stroke="#0F1F3D" stroke-width="0.8"/>
        <line x1="30" y1="11" x2="34" y2="10" stroke="#0F1F3D" stroke-width="0.8"/>
        <path d="M 22 22 L 26 18 L 28 24 Z" fill="#FFFFFF" stroke="#0F1F3D" stroke-width="1"/>
        <path d="M 30 32 Q 32 28 32 32" stroke="#0F1F3D" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <path d="M 30 36 Q 30 38 32 38 Q 32 36 30 36" fill="#0F1F3D"/>
        <path d="M 38 44 L 38 50 L 42 50" stroke="#0F1F3D" stroke-width="1.2" fill="none" stroke-linecap="round"/>
        <path d="M 34 52 Q 38 54 42 52" stroke="#0F1F3D" stroke-width="1.2" fill="none" stroke-linecap="round"/>
        <path d="M 50 14 L 51 12 L 52 14 L 51 16 Z" fill="#FFD93D"/>
        <path d="M 52 28 L 53 26 L 54 28 L 53 30 Z" fill="#FF6B6B"/>
        <path d="M 50 50 L 51 48 L 52 50 L 51 52 Z" fill="#5BD8FF"/>
      </svg>
    ` },

    fox: { name: 'Sly Fox', bg: '#FFE8D6', svg: `
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fxFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFA640"/>
            <stop offset="100%" stop-color="#E26800"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#FFE8D6"/>
        <path d="M 14 22 L 12 8 L 22 16 Z" fill="url(#fxFace)" stroke="#0F1F3D" stroke-width="1.5"/>
        <path d="M 50 22 L 52 8 L 42 16 Z" fill="url(#fxFace)" stroke="#0F1F3D" stroke-width="1.5"/>
        <path d="M 16 16 L 14 10 L 19 14 Z" fill="#FFFFFF"/>
        <path d="M 48 16 L 50 10 L 45 14 Z" fill="#FFFFFF"/>
        <path d="M 12 24 Q 14 14 32 14 Q 50 14 52 24 L 48 46 Q 32 58 16 46 Z" fill="url(#fxFace)" stroke="#0F1F3D" stroke-width="1.5"/>
        <path d="M 22 36 Q 32 50 42 36 L 38 50 Q 32 54 26 50 Z" fill="#FFFFFF"/>
        <circle cx="24" cy="30" r="3.5" fill="#FFFFFF"/>
        <circle cx="40" cy="30" r="3.5" fill="#FFFFFF"/>
        <circle cx="24" cy="30" r="2.3" fill="#00C9B1"/>
        <circle cx="40" cy="30" r="2.3" fill="#00C9B1"/>
        <circle cx="24" cy="30" r="1.2" fill="#0F1F3D"/>
        <circle cx="40" cy="30" r="1.2" fill="#0F1F3D"/>
        <circle cx="24.4" cy="29.6" r="0.5" fill="#fff"/>
        <circle cx="40.4" cy="29.6" r="0.5" fill="#fff"/>
        <ellipse cx="32" cy="40" rx="2.5" ry="1.8" fill="#0F1F3D"/>
        <path d="M 28 44 Q 32 47 36 44" stroke="#0F1F3D" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <line x1="32" y1="42" x2="32" y2="44" stroke="#0F1F3D" stroke-width="1.2"/>
      </svg>
    ` },

    alien: { name: 'Space Alien', bg: '#1F2D5F', svg: `
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="alBody" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#80E8DE"/>
            <stop offset="60%" stop-color="#00C9B1"/>
            <stop offset="100%" stop-color="#00897B"/>
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#1F2D5F"/>
        <circle cx="14" cy="16" r="0.7" fill="#fff"/>
        <circle cx="50" cy="14" r="0.5" fill="#fff"/>
        <circle cx="48" cy="50" r="0.6" fill="#FFD93D"/>
        <circle cx="32" cy="28" r="20" fill="url(#alBody)" stroke="#0F1F3D" stroke-width="1.5"/>
        <path d="M 16 38 Q 14 50 18 56" stroke="#0F1F3D" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M 16 38 Q 14 50 18 56" stroke="#00C9B1" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.9"/>
        <path d="M 22 42 Q 22 54 26 58" stroke="#00C9B1" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M 32 44 L 32 58" stroke="#00C9B1" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M 42 42 Q 42 54 38 58" stroke="#00C9B1" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M 48 38 Q 50 50 46 56" stroke="#00C9B1" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="18" cy="56" r="2" fill="#FFD93D"/>
        <circle cx="26" cy="58" r="2" fill="#FFD93D"/>
        <circle cx="32" cy="58" r="2" fill="#FFD93D"/>
        <circle cx="38" cy="58" r="2" fill="#FFD93D"/>
        <circle cx="46" cy="56" r="2" fill="#FFD93D"/>
        <circle cx="24" cy="24" r="4" fill="#fff"/>
        <circle cx="32" cy="20" r="4" fill="#fff"/>
        <circle cx="40" cy="24" r="4" fill="#fff"/>
        <circle cx="24" cy="24" r="2" fill="#0F1F3D"/>
        <circle cx="32" cy="20" r="2" fill="#0F1F3D"/>
        <circle cx="40" cy="24" r="2" fill="#0F1F3D"/>
        <circle cx="24.5" cy="23.5" r="0.7" fill="#fff"/>
        <circle cx="32.5" cy="19.5" r="0.7" fill="#fff"/>
        <circle cx="40.5" cy="23.5" r="0.7" fill="#fff"/>
        <path d="M 28 32 Q 32 36 36 32" stroke="#0F1F3D" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      </svg>
    ` },

    ninja: { name: 'Cyber Ninja', bg: '#FFE0E8', svg: `
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="njFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFE0BD"/>
            <stop offset="100%" stop-color="#F4C19A"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#FFE0E8"/>
        <line x1="14" y1="16" x2="44" y2="44" stroke="#9FA8B0" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="50" y1="16" x2="20" y2="44" stroke="#9FA8B0" stroke-width="2.5" stroke-linecap="round"/>
        <rect x="12" y="14" width="4" height="3" rx="1" fill="#8B5C2A"/>
        <rect x="48" y="14" width="4" height="3" rx="1" fill="#8B5C2A"/>
        <circle cx="32" cy="34" r="20" fill="url(#njFace)" stroke="#0F1F3D" stroke-width="1.5"/>
        <path d="M 12 30 Q 32 22 52 30 L 52 38 Q 32 32 12 38 Z" fill="#0F1F3D"/>
        <path d="M 8 32 L 56 32" stroke="#00C9B1" stroke-width="3.5"/>
        <path d="M 6 32 Q 4 30 6 28" stroke="#00C9B1" stroke-width="3.5" fill="none"/>
        <path d="M 58 32 Q 60 34 58 36" stroke="#00C9B1" stroke-width="3.5" fill="none"/>
        <path d="M 14 44 Q 32 56 50 44 Q 50 36 32 36 Q 14 36 14 44 Z" fill="#0F1F3D"/>
        <line x1="20" y1="42" x2="44" y2="42" stroke="#00C9B1" stroke-width="0.8" opacity="0.7"/>
        <line x1="22" y1="46" x2="42" y2="46" stroke="#00C9B1" stroke-width="0.8" opacity="0.4"/>
        <ellipse cx="26" cy="28" rx="3" ry="2.2" fill="#fff"/>
        <ellipse cx="38" cy="28" rx="3" ry="2.2" fill="#fff"/>
        <circle cx="26" cy="28" r="1.4" fill="#0F1F3D"/>
        <circle cx="38" cy="28" r="1.4" fill="#0F1F3D"/>
        <circle cx="26.4" cy="27.6" r="0.5" fill="#fff"/>
        <circle cx="38.4" cy="27.6" r="0.5" fill="#fff"/>
      </svg>
    ` },

  };

  // ── Legacy emoji → new avatar id mapping (backwards compat) ─────────────
  const EMOJI_TO_ID = {
    '🚀': 'rocket',   '⚡': 'bolt',
    '🎮': 'robot',    '🌟': 'wizard',
    '🦁': 'fox',      '🐉': 'dragon',
    '🦊': 'fox',      '🎨': 'unicorn',
    '🔥': 'bolt',     '🧠': 'wizard',
    '🐼': 'panda',    '🦉': 'owl',
    '🛡️': 'knight',   '🦄': 'unicorn',
    '👽': 'alien',    '🥷': 'ninja',
  };

  // ── Public API ──────────────────────────────────────────────────────────
  /**
   * Resolve the canonical avatar id from either an id or a legacy emoji.
   * Returns null if the input doesn't match anything.
   * @param {string} value
   */
  function resolveId(value) {
    if (!value) return null;
    if (AVATARS[value]) return value;
    if (EMOJI_TO_ID[value]) return EMOJI_TO_ID[value];
    return null;
  }

  /**
   * Render an avatar as inline SVG markup. Pass an id ('rocket') OR a
   * legacy emoji ('🚀'). Returns an HTML string ready for innerHTML.
   * Falls back to the raw value (in a span) if no match — keeps old
   * profiles renderable even after icon set changes.
   * @param {string} value
   * @param {object} opts — { size: number = 56, bg: boolean = true }
   */
  function renderHTML(value, opts = {}) {
    const id = resolveId(value);
    const size = opts.size || 56;
    if (!id) {
      return `<span class="ts-avatar-fallback" data-no-icons="1" style="font-size:${Math.round(size * 0.7)}px">${value || '?'}</span>`;
    }
    const av = AVATARS[id];
    return `<span class="ts-avatar" data-no-icons="1" data-avatar="${id}" style="width:${size}px;height:${size}px">${av.svg}</span>`;
  }

  /**
   * Replace the contents of a host element with a rendered avatar.
   * @param {Element} host
   * @param {string} value — id or legacy emoji
   * @param {object} opts
   */
  function mount(host, value, opts) {
    if (!host) return;
    host.setAttribute('data-no-icons', '1');
    host.innerHTML = renderHTML(value, opts);
  }

  /**
   * List of all avatar ids in display order (used by the onboarding grid).
   * @returns {string[]}
   */
  function ids() {
    return Object.keys(AVATARS);
  }

  function get(id) {
    return AVATARS[id] || null;
  }

  return { AVATARS, EMOJI_TO_ID, renderHTML, mount, resolveId, ids, get };
})();

if (typeof window !== 'undefined') {
  window.TSAAvatars = TSAAvatars;
}
