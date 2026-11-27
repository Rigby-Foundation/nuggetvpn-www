import type { FileId, System } from './release';

export const SITE = 'https://nugget.rigby.lol';
export const PATHS = { en: '/', ru: '/ru/' } as const;
export type Lang = keyof typeof PATHS;

export const PLATFORMS = ['macos', 'windows', 'linux', 'android', 'ios'] as const;
export const PLATFORM_NAMES: Record<System, string> = {
	macos: 'macOS',
	windows: 'Windows',
	linux: 'Linux',
	android: 'Android',
	ios: 'iOS'
};
export const SCREENS = ['routing', 'servers', 'appearance'] as const;
export type Screen = (typeof SCREENS)[number];

interface Content {
	title: string;
	description: string;
	skip: string;
	nav: {
		screens: string;
		details: string;
		download: string;
		home: string;
		theme: string;
		language: string;
		label: string;
	};
	hero: {
		rename: string;
		title: string;
		lead: string;
		supported: string;
		demo: string;
		toggle: string;
		idle: string;
		connected: string;
		idleAlt: string;
		connectedAlt: string;
	};
	preview: {
		title: string;
		lead: string;
		examples: string;
		fullSize: string;
		screens: Record<Screen, { label: string; title: string; text: string; alt: string }>;
	};
	details: { title: string; intro: string; items: { title: string; text: string }[] };
	migration: { title: string; text: string };
	download: {
		title: string;
		intro: string;
		choose: string;
		release: string;
		files: string;
		command: string;
		windowsExtras: string;
		copy: { copy: string; copied: string; label: string };
		note: Record<System, string>;
		label: Record<FileId, string>;
	};
	faq: { title: string; items: { q: string; a: string }[] };
	footer: { by: string; source: string; docs: string; license: string };
}

const en: Content = {
	title: 'Kage | Open-source VPN and proxy client',
	description:
		'Use your VPN subscription with Kage. Import a link or QR code, pick a server, and route traffic by app or domain. Free for macOS, Windows, Linux, Android, and iOS.',
	skip: 'Skip to content',
	nav: {
		screens: 'Inside Kage',
		details: 'Features',
		download: 'Download',
		home: 'Kage home',
		theme: 'Site theme',
		language: 'Русский',
		label: 'Main navigation'
	},
	hero: {
		rename: 'NuggetVPN is now Kage',
		title: 'A VPN client that follows your rules.',
		lead: 'Bring your own subscription or server link. Connect in one click, then decide which traffic goes through the tunnel.',
		supported: 'Powered by Xray. Free and open source.',
		demo: 'Connection preview',
		toggle: 'Toggle the preview connection',
		idle: 'Disconnected',
		connected: 'Connected',
		idleAlt:
			'Kage’s Connection screen, disconnected, with an example Aurora subscription and a Helsinki server selected.',
		connectedAlt:
			'Kage’s Connection screen, connected to Helsinki, with example upload and download rates.'
	},
	preview: {
		title: 'Inside Kage',
		lead: 'From importing your first link to wiring up a custom routing setup.',
		examples: 'Kage interface shown with sample data.',
		fullSize: 'View full-size screenshot',
		screens: {
			routing: {
				label: 'Routing',
				title: 'Choose where traffic goes',
				text: 'Wire rules to the tunnel, a direct connection, or a block. Match by domain, IP range, or app. Save setups and switch between them on a schedule.',
				alt: 'Kage’s visual routing editor with example domain and IP rules wired to VPN, Direct, and Block.'
			},
			servers: {
				label: 'Servers',
				title: 'Keep your servers together',
				text: 'Import subscriptions, individual server links, or QR codes. Browse server groups and check latency before choosing a server, or let Kage pick automatically.',
				alt: 'Kage’s Profiles screen showing example servers grouped by region and an Aurora subscription.'
			},
			appearance: {
				label: 'Appearance',
				title: 'Make the app yours',
				text: 'Follow your system theme, pick a preset, or create your own palette. You can also change fonts and page transitions.',
				alt: 'Kage’s Appearance settings showing the theme picker in the light Frost preset.'
			}
		}
	},
	details: {
		title: 'What you can do with Kage',
		intro:
			'Kage runs Xray directly in the app and works with provider subscriptions and self-hosted servers.',
		items: [
			{
				title: 'Use the protocol you already have',
				text: 'Connect with VLESS (including REALITY and XTLS Vision), VMess, Trojan, Shadowsocks, Hysteria 2, WireGuard, SOCKS5, or HTTP.'
			},
			{
				title: 'Control how you connect',
				text: 'Configure DNS, proxy chains, automatic reconnect, and a kill switch. Check live Xray logs when you need to troubleshoot.'
			},
			{
				title: 'Take your setup with you',
				text: 'Export settings and profiles as a backup. Share routing setups as .vflow files or extend the desktop app with plugins.'
			}
		]
	},
	migration: {
		title: 'Coming from NuggetVPN?',
		text: 'NuggetVPN is now Kage. On desktop, Kage moves the old data folder on first launch. On Android and iOS, export a backup from NuggetVPN and import it into Kage to transfer your profiles and settings.'
	},
	download: {
		title: 'Download Kage',
		intro: 'Choose your platform to see installers and package formats.',
		choose: 'Choose a platform',
		release: 'All release files on GitHub',
		files: 'Downloads',
		command: 'Install from the terminal',
		windowsExtras: 'More Windows packages',
		copy: { copy: 'Copy', copied: 'Copied', label: 'Copy install command' },
		note: {
			macos:
				'The universal build works on both Apple silicon and Intel Macs. Open the DMG and drag Kage into Applications.',
			windows: 'Choose x64 or ARM64 to match your PC’s processor.',
			linux:
				'Packages are available for x86-64. TUN DNS requires systemd-resolved with resolvectl.',
			android:
				'The APK supports ARM64 and x86-64 devices. Open it to install Kage and accept Android’s VPN prompt on first connection.',
			ios: 'Requires iOS 15 or later. Sign the IPA with a provisioning profile that permits the Packet Tunnel Network Extension.'
		},
		label: {
			'macos-dmg': 'Universal DMG',
			'windows-x64': 'x64 installer',
			'windows-arm64': 'ARM64 installer',
			'windows-x64-silent': 'x64 silent installer',
			'windows-arm64-silent': 'ARM64 silent installer',
			'windows-x64-zip': 'x64 portable ZIP',
			'windows-arm64-zip': 'ARM64 portable ZIP',
			'linux-deb': 'DEB package',
			'linux-rpm': 'RPM package',
			'linux-appimage': 'AppImage',
			'android-apk': 'APK',
			'ios-ipa': 'Unsigned IPA'
		}
	},
	faq: {
		title: 'Common questions',
		items: [
			{
				q: 'Do I need a VPN subscription?',
				a: 'You need a subscription or an individual server configuration from your provider or your own server. Kage is the client that uses that configuration.'
			},
			{
				q: 'Can I use the same link I use in Happ, Hiddify, or v2rayN?',
				a: 'If the link uses a protocol Kage supports, you can paste it into Configs or import its QR code. Kage displays usage limits and expiry when your provider includes them.'
			},
			{
				q: 'How do I connect for the first time?',
				a: 'Open Configs, choose Add, and import your link or QR code. Choose a server or Automatic, then open Connection and press Connect. Approve your system’s VPN prompt when asked.'
			},
			{
				q: 'What happens to traffic that matches no routing rule?',
				a: 'Kage sends it to the default destination you set in Routing. You can choose the active VPN server, a direct connection, or a block.'
			}
		]
	},
	footer: {
		by: 'By the Rigby Foundation',
		source: 'Source on GitHub',
		docs: 'Documentation',
		license: 'MPL-2.0'
	}
};

