<template>
  <div class="sm:w-[90%] md:w-[15%] lg:w-[15%]">
    <div class="flex justify-between items-center gap-x-2">
      <!-- icon volume -->
      <div class="hover:bg-gray-300 p-1 rounded-full" @click="mute()">
        <svg v-if="mutePlayer" class="w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            clip-rule="evenodd" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
        <svg v-else class="w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      </div>
      <!-- end icon volume -->

      <!-- volume -->
      <input type="range" min="0.0" max="1.0" step="0.05" :value="volumePer" @input="volume($event)" />
      <!-- end volume -->
    </div>
  </div>
</template>

<script>
import { Howler } from "howler";

export default {
  name: "Volume",
  props: ["mutePlayer", "volumePer"],
  mounted() {
    //volume init
    Howler.volume(this.volumePer);

    //check mute init
    if (this.mutePlayer) {
      Howler.volume(0);
    }
  },
  setup(props, context) {
    //emit mute
    const mute = () => {
      context.emit("emitMute");
    }

    //emit volume
    const volume = (e) => {
      context.emit("emitVolume", e);
    }

    //return data
    return {
      mute,
      volume
    }
  }
}
</script>

<style>

</style>
