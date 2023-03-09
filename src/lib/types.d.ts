export type DateListItem = {
	label: string;
	title: string;
	location: string;
	desc: string;
};

export type ContentItem = {
	type: 'blog';
	content: string;
	frontmatter: {
		[key: string]: string;
	};
	title: string;
	subtitle: string;
	description: string;
	category: string;
	tags: string[];
	image: string;
	canonical: string;
	slug: string;
	date: Date;
	ghMetadata: GHMetadata;
};

export type GHMetadata = {
	issueUrl: string;
	commentsUrl: string;
	title: string;
	created_at: Date;
	updated_at: Date;
	reactions: {
		[key: string]: string;
	};
};

export type Music = {
	name: string;
	artists: string;
	is_playing: boolean;
	url: string;
};

export type Bookmark = {
	excerpt: string;
	note: string;
	type: string;
	cover: string;
	tags: string[];
	removed: boolean;
	_id: bigint;
	title: string;
	collection: {
		[$ref: string]: string;
		[$id: string]: bigint;
		[$db: string]: string;
	};
	link: string;
	created: Date;
	lastUpdate: Date;
	important: boolean;
	media: [
		{
			type: string;
			link: string;
		}
	];
	user: {
		[$ref: string]: string;
		[$id: string]: bigint;
		[$db: string]: string;
	};
	highlights: string[];
	domain: string;
	creatorRef: {
		avatar: string;
		_id: bigint;
		name: string;
		email: string;
	};
	sort: bigint;
	collectionId: bigint;
};
