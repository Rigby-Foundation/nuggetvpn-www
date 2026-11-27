# Kage website

The English and Russian landing pages for Kage, a free, open-source VPN and proxy client.

[Website](https://nugget.rigby.lol/) · [Kage source and documentation](https://github.com/Rigby-Foundation/Kage) · [Releases](https://github.com/Rigby-Foundation/Kage/releases)

## Development

```sh
bun install --frozen-lockfile
bun run dev
```

Run `bun run check` for Svelte and TypeScript checks. Run `bun run build` to generate the static site in `build/`. GitHub Actions publishes that directory to GitHub Pages from `main`.

English and Russian copy live in `src/lib/content.ts`. The screenshots in `static/screens/` show the Kage 3.0.1 frontend with sample profiles and routing rules. The site reads download links from Kage’s latest GitHub release and uses the release page as a fallback.

The Kage application is distributed under the MPL-2.0. See [LICENSE](LICENSE) for the website source license.
