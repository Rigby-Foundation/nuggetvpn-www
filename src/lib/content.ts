/**
 * Every word on the page, in English and Russian.
 *
 * Russian is not an afterthought: most people looking for a client for their
 * VLESS or Hysteria2 subscription search in Russian, so the Russian page is
 * written for them, with its own title, description and screenshots.
 *
 * The page is written for people who just want their VPN to work, not for
 * people who know what a protocol is. The technical names stay in the title,
 * the description and the protocol strip, where search engines and the
 * curious find them.
 */
import type { FileId } from './release';

export type Lang = 'en' | 'ru';

export const SITE = 'https://nugget.rigby-foundation.org';
export const PATHS: Record<Lang, string> = { en: '/', ru: '/ru/' };

export interface Content {
	lang: Lang;
	/** Where this language's screenshots are. */
	screens: string;
	title: string;
	description: string;
	ogLocale: string;
	skip: string;
	nav: { screens: string; details: string; download: string; home: string; other: string };
	hero: {
		title: string;
		lead: string;
		download: Record<'windows' | 'macos' | 'linux' | 'android' | 'other', string>;
		platforms: string;
		terminal: string;
	};
	demo: {
		altOff: string;
		altOn: string;
		connect: string;
		disconnect: string;
		captionOff: string;
		captionOn: string;
	};
	copy: { copy: string; copied: string; label: string };
	themes: { button: string; site: string; light: string; dark: string; palette: string };
	/** Not shown: names the protocol strip for screen readers. */
	protocolsLead: string;
	/** Shouted across the giant band between the screens and the details. */
	slogans: string[];
	screensTitle: string;
	screensLead: string;
	showcase: { title: string; text: string; alt: string; facts: string[] }[];
	looks: { title: string; text: string; labels: string[]; alts: string[] };
	detailsTitle: string;
	details: { term: string; text: string }[];
	download: {
		title: string;
		version: (v: string) => string;
		free: string;
		all: string;
		groups: { system: string; note: string; files: { id: FileId; label: string }[]; warning?: string }[];
		ps: string;
		sh: string;
		scripts: string;
	};
	faqTitle: string;
	faq: { q: string; a: string }[];
	footer: { by: string; source: string };
}

