<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowDown, Download, Github } from 'lucide-svelte';

	import CopyCommand from './CopyCommand.svelte';
	import PressDemo from './PressDemo.svelte';
	import { CONTENT, PATHS, SITE, type Lang } from '$lib/content';
	import { startMotion } from '$lib/motion';
	import {
		detectSystem,
		formatSize,
		INSTALL_PS,
		INSTALL_SH,
		latestRelease,
		RELEASES_URL,
		REPO_URL,
		type FileId,
		type Release,
		type System
	} from '$lib/release';

	let { lang }: { lang: Lang } = $props();
	let c = $derived(CONTENT[lang]);
	let other = $derived<Lang>(lang === 'en' ? 'ru' : 'en');

	let on = $state(false);
	let release = $state<Release | null>(null);
	let system = $state<System>('other');

	let root: HTMLElement;
	onMount(() => {
		system = detectSystem();
		latestRelease().then((r) => (release = r));
		let stop = () => {};
		startMotion(root).then((cleanup) => (stop = cleanup));
		return () => stop();
	});

	const fileUrl = (id: FileId) => release?.files[id]?.url ?? RELEASES_URL;
	const fileSize = (id: FileId) => {
		const file = release?.files[id];
		return file ? formatSize(file.size) : '';
	};

	// The first button: the visitor's own system.
	const primaryFile: Record<System, FileId | null> = {
		windows: 'windows-installer',
		macos: 'macos-dmg',
		linux: 'linux-appimage',
		android: 'android-apk',
		other: null
	};
	let heroFile = $derived(primaryFile[system]);
	let heroCommand = $derived(system === 'windows' ? INSTALL_PS : INSTALL_SH);

	const protocols = ['VLESS + Reality', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2', 'TUIC', 'WireGuard', 'SOCKS', 'SSH'];
	const showcaseImages = [
		{ id: 'servers', file: 'servers.webp', width: 2360, height: 1520 },
		{ id: 'routing', file: 'routing.webp', width: 2720, height: 1720 },
		{ id: 'plan', file: 'home-announce.webp', width: 2360, height: 1520 }
	];
	const themeImages = ['home-paper.webp', 'home-inset.webp', 'welcome-look.webp'];

	// What search engines read: the app, and the questions with their answers.
	let structured = $derived(
		JSON.stringify([
			{
				'@context': 'https://schema.org',
				'@type': 'SoftwareApplication',
				name: 'NuggetVPN',
				alternateName: 'Nugget',
				description: c.description,
				url: SITE + PATHS[lang],
				downloadUrl: RELEASES_URL,
				applicationCategory: 'SecurityApplication',
				operatingSystem: 'Windows, macOS, Linux, Android, iOS',
				inLanguage: lang,
				isAccessibleForFree: true,
				license: 'https://www.gnu.org/licenses/gpl-3.0.html',
				offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
				screenshot: `${SITE}${c.screens}/home-connected.webp`,
				author: { '@type': 'Organization', name: 'Rigby Foundation', url: REPO_URL }
			},
			{
				'@context': 'https://schema.org',
				'@type': 'FAQPage',
				mainEntity: c.faq.map((item) => ({
					'@type': 'Question',
					name: item.q,
					acceptedAnswer: { '@type': 'Answer', text: item.a }
				}))
			}
		]).replace(/</g, '\\u003c')
	);
</script>

<svelte:head>
	<title>{c.title}</title>
	<meta name="description" content={c.description} />
	<link rel="canonical" href={SITE + PATHS[lang]} />
	<link rel="alternate" hreflang="en" href={SITE + PATHS.en} />
	<link rel="alternate" hreflang="ru" href={SITE + PATHS.ru} />
	<link rel="alternate" hreflang="x-default" href={SITE + PATHS.en} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="NuggetVPN" />
	<meta property="og:url" content={SITE + PATHS[lang]} />
	<meta property="og:title" content={c.title} />
	<meta property="og:description" content={c.description} />
	<meta property="og:locale" content={c.ogLocale} />
	<meta property="og:locale:alternate" content={CONTENT[other].ogLocale} />
	<meta property="og:image" content="{SITE}/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={c.title} />
	<meta name="twitter:description" content={c.description} />
	<meta name="twitter:image" content="{SITE}/og.png" />

	<link rel="preload" as="image" href="{c.screens}/home-idle.webp" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${structured}</script>`}
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-gold focus:px-3 focus:py-2 focus:text-fryer"
>
	{c.skip}
</a>

<div class="relative min-h-screen overflow-x-clip" bind:this={root}>
	<!-- The fryer's warmth, which rises when the demo connects. -->
	<div data-m="glow" class="pointer-events-none absolute inset-x-0 top-0 h-[1100px]" aria-hidden="true">
		<div
			class="h-full w-full transition-opacity duration-700"
			style="opacity:{on ? 1 : 0.45}; background: radial-gradient(60% 55% at 70% 35%, rgba(242,168,59,0.22), transparent 70%)"
		></div>
	</div>

	<header class="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
		<a href={PATHS[lang]} class="wordmark text-xl" aria-label={c.nav.home}>Nugget<span class="dot">.</span></a>
		<nav aria-label="Main" class="flex items-center gap-1 text-sm text-ash sm:gap-2">
			<a href="#screens" class="hidden rounded-lg px-3 py-2 transition-colors hover:text-batter md:block">{c.nav.screens}</a>
			<a href="#details" class="hidden rounded-lg px-3 py-2 transition-colors hover:text-batter md:block">{c.nav.details}</a>
			<a href="#download" class="rounded-lg px-3 py-2 transition-colors hover:text-batter">{c.nav.download}</a>
			<a href={PATHS[other]} hreflang={other} lang={other} class="rounded-lg px-3 py-2 transition-colors hover:text-batter">
				{c.nav.other}
			</a>
			<a href={REPO_URL} class="flex items-center gap-1.5 rounded-lg px-3 py-2 transition-colors hover:text-batter" aria-label="GitHub">
				<Github size={16} aria-hidden="true" /> <span class="hidden sm:inline">GitHub</span>
			</a>
		</nav>
	</header>

	<main id="main" class="relative z-10">
		<!-- Hero -->
		<section
			class="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 pt-8 pb-24 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:pt-16"
		>
			<div class="min-w-0">
				<h1 class="font-display text-[2.4rem] leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl xl:text-[3.5rem]">
					{#each c.hero.title.split(' ') as word, i (i)}<span class="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
							><span data-m="hero-word" class="inline-block">{word}{#if i === c.hero.title.split(' ').length - 1}<span
										class="text-gold">.</span
									>{/if}</span
							></span
						>{' '}{/each}
				</h1>
				<p data-m="hero-item" class="mt-6 max-w-md text-lg leading-relaxed text-ash">{c.hero.lead}</p>

				<div data-m="hero-item" class="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
					<a
						href={heroFile ? fileUrl(heroFile) : '#download'}
						class="inline-flex items-center gap-2.5 rounded-full bg-gold px-6 py-3.5 font-semibold text-fryer shadow-[0_10px_40px_-10px_rgba(242,168,59,0.7)] transition-colors hover:bg-gold-hi"
					>
						<Download size={18} aria-hidden="true" />
						{c.hero.download[system]}
					</a>
					<a href="#download" class="inline-flex items-center gap-1.5 text-sm text-ash transition-colors hover:text-batter">
						{c.hero.platforms} <ArrowDown size={14} aria-hidden="true" />
					</a>
				</div>

				{#if system !== 'android' && system !== 'other'}
					<div data-m="hero-item" class="mt-6 max-w-md text-ash">
						<p class="mb-2 text-xs">{c.hero.terminal}</p>
						<CopyCommand command={heroCommand} strings={c.copy} />
					</div>
				{/if}
			</div>

			<div data-m="hero-demo" class="min-w-0">
				<PressDemo bind:on screens={c.screens} strings={c.demo} />
			</div>
		</section>

		<!-- Protocols -->
		<section aria-label={c.protocolsLead} class="border-y border-seam bg-crust/60">
			<div class="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-6 sm:px-8">
				<p class="text-sm text-ash">{c.protocolsLead}</p>
				<ul class="flex flex-wrap gap-2">
					{#each protocols as protocol (protocol)}
						<li data-m="chip" class="rounded-full border border-seam bg-crust-hi px-3 py-1 font-mono text-[11px] text-batter">{protocol}</li>
					{/each}
				</ul>
			</div>
		</section>

		<!-- Screens -->
		<section id="screens" class="mx-auto max-w-6xl scroll-mt-8 px-5 py-24 sm:px-8">
			<h2 class="max-w-2xl font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{c.screensTitle}</h2>
			<p class="mt-4 max-w-xl text-ash">{c.screensLead}</p>

			<div class="mt-16 space-y-24">
				{#each c.showcase as row, i (row.title)}
					{@const image = showcaseImages[i]}
					<article
						data-m="row"
						data-side={i % 2 ? 'right' : 'left'}
						class="grid grid-cols-[minmax(0,1fr)] items-center gap-10 {i % 2
							? 'lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:[&>figure]:order-2'
							: 'lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]'}"
					>
						<figure data-m="row-fig" class="overflow-hidden rounded-[12px]">
							<img
								data-m="row-img"
								src="{c.screens}/{image.file}"
								alt={row.alt}
								width={image.width}
								height={image.height}
								loading="lazy"
								class="block h-auto w-full rounded-[12px] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
							/>
						</figure>
						<div>
							<h3 data-m="row-text" class="font-display text-2xl leading-snug font-semibold tracking-tight">{row.title}</h3>
							<p data-m="row-text" class="mt-4 leading-relaxed text-ash">{row.text}</p>
							<ul class="mt-6 space-y-2.5 text-sm">
								{#each row.facts as fact (fact)}
									<li data-m="row-text" class="flex gap-3">
										<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true"></span>
										<span>{fact}</span>
									</li>
								{/each}
							</ul>
						</div>
					</article>
				{/each}
			</div>

			<!-- Looks -->
			<div class="mt-28">
				<h3 class="font-display text-2xl leading-snug font-semibold tracking-tight">{c.looks.title}</h3>
				<p class="mt-4 max-w-2xl leading-relaxed text-ash">{c.looks.text}</p>
				<div class="mt-10 grid gap-5 md:grid-cols-3">
					{#each themeImages as file, i (file)}
						<figure data-m="theme">
							<img
								src="{c.screens}/{file}"
								alt={c.looks.alts[i]}
								width="2360"
								height="1520"
								loading="lazy"
								class="block h-auto w-full rounded-[10px] ring-1 ring-white/10"
							/>
							<figcaption class="mt-3 text-sm text-ash">{c.looks.labels[i]}</figcaption>
						</figure>
					{/each}
				</div>
			</div>
		</section>

		<!-- Details -->
		<section id="details" class="scroll-mt-8 border-t border-seam bg-crust/40">
			<div class="mx-auto max-w-6xl px-5 py-24 sm:px-8">
				<h2 class="font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{c.detailsTitle}</h2>
				<dl class="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
					{#each c.details as item (item.term)}
						<div data-m="detail" class="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-t border-seam pt-5">
							<dt class="text-sm font-semibold text-gold">{item.term}</dt>
							<dd class="text-sm leading-relaxed text-batter/85">{item.text}</dd>
						</div>
					{/each}
				</dl>
			</div>
		</section>

		<!-- Download: the one gold band -->
		<section id="download" class="scroll-mt-0 bg-gold text-fryer">
			<div class="mx-auto max-w-6xl px-5 py-24 sm:px-8">
				<div class="flex flex-wrap items-end justify-between gap-6">
					<h2 class="wordmark text-5xl sm:text-7xl" aria-label="{c.download.title}.">
						<span class="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom" aria-hidden="true"
							><!-- Letters grouped by word, so a narrow screen breaks the line between words, not inside one. -->{#each `${c.download.title}.`.split(' ') as word, w (w)}{#if w > 0}{' '}{/if}<span class="inline-block whitespace-nowrap"
									>{#each [...word] as letter, i (i)}<span data-m="dl-letter" class="inline-block">{letter}</span>{/each}</span
								>{/each}</span
						>
					</h2>
					<p class="max-w-sm text-sm leading-relaxed">
						{#if release?.version}{c.download.version(release.version)}{' '}{/if}{c.download.free}
						<a href={RELEASES_URL} class="font-semibold underline underline-offset-4">{c.download.all}</a>
					</p>
				</div>

				<div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
					<!-- A system whose files the latest release lacks is left out. -->
					{#each c.download.groups.filter((group) => !release || group.files.some((file) => release?.files[file.id])) as group (group.system)}
						<div data-m="dl-card" class="rounded-2xl bg-fryer/[0.06] p-5 ring-1 ring-fryer/15">
							<p class="font-display text-lg font-semibold">{group.system}</p>
							<p class="text-xs opacity-70">{group.note}</p>
							<ul class="mt-5 space-y-1.5">
								{#each group.files.filter((file) => !release || release.files[file.id]) as file (file.id)}
									<li>
										<a
											href={fileUrl(file.id)}
											class="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-fryer hover:text-gold"
										>
											<span>{file.label}</span>
											<span class="font-mono text-[10px] opacity-70">{fileSize(file.id)}</span>
										</a>
									</li>
								{/each}
							</ul>
							{#if group.warning}
								<p class="mt-4 flex gap-2 rounded-lg bg-fryer/10 p-3 text-xs leading-relaxed">
									<span aria-hidden="true" class="font-semibold">!</span>
									<span>{group.warning}</span>
								</p>
							{/if}
						</div>
					{/each}
				</div>

				<div class="mt-10 grid gap-4 lg:grid-cols-2">
					<div class="min-w-0">
						<p class="mb-2 text-sm font-semibold">{c.download.ps}</p>
						<CopyCommand command={INSTALL_PS} strings={c.copy} />
					</div>
					<div class="min-w-0">
						<p class="mb-2 text-sm font-semibold">{c.download.sh}</p>
						<CopyCommand command={INSTALL_SH} strings={c.copy} />
					</div>
				</div>
				<p class="mt-4 max-w-2xl text-xs leading-relaxed opacity-75">{c.download.scripts}</p>
			</div>
		</section>

		<!-- FAQ -->
		<section aria-labelledby="faq-title" class="mx-auto max-w-3xl px-5 py-24 sm:px-8">
			<h2 id="faq-title" class="font-display text-3xl font-semibold tracking-tight">{c.faqTitle}</h2>
			<div class="mt-10 divide-y divide-seam border-y border-seam">
				{#each c.faq as item (item.q)}
					<details data-m="faq" class="group py-5">
						<summary class="flex cursor-pointer list-none items-center justify-between gap-6 font-medium [&::-webkit-details-marker]:hidden">
							{item.q}
							<span class="font-mono text-gold transition-transform group-open:rotate-45" aria-hidden="true">+</span>
						</summary>
						<p class="mt-3 leading-relaxed text-ash">{item.a}</p>
					</details>
				{/each}
			</div>
		</section>
	</main>

	<footer class="relative z-10 border-t border-seam">
		<div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-ash sm:px-8">
			<p><span class="wordmark text-batter">Nugget<span class="dot">.</span></span> {c.footer.by}</p>
			<a href={REPO_URL} class="flex items-center gap-1.5 transition-colors hover:text-batter">
				<Github size={16} aria-hidden="true" />
				{c.footer.source}
			</a>
		</div>
	</footer>
</div>
