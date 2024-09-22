<script>
	import Body from '../body.svelte';

	export let data;
</script>

<Body>
	<h1>Events</h1>
	<p>{data.serverMessage}</p>
</Body>
