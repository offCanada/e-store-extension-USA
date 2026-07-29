import { type StoreAdapter } from '../adapter/StoreAdapter';
import { DOMObserver } from '../observers/DOMObserver';
import { VisibilityObserver } from '../observers/VisibilityObserver';
import { Renderer } from '../rendering/Renderer';
import { ProcessedElementTracker } from '../state/ProcessedElementTracker';

import CompactBanner from '@/src/components/CompactBanner';
import { invalidateCache } from '@/src/utils/invalidateCache';

export class Orchestrator {
  private renderedElements = new Map<Element, Element>();
  private domObserver = new DOMObserver();
  private visibilityObserver = new VisibilityObserver();
  private processedTracker = new ProcessedElementTracker();

  constructor(private readonly adapter: StoreAdapter) {}

  init() {
    // TODO: load settings, I18n, etc.
    console.log('[NutriLens] Orchestrator.init()');
    invalidateCache();

    this.domObserver.start(() => {
      console.log('[NutriLens] DOM mutation detected, re-rendering...');
      this.render();
    });
    this.render();
  }

  private render() {
    // TODO: check setting to show or not
    console.log('[NutriLens] render() called');
    this.renderProductBanner();
    this.renderListBanner();
  }

  // use when settings change
  private refresh() {
    this.clear();
    this.render();
  }

  private renderProductBanner() {
    console.log('[NutriLens] renderProductBanner() — checking product view...');
    if (!this.adapter.doesProductViewExist()) {
      console.warn('[NutriLens] Product view NOT found');
      return;
    }
    console.log('[NutriLens] Product view exists');

    const productElement = this.adapter.getProductViewElement();
    console.log('[NutriLens] Product element:', productElement);
    if (!productElement || this.processedTracker.isProcessed(productElement)) {
      console.warn('[NutriLens] Product element null or already processed');
      return;
    }

    this.processedTracker.mark(productElement);
    const data = this.adapter.getDataFromProductViewElement(productElement);
    console.log('[NutriLens] Extracted product data:', data);
    const container = this.adapter.injectViewItemBanner(productElement);
    console.log('[NutriLens] Injected banner container:', container);
    Renderer.mount(CompactBanner, container, data);
    this.renderedElements.set(productElement, container);
    console.log('[NutriLens] Banner mounted successfully');
  }

  private renderListBanner() {
    if (!this.adapter.doesProductListExist()) {
      return;
    }

    const elements = this.adapter.getProductListElements();
    elements.forEach((element) => {
      if (this.processedTracker.isProcessed(element)) {
        return;
      }

      if (this.visibilityObserver.isInViewport(element)) {
        this.mountListBanner(element);
      } else {
        this.visibilityObserver.observe(element, () => this.mountListBanner(element));
      }
    });
  }

  private mountListBanner(element: Element) {
    if (this.processedTracker.isProcessed(element)) {
      return;
    }

    this.processedTracker.mark(element);
    const data = this.adapter.getDataFromProductListElement(element);
    const container = this.adapter.injectListItemBanner(element);
    Renderer.mount(CompactBanner, container, data);
    this.renderedElements.set(element, container);
  }

  clear() {
    this.visibilityObserver.clear();
    this.renderedElements.forEach((container, element) => {
      this.processedTracker.unmark(element);
      Renderer.unmount(container);
    });
    this.renderedElements.clear();
    this.processedTracker.clear();
  }

  destroy() {
    this.clear();
    this.domObserver.stop();
  }
}
