# BOBS7N Site Upgrade Notes

## Navigation and page structure
- Combined the Shop and Designs destination into `shop.html` with a single filterable collection.
- Combined About and Contact into `about.html`; contact and newsletter actions now form the closing section.
- Simplified the main navigation to Home, Shop & Designs, and About & Contact.

## Visual and mobile improvements
- Added editorial image-led hero layouts to Home, Shop & Designs, and About & Contact.
- Refined the dark-and-gold palette, type scale, section rhythm, logo sizing and header placement.
- Reworked collection, product, lookbook and contact layouts to prevent text/image overlap on narrow screens.
- Added restrained card/image motion and reduced reveal/transition timing.
- Removed the separate one-second preloader hold; the page wipe now completes in about 0.42 seconds per direction.
- Added reduced-motion support and more accessible mobile-menu state attributes.

## Performance
- Converted the logo and all product photographs to WebP.
- Replaced all page, CSS and JavaScript image references with WebP paths.
- Added async image decoding and prioritised the above-the-fold hero imagery.

## Existing behaviour retained
- Product category filters and quick view.
- Local cart and size selection.
- WhatsApp ordering and custom-order calls to action.
- Existing newsletter local-save behaviour.
