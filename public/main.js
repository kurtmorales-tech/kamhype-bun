// Progressive enhancement only: all pages, navigation and disclosures work without JS.
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

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = [...document.querySelectorAll('.image-reveal')];

if ('IntersectionObserver' in window && !prefersReducedMotion.matches && revealTargets.length) {
  const observer = new IntersectionObserver((entries, instance) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      instance.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px 60px 0px', threshold: 0.08 });

  for (const target of revealTargets) observer.observe(target);
  document.documentElement.classList.add('motion-ready');

  prefersReducedMotion.addEventListener('change', (event) => {
    if (!event.matches) return;
    document.documentElement.classList.remove('motion-ready');
    observer.disconnect();
  }, { once: true });
}
