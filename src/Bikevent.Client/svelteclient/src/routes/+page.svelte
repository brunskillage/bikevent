<script>
	import Body from './body.svelte';
</script>

<Body>
	<div class="mainPage">
		<div class="row">
			<div class="mainImage">
				<!-- svelte-ignore a11y-missing-attribute -->
				<!-- <img class="bikeSvg" src="./noun-motorcycle-6936640-FFFFFF.svg" /> -->
				<img class="bikeSvg" src="./noun-motorcycle-6863411-FFFFFF.svg" />
			</div>
			<div class="mainText">Welcome to Bikevent.co.nz</div>
			<div class="secondText">New Zealands Premier Site for motorbike rides and events</div>
			<div class="actionBar">
				<a class="pure-button pure-button-primary" href="/club/register">Register your club</a>
				<a class="pure-button pure-button-primary" href="/login">Login</a>
			</div>
		</div>
	</div>
</Body>

<style>
	.actionBar {
		text-align: center;
	}

	.mainPage {
		height: 100%;
		padding: 0;
		margin: 0;
		display: flex;
		/* align-items: center;
		justify-content: center; */
	}
	.row {
		/* height: auto; */
	}

	.mainText {
		font-size: 3em;
		text-align: center;
		padding: 0.5em;
	}
	.secondText {
		font-size: 2em;
		text-align: center;
		padding: 1em;
	}

	.mainImage {
		display: flex;
		background-color: grey;
		width: 100vw;
		height: 20vh;
		align-items: center;
		align-content: center;
		justify-content: center;
	}

	.bikeSvg {
		width: 20vh;
		position: absolute;
		-webkit-animation: linear;
		-webkit-animation-name: run;
		-webkit-animation-duration: 2s;
		animation-iteration-count: 1;
	}

	@-webkit-keyframes run {
		0% {
			left: 0;
		}
		50% {
			left: 25%;
		}
		100% {
			left: 300%;
		}
	}
</style>
