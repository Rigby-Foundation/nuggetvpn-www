/**
 * Every word on the page, in English and Russian.
 *
 * Russian is not an afterthought: most people looking for a client for their
 * VLESS or Hysteria2 subscription search in Russian, so the Russian page is
 * written for them, with its own title, description and screenshots.
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
	protocolsLead: string;
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
		groups: { system: string; note: string; files: { id: FileId; label: string }[] }[];
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
		'A free, open-source VPN client for your subscription. Works with VLESS + Reality, VMess, Trojan, Shadowsocks, Hysteria2, TUIC and WireGuard, and with Remnawave, Marzban and 3x-ui subscriptions. For Windows, macOS, Linux and Android.',
	ogLocale: 'en_US',
	skip: 'Skip to content',
	nav: { screens: 'Screens', details: 'Details', download: 'Download', home: 'NuggetVPN home', other: 'Русский' },
	hero: {
		title: 'Paste your subscription. Press the button',
		lead: 'NuggetVPN is a free VPN client, not a VPN service. It connects through the subscription your provider gave you, with any of the common protocols, and stays out of the way.',
		download: {
			windows: 'Download for Windows',
			macos: 'Download for macOS',
			linux: 'Download for Linux',
			android: 'Download for Android',
			other: 'Download'
		},
		platforms: 'Free for Windows, macOS, Linux and Android',
		terminal: 'Or install from a terminal:'
	},
	demo: {
		altOff: 'NuggetVPN’s home screen, not connected: a large connect button with Aurora VPN’s subscription and the Helsinki server below it.',
		altOn: 'The same screen connected: the button filled in gold, the connected time, download and upload speeds, latency and the public IP.',
		connect: 'Connect (demo)',
		disconnect: 'Disconnect (demo)',
		captionOff: 'Go on, press it.',
		captionOn: 'That’s the app. Everything else is optional.'
	},
	copy: { copy: 'Copy', copied: 'Copied', label: 'Copy the command' },
	protocolsLead: 'Works with any provider that speaks',
	screensTitle: 'One button on top, everything else underneath',
	screensLead: 'Most days you’ll only see the home screen. These are the parts that are there when you want them.',
	showcase: [
		{
			title: 'Every server, with its flag and its ping',
			text: 'Your provider’s servers in one list, each with its country and its latency. Pick one, or leave it on Automatic and Nugget picks the fastest.',
			alt: 'The server list: Frankfurt, Amsterdam, Helsinki, Stockholm and Warsaw, each with its flag, address, protocol and ping.',
			facts: [
				'Flags read from the server’s name, drawn on every system',
				'Test all, star favourites, sort by name or latency',
				'Servers the chosen core can’t run are marked, with the reason'
			]
		},
		{
			title: 'Choose what goes through the tunnel',
			text: 'Routing is a graph you can read: apps, sites, countries or rule lists on the left, where their traffic goes on the right. Draw a line to change it.',
			alt: 'The routing graph: Telegram, Discord and Spotify, and three domains, going through the VPN; addresses in Russia going direct.',
			facts: [
				'By app, domain, IP, port, protocol, country or downloaded list',
				'Through the VPN, straight out, blocked, or through a specific server',
				'Live counts show which rule is catching what'
			]
		},
		{
			title: 'Your plan, and your provider’s news',
			text: 'Data used, days left and the provider’s support link sit next to the button. When the provider posts a message, it shows at the top until you hide it.',
			alt: 'The home screen with a message from the provider at the top, and the subscription showing 35 GB of 186 GB used and 214 days left.',
			facts: [
				'Usage and expiry from the subscription’s own headers',
				'Announcements, folded or dismissed, with the provider’s link',
				'Subscriptions refresh on their own every six hours'
			]
		}
	],
	looks: {
		title: 'Make it look like yours',
		text: 'Over thirty themes, from Paper to Dracula and Catppuccin, or your own with a picture behind it. Pick the accent colour, the corner radius and how fast things move, and put the navigation at the bottom, the top or either side.',
		labels: ['Paper', 'Violet, inset sidebar', 'First start'],
		alts: [
			'NuggetVPN in the light Paper theme.',
			'NuggetVPN in the Violet theme with an inset sidebar.',
			'The first-start setup, choosing a theme and where the navigation goes.'
		]
	},
	detailsTitle: 'The details',
	details: [
		{ term: 'Cores', text: 'Built-in sing-box, official sing-box, mihomo and Xray, all inside the app. Switch in Settings; Nugget tells you what each one can’t do.' },
		{ term: 'Connecting', text: 'Automatic mode measures every server and connects to the fastest one, in under two seconds.' },
		{ term: 'Staying up', text: 'Reconnects on its own when the tunnel drops. The kill switch blocks traffic until it’s back.' },
		{ term: 'Subscriptions', text: 'Subscription links, single server links, sing-box and Clash configs, QR codes and screenshots of them.' },
		{ term: 'Watching', text: 'Every open connection with the app behind it, live speeds, a speed test, and traffic by app over the week.' },
		{ term: 'Plugins', text: 'Themes, fonts, routing setups and pages of their own, each in a sandbox, with only the access you allow.' },
		{ term: 'Updates', text: 'Found and installed from inside the app on Windows and macOS, then it restarts by itself.' },
		{ term: 'Languages', text: 'فارسی, English, Русский, Українська, 中文 and 日本語.' },
		{ term: 'Privacy', text: 'No account and no telemetry. It asks GitHub for updates and checks your public IP, and both can be turned off.' },
		{ term: 'License', text: 'GPL-3.0. Every line is on GitHub, and you can build it yourself.' }
	],
	download: {
		title: 'Get Nugget',
		version: (v) => `Version ${v}.`,
		free: 'Free, no account, nothing to sign up for.',
		all: 'All releases',
		groups: [
			{
				system: 'Windows',
				note: '10 and 11, 64-bit',
				files: [
					{ id: 'windows-installer', label: 'Installer' },
					{ id: 'windows-silent', label: 'Silent installer' },
					{ id: 'windows-zip', label: 'Portable .zip' }
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
			{ system: 'Android', note: '7.0 and newer', files: [{ id: 'android-apk', label: '.apk' }] }
		],
		ps: 'Windows, in PowerShell',
		sh: 'macOS and Linux, in a terminal',
		scripts: 'Both fetch the latest release from GitHub, check it against its published checksum, install it and start the app. Run them again to update.'
	},
	faqTitle: 'Questions',
	faq: [
		{
			q: 'Is NuggetVPN a VPN service?',
			a: 'No. It’s the app you connect with. You bring a subscription or a server from a provider you choose, and Nugget connects through it.'
		},
		{
			q: 'Will it work with my provider?',
			a: 'If your provider gives you a subscription link or links like vless://, vmess://, trojan:// or ss://, yes. That covers the usual panels, Remnawave, Marzban and 3x-ui among them.'
		},
		{
			q: 'I use v2rayN, Hiddify, Happ or Nekoray. Can I switch?',
			a: 'Yes. Paste the same subscription link you use there; servers, data left and the expiry date come across from the provider as they are.'
		},
		{
			q: 'Is it free?',
			a: 'Yes, and it stays that way: it’s free software under the GPL-3.0. There are no accounts, no ads and no paid tier.'
		},
		{
			q: 'macOS says the app is damaged.',
			a: 'The app isn’t signed with an Apple developer certificate, so macOS blocks it. Run xattr -cr /Applications/NuggetVPN.app in Terminal, or install with the command above, which avoids it.'
		},
		{
			q: 'What about iPhone?',
			a: 'An iOS version is being tested. It isn’t on the releases page yet.'
		}
	],
	footer: { by: 'by the Rigby Foundation, under the GPL-3.0.', source: 'Source on GitHub' }
};

const ru: Content = {
	lang: 'ru',
	screens: '/screens/ru',
	title: 'NuggetVPN: бесплатный VPN-клиент для VLESS, Reality и Hysteria2 на Windows, macOS и Linux',
	description:
		'Бесплатный VPN-клиент с открытым кодом для вашей подписки. VLESS + Reality, VMess, Trojan, Shadowsocks, Hysteria2, TUIC и WireGuard; подписки Remnawave, Marzban и 3x-ui. Для Windows, macOS, Linux и Android.',
	ogLocale: 'ru_RU',
	skip: 'Перейти к содержанию',
	nav: { screens: 'Экраны', details: 'Подробности', download: 'Скачать', home: 'NuggetVPN, главная', other: 'English' },
	hero: {
		title: 'Вставьте подписку. Нажмите кнопку',
		lead: 'NuggetVPN — бесплатный VPN-клиент, а не VPN-сервис. Он подключается через подписку, которую вам дал провайдер, по любому из распространённых протоколов, и не мешает.',
		download: {
			windows: 'Скачать для Windows',
			macos: 'Скачать для macOS',
			linux: 'Скачать для Linux',
			android: 'Скачать для Android',
			other: 'Скачать'
		},
		platforms: 'Бесплатно для Windows, macOS, Linux и Android',
		terminal: 'Или установите из терминала:'
	},
	demo: {
		altOff: 'Главный экран NuggetVPN без подключения: большая кнопка подключения, под ней подписка Aurora VPN и сервер в Хельсинки.',
		altOn: 'Тот же экран после подключения: кнопка залита золотым, время подключения, скорость загрузки и отправки, задержка и внешний IP.',
		connect: 'Подключиться (демо)',
		disconnect: 'Отключиться (демо)',
		captionOff: 'Давайте, нажмите.',
		captionOn: 'Это и есть приложение. Остальное — по желанию.'
	},
	copy: { copy: 'Копировать', copied: 'Скопировано', label: 'Скопировать команду' },
	protocolsLead: 'Работает с любым провайдером, если у него',
	screensTitle: 'Сверху одна кнопка, всё остальное — под ней',
	screensLead: 'Обычно вы видите только главный экран. Вот что есть, когда понадобится.',
	showcase: [
		{
			title: 'Каждый сервер — с флагом и пингом',
			text: 'Все серверы провайдера одним списком, у каждого — страна и задержка. Выберите сервер или оставьте «Автоматически», и Nugget выберет самый быстрый.',
			alt: 'Список серверов: Франкфурт, Амстердам, Хельсинки, Стокгольм и Варшава, у каждого флаг, адрес, протокол и пинг.',
			facts: [
				'Флаг берётся из названия сервера и рисуется на любой системе',
				'Проверка всех серверов, избранное, сортировка по имени или задержке',
				'Серверы, которые выбранное ядро не поддерживает, помечены — с причиной'
			]
		},
		{
			title: 'Решайте, что идёт через туннель',
			text: 'Маршрутизация — это понятная схема: слева приложения, сайты, страны или списки правил, справа — куда идёт их трафик. Проведите линию, чтобы изменить.',
			alt: 'Схема маршрутизации: Telegram, Discord, Spotify и три домена идут через VPN, адреса в России — напрямую.',
			facts: [
				'По приложению, домену, IP, порту, протоколу, стране или скачанному списку',
				'Через VPN, напрямую, заблокировать или через конкретный сервер',
				'Счётчики в реальном времени показывают, какое правило что ловит'
			]
		},
		{
			title: 'Ваш тариф и новости провайдера',
			text: 'Расход трафика, сколько дней осталось и ссылка на поддержку — рядом с кнопкой. Когда провайдер публикует сообщение, оно видно сверху, пока вы его не скроете.',
			alt: 'Главный экран с сообщением провайдера сверху; подписка: использовано 35 ГБ из 186 ГБ, осталось 214 дней.',
			facts: [
				'Трафик и срок — из заголовков самой подписки',
				'Объявления можно свернуть или скрыть, со ссылкой провайдера',
				'Подписки обновляются сами каждые шесть часов'
			]
		}
	],
	looks: {
		title: 'Сделайте его своим',
		text: 'Больше тридцати тем, от «Бумаги» до Dracula и Catppuccin, или своя — с картинкой на фоне. Выберите акцентный цвет, скругление углов и скорость анимаций, а навигацию поставьте снизу, сверху или сбоку.',
		labels: ['Бумага', 'Фиолетовая, встроенная боковая панель', 'Первый запуск'],
		alts: [
			'NuggetVPN в светлой теме «Бумага».',
			'NuggetVPN в фиолетовой теме со встроенной боковой панелью.',
			'Первоначальная настройка: выбор темы и положения навигации.'
		]
	},
	detailsTitle: 'Подробности',
	details: [
		{ term: 'Ядра', text: 'Встроенный sing-box, официальный sing-box, mihomo и Xray — все внутри приложения. Переключаются в настройках; Nugget подскажет, что каждое не умеет.' },
		{ term: 'Подключение', text: 'В автоматическом режиме Nugget замеряет все серверы и подключается к самому быстрому меньше чем за две секунды.' },
		{ term: 'Без обрывов', text: 'Переподключается сам, если туннель упал. Kill switch блокирует трафик, пока соединение не вернётся.' },
		{ term: 'Подписки', text: 'Ссылки на подписку, ссылки на отдельные серверы, конфиги sing-box и Clash, QR-коды и их скриншоты.' },
		{ term: 'Наблюдение', text: 'Все открытые соединения с приложением за каждым, скорость в реальном времени, тест скорости и трафик по приложениям за неделю.' },
		{ term: 'Плагины', text: 'Темы, шрифты, наборы правил и собственные страницы — каждый в песочнице и только с тем доступом, который вы разрешили.' },
		{ term: 'Обновления', text: 'На Windows и macOS находятся и ставятся прямо из приложения, после чего оно перезапускается само.' },
		{ term: 'Языки', text: 'Русский, Українська, English, 中文, 日本語 и فارسی' },
		{ term: 'Приватность', text: 'Без аккаунта и телеметрии. Приложение спрашивает GitHub об обновлениях и проверяет ваш внешний IP — и то и другое можно отключить.' },
		{ term: 'Лицензия', text: 'GPL-3.0. Весь код на GitHub, можно собрать самому.' }
	],
	download: {
		title: 'Скачать Nugget',
		version: (v) => `Версия ${v}.`,
		free: 'Бесплатно, без аккаунта и регистрации.',
		all: 'Все релизы',
		groups: [
			{
				system: 'Windows',
				note: '10 и 11, 64-бит',
				files: [
					{ id: 'windows-installer', label: 'Установщик' },
					{ id: 'windows-silent', label: 'Тихий установщик' },
					{ id: 'windows-zip', label: 'Портативный .zip' }
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
			{ system: 'Android', note: '7.0 и новее', files: [{ id: 'android-apk', label: '.apk' }] }
		],
		ps: 'Windows, в PowerShell',
		sh: 'macOS и Linux, в терминале',
		scripts: 'Обе команды берут последний релиз с GitHub, сверяют его с опубликованной контрольной суммой, устанавливают и запускают приложение. Запустите их снова, чтобы обновиться.'
	},
	faqTitle: 'Вопросы',
	faq: [
		{
			q: 'NuggetVPN — это VPN-сервис?',
			a: 'Нет. Это приложение, через которое вы подключаетесь. Подписку или сервер вы берёте у провайдера, которого выбрали сами, а Nugget подключается через него.'
		},
		{
			q: 'Он будет работать с моим провайдером?',
			a: 'Если провайдер даёт ссылку на подписку или ссылки вида vless://, vmess://, trojan:// или ss:// — да. Это обычные панели, включая Remnawave, Marzban и 3x-ui.'
		},
		{
			q: 'Я пользуюсь v2rayN, Hiddify, Happ или Nekoray. Можно перейти?',
			a: 'Да. Вставьте ту же ссылку на подписку, что и там: серверы, остаток трафика и срок действия придут от провайдера как есть.'
		},
		{
			q: 'Это бесплатно?',
			a: 'Да, и так и останется: это свободная программа под лицензией GPL-3.0. Никаких аккаунтов, рекламы и платных тарифов.'
		},
		{
			q: 'macOS пишет, что приложение повреждено.',
			a: 'Приложение не подписано сертификатом разработчика Apple, поэтому macOS его блокирует. Выполните в Терминале xattr -cr /Applications/NuggetVPN.app или установите командой выше — тогда этой проблемы не будет.'
		},
		{
			q: 'А для iPhone?',
			a: 'Версия для iOS сейчас тестируется. В релизах её пока нет.'
		}
	],
	footer: { by: 'от Rigby Foundation, под лицензией GPL-3.0.', source: 'Код на GitHub' }
};

export const CONTENT: Record<Lang, Content> = { en, ru };
