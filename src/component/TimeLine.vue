<template>
  <div class="w-[100%] flex items-center justify-between gap-x-4">
    <!-- timer -->
    <div class="text-sm text-grey-darker font-semibold">
      <p>{{ timer }}</p>
    </div>
    <!-- end timer -->

    <!-- timeline -->
    <div class="mt-1 w-full">
      <input id="timeline" class="w-full" type="range" min="0" max="100" step="1"
        :value="checkValue ? rangeValue : progress || 0" @input="seekInput($event)" @mouseup="seek($event)"
        @touchend="seek($event)" />
    </div>
    <!-- end timeline -->

    <!-- duration -->
    <div class="text-sm text-grey-darker font-semibold">
      <p id="test">{{ duration }}</p>
    </div>
    <!-- end duration -->
  </div>
</template>

<script>
//import common
import { ref } from "vue";

export default {
  name: "TimeLine",
  props: ["timer", "duration", "progress", "getAudio"],
  setup(props, context) {
    //init data
    const rangeValue = ref(0);
    const checkValue = ref(false);

    //emit seekInput
    const seekInput = (e) => {
      checkValue.value = true;
      rangeValue.value = e.target.value;
    }

    //emit seek
    const seek = (e) => {
      checkValue.value = false;
      context.emit("emitSeek", e);
    }

    //return data
    return {
      rangeValue,
      checkValue,
      seekInput,
      seek
    }
  }
}
</script>

<style>

</style>
