import { redirect } from '@sveltejs/kit';

const mappings = new Map([
	['/docs/svelte-components', '/docs/svelte/svelte-files'],
	['/docs/logic-blocks', '/docs/svelte/control-flow'],
	['/docs/special-tags', '/docs/svelte/basic-markup'], // TODO: find a new home for some of these?
	['/docs/element-directives', '/docs/svelte/basic-markup'],
	['/docs/component-directives', '/docs/svelte/svelte-files'],
	['/docs/custom-elements-api', '/docs/svelte/custom-elements'],
	['/docs/accessibility-warnings', '/docs/svelte/compiler-warnings']
]);

// selectively preload fonts
const fonts = [
	'dm-serif-display-latin-400-normal',
	'eb-garamond-latin-400-normal',
	'fira-sans-latin-400-normal'
];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// Best effort to redirect from Svelte 4 docs to new docs
	if (event.url.pathname.startsWith('/docs')) {
		const destination = mappings.get(event.url.pathname);
		if (destination) {
			redirect(307, destination); // TODO make 301 once we're sure
		}
	}

	const response = await resolve(event, {
		preload: ({ type, path }) => {
			if (type === 'font') {
				if (!path.endsWith('.woff2')) return false;
				return fonts.some((font) => path.includes(font));
			}

			return type === 'js' || type === 'css'; // future-proof, if we add `assets` later
		}
	});

	return response;
}
