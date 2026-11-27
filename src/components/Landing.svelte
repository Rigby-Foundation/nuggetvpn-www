<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Apple,
		Bot,
		ChevronDown,
		CircleHelp,
		Download,
		GitBranch,
		Github,
		Layers,
		Link2,
		Laptop,
		Route,
		ShieldCheck,
		SlidersHorizontal,
		Smartphone,
		Terminal
	} from 'lucide-svelte';
	import {
		CONTENT,
		PATHS,
		PLATFORMS,
		PLATFORM_NAMES,
		SCREENS,
		SITE,
		type Lang,
		type Screen
	} from '$lib/content';
	import {
		detectSystem,
		DOCS_URL,
		formatSize,
		INSTALL_PS,
		INSTALL_SH,
		latestRelease,
		LICENSE_URL,
		PLATFORM_FILES,
		RELEASES_URL,
		REPO_URL,
		WINDOWS_EXTRAS,
		type FileId,
		type Release,
		type System
	} from '$lib/release';
	import CopyCommand from './CopyCommand.svelte';
	import RoutingSignals from './RoutingSignals.svelte';
	import ThemePicker from './ThemePicker.svelte';

	let { lang }: { lang: Lang } = $props();
	const c = $derived(CONTENT[lang]);
	const other = $derived(lang === 'en' ? 'ru' : 'en');
	const screensDir = $derived(lang === 'en' ? '/screens' : '/screens/ru');
	const canonical = $derived(SITE + PATHS[lang]);
	const socialImage = $derived(SITE + (lang === 'en' ? '/og.png' : '/og-ru.png'));
	const structure = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'SoftwareApplication',
			name: 'Kage',
			alternateName: 'NuggetVPN',
			description: c.description,
			url: canonical,
			image: socialImage,
			screenshot: SITE + screensDir + '/connected.webp',
			operatingSystem: 'macOS, Windows, Linux, Android, iOS',
			applicationCategory: 'SecurityApplication',
			downloadUrl: RELEASES_URL,
			license: LICENSE_URL,
			offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }
		}).replaceAll('<', '\\u003c')
	);

	const screenIcons = { routing: GitBranch, servers: Layers, appearance: SlidersHorizontal };
	const platformIcons = {
		macos: Apple,
		windows: Laptop,
		linux: Terminal,
		android: Bot,
		ios: Smartphone
	};
	const featureIcons = [Link2, ShieldCheck, Layers];

	let connected = $state(true);
	let screen: Screen = $state('routing');
	let routingPlay = $state(0);
	let platform = $state<System>('macos');
	let release: Release | null = $state(null);

	const preview = $derived(c.preview.screens[screen]);
	const command = $derived(
		platform === 'windows'
			? INSTALL_PS
			: platform === 'macos' || platform === 'linux'
				? INSTALL_SH
				: undefined
	);

	function selectScreen(next: Screen) {
		screen = next;
		if (next === 'routing') routingPlay += 1;
	}

	onMount(() => {
		document.documentElement.lang = lang;
		platform = detectSystem(navigator) ?? 'macos';
		void latestRelease().then((latest) => (release = latest));
	});
</script>