const en: Content = {
	lang: 'en',
	screens: '/screens',
	title: 'NuggetVPN: free VLESS, Reality and Hysteria2 VPN client for Windows, macOS and Linux',
	description:
		'A free app for the VPN you already have: paste the link your provider gave you and press one button. Works with VLESS + Reality, VMess, Trojan, Shadowsocks, Hysteria2, TUIC and WireGuard. For Windows, macOS, Linux and Android.',
	ogLocale: 'en_US',
	skip: 'Skip to content',
	nav: { screens: 'Screens', details: 'Details', download: 'Download', home: 'NuggetVPN home', other: 'Русский' },
	hero: {
		title: 'A VPN app with just one button',
		lead: 'NuggetVPN is a free app for the VPN you already have. Copy the link your VPN provider sent you, paste it in, press the big button. That’s all there is to it.',
		download: {
			windows: 'Download for Windows',
			macos: 'Download for macOS',
			linux: 'Download for Linux',
			android: 'Download for Android',
			other: 'Download'
		},
		platforms: 'Free for Windows, macOS, Linux and Android',
		terminal: 'Comfortable with a terminal? Install with one command:'
	},
	demo: {
		altOff: 'NuggetVPN’s home screen, not connected: a large connect button with Aurora VPN’s subscription and the Helsinki server below it.',
		altOn: 'The same screen connected: the button filled in gold, the connected time, download and upload speeds, latency and the public IP.',
		connect: 'Connect (demo)',
		disconnect: 'Disconnect (demo)',
		captionOff: 'Go on, press it.',
		captionOn: 'You’re connected. That’s the whole app, really.'
	},
	copy: { copy: 'Copy', copied: 'Copied', label: 'Copy the command' },
	themes: { button: 'Theme', site: 'This site', light: 'Light', dark: 'Dark', palette: 'Palettes' },
	protocolsLead: 'Supported protocols',
	slogans: ['Free', 'No account', 'No tracking', 'No ads', 'Open source', 'One button'],
	screensTitle: 'One big button. Everything else only if you want it',
	screensLead: 'Most days you’ll just press the button. Here’s what’s there when you need more.',
	showcase: [
		{
			title: 'Pick a country, or let Nugget pick the fastest',
			text: 'All your provider’s servers in one list, each with its flag and how quickly it answers. Leave it on Automatic and Nugget connects you to the quickest one.',
			alt: 'The server list: Frankfurt, Amsterdam, Helsinki, Stockholm and Warsaw, each with its flag, address, protocol and ping.',
			facts: [
				'See which servers are fast before you connect',
				'Test them all with one tap, star your favourites',
				'Servers that won’t work are marked, with the reason why'
			]
		},
		{
			title: 'Choose which apps use the VPN',
			text: 'Send Telegram and Discord through the VPN and leave everything else on your normal connection. It’s a picture you can read: apps and sites on the left, where they go on the right. Drag a line to change it.',
			alt: 'The routing graph: Telegram, Discord and Spotify, and three domains, going through the VPN; addresses in Russia going direct.',
			facts: [
				'Choose by app, by website or by country',
				'Through the VPN, on your normal connection, or blocked',
				'See live which rule is handling what'
			]
		},
		{
			title: 'Always know how much you have left',
			text: 'Data used, days left and your provider’s support link are right next to the button. When your provider has news, it shows at the top.',
			alt: 'The home screen with a message from the provider at the top, and the subscription showing 35 GB of 186 GB used and 214 days left.',
			facts: [
				'Data and expiry date come straight from your provider',
				'Hide a message once you’ve read it',
				'Your server list keeps itself up to date'
			]
		}
	],
	looks: {
		title: 'Make it look like yours',
		text: 'Over thirty themes, light and dark, or your own with a picture behind it. Change the colours, how round the corners are, how fast things move, and where the menu sits.',
		labels: ['Paper', 'Violet, inset sidebar', 'First start'],
		alts: [
			'NuggetVPN in the light Paper theme.',
			'NuggetVPN in the Violet theme with an inset sidebar.',
			'The first-start setup, choosing a theme and where the navigation goes.'
		]
	},
	detailsTitle: 'The details',
	details: [
		{ term: 'Connecting', text: 'Press the button and Nugget finds the fastest server and connects, usually in under two seconds.' },
		{ term: 'If it drops', text: 'Nugget reconnects by itself. Until it’s back, nothing leaves your computer unprotected.' },
		{ term: 'Adding a VPN', text: 'Paste a link, scan a QR code, or open a screenshot of one. Setup files from other VPN apps work too.' },
		{ term: 'Stats', text: 'Live speed, a built-in speed test, and how much data each app used this week.' },
		{ term: 'Updates', text: 'On Windows and macOS, Nugget updates itself and restarts. Nothing to download by hand.' },
		{ term: 'Languages', text: 'فارسی, English, Русский, Українська, 中文 and 日本語.' },
		{ term: 'Privacy', text: 'No account, no tracking. It only checks for updates and looks up your IP address, and you can turn both off.' },
		{ term: 'Add-ons', text: 'Extra themes, fonts and ready-made settings. Each one only gets the access you give it.' },
		{ term: 'Under the hood', text: 'sing-box, mihomo and Xray, all built in. You’ll never need to touch them, but you can switch in Settings.' },
		{ term: 'Open source', text: 'All the code is on GitHub under the GPL-3.0, so anyone can check exactly what it does.' }
	],
	download: {
		title: 'Get Nugget',
		version: (v) => `Version ${v}.`,
		free: 'Free, no account, nothing to sign up for.',
		all: 'All versions',
		groups: [
			{
				system: 'Windows',
				note: '10 and 11, 64-bit',
				files: [
					{ id: 'windows-installer', label: 'Installer (recommended)' },
					{ id: 'windows-silent', label: 'Silent installer' },
					{ id: 'windows-zip', label: 'No-install .zip' }
				]
			},
			{ system: 'macOS', note: 'Apple silicon and Intel', files: [{ id: 'macos-dmg', label: 'Disk image (.dmg)' }] },
			{
				system: 'Linux',
				note: 'x86-64',
				files: [
					{ id: 'linux-deb', label: '.deb' },
					{ id: 'linux-rpm', label: '.rpm' },
					{ id: 'linux-appimage', label: 'AppImage' }
				]
			},
			{ system: 'Android', note: '7.0 and newer', files: [{ id: 'android-apk', label: 'App (.apk)' }] },
			{
				system: 'iOS',
				note: 'iPhone and iPad, 15 and newer',
				files: [{ id: 'ios-ipa', label: 'Unsigned .ipa' }],
				warning:
					'For people who know how to sideload. It’s not on the App Store, so you install it yourself with a paid Apple developer account. With a free Apple ID it installs but won’t connect.'
			}
		],
		ps: 'Windows, in PowerShell',
		sh: 'macOS and Linux, in a terminal',
		scripts: 'Both download the latest version from GitHub, check it hasn’t been tampered with, install it and open it. Run them again to update.'
	},
	faqTitle: 'Questions',
	faq: [
		{
			q: 'Is NuggetVPN a VPN service?',
			a: 'No, it’s the app. The VPN itself comes from a provider you choose; after you pay, they usually send you a link. Paste that link into Nugget and it connects you.'
		},
		{
			q: 'Will it work with my VPN?',
			a: 'Almost certainly. If your provider gave you a link to paste into an app (it often starts with https://, vless:// or ss://), Nugget can use it.'
		},
		{
			q: 'I already use Hiddify, Happ, v2rayN or Nekoray. Can I switch?',
			a: 'Yes. Paste the same link you used there, and all your servers, data left and expiry date come with it.'
		},
		{
			q: 'Is it free?',
			a: 'Yes, completely. No ads, no account, no paid version. The code is open, so it stays that way.'
		},
		{
			q: 'macOS says the app is damaged.',
			a: 'It isn’t. macOS just doesn’t recognise the developer, so it blocks the app. Open Terminal, paste xattr -cr /Applications/NuggetVPN.app, press Return, and open the app again. Installing with the terminal command above avoids this.'
		},
		{
			q: 'Why isn’t it on the App Store?',
			a: 'Apple only lets VPN apps onto the App Store from registered companies with a paid developer account, and it removes VPN apps in some countries, Russia among them, when the government asks. So for now the iPhone version is a file you install yourself, which takes some know-how.'
		}
	],
	footer: { by: 'by the Rigby Foundation, under the GPL-3.0.', source: 'Source on GitHub' }
};

