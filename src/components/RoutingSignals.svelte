<script lang="ts">
	import { onMount } from 'svelte';
	import type { Lang } from '$lib/content';

	let { lang }: { lang: Lang } = $props();
	let overlay: SVGSVGElement;
	let playing = $state(false);

	// These are the React Flow viewport transforms from the two routing screenshots.
	const viewports = {
		en: 'translate(352.228 191) scale(.3816)',
		ru: 'translate(364.324 229) scale(.3528)'
	};
	const routes = [
		{
			path: 'M325.5 332.25 C420 332.25 420 265.5 514.5 265.5',
			color: '#ffc17d',
			start: 0.1,
			duration: 0.75
		},
		{
			path: 'M325.5 724.75 C420 724.75 420 465.5 514.5 465.5',
			color: '#81f0c0',
			start: 0.45,
			duration: 0.85
		},
		{
			path: 'M325.5 1064.75 C420 1064.75 420 65.5 514.5 65.5',
			color: '#81f0c0',
			start: 0.85,
			duration: 1.5
		}
	];

	onMount(() => {
		if (
			matchMedia('(prefers-reduced-motion: reduce)').matches ||
			!('IntersectionObserver' in window)
		)
			return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				playing = true;
				observer.disconnect();
			},
			{ threshold: 0.45 }
		);
		observer.observe(overlay);
		return () => observer.disconnect();
	});
</script>

<svg
	bind:this={overlay}
	class="routing-signals"
	viewBox="0 0 1120 720"
	aria-hidden="true"
	focusable="false"
>
	{#if playing}
		<g transform={viewports[lang]}>
			{#each routes as { path, color, start, duration } (path)}
				<path
					d={path}
					pathLength="1"
					stroke={color}
					style:--start={start + 's'}
					style:--duration={duration + 's'}
				/>
				<circle
					r="9"
					fill={color}
					style:--route={'path("' + path + '")'}
					style:--start={start + 's'}
					style:--duration={duration + 's'}
				/>
			{/each}
		</g>
	{/if}
</svg>

<style>
	.routing-signals {
		position: absolute;
		inset: 0;
		z-index: 2;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
	path {
		fill: none;
		stroke-width: 5;
		stroke-dasharray: 0.14 1;
		stroke-dashoffset: 0.14;
		stroke-linecap: round;
		opacity: 0;
		animation: route-trail var(--duration) linear var(--start);
	}
	circle {
		offset-path: var(--route);
		opacity: 0;
		animation: route-packet var(--duration) linear var(--start);
	}
	@keyframes route-trail {
		12%,
		85% {
			opacity: 0.85;
		}
		to {
			stroke-dashoffset: -1;
		}
	}
	@keyframes route-packet {
		12%,
		80% {
			opacity: 1;
		}
		to {
			offset-distance: 100%;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.routing-signals {
			display: none;
		}
	}
</style>
