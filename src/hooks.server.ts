import type { Handle } from '@sveltejs/kit';

// <html lang> per page, so search engines and screen readers know which
// language each one is in.
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', event.url.pathname.startsWith('/ru') ? 'ru' : 'en')
	});