<svelte:head>
	<title>{c.title}</title>
	<meta name="description" content={c.description} />
	<link rel="canonical" href={canonical} />
	<link rel="alternate" hreflang="en" href={SITE + PATHS.en} />
	<link rel="alternate" hreflang="ru" href={SITE + PATHS.ru} />
	<link rel="alternate" hreflang="x-default" href={SITE + PATHS.en} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Kage" />
	<meta property="og:title" content={c.title} />
	<meta property="og:description" content={c.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content={lang === 'en' ? 'en_US' : 'ru_RU'} />
	<meta property="og:locale:alternate" content={lang === 'en' ? 'ru_RU' : 'en_US'} />
	<meta property="og:image" content={socialImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={c.hero.connectedAlt} />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="preload" as="image" href={screensDir + '/connected.webp'} />
	{@html `<script type="application/ld+json">${structure}</scr` + 'ipt>'}
</svelte:head>

<a class="skip-link" href="#main">{c.skip}</a>

<header class="site-header">
	<div class="wrap nav-inner">
		<a class="brand" href={PATHS[lang]} aria-label={c.nav.home}>
			<img src="/icon.png" alt="" width="36" height="36" />
			<span class="wordmark" aria-hidden="true"></span>
		</a>
		<nav class="nav-links" aria-label={c.nav.label}>
			<a class="wide-nav" href="#screens">{c.nav.screens}</a>
			<a class="wide-nav" href="#details">{c.nav.details}</a>
			<a href="#download">{c.nav.download}</a>
		</nav>
		<div class="nav-tools">
			<a
				class="locale-link"
				href={PATHS[other]}
				lang={other}
				hreflang={other}
				title={c.nav.language}
				aria-label={c.nav.language}>{other.toUpperCase()}</a
			>
			<ThemePicker {lang} label={c.nav.theme} />
			<a class="icon-button github-link" href={REPO_URL} aria-label="GitHub" title="GitHub"
				><Github size={19} /></a
			>
		</div>
	</div>
</header>

<main id="main">
	<section class="hero">
		<div class="wrap hero-grid">
			<div class="hero-copy">
				<a href="#migration" class="rename-link"
					><span class="rename-mark" aria-hidden="true"><Route size={16} /></span>{c.hero.rename}</a
				>
				<h1>{c.hero.title}</h1>
				<p class="hero-lead">{c.hero.lead}</p>
				<div class="hero-actions">
					<a class="button primary" href="#download"
						><Download size={19} aria-hidden="true" />{c.download.title}</a
					>
					<a class="button quiet" href="#screens">{c.nav.screens}</a>
				</div>
				<p class="hero-note">{c.hero.supported}</p>
			</div>

			<div class="hero-visual" class:connected>
				{#key connected}
					<div class="hero-traces" aria-hidden="true">
						<span><i></i></span><span><i></i></span><span><i></i></span>
					</div>
				{/key}
				<figure class="hero-frame">
					<figcaption class="frame-bar">
						<span class="frame-brand"
							><img src="/favicon.png" alt="" width="23" height="23" /> Kage</span
						>
						<div class="connection-switch" role="group" aria-label={c.hero.demo}>
							<button type="button" onclick={() => (connected = false)} aria-pressed={!connected}
								>{c.hero.idle}</button
							>
							<button type="button" onclick={() => (connected = true)} aria-pressed={connected}
								><span class="connection-dot" aria-hidden="true"></span>{c.hero.connected}</button
							>
						</div>
					</figcaption>
					<div class="screen-stack connection-screen">
						<img
							class="hero-shot"
							src={screensDir + '/connection.webp'}
							alt={c.hero.idleAlt}
							aria-hidden={connected}
							class:active={!connected}
							width="1120"
							height="720"
							fetchpriority="low"
						/>
						<img
							class="hero-shot"
							src={screensDir + '/connected.webp'}
							alt={c.hero.connectedAlt}
							aria-hidden={!connected}
							class:active={connected}
							width="1120"
							height="720"
							fetchpriority="high"
						/>
						<button
							type="button"
							class="connection-control"
							aria-label={c.hero.toggle}
							aria-pressed={connected}
							onclick={() => (connected = !connected)}
						>
							{#if connected}<span class="connection-wave" aria-hidden="true"></span>{/if}
						</button>
					</div>
				</figure>
			</div>
		</div>
	</section>

	<section class="section preview-section" id="screens">
		<div class="wrap">
			<div class="section-heading">
				<h2>{c.preview.title}</h2>
				<p>{c.preview.lead}</p>
			</div>

			<div class="preview-layout">
				<div class="preview-options" role="group" aria-label={c.preview.title}>
					{#each SCREENS as item (item)}
						{@const Icon = screenIcons[item]}
						<button
							type="button"
							class="preview-option"
							aria-pressed={screen === item}
							onclick={() => selectScreen(item)}
						>
							<span class="option-icon"><Icon size={21} aria-hidden="true" /></span>
							<span>
								<strong>{c.preview.screens[item].label}</strong>
								<span>{c.preview.screens[item].title}</span>
							</span>
						</button>
					{/each}
				</div>

				<figure class="preview-figure">
					<div class="screen-stack">
						{#each SCREENS as item (item)}
							<img
								src={screensDir + '/' + item + '.webp'}
								alt={c.preview.screens[item].alt}
								aria-hidden={screen !== item}
								class:active={screen === item}
								width="1120"
								height="720"
								loading="lazy"
							/>
						{/each}
						{#if screen === 'routing'}
							{#key routingPlay}
								<RoutingSignals {lang} />
							{/key}
						{/if}
					</div>
					<figcaption aria-live="polite">
						<p>{preview.text}</p>
						<div class="preview-meta">
							<small>{c.preview.examples}</small>
							<a href={screensDir + '/' + screen + '.webp'}>{c.preview.fullSize}</a>
						</div>
					</figcaption>
				</figure>
			</div>
		</div>
	</section>

	<section class="section details-section" id="details">
		<div class="wrap">
			<div class="section-heading">
				<h2>{c.details.title}</h2>
				<p>{c.details.intro}</p>
			</div>
			<div class="details-grid">
				{#each c.details.items as feature, index (feature.title)}
					{@const Icon = featureIcons[index]}
					<article>
						<Icon size={23} aria-hidden="true" />
						<h3>{feature.title}</h3>
						<p>{feature.text}</p>
					</article>
				{/each}
			</div>
			<aside id="migration" class="migration">
				<div class="migration-icon"><img src="/icon.png" alt="" width="42" height="42" /></div>
				<div>
					<h3>{c.migration.title}</h3>
					<p>{c.migration.text}</p>
				</div>
			</aside>
		</div>
	</section>

	<section class="section downloads-section" id="download">
		<div class="wrap">
			<div class="section-heading">
				<h2>{c.download.title}</h2>
				<p>{c.download.intro}</p>
			</div>
			<div class="download-panel">
				<div class="platforms" role="group" aria-label={c.download.choose}>
					{#each PLATFORMS as item (item)}
						{@const Icon = platformIcons[item]}
						<button
							type="button"
							aria-pressed={platform === item}
							onclick={() => (platform = item)}
						>
							<Icon size={20} aria-hidden="true" />{PLATFORM_NAMES[item]}
						</button>
					{/each}
				</div>
				<div class="platform-content">
					<div>
						<h3>
							{PLATFORM_NAMES[platform]}
							{#if release}<span class="version">{release.version}</span>{/if}
						</h3>
						<p>{c.download.note[platform]}</p>
					</div>
					<div class="download-files">
						{@render downloadFiles(PLATFORM_FILES[platform])}
						{#if platform === 'windows'}
							<details class="command windows-extras">
								<summary
									>{c.download.windowsExtras}<ChevronDown
										size={16}
										class="chevron"
										aria-hidden="true"
									/></summary
								>
								{@render downloadFiles(WINDOWS_EXTRAS)}
							</details>
						{/if}
					</div>
					{#if command}
						<details class="command">
							<summary
								><Terminal size={17} aria-hidden="true" />{c.download.command}<ChevronDown
									size={16}
									class="chevron"
									aria-hidden="true"
								/></summary
							>
							<CopyCommand {command} strings={c.download.copy} />
						</details>
					{/if}
				</div>
				<a class="release-link" href={RELEASES_URL}
					><Github size={17} aria-hidden="true" />{c.download.release}</a
				>
			</div>
		</div>
	</section>

	<section class="section faq-section" aria-labelledby="faq-title">
		<div class="wrap faq-grid">
			<div class="section-heading">
				<CircleHelp size={25} aria-hidden="true" />
				<h2 id="faq-title">{c.faq.title}</h2>
			</div>
			<div class="questions">
				{#each c.faq.items as item (item.q)}
					<details>
						<summary>{item.q}<ChevronDown size={18} class="chevron" aria-hidden="true" /></summary>
						<p>{item.a}</p>
					</details>
				{/each}
			</div>
		</div>
	</section>
</main>

<footer class="site-footer">
	<div class="wrap footer-inner">
		<div class="footer-brand">
			<a class="brand" href={PATHS[lang]} aria-label={c.nav.home}>
				<img src="/icon.png" alt="" width="36" height="36" />
				<span class="wordmark" aria-hidden="true"></span>
			</a>
			<span>{c.footer.by}</span>
		</div>
		<div class="footer-links">
			<a href={DOCS_URL}>{c.footer.docs}</a>
			<a href={LICENSE_URL}>{c.footer.license}</a>
			<a href={REPO_URL}><Github size={17} aria-hidden="true" />{c.footer.source}</a>
		</div>
	</div>
</footer>

{#snippet downloadFiles(ids: FileId[])}
	<ul class="files" aria-label={c.download.files}>
		{#each ids as id (id)}
			{@const file = release?.files[id]}
			<li>
				<a class="file-link" href={file?.url ?? RELEASES_URL}>
					<Download size={17} aria-hidden="true" />
					<strong>{c.download.label[id]}</strong>
					<small>{file ? formatSize(file.size, lang) : 'GitHub'}</small>
				</a>
			</li>
		{/each}
	</ul>
{/snippet}
