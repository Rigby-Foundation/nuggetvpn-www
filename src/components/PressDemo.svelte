<script lang="ts">
	/**
	 * The hero: the app's home screen, whose connect button can be pressed.
	 * Two real screenshots, not connected and connected, crossfade; the page's
	 * glow follows through `on`.
	 */
	interface Strings {
		altOff: string;
		altOn: string;
		connect: string;
		disconnect: string;
		captionOff: string;
		captionOn: string;
	}
	let { on = $bindable(false), screens, strings }: { on?: boolean; screens: string; strings: Strings } = $props();

	// Where the connect button is in each screenshot, as fractions of it.
	const spot = {
		off: { x: 50, y: 40.6, d: 19 },
		on: { x: 50, y: 25.3, d: 19 }
	};
	let where = $derived(on ? spot.on : spot.off);
</script>

<figure class="relative">
	<div
		class="relative overflow-hidden rounded-[14px] shadow-[0_40px_120px_-40px_rgba(242,168,59,0.35)] ring-1 ring-white/10"
	>
		<img
			src="{screens}/home-idle.webp"
			alt={strings.altOff}
			width="2360"
			height="1520"
			class="block h-auto w-full"
			fetchpriority="high"
		/>
		<img
			src="{screens}/home-connected.webp"
			alt={strings.altOn}
			width="2360"
			height="1520"
			aria-hidden={!on}
			class="absolute inset-0 block h-auto w-full transition-opacity duration-500 ease-out {on
				? 'opacity-100'
				: 'opacity-0'}"
		/>
		<button
			type="button"
			aria-pressed={on}
			aria-label={on ? strings.disconnect : strings.connect}
			onclick={() => (on = !on)}
			class="press absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full transition-[top] duration-500 ease-out"
			style="left:{where.x}%; top:{where.y}%; width:{where.d}%; aspect-ratio:1"
		>
			{#if !on}
				<span class="ring-pulse pointer-events-none absolute inset-0 rounded-full" aria-hidden="true"></span>
			{/if}
		</button>
	</div>
	<figcaption class="mt-4 text-center text-sm text-ash">
		{on ? strings.captionOn : strings.captionOff}
	</figcaption>
</figure>

<style>
	.press:focus-visible {
		border-radius: 9999px;
		outline-offset: 4px;
	}
	/* A slow halo that says "this is a button", until it has been pressed. */
	.ring-pulse {
		box-shadow: 0 0 0 0 rgba(242, 168, 59, 0.45);
		animation: pulse 2.4s ease-out infinite;
	}
	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(242, 168, 59, 0.45);
		}
		70% {
			box-shadow: 0 0 0 22px rgba(242, 168, 59, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(242, 168, 59, 0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.ring-pulse {
			animation: none;
			box-shadow: 0 0 0 3px rgba(242, 168, 59, 0.45);
		}
	}
</style>
