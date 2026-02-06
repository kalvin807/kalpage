const PROXIMITY = 40;
const INACTIVE_OPACITY = 0.15;

const container = document.querySelector<HTMLElement>('.card-grid');
if (container) {
  const cards = container.querySelectorAll<HTMLElement>('.glow-card');

  const update = (e: PointerEvent) => {
    for (const card of cards) {
      const bounds = card.getBoundingClientRect();

      const withinProximity =
        e.x > bounds.left - PROXIMITY &&
        e.x < bounds.left + bounds.width + PROXIMITY &&
        e.y > bounds.top - PROXIMITY &&
        e.y < bounds.top + bounds.height + PROXIMITY;

      card.style.setProperty('--active', withinProximity ? '1' : String(INACTIVE_OPACITY));

      const centerX = bounds.left + bounds.width * 0.5;
      const centerY = bounds.top + bounds.height * 0.5;
      let angle = (Math.atan2(e.y - centerY, e.x - centerX) * 180) / Math.PI;
      if (angle < 0) angle += 360;
      card.style.setProperty('--start', String(angle + 90));
    }
  };

  document.body.addEventListener('pointermove', update);
}
