<template>
	<div class="game">
    <transition name="fadeUp">
      <h1 class="announcer" v-if="showMessage">
        START
      </h1>
    </transition>
    
		<div class="monitor">
      <div class="screen">
        <div class="fake__toolbar">
          <img src="../assets/img/faketoolbar.png"/>
        </div>
        <textarea v-model="userInput" @paste="blockInput" @copy="blockInput"></textarea>
        <div class="fake__taskbar">
          <img src="../assets/img/faketaskbar.png"/>
        </div>
      </div>
      <div class="fake__button">
      </div>
    </div>

    <div class="game__ui">
      <div class="progess">
        {{progress}}/{{arrayParagraph.length - 1}}
      </div>
      <div class="keycap space" :class="{active: pressed}">SPACE LEFT: {{spaceLeft}}</div>
    </div>
	</div>
</template>

<style lang="scss" scoped>
.game {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  padding: 1rem;
  &__ui {
    display: flex;
    flex: 1;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
}
.monitor {
  width: 100%;
  height: 60%;
  padding: 1rem;
  background: #232526;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border-radius: 100% 100% 100% 100% / 6% 6% 6% 6%;
  padding-bottom: 2rem;
  overflow: hidden;
  .screen {
    height: 100%;
    width: 100%;
    background-color: white;
    border-radius: 100% 100% 100% 100% / 8% 8% 8% 8%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    overflow: hidden;
    textarea {
      background: transparent;
      outline: 0;
      flex: 1;
      border: 0;
      width: 100%;
      resize: none;
      padding: 2rem;
      overflow-x: hidden;
      overflow-y: auto;
      display: block;
      // word-break: break-all;
      font-family: "Special Elite", cursive;
      font-size: 1.25rem;
      vertical-align: middle;
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #f5f5f5;
        border-radius: 10px;
      }

      &::-webkit-scrollbar {
        width: 10px;
        background-color: #f5f5f5;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #aaa;
        border-radius: 10px;
        background-image: -webkit-linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.2) 25%,
          transparent 25%,
          transparent 50%,
          rgba(0, 0, 0, 0.2) 50%,
          rgba(0, 0, 0, 0.2) 75%,
          transparent 75%,
          transparent
        );
      }
    }
  }
}
img {
  display: block;
  width: 100%;
}

.fake__button {
  height: 50px;
  background-image: url('../assets/img/IBEEM.png');
  background-repeat: no-repeat;
  background-size: auto 15px;
  background-position: center 8px;

}
.keycap {
  border: 1px solid gray;
  background-color: white;
  font-size: 1.2em;
  box-shadow: 1px 0 1px 0 #eee, 0 2px 0 2px #ccc, 0 2px 0 3px #444;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  margin: 2px 3px;
  padding: 1px 5px;
  text-align: center;
  line-height: 3rem;
  font-size: 1.5rem;
  transition: 0.1s ease-in-out;
  &.active {
    margin-top: 1px;
    background-color: #ffd6d6;
    box-shadow: 1px -1px 1px 0 #eee, 0 1px 0 2px #ccc, 0 1px 0 3px #444;
    -webkit-animation: shake-bottom 0.2s ease-in-out both;
    animation: shake-bottom 0.2s ease-in-out both;
    transition: 0.1s ease-in-out;
  }
}
.space {
  width: 70%;
  max-width: 70%;
  margin: 0 auto;
}
.announcer {
  position: absolute;
  background-color: transparentize($color: #000000, $amount: 0.3);
  font-family: "Special Elite", cursive;
  color: white;
  font-size: 5rem;
  line-height: 10rem;
  width: 100%;
  margin: 0 -1rem;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}
</style>

<script>
export default {
  name: "Game",
  props: {
    arrayParagraph: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      userInput: "",
      pressed: false,
      showMessage: true,
      timer: ""
    };
  },
  created() {
    const vm = this;
    window.addEventListener("keydown", this.handleKd);
    this.userInput = this.paragraph;
    setTimeout(function() {
      vm.showMessage = false;
      setTimeout(function() {
        vm.triggerTimer();
      }, 1000);
    }, 1000);
  },
  beforeDestroy: function() {
    window.removeEventListener("keydown", this.handleKd);
  },
  computed: {
    paragraph: function() {
      if (this.arrayParagraph == "") {
        return "";
      }
      let realParagraph = this.arrayParagraph.join("");
      return realParagraph;
    },
    score: function() {
      return this.$store.state.score;
    },
    spaceLeft: function() {
      return this.$store.state.spaceLeft;
    },
    arrayInput: function() {
      if (this.userInput.indexOf(" ") == -1) {
        return [];
      }
      return this.userInput.split(/\s+/);
    },
    progress: function() {
      const sample = this.arrayParagraph;
      const input = this.arrayInput;
      let point = 0;
      if (sample.length > 0 && input.length > 0) {
        sample.forEach((val, index) => {
          if (index < input.length) {
            if (input[index].localeCompare(val) == 0) {
              point += 1;
            }
          }
        });
      }
      console.log(point);
      return point;
    }
  },
  watch: {
    spaceLeft(val) {
      if (val == 0 && !this.$store.state.isLose) {
        console.log("Clear");
        clearInterval(this.timer);
        this.$store.commit("toggleLose");
      }
      if (val < 0) {
        this.$store.commit("setSpaceLeft", 0);
      }
    },
    progress(newVal, oldVal) {
      if (newVal > oldVal) {
        this.$store.commit("addSpaceLeft", 1);
      }
      if (newVal == this.arrayParagraph.length) {
        this.setScore = this.$store.state.spaceLeft + this.spaceLeft;
        this.$store.dispatch("youWin");
      }
    },
    value(value) {
      this.localScore = value;
    },
    localScore(value) {
      this.value = value;
    },
    paragraph(value) {
      this.userInput = value;
    }
    // userInput(newVal, oldVal) {
    //   if(newVal.length < oldVal.length) {
    //     console.log("DONT");
    //   }
    // }
  },
  methods: {
    setScore(newVal) {
      this.$store.commit("setScore", newVal);
    },
    blockInput(e) {
      e.preventDefault();
    },
    triggerTimer() {
      const vm = this;
      const time = 1234 - 111 * vm.$store.state.currentLevel;
      vm.timer = setInterval(function() {
        vm.$store.commit("addSpaceLeft", -1);
      }, time);
    },
    handleResult() {},
    handleKd(e) {
      const vm = this;
      let keycode = e.which || e.keycode;
      if (
        keycode != 32 &&
        keycode != 8 &&
        keycode != 37 &&
        keycode != 38 &&
        keycode != 39 &&
        keycode != 40
      ) {
        e.preventDefault();
      } else if (keycode == 32) {
        vm.$store.commit("addSpaceLeft", -1);
        this.pressed = true;
        setTimeout(function() {
          vm.pressed = false;
        }, 100);
      }
    }
  }
};
</script>
