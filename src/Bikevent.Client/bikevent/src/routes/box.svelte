<script>
	function handleClick() {
		alert('clicked');
	}
</script>

<div class="box">
	<slot><!-- optional fallback --></slot>
</div>

<style>
	.box {
		background-color: black;
		color: white;
		padding: 5px;
		margin: 5px;
	}
</style>
