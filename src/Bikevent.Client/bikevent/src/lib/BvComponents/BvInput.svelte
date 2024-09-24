<script>
	export let nameOf;
	export let label;
	export let error;
	export let val;
	export let prompt;
	export let placeHolder;
</script>

<div class="spacer"></div>

<label for={nameOf}>{label}</label>
<input type="text" name={nameOf} placeholder={placeHolder ?? ''} value={val ?? ''} />
{#if !error && prompt}
	<span class="pure-form-message">{prompt}.</span>
{:else if error}
	<span class="error">{error}</span>
{/if}

<style>
	.spacer {
		margin-top: 1em;
	}
</style>
