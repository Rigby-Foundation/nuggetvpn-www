<script lang="ts">
	import { onMount } from 'svelte';
	import { Check, Palette } from 'lucide-svelte';

	import type { Lang } from '$lib/content';
	import { applyTheme, savedThemeId, THEMES, type Theme } from '$lib/themes';

	/** The app's themes, worn by the page. */
	interface Strings {
		button: string;
		site: string;
		light: string;
		dark: string;
		palette: string;
	}
	let { lang, strings }: { lang: Lang; strings: Strings } = $props();

	let open = $state(false);
	let current = $state('nugget');
	let root: HTMLElement;

	onMount(() => {
		current = savedThemeId();
		const away = (e: PointerEvent) => {
			if (open && !root.contains(e.target as Node)) open = false;
		};
		const escape = (e: KeyboardEvent) => {
			if (open && e.key === 'Escape') open = false;
		};
		document.addEventListener('pointerdown', away);
		document.addEventListener('keydown', escape);
		return () => {
			document.removeEventListener('pointerdown', away);
			document.removeEventListener('keydown', escape);
		};
	});

	function pick(theme: Theme) {
		current = theme.id;
		applyTheme(theme);
	}

	const groups = ['site', 'dark', 'light', 'palette'] as const;
</script>

<div class="relative" bind:this={root}>
	<button
		type="button"
		onclick={() => (open = !open)}
		aria-expanded={open}
		aria-haspopup="true"
		class="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 transition-colors hover:text-batter"
	>
		<Palette size={16} aria-hidden="true" /> <span class="hidden sm:inline">{strings.button}</span>
	</button>

	{#if open}
		<div
			class="absolute top-full right-0 z-50 mt-2 max-h-[70vh] w-64 overflow-y-auto rounded-2xl bg-crust p-2 text-batter shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-seam"
		>
			{#each groups as group (group)}
				<p class="px-2 pt-2 pb-1 text-[11px] font-semibold tracking-wide text-ash uppercase">{strings[group]}</p>
				<ul>
					{#each THEMES.filter((t) => t.group === group) as theme (theme.id)}
						<li>
							<button
								type="button"
								onclick={() => pick(theme)}
								aria-pressed={current === theme.id}
								class="flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-crust-hi"
							>
								<!-- The page colour and surface, with the accent as a dot, like the app's picker. -->
								<span
									class="relative h-6 w-6 shrink-0 rounded-full ring-1 ring-white/15"
									style="background: linear-gradient(135deg, {theme.bg} 50%, {theme.surface} 50%)"
									aria-hidden="true"
								>
									<span class="absolute inset-[7px] rounded-full" style="background:{theme.accent}"></span>
								</span>
								<span class="flex-1">{theme.name[lang]}</span>
								{#if current === theme.id}<Check size={14} class="text-gold" aria-hidden="true" />{/if}
							</button>
						</li>
					{/each}
				</ul>
			{/each}
		</div>
	{/if}
</div>
