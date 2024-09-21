<script>
	import Header from './header.svelte';
	import Footer from './footer.svelte';
</script>

<Header></Header>
<div class="content">
	<slot><!-- optional fallback --></slot>
</div>
<Footer></Footer>

<style global>
	:global(body) {
		font-family: 'Roboto';
	}

	.content {
		flex: auto;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
