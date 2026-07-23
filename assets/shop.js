// ══════════════════════════════════════════════
// BOBS7N — SHOP CATALOG + CATEGORY/TYPE FILTERING
// ══════════════════════════════════════════════
(function () {

    const IMG = {
        leather: 'https://images.unsplash.com/photo-1632958983989-49773325c326?w=900&q=80',
        blazer: 'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=900&q=80',
        brownJacket: 'https://images.unsplash.com/photo-1614252367687-9d1e45da435e?w=900&q=80',
        brickWall: 'https://images.unsplash.com/photo-1599725728598-dc7ed109ff89?w=900&q=80',
        buttonUp: 'https://images.unsplash.com/photo-1614010966237-74489a16848b?w=900&q=80',
        twoMen: 'https://images.unsplash.com/photo-1540406092050-a3f48c9d50e2?w=900&q=80',
        womenGroup: 'https://images.unsplash.com/photo-1733322992706-1210ca79f4df?w=900&q=80',
        womanPattern: 'https://images.unsplash.com/photo-1782528013490-ae62fb5167ba?w=900&q=80',
        womanOveralls: 'https://images.unsplash.com/flagged/photo-1553277024-e6c4b3acb849?w=900&q=80',
        womanRed: 'https://images.unsplash.com/photo-1733322991133-2de13aa12c57?w=900&q=80',
        runwayOrange: 'https://images.unsplash.com/photo-1733324961657-8c60ff1e7c1c?w=900&q=80',
        crowdMan: 'https://images.unsplash.com/photo-1733322987284-4210857c2ada?w=900&q=80',
        crowdShow: 'https://images.unsplash.com/photo-1733322987267-f691d5be2bc6?w=900&q=80',
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
        { name: 'OBSIDIAN Leather Jacket', cat: 'jackets', type: 'leather', price: '₦185,000', img: IMG.leather, badge: 'Limited', caption: 'Full-grain leather. Crafted for those who lead.' },
        { name: 'ECLIPSE Denim Jacket', cat: 'jackets', type: 'denim', price: '₦95,000', img: IMG.brownJacket, badge: 'Premium', caption: 'Washed denim, gold-stitched detailing.' },
        { name: 'REGENT Suede Jacket', cat: 'jackets', type: 'suede', price: '₦165,000', img: IMG.blazer, badge: 'New', caption: 'Soft suede shell, tailored silhouette.' },

        // JEAN TROUSERS
        { name: 'AVENUE Street Jeans', cat: 'jeans', type: 'street', price: '₦58,000', img: IMG.brickWall, badge: 'Bestseller', caption: 'Relaxed street-fit denim, everyday luxury.' },
        { name: 'FRACTURE Ripped Jeans', cat: 'jeans', type: 'ripped', price: '₦62,000', img: IMG.twoMen, badge: 'New', caption: 'Hand-distressed detailing, tapered leg.' },
        { name: 'FOUNDATION Straight Jeans', cat: 'jeans', type: 'straight', price: '₦55,000', img: IMG.buttonUp, badge: 'Classic', caption: 'Clean straight-fit denim, built to last.' },

        // 2 PIECE SETS
        { name: 'VELVET NOIR 2-Piece', cat: 'twopiece', type: 'others', price: '₦120,000', img: IMG.womanOveralls, badge: 'New', caption: 'Matching shirt & trouser. Quiet confidence.' },
        { name: 'MONARCH Denim Set', cat: 'twopiece', type: 'jeans', price: '₦110,000', img: IMG.womanPattern, badge: 'Premium', caption: 'Coordinated denim shirt & trouser set.' },
        { name: 'DYNASTY Tracksuit Set', cat: 'twopiece', type: 'tracksuit', price: '₦98,000', img: IMG.womenGroup, badge: 'Bestseller', caption: 'Premium fleece tracksuit, gold trims.' },

        // HOODIES
        { name: 'SOVEREIGN Oversized Hoodie', cat: 'hoodies', type: 'oversized', price: '₦48,000', img: IMG.buttonUp, badge: 'Bestseller', caption: 'Heavyweight cotton, oversized fit.' },
        { name: 'LEGACY Cropped Hoodie', cat: 'hoodies', type: 'cropped', price: '₦42,000', img: IMG.womanRed, badge: 'New', caption: 'Cropped silhouette, embroidered crest.' },
        { name: 'ASCEND Zip-Up Hoodie', cat: 'hoodies', type: 'zip', price: '₦52,000', img: IMG.crowdMan, badge: 'Premium', caption: 'Full-zip fleece with gold hardware.' },

        // VARSITY JACKETS
        { name: 'CROWNGUARD Letterman', cat: 'varsity', type: 'letterman', price: '₦140,000', img: IMG.blazer, badge: 'Limited', caption: 'Wool body, leather sleeves, chenille patch.' },
        { name: 'HERITAGE Bomber', cat: 'varsity', type: 'bomber', price: '₦130,000', img: IMG.leather, badge: 'New', caption: 'Satin bomber, ribbed cuffs and hem.' },
        { name: 'EMBLEM Classic Varsity', cat: 'varsity', type: 'classic', price: '₦125,000', img: IMG.crowdShow, badge: 'Premium', caption: 'Timeless varsity cut, gold-embroidered B7.' },

        // OUTERWEAR
        { name: 'IMPERIUM Trench Coat', cat: 'outerwear', type: 'trench', price: '₦175,000', img: IMG.womanPattern, badge: 'Limited', caption: 'Full-length trench, belted waist.' },
        { name: 'ARCTIC Parka', cat: 'outerwear', type: 'parka', price: '₦160,000', img: IMG.runwayOrange, badge: 'New', caption: 'Insulated parka, faux-fur trim hood.' },
        { name: 'ZENITH Puffer', cat: 'outerwear', type: 'puffer', price: '₦145,000', img: IMG.blazer, badge: 'Premium', caption: 'Quilted puffer, wind-resistant shell.' },

        // PREMIUM TEES
        { name: 'BELIEVER Graphic Tee', cat: 'tees', type: 'graphic', price: '₦28,000', img: IMG.crowdMan, badge: 'Bestseller', caption: 'Heavyweight cotton, gold foil print.' },
        { name: 'ESSENCE Plain Tee', cat: 'tees', type: 'plain', price: '₦22,000', img: IMG.buttonUp, badge: 'Classic', caption: 'Pima cotton essential, boxed fit.' },
        { name: 'AMPLE Oversized Tee', cat: 'tees', type: 'oversized', price: '₦26,000', img: IMG.womenGroup, badge: 'New', caption: 'Drop-shoulder oversized tee.' },
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
