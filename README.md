# NuggetVPN Website

<div align="center">

![NuggetVPN Website Banner](static/icon.png) 

**The official landing page for the NuggetVPN desktop client.**

A free VPN client for the subscription you already have.

[**Visit Website**](https://nugget.rigby-foundation.org/) | [**Main Application Repo**](https://github.com/Rigby-Foundation/nuggetvpn)

</div>

---

## About

This repository hosts the source code for the NuggetVPN landing page. It is a single static page that shows the app as it is (every screenshot is the real app) and offers the right download for the visitor's system.

Downloads are read from the latest GitHub release in the browser, so a new release needs no change here. Until GitHub answers, every link points at the releases page.

## Tech Stack

We use the bleeding edge of web development to ensure top performance and developer experience.

* **Framework:** [SvelteKit](https://kit.svelte.dev/) (SSR + SSG)
* **UI Library:** [Svelte 5](https://svelte.dev/) (Runes powered)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Language:** TypeScript
* **Icons:** [Lucide Svelte](https://lucide.dev/)
* **Fonts:** Unbounded (the wordmark and headings, as in the app), Onest (body), Martian Mono (commands)

## Getting Started

Follow these steps to run the website locally for development.

### Prerequisites

* **Node.js**: LTS version recommended (v18+).
* **Bun**: LTS version recommended (v1.1.40+).

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/Rigby-Foundation/nuggetvpn-www.git](https://github.com/Rigby-Foundation/nuggetvpn-www.git)
    cd nuggetvpn-www
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    # or if you use pnpm:
    # pnpm install
    ```

3.  **Start the development server:**

    ```bash
    bun run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

## Project Structure

A standard SvelteKit project layout with a focus on organization.