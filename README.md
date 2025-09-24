# Personal Portfolio & Resume – Built with Remix + React Router

This repository hosts my personal portfolio and resume website. While it’s “just” a personal site, it’s intentionally built with a modern, production-ready stack that mirrors what one would find in a more mature corporate website. This project is both a portfolio of my work and a prototype for how to build a performant, scalable site with the latest tools.

## Highlights

- 🗂 **Backed by a CMS (Contentful)** for easy and fast content/media management.
- ⚡️ **Built on Remix** with React Router, leveraging modern server-side rendering and data loading patterns.
- 🎨 **Styled with Tailwind CSS** for rapid, consistent UI development.
- ❌ **Static analysis/linting** with ESLint to enforce consistency and maintainability.
- 🏭 **Automated CI/CD** backed by Github actions, site deploys in ~10 seconds.
- 🟢 **Perfect Lighthouse score** – 100 across performance, accessibility, best practices, and SEO.

## Getting Started

### Installation

Clone this repository then install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Previewing the Production Build

Preview the production build locally:

```bash
npm run preview
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

Deployment is done using the Wrangler CLI.

To build and deploy directly to production:

```sh
npm run deploy
```

To deploy a preview URL:

```sh
npx wrangler versions upload
```

You can then promote a version to production after verification or roll it out progressively.

```sh
npx wrangler versions deploy
```

---

Built with ❤️ using React Router.
