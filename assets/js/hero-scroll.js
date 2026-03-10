/* ============================================================
   PRIME LOGIC — Hero Scroll-Storytelling (GSAP + ScrollTrigger)
   ============================================================ */
(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  var section = document.querySelector('.hero--story');
  if (!section) return;

  var textBlocks = section.querySelectorAll('.hero-text-block');
  var row1 = section.querySelectorAll('.db[data-row="1"]');
  var row2 = section.querySelectorAll('.db[data-row="2"]');
  var row3 = section.querySelectorAll('.db[data-row="3"]');

  /* Bail on narrow screens where the grid is single-column */
  if (window.innerWidth <= 1024) {
    textBlocks.forEach(function (b) {
      b.style.opacity = '1';
      b.style.transform = 'none';
    });
    return;
  }

  /* ── Initial state ──────────────────────────────────────── */
  /* Text blocks: hidden below */
  gsap.set(textBlocks, { opacity: 0, y: 60 });

  /* All data blocks start gray */
  var allBlocks = section.querySelectorAll('.db');
  allBlocks.forEach(function (b) { b.classList.add('db--gray'); });

  /* ── Build master timeline ─────────────────────────────── */
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 20%',
      end: 'bottom 70%',
      scrub: 0.6,
      /* pin: false — we rely on CSS sticky for the right panel */
    }
  });

  /* Helper: animate a row of blocks from gray to their real color */
  function colorRow(blocks, position) {
    blocks.forEach(function (block, i) {
      tl.to(block, {
        duration: 0.15,
        onUpdate: function () {
          /* Progress per-tween: when progress >= 0.5 remove gray */
          if (this.progress() >= 0.5) {
            block.classList.remove('db--gray');
          } else {
            block.classList.add('db--gray');
          }
        },
        ease: 'none'
      }, position + i * 0.02);
    });
  }

  /* Step 1: first text block fades in  */
  tl.to(textBlocks[0], { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0);

  /* Step 2: row 1 fills with color */
  colorRow(row1, 0.2);

  /* Step 3: second text block + row 2 */
  if (textBlocks[1]) {
    tl.to(textBlocks[1], { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.35);
  }
  colorRow(row2, 0.45);

  /* Step 4: third text block + row 3 */
  if (textBlocks[2]) {
    tl.to(textBlocks[2], { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.6);
  }
  colorRow(row3, 0.7);

})();
