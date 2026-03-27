(function () {
  // Inject cursor elements
  const dot = document.createElement('div');
  dot.id = 'neon-cursor-dot';

  const ring = document.createElement('div');
  ring.id = 'neon-cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  // Current mouse position
  let mouseX = -100;
  let mouseY = -100;

  // Lerped ring position
  let ringX = -100;
  let ringY = -100;

  const LERP = 0.12;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function isVaporwave() {
    return document.body.classList.contains('vaporwave-theme');
  }

  function setVisible(visible) {
    const display = visible ? 'block' : 'none';
    dot.style.display = display;
    ring.style.display = display;
  }

  function tick() {
    if (isVaporwave()) {
      // Lerp ring toward mouse
      ringX += (mouseX - ringX) * LERP;
      ringY += (mouseY - ringY) * LERP;

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    }
    requestAnimationFrame(tick);
  }

  // Effect 5: Mouse parallax on #main-container
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleParallax(e) {
    if (prefersReducedMotion.matches) return;
    const container = document.getElementById('main-container');
    if (!container) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx; // -1 to 1
    const dy = (e.clientY - cy) / cy; // -1 to 1
    const maxDeg = 3;
    const rotY = dx * maxDeg;
    const rotX = -dy * maxDeg;
    container.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }

  function resetParallax() {
    const container = document.getElementById('main-container');
    if (container) container.style.transform = '';
  }

  // Watch for vaporwave class toggling
  const observer = new MutationObserver(() => {
    const active = isVaporwave();
    setVisible(active);
    if (active) {
      // Snap ring to mouse so it doesn't fly in from off-screen
      ringX = mouseX;
      ringY = mouseY;
      if (!prefersReducedMotion.matches) {
        document.addEventListener('mousemove', handleParallax);
      }
    } else {
      document.removeEventListener('mousemove', handleParallax);
      resetParallax();
    }
  });

  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  // Initial state
  setVisible(isVaporwave());
  if (isVaporwave() && !prefersReducedMotion.matches) {
    document.addEventListener('mousemove', handleParallax);
  }

  requestAnimationFrame(tick);
})();
