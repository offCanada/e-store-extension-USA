# Project: "OFF Canada — USA Online Store Extension (Walmart Adapter)"

| **Intern**       | Dev                                                             |
| :--------------- | :-------------------------------------------------------------- |
| **Organisation** | [Open Food Facts](https://world.openfoodfacts.org/)             |
| **Program**      | Software Engineering Internship — May 2026 to August 2026       |
| **Mentor**       | Louis Bastarache                                                |
| **GitHub**       | [DevDs1989](https://github.com/DevDs1989)                       |
| **Email**        | [deveshchandra187@gmail.com](mailto:deveshchandra187@gmail.com) |

# About Me

I'm Devesh, a B.Tech Computer Science student at UPES, Dehradun, specializing in AI/ML. I work mostly in TypeScript, Python, and the React/Next.js ecosystem; I run Arch Linux and Neovim day to day, and I care about the FOSS philosophy behind projects like Open Food Facts, not just the code itself. This internship grew out of a contributor-first approach.

# Organization Overview

Open Food Facts is a global, non-profit initiative that maintains the world's largest open database of food products. Powered by thousands of volunteers, it collects and shares detailed product data — ingredients, nutrition, and environmental impact scores like Nutri-Score and Eco-Score.

OFF Canada is a budding community within the OFF ecosystem which targets Open Food Facts users in Canada to help the enrichment of nutritional data for Canadians.

# Project Description

[e-store-extension-core](https://github.com/offCanada/e-store-extension-core) is a country-agnostic base template for building browser extensions that surface Open Food Facts nutrition and health data directly on grocery e-commerce sites. Country-specific forks (e.g. `e-store-extension-USA`) build store adapters on top of this shared core.

During my internship, I worked on [e-store-extension-USA](https://github.com/offCanada/e-store-extension-USA), implementing a Walmart store adapter that detects both Walmart product pages and search/category list views, pulls the UPC out of the page's embedded `__NEXT_DATA__` payload (falling back to product name, brand, and a search query when no barcode is exposed), and injects an Open Food Facts banner into the page — below the ratings block on a product page, and under the price on each list item. I really enjoyed collaborating on the core template with Sam K Thampan, building out shared logic that other country/store adapters can reuse.

Alongside the extension work, I've also been contributing to the ongoing **FDC (USDA FoodData Central) data import** effort for Open Food Facts. Big thanks to Stephane for bringing me onto this.

## Key Objectives

- **Store Adapter Implementation**: Build a Walmart-specific adapter on the `e-store-extension-core` template.
- **Product Matching**: Barcode-first approach but fallback to name-based matching against Open Food Facts data.
- **UI Integration**: Surface nutrition/health data on product pages without disrupting the native site UX.
- **Cross-browser Support**: Ensure the adapter works via the WXT build pipeline (Chrome, Firefox, Edge).
- **Code Quality**: Follow the core repo's TypeScript, ESLint, and Prettier conventions.

## Feature Work Delivered

### <b>Walmart Store Adapter</b>

The adapter targets Walmart.com product pages and hooks into the site's client-side navigation so it keeps working as users move between products without a full page reload, rather than only firing on initial load. It pulls product identifiers (barcode where available, falling back to product name) from the page, matches them against Open Food Facts data, and renders the nutrition and health info into the page via an isolated UI layer so Walmart's own styles don't leak in or get overridden. The trickiest part was handling Walmart's single-page-app routing cleanly: making sure stale requests from a page the user has already navigated away from don't render onto the wrong product.

### <b>FDC (USDA) Data Import — Ongoing</b>

Lots of data has become stale over time in the Open Food Facts database for American products so I volunteered to work on importing USDA FoodData Central data into Open Food Facts. This is still in progress, but hopefully it will be done soon and it will greatly help our extension and the OFF database overall.

## Key Takeaways

- **Real-world extension architecture**: Learned to build within a shared core/adapter pattern meant to scale across many countries and stores.
- **Contributor-first approach**: This internship grew directly out of a self-initiated proposal and prior unpaid contributions to the Open Food Facts ecosystem.
- **Technical growth**: I got to learn about browser technologies and how extensions work specifically and how they differ from normal webapps.

### Future Work

- Add support for newer stores beyond Walmart.
- Build out more customisability for users in how the extension surfaces data.
- Continue and complete the FDC (USDA) data import work.

# Special Thanks to Mentors and Community

- Louis Bastarache — mentor on the e-store-extension work
- Sam K Thampan — collaborator on the core template
- Stephane — for the opportunity to help with the FDC import

I'm very grateful that I got this opportunity to work in this wonderful organisation with wonderful people. I look forward to keeping in touch with my peers and mentors and to keep making contributions across Open Food Facts.
