<script lang="ts">
	import { Check, Copy } from 'lucide-svelte';

	let {
		command,
		strings = { copy: 'Copy', copied: 'Copied', label: 'Copy the command' }
	}: { command: string; strings?: { copy: string; copied: string; label: string } } = $props();
	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(command);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			// The command stays selectable by hand.
		}
	}
</script>

<div class="group flex min-w-0 items-stretch overflow-hidden rounded-xl border border-current/15 bg-black/20">
	<!-- Scrolls sideways without a scrollbar: Windows draws one permanently,
	     a grey bar across the gold. The fade says there is more; Copy takes all of it. -->
	<code class="no-scrollbar min-w-0 flex-1 overflow-x-auto px-3 py-2.5 font-mono text-[12px] leading-relaxed whitespace-nowrap select-all [mask-image:linear-gradient(to_right,black_calc(100%-2rem),transparent)]">
		{command}
	</code>
	<button
		type="button"
		onclick={copy}
		aria-label={copied ? strings.copied : strings.label}
		class="flex shrink-0 cursor-pointer items-center gap-1.5 border-s border-current/15 px-3 font-mono text-[11px] transition-colors hover:bg-white/10"
	>
		{#if copied}
			<Check size={14} aria-hidden="true" /> {strings.copied}
		{:else}
			<Copy size={14} aria-hidden="true" /> {strings.copy}
		{/if}
	</button>
</div>

<style>
	.no-scrollbar {
		scrollbar-width: none;
	}
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
