<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import { Monitor, Apple, TerminalSquare, Github, ShieldCheck, Zap, Palette } from 'lucide-svelte';
	import Icon from 'svelte-awesome';
	import windows from 'svelte-awesome/icons/windows';
	import apple from 'svelte-awesome/icons/apple';
	import linux from 'svelte-awesome/icons/linux';
	import Button from '../components/Button.svelte';
	import { base } from '$app/paths';

	const releaseLink = 'https://github.com/Rigby-Foundation/nuggetvpn/releases/latest';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const handleMouseMove = (e: MouseEvent) => {
			const { clientX, clientY } = e;
			const x = (clientX / window.innerWidth - 0.5) * 2;
			const y = (clientY / window.innerHeight - 0.5) * 2;

			gsap.to('.parallax-bg', {
				x: x * 50,
				y: y * 50,
				duration: 2,
				ease: 'power2.out'
			});
			gsap.to('.logo-container', {
				x: x * 20,
				y: y * 20,
				duration: 1.5,
				ease: 'power2.out'
			});
		};
		window.addEventListener('mousemove', handleMouseMove);

		const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

		tl.fromTo(
			'.logo-container',
			{ scale: 1.2, opacity: 0, filter: 'blur(10px)' },
			{ scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5 }
		);

		tl.fromTo(
			'.hero-title-char',
			{ y: '100%', opacity: 0 },
			{ y: '0%', opacity: 1, duration: 1.2, stagger: 0.05 },
			'-=1.2'
		);

		tl.fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.8');

		tl.fromTo(
			'.download-btn',
			{ y: 20, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
			'-=0.8'
		);

		tl.fromTo('.github-link', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.6');

		const cards = gsap.utils.toArray('.feature-card');
		cards.forEach((card: any, i) => {
			gsap.fromTo(
				card,
				{ y: 100, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: card,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					},
					delay: i * 0.1
				}
			);
		});

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<div
	class="selection:bg-primary/30 relative min-h-screen overflow-hidden bg-zinc-950 font-sans text-zinc-100"
>
	<div
		class="parallax-bg bg-blob-1 bg-primary/20 pointer-events-none absolute top-0 left-1/2 z-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full opacity-60 mix-blend-screen blur-[150px]"
	></div>
	<div
		class="parallax-bg bg-blob-2 pointer-events-none absolute right-0 bottom-0 z-0 h-[400px] w-[600px] rounded-full bg-amber-500/10 blur-[150px]"
	></div>

	<div class="relative z-10 mx-auto max-w-5xl px-6">
		<header class="flex flex-col items-center pt-32 pb-20 text-center">
			<div class="logo-container group relative mb-8 will-change-transform">
				<div
					class="absolute -inset-1 rounded-3xl bg-gradient-to-b from-white to-zinc-700 opacity-40 blur transition duration-1000 group-hover:opacity-70 group-hover:duration-200"
				></div>
				<img
					src={`${base}/icon.png`}
					alt="NuggetVPN Logo"
					class="relative z-10 h-28 w-28 rounded-2xl shadow-2xl ring-1 ring-white/10"
				/>
			</div>

			<h1
				class="font-heading mb-6 overflow-hidden text-6xl font-extrabold tracking-tight text-white md:text-7xl"
			>
				<span class="hero-title-char inline-block h-20">N</span><span
					class="hero-title-char inline-block h-20">u</span
				><span class="hero-title-char inline-block h-20">g</span><span
					class="hero-title-char inline-block h-20">g</span
				><span class="hero-title-char inline-block h-20">e</span><span
					class="hero-title-char inline-block h-20">t</span
				><span class="hero-title-char inline-block h-20">V</span><span
					class="hero-title-char inline-block h-20">P</span
				><span class="hero-title-char inline-block">N</span>
			</h1>

			<h2 class="hero-subtitle mb-10 max-w-2xl text-xl leading-relaxed text-zinc-400 md:text-2xl">
				Modern, lightweight, and fast VPN client built with <span class="text-primary font-medium"
					>Tauri v2</span
				>
				and <span class="text-primary font-medium">React 19</span>.
				<br class="hidden md:block" />Open Source and privacy-focused.
			</h2>

			<div class="flex flex-wrap items-center justify-center gap-4">
				<p
					class="hero-subtitle mb-2 w-full font-mono text-xs font-bold tracking-widest text-zinc-500 uppercase"
				>
					Download Latest Release
				</p>

				<Button
					href={releaseLink}
					class="download-btn group hover:border-primary/50 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-4 text-zinc-100 transition-all hover:bg-zinc-800 active:scale-95"
				>
					<Icon
						data={windows}
						class="group-hover:text-primary text-blue-400 transition-colors"
						size={24}
					/>
					<div class="text-left">
						<div class="leading-none font-bold">Windows</div>
						<div class="mt-1 text-xs text-zinc-500 group-hover:text-zinc-400">.exe / .msi</div>
					</div>
				</Button>

				<Button
					href={releaseLink}
					class="download-btn group hover:border-primary/50 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-4 text-zinc-100 transition-all hover:bg-zinc-800 active:scale-95"
				>
					<Icon
						data={apple}
						class="group-hover:text-primary text-zinc-300 transition-colors"
						size={24}
					/>
					<div class="text-left">
						<div class="leading-none font-bold">macOS</div>
						<div class="mt-1 text-xs text-zinc-500 group-hover:text-zinc-400">
							Apple Silicon / Intel
						</div>
					</div>
				</Button>

				<Button
					href={releaseLink}
					class="download-btn group hover:border-primary/50 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-4 text-zinc-100 transition-all hover:bg-zinc-800 active:scale-95"
				>
					<Icon data={linux} class="group-hover:text-primary transition-colors" size={24} />
					<div class="text-left">
						<div class="leading-none font-bold">Linux</div>
						<div class="mt-1 text-xs text-zinc-500 group-hover:text-zinc-400">
							.deb / .AppImage / .rpm
						</div>
					</div>
				</Button>
			</div>
			<div class="github-link mt-6 flex items-center gap-2 text-sm text-zinc-500">
				<Github size={16} />
				<span
					>Fully Open Source on <a
						href="https://github.com/Rigby-Foundation/nuggetvpn"
						class="hover:text-primary underline underline-offset-4">GitHub</a
					></span
				>
			</div>
		</header>

		<section
			class="feature-section grid grid-cols-1 gap-8 border-t border-white/5 py-20 md:grid-cols-3"
		>
			<div
				class="feature-card rounded-3xl border border-white/5 bg-zinc-900/50 p-8 backdrop-blur-sm transition-colors hover:bg-zinc-900/80"
			>
				<div
					class="text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10"
				>
					<Zap size={28} strokeWidth={1.5} />
				</div>
				<h3 class="font-heading mb-3 text-2xl font-bold text-white">Blazing Fast</h3>
				<p class="leading-relaxed text-zinc-400">
					Powered by Rust and Tauri, NuggetVPN leaves electron apps in the dust. Minimal RAM usage
					and instant startup times.
				</p>
			</div>

			<div
				class="feature-card rounded-3xl border border-white/5 bg-zinc-900/50 p-8 backdrop-blur-sm transition-colors hover:bg-zinc-900/80"
			>
				<div
					class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
				>
					<ShieldCheck size={28} strokeWidth={1.5} />
				</div>
				<h3 class="font-heading mb-3 text-2xl font-bold text-white">Privacy First</h3>
				<p class="leading-relaxed text-zinc-400">
					100% Open Source. No hidden code, no tracking, no accounts required. Your connection data
					is yours alone.
				</p>
			</div>

			<div
				class="feature-card rounded-3xl border border-white/5 bg-zinc-900/50 p-8 backdrop-blur-sm transition-colors hover:bg-zinc-900/80"
			>
				<div
					class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400"
				>
					<Palette size={28} strokeWidth={1.5} />
				</div>
				<h3 class="font-heading mb-3 text-2xl font-bold text-white">Modern UI</h3>
				<p class="leading-relaxed text-zinc-400">
					Built with React 19 for a reactive, clean, and beautiful interface with native dark mode
					support and glassmorphism aesthetics.
				</p>
			</div>
		</section>

		<footer
			class="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-10 text-center text-sm text-zinc-500 md:flex-row"
		>
			<p>© {new Date().getFullYear()} Rigby Foundation.</p>
			<p>Built with 🧡 and Rust.</p>
		</footer>
	</div>
</div>
