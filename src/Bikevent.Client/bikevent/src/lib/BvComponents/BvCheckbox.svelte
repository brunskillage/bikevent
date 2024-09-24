<script>
	export let nameOf;
	export let isChecked;
	export let label;
</script>

<div class="spacer"></div>
<div class="checkField">
	<span class="box">
		<input id={nameOf} type="checkbox" name={nameOf} checked={isChecked} />
	</span>
	<span class="checkBoxLabel">{label}</span>
</div>

<style>
	.spacer {
		margin-top: 1em;
	}
	.checkField .box {
		width: 2em;
	}
	.checkBoxLabel {
		width: 5em;
	}
</style>
