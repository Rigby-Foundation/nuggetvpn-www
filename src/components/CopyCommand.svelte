<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Check, Copy } from 'lucide-svelte';

	let {
		command,
		strings
	}: {
		command: string;
		strings: { copy: string; copied: string; label: string };
	} = $props();
	let copiedCommand = $state('');
	let timer: ReturnType<typeof setTimeout> | undefined;
	let copied = $derived(copiedCommand === command);

	onDestroy(() => clearTimeout(timer));

	async function copy() {
		const text = command;
		try {
			await navigator.clipboard.writeText(text);
			copiedCommand = text;
			clearTimeout(timer);
			timer = setTimeout(() => (copiedCommand = ''), 1600);
		} catch {
			// The command is selectable when the clipboard is unavailable.
		}
	}
</script>

<div class="command-line">
	<code>{command}</code>
	<button type="button" onclick={copy} aria-label={copied ? strings.copied : strings.label}>
		{#if copied}<Check size={15} aria-hidden="true" />{:else}<Copy
				size={15}
				aria-hidden="true"
			/>{/if}
		<span aria-live="polite">{copied ? strings.copied : strings.copy}</span>
	</button>
</div>

<style>
	.command-line {
		display: flex;
		align-items: stretch;
		gap: 0.5rem;
		min-width: 0;
		margin-top: 0.25rem;
		border: 1px solid var(--line);
		border-radius: 0.65rem;
		background: var(--page);
	}
	code {
		min-width: 0;
		flex: 1;
		padding: 0.7rem 0.8rem;
		overflow-wrap: anywhere;
		font:
			0.8rem/1.5 ui-monospace,
			monospace;
	}
	button {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.55rem 0.75rem;
		border-inline-start: 1px solid var(--line);
		font-size: 0.85rem;
	}
	button:hover {
		background: var(--wash);
	}
</style>
