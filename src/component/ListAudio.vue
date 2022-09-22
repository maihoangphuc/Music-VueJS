<template>
  <ul class="w-[100%] h-[100%] hover:overflow-auto overflow-hidden" id="journal-scroll">
    <li
      class="flex py-2 rounded cursor-pointer w-[95%]"
      v-for="(audio, indexo) in audios"
      :key="indexo"
      :class="indexo == index ? 'scroll bg text-white' : ''"
      @click="selectSound(indexo)"
    >
      <div class="font-semibold m-auto">
        {{ indexo + 1 }}
      </div>

      <div class="w-3/5 font-semibold text-left m-auto">
        <div class="font-semibold text-sm truncate">
          <p>{{ audio.name }}</p>
          <p class="mt-[3px] text-xs text-[#676569]">{{ audio.artist }}</p>
        </div>
      </div>

      <div class="m-auto">
        <svg v-if="state.audioPlaying[indexo]" class="w-6 h-6 m-auto" fill="currentColor"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
        </svg>
        <svg v-else class="w-6 h-6 m-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ListAudio",
  props: ["audios", "state", "index"],
  setup(props, context){
     //emit selectSound
     const selectSound = (e) => {
      context.emit("emitSelectSound", e);
    }

    //return data
    return {
      selectSound
    }
  }

}
</script>

<style>

</style>
