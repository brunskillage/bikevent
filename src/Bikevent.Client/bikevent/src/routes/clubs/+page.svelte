<script>
	// @ts-nocheck

	import Body from '../body.svelte';

	export let data;
	console.log(data);
</script>

<Body>
	<h1>Clubs</h1>
	{#each data.clubs as club}
		<h1>{club.nameOf}</h1>
	{/each}
</Body>
