/**
 * The page's motion, all in one place.
 *
 * Elements opt in with a data-m attribute. The hero's are hidden by CSS
 * before the first paint (html.motion, set by app.html) so they rise in
 * instead of flashing; everything below the fold is hidden by GSAP itself
 * when its scroll trigger is set up. Nothing runs, and nothing is hidden, for
 * anyone who has asked the system for reduced motion.
 */

type Cleanup = () => void;

export function reducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export async function startMotion(root: HTMLElement): Promise<Cleanup> {
	const html = document.documentElement;
	if (reducedMotion()) {
		html.classList.remove('motion');
		return () => {};
	}

	const { gsap } = await import('gsap');
	const { ScrollTrigger } = await import('gsap/ScrollTrigger');
	gsap.registerPlugin(ScrollTrigger);

	const q = (name: string, scope: Element | Document = root) =>
		Array.from(scope.querySelectorAll<HTMLElement>(`[data-m="${name}"]`));

	const ctx = gsap.context(() => {
		// The hero: the headline rises word by word out of its own lines,
		// then the rest settles in, and the fryer's glow comes up last.
		const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
		intro
			.fromTo(q('hero-word'), { yPercent: 110, rotate: 4, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: 1.1, stagger: 0.07 })
			.fromTo(q('hero-item'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, '-=0.75')
			.fromTo(
				q('hero-demo'),
				{ y: 48, scale: 0.96, opacity: 0 },
				{ y: 0, scale: 1, opacity: 1, duration: 1.3 },
				'-=0.95'
			)
			.fromTo(q('glow'), { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power2.out' }, '-=1.1');

		const reveal = (targets: HTMLElement[], from: gsap.TweenVars, trigger: Element, extra: gsap.TweenVars = {}) =>
			targets.length &&
			gsap.fromTo(targets, from, {
				x: 0,
				y: 0,
				rotate: 0,
				scale: 1,
				opacity: 1,
				duration: 0.9,
				ease: 'power3.out',
				...extra,
				scrollTrigger: { trigger, start: 'top 85%', once: true }
			});

		// Protocol chips pop in along the strip.
		const chips = q('chip');
		if (chips[0]) reveal(chips, { y: 10, scale: 0.9, opacity: 0 }, chips[0], { stagger: 0.04, ease: 'back.out(2)', duration: 0.6 });

		// Each screenshot row: the picture rises from its side, the text follows,
		// and the picture drifts a little against the scroll for depth.
		for (const row of q('row')) {
			const left = row.dataset.side === 'left';
			reveal(q('row-fig', row), { y: 70, x: left ? -24 : 24, opacity: 0 }, row, { duration: 1.1, ease: 'expo.out' });
			reveal(q('row-text', row), { y: 24, opacity: 0 }, row, { stagger: 0.08, delay: 0.15 });
			const image = q('row-img', row)[0];
			if (image) {
				gsap.fromTo(
					image,
					{ yPercent: 3 },
					{ yPercent: -3, ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true } }
				);
			}
		}

		// The themes come in fanned out and straighten up.
		const themes = q('theme');
		if (themes[0]) {
			gsap.fromTo(
				themes,
				{ y: 50, opacity: 0, rotate: (i: number) => (i - 1) * 4 },
				{
					y: 0,
					opacity: 1,
					rotate: 0,
					duration: 1.1,
					stagger: 0.1,
					ease: 'expo.out',
					scrollTrigger: { trigger: themes[0], start: 'top 85%', once: true }
				}
			);
		}

		// The details, a row at a time.
		const details = q('detail');
		if (details[0]) reveal(details, { y: 22, opacity: 0 }, details[0], { stagger: 0.05 });

		// "Get Nugget." rises letter by letter as the gold band arrives, then
		// the downloads drop into place.
		const letters = q('dl-letter');
		if (letters[0]) {
			reveal(letters, { yPercent: 105, opacity: 0 }, letters[0], { stagger: 0.035, duration: 1, ease: 'expo.out' });
		}
		const cards = q('dl-card');
		if (cards[0]) reveal(cards, { y: 30, opacity: 0 }, cards[0], { stagger: 0.08, ease: 'back.out(1.4)' });

		const faq = q('faq');
		if (faq[0]) reveal(faq, { y: 14, opacity: 0 }, faq[0], { stagger: 0.05, duration: 0.7 });
	}, root);

	// From here on GSAP owns what the CSS was holding back.
	html.classList.remove('motion');
	(window as unknown as { __motionReady?: boolean }).__motionReady = true;

	return () => ctx.revert();
}

/** A small spring on the app window when the demo connects. */
export async function springOnConnect(target: HTMLElement) {
	if (reducedMotion()) return;
	const { gsap } = await import('gsap');
	gsap.fromTo(target, { scale: 0.975 }, { scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.45)' });
}