const ru: Content = {
	lang: 'ru',
	screens: '/screens/ru',
	title: 'NuggetVPN: бесплатный VPN-клиент для VLESS, Reality и Hysteria2 на Windows, macOS и Linux',
	description:
		'Бесплатное приложение для VPN, который у вас уже есть: вставьте ссылку от провайдера и нажмите одну кнопку. VLESS + Reality, VMess, Trojan, Shadowsocks, Hysteria2, TUIC и WireGuard. Для Windows, macOS, Linux и Android.',
	ogLocale: 'ru_RU',
	skip: 'Перейти к содержанию',
	nav: { screens: 'Экраны', details: 'Подробности', download: 'Скачать', home: 'NuggetVPN, главная', other: 'English' },
	hero: {
		title: 'VPN-приложение с одной кнопкой',
		lead: 'NuggetVPN — бесплатное приложение для VPN, который у вас уже есть. Скопируйте ссылку, которую прислал ваш VPN-провайдер, вставьте её и нажмите большую кнопку. Больше ничего не нужно.',
		download: {
			windows: 'Скачать для Windows',
			macos: 'Скачать для macOS',
			linux: 'Скачать для Linux',
			android: 'Скачать для Android',
			other: 'Скачать'
		},
		platforms: 'Бесплатно для Windows, macOS, Linux и Android',
		terminal: 'Умеете пользоваться терминалом? Установка одной командой:'
	},
	demo: {
		altOff: 'Главный экран NuggetVPN без подключения: большая кнопка подключения, под ней подписка Aurora VPN и сервер в Хельсинки.',
		altOn: 'Тот же экран после подключения: кнопка залита золотым, время подключения, скорость загрузки и отправки, задержка и внешний IP.',
		connect: 'Подключиться (демо)',
		disconnect: 'Отключиться (демо)',
		captionOff: 'Давайте, нажмите.',
		captionOn: 'Вы подключены. По сути, это всё приложение.'
	},
	copy: { copy: 'Копировать', copied: 'Скопировано', label: 'Скопировать команду' },
	themes: { button: 'Тема', site: 'Этот сайт', light: 'Светлые', dark: 'Тёмные', palette: 'Палитры' },
	protocolsLead: 'Поддерживаемые протоколы',
	slogans: ['Бесплатно', 'Без аккаунта', 'Без слежки', 'Без рекламы', 'Открытый код', 'Одна кнопка'],
	screensTitle: 'Одна большая кнопка. Всё остальное — если захотите',
	screensLead: 'Обычно вы просто нажимаете кнопку. Вот что есть, когда нужно больше.',
	showcase: [
		{
			title: 'Выберите страну — или пусть Nugget выберет самую быструю',
			text: 'Все серверы провайдера одним списком, у каждого флаг и скорость ответа. Оставьте «Автоматически», и Nugget подключит вас к самому быстрому.',
			alt: 'Список серверов: Франкфурт, Амстердам, Хельсинки, Стокгольм и Варшава, у каждого флаг, адрес, протокол и пинг.',
			facts: [
				'Видно, какие серверы быстрые, ещё до подключения',
				'Проверка всех серверов одним нажатием, избранное',
				'Серверы, которые не заработают, помечены — с причиной'
			]
		},
		{
			title: 'Решайте, какие приложения идут через VPN',
			text: 'Пустите Telegram и Discord через VPN, а всё остальное оставьте на обычном интернете. Это понятная схема: слева приложения и сайты, справа — куда они идут. Проведите линию, чтобы изменить.',
			alt: 'Схема маршрутизации: Telegram, Discord, Spotify и три домена идут через VPN, адреса в России — напрямую.',
			facts: [
				'По приложению, по сайту или по стране',
				'Через VPN, через обычный интернет или заблокировать',
				'В реальном времени видно, какое правило что обрабатывает'
			]
		},
		{
			title: 'Всегда видно, сколько осталось',
			text: 'Расход трафика, сколько дней осталось и ссылка на поддержку провайдера — рядом с кнопкой. Когда у провайдера новости, они видны сверху.',
			alt: 'Главный экран с сообщением провайдера сверху; подписка: использовано 35 ГБ из 186 ГБ, осталось 214 дней.',
			facts: [
				'Трафик и срок действия — прямо от провайдера',
				'Прочитанное сообщение можно скрыть',
				'Список серверов обновляется сам'
			]
		}
	],
	looks: {
		title: 'Сделайте его своим',
		text: 'Больше тридцати тем, светлых и тёмных, или своя — с картинкой на фоне. Меняйте цвета, скругление углов, скорость анимаций и место, где находится меню.',
		labels: ['Бумага', 'Фиолетовая, встроенная боковая панель', 'Первый запуск'],
		alts: [
			'NuggetVPN в светлой теме «Бумага».',
			'NuggetVPN в фиолетовой теме со встроенной боковой панелью.',
			'Первоначальная настройка: выбор темы и положения навигации.'
		]
	},
	detailsTitle: 'Подробности',
	details: [
		{ term: 'Подключение', text: 'Нажмите кнопку — Nugget найдёт самый быстрый сервер и подключится, обычно меньше чем за две секунды.' },
		{ term: 'Если отвалилось', text: 'Nugget переподключится сам. Пока связи нет, ничего не уйдёт с компьютера в обход VPN.' },
		{ term: 'Добавить VPN', text: 'Вставьте ссылку, отсканируйте QR-код или откройте его скриншот. Файлы настроек из других VPN-приложений тоже подойдут.' },
		{ term: 'Статистика', text: 'Скорость в реальном времени, встроенный тест скорости и сколько трафика потратило каждое приложение за неделю.' },
		{ term: 'Обновления', text: 'На Windows и macOS Nugget обновляется сам и перезапускается. Ничего не нужно скачивать вручную.' },
		{ term: 'Языки', text: 'Русский, Українська, English, 中文, 日本語 и فارسی' },
		{ term: 'Приватность', text: 'Без аккаунта и без слежки. Приложение только проверяет обновления и узнаёт ваш IP-адрес — и то и другое можно отключить.' },
		{ term: 'Дополнения', text: 'Дополнительные темы, шрифты и готовые настройки. Каждое получает только тот доступ, который вы разрешили.' },
		{ term: 'Внутри', text: 'sing-box, mihomo и Xray, все встроены. Трогать их не нужно, но переключиться можно в настройках.' },
		{ term: 'Открытый код', text: 'Весь код на GitHub под лицензией GPL-3.0 — любой может проверить, что именно делает приложение.' }
	],
	download: {
		title: 'Скачать Nugget',
		version: (v) => `Версия ${v}.`,
		free: 'Бесплатно, без аккаунта и регистрации.',
		all: 'Все версии',
		groups: [
			{
				system: 'Windows',
				note: '10 и 11, 64-бит',
				files: [
					{ id: 'windows-installer', label: 'Установщик (рекомендуем)' },
					{ id: 'windows-silent', label: 'Тихий установщик' },
					{ id: 'windows-zip', label: '.zip без установки' }
				]
			},
			{ system: 'macOS', note: 'Apple silicon и Intel', files: [{ id: 'macos-dmg', label: 'Образ диска (.dmg)' }] },
			{
				system: 'Linux',
				note: 'x86-64',
				files: [
					{ id: 'linux-deb', label: '.deb' },
					{ id: 'linux-rpm', label: '.rpm' },
					{ id: 'linux-appimage', label: 'AppImage' }
				]
			},
			{ system: 'Android', note: '7.0 и новее', files: [{ id: 'android-apk', label: 'Приложение (.apk)' }] },
			{
				system: 'iOS',
				note: 'iPhone и iPad, 15 и новее',
				files: [{ id: 'ios-ipa', label: 'Неподписанный .ipa' }],
				warning:
					'Для тех, кто умеет ставить приложения в обход App Store. Устанавливаете сами, с платным аккаунтом разработчика Apple. С бесплатным Apple ID приложение установится, но не подключится.'
			}
		],
		ps: 'Windows, в PowerShell',
		sh: 'macOS и Linux, в терминале',
		scripts: 'Обе команды скачивают последнюю версию с GitHub, проверяют, что её никто не подменил, устанавливают и запускают. Запустите снова, чтобы обновиться.'
	},
	faqTitle: 'Вопросы',
	faq: [
		{
			q: 'NuggetVPN — это VPN-сервис?',
			a: 'Нет, это приложение. Сам VPN вы покупаете у провайдера, которого выбрали; после оплаты он обычно присылает ссылку. Вставьте её в Nugget — и он вас подключит.'
		},
		{
			q: 'Он будет работать с моим VPN?',
			a: 'Почти наверняка. Если провайдер дал ссылку, которую нужно вставить в приложение (часто она начинается с https://, vless:// или ss://), Nugget с ней справится.'
		},
		{
			q: 'Я пользуюсь Hiddify, Happ, v2rayN или Nekoray. Можно перейти?',
			a: 'Да. Вставьте ту же ссылку, что и там: все серверы, остаток трафика и срок действия подтянутся сами.'
		},
		{
			q: 'Это бесплатно?',
			a: 'Да, полностью. Без рекламы, без аккаунта, без платной версии. Код открыт, так что так и останется.'
		},
		{
			q: 'macOS пишет, что приложение повреждено.',
			a: 'Оно не повреждено: macOS просто не знает разработчика и блокирует приложение. Откройте Терминал, вставьте xattr -cr /Applications/NuggetVPN.app, нажмите Return и откройте приложение снова. Если ставить командой выше, этой проблемы не будет.'
		},
		{
			q: 'Почему его нет в App Store?',
			a: 'Apple пускает VPN-приложения в App Store только от зарегистрированных компаний с платным аккаунтом разработчика и удаляет их в некоторых странах, в том числе в России, по требованию властей. Поэтому пока версия для iPhone — это файл, который вы устанавливаете сами, и для этого нужны определённые навыки.'
		}
	],
	footer: { by: 'от Rigby Foundation, под лицензией GPL-3.0.', source: 'Код на GitHub' }
};

export const CONTENT: Record<Lang, Content> = { en, ru };
