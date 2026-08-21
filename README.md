# e-store-extension-USA

Welcome to **e-store-extension-USA**, the United States build of the Open Food Facts e-store browser extension. It surfaces Open Food Facts nutrition and health data — Nutri-Score, Green-Score, NOVA group, and nutrient details — directly on US grocery e-commerce sites while you shop.

This repository is a country-specific fork of [e-store-extension-core](https://github.com/offCanada/e-store-extension-core); the shared extension architecture lives there, and this repo adds the store adapters for US retailers.

## Aim of the Project

Shoppers on US grocery sites have no easy way to see how a product actually scores nutritionally without leaving the page. This extension closes that gap: it detects products as you browse, looks them up in the Open Food Facts database, and renders the scores inline — on product pages and in search/category listings — without disrupting the retailer's own UI.

## Supported Stores

| Store    | Domain            | Adapter                                       | Status  |
| :------- | :---------------- | :-------------------------------------------- | :------ |
| Walmart  | `www.walmart.com` | `src/runtime/adapter/stores/WalmartAdapter.ts` | Working |

The Walmart adapter reads the product UPC from the page's embedded `__NEXT_DATA__` payload and falls back to product name and brand as a search query when no barcode is exposed. Banners are injected below the ratings block on a product page, and under the price on each search-result item.

Additional US retailers are welcome — see [Adding Support for New Stores](#adding-support-for-new-stores).

## Project Overview

- **Framework:** [WXT](https://wxt.dev) for cross-browser support (Chrome, Firefox, Edge).
- **UI Components:** **Preact** and **Lucide Icons** for lightweight content-script UI.
- **Data:** the [Open Food Facts Node SDK](https://github.com/openfoodfacts/openfoodfacts-nodejs) for barcode and search lookups, with results cached in extension storage.
- **Developer Experience:** **Vite** for fast HMR, alongside **TypeScript**, **ESLint**, and **Prettier**.
- **Package Management:** Managed via `pnpm`.

## File Structure

```text
e-store-extension-USA/
├── assets/                      # Static assets like images or fonts
├── entrypoints/                 # WXT entrypoints (background, content script, popup)
├── public/                      # Publicly accessible files copied as-is (score/logo SVGs)
├── src/
│   ├── components/              # Preact UI (banners, score cards, product modal)
│   ├── runtime/
│   │   ├── adapter/stores/      # Per-store adapters — add new stores here
│   │   ├── observers/           # DOM and visibility observers
│   │   ├── orchestrator/        # Ties adapters, data, and rendering together
│   │   └── rendering/           # Banner mounting
│   ├── services/                # Product data providers and storage/cache
│   └── types/                   # Shared TypeScript types
├── package.json                 # Project metadata and scripts
└── wxt.config.ts                # WXT configuration
```

## Local Setup

```bash
git clone https://github.com/offCanada/e-store-extension-USA.git
cd e-store-extension-USA
pnpm install
pnpm dev
```

`pnpm dev` opens a browser with the extension loaded. Visit any [walmart.com](https://www.walmart.com) product page or search result to see the banners.

## Runnable Scripts

```bash
pnpm dev             # Start development server
pnpm dev:firefox     # Start development server for Firefox
pnpm build           # Build extension for production
pnpm build:firefox   # Build extension for Firefox
pnpm zip             # Create a zip file for Chrome Web Store
pnpm zip:firefox     # Create a zip file for Firefox Add-ons
pnpm compile         # Type-check with tsc
pnpm lint            # Run ESLint to check for code issues
pnpm format          # Format the code using Prettier
```

## Adding Support for New Stores

Want to add another US retailer? Implement a `StoreAdapter` under `src/runtime/adapter/stores/` and register it in `src/runtime/adapter/index.ts`. See the [New Store Guide](ADDING_NEW_STORES.md) for a step-by-step tutorial.

## Contributing

Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License.
