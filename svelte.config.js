import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import {mdsvex} from 'mdsvex';
import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// mdsvex config
const mdsvexConfig = {
    extensions: ['.svelte.md', '.md', '.svx'],
    layout: {
        _: './src/mdsvexlayout.svelte' // default mdsvex layout
    },
    remarkPlugins: [
        [
            remarkGithub,
            {
                // Use your own repository
                repository: 'https://github.com/merchizm/mekayalar.com.git'
            }
        ],
        remarkAbbr
    ],
    rehypePlugins: [
        rehypeSlug,
        [
            rehypeAutolinkHeadings,
            {
                behavior: 'wrap'
            }
        ]
    ]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', '.html', '.svx', ...mdsvexConfig.extensions],
    preprocess: [
        mdsvex(mdsvexConfig),
        preprocess({
            scss: {}
        })
    ],
    kit: {
        // default options are shown
        adapter: adapter()
    }
};

export default config;
