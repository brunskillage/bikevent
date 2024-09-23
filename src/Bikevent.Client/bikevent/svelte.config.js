import adapter from '@sveltejs/adapter-node';
import { sveltePreprocess } from 'svelte-preprocess';
export default {
	preprocess: sveltePreprocess({
		// ...svelte-preprocess options
	  }),
	kit: {
		adapter: adapter()
	}
};