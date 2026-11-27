<script lang="ts">
	import { onMount } from 'svelte';
	import { Check, Palette } from 'lucide-svelte';
	import type { Lang } from '$lib/content';
	import { applyTheme, DEFAULT_THEME, savedTheme, THEMES, type Theme } from '$lib/themes';

	let { lang, label }: { lang: Lang; label: string } = $props();
	let root: HTMLElement;
	let trigger: HTMLButtonElement;
	let open = $state(false);
	let selected = $state(DEFAULT_THEME);

	const groups = [
		{ id: 'site', en: 'Site default', ru: 'Тема сайта' },
		{ id: 'dark', en: 'Dark', ru: 'Тёмные' },
		{ id: 'light', en: 'Light', ru: 'Светлые' },
		{ id: 'palette', en: 'Palettes', ru: 'Палитры' }
	] as const;

	onMount(() => {
		const theme = savedTheme();
		selected = theme.id;
		applyTheme(theme);
	});

	function close() {
		open = false;
		trigger.focus();
	}

	function pick(theme: Theme) {
		selected = theme.id;
		applyTheme(theme);
		close();
	}
</script>

<svelte:window
	onpointerdown={(event) => {
		if (open && event.target instanceof Node && !root.contains(event.target)) open = false;
	}}
	onkeydown={(event) => {
		if (open && event.key === 'Escape') close();
	}}
/>

<div class="theme-picker" bind:this={root}>
	<button
		class="icon-button"
		type="button"
		bind:this={trigger}
		onclick={() => (open = !open)}
		aria-label={label}
		title={label}
		aria-expanded={open}
		aria-controls={open ? 'site-theme-options' : undefined}
	>
		<Palette size={19} aria-hidden="true" />
	</button>

	{#if open}
		<div class="theme-options" id="site-theme-options">
			{#each groups as group (group.id)}
				<p>{group[lang]}</p>
				<ul>
					{#each THEMES.filter((theme) => theme.group === group.id) as theme (theme.id)}
						<li>
							<button
								type="button"
								onclick={() => pick(theme)}
								aria-pressed={selected === theme.id}
							>
								<span
									class="swatch"
									style:--swatch-bg={theme.bg}
									style:--swatch-surface={theme.surface}
									style:--swatch-accent={theme.accent}
									aria-hidden="true"
								></span>
								<span>{theme.name[lang]}</span>
								{#if selected === theme.id}<Check size={15} aria-hidden="true" />{/if}
							</button>
						</li>
					{/each}
				</ul>
			{/each}
		</div>
	{/if}
</div>

<style>
	.theme-picker {
		position: relative;
	}
	.theme-options {
		position: absolute;
		z-index: 5;
		inset-inline-end: 0;
		top: calc(100% + 0.65rem);
		width: 15rem;
		max-height: min(68vh, 30rem);
		overflow: auto;
		padding: 0.4rem;
		border: 1px solid var(--line-strong);
		border-radius: 1rem;
		background: var(--panel);
		box-shadow: 0 1rem 2.5rem #0004;
	}
	p {
		margin: 0;
		padding: 0.65rem 0.55rem 0.35rem;
		color: var(--muted);
		font-size: 0.8125rem;
	}
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	li button {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.65rem;
		width: 100%;
		padding: 0.4rem 0.55rem;
		border-radius: 0.5rem;
		text-align: start;
		font-size: 0.9rem;
	}
	li button:hover,
	li button[aria-pressed='true'] {
		background: var(--wash);
	}
	.swatch {
		display: grid;
		place-items: center;
		width: 1.45rem;
		aspect-ratio: 1;
		border-radius: 50%;
		border: 1px solid var(--line-strong);
		background: linear-gradient(135deg, var(--swatch-bg) 50%, var(--swatch-surface) 50%);
	}
	.swatch::after {
		content: '';
		width: 0.55rem;
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--swatch-accent);
	}
</style>
