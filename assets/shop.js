// ══════════════════════════════════════════════
// BOBS7N — SHOP CATALOG (custom-made, WhatsApp-ordered)
// Three lines: Jackets, Jeans, Tops. No prices — every piece is
// custom-made and ordered via WhatsApp.
// ══════════════════════════════════════════════
(function () {

    // Real product photos (local, in-repo)
    const IMG = {
        // jackets — denim (provided)
        j_noir:   'assets/products/jackets/mcfollis-EWDE__C43vk.webp',
        j_alpine: 'assets/products/jackets/brock-wegner-7PuQifdU248.webp',
        j_desert: 'assets/products/jackets/brock-wegner-sN9BqTtWJIE.webp',
        j_drift:  'assets/products/jackets/brock-wegner-sXB3igXCXUY.webp',
        j_frost:  'assets/products/jackets/kemal-alkan-_BDBEP0ePQc.webp',
        j_sable:  'assets/products/jackets/aghil-pk-7RI7ab2y1Xk.webp',
        // jackets — leather (first set, provided)
        j_crimson:'assets/products/firstset/WA0006.webp',
        j_ember:  'assets/products/firstset/WA0007.webp',
        j_regent: 'assets/products/firstset/WA0009.webp',
        // jeans / bottoms (provided; WA0011 dropped — had a woman in frame)
        je_bloom:   'assets/products/jeans/WA0003.webp',
        je_patch:   'assets/products/jeans/WA0004.webp',
        je_chroma:  'assets/products/jeans/WA0005.webp',
        je_tactical:'assets/products/jeans/WA0008.webp',
        je_mono:    'assets/products/jeans/WA0010.webp',
        je_petal:   'assets/products/jeans/WA0013.webp',
        je_acid:    'assets/products/jeans/WA0015.webp',
        // tops (first set, provided)
        t_believer: 'assets/products/firstset/WA0008.webp',
        t_essence:  'assets/products/firstset/WA0002.webp',
        t_team:     'assets/products/firstset/WA0003.webp',
    };

    const CAPTION = 'Custom-made to your measurements.';

    const CATEGORIES = [
        { key: 'jackets', label: 'Jackets' },
        { key: 'jeans', label: 'Jeans' },
        { key: 'tops', label: 'Tops' },
    ];

    const PRODUCTS = [
        // JACKETS — denim
        { name: 'NOIR Street Denim',        cat: 'jackets', img: IMG.j_noir,   caption: CAPTION },
        { name: 'ALPINE Shearling Trucker', cat: 'jackets', img: IMG.j_alpine, caption: CAPTION },
        { name: 'DESERT Trucker Jacket',    cat: 'jackets', img: IMG.j_desert, caption: CAPTION },
        { name: 'DRIFT Denim Trucker',      cat: 'jackets', img: IMG.j_drift,  caption: CAPTION },
        { name: 'FROST Sherpa Jacket',      cat: 'jackets', img: IMG.j_frost,  caption: CAPTION },
        { name: 'SABLE Distressed Denim',   cat: 'jackets', img: IMG.j_sable,  caption: CAPTION },
        // JACKETS — leather
        { name: 'CRIMSON Maroon Leather',   cat: 'jackets', img: IMG.j_crimson, caption: CAPTION },
        { name: 'EMBER Leather Biker',      cat: 'jackets', img: IMG.j_ember,  caption: CAPTION },
        { name: 'REGENT Puffed Leather',    cat: 'jackets', img: IMG.j_regent, caption: CAPTION },
        // JEANS / BOTTOMS
        { name: 'BLOOM Relaxed Print',      cat: 'jeans', img: IMG.je_bloom,   caption: CAPTION },
        { name: 'PATCHWORK Wide-Leg',       cat: 'jeans', img: IMG.je_patch,   caption: CAPTION },
        { name: 'CHROMA Cargo',             cat: 'jeans', img: IMG.je_chroma,  caption: CAPTION },
        { name: 'TACTICAL Wide-Leg Cargo',  cat: 'jeans', img: IMG.je_tactical, caption: CAPTION },
        { name: 'MONO Straight',            cat: 'jeans', img: IMG.je_mono,    caption: CAPTION },
        { name: 'PETAL Wide-Leg',           cat: 'jeans', img: IMG.je_petal,   caption: CAPTION },
        { name: 'ACID Spider-Wash',         cat: 'jeans', img: IMG.je_acid,    caption: CAPTION },
        // TOPS
        { name: 'BELIEVER Zip Pullover',    cat: 'tops', img: IMG.t_believer, caption: CAPTION },
        { name: 'ESSENCE Graphic Top',      cat: 'tops', img: IMG.t_essence,  caption: CAPTION },
        { name: 'TEAM Graphic Top',         cat: 'tops', img: IMG.t_team,     caption: CAPTION },
    ];

    let activeCat = 'all';

    function cardHTML(p) {
        return `
        <div class="card reveal-stagger" data-product="${p.name}" data-img="${p.img}" data-caption="${p.caption}">
            <div class="img-wrap">
                <span class="badge">Custom-Made</span>
                <img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async">
                <button class="quick-view-trigger" onclick="event.stopPropagation(); openQuickView('${p.name}','${p.img}','${p.caption}','')">Quick View</button>
            </div>
            <div class="info">
                <div class="label">${CATEGORIES.find(c => c.key === p.cat).label}</div>
                <div class="name">${p.name}</div>
                <div class="caption">${p.caption}</div>
                <div class="action">
                    <button class="order-btn" onclick="event.stopPropagation(); orderNow('${p.name}')">Order on WhatsApp</button>
                </div>
            </div>
        </div>`;
    }

    function renderTabs() {
        const tabWrap = document.getElementById('catTabs');
        let html = `<button class="cat-tab ${activeCat === 'all' ? 'active' : ''}" data-cat="all">All</button>`;
        CATEGORIES.forEach(c => {
            html += `<button class="cat-tab ${activeCat === c.key ? 'active' : ''}" data-cat="${c.key}">${c.label}</button>`;
        });
        tabWrap.innerHTML = html;
        tabWrap.querySelectorAll('.cat-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                activeCat = btn.dataset.cat;
                renderTabs(); renderGrid();
                document.getElementById('shopGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    // No sub-type filters in this catalog — keep the chip row hidden.
    function renderChips() {
        const cw = document.getElementById('typeChips');
        if (cw) { cw.innerHTML = ''; cw.style.display = 'none'; }
    }

    function renderGrid() {
        let list = PRODUCTS;
        if (activeCat !== 'all') list = list.filter(p => p.cat === activeCat);
        const countEl = document.getElementById('resultCount');
        countEl.textContent = `${list.length} custom piece${list.length === 1 ? '' : 's'}`;
        const grid = document.getElementById('shopGrid');
        grid.innerHTML = list.length
            ? list.map(cardHTML).join('')
            : `<div class="empty-state" style="grid-column:1/-1;"><div class="em-icon">🧵</div>No pieces here yet — check back soon.</div>`;
        if (window.__bobs7n_rebind) window.__bobs7n_rebind();
    }

    document.addEventListener('DOMContentLoaded', function () {
        const params = new URLSearchParams(window.location.search);
        const urlCat = params.get('cat');
        if (urlCat && CATEGORIES.some(c => c.key === urlCat)) activeCat = urlCat;
        renderTabs(); renderChips(); renderGrid();
    });

})();
