<template>
  <div class="main">
    <transition name="fade">
      <Lose v-if="isLose"/>
    </transition>
    <transition name="fadeUp">
      <Intro v-if="currentStage == 0"/>
      <Story v-else-if="currentStage == 1"/>
      <Guide v-else-if="currentStage == 2"/>
      <Game v-else-if="currentStage == 3" :array-paragraph="arrayParagraph"/>
    </transition>
    
  </div>
</template>
<style lang="scss" scoped>
@import "~bulma/sass/utilities/all";
@import "~bulma/sass/elements/button";
.main {
  height: 100vh;
  // background-color: #F0A821;
  background: #f0a821;
  background: -moz-linear-gradient(-121deg, #f0a821 0%, #ffb04f 100%);
  background: -webkit-linear-gradient(-121deg, #F0A8211 0%, #ffb04f 100%);
  background: linear-gradient(-121deg, #f0a821 0%, #ffb04f 100%);
  position: relative;
  width: 500px;
  min-width: 500px;
  margin: 0 auto;
  overflow: hidden;
}
</style>

<script>
// @ is an alias to /src
// Component import
import Intro from "@/components/Intro.vue";
import Game from "@/components/Game.vue";
import Lose from "@/components/Lose.vue";
import Story from "@/components/Story.vue";
import Guide from "@/components/Guide.vue";
// Game data import
import paragraphs from "@/data/challenges.json";

export default {
  name: "Main",
  components: {
    Intro,
    Game,
    Lose,
    Story,
    Guide
  },
  data() {
    return {
      currentStage: 0,
      challenges: paragraphs.paragraphs
    };
  },
  computed: {
    isLose: function() {
      return this.$store.state.isLose;
    },
    currentLevel: function() {
      return this.$store.state.currentLevel;
    },
    arrayParagraph: function() {
      if (this.currentLevel == -1) {
        return [];
      }
      let arrQues = this.challenges[this.currentLevel].split(/\s+/);
      return arrQues;
    },
    score: function() {
      return this.$store.state.score;
    },
    nextLvlSignal: function() {
      return this.$store.state.triggerNextLvl;
    },
    resetGame: function() {
      return this.$store.state.resetGame;
    }
  },
  watch: {
    nextLvlSignal(value) {
      if (value) {
        const vm = this;
        this.currentStage = 5;
        setTimeout(() => {
          vm.currentStage = 3;
        }, 50);
        this.clearAllInterval();
      }
    },
    resetGame(value) {
      if (value) {
        this.currentStage = 0;
        this.clearAllInterval();
        window.addEventListener("keydown", this.keyHandler);
      }
    },
    currentStage(value) {
      if (value > 2) {
        window.removeEventListener("keydown", this.keyHandler);
      }
    },
    arrayParagraph: function(val) {
      // Init spaces for paragraph
      this.$store.commit(
        "setSpaceLeft",
        val.length + Math.round(val.length * 0.1)
      );
    }
  },
  created: function() {
    window.addEventListener("keydown", this.keyHandler);
  },
  beforeDestroy: function() {
    window.removeEventListener("keydown", this.keyHandler);
  },
  methods: {
    clearAllInterval() {
      for (var i = 1; i < 100; i++) window.clearInterval(i);
    },
    keyHandler: function(e) {
      const keycode = e.keycode || e.which;
      // In case of having other scopes in this function
      // const vm = this;

      if (keycode != 32) {

        if (this.currentStage == 0) {
          this.currentStage = 1;
        }
        else if (this.currentStage == 1) {
          this.currentStage = 2;
        }
        else if (this.currentStage == 2) {
          this.currentStage = 3;
          this.$store.commit("setCurrentLevel", this.currentLevel + 1);
        }
      }
      // Disable keys
      if (keycode == 17 || (keycode == 18 && this.currentStage != 0)) {
        e.preventDefault();
      }
    }
  }
};
</script>
