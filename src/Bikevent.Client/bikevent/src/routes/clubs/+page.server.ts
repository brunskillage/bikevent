import { Club } from "../../hooks.server";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		clubs: await Club.findAll({ raw: true })
	};
}