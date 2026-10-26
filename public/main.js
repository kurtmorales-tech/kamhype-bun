// Progressive enhancement only: all pages, navigation and disclosures work without JS.
const technologyTrack = document.querySelector('.technology-track');
const toolControls = document.querySelector('.tools-controls');
if (technologyTrack && toolControls) {
  const previous = toolControls.querySelector('[data-tool-step="-1"]');
  const next = toolControls.querySelector('[data-tool-step="1"]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (previous && next) {
    toolControls.hidden = false;
    const updateControls = () => {
      previous.disabled = technologyTrack.scrollLeft <= 2;
      next.disabled = technologyTrack.scrollLeft >= technologyTrack.scrollWidth - technologyTrack.clientWidth - 2;
    };
    for (const button of [previous, next]) {
      button.addEventListener('click', () => {
        const card = technologyTrack.firstElementChild;
        if (!card) return;
        const gap = parseFloat(getComputedStyle(technologyTrack).columnGap) || 0;
        technologyTrack.scrollBy({ left: Number(button.dataset.toolStep) * (card.getBoundingClientRect().width + gap), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
      });
    }
    technologyTrack.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    updateControls();
  }
}
const mobileMenu = document.querySelector('.mobile-menu');
mobileMenu?.addEventListener('click', (event) => {
  if (event.target.closest('a')) mobileMenu.open = false;
});
mobileMenu?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileMenu.open) {
    mobileMenu.open = false;
    mobileMenu.querySelector('summary').focus();
  }
});

const chapterIndex = document.querySelector('.chapter-index');
if (chapterIndex) {
  const chapterList = chapterIndex.querySelector('.chapter-list');
  const viewButtons = chapterIndex.querySelectorAll('[data-chapter-view]');
  if (chapterList && viewButtons.length === 2) {
    for (const button of viewButtons) {
      button.addEventListener('click', () => {
        const isList = button.dataset.chapterView === 'list';
        chapterList.classList.toggle('view-list', isList);
        for (const viewButton of viewButtons) {
          viewButton.setAttribute('aria-pressed', String(viewButton === button));
        }
      });
    }
    chapterIndex.classList.add('view-ready');
  }
}
