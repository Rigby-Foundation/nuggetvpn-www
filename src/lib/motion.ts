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

	// Pointer effects only where there is a pointer to follow.
	const fine = window.matchMedia('(pointer: fine)').matches;
	const listeners: Cleanup[] = [];
	const listen = <K extends keyof WindowEventMap>(target: Window | HTMLElement, type: K, fn: (e: WindowEventMap[K]) => void) => {
		target.addEventListener(type, fn as EventListener, { passive: true });
		listeners.push(() => target.removeEventListener(type, fn as EventListener));
	};

	const ctx = gsap.context(() => {
		// The hero: the headline slams up out of its lines word by word, then
		// everything else lands and the fryer's glow flares up.
		const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
		intro
			.fromTo(
				q('hero-word'),
				{ yPercent: 130, rotate: 9, skewY: 8, scale: 1.15, opacity: 0 },
				{ yPercent: 0, rotate: 0, skewY: 0, scale: 1, opacity: 1, duration: 0.9, stagger: 0.055 }
			)
			.fromTo(q('hero-item'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.07 }, '-=0.8')
			.fromTo(q('glow'), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power4.in' }, '-=1')
			.to(q('glow'), { filter: 'brightness(1.8)', duration: 0.15, yoyo: true, repeat: 1 });

		// How far down the page you are, scrubbed to the scroll.
		gsap.fromTo(q('bar'), { scaleX: 0, opacity: 1 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

		// The app window rises tipped back and straightens up as it scrolls in.
		const demo = q('demo')[0];
		if (demo) {
			gsap.fromTo(
				demo,
				{ y: 160, rotateX: 38, scale: 0.82, opacity: 0.2 },
				{ y: 0, rotateX: 0, scale: 1, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: demo, start: 'top bottom', end: 'top 30%', scrub: 0.6 } }
			);
		}

		// The app window leans toward the pointer.
		const frame = q('demo-frame')[0];
		if (fine && frame && demo) {
			const rx = gsap.quickTo(frame, 'rotateX', { duration: 0.6, ease: 'power3.out' });
			const ry = gsap.quickTo(frame, 'rotateY', { duration: 0.6, ease: 'power3.out' });
			listen(demo, 'pointermove', (e) => {
				const r = demo.getBoundingClientRect();
				ry(((e.clientX - r.left) / r.width - 0.5) * 14);
				rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
			});
			listen(demo, 'pointerleave', () => (rx(0), ry(0)));
		}

		// The warm spot follows the pointer.
		const cursor = q('cursor')[0];
		if (fine && cursor) {
			const cx = gsap.quickTo(cursor, 'x', { duration: 0.8, ease: 'power3.out' });
			const cy = gsap.quickTo(cursor, 'y', { duration: 0.8, ease: 'power3.out' });
			listen(window, 'pointermove', (e) => {
				gsap.to(cursor, { opacity: 1, duration: 0.4, overwrite: 'auto' });
				cx(e.clientX);
				cy(e.clientY);
			});
		}

		// The main button pulls toward the pointer and snaps back.
		for (const magnet of fine ? q('magnet') : []) {
			const mx = gsap.quickTo(magnet, 'x', { duration: 0.4, ease: 'power3.out' });
			const my = gsap.quickTo(magnet, 'y', { duration: 0.4, ease: 'power3.out' });
			listen(magnet, 'pointermove', (e) => {
				const r = magnet.getBoundingClientRect();
				mx((e.clientX - r.left - r.width / 2) * 0.35);
				my((e.clientY - r.top - r.height / 2) * 0.5);
			});
			listen(magnet, 'pointerleave', () => {
				gsap.to(magnet, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1.1, 0.35)' });
			});
		}

		// The slogan marquee runs on CSS; scrolling hard speeds it up and leans
		// it into the direction of travel.
		const slogans = q('slogan');
		const tracks = slogans;
		const skew = slogans.length ? gsap.quickTo(slogans, 'skewX', { duration: 0.5, ease: 'power3.out' }) : () => {};
		const rate = (r: number) => {
			for (const track of tracks) for (const anim of track.getAnimations()) anim.playbackRate = r;
		};
		ScrollTrigger.create({
			start: 0,
			end: 'max',
			onUpdate(self) {
				const v = self.getVelocity();
				skew(gsap.utils.clamp(-14, 14, -v / 250));
				rate(1 + Math.min(Math.abs(v) / 400, 6));
			}
		});
		const settle = () => {
			skew(0);
			rate(1);
		};
		ScrollTrigger.addEventListener('scrollEnd', settle);
		listeners.push(() => ScrollTrigger.removeEventListener('scrollEnd', settle));

		// The slogan band shoves sideways as it crosses the screen.
		const band = slogans[0]?.closest('section');
		if (band) {
			gsap.fromTo(
				band,
				{ xPercent: 6 },
				{ xPercent: -6, ease: 'none', scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true } }
			);
		}

		// Section titles shear up into place.
		for (const title of q('title')) {
			gsap.fromTo(
				title,
				{ yPercent: 80, skewY: 7, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
				{
					yPercent: 0,
					skewY: 0,
					opacity: 1,
					clipPath: 'inset(0 0 0% 0)',
					duration: 1,
					ease: 'expo.out',
					scrollTrigger: { trigger: title, start: 'top 90%', once: true }
				}
			);
		}

		const reveal = (targets: HTMLElement[], from: gsap.TweenVars, trigger: Element, extra: gsap.TweenVars = {}) =>
			targets.length &&
			gsap.fromTo(targets, from, {
				x: 0,
				y: 0,
				xPercent: 0,
				yPercent: 0,
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
		if (chips[0]) reveal(chips, { y: 20, scale: 0.6, opacity: 0 }, chips[0], { stagger: 0.04, ease: 'back.out(3)', duration: 0.6 });

		// Each screenshot row: the picture rises and settles into place, the
		// text follows, and the picture drifts a little against the scroll.
		for (const row of q('row')) {
			reveal(q('row-fig', row), { y: 60, scale: 0.96, opacity: 0 }, row, { duration: 1.3, ease: 'expo.out' });
			reveal(q('row-text', row), { y: 24, opacity: 0 }, row, { stagger: 0.08, delay: 0.2 });
			const image = q('row-img', row)[0];
			if (image) {
				gsap.fromTo(
					image,
					{ yPercent: 3, scale: 1.08 },
					{ yPercent: -3, scale: 1.08, ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true } }
				);
			}
		}

		// The themes are thrown in as a fanned hand and straighten up.
		const themes = q('theme');
		if (themes[0]) {
			gsap.fromTo(
				themes,
				{ y: 140, x: (i: number) => (i - 1) * -120, opacity: 0, rotate: (i: number) => (i - 1) * 14, scale: 0.8 },
				{
					y: 0,
					x: 0,
					opacity: 1,
					rotate: 0,
					scale: 1,
					duration: 1.2,
					stagger: 0.1,
					ease: 'expo.out',
					scrollTrigger: { trigger: themes[0], start: 'top 85%', once: true }
				}
			);
		}

		// The details slide in from both sides.
		const details = q('detail');
		if (details[0]) reveal(details, { x: (i: number) => (i % 2 ? 60 : -60), opacity: 0 }, details[0], { stagger: 0.06, ease: 'expo.out' });

		// The gold band bursts open from the middle as it arrives, "Get
		// Nugget." tumbles up letter by letter, and the downloads are dealt in.
		const goldBand = q('band')[0];
		if (goldBand) {
			gsap.fromTo(
				goldBand,
				{ clipPath: 'inset(12% 8% 12% 8% round 48px)' },
				{
					clipPath: 'inset(0% 0% 0% 0% round 0px)',
					ease: 'none',
					scrollTrigger: { trigger: goldBand, start: 'top bottom', end: 'top 25%', scrub: 0.4 }
				}
			);
		}
		const letters = q('dl-letter');
		if (letters[0]) {
			reveal(letters, { yPercent: 120, rotate: (i: number) => (i % 2 ? 18 : -18), opacity: 0 }, letters[0], {
				stagger: 0.04,
				duration: 0.9,
				ease: 'back.out(2.2)'
			});
		}
		const cards = q('dl-card');
		if (cards[0]) {
			reveal(cards, { y: 80, rotate: (i: number) => (i % 2 ? 6 : -6), scale: 0.85, opacity: 0 }, cards[0], {
				stagger: 0.08,
				ease: 'back.out(1.8)'
			});
		}

		const faq = q('faq');
		if (faq[0]) reveal(faq, { y: 14, opacity: 0 }, faq[0], { stagger: 0.05, duration: 0.7 });
	}, root);

	// From here on GSAP owns what the CSS was holding back.
	html.classList.remove('motion');
	(window as unknown as { __motionReady?: boolean }).__motionReady = true;

	return () => {
		for (const off of listeners) off();
		ctx.revert();
	};
}

/** The app window kicks, and a ring of light blows out of the button, when the demo connects. */
export async function springOnConnect(target: HTMLElement, burst?: HTMLElement) {
	if (reducedMotion()) return;
	const { gsap } = await import('gsap');
	gsap
		.timeline()
		.to(target, { x: -8, duration: 0.05 })
		.to(target, { x: 8, duration: 0.05, repeat: 3, yoyo: true })
		.to(target, { x: 0, duration: 0.05 });
	gsap.fromTo(target, { scale: 0.94 }, { scale: 1, duration: 1, ease: 'elastic.out(1.2, 0.35)' });
	if (burst) gsap.fromTo(burst, { scale: 0.8, opacity: 1 }, { scale: 6, opacity: 0, duration: 0.9, ease: 'expo.out' });
}
