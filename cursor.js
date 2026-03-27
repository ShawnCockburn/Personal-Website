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

  // Watch for vaporwave class toggling
  const observer = new MutationObserver(() => {
    const active = isVaporwave();
    setVisible(active);
    if (active) {
      // Snap ring to mouse so it doesn't fly in from off-screen
      ringX = mouseX;
      ringY = mouseY;
    }
  });

  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  // Initial state
  setVisible(isVaporwave());

  requestAnimationFrame(tick);
})();
