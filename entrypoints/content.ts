import { getStoreMatchPatterns, resolveStoreAdapter } from '@/src/runtime/adapter';
import { Orchestrator } from '@/src/runtime/orchestrator/Orchestrator';

export default defineContentScript({
  matches: getStoreMatchPatterns(),
  runAt: 'document_idle',
  main() {
    console.log('[NutriLens] Content script loaded on:', window.location.hostname);
    console.log('[NutriLens] Match patterns:', getStoreMatchPatterns());

    const store = resolveStoreAdapter(window.location.hostname);

    if (!store) {
      console.warn('[NutriLens] No adapter found for hostname:', window.location.hostname);
      return;
    }

    console.log('[NutriLens] Adapter resolved:', store.constructor.name);
    const orchestrator = new Orchestrator(store);
    orchestrator.init();
  },
});
