<template>
	<div class="lose" @click="mainMenu">
		<p class="score">SCORE: {{$store.state.score}}</p>
	</div>
</template>

<script>
export default {
	methods: {
		mainMenu() {
			this.$store.dispatch('youLose');
		}
	}
}
</script>

<style lang="scss" scoped>
	.score {
		margin-top: 40%;
		font-size: 2rem;
		font-family: 'Special Elite', cursive;
		color: white;

	}
	.lose {
		height: 100%;
		width: 100%;
		position: absolute;
		background-color: transparentize($color: #000000, $amount: 0.1);
		background-image: url('../assets/img/losescreen.png');
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
