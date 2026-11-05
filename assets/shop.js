// ══════════════════════════════════════════════
// BOBS7N — SHOP CATALOG + CATEGORY/TYPE FILTERING
// ══════════════════════════════════════════════
(function () {

    // Image sources: real BOBS7N product photos (local, in-repo) + Pexels CDN
    // (keyless, hotlinkable). `P(id)` builds a 3:4 portrait crop.
    const P = id => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop&fm=jpg`;
    const IMG = {
        // real BOBS7N product photos (owner-supplied)
        saddleLeather: 'assets/products/WA0007.jpg', // brown biker leather, 1 model
        maroonLeather: 'assets/products/WA0006.jpg', // maroon leather, 2 models
        maroonBomber:  'assets/products/WA0009.jpg', // maroon bomber, BOBS7N patch
        brownLeather:  'assets/products/WA0003.jpg', // brown leather + matching pants
        zipPullover:   'assets/products/WA0008.jpg', // black zip pullover "TEAM BELIEVER"
        graphicTop:    'assets/products/WA0002.jpg',  // white graphic top
        // pexels, matched to garment type (African-represented where available)
        denimJacket: P('36607477'),
        suedeJacket: P('4197168'),
        jeansStreet: P('533733'),
        jeansRipped: P('13187713'),
        jeansUrban:  P('36718240'),
        twoPiece:    P('26744884'),
        twoPieceAlt: P('15661635'),
        tracksuit:   P('31094919'),
        hoodieOversized: P('16982868'),
        hoodieStudio: P('7479825'),
        varsityBlue: P('32483235'),
        varsityRed:  P('14854328'),
        varsityVintage: P('10887357'),
        trenchDetail: P('19192235'),
        trench:      P('5120186'),
        coats:       P('5263493'),
        teeHangers:  P('32963962'),
        teeOversized: P('2451200'),
        afroJacket:  P('36957074'),
        afroRetro:   P('36957075'),
        afrTraditional: P('40204424'),
        afrStreet:   P('10698019'),
        streetBw:    P('34751422'),
        streetBag:   P('27844486'),
    };

    // ── CATEGORY DEFINITIONS ──
    // key -> { label, types:[{key,label}] }
    const CATEGORIES = [
        { key: 'jackets', label: 'Jackets', types: [
            { key: 'denim', label: 'Denim' }, { key: 'leather', label: 'Leather' }, { key: 'suede', label: 'Suede' }
        ]},
        { key: 'jeans', label: 'Jean Trousers', types: [
            { key: 'street', label: 'Street Jeans' }, { key: 'ripped', label: 'Ripped Jeans' }, { key: 'straight', label: 'Straight Fit' }
        ]},
        { key: 'twopiece', label: '2 Piece Sets', types: [
            { key: 'jeans', label: 'Jeans' }, { key: 'tracksuit', label: 'Tracksuit' }, { key: 'suede', label: 'Suede' }, { key: 'others', label: 'Others' }
        ]},
        { key: 'hoodies', label: 'Hoodies', types: [
            { key: 'oversized', label: 'Oversized' }, { key: 'cropped', label: 'Cropped' }, { key: 'zip', label: 'Zip-Up' }
        ]},
        { key: 'varsity', label: 'Varsity Jackets', types: [
            { key: 'letterman', label: 'Letterman' }, { key: 'bomber', label: 'Bomber' }, { key: 'classic', label: 'Classic' }
        ]},
        { key: 'outerwear', label: 'Outerwear', types: [
            { key: 'trench', label: 'Trench' }, { key: 'parka', label: 'Parka' }, { key: 'puffer', label: 'Puffer' }
        ]},
        { key: 'tees', label: 'Premium Tees', types: [
            { key: 'graphic', label: 'Graphic' }, { key: 'plain', label: 'Plain' }, { key: 'oversized', label: 'Oversized' }
        ]},
    ];

    // ── PRODUCT CATALOG ──
    const PRODUCTS = [
        // JACKETS
        { name: 'SADDLE Leather Jacket', cat: 'jackets', type: 'leather', price: '₦185,000', img: IMG.saddleLeather, badge: 'Limited', caption: 'Saddle-brown full-grain leather. Crafted for those who lead.' },
        { name: 'ECLIPSE Denim Jacket', cat: 'jackets', type: 'denim', price: '₦95,000', img: IMG.denimJacket, badge: 'Premium', caption: 'Washed denim, gold-stitched detailing.' },
        { name: 'REGENT Suede Jacket', cat: 'jackets', type: 'suede', price: '₦165,000', img: IMG.suedeJacket, badge: 'New', caption: 'Soft suede shell, tailored silhouette.' },

        // JEAN TROUSERS
        { name: 'AVENUE Street Jeans', cat: 'jeans', type: 'street', price: '₦58,000', img: IMG.jeansStreet, badge: 'Bestseller', caption: 'Relaxed street-fit denim, everyday luxury.' },
        { name: 'FRACTURE Ripped Jeans', cat: 'jeans', type: 'ripped', price: '₦62,000', img: IMG.jeansRipped, badge: 'New', caption: 'Hand-distressed detailing, tapered leg.' },
        { name: 'FOUNDATION Straight Jeans', cat: 'jeans', type: 'straight', price: '₦55,000', img: IMG.jeansUrban, badge: 'Classic', caption: 'Clean straight-fit denim, built to last.' },

        // 2 PIECE SETS
        { name: 'VELVET NOIR 2-Piece', cat: 'twopiece', type: 'others', price: '₦120,000', img: IMG.twoPiece, badge: 'New', caption: 'Matching shirt & trouser. Quiet confidence.' },
        { name: 'MONARCH Co-ord Set', cat: 'twopiece', type: 'jeans', price: '₦110,000', img: IMG.twoPieceAlt, badge: 'Premium', caption: 'Coordinated shirt & trouser set.' },
        { name: 'DYNASTY Set', cat: 'twopiece', type: 'tracksuit', price: '₦98,000', img: IMG.tracksuit, badge: 'Bestseller', caption: 'Premium co-ord set, gold trims.' },

        // HOODIES
        { name: 'SOVEREIGN Oversized Hoodie', cat: 'hoodies', type: 'oversized', price: '₦48,000', img: IMG.hoodieOversized, badge: 'Bestseller', caption: 'Heavyweight cotton, oversized fit.' },
        { name: 'LEGACY Studio Hoodie', cat: 'hoodies', type: 'cropped', price: '₦42,000', img: IMG.hoodieStudio, badge: 'New', caption: 'Relaxed silhouette, embroidered crest.' },
        { name: 'BELIEVER Zip Hoodie', cat: 'hoodies', type: 'zip', price: '₦52,000', img: IMG.zipPullover, badge: 'Premium', caption: 'Full-zip fleece, "TEAM BELIEVER" print, gold hardware.' },

        // VARSITY JACKETS
        { name: 'CROWNGUARD Letterman', cat: 'varsity', type: 'letterman', price: '₦140,000', img: IMG.varsityBlue, badge: 'Limited', caption: 'Wool body, leather sleeves, chenille patch.' },
        { name: 'CRIMSON Bomber', cat: 'varsity', type: 'bomber', price: '₦130,000', img: IMG.varsityRed, badge: 'New', caption: 'Crimson satin bomber, ribbed cuffs and hem.' },
        { name: 'EMBLEM Classic Varsity', cat: 'varsity', type: 'classic', price: '₦125,000', img: IMG.varsityVintage, badge: 'Premium', caption: 'Timeless varsity cut, gold-embroidered B7.' },

        // OUTERWEAR
        { name: 'IMPERIUM Trench Coat', cat: 'outerwear', type: 'trench', price: '₦175,000', img: IMG.trenchDetail, badge: 'Limited', caption: 'Full-length trench, belted waist.' },
        { name: 'ARCTIC Coat', cat: 'outerwear', type: 'parka', price: '₦160,000', img: IMG.trench, badge: 'New', caption: 'Layered statement coat, all-season.' },
        { name: 'ZENITH Coat', cat: 'outerwear', type: 'puffer', price: '₦145,000', img: IMG.coats, badge: 'Premium', caption: 'Structured outer layer, city-ready.' },

        // PREMIUM TEES
        { name: 'BELIEVER Graphic Tee', cat: 'tees', type: 'graphic', price: '₦28,000', img: IMG.graphicTop, badge: 'Bestseller', caption: 'Heavyweight cotton, BOBS7N print.' },
        { name: 'ESSENCE Plain Tee', cat: 'tees', type: 'plain', price: '₦22,000', img: IMG.teeHangers, badge: 'Classic', caption: 'Pima cotton essential, boxed fit.' },
        { name: 'AMPLE Oversized Tee', cat: 'tees', type: 'oversized', price: '₦26,000', img: IMG.teeOversized, badge: 'New', caption: 'Drop-shoulder oversized tee.' },
    ];

    let activeCat = 'all';
    let activeType = 'all';

    function cardHTML(p) {
        return `
        <div class="card reveal-stagger" data-product="${p.name}" data-price="${p.price}" data-img="${p.img}" data-caption="${p.caption}">
            <div class="img-wrap">
                <span class="badge">${p.badge}</span>
                <span class="type-tag">${p.type}</span>
                <img src="${p.img}" alt="${p.name}" loading="lazy">
                <button class="quick-view-trigger" onclick="event.stopPropagation(); openQuickView('${p.name.replace(/'/g,"\\'")}','${p.img}','${p.caption.replace(/'/g,"\\'")}','${p.price}')">Quick View</button>
            </div>
            <div class="info">
                <div class="label">${CATEGORIES.find(c => c.key === p.cat).label}</div>
                <div class="name">${p.name}</div>
                <div class="price">${p.price}</div>
                <div class="caption">${p.caption}</div>
                <div class="action">
                    <button class="cart-btn" onclick="event.stopPropagation(); addToCart('${p.name.replace(/'/g,"\\'")}')">Add To Cart</button>
                    <button class="order-btn" onclick="event.stopPropagation(); orderNow('${p.name.replace(/'/g,"\\'")}')">Place Order</button>
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
                activeType = 'all';
                renderTabs(); renderChips(); renderGrid();
                document.getElementById('shopGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    function renderChips() {
        const chipWrap = document.getElementById('typeChips');
        if (activeCat === 'all') { chipWrap.innerHTML = ''; chipWrap.style.display = 'none'; return; }
        chipWrap.style.display = 'flex';
        const cat = CATEGORIES.find(c => c.key === activeCat);
        let html = `<button class="filter-chip ${activeType === 'all' ? 'active' : ''}" data-type="all">All Types</button>`;
        cat.types.forEach(t => {
            html += `<button class="filter-chip ${activeType === t.key ? 'active' : ''}" data-type="${t.key}">${t.label}</button>`;
        });
        chipWrap.innerHTML = html;
        chipWrap.querySelectorAll('.filter-chip').forEach(btn => {
            btn.addEventListener('click', () => {
                activeType = btn.dataset.type;
                renderChips(); renderGrid();
            });
        });
    }

    function renderGrid() {
        let list = PRODUCTS;
        if (activeCat !== 'all') list = list.filter(p => p.cat === activeCat);
        if (activeType !== 'all') list = list.filter(p => p.type === activeType);

        const countEl = document.getElementById('resultCount');
        countEl.textContent = `${list.length} piece${list.length === 1 ? '' : 's'}`;

        const grid = document.getElementById('shopGrid');
        if (list.length === 0) {
            grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><div class="em-icon">🧵</div>No pieces match this filter yet — check back soon.</div>`;
        } else {
            grid.innerHTML = list.map(cardHTML).join('');
        }
        if (window.__bobs7n_rebind) window.__bobs7n_rebind();
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Read ?cat= from URL (from homepage category teaser links)
        const params = new URLSearchParams(window.location.search);
        const urlCat = params.get('cat');
        if (urlCat && CATEGORIES.some(c => c.key === urlCat)) activeCat = urlCat;

        renderTabs();
        renderChips();
        renderGrid();
    });

})();
