/**
 * The latest release, read from GitHub in the browser.
 *
 * Release files carry the version in their names (NuggetVPN-v2.3.0-...), so
 * a static page cannot link to them directly. Until the answer arrives, or if
 * it never does, every link points at the releases page instead.
 */

export const REPO = 'Rigby-Foundation/NuggetVPN';
export const RELEASES_URL = `https://github.com/${REPO}/releases/latest`;
export const REPO_URL = `https://github.com/${REPO}`;

export const INSTALL_PS = `irm https://raw.githubusercontent.com/${REPO}/main/scripts/install.ps1 | iex`;
export const INSTALL_SH = `curl -fsSL https://raw.githubusercontent.com/${REPO}/main/scripts/install.sh | sh`;

export type FileId =
	| 'windows-installer'
	| 'windows-silent'
	| 'windows-zip'
	| 'macos-dmg'
	| 'linux-deb'
	| 'linux-rpm'
	| 'linux-appimage'
	| 'android-apk';

/** Each file by the end of its name, as the release workflow names them. */
const SUFFIXES: Record<FileId, string> = {
	'windows-installer': '-windows-amd64-installer.exe',
	'windows-silent': '-windows-amd64-silent-installer.exe',
	'windows-zip': '-windows-amd64.zip',
	'macos-dmg': '-macos-universal.dmg',
	'linux-deb': '-linux-amd64.deb',
	'linux-rpm': '-linux-amd64.rpm',
	'linux-appimage': '-linux-amd64.AppImage',
	'android-apk': '-android.apk'
};

export interface ReleaseFile {
	url: string;
	size: number;
}

export interface Release {
	version: string;
	files: Partial<Record<FileId, ReleaseFile>>;
}

export async function latestRelease(): Promise<Release | null> {
	try {
		const response = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
			headers: { Accept: 'application/vnd.github+json' }
		});
		if (!response.ok) return null;
		const data = await response.json();
		const files: Release['files'] = {};
		for (const [id, suffix] of Object.entries(SUFFIXES) as [FileId, string][]) {
			const asset = (data.assets ?? []).find((a: { name: string }) => a.name.endsWith(suffix));
			if (asset) files[id] = { url: asset.browser_download_url, size: asset.size };
		}
		return { version: String(data.tag_name ?? '').replace(/^v/, ''), files };
	} catch {
		return null;
	}
}

export type System = 'windows' | 'macos' | 'linux' | 'android' | 'other';

/** The visitor's system, for the first download button. */
export function detectSystem(): System {
	const ua = navigator.userAgent;
	if (/Android/i.test(ua)) return 'android';
	if (/iPhone|iPad|iPod/i.test(ua)) return 'other';
	if (/Windows/i.test(ua)) return 'windows';
	if (/Mac OS X|Macintosh/i.test(ua)) return 'macos';
	if (/Linux|X11/i.test(ua)) return 'linux';
	return 'other';
}

export function formatSize(bytes: number): string {
	return `${Math.round(bytes / 1e6)} MB`;
}
