<template>
  <div class="menu">
    <div class="game-logo"></div>
    <div class="start-game">
      Do not press [SPACE] to start the game
    </div>
  </div>
</template>

<script>
export default {
  name: 'intro',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.menu {
  position: absolute;
  height: 100%;
  width: 100%;
}
.game-logo {
  background-image: url('../assets/img/game-title.png');
  background-size: cover;
  background-position: 45%;
  background-repeat: no-repeat;
  height: 70vh;
  width: 100%;
}
.start-game {
    margin: 2rem auto 0;
    text-align: center;
    font-family: 'Special Elite', cursive;
    color: rgb(54, 54, 54);
    text-transform: uppercase;
    max-width: 70%;
    font-size: 2rem;
    -webkit-animation: blink-1 6s cubic-bezier(0.645, 0.045, 0.355, 1.000) infinite both;
    animation: blink-1 6s cubic-bezier(0.645, 0.045, 0.355, 1.000) infinite both;
  }
</style>
