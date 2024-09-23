<script>
	import Body from '../../body.svelte';
	export let form;

	let errors = form?.errors;
	let formData = form?.data;
	console.log(form);
</script>

<Body>
	<div class="registerPage">
		<!-- <div>
			{@html JSON.stringify(form)}
		</div> -->

		<h1>Register your Club</h1>

		{#if errors && errors.length}
			<div class="errors">
				<h1>Cannot submit just yet, Please check the messages</h1>
			</div>
		{/if}

		<p>The process is as follows</p>
		<ol>
			<li>
				Does your club have branches? If so add your club first then you can add branches (for
				larger clubs)
			</li>
			<li>Submit for checking</li>
		</ol>

		<form class="pure-form pure-form-stacked" method="POST">
			<fieldset>
				<legend>Club Registration</legend>
				<label for="clubName">Club Name *</label>
				<input
					type="text"
					name="clubName"
					placeholder="Club Name"
					value={form?.data?.clubName ?? ''}
				/>
				{#if !errors?.clubName?.error}
					<span class="pure-form-message">This is a required field.</span>
				{:else}
					<span class="error">{errors?.clubName?.error} XX</span>
				{/if}

				<div class="spacer"></div>
				<label for="clubPresident">President *</label>
				<input
					type="text"
					name="clubPresident"
					placeholder="Leader / President Name"
					value={form?.data?.clubPresident ?? ''}
				/>
				{#if !errors?.clubPresident?.error}
					<span class="pure-form-message">This is a required field.</span>
				{:else}
					<span class="error">{errors?.clubPresident?.error}</span>
				{/if}

				<div class="spacer"></div>
				<label for="clubEmail">Email *</label>
				<input
					type="text"
					name="clubEmail"
					placeholder="Email"
					value={form?.data?.clubEmail ?? ''}
				/>
				{#if !errors?.clubEmail?.error}
					<span class="pure-form-message">This is a required field.</span>
				{:else}
					<span class="error">{errors?.clubEmail?.error}</span>
				{/if}

				<div class="spacer"></div>
				<label for="clubDescription">Club Description</label>
				<input
					type="text"
					name="clubDescription"
					placeholder="Club Description"
					value={form?.data?.clubDescription ?? ''}
				/>
				{#if !errors?.clubDescription?.error}
					<span class="pure-form-message">optionl, Max Length 255.</span>
				{:else}
					<span class="error">{errors?.clubDescription?.error}</span>
				{/if}

				<div class="spacer"></div>
				<div class="checkField">
					<span class="box">
						<input
							id="hasBranches"
							type="checkbox"
							name="hasBranches"
							checked={form?.data?.hasBranches === 'on'}
						/>
					</span>
					<span class="checkBoxLabel">Tick if your club has Branches </span>
				</div>

				<div class="info">
					Before submitting you form will be checked, if it's all good then your registration will
					be submitted
				</div>
				<div>&nbsp;</div>
				<button class="pure-button pure-button-primary" type="submit">Check Form</button>
			</fieldset>
		</form>
	</div></Body
>

<style>
	.registerPage {
		padding: 2em;
		padding-left: 5em;
		width: 30em;
	}

	.spacer {
		margin-top: 1em;
	}

	/* #hasBranches {
		width: 10em;
		text-align: left;
		border: 1px solid red;
	} */

	.checkField .box {
		width: 2em;
	}
	.checkBoxLabel {
		width: 5em;
	}
</style>
