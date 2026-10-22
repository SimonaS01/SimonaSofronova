(() => {
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
// Keep navigation available when JavaScript is unavailable.
if (toggle && navigation) {
toggle.addEventListener('click', () => {
const expanded = toggle.getAttribute('aria-expanded') === 'true';
toggle.setAttribute('aria-expanded', String(!expanded));
navigation.classList.toggle('is-open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
toggle.setAttribute('aria-expanded', 'false');
navigation.classList.remove('is-open');
}));
document.addEventListener('keydown', event => {
if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
toggle.setAttribute('aria-expanded', 'false');
navigation.classList.remove('is-open');
toggle.focus();
}
});
}
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
const links = [...document.querySelectorAll('#navigation a')];
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (!entry.isIntersecting) return;
links.forEach(link => {
if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
else link.removeAttribute('aria-current');
});
});
}, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
})();
