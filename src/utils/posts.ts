import { type CollectionEntry, getCollection } from 'astro:content';

export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
	const posts = await getCollection('blog');
	return import.meta.env.DEV ? posts : posts.filter((post) => !post.data.draft);
}
