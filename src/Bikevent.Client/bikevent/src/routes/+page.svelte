<script>
	import Body from './body.svelte';
	import Box from './box.svelte';

	function handleClick() {
		alert('clicked');
	}
</script>

<Body>
	<Box>
		<button on:click|preventDefault={handleClick}>Click</button>
	</Box>
</Body>
