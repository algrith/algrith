import { Assets, BaseStringObject } from '@/types';
import { kebabToCamelCase } from '@/utils';

// const bucketUrl = 'https://<example-storage-bucket>.s3.us-east-2.amazonaws.com/public-assets/';
const bucketUrl = '/images/';

const remoteFiles: string[] = [
	'auth-background-pattern.svg',
	'icons/chevron-down.svg',
	'icons/google-icon.png',
];

const remoteFilesPaths = remoteFiles.reduce((acc, file) => {
	const fileName = file.split('/').pop();
	const fileKey = fileName && kebabToCamelCase(fileName.split('.')[0]);
	if (fileName && fileKey) acc[fileKey] = `${bucketUrl}${file}`;
	return acc;
}, {} as BaseStringObject);

export const assets: Assets = {
  ...remoteFilesPaths,
	brand: {
		logos: {
			white: '/images/logo/algrith-logo-light.png',
			black: '/images/logo/algrith-logo-dark.png'
		},
		icons: {
			white: '/images/logos/example-icon-white.svg',
			blue: '/images/logos/example-icon-blue.svg'
		},
	},
	icons: {
		chrome512: '/images/favicons/android-chrome-512x512.png',
		chrome192: '/images/favicons/android-chrome-192x192.png',
		safari: '/images/favicons/safari-pinned-tab.svg',
		favicon32: '/images/favicons/favicon-32x32.png',
		favicon16: '/images/favicons/favicon-16x16.png',
		apple: '/images/favicons/apple-touch-icon.png',
		favicon: '/images/favicons/favicon.ico'
	}
};