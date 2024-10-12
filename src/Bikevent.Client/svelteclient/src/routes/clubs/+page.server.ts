import type { Actions } from './$types';

export const actions = {
	default: async (event) => {
		// TODO log the user in
		//console.dir(event)

		const form = await event.request.formData();
		console.log(form)
		// const email = fo('email');
		// const message = form.get('message');
		// const data = await request.formData();
	},
} satisfies Actions;