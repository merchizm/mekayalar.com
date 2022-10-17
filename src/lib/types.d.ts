export type DateListItem = {
    label: string,
    title: string,
    location: string,
    desc: string
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
    reactions: GHReactions;
};

export type Music = {
    name: string;
    artists: Artists[];
    is_playing: boolean;
    url: string;
}

export type Artists = {
    external_urls: External_urls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export type External_urls = {
    spotify: string;
}