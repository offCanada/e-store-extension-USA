import { SampleAdapter } from './stores/SampleAdapter';
import { WalmartAdapter } from './stores/WalmartAdapter';

import type { StoreAdapter } from './StoreAdapter';

interface StoreDefinition {
  hostname: string;
  match: string;
  adapter: new () => StoreAdapter;
}

export const stores: StoreDefinition[] = [
  {
    hostname: 'www.metro.ca',
    match: '*://*.metro.ca/*',
    adapter: SampleAdapter,
  },
  {
    hostname: 'www.walmart.com',
    match: '*://*.walmart.com/*',
    adapter: WalmartAdapter,
  },
];

export function getStoreMatchPatterns(): string[] {
  return stores.map((store) => store.match);
}

export function resolveStoreAdapter(hostname: string): StoreAdapter | null {
  const store = stores.find((store) => store.hostname === hostname);

  return store ? new store.adapter() : null;
}
