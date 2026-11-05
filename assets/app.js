// ══════════════════════════════════════════════
// BOBS7N — SHARED APP LOGIC
// ══════════════════════════════════════════════
(function () {
    const WHATSAPP_NUMBER = '2348146139861'; // TODO: update with real BOBS7N WhatsApp number

    // ── SIGNATURE PAGE TRANSITION ──
    // A concise gold signature wipe. Each direction completes in ~0.42s.
    function buildTransitionEl() {
        if (document.getElementById('pageTransition')) return;
        const el = document.createElement('div');
        el.id = 'pageTransition';
        el.innerHTML = '<div class="wipe"></div><div class="mark">B7</div>';
        document.body.appendChild(el);
    }
    buildTransitionEl();
    const transitionEl = document.getElementById('pageTransition');

    // Play entry animation on every page load
    window.addEventListener('DOMContentLoaded', () => {
        transitionEl.classList.add('run-in');
        setTimeout(() => transitionEl.classList.remove('run-in'), 430);
    });

    // Intercept internal links for the exit animation
    document.addEventListener('click', function (e) {
        const link = e.target.closest('a[href]');
        if (!link || link.target === '_blank' || e.defaultPrevented) return;
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        let destination;
        try { destination = new URL(link.href, window.location.href); }
        catch (_) { return; }
        if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return;
        e.preventDefault();
        transitionEl.classList.remove('run-in');
        transitionEl.classList.add('run-out');
        setTimeout(() => { window.location.href = destination.href; }, 430);
    });

    // ── HEADER SCROLL ──
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 60;
        if (header) header.classList.toggle('scrolled', scrolled);
        if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    // ── MOBILE MENU ──
    const menuBtn = document.getElementById('menuBtn');
    const navOverlay = document.getElementById('navOverlay');
    if (menuBtn && navOverlay) {
        menuBtn.addEventListener('click', () => {
            const isActive = navOverlay.classList.contains('active');
            if (isActive) { closeMenu(); }
            else {
                navOverlay.classList.add('active');
                menuBtn.classList.add('active');
                menuBtn.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
        });
        navOverlay.addEventListener('click', function (e) {
            if (e.target === navOverlay) { closeMenu(); return; }
            const navLink = e.target.closest('a[href]');
            if (navLink) {
                try {
                    const target = new URL(navLink.href, window.location.href);
                    if (target.pathname === window.location.pathname) closeMenu();
                } catch (_) { /* Leave normal browser navigation untouched. */ }
            }
        });
    }
    window.closeMenu = function () {
        if (!navOverlay || !menuBtn) return;
        navOverlay.classList.remove('active');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    // ── HERO CANVAS PARTICLES (gold dust) ──
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId;
        const maxParticles = window.innerWidth <= 767 ? 24 : 45;

        function resizeCanvas() {
            const hero = canvas.parentElement;
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }
        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: canvas.height + Math.random() * 100,
                size: Math.random() * 2 + 0.8,
                speedY: -(Math.random() * 0.6 + 0.2),
                speedX: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.2,
                life: Math.random() * 300 + 200,
                maxLife: 500,
            };
        }
        function initParticles() {
            resizeCanvas();
            particles = [];
            for (let i = 0; i < maxParticles; i++) {
                const p = createParticle();
                p.y = Math.random() * canvas.height;
                p.life = Math.random() * p.maxLife;
                particles.push(p);
            }
        }
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.y += p.speedY; p.x += p.speedX; p.life--;
                const alpha = p.life > 0 ? p.opacity * (p.life / p.maxLife) : 0;
                if (p.life <= 0 || p.y < -20) {
                    particles[i] = createParticle();
                    particles[i].y = canvas.height + 20;
                    continue;
                }
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201,166,77,${alpha})`; ctx.fill();
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201,166,77,${alpha * 0.15})`; ctx.fill();
            }
            animId = requestAnimationFrame(animate);
        }
        initParticles(); animate();
        window.addEventListener('resize', () => { resizeCanvas(); particles = particles.map(() => createParticle()); });
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animId) animId = requestAnimationFrame(animate);
            else if (!entries[0].isIntersecting && animId) { cancelAnimationFrame(animId); animId = null; }
        }, { threshold: 0.1 });
        heroObserver.observe(canvas.parentElement);
    }

    // ── CART SYSTEM ──
    let cart = JSON.parse(localStorage.getItem('bobs7n_cart') || '[]');
    function saveCart() { localStorage.setItem('bobs7n_cart', JSON.stringify(cart)); updateBadge(); }
    function updateBadge() {
        const badge = document.getElementById('cartBadge');
        if (!badge) return;
        const count = cart.length;
        if (count > 0) { badge.textContent = count; badge.classList.remove('hidden'); }
        else { badge.textContent = '0'; badge.classList.add('hidden'); }
    }
    window.addToCart = function (productName) { addToCartWithSize(productName, 'L'); };
    window.addToCartWithSize = function (productName, size) {
        cart.push({ name: productName, size: size, addedAt: Date.now() });
        saveCart(); renderCart();
        const cartFloat = document.querySelector('.cartFloat');
        if (cartFloat) { cartFloat.style.transform = 'scale(1.25)'; setTimeout(() => { cartFloat.style.transform = ''; }, 200); }
        showToast(`"${productName}" (${size}) added to cart ✓`);
    };
    function removeFromCart(index) { cart.splice(index, 1); saveCart(); renderCart(); }
    window.removeFromCart = removeFromCart;
    function renderCart() {
        const box = document.getElementById('list');
        if (!box) return;
        if (cart.length === 0) {
            box.innerHTML = '<div class="empty-cart">Your cart is empty.<br>Explore designs to add pieces.</div>';
        } else {
            box.innerHTML = cart.map((item, i) =>
                `<div class="item"><span>${item.name} <small style="color:#888;">(${item.size})</small></span>
                 <button class="remove-item" onclick="removeFromCart(${i})" title="Remove">&times;</button></div>`
            ).join('');
        }
        updateBadge();
    }
    window.toggleCart = function () {
        const sheet = document.getElementById('sheet');
        const backdrop = document.getElementById('sheetBackdrop');
        if (!sheet || !backdrop) return;
        const isActive = sheet.classList.contains('active');
        if (isActive) { sheet.classList.remove('active'); backdrop.classList.remove('active'); document.body.style.overflow = ''; }
        else { renderCart(); sheet.classList.add('active'); backdrop.classList.add('active'); document.body.style.overflow = 'hidden'; }
    };

    window.orderNow = function (productName) {
        const msg = `Hello BOBS7N,%0A%0AI would like to place an order for:%0A• ${productName}%0A%0APlease share details.`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener');
    };
    window.sendAll = function () {
        if (cart.length === 0) { showToast('Your cart is empty!'); return; }
        let text = 'Hello BOBS7N,%0A%0AI would like to order:%0A';
        cart.forEach(item => { text += `• ${item.name} (Size: ${item.size})%0A`; });
        text += '%0AThese are custom-made to order. Please share availability and next steps. Thank you!';
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');
    };

    // ── TOAST ──
    function showToast(message) {
        const existing = document.querySelector('.custom-toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2400);
    }
    window.showToast = showToast;

    // ── QUICK VIEW MODAL ──
    let currentQvProduct = '';
    window.openQuickView = function (productName, imgSrc, caption, price) {
        currentQvProduct = productName;
        const qvImg = document.getElementById('qvImg');
        const qvName = document.getElementById('qvName');
        const qvCaption = document.getElementById('qvCaption');
        const qvPrice = document.getElementById('qvPrice');
        if (qvImg) qvImg.src = imgSrc;
        if (qvName) qvName.textContent = productName;
        if (qvCaption) qvCaption.textContent = caption || '';
        if (qvPrice) { qvPrice.style.display = price ? '' : 'none'; qvPrice.textContent = price || ''; }
        const sizeBtns = document.querySelectorAll('#qvSizes .size-btn');
        sizeBtns.forEach(b => b.classList.remove('selected'));
        const defaultSize = document.querySelector('#qvSizes .size-btn[data-size="L"]');
        if (defaultSize) defaultSize.classList.add('selected');
        document.getElementById('quickViewOverlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    window.closeQuickView = function () {
        const ov = document.getElementById('quickViewOverlay');
        if (ov) ov.classList.remove('active');
        document.body.style.overflow = '';
    };

    function initQuickView() {
        const overlay = document.getElementById('quickViewOverlay');
        if (!overlay) return;
        overlay.addEventListener('click', function (e) { if (e.target === this) closeQuickView(); });
        document.getElementById('qvSizes').addEventListener('click', function (e) {
            if (e.target.classList.contains('size-btn')) {
                this.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
            }
        });
        document.getElementById('qvAddCart').addEventListener('click', function () {
            const selectedSize = document.querySelector('#qvSizes .size-btn.selected');
            const size = selectedSize ? selectedSize.dataset.size : 'L';
            if (currentQvProduct) { addToCartWithSize(currentQvProduct, size); closeQuickView(); }
        });
        document.getElementById('qvOrder').addEventListener('click', function () {
            const selectedSize = document.querySelector('#qvSizes .size-btn.selected');
            const size = selectedSize ? selectedSize.dataset.size : 'L';
            if (currentQvProduct) {
                const msg = `Hello BOBS7N,%0A%0AI would like to order:%0A• ${currentQvProduct} (Size: ${size})%0A%0APlease share details.`;
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener');
                closeQuickView();
            }
        });
    }

    function bindCardClicks() {
        document.querySelectorAll('.card[data-product]').forEach(card => {
            card.addEventListener('click', function (e) {
                if (e.target.closest('button')) return;
                const product = this.dataset.product;
                const img = this.dataset.img;
                const caption = this.dataset.caption;
                const price = this.dataset.price;
                if (product && img) openQuickView(product, img, caption || '', price || '');
            });
        });
    }

    // ── SCROLL TO TOP ──
    window.scrollToTop = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); };

    // ── REVEAL OBSERVER ──
    function initReveal() {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    const staggered = entry.target.querySelectorAll('.reveal-stagger');
                    staggered.forEach((child, i) => setTimeout(() => child.classList.add('show'), (i % 4) * 55));
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('show'), (index % 4) * 55);
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
        document.querySelectorAll('.reveal-stagger').forEach(el => { if (!el.closest('.reveal')) staggerObserver.observe(el); });
    }

    // ── NEWSLETTER ──
    window.handleNewsletter = function (e) {
        e.preventDefault();
        const input = e.target.querySelector('input');
        const email = input.value.trim();
        if (email) {
            const subs = JSON.parse(localStorage.getItem('bobs7n_subs') || '[]');
            if (!subs.includes(email)) { subs.push(email); localStorage.setItem('bobs7n_subs', JSON.stringify(subs)); }
            showToast('Welcome to the circle ✨');
            input.value = '';
        }
    };

    // ── KEYBOARD ESC ──
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        const qv = document.getElementById('quickViewOverlay');
        if (qv && qv.classList.contains('active')) closeQuickView();
        const sheet = document.getElementById('sheet');
        if (sheet && sheet.classList.contains('active')) toggleCart();
        if (navOverlay && navOverlay.classList.contains('active')) closeMenu();
    });

    // ── INIT ON DOM READY ──
    document.addEventListener('DOMContentLoaded', function () {
        updateBadge();
        renderCart();
        initQuickView();
        bindCardClicks();
        initReveal();
        const sheetBackdrop = document.getElementById('sheetBackdrop');
        if (sheetBackdrop) sheetBackdrop.addEventListener('click', toggleCart);
        // expose for pages that render cards dynamically (shop filter re-render)
        window.__bobs7n_rebind = function () { bindCardClicks(); initReveal(); };
    });

    console.log('%c BOBS7N %c Higher Than Fashion %c \u{1F680}',
        'font-size:24px;color:#c9a64d;font-weight:bold;', 'font-size:14px;color:#fff;', 'font-size:16px;');
})();
