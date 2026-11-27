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

export const DEFAULT_THEME = 'kage';

// The built-in schemes use Kage's frontend paletteTokens for background, muted surface and primary.
export const THEMES: Theme[] = [
	{
		id: DEFAULT_THEME,
		group: 'site',
		mode: 'dark',
		name: { en: 'Kage', ru: 'Kage' },
		bg: '#14111e',
		surface: '#231e33',
		accent: '#c4aff8'
	},
	{
		id: 'dark',
		group: 'dark',
		mode: 'dark',
		name: { en: 'Dark', ru: 'Тёмная' },
		bg: 'oklch(0.141 0.005 285.823)',
		surface: 'oklch(0.274 0.006 286.033)',
		accent: 'oklch(0.585 0.233 277.117)'
	},
	{
		id: 'light',
		group: 'light',
		mode: 'light',
		name: { en: 'Light', ru: 'Светлая' },
		bg: 'oklch(1 0 0)',
		surface: 'oklch(0.967 0.001 286.375)',
		accent: 'oklch(0.457 0.24 277.023)'
	},
	{
		id: 'oled',
		group: 'dark',
		mode: 'dark',
		name: { en: 'OLED black', ru: 'Чёрная OLED' },
		bg: 'oklch(0.0000 0.0000 0.00)',
		surface: 'oklch(0.1300 0.0000 0.00)',
		accent: 'oklch(0.7900 0.1173 260.18)'
	},
	{
		id: 'cosmos',
		group: 'dark',
		mode: 'dark',
		name: { en: 'Cosmos', ru: 'Космос' },
		bg: 'oklch(0.1719 0.0372 265.49)',
		surface: 'oklch(0.3019 0.0372 265.49)',
		accent: 'oklch(0.7900 0.1145 221.50)'
	},
	{
		id: 'violet',
		group: 'dark',
		mode: 'dark',
		name: { en: 'Violet', ru: 'Фиолетовая' },
		bg: 'oklch(0.2262 0.0487 301.05)',
		surface: 'oklch(0.3562 0.0487 301.05)',
		accent: 'oklch(0.7900 0.1517 300.33)'
	},
	{
		id: 'ocean',
		group: 'dark',
		mode: 'dark',
		name: { en: 'Ocean', ru: 'Океан' },
		bg: 'oklch(0.2447 0.0374 255.50)',
		surface: 'oklch(0.3747 0.0374 255.50)',
		accent: 'oklch(0.7900 0.1152 257.32)'
	},
	{
		id: 'tokyo-night',
		group: 'palette',
		mode: 'dark',
		name: { en: 'Tokyo Night', ru: 'Tokyo Night' },
		bg: 'oklch(0.2263 0.0214 280.49)',
		surface: 'oklch(0.3563 0.0214 280.49)',
		accent: 'oklch(0.7900 0.1322 264.20)'
	},
	{
		id: 'dracula',
		group: 'palette',
		mode: 'dark',
		name: { en: 'Dracula', ru: 'Dracula' },
		bg: 'oklch(0.2882 0.0221 277.51)',
		surface: 'oklch(0.4182 0.0221 277.51)',
		accent: 'oklch(0.7900 0.1485 301.88)'
	},
	{
		id: 'ctp-mocha',
		group: 'palette',
		mode: 'dark',
		name: { en: 'Catppuccin Mocha', ru: 'Catppuccin Mocha' },
		bg: 'oklch(0.2429 0.0304 283.91)',
		surface: 'oklch(0.3729 0.0304 283.91)',
		accent: 'oklch(0.7900 0.1187 304.77)'
	},
	{
		id: 'ctp-latte',
		group: 'palette',
		mode: 'light',
		name: { en: 'Catppuccin Latte', ru: 'Catppuccin Latte' },
		bg: 'oklch(0.9578 0.0058 264.53)',
		surface: 'oklch(0.8998 0.0058 264.53)',
		accent: 'oklch(0.4800 0.2503 297.02)'
	},
	{
		id: 'nord',
		group: 'dark',
		mode: 'dark',
		name: { en: 'Nord', ru: 'Норд' },
		bg: 'oklch(0.3244 0.0229 264.18)',
		surface: 'oklch(0.4544 0.0229 264.18)',
		accent: 'oklch(0.7900 0.0622 217.47)'
	},
	{
		id: 'gruvbox',
		group: 'palette',
		mode: 'dark',
		name: { en: 'Gruvbox', ru: 'Gruvbox' },
		bg: 'oklch(0.2768 0.0000 89.88)',
		surface: 'oklch(0.4068 0.0000 89.88)',
		accent: 'oklch(0.7900 0.1595 82.99)'
	},
	{
		id: 'slate',
		group: 'dark',
		mode: 'dark',
		name: { en: 'Slate', ru: 'Сланец' },
		bg: 'oklch(0.2685 0.0178 266.30)',
		surface: 'oklch(0.3985 0.0178 266.30)',
		accent: 'oklch(0.7900 0.0451 262.37)'
	},
	{
		id: 'stone',
		group: 'dark',
		mode: 'dark',
		name: { en: 'Stone', ru: 'Камень' },
		bg: 'oklch(0.2745 0.0085 75.24)',
		surface: 'oklch(0.4045 0.0085 75.24)',
		accent: 'oklch(0.7900 0.0426 68.31)'
	},
	{
		id: 'emerald',
		group: 'dark',
		mode: 'dark',
		name: { en: 'Emerald', ru: 'Изумрудная' },
		bg: 'oklch(0.2503 0.0275 167.53)',
		surface: 'oklch(0.3803 0.0275 167.53)',
		accent: 'oklch(0.7900 0.1023 165.00)'
	},
	{
		id: 'sunset',
		group: 'dark',
		mode: 'dark',
		name: { en: 'Sunset', ru: 'Закат' },
		bg: 'oklch(0.2489 0.0284 44.56)',
		surface: 'oklch(0.3789 0.0284 44.56)',
		accent: 'oklch(0.7900 0.1299 49.37)'
	},
	{
		id: 'rose',
		group: 'dark',
		mode: 'dark',
		name: { en: 'Rose', ru: 'Розовая' },
		bg: 'oklch(0.2309 0.0349 354.64)',
		surface: 'oklch(0.3609 0.0349 354.64)',
		accent: 'oklch(0.7900 0.1186 0.51)'
	},
	{
		id: 'paper',
		group: 'light',
		mode: 'light',
		name: { en: 'Paper', ru: 'Бумага' },
		bg: 'oklch(0.9790 0.0123 91.52)',
		surface: 'oklch(0.9210 0.0123 91.52)',
		accent: 'oklch(0.4800 0.0997 68.26)'
	},
	{
		id: 'frost',
		group: 'light',
		mode: 'light',
		name: { en: 'Frost', ru: 'Иней' },
		bg: 'oklch(0.9801 0.0096 252.81)',
		surface: 'oklch(0.9221 0.0096 252.81)',
		accent: 'oklch(0.4800 0.1087 254.96)'
	},
	{
		id: 'sakura',
		group: 'light',
		mode: 'light',
		name: { en: 'Sakura', ru: 'Сакура' },
		bg: 'oklch(0.9829 0.0089 0.12)',
		surface: 'oklch(0.9249 0.0089 0.12)',
		accent: 'oklch(0.4800 0.1833 2.12)'
	},
	{
		id: 'mint',
		group: 'light',
		mode: 'light',
		name: { en: 'Mint', ru: 'Мята' },
		bg: 'oklch(0.9820 0.0084 168.76)',
		surface: 'oklch(0.9240 0.0084 168.76)',
		accent: 'oklch(0.4800 0.0989 169.74)'
	},
	{
		id: 'contrast',
		group: 'dark',
		mode: 'dark',
		name: { en: 'High contrast', ru: 'Высокий контраст' },
		bg: 'oklch(0.0000 0.0000 0.00)',
		surface: 'oklch(0.1300 0.0000 0.00)',
		accent: 'oklch(0.7900 0.1763 96.68)'
	},
	{
		id: 'contrast-light',
		group: 'light',
		mode: 'light',
		name: { en: 'High contrast light', ru: 'Высокий контраст, светлая' },
		bg: 'oklch(1.0000 0.0000 89.88)',
		surface: 'oklch(0.9420 0.0000 89.88)',
		accent: 'oklch(0.4800 0.1043 57.51)'
	},
	{
		id: 'mocha',
		group: 'dark',
		mode: 'dark',
		name: { en: 'Mocha', ru: 'Мокко' },
		bg: 'oklch(0.2176 0.0207 63.04)',
		surface: 'oklch(0.3476 0.0207 63.04)',
		accent: 'oklch(0.7900 0.0628 62.38)'
	},
	{
		id: 'ember',
		group: 'dark',
		mode: 'dark',
		name: { en: 'Ember', ru: 'Угли' },
		bg: 'oklch(0.1918 0.0140 34.41)',
		surface: 'oklch(0.3218 0.0140 34.41)',
		accent: 'oklch(0.7900 0.1907 37.47)'
	},
	{
		id: 'crimson',
		group: 'dark',
		mode: 'dark',
		name: { en: 'Crimson', ru: 'Багровая' },
		bg: 'oklch(0.1578 0.0209 356.24)',
		surface: 'oklch(0.2878 0.0209 356.24)',
		accent: 'oklch(0.7900 0.1496 11.46)'
	},
	{
		id: 'teal',
		group: 'dark',
		mode: 'dark',
		name: { en: 'Teal', ru: 'Бирюза' },
		bg: 'oklch(0.2058 0.0183 195.82)',
		surface: 'oklch(0.3358 0.0183 195.82)',
		accent: 'oklch(0.7900 0.1325 181.91)'
	},
	{
		id: 'solarized-light',
		group: 'palette',
		mode: 'light',
		name: { en: 'Solarized Light', ru: 'Solarized Light' },
		bg: 'oklch(0.9735 0.0261 90.10)',
		surface: 'oklch(0.9155 0.0261 90.10)',
		accent: 'oklch(0.4800 0.1340 85.72)'
	},
	{
		id: 'ctp-frappe',
		group: 'palette',
		mode: 'dark',
		name: { en: 'Catppuccin Frappé', ru: 'Catppuccin Frappé' },
		bg: 'oklch(0.3291 0.0324 274.76)',
		surface: 'oklch(0.4591 0.0324 274.76)',
		accent: 'oklch(0.7900 0.1108 311.74)'
	},
	{
		id: 'ctp-macchiato',
		group: 'palette',
		mode: 'dark',
		name: { en: 'Catppuccin Macchiato', ru: 'Catppuccin Macchiato' },
		bg: 'oklch(0.2788 0.0353 276.94)',
		surface: 'oklch(0.4088 0.0353 276.94)',
		accent: 'oklch(0.7900 0.1259 303.90)'
	},
	{
		id: 'rose-pine',
		group: 'palette',
		mode: 'dark',
		name: { en: 'Rosé Pine', ru: 'Rosé Pine' },
		bg: 'oklch(0.2134 0.0255 291.13)',
		surface: 'oklch(0.3434 0.0255 291.13)',
		accent: 'oklch(0.7900 0.0544 21.14)'
	},
	{
		id: 'everforest',
		group: 'palette',
		mode: 'dark',
		name: { en: 'Everforest', ru: 'Everforest' },
		bg: 'oklch(0.3239 0.0153 240.42)',
		surface: 'oklch(0.4539 0.0153 240.42)',
		accent: 'oklch(0.7900 0.0906 125.78)'
	}
];

const KEY = 'kage-theme';
const LEGACY_KEY = 'nugget-theme';

export function savedTheme(): Theme {
	try {
		const saved = JSON.parse(
			localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY) ?? 'null'
		);
		return THEMES.find((theme) => theme.id === saved?.id) ?? THEMES[0];
	} catch {
		return THEMES[0];
	}
}

export function applyTheme(theme: Theme) {
	const root = document.documentElement;
	root.dataset.theme = theme.mode;
	root.style.setProperty('--theme-bg', theme.bg);
	root.style.setProperty('--theme-surface', theme.surface);
	root.style.setProperty('--theme-accent', theme.accent);
	document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.bg);

	try {
		localStorage.setItem(KEY, JSON.stringify(theme));
		localStorage.removeItem(LEGACY_KEY);
	} catch {
		// The theme still applies for this visit.
	}
}
