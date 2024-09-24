<script>
	import BvCheckbox from '$lib/BvComponents/BvCheckbox.svelte';
	import BvInput from '$lib/BvComponents/BvInput.svelte';
	import Body from '../../body.svelte';
	export let form;

	let errors = form?.errors;
	let formData = form?.data;
	//console.log(form);
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
		Note you can add more info later

		<form class="pure-form pure-form-stacked" method="POST">
			<fieldset>
				<legend>Club Registration</legend>

				<BvInput
					nameOf="clubName"
					label="Club Name *"
					val={formData?.clubName}
					error={errors?.clubName?.error}
					prompt="eg Social Riders"
					placeHolder="eg Social Riders"
				></BvInput>

				<BvInput
					nameOf="clubPresident"
					label="Club President *"
					val={formData?.clubPresident}
					error={errors?.clubPresident?.error}
					prompt=""
					placeHolder="eg Main contact name"
				></BvInput>

				<BvInput
					nameOf="clubEmail"
					label="Club Email *"
					val={formData?.clubEmail}
					error={errors?.clubEmail?.error}
					prompt=""
					placeHolder="eg contact@myclub.com"
				></BvInput>

				<BvInput
					nameOf="clubDescription"
					label="Club Description *"
					val={formData?.clubDescription}
					error={errors?.clubDescription?.error}
					prompt=""
					placeHolder="eg Casual group events"
				></BvInput>

				<BvCheckbox
					nameOf="hsBranches"
					isChecked={form?.data?.hasBranches === 'on'}
					label="Tick if your club has Branches"
				></BvCheckbox>

				<BvInput
					nameOf="clubWebsite"
					label="Website Address"
					val={formData?.clubWebsite}
					error={errors?.clubWebsite?.error}
					prompt="Wesite address"
					placeHolder="eg http://www.myclubsite.com"
				></BvInput>

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
</style>
