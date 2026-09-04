import preact from '@preact/preset-vite';
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [preact()],
  }),
  manifest: {
    name: 'Open Food Facts — USA',
    description: 'Open Food Facts nutrition and health scores on US grocery e-commerce sites.',
    version: '0.0.1',
    host_permissions: ['https://world.openfoodfacts.org/*', 'https://search.openfoodfacts.org/*'],
    web_accessible_resources: [
      {
        resources: ['score/*.svg', 'logos/*.svg'],
        matches: ['<all_urls>'],
      },
    ],
    permissions: ['storage', 'unlimitedStorage'],
  },
});