const ru: Content = {
	title: 'Kage | VPN- и прокси-клиент с открытым исходным кодом',
	description:
		'Подключайте свою VPN-подписку в Kage. Импортируйте ссылку или QR-код, выбирайте сервер и настраивайте маршруты по приложениям и доменам. Бесплатно для macOS, Windows, Linux, Android и iOS.',
	skip: 'Перейти к содержанию',
	nav: {
		screens: 'Интерфейс',
		details: 'Возможности',
		download: 'Скачать',
		home: 'Kage, главная',
		theme: 'Тема сайта',
		language: 'English',
		label: 'Основная навигация'
	},
	hero: {
		rename: 'NuggetVPN теперь называется Kage',
		title: 'VPN-клиент по вашим правилам.',
		lead: 'Добавьте свою подписку или ссылку на сервер. Подключитесь одним нажатием и решите, какой трафик направить через туннель.',
		supported: 'На базе Xray. Бесплатно, с открытым кодом.',
		demo: 'Предпросмотр подключения',
		toggle: 'Переключить подключение в предпросмотре',
		idle: 'Нет подключения',
		connected: 'Подключено',
		idleAlt:
			'Экран подключения Kage. Туннель выключен, выбраны демонстрационная подписка Aurora и сервер в Хельсинки.',
		connectedAlt:
			'Экран подключения Kage с активным туннелем до Хельсинки и примером скорости загрузки и отправки.'
	},
	preview: {
		title: 'Интерфейс Kage',
		lead: 'От импорта первой ссылки до собственной схемы маршрутизации.',
		examples: 'Данные на снимках экрана приведены для примера.',
		fullSize: 'Открыть снимок целиком',
		screens: {
			routing: {
				label: 'Маршрутизация',
				title: 'Выбирайте, куда идёт трафик',
				text: 'Направляйте трафик через туннель, напрямую или блокируйте его. Создавайте правила для доменов, диапазонов IP и приложений. Сохраняйте схемы и переключайте их по расписанию.',
				alt: 'Визуальный редактор маршрутизации Kage. Правила для доменов и IP соединены с узлами VPN, прямого подключения и блокировки.'
			},
			servers: {
				label: 'Серверы',
				title: 'Все серверы в одном месте',
				text: 'Импортируйте подписки, ссылки на отдельные серверы или QR-коды. Просматривайте группы, проверяйте задержку и выбирайте сервер вручную или автоматически.',
				alt: 'Экран профилей Kage с демонстрационной подпиской Aurora и списком серверов по регионам.'
			},
			appearance: {
				label: 'Оформление',
				title: 'Настройте Kage под себя',
				text: 'Используйте системную тему, выберите готовую или создайте свою палитру. Также можно менять шрифты и анимации переходов.',
				alt: 'Настройки оформления Kage с выбором темы и активной светлой темой «Иней».'
			}
		}
	},
	details: {
		title: 'Что умеет Kage',
		intro:
			'Kage запускает Xray внутри приложения и работает с подписками провайдеров и собственными серверами.',
		items: [
			{
				title: 'Подключение по знакомому протоколу',
				text: 'Поддерживаются VLESS (включая REALITY и XTLS Vision), VMess, Trojan, Shadowsocks, Hysteria 2, WireGuard, SOCKS5 и HTTP.'
			},
			{
				title: 'Управление подключением',
				text: 'Настраивайте DNS, цепочки прокси, автоматическое переподключение и блокировку трафика при разрыве. Для диагностики доступны журналы Xray.'
			},
			{
				title: 'Перенос настроек',
				text: 'Сохраняйте резервные копии настроек и профилей. Делитесь схемами маршрутизации в формате .vflow и расширяйте настольное приложение плагинами.'
			}
		]
	},
	migration: {
		title: 'Переходите с NuggetVPN?',
		text: 'NuggetVPN теперь называется Kage. На компьютере Kage перенесёт папку данных при первом запуске. На Android и iOS экспортируйте резервную копию из NuggetVPN и импортируйте её в Kage, чтобы перенести профили и настройки.'
	},
	download: {
		title: 'Скачать Kage',
		intro: 'Выберите платформу, чтобы увидеть доступные установщики и пакеты.',
		choose: 'Выбор платформы',
		release: 'Все файлы релиза на GitHub',
		files: 'Файлы для скачивания',
		command: 'Установка из терминала',
		windowsExtras: 'Другие пакеты Windows',
		copy: { copy: 'Копировать', copied: 'Скопировано', label: 'Копировать команду установки' },
		note: {
			macos:
				'Универсальная сборка для Mac с Apple silicon и Intel. Откройте DMG и перетащите Kage в папку «Программы».',
			windows: 'Выберите x64 или ARM64 в зависимости от процессора.',
			linux:
				'Пакеты доступны для x86-64. Для DNS в режиме TUN нужны systemd-resolved и resolvectl.',
			android:
				'APK поддерживает ARM64 и x86-64. Откройте файл для установки Kage и при первом подключении разрешите создание VPN.',
			ios: 'Требуется iOS 15 или новее. Подпишите IPA профилем с разрешением на расширение Packet Tunnel Network Extension.'
		},
		label: {
			'macos-dmg': 'Универсальный DMG',
			'windows-x64': 'Установщик x64',
			'windows-arm64': 'Установщик ARM64',
			'windows-x64-silent': 'Тихая установка x64',
			'windows-arm64-silent': 'Тихая установка ARM64',
			'windows-x64-zip': 'Портативный ZIP для x64',
			'windows-arm64-zip': 'Портативный ZIP для ARM64',
			'linux-deb': 'Пакет DEB',
			'linux-rpm': 'Пакет RPM',
			'linux-appimage': 'AppImage',
			'android-apk': 'APK',
			'ios-ipa': 'Неподписанный IPA'
		}
	},
	faq: {
		title: 'Частые вопросы',
		items: [
			{
				q: 'Нужна ли VPN-подписка?',
				a: 'Вам нужна подписка или конфигурация отдельного сервера. Её можно получить у провайдера или настроить на своём сервере. Kage подключается по этой конфигурации.'
			},
			{
				q: 'Подойдёт ли моя ссылка из Happ, Hiddify или v2rayN?',
				a: 'Если ссылка использует поддерживаемый протокол, вставьте её в разделе «Конфиги» или импортируйте QR-код. Kage покажет лимит трафика и срок действия, если провайдер передаёт эти данные.'
			},
			{
				q: 'Как подключиться впервые?',
				a: 'Откройте «Конфиги», нажмите «Добавить» и импортируйте ссылку или QR-код. Выберите сервер или автоматический режим, затем откройте экран подключения и нажмите «Подключить». Подтвердите системный запрос VPN.'
			},
			{
				q: 'Куда идёт трафик, который не подходит ни под одно правило?',
				a: 'Kage направляет его по маршруту по умолчанию. В настройках маршрутизации можно выбрать активный VPN-сервер, прямое подключение или блокировку.'
			}
		]
	},
	footer: {
		by: 'От Rigby Foundation',
		source: 'Код на GitHub',
		docs: 'Документация',
		license: 'MPL-2.0'
	}
};

export const CONTENT: Record<Lang, Content> = { en, ru };
