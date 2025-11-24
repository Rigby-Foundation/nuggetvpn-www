<script>
	let { href = undefined, children, class: className = '', onclick = undefined } = $props();
</script>

<button
	class={`cursor-pointer rounded-lg bg-zinc-200 px-4 py-2 text-black ${className}`}
	onclick={() => {
		if (onclick) {
			onclick();
		} else if (href) {
			window.location.href = href;
		}
	}}
>
	{@render children()}
</button>
