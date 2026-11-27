export const REPO = 'Rigby-Foundation/Kage';
export const REPO_URL = `https://github.com/${REPO}`;
export const RELEASES_URL = `${REPO_URL}/releases/latest`;
export const DOCS_URL = `${REPO_URL}/blob/main/docs/README.md`;
export const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`;

export const INSTALL_PS = `irm https://raw.githubusercontent.com/${REPO}/main/scripts/install.ps1 | iex`;
export const INSTALL_SH = `curl -fsSL https://raw.githubusercontent.com/${REPO}/main/scripts/install.sh | sh`;

const SUFFIXES = {
	'macos-dmg': '-macos-universal.dmg',
	'windows-x64': '-windows-amd64-installer.exe',
	'windows-arm64': '-windows-arm64-installer.exe',
	'windows-x64-silent': '-windows-amd64-silent-installer.exe',
	'windows-arm64-silent': '-windows-arm64-silent-installer.exe',
	'windows-x64-zip': '-windows-amd64.zip',
	'windows-arm64-zip': '-windows-arm64.zip',
	'linux-deb': '-linux-amd64.deb',
	'linux-rpm': '-linux-amd64.rpm',
	'linux-appimage': '-linux-amd64.AppImage',
	'android-apk': '-android.apk',
	'ios-ipa': '-ios-unsigned.ipa'
} as const;

export type FileId = keyof typeof SUFFIXES;
export type System = 'windows' | 'macos' | 'linux' | 'android' | 'ios';

export const PLATFORM_FILES: Record<System, FileId[]> = {
	macos: ['macos-dmg'],
	windows: ['windows-x64', 'windows-arm64'],
	linux: ['linux-deb', 'linux-rpm', 'linux-appimage'],
	android: ['android-apk'],
	ios: ['ios-ipa']
};

export const WINDOWS_EXTRAS: FileId[] = [
	'windows-x64-silent',
	'windows-arm64-silent',
	'windows-x64-zip',
	'windows-arm64-zip'
];

interface ReleaseFile {
	url: string;
	size: number;
}

export interface Release {
	version: string;
	files: Partial<Record<FileId, ReleaseFile>>;
}

interface GitHubAsset {
	name: string;
	browser_download_url: string;
	size: number;
}

export async function latestRelease(): Promise<Release | null> {
	try {
		const response = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
			headers: { Accept: 'application/vnd.github+json' }
		});
		if (!response.ok) return null;
		const data: { tag_name?: string; assets?: GitHubAsset[] } = await response.json();
		if (!data.tag_name) return null;

		const files: Release['files'] = {};
		for (const id of Object.keys(SUFFIXES) as FileId[]) {
			const asset = data.assets?.find((item) => item.name.endsWith(SUFFIXES[id]));
			if (asset) files[id] = { url: asset.browser_download_url, size: asset.size };
		}
		return { version: data.tag_name, files };
	} catch {
		return null;
	}
}

export function detectSystem(
	device: Pick<Navigator, 'userAgent' | 'platform' | 'maxTouchPoints'>
): System | undefined {
	const { userAgent, platform, maxTouchPoints } = device;
	if (/Android/i.test(userAgent)) return 'android';
	if (/iPhone|iPad|iPod/i.test(userAgent) || (/Mac/i.test(platform) && maxTouchPoints > 1))
		return 'ios';
	if (/Windows/i.test(userAgent)) return 'windows';
	if (/Macintosh|Mac OS X/i.test(userAgent)) return 'macos';
	if (/Linux|X11/i.test(userAgent)) return 'linux';
	return undefined;
}

export function formatSize(bytes: number, lang: string): string {
	return new Intl.NumberFormat(lang, {
		style: 'unit',
		unit: 'megabyte',
		maximumFractionDigits: 0
	}).format(bytes / 1e6);
}
