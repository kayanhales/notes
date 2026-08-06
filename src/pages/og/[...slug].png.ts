import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';

export async function getStaticPaths() {
	const posts = await getCollection('blog');
	return posts.map((post) => ({
		params: { slug: post.id },
		props: { title: post.data.title, tags: post.data.tags },
	}));
}

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function wrapText(text: string, maxCharsPerLine: number): string[] {
	const words = text.split(' ');
	const lines: string[] = [];
	let current = '';
	for (const word of words) {
		const candidate = current ? `${current} ${word}` : word;
		if (candidate.length > maxCharsPerLine && current) {
			lines.push(current);
			current = word;
		} else {
			current = candidate;
		}
	}
	if (current) lines.push(current);
	return lines;
}

function buildSvg(title: string, tags: string[]): string {
	const lines = wrapText(title, 26).slice(0, 3);
	const titleTspans = lines
		.map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : 68}">${escapeXml(line)}</tspan>`)
		.join('');
	const tagText = tags
		.slice(0, 4)
		.map((tag) => `#${tag}`)
		.join('   ');

	return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stop-color="#b2ff9e" stop-opacity="0.35" />
				<stop offset="45%" stop-color="#ffffff" />
				<stop offset="100%" stop-color="#1dd3b0" stop-opacity="0.3" />
			</linearGradient>
		</defs>
		<rect width="1200" height="630" fill="url(#bg)" />
		<rect x="24" y="24" width="1152" height="582" fill="none" stroke="#1dd3b0" stroke-width="3" rx="16" />
		<text x="80" y="130" font-family="Verdana, Arial, sans-serif" font-size="32" font-weight="bold" fill="#086375">Kayan Clarke</text>
		<text x="80" y="290" font-family="Verdana, Arial, sans-serif" font-size="58" font-weight="bold" fill="#086375">${titleTspans}</text>
		${
			tagText
				? `<text x="80" y="560" font-family="Verdana, Arial, sans-serif" font-size="26" font-weight="bold" fill="#3c1642">${escapeXml(tagText)}</text>`
				: ''
		}
	</svg>`;
}

export const GET: APIRoute = async ({ props }) => {
	const { title, tags } = props as { title: string; tags: string[] };
	const svg = buildSvg(title, tags);
	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	return new Response(new Uint8Array(png), {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
};
