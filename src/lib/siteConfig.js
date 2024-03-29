export const SITE_URL = 'https://mekayalar.com';
export const APPROVED_POSTERS_GH_USERNAME = ['merchizm'];
export const GH_USER_REPO = 'merchizm/mekayalar.com';
export const REPO_URL = 'https://github.com/' + GH_USER_REPO;
export const REPO_OWNER = GH_USER_REPO.split('/')[0];
export const GH_PUBLISHED_TAGS = ['Published'];
export const SITE_TITLE = 'Meriç Enes Kayalar';
export const YOUR_TITLE = 'pixel(art) - yazılım - travel';
export const SPOTIFY_API_RES = 'https://vasak.dev/api/spotify/json';

export const GISCUS = {
	repo: 'merchizm/mekayalar.com',
	repoId: import.meta.env.VITE_GISCUS_REPO_ID,
	category: 'Web Site Comments',
	categoryId: import.meta.env.VITE_GISCUS_CATEGORY_ID,
	language: 'en'
};

export const SOCIAL_CONNECTIONS = {
	twitter: 'merchizm',
	mail: 'merich@duck.com',
	linkedin: 'enes-kayalar-88b3851b6', // pathname or username
	github: 'merchizm',
	spotify: 'https://open.spotify.com/user/hkt7thwkuynqutz8jenb3x0wu?si=b6d3752d5e644bd0' // full url
};

// Library Preferences
export const GITHUB = {
	maximum_repos: 5,
	maximum_gists: 4
};

export const NAVIGATION = [
	{
		url: '/',
		name: 'Hakkımda'
	},
	{
		url: '/notes',
		name: 'Notlar'
	},
	{
		url: '/library',
		name: 'Kütüphane'
	},
	{
		url: '/bookmarks',
		name: 'Yer İmleri'
	}
];
