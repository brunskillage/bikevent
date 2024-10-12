/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		serverMessage: 'hello from server load function'
	};
}