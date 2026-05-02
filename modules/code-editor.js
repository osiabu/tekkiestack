/**
 * TekkieStack 2.0 — Code Editor Module
 * Handles lesson content, hint system, live preview, and lesson progress.
 * Built in Stage 5. Full lesson library added in Stage 9.
 *
 * Author: Aperintel Ltd
 */

const TSACodeEditor = (() => {

  // ── Phase metadata (drives sequence resolution + completion celebrations) ─
  const PHASE_META = {
    j2: { title: 'Phase 2 · Build the Web', sequence: ['p2-l1','p2-l2','p2-l3','p2-l4','p2-l5','p2-l6','p2-l7','p2-l8','p2-l9','p2-l10'] },
  };
  function getSequenceFor(phaseKey) {
    const meta = PHASE_META[phaseKey];
    if (!meta) return [];
    // Filter to lessons that actually exist (allows partial rollout of Phase D content)
    return meta.sequence.filter(id => LESSONS[id]);
  }

  // ── Phase 2 Lessons ──────────────────────────────────────────────────────
  const LESSONS = {
    'p2-l1': {
      id: 'p2-l1', phase: 2, num: 1,
      phaseKey: 'j2', phaseTitle: 'Phase 2',
      title: 'Phase 2 · Lesson 1: HTML Structure',
      desc: 'Learn the anatomy of a web page',
      xp: 20,
      gateYr: 4,
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">🌐 HTML Structure: The Skeleton of Every Webpage</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">Every website you've ever visited, YouTube, BBC, Roblox, is built on HTML. This is where it all starts.</p>
        <div style="margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:8px">What this lesson teaches and why it matters</h3>
          <p style="font-size:14px;line-height:1.75">HTML (HyperText Markup Language) is the structure of a webpage, like the skeleton of a body. Without HTML, browsers would have no idea what to display. Every heading, paragraph, image, and button you've ever clicked is written in HTML.</p>
        </div>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">🔍 Line-by-line explanation</h3>
          <div style="font-size:13px;line-height:2">
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;!DOCTYPE html&gt;</code>: Tells the browser this is a modern HTML5 document</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;html&gt;</code>: Everything on the page lives inside this tag</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;head&gt;</code>: Holds info <em>about</em> the page (title, stylesheets), not visible to users</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;title&gt;</code>: The text shown on the browser tab</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;body&gt;</code>: Everything the user actually sees goes here</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;h1&gt;</code>: The main heading (there should only be one per page)</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;p&gt;</code>: A paragraph of text</div>
          </div>
        </div>
        <div style="background:var(--slate);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">✏️ Try These Changes</h3>
          <ol style="font-size:14px;line-height:2.2;padding-left:18px">
            <li>Change the &lt;title&gt; text to your own name, check the browser tab updates</li>
            <li>Change the &lt;h1&gt; text to say hello with your real name</li>
            <li>Change the &lt;p&gt; text to describe something you're learning</li>
            <li>Add a second &lt;p&gt; tag underneath with your favourite hobby</li>
          </ol>
        </div>
        <div style="background:#EFF6FF;border:1.5px solid #3B82F6;border-radius:11px;padding:14px">
          <div style="font-weight:700;color:#1E40AF;margin-bottom:6px;font-size:13px">💡 Did You Know?</div>
          <p style="font-size:13px;line-height:1.7">The first ever webpage was published by Tim Berners-Lee on 6 August 1991. It had no CSS, no images, just HTML text. It's still live at <em>info.cern.ch</em>!</p>
        </div>
      </div>`,
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>This is my first web page.</p>
</body>
</html>`,
      hints: [
        'Hint 1: Every web page starts with <code>&lt;!DOCTYPE html&gt;</code>: this tells the browser what kind of file it is.',
        'Hint 2: The <code>&lt;head&gt;</code> section holds information <em>about</em> the page. The <code>&lt;body&gt;</code> holds everything you actually <em>see</em>.',
        'Answer: Try changing the text inside <code>&lt;h1&gt;</code> and <code>&lt;p&gt;</code> to something about yourself!',
      ],
    },
    'p2-l2': {
      id: 'p2-l2', phase: 2, num: 2,
      phaseKey: 'j2', phaseTitle: 'Phase 2',
      title: 'Phase 2 · Lesson 2: Headings & Paragraphs',
      desc: 'Use h1–h6 and p tags to structure content',
      xp: 20,
      gateYr: 4,
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">📝 Headings & Paragraphs: Giving Your Page Structure</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">Think of headings like the chapter titles in a book, and paragraphs like the text on each page. Every great webpage uses both.</p>
        <div style="margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:8px">What this lesson teaches and why it matters</h3>
          <p style="font-size:14px;line-height:1.75">BBC News uses &lt;h1&gt; for the main story headline, &lt;h2&gt; for section headings, and &lt;p&gt; for every article paragraph. Roblox's website uses the same pattern. Good heading structure also helps people with screen readers navigate your page, and it helps Google rank it.</p>
        </div>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">🔍 Line-by-line explanation</h3>
          <div style="font-size:13px;line-height:2">
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;h1&gt;</code>: Biggest heading, the page title. Use only once.</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;h2&gt;</code>: Section headings. You can use several on a page.</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;h3&gt; to &lt;h6&gt;</code>: Smaller sub-headings, used for nesting.</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;p&gt;</code>: Paragraph. Browsers add spacing above and below automatically.</div>
          </div>
        </div>
        <div style="background:var(--slate);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">✏️ Try These Changes</h3>
          <ol style="font-size:14px;line-height:2.2;padding-left:18px">
            <li>Change the &lt;h1&gt; to your favourite topic (e.g. "My Favourite Things")</li>
            <li>Add a third &lt;h2&gt; section with a new category and &lt;p&gt; description</li>
            <li>Add an &lt;h3&gt; inside one section to create a sub-heading</li>
            <li>Try adding &lt;strong&gt;bold text&lt;/strong&gt; inside a paragraph</li>
          </ol>
        </div>
        <div style="background:#EFF6FF;border:1.5px solid #3B82F6;border-radius:11px;padding:14px">
          <div style="font-weight:700;color:#1E40AF;margin-bottom:6px;font-size:13px">💡 Did You Know?</div>
          <p style="font-size:13px;line-height:1.7">Google's search algorithm partially judges page quality by how well you use heading levels. A page with a clear h1, logical h2 sections, and descriptive paragraphs ranks higher than "div soup" with no structure.</p>
        </div>
      </div>`,
      starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>My Favourite Things</h1>
  <h2>Food</h2>
  <p>I love pizza and ice cream.</p>
  <h2>Games</h2>
  <p>My favourite game is Minecraft.</p>
</body>
</html>`,
      hints: [
        'Hint 1: Headings go from h1 (biggest) to h6 (smallest). Use them like chapters in a book.',
        'Hint 2: Each <code>&lt;p&gt;</code> tag creates a paragraph. The browser adds space above and below automatically.',
        'Answer: Try adding a third <code>&lt;h2&gt;</code> section with your own topic and a <code>&lt;p&gt;</code> underneath.',
      ],
    },
    'p2-l3': {
      id: 'p2-l3', phase: 2, num: 3,
      phaseKey: 'j2', phaseTitle: 'Phase 2',
      title: 'Phase 2 · Lesson 3: CSS Styling',
      desc: 'Make your page look amazing with colours and fonts',
      xp: 20,
      gateYr: 4,
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">🎨 CSS Styling: Making It Beautiful</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">If HTML is the skeleton, CSS is the skin, clothes, and makeup. It controls every colour, font, and layout you see.</p>
        <div style="margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:8px">What this lesson teaches and why it matters</h3>
          <p style="font-size:14px;line-height:1.75">Spotify's green, YouTube's red, Roblox's blue, all defined in CSS. Without CSS, every website would look like a plain Word document. CSS lets you control backgrounds, text colour, font sizes, spacing, and borders. It's what makes websites feel like brands.</p>
        </div>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">🔍 Line-by-line explanation</h3>
          <div style="font-size:13px;line-height:2">
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">background: #0F1F3D;</code>: Sets the background colour using a hex code (6-digit colour code)</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">color: white;</code>: Sets the text colour (this one uses a named colour)</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">font-family: 'Segoe UI';</code>: Sets the font. The backup (sans-serif) is used if the font isn't found</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">padding: 36px;</code>: Adds 36px of inner space on all 4 sides inside the element</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">border-radius: 14px;</code>: Rounds the corners of the .card box</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">opacity: 0.8;</code>: Makes the text 80% opaque (slightly see-through)</div>
          </div>
        </div>
        <div style="background:var(--slate);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">✏️ Try These Changes</h3>
          <ol style="font-size:14px;line-height:2.2;padding-left:18px">
            <li>Change <code>background: #0F1F3D</code> in body to <code>#2D1B69</code> (deep purple)</li>
            <li>Change <code>color: #00C9B1</code> in h1 to <code>#FFB347</code> (orange)</li>
            <li>Change <code>font-size: 34px</code> to a larger or smaller value</li>
            <li>Try adding <code>border: 2px solid #00C9B1;</code> to the .card rule</li>
          </ol>
        </div>
        <div style="background:#EFF6FF;border:1.5px solid #3B82F6;border-radius:11px;padding:14px">
          <div style="font-weight:700;color:#1E40AF;margin-bottom:6px;font-size:13px">💡 Did You Know?</div>
          <p style="font-size:13px;line-height:1.7">CSS was invented in 1996 by Håkon Wium Lie. Before CSS, developers had to use messy HTML attributes to style everything. CSS separated "what it says" (HTML) from "how it looks" (CSS), a game-changing idea that still drives the web today.</p>
        </div>
      </div>`,
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background: #0F1F3D;
      color: white;
      font-family: 'Segoe UI', sans-serif;
      padding: 36px;
    }
    h1 { color: #00C9B1; font-size: 34px; }
    p  { font-size: 17px; line-height: 1.6; opacity: 0.8; }
    .card {
      background: rgba(255,255,255,0.08);
      padding: 20px;
      border-radius: 14px;
      margin-top: 20px;
      border: 1px solid rgba(255,255,255,0.12);
    }
  </style>
</head>
<body>
  <h1>Hello: I'm learning to code! 👋</h1>
  <p>I'm building my first web page with TekkieStack.</p>
  <div class="card">
    <p>My favourite colour is teal. 🩵</p>
  </div>
</body>
</html>`,
      hints: [
        'Hint 1: CSS lives inside <code>&lt;style&gt;</code> tags. Each rule says: "for THIS element, do THIS".',
        'Hint 2: Try changing <code>background: #0F1F3D;</code> to a different hex colour like <code>#2D1B69</code>.',
        'Answer: Change <code>color: #00C9B1;</code> on the h1 to a colour you like, such as <code>#FFB347</code> (orange).',
      ],
    },
    'p2-l4': {
      id: 'p2-l4', phase: 2, num: 4,
      phaseKey: 'j2', phaseTitle: 'Phase 2',
      title: 'Phase 2 · Lesson 4: CSS Flexbox',
      desc: 'Control layout with flexbox, the most powerful CSS tool',
      xp: 20,
      gateYr: 4,
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">📐 CSS Flexbox: Layouts That Actually Work</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">Flexbox is how most professional websites line things up in rows and columns. Netflix's movie grid? Flexbox. YouTube's nav bar? Flexbox.</p>
        <div style="margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:8px">What this lesson teaches and why it matters</h3>
          <p style="font-size:14px;line-height:1.75">Before Flexbox, laying out elements side by side required complicated hacks with floats and positioning that often broke. Flexbox (introduced in 2009, widely supported from 2015) made layouts simple: apply one property to the parent, and child elements line up automatically.</p>
        </div>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">🔍 Line-by-line explanation</h3>
          <div style="font-size:13px;line-height:2">
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">display: flex;</code>: Turns the .row div into a flex container. Its children now line up in a row</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">gap: 16px;</code>: Adds 16px of space BETWEEN each child (no need for margins!)</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">flex: 1;</code>: On each .box, this means "grow equally to fill available space", so all cards are the same width</div>
          </div>
        </div>
        <div style="background:var(--slate);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">✏️ Try These Changes</h3>
          <ol style="font-size:14px;line-height:2.2;padding-left:18px">
            <li>Add <code>justify-content: center;</code> to .row and see the cards centre</li>
            <li>Add <code>flex-direction: column;</code> to .row and see them stack vertically</li>
            <li>Change <code>flex: 1</code> on the first .box to <code>flex: 2</code>: it grows twice as wide</li>
            <li>Add a fourth &lt;div class="box"&gt;, Flexbox automatically fits it in</li>
          </ol>
        </div>
        <div style="background:#EFF6FF;border:1.5px solid #3B82F6;border-radius:11px;padding:14px">
          <div style="font-weight:700;color:#1E40AF;margin-bottom:6px;font-size:13px">💡 Did You Know?</div>
          <p style="font-size:13px;line-height:1.7">CSS Flexbox was officially added to the CSS specification in 2012 after years of debate. Before it, developers used float:left hacks that required "clearfix" tricks. Flexbox made those obsolete overnight, it's now one of the most-used CSS features on the web.</p>
        </div>
      </div>`,
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #F8F5F0; font-family: sans-serif; padding: 30px; }
    .row {
      display: flex;
      gap: 16px;
    }
    .box {
      background: #0F1F3D;
      color: white;
      padding: 24px;
      border-radius: 12px;
      flex: 1;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>My Cards</h1>
  <div class="row">
    <div class="box">Card One</div>
    <div class="box">Card Two</div>
    <div class="box">Card Three</div>
  </div>
</body>
</html>`,
      hints: [
        'Hint 1: <code>display: flex;</code> on a parent makes its children line up in a row automatically.',
        'Hint 2: <code>gap: 16px;</code> adds space between the flex children. Try changing the number.',
        'Answer: Try adding <code>justify-content: center;</code> to the <code>.row</code> to centre the cards.',
      ],
    },
    'p2-l5': {
      id: 'p2-l5', phase: 2, num: 5,
      phaseKey: 'j2', phaseTitle: 'Phase 2',
      title: 'Phase 2 · Lesson 5: Links & Images',
      desc: 'Connect pages and add images with anchor and img tags',
      xp: 20,
      gateYr: 4,
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">🔗 Links & Images: Connecting the Web</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">Links are literally what make the World Wide Web a "web", and images make it beautiful. These two tags are used on every single webpage ever made.</p>
        <div style="margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:8px">What this lesson teaches and why it matters</h3>
          <p style="font-size:14px;line-height:1.75">The &lt;a&gt; tag (anchor) creates links, between your own pages, or to other websites. The &lt;img&gt; tag embeds images. Together, they transform a plain text document into an interactive, visual experience. Your portfolio page needs both.</p>
        </div>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">🔍 Line-by-line explanation</h3>
          <div style="font-size:13px;line-height:2">
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;a href="URL"&gt;</code>: href = "hypertext reference", the destination URL to link to</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">target="_blank"</code>: Opens the link in a new tab (without this, the current tab navigates away)</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;img src="URL" alt="..."&gt;</code>: src = the image source URL; alt = text shown if the image fails to load</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">max-width: 300px;</code>: Prevents the image being wider than 300px (important for responsive design)</div>
          </div>
        </div>
        <div style="background:var(--slate);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">✏️ Try These Changes: Your Portfolio Page Checklist</h3>
          <p style="font-size:13px;color:var(--muted);margin-bottom:10px">Before you can call your portfolio page done, make sure it includes ALL of these:</p>
          <div style="font-size:14px;line-height:2.4">
            <div>☐  A &lt;h1&gt; with your name</div>
            <div>☐  A short paragraph describing who you are</div>
            <div>☐  At least one &lt;h2&gt; section (e.g. "My Projects" or "Skills")</div>
            <div>☐  At least one image (use picsum.photos for a placeholder)</div>
            <div>☐  At least one link to a website you like</div>
            <div>☐  CSS styling (background colour, font, at least one card/box)</div>
          </div>
        </div>
        <div style="background:#EFF6FF;border:1.5px solid #3B82F6;border-radius:11px;padding:14px">
          <div style="font-weight:700;color:#1E40AF;margin-bottom:6px;font-size:13px">💡 Did You Know?</div>
          <p style="font-size:13px;line-height:1.7">The alt attribute on images is legally required on some websites for accessibility. Screen readers for blind users read out the alt text instead of showing the image. Writing good alt text (descriptive, not just "image1") is a professional skill that many developers skip.</p>
        </div>
      </div>`,
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 30px; background: #F8F5F0; }
    a { color: #00A896; font-weight: bold; }
    img { border-radius: 12px; max-width: 300px; margin-top: 16px; }
  </style>
</head>
<body>
  <h1>My Links & Images</h1>
  <p>Visit <a href="https://www.bbc.co.uk" target="_blank">BBC News</a> for the latest news.</p>
  <br>
  <img src="https://picsum.photos/300/200" alt="A random photo">
  <p>Image from Picsum Photos</p>
</body>
</html>`,
      hints: [
        'Hint 1: <code>&lt;a href="URL"&gt;text&lt;/a&gt;</code> creates a link. <code>target="_blank"</code> opens it in a new tab.',
        'Hint 2: <code>&lt;img src="URL" alt="description"&gt;</code> embeds an image. The <code>alt</code> is important for accessibility.',
        'Answer: Try changing the <code>href</code> to your favourite website, and the <code>src</code> to <code>https://picsum.photos/400/200</code>.',
      ],
    },
    'p2-l6': {
      id: 'p2-l6', phase: 2, num: 6,
      phaseKey: 'j2', phaseTitle: 'Phase 2',
      title: 'Phase 2 · Lesson 6: Lists & Tables',
      desc: 'Organise information with bullet lists, numbered lists, and tables',
      xp: 20,
      gateYr: 4,
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">Lists &amp; Tables: Organising Information</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">Every menu, leaderboard, and shopping cart you see online uses one of these patterns.</p>
        <div style="margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:8px">Why this matters</h3>
          <p style="font-size:14px;line-height:1.75">Wikipedia uses tables for sport scores. Amazon uses lists for product features. The right structure turns a wall of text into something a person can scan in seconds.</p>
        </div>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">The three patterns</h3>
          <div style="font-size:13px;line-height:2">
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;ul&gt;&lt;li&gt;</code>: bullet list (no order matters: ingredients, hobbies)</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;ol&gt;&lt;li&gt;</code>: numbered list (order matters: recipe steps, ranking)</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;table&gt;&lt;tr&gt;&lt;td&gt;</code>: grid (rows + columns: scoreboard, schedule)</div>
          </div>
        </div>
        <div style="background:var(--slate);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">Try these changes</h3>
          <ol style="font-size:14px;line-height:2.2;padding-left:18px">
            <li>Add a third &lt;li&gt; to the bullet list with your own favourite</li>
            <li>Change &lt;ol&gt; to start at 5 by adding <code>start="5"</code></li>
            <li>Add a third row to the table with a new score</li>
            <li>Try adding a &lt;th&gt; header row with column titles</li>
          </ol>
        </div>
      </div>`,
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 30px; background: #F8F5F0; }
    h2 { color: #0F1F3D; margin-top: 22px; }
    table { border-collapse: collapse; margin-top: 8px; }
    td, th { border: 1px solid #D8E0EE; padding: 8px 14px; text-align: left; }
    th { background: #0F1F3D; color: white; }
  </style>
</head>
<body>
  <h2>My Favourite Foods</h2>
  <ul>
    <li>Pizza</li>
    <li>Pasta</li>
  </ul>

  <h2>How To Make Tea</h2>
  <ol>
    <li>Boil the water</li>
    <li>Put a tea bag in the cup</li>
    <li>Pour the water in</li>
    <li>Wait two minutes, then drink</li>
  </ol>

  <h2>Match Scores</h2>
  <table>
    <tr><th>Team</th><th>Goals</th></tr>
    <tr><td>Lions</td><td>3</td></tr>
    <tr><td>Tigers</td><td>2</td></tr>
  </table>
</body>
</html>`,
      hints: [
        'Hint 1: <code>&lt;ul&gt;</code> = unordered (bullets); <code>&lt;ol&gt;</code> = ordered (numbers); both contain <code>&lt;li&gt;</code> items.',
        'Hint 2: A table is built from <code>&lt;tr&gt;</code> rows containing <code>&lt;td&gt;</code> cells (or <code>&lt;th&gt;</code> for header cells).',
        'Answer: To add a row, copy a <code>&lt;tr&gt;...&lt;/tr&gt;</code> line and edit the contents.',
      ],
    },
    'p2-l7': {
      id: 'p2-l7', phase: 2, num: 7,
      phaseKey: 'j2', phaseTitle: 'Phase 2',
      title: 'Phase 2 · Lesson 7: Forms & Inputs',
      desc: 'Build inputs, buttons, and labels, the way users talk to your page',
      xp: 25,
      gateYr: 4,
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">Forms: How Users Talk to Your Page</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">Login boxes, search bars, comment fields, every interactive page uses forms.</p>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">The form trio</h3>
          <div style="font-size:13px;line-height:2">
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;label for="x"&gt;</code>: describes what an input is for (clickable!)</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;input id="x" type="..."&gt;</code>: text/email/number/date/checkbox</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;button&gt;</code>: does something when clicked</div>
          </div>
        </div>
        <div style="background:var(--slate);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">Try these changes</h3>
          <ol style="font-size:14px;line-height:2.2;padding-left:18px">
            <li>Change <code>type="text"</code> on age to <code>type="number"</code>: keyboard changes on phones</li>
            <li>Add a <code>placeholder="..."</code> attribute to the name input</li>
            <li>Add a checkbox: <code>&lt;input type="checkbox"&gt;</code> with a label</li>
            <li>Try typing in the form, then click the button, see the alert?</li>
          </ol>
        </div>
        <div style="background:#EFF6FF;border:1.5px solid #3B82F6;border-radius:11px;padding:14px">
          <div style="font-weight:700;color:#1E40AF;margin-bottom:6px;font-size:13px">Pro tip</div>
          <p style="font-size:13px;line-height:1.7">Always pair a <code>&lt;label&gt;</code> with its input via <code>for=</code> matching <code>id=</code>. Screen readers (which blind people use) rely on this. It's also a legal accessibility requirement on many websites.</p>
        </div>
      </div>`,
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 30px; background: #F8F5F0; }
    label { display: block; margin-top: 12px; font-weight: 700; color: #0F1F3D; }
    input { padding: 10px; border: 1.5px solid #D8E0EE; border-radius: 8px; width: 220px; font-size: 14px; }
    button { margin-top: 16px; padding: 11px 22px; background: #00C9B1; color: #0F1F3D; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; }
  </style>
</head>
<body>
  <h2>Tell us about you</h2>

  <label for="name">Your name</label>
  <input id="name" type="text">

  <label for="age">Your age</label>
  <input id="age" type="text">

  <button onclick="sayHello()">Say Hello</button>

  <p id="greeting"></p>

  <script>
    function sayHello() {
      var n = document.getElementById('name').value;
      var a = document.getElementById('age').value;
      document.getElementById('greeting').textContent = 'Hi ' + n + ', age ' + a + '!';
    }
  <\/script>
</body>
</html>`,
      hints: [
        'Hint 1: Each <code>&lt;input&gt;</code> needs a <code>type</code>. Try "text", "number", "email", "date", or "checkbox".',
        'Hint 2: Connect a <code>&lt;label&gt;</code> to its input by giving the input an <code>id</code> and the label a <code>for</code> with the same value.',
        'Answer: Add <code>placeholder="Your answer..."</code> to an input to show greyed-out hint text inside it.',
      ],
    },
    'p2-l8': {
      id: 'p2-l8', phase: 2, num: 8,
      phaseKey: 'j2', phaseTitle: 'Phase 2',
      title: 'Phase 2 · Lesson 8: CSS Grid',
      desc: 'Lay out anything in rows and columns with CSS Grid',
      xp: 25,
      gateYr: 5,
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">CSS Grid: The Most Powerful Layout Tool</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">Flexbox is great for one row or one column. Grid is what you use for full 2-D layouts.</p>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">The two key properties</h3>
          <div style="font-size:13px;line-height:2">
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">display: grid</code>: turn this element into a grid container</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">grid-template-columns: 1fr 1fr 1fr</code>: three equal columns ("fr" = fraction of free space)</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">gap: 12px</code>: space between every cell (rows AND columns)</div>
          </div>
        </div>
        <div style="background:var(--slate);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">Try these changes</h3>
          <ol style="font-size:14px;line-height:2.2;padding-left:18px">
            <li>Change the columns to <code>1fr 2fr 1fr</code>: middle one becomes twice as wide</li>
            <li>Change to <code>repeat(4, 1fr)</code>: four equal columns automatically</li>
            <li>Add a 7th &lt;div&gt;, Grid wraps it onto a new row automatically</li>
            <li>Try <code>grid-template-columns: repeat(auto-fit, minmax(120px, 1fr))</code>: instant responsive grid!</li>
          </ol>
        </div>
      </div>`,
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #F8F5F0; padding: 24px; font-family: sans-serif; }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
    }
    .tile {
      background: #0F1F3D;
      color: #00C9B1;
      padding: 28px;
      border-radius: 12px;
      text-align: center;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <h2>My Grid</h2>
  <div class="grid">
    <div class="tile">1</div>
    <div class="tile">2</div>
    <div class="tile">3</div>
    <div class="tile">4</div>
    <div class="tile">5</div>
    <div class="tile">6</div>
  </div>
</body>
</html>`,
      hints: [
        'Hint 1: <code>display: grid</code> on the parent + <code>grid-template-columns</code> = instant layout.',
        'Hint 2: <code>1fr</code> means "1 fraction", three <code>1fr</code> = three equal columns.',
        'Answer: Try <code>grid-template-columns: repeat(auto-fit, minmax(120px, 1fr))</code>: that\'s how real websites build responsive card grids.',
      ],
    },
    'p2-l9': {
      id: 'p2-l9', phase: 2, num: 9,
      phaseKey: 'j2', phaseTitle: 'Phase 2',
      title: 'Phase 2 · Lesson 9: Responsive Design',
      desc: 'Make your page look great on phones, tablets, AND laptops',
      xp: 30,
      gateYr: 5,
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">Responsive Design: Mobile First</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">More than 60% of web traffic is on phones. A site that breaks on mobile is a broken site.</p>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">The three core tools</h3>
          <div style="font-size:13px;line-height:2">
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;meta name="viewport"...&gt;</code>: tells phones to render at correct size</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">@media (max-width: 600px) { ... }</code>: only apply these styles on small screens</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">font-size: clamp(14px, 4vw, 22px)</code>: fluid type that scales with the viewport</div>
          </div>
        </div>
        <div style="background:var(--slate);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">Try these changes</h3>
          <ol style="font-size:14px;line-height:2.2;padding-left:18px">
            <li>Resize your preview window narrower than 600px, watch the layout switch</li>
            <li>Add a second media query at 400px that hides the .sidebar entirely</li>
            <li>Try <code>flex-direction: column</code> inside the @media block</li>
            <li>Open browser DevTools → device toolbar to test iPhone / iPad sizes</li>
          </ol>
        </div>
      </div>`,
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; font-family: sans-serif; background: #F8F5F0; }
    .layout { display: flex; gap: 16px; padding: 20px; }
    .main    { flex: 2; background: #0F1F3D; color: white; padding: 22px; border-radius: 12px; }
    .sidebar { flex: 1; background: #00C9B1; color: #0F1F3D; padding: 22px; border-radius: 12px; font-weight: 700; }
    h1 { font-size: clamp(20px, 5vw, 36px); }

    @media (max-width: 600px) {
      .layout { flex-direction: column; }
    }
  </style>
</head>
<body>
  <div class="layout">
    <div class="main">
      <h1>Welcome to my site</h1>
      <p>This layout adapts to any screen size. Try resizing your browser!</p>
    </div>
    <div class="sidebar">
      Quick Links<br>
      Home · About · Contact
    </div>
  </div>
</body>
</html>`,
      hints: [
        'Hint 1: <code>@media (max-width: 600px) { ... }</code> only applies the rules INSIDE on screens narrower than 600px.',
        'Hint 2: <code>clamp(min, ideal, max)</code> creates fluid type, never smaller than min, never larger than max.',
        'Answer: Inside <code>@media (max-width: 400px)</code> add <code>.sidebar { display: none; }</code> to hide it on tiny phones.',
      ],
    },
    'p2-l10': {
      id: 'p2-l10', phase: 2, num: 10,
      phaseKey: 'j2', phaseTitle: 'Phase 2',
      title: 'Phase 2 · Lesson 10: Build Your Portfolio',
      desc: 'Capstone project: combine everything into a personal portfolio page',
      xp: 60,
      gateYr: 5,
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">Your Portfolio Page: Capstone Project</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">Time to put it all together. This is the page you'd send to a teacher, family member, or future employer.</p>
        <div style="background:#FFF5E1;border:1.5px solid var(--amber);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">Your portfolio MUST include</h3>
          <div style="font-size:13.5px;line-height:2.1">
            <div>A clear &lt;h1&gt; with your name (or alias)</div>
            <div>An "About me" paragraph (3-5 sentences)</div>
            <div>A "Skills" section using a list</div>
            <div>A "Projects" section using cards (CSS Grid)</div>
            <div>At least one image (real or placeholder)</div>
            <div>At least one external link (your favourite site)</div>
            <div>Responsive: looks good on phones AND laptops</div>
          </div>
        </div>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">Stretch goals (try one!)</h3>
          <div style="font-size:13px;line-height:2">
            <div>Add a contact form (name + email + message)</div>
            <div>Add a "Hover me" effect using <code>:hover</code></div>
            <div>Add a "Show more" button that toggles a hidden section</div>
          </div>
        </div>
      </div>`,
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <style>
    body { margin: 0; font-family: sans-serif; background: #F8F5F0; color: #0F1F3D; }
    header { background: #0F1F3D; color: white; padding: 36px 24px; text-align: center; }
    header h1 { font-size: clamp(28px, 6vw, 48px); margin: 0 0 8px; }
    header p  { color: #80E8DE; font-size: 16px; }
    main    { max-width: 800px; margin: 0 auto; padding: 32px 20px; }
    section { margin-bottom: 36px; }
    h2 { color: #00A896; margin-bottom: 12px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }
    .card { background: white; padding: 18px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    a { color: #00A896; }
  </style>
</head>
<body>
  <header>
    <h1>Hi: I'm [Your Name]</h1>
    <p>Future developer · Year [your year]</p>
  </header>

  <main>
    <section>
      <h2>About me</h2>
      <p>Write 3-5 sentences about yourself. What do you love? What do you want to build?</p>
    </section>

    <section>
      <h2>My Skills</h2>
      <ul>
        <li>HTML &amp; CSS</li>
        <li>A bit of JavaScript</li>
        <li>(add yours)</li>
      </ul>
    </section>

    <section>
      <h2>My Projects</h2>
      <div class="grid">
        <div class="card"><strong>Project 1</strong><br>Short description here.</div>
        <div class="card"><strong>Project 2</strong><br>Short description here.</div>
        <div class="card"><strong>Project 3</strong><br>Short description here.</div>
      </div>
    </section>

    <section>
      <h2>Find me</h2>
      <p>I love browsing <a href="https://www.bbc.co.uk/news/technology" target="_blank">BBC Tech News</a>.</p>
    </section>
  </main>
</body>
</html>`,
      hints: [
        'Hint 1: Replace every <code>[Your Name]</code> with your actual name. Make the text feel like YOU.',
        'Hint 2: Add real project ideas, even imagined ones. Anything you\'d like to build counts.',
        'Hint 3: For an extra polish: change the colour palette by editing the navy + cyan hex values throughout the CSS.',
      ],
    },
  };

  // ── Debug challenge ──────────────────────────────────────────────────────
  const DEBUG_CHALLENGE = {
    id: 'debug-1', title: 'Daily Challenge, Fix the Broken Button',
    code: `<!-- 🐛 Debug Challenge, Fix the broken button! -->
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 28px; background: #0F1F3D; color: #fff; }
    button { background: #00C9B1; color: #0F1F3D; padding: 12px 22px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: 700; }
    #msg { margin-top: 14px; font-size: 18px; }
  </style>
</head>
<body>
  <h2>Debug Challenge 🐛</h2>
  <p>The button does nothing. Find the typo and fix it!</p>
  <button onclick="showMsg()">Click me!</button>
  <p id="msg"></p>
  <script>
    // BUG: The function name has a typo!
    function showMssg() {
      document.getElementById("msg").textContent = "Fixed! 🎉";
    }
  <\/script>
</body>
</html>`
  };

  // ── Load a lesson into the editor ────────────────────────────────────────
  /**
   * @param {string} lessonId
   */
  function loadLesson(lessonId) {
    const lesson = LESSONS[lessonId];
    if (!lesson) return;

    // Default phaseKey/phaseTitle for any p2-* lesson that hasn't set them explicitly.
    if (!lesson.phaseKey && /^p2-/.test(lessonId)) {
      lesson.phaseKey = 'j2';
      lesson.phaseTitle = 'Phase 2';
    }

    const title  = document.getElementById('lessonTitle');
    const desc   = document.getElementById('lessonDesc');
    const code   = document.getElementById('codeInput');
    if (title) title.textContent = lesson.title;
    if (desc)  desc.textContent  = lesson.desc;
    if (code)  code.value        = lesson.starterCode || '';

    // Reset hints (single source of truth)
    window._currentHints     = lesson.hints || [];
    window._currentHintTier  = 0;
    window._currentLessonId  = lessonId;
    window._currentLessonXp  = lesson.xp;

    const bar = document.getElementById('hintBar');
    if (bar) bar.style.display = 'none';

    // Reset hint button label to default
    const hb = document.getElementById('hintBtn');
    if (hb) hb.innerHTML = '<span class="ts-i ts-i-hint" aria-hidden="true"></span>Hint';

    // Reset console (cleared per-lesson)
    if (typeof clearConsole === 'function') clearConsole();

    // Show explanation panel if the lesson has one
    const explPanel = document.getElementById('lessonExplanation');
    if (explPanel) {
      if (lesson.explanation) {
        explPanel.innerHTML = lesson.explanation + `
          <div style="padding:0 20px 20px">
            <button onclick="document.getElementById('lessonExplanation').style.display='none'"
              style="background:var(--cyan);color:var(--navy);border:none;padding:10px 24px;border-radius:9px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif">
              Got it, start coding
            </button>
          </div>`;
        explPanel.style.display = 'block';
      } else {
        explPanel.style.display = 'none';
      }
    }

    // Clear the preview — show placeholder until user clicks Run.
    // Use srcdoc (consistent with sandboxed iframe in runCode).
    const frame = document.getElementById('previewFrame');
    if (frame) {
      frame.srcdoc = `<!DOCTYPE html><html><body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#F8FAFC;font-family:'DM Sans',sans-serif;color:#8899AA;text-align:center">
          <div><div style="font-size:32px;margin-bottom:12px">&#9654;</div><div style="font-size:14px;font-weight:600">Press <strong style="color:#0F1F3D">Run</strong> to preview your code</div></div>
        </body></html>`;
    }

    // Reset preview status badge
    const badge = document.getElementById('previewStatusBadge');
    if (badge) { badge.textContent = 'Press Run'; badge.style.color = ''; }

    // Render step dots — total = position within phase sequence
    if (typeof _renderStepDots === 'function') {
      const seq = getSequenceFor(lesson.phaseKey || 'j2');
      const total = seq.length || 5;
      const idx = seq.indexOf(lessonId);
      _renderStepDots(idx >= 0 ? idx : (lesson.num - 1), total);
    }
  }

  function loadDebugChallenge() {
    const code = document.getElementById('codeInput');
    if (code) code.value = DEBUG_CHALLENGE.code;
    const title = document.getElementById('lessonTitle');
    const desc  = document.getElementById('lessonDesc');
    if (title) title.textContent = DEBUG_CHALLENGE.title;
    if (desc)  desc.textContent  = 'Find the bug in the JavaScript and fix it';

    // Hide explanation panel for debug challenges
    const explPanel = document.getElementById('lessonExplanation');
    if (explPanel) explPanel.style.display = 'none';

    // Clear preview via srcdoc
    const frame = document.getElementById('previewFrame');
    if (frame) {
      frame.srcdoc = `<!DOCTYPE html><html><body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#F8FAFC;font-family:'DM Sans',sans-serif;color:#8899AA;text-align:center">
        <div><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8899AA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:8px"><circle cx="12" cy="13" r="4.5"/><path d="M9 7l1 1.5M15 7l-1 1.5M3 13h2M19 13h2M5 19l2-2M19 19l-2-2M12 17v3"/></svg><div style="font-size:14px;font-weight:600">Fix the bug, then press <strong style="color:#0F1F3D">Run</strong></div></div>
      </body></html>`;
    }

    if (typeof clearConsole === 'function') clearConsole();
  }

  // ── Public API ────────────────────────────────────────────────────────────
  // Note: mark-done is handled by markLessonDone() in index.html which uses
  // window.TSAQuizGate to gate completion. See modules/quiz-gate.js.
  return { LESSONS, PHASE_META, loadLesson, loadDebugChallenge, getSequenceFor };
})();

if (typeof window !== 'undefined') {
  window.TSACodeEditor = TSACodeEditor;
  // Register the editor route. This runs after app.js has created window.TSA,
  // but BEFORE the inline <script> at the bottom of index.html sets its own
  // TSA.routes['editor']. The inline script will overwrite this — which is fine
  // because the inline route calls TSACodeEditor.loadLesson() directly.
  // If TSA.routes['editor'] is already set (e.g. hot-reload), preserve it.
  if (window.TSA && !window.TSA.routes['editor']) {
    window.TSA.routes['editor'] = () => {
      setTimeout(() => {
        TSACodeEditor.loadLesson('p2-l3');
      }, 50);
    };
  }
}
