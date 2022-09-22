<template>
  <div class="sm:w-[60%] md:w-[80%] mt-5 flex m-auto justify-between items-center">

    <div class="sm:hidden md:block text-grey-darker hover:bg-gray-300 rounded-full p-2">
      <RandomIcon :random="random" />
    </div>

    <div class="text-grey-darker hover:bg-gray-300 rounded-full p-1">
      <PreviousIcon :prevButton="prevButton" :previous="previous" />
    </div>

    <div v-if="!pauseTrack" @click="play()"
      class="cursor-pointer text-white sm:p-3 md:p-3 lg:p-4 rounded-full bg shadow-lg">
      <PlayIcon />
    </div>

    <div v-else @click="pause()" class="cursor-pointer text-white sm:p-3 md:p-3 lg:p-4 rounded-full bg shadow-lg">
      <PauseIcon />
    </div>

    <div class="text-grey-darker hover:bg-gray-300 rounded-full p-1">
      <NextIcon :nextButton="nextButton" :next="next" />
    </div>

    <div class="sm:hidden md:block text-grey-darker hover:bg-gray-300 rounded-full p-2">
      <RepeatIcon :repeat="r" />
    </div>
  </div>
</template>

<script>
import RandomIcon from './RandomIcon.vue';
import PreviousIcon from './PreviousIcon.vue';
import PlayIcon from './PlayIcon.vue';
import PauseIcon from './PauseIcon.vue';
import NextIcon from './NextIcon.vue';
import RepeatIcon from './RepeatIcon.vue';

export default {
  name: "Control",
  components: { RandomIcon, PreviousIcon, PlayIcon, PauseIcon, NextIcon, RepeatIcon },
  props: ["random", "prevButton", "pauseTrack", "nextButton", "repeat"],
  setup(props, context) {
    //emit previous
    const previous = () => {
      context.emit("emitPrevious");
    };
    //emit next
    const next = () => {
      context.emit("emitNext");
    };
    //emit play
    const play = () => {
      context.emit("emitPlay");
    };
    //emit play
    const pause = () => {
      context.emit("emitPause");
    };
    //return data
    return {
      previous,
      next,
      play,
      pause
    };
  },
}
</script>

<style>

</style>
