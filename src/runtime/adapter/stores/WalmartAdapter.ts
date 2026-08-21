import { StoreAdapter } from '../StoreAdapter';

import { type StoreProduct } from '@/src/types/Product';

export class WalmartAdapter extends StoreAdapter {
  readonly structure = {
    productView: {
      productElementSelector: '.h-100.relative',
      uiInjectionElementSelector: '[data-testid="reviews-and-ratings"]',
      getBarcode: (_element: Element) => null,
    },
    listView: {
      productElementSelector: '[data-testid="list-view"] [data-item-id]',
      uiInjectionElementSelector: '[data-automation-id="product-price"]',
      getBarcode: (_element: Element) => null,
    },
  };

  // to check if product view exists
  doesProductViewExist(): boolean {
    const el = this.select(this.structure.productView.productElementSelector);
    console.log('[NutriLens:Walmart] doesProductViewExist?', !!el, '| selector:', this.structure.productView.productElementSelector);
    return !!el;
  }

  // to check if product list exists
  doesProductListExist(): boolean {
    return !!this.select(this.structure.listView.productElementSelector);
  }

  // to get product view element
  getProductViewElement(): Element | null {
    const el = this.select(this.structure.productView.productElementSelector);
    console.log('[NutriLens:Walmart] getProductViewElement:', el);
    return el;
  }

  // to get product list elements
  getProductListElements(): Element[] {
    return this.selectAll(this.structure.listView.productElementSelector);
  }

  // to extract data from product view element
  getDataFromProductViewElement(element: Element): StoreProduct {
    let code = null;
    const script = document.getElementById('__NEXT_DATA__');
    if (script?.textContent) {
      try {
        const nextData = JSON.parse(script.textContent);
        // Try the known paths for Walmart's product UPC
        code = nextData?.props?.pageProps?.initialData?.data?.product?.upc
            ?? nextData?.props?.pageProps?.initialData?.data?.idml?.upc
            ?? null;
            
        // Fallback to regex if the structure changed
        if (!code) {
          const match = script.textContent.match(/"upc":"(\d{10,14})"/);
          if (match) {
            code = match[1];
          }
        }
        console.log('[NutriLens:Walmart] Extracted UPC from __NEXT_DATA__:', code);
      } catch (e) {
        console.warn('[NutriLens:Walmart] Failed to parse __NEXT_DATA__', e);
      }
    }

    if (!code) {
      console.log('[NutriLens:Walmart] Barcode forced to null (searchQuery fallback)');
    }

    // Extract product name from <h1 id="main-title">
    const titleEl = this.select('#main-title');
    const name = titleEl?.textContent?.trim() ?? null;
    console.log('[NutriLens:Walmart] Product name:', name);

    // Extract brand from the brand link (strip "Visit the " / " Store")
    const brandEl = this.select('[data-seo-id="brand-name"]');
    const brand =
      brandEl?.textContent
        ?.replace(/^Visit the\s+/i, '')
        .replace(/\s+Store$/i, '')
        .trim() ?? null;
    console.log('[NutriLens:Walmart] Brand:', brand);

    return {
      code,
      name,
      brand,
      quantity: null,
      category: null,
      searchQuery: name, // fallback if code lookup fails
    };
  }

  // to extract data from product list element
  getDataFromProductListElement(element: Element): StoreProduct {
    const code = null;

    const titleEl = element.querySelector('[data-automation-id="product-title"]');
    const name = titleEl?.textContent?.trim() ?? null;

    return {
      code,
      name,
      brand: null,
      quantity: null,
      category: null,
      searchQuery: name,
    };
  }

  // to inject banner into product view element (below star ratings)
  injectViewItemBanner(target: Element): Element {
    // Find the reviews-and-ratings div and inject after it
    const ratingsEl =
      this.select(this.structure.productView.uiInjectionElementSelector, target) ??
      this.select(this.structure.productView.uiInjectionElementSelector);
    console.log('[NutriLens:Walmart] Ratings element found:', ratingsEl);
    console.log('[NutriLens:Walmart] Ratings selector:', this.structure.productView.uiInjectionElementSelector);

    const container = document.createElement('div');
    container.id = 'nutrilens-product-banner';
    container.style.width = '100%';
    container.style.marginTop = '12px';
    container.style.marginBottom = '12px';

    if (ratingsEl?.parentElement) {
      ratingsEl.parentElement.insertBefore(container, ratingsEl.nextSibling);
      console.log('[NutriLens:Walmart] Banner injected after ratings element');
    } else {
      // Fallback: append to the product element itself
      target.appendChild(container);
      console.warn('[NutriLens:Walmart] Ratings element not found, appended to target instead');
    }

    return container;
  }

  // to inject banner into product list element
  injectListItemBanner(target: Element): Element {
    const container = document.createElement('div');
    container.className = 'nutrilens-list-banner';
    container.style.width = '100%';
    container.style.marginTop = '8px';

    const priceEl = target.querySelector(this.structure.listView.uiInjectionElementSelector);

    if (priceEl?.parentElement) {
      priceEl.parentElement.insertBefore(container, priceEl.nextSibling);
    } else {
      target.appendChild(container);
    }

    return container;
  }
}
