# NuggetVPN Website

<div align="center">

![NuggetVPN Website Banner](static/icon.png) 

**The official landing page for the NuggetVPN desktop client.**

Faster than light, private by design. Built with modern web technologies.

[**Visit Website**](https://nuggetvpn.github.io) | [**Main Application Repo**](https://github.com/Rigby-Foundation/nuggetvpn)

</div>

---

## About

This repository hosts the source code for the NuggetVPN landing page. It is designed to be extremely fast, SEO-friendly, and visually consistent with the desktop application's "cyberpunk-reactor" aesthetic.

The site serves as the primary hub for downloading the client across Windows, macOS, and Linux, and highlights key features of the software.

## Tech Stack

We use the bleeding edge of web development to ensure top performance and developer experience.

* **Framework:** [SvelteKit](https://kit.svelte.dev/) (SSR + SSG)
* **UI Library:** [Svelte 5](https://svelte.dev/) (Runes powered)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Language:** TypeScript
* **Icons:** [Lucide Svelte](https://lucide.dev/), [Svelte Awesome](https://github.com/RobBrazier/svelte-awesome)
* **Fonts:** Space Grotesk (Headings) & Plus Jakarta Sans (Body)

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