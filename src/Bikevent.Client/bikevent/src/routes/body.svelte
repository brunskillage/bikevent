<script>
	import Header from './header.svelte';
	import Footer from './footer.svelte';
</script>

<Header></Header>
<div class="mainContent">
	<slot><!-- optional fallback --></slot>
</div>

<Footer></Footer>

<style lang="scss">
	.mainContent {
		background-color: #333333;
		letter-spacing: 2px;
	}
</style>
