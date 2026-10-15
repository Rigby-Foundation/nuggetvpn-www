/**
 * The themes built into the app, so the page can wear them too.
 *
 * Copied from the app's own presets (frontend/src/lib/themes.ts in
 * NuggetVPN): each is the page colour, a surface on top of it and the accent.
 * app.css derives the rest of the page's palette from those three and
 * whether the theme is light or dark. "Nugget" is the page's own fryer look.
 */
import type { Lang } from './content';

export interface Theme {
	id: string;
	group: 'site' | 'light' | 'dark' | 'palette';
	mode: 'light' | 'dark';
	name: Record<Lang, string>;
	bg: string;
	surface: string;
	accent: string;
}

export const THEMES: Theme[] = [
	{ id: 'nugget', group: 'site', mode: 'dark', name: { en: 'Nugget', ru: 'Nugget' }, bg: '#15100b', surface: '#2d2117', accent: '#f2a83b' },
	{ id: 'light', group: 'light', mode: 'light', name: { en: 'Light', ru: 'Светлая' }, bg: 'oklch(1 0 0)', surface: 'oklch(0.945 0.001 286.375)', accent: 'oklch(0.58 0.145 58)' },
	{ id: 'paper', group: 'light', mode: 'light', name: { en: 'Paper', ru: 'Бумага' }, bg: 'oklch(0.975 0.012 85)', surface: 'oklch(0.93 0.015 85)', accent: 'oklch(0.58 0.145 58)' },
	{ id: 'frost', group: 'light', mode: 'light', name: { en: 'Frost', ru: 'Иней' }, bg: 'oklch(0.985 0.01 245)', surface: 'oklch(0.93 0.012 245)', accent: 'oklch(0.55 0.15 250)' },
	{ id: 'dark', group: 'dark', mode: 'dark', name: { en: 'Dark', ru: 'Тёмная' }, bg: 'oklch(0.141 0.006 286.033)', surface: 'oklch(0.274 0.006 286.033)', accent: 'oklch(0.79 0.145 70)' },
	{ id: 'oled', group: 'dark', mode: 'dark', name: { en: 'OLED black', ru: 'Чёрная OLED' }, bg: 'oklch(0 0 0)', surface: 'oklch(0.2 0 0)', accent: 'oklch(0.79 0.145 70)' },
	{ id: 'contrast', group: 'dark', mode: 'dark', name: { en: 'High contrast', ru: 'Высокий контраст' }, bg: 'oklch(0 0 0)', surface: 'oklch(0.28 0 0)', accent: 'oklch(0.86 0.16 80)' },
	{ id: 'slate', group: 'dark', mode: 'dark', name: { en: 'Slate', ru: 'Сланец' }, bg: 'oklch(0.17 0.02 255)', surface: 'oklch(0.29 0.02 255)', accent: 'oklch(0.79 0.145 70)' },
	{ id: 'stone', group: 'dark', mode: 'dark', name: { en: 'Stone', ru: 'Камень' }, bg: 'oklch(0.16 0.012 75)', surface: 'oklch(0.285 0.012 75)', accent: 'oklch(0.79 0.145 70)' },
	{ id: 'nord', group: 'dark', mode: 'dark', name: { en: 'Nord', ru: 'Норд' }, bg: 'oklch(0.205 0.025 258)', surface: 'oklch(0.325 0.025 258)', accent: 'oklch(0.82 0.075 220)' },
	{ id: 'cosmos', group: 'dark', mode: 'dark', name: { en: 'Cosmos', ru: 'Космос' }, bg: 'oklch(0.145 0.05 255)', surface: 'oklch(0.275 0.05 255)', accent: 'oklch(0.8 0.12 210)' },
	{ id: 'violet', group: 'dark', mode: 'dark', name: { en: 'Violet', ru: 'Фиолетовая' }, bg: 'oklch(0.155 0.04 305)', surface: 'oklch(0.285 0.04 305)', accent: 'oklch(0.74 0.18 300)' },
	{ id: 'emerald', group: 'dark', mode: 'dark', name: { en: 'Emerald', ru: 'Изумрудная' }, bg: 'oklch(0.15 0.028 165)', surface: 'oklch(0.275 0.028 165)', accent: 'oklch(0.78 0.15 160)' },
	{ id: 'sunset', group: 'dark', mode: 'dark', name: { en: 'Sunset', ru: 'Закат' }, bg: 'oklch(0.16 0.035 40)', surface: 'oklch(0.285 0.035 40)', accent: 'oklch(0.77 0.17 35)' },
	{ id: 'rose', group: 'dark', mode: 'dark', name: { en: 'Rose', ru: 'Розовая' }, bg: 'oklch(0.155 0.035 350)', surface: 'oklch(0.28 0.035 350)', accent: 'oklch(0.75 0.17 350)' },
	{ id: 'mocha', group: 'dark', mode: 'dark', name: { en: 'Mocha', ru: 'Мокко' }, bg: 'oklch(0.165 0.03 55)', surface: 'oklch(0.29 0.03 55)', accent: 'oklch(0.79 0.1 65)' },
	{ id: 'sakura', group: 'light', mode: 'light', name: { en: 'Sakura', ru: 'Сакура' }, bg: '#fff7f9', surface: '#fbe4eb', accent: '#c2336a' },
	{ id: 'mint', group: 'light', mode: 'light', name: { en: 'Mint', ru: 'Мята' }, bg: '#f4fbf8', surface: '#dcefe6', accent: '#0f7a5f' },
	{ id: 'contrast-light', group: 'light', mode: 'light', name: { en: 'High contrast light', ru: 'Высокий контраст, светлая' }, bg: '#ffffff', surface: '#e8e8e8', accent: '#7a3f00' },
	{ id: 'ember', group: 'dark', mode: 'dark', name: { en: 'Ember', ru: 'Угли' }, bg: '#1a1210', surface: '#33231d', accent: '#ff6b3d' },
	{ id: 'crimson', group: 'dark', mode: 'dark', name: { en: 'Crimson', ru: 'Багровая' }, bg: '#14090d', surface: '#2c151e', accent: '#a81228' },
	{ id: 'ocean', group: 'dark', mode: 'dark', name: { en: 'Ocean', ru: 'Океан' }, bg: '#0b1a26', surface: '#173246', accent: '#3fb6d9' },
	{ id: 'teal', group: 'dark', mode: 'dark', name: { en: 'Teal', ru: 'Бирюза' }, bg: '#0d1a1a', surface: '#1b3434', accent: '#2dd4bf' },
	{ id: 'solarized-light', group: 'palette', mode: 'light', name: { en: 'Solarized Light', ru: 'Solarized Light' }, bg: '#fdf6e3', surface: '#e4dcc4', accent: '#b58900' },
	{ id: 'ctp-latte', group: 'palette', mode: 'light', name: { en: 'Catppuccin Latte', ru: 'Catppuccin Latte' }, bg: '#eff1f5', surface: '#ccd0da', accent: '#8839ef' },
	{ id: 'ctp-frappe', group: 'palette', mode: 'dark', name: { en: 'Catppuccin Frappé', ru: 'Catppuccin Frappé' }, bg: '#303446', surface: '#51576d', accent: '#ca9ee6' },
	{ id: 'ctp-macchiato', group: 'palette', mode: 'dark', name: { en: 'Catppuccin Macchiato', ru: 'Catppuccin Macchiato' }, bg: '#24273a', surface: '#494d64', accent: '#c6a0f6' },
	{ id: 'ctp-mocha', group: 'palette', mode: 'dark', name: { en: 'Catppuccin Mocha', ru: 'Catppuccin Mocha' }, bg: '#1e1e2e', surface: '#45475a', accent: '#cba6f7' },
	{ id: 'dracula', group: 'palette', mode: 'dark', name: { en: 'Dracula', ru: 'Dracula' }, bg: '#282a36', surface: '#44475a', accent: '#bd93f9' },
	{ id: 'gruvbox', group: 'palette', mode: 'dark', name: { en: 'Gruvbox', ru: 'Gruvbox' }, bg: '#282828', surface: '#3c3836', accent: '#fabd2f' },
	{ id: 'tokyo-night', group: 'palette', mode: 'dark', name: { en: 'Tokyo Night', ru: 'Tokyo Night' }, bg: '#1a1b26', surface: '#292e42', accent: '#7aa2f7' },
	{ id: 'rose-pine', group: 'palette', mode: 'dark', name: { en: 'Rosé Pine', ru: 'Rosé Pine' }, bg: '#191724', surface: '#26233a', accent: '#ebbcba' },
	{ id: 'everforest', group: 'palette', mode: 'dark', name: { en: 'Everforest', ru: 'Everforest' }, bg: '#2d353b', surface: '#3d484d', accent: '#a7c080' },
];

const KEY = 'nugget-theme';

/** Puts a theme on the page and remembers it. app.html reapplies it before the first paint. */
export function applyTheme(theme: Theme) {
	const html = document.documentElement;
	if (theme.id === 'nugget') {
		delete html.dataset.theme;
		for (const v of ['--t-bg', '--t-surface', '--t-accent']) html.style.removeProperty(v);
	} else {
		html.dataset.theme = theme.mode;
		html.style.setProperty('--t-bg', theme.bg);
		html.style.setProperty('--t-surface', theme.surface);
		html.style.setProperty('--t-accent', theme.accent);
	}
	try {
		if (theme.id === 'nugget') localStorage.removeItem(KEY);
		else localStorage.setItem(KEY, JSON.stringify({ id: theme.id, mode: theme.mode, bg: theme.bg, surface: theme.surface, accent: theme.accent }));
	} catch {
		// Not remembered; the page still changes.
	}
}

export function savedThemeId(): string {
	try {
		return JSON.parse(localStorage.getItem(KEY) ?? 'null')?.id ?? 'nugget';
	} catch {
		return 'nugget';
	}
}
