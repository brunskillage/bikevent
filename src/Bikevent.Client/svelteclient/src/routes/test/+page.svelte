<script>
	import Body from '../body.svelte';
</script>

<Body>
	<div class="registerPage">
		<h1>Test pure-form-message</h1>
		<form class="pure-form pure-form-stacked" method="POST">
			<label>
				Email
				<input name="email" type="text" />
			</label>
			<label>
				Password
				<input name="password" type="password" />
			</label>
			<button class="pure-button pure-button-primary">Log in</button>
		</form>
	</div>
</Body>

<style>
	.info {
		border: 2px solid white;
		padding: 2em;
		margin: 1em;
		width: 25vw;
	}

	#submit {
		margin: 2em;
	}

	.registerPage {
		padding: 2em;
		padding-left: 5em;
	}
</style>
