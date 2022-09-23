<template>
  <div class="cl2 w-[100%] sm:h-[100vh] md:h-screen flex flex-col justify-center items-center overflow-hidden">

    <!--/////////////// CONTENT /////////////////-->
    <div class="w-[95%] h-[90%] flex justify-center items-center">

      <!--============== LEFT CONTENT ===============-->
      <div class="sm:w-[85%] md:w-[50%] lg:w-[40%] lg:h-[80%] flex flex-col justify-center items-center">
        <div class="w-[100%] justify-center items-center">

          <!--============== INFO & THUMB CD & TIMELINE & DROPDOWN ===============-->
          <div class="flex flex-col justify-center items-center gap-y-5">

            <!--============== INFOR ===============-->
            <div v-for="(audio, indexo) in audios.slice(index, index + 1)" :key="indexo" class="text-center">
              <h3 class="sm:text-[18px] md:text-[16px] lg:text-[18px] text-grey-darkest font-semibold">
                {{ !getAudio ? "..." : audio.name }}
              </h3>
              <p class="sm:text-[15px] md:text-[14px] lg:text-[15px] text-gray-600">{{ !getAudio ? "..." : audio.artist
              }}</p>
            </div>
            <!--============== END INFOR ===============-->

            <!--============== THUMB CD ===============-->
            <div class="sm:w-[250px] sm:h-[250px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] relative"
              v-for="(audio, indexo) in audios.slice(index, index + 1)" :key="indexo">
              <div :class="!pauseTrack ? 'pause' : 'play'" class="cd rotate">
                <div v-if="!getAudio && audio.image !== indexo" class="cd"></div>
                <div v-else class="cd">
                  <img class="cd" :src="audio.image" alt="thumb" />
                </div>
              </div>
              <div
                class="bg-[#ffffffa4] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] sm:w-[40px] sm:h-[40px] md:w-[60px] md:h-[60px] rounded-[50%]">
              </div>
            </div>
            <!--============== END THUMB CD ===============-->

            <!--============== TIMELINE & DROPDOWN ===============-->
            <div class="relative w-[100%] flex items-center gap-x-6">
              <!--============== TIMELINE ===============-->
              <div class="w-[100%] sm:block md:hidden">
                <TimeLine :timer="timer" :duration="duration" :progress="progress" @emitSeek="seek" />
              </div>
              <!--============== END TIMELINE ===============-->

              <!--============== DROPDOWN ===============-->
              <VDropdown class="sm:block md:hidden" placement="top-end">
                <!-- This will be the popover reference (for the events and position) -->
                <DotIcon class="cursor-pointer" />

                <!-- This will be the content of the popover -->
                <template #popper>
                  <div class="sm:flex md:hidden flex-col gap-y-2 w-[170px] p-[16px]">
                    <div @click="random = !random" :class="random ? 'cl' : ''" class="flex items-center">
                      <div class="cursor-pointer text-grey-darker hover:bg-gray-300 rounded-full p-1">
                        <RandomIcon />
                      </div>
                      <div class="cursor-pointer ml-2 text-sm font-medium">Random</div>
                    </div>

                    <div @click="repeat = !repeat" :class="repeat ? 'cl' : ''" class="flex items-center">
                      <div class="text-grey-darker hover:bg-gray-300 rounded-full p-1 cursor-pointer">
                        <RepeatIcon />
                      </div>
                      <div class="cursor-pointer ml-2 text-sm font-medium">Repeat</div>
                    </div>
                  </div>
                </template>
              </VDropdown>
              <!--============== END DROPDOWN ===============-->

            </div>
            <!--============== END TIMELINE & DROPDOWN ===============-->
          </div>
          <!--============== END INFO & THUMB CD & TIMELINE & DROPDOWN ===============-->

          <!--============== CONTROL ===============-->
          <div class="sm:w-[60%] md:w-[80%] mt-5 flex m-auto justify-between items-center">
            <!-- random -->
            <div @click="random = !random" :class="random ? 'cl' : ''"
              class="sm:hidden md:block text-grey-darker hover:bg-gray-300 rounded-full p-2 cursor-pointer">
              <RandomIcon />
            </div>
            <!-- end random -->

            <!-- prev -->
            <div @click="prevButton ? previous() : ''"
              class="text-grey-darker hover:bg-gray-300 rounded-full p-1 cursor-pointer">
              <PreviousIcon />
            </div>
            <!-- end prev -->

            <!-- play -->
            <div v-if="!pauseTrack" @click="play()"
              class="text-white sm:p-3 md:p-3 lg:p-4 rounded-full bg shadow-lg cursor-pointer">
              <PlayIcon />
            </div>
            <!-- end play -->

            <!-- pause -->
            <div v-else @click="pause()"
              class="text-white sm:p-3 md:p-3 lg:p-4 rounded-full bg shadow-lg cursor-pointer">
              <PauseIcon />
            </div>
            <!-- end pause -->

            <!-- next -->
            <div @click="nextButton ? next() : ''"
              class="text-grey-darker hover:bg-gray-300 rounded-full p-1 cursor-pointer">
              <NextIcon />
            </div>
            <!-- end next -->

            <!-- repeat -->
            <div @click="repeat = !repeat" :class="repeat ? 'cl' : ''"
              class="sm:hidden md:block text-grey-darker hover:bg-gray-300 rounded-full p-2 cursor-pointer">
              <RepeatIcon />
            </div>
            <!-- end repeat -->
          </div>
          <!--============== END CONTROL ===============-->
        </div>
      </div>
      <!--============== END LEFT CONTENT ===============-->

      <!--============== RIGHT CONTENT ===============-->
      <div
        class="sm:hidden md:block pt-[40px] pl-[40px] pb-[40px] flex justify-center items-center sm:w-[60%] md:h-[76%] lg:w-[60%] lg:h-[82%]">
        <ListAudio :audios="audios" :state="state" :index="index" @emitSelectSound="selectSound" />
      </div>
      <!--============== END RIGHT CONTENT ===============-->
    </div>
    <!--/////////////// END CONTENT /////////////////-->


    <!--/////////////// FOOTER /////////////////-->
    <div class="w-[100%] z-10 bg2 h-[10%] justify-center sm:hidden md:flex">

      <!--============== INFOR & TIMELINE & VOLUME ===============-->
      <div class="sm:w-[80%] md:w-[95%] flex items-center justify-between gap-x-10">

        <!-- image & info artist -->
        <div class="w-[20%] sm:gap-x-4 lg:flex hidden" v-for="(audio, indexo) in audios.slice(index, index + 1)"
          :key="indexo">
          <div>
            <div class="w-10 h-10">
              <div v-if="!getAudio && audio.image !== indexo" class="cd bg-[#f8f6f6da]"></div>
              <div v-else class="cd">
                <img class="cd" :src="audio.image" alt="thumb" />
              </div>
            </div>
          </div>
          <div class="flex flex-col font-semibold truncate">
            <p class="md:text-[13px] lg:text-[14px]">{{ !getAudio ? "..." : audio.name }}</p>
            <p class="md:text-[12px] lg:text-[12px] text-gray-600">{{ !getAudio ? "..." : audio.artist }}</p>
          </div>
        </div>
        <!-- end image & info artist -->

        <!-- timeline -->
        <TimeLine :timer="timer" :duration="duration" :progress="progress" :getAudio="getAudio" @emitSeek="seek" />
        <!-- end timeline -->

        <!-- volume -->
        <Volume :mutePlayer="mutePlayer" :volumePer="volumePer" @emitMute="mute" @emitVolume="volume" />
        <!-- end volume -->

      </div>
      <!--============== INFOR & TIMELINE & VOLUME ===============-->
    </div>
    <!--/////////////// END FOOTER /////////////////-->
  </div>
</template>

<script>
//import common
import { ref, reactive } from "vue";
import { Howl, Howler } from "howler";

//import components
import Volume from "../component/Volume.vue";
import TimeLine from "../component/TimeLine.vue";
import ListAudio from "../component/ListAudio.vue";
import RandomIcon from "../component/RandomIcon.vue";
import PreviousIcon from "../component/PreviousIcon.vue";
import PlayIcon from "../component/PlayIcon.vue";
import PauseIcon from "../component/PauseIcon.vue";
import NextIcon from "../component/NextIcon.vue";
import RepeatIcon from "../component/RepeatIcon.vue";
import DotIcon from "../component/DotIcon.vue";

//import audios
import A1 from "@/music/A1.mp3";
import A2 from "@/music/A2.mp3";
import A3 from "@/music/A3.mp3";
import A4 from "@/music/A4.mp3";
import A5 from "@/music/A5.mp3";
import A6 from "@/music/A6.mp3";
import A7 from "@/music/A7.mp3";
import A8 from "@/music/A8.mp3";
import A9 from "@/music/A9.mp3";
import A10 from "@/music/A10.mp3";
import A11 from "@/music/A11.mp3";
import A12 from "@/music/A12.mp3";
import A13 from "@/music/A13.mp3";
import A14 from "@/music/A14.mp3";
import A15 from "@/music/A15.mp3";
import A16 from "@/music/A16.mp3";
import A17 from "@/music/A17.mp3";
import A18 from "@/music/A18.mp3";
import A19 from "@/music/A19.mp3";
import A20 from "@/music/A20.mp3";
import A21 from "@/music/A21.mp3";
import A22 from "@/music/A22.mp3";
import A23 from "@/music/A23.mp3";
import A24 from "@/music/A24.mp3";
import A25 from "@/music/A25.mp3";
import A26 from "@/music/A26.mp3";

//import images
import I1 from "@/assets/image/I1.jpg";
import I2 from "@/assets/image/I2.jpg";
import I3 from "@/assets/image/I3.jpg";
import I4 from "@/assets/image/I4.jpg";
import I5 from "@/assets/image/I5.jpg";
import I6 from "@/assets/image/I6.jpg";
import I7 from "@/assets/image/I7.jpg";
import I8 from "@/assets/image/I8.jpg";
import I9 from "@/assets/image/I9.jpg";
import I10 from "@/assets/image/I10.jpg";
import I11 from "@/assets/image/I11.jpg";
import I12 from "@/assets/image/I12.jpg";
import I13 from "@/assets/image/I13.jpg";
import I14 from "@/assets/image/I14.jpg";
import I15 from "@/assets/image/I15.jpg";
import I16 from "@/assets/image/I16.jpg";
import I17 from "@/assets/image/I17.jpg";
import I18 from "@/assets/image/I18.jpg";
import I19 from "@/assets/image/I19.jpg";
import I20 from "@/assets/image/I20.jpg";
import I21 from "@/assets/image/I21.jpg";
import I22 from "@/assets/image/I22.jpg";
import I23 from "@/assets/image/I23.jpg";
import I24 from "@/assets/image/I24.jpg";
import I25 from "@/assets/image/I25.jpg";
import I26 from "@/assets/image/I26.jpg";

export default {
  components: {
    Volume,
    TimeLine,
    ListAudio,
    RandomIcon,
    PreviousIcon,
    PlayIcon,
    PauseIcon,
    NextIcon,
    RepeatIcon,
    DotIcon,
  },
  setup() {
    //init data
    var audios = ref([
      { name: "Đáp Án Cuối Cùng", file: A1, image: I1, artist: "Quân AP", howl: null },
      { name: "Tự Tình 2", file: A2, image: I2, artist: "Trung Quân Idol", howl: null },
      { name: "Giữ Lại Được Chi", file: A3, image: I3, artist: "Reddy", howl: null },
      { name: "Người Đáng Thương Là Anh", file: A4, image: I4, artist: "OnlyC", howl: null },
      { name: "Phố Không Màu", file: A5, image: I5, artist: "Vincent", howl: null },
      { name: "Có Những Tiếc Nuối", file: A6, image: I6, artist: "Duy Tiến", howl: null },
      { name: "Mùa Thu Qua Đi", file: A7, image: I7, artist: "Lâm Alex", howl: null },
      { name: "Liệu Có Ngoại Lệ", file: A8, image: I8, artist: "Keyo", howl: null },
      { name: "Thành Phố Mưa Rơi", file: A9, image: I9, artist: "Khải", howl: null },
      { name: "Nợ Ai Đó Lời Xin Lỗi 2", file: A10, image: I10, artist: "Bozitt", howl: null },
      { name: "Em Giờ Đã Yêu Ai Chưa", file: A11, image: I11, artist: "DUG", howl: null },
      { name: "Bản Tình Ca Số 2", file: A12, image: I12, artist: "Trung Nghĩa x Văn x Bnos", howl: null },
      { name: "Khoảng Cách Xa Nhất", file: A13, image: I13, artist: "Dee x Hạt Dẻ", howl: null },
      { name: "Sài Gòn Chẳng Chờ Chúng Ta", file: A14, image: I14, artist: "Trung Nghĩa x L.Fujng x JayD", howl: null },
      { name: "Thu Sang Hạ Tàn", file: A15, image: I15, artist: "Cầm x Xôn Nguyễn", howl: null },
      { name: "Đã Từng Là Yêu Thương", file: A16, image: I16, artist: "Trung Nghĩa x L.Fujng x Bnos", howl: null },
      { name: "Riêng Mình Anh", file: A17, image: I17, artist: "Reddy", howl: null },
      { name: "Ngày Không Có Em", file: A18, image: I18, artist: "ThịnK", howl: null },
      { name: "Những Ngày Vỡ Đôi", file: A19, image: I19, artist: "Đinh Uyên", howl: null },
      { name: "Phản Bội Chính Mình", file: A20, image: I20, artist: "Quân AP", howl: null },
      { name: "Một Ngàn Nỗi Đau", file: A21, image: I21, artist: "Văn Mai Hương", howl: null },
      { name: "Mình Dành Cho Nhau Nỗi Buồn", file: A22, image: I22, artist: "Trung I.U x Tuấn Đinh", howl: null },
      { name: "Diễn Viên", file: A23, image: I23, artist: "Ngô Anh Đạt", howl: null },
      { name: "Mr Siro Mashup", file: A24, image: I24, artist: "Minh Anh", howl: null },
      { name: "Chưa Quên Người Yêu Cũ", file: A25, image: I25, artist: "Hà Nhi", howl: null },
      { name: "Tự Sự", file: A26, image: I26, artist: "Orange", howl: null },
    ]);

    var index = ref(0);
    var getAudio = ref(true);
    var state = reactive({
      audioPlaying: [],
    });

    var random = ref(false);
    var repeat = ref(false);
    var nextButton = ref(true);
    var prevButton = ref(true);
    var pauseTrack = ref(false);

    var timer = ref("00:00");
    var duration = ref("00:00");
    var progress = ref(0);
    var step = ref(0);

    var mutePlayer = ref(false);
    var volumePer = ref(0.7);

    //play audio
    function play() {
      var sound;
      var audio = audios.value[index.value];
      if (audio.howl) {
        sound = audio.howl;
      } else {
        state.audioPlaying[index.value] = false;
        sound = audio.howl = new Howl({
          src: [audio.file],
          html5: true, // A live stream can only be played through HTML5 Audio.
          format: ["mp3", "aac"],
          onplay: function () {
            getAudio.value = true;
            pauseTrack.value = true;
            nextButton.value = true;
            prevButton.value = true;
            duration.value = formatTime(sound.duration());
            requestAnimationFrame(stepFunction.bind(this));
          },
          onpause: function () {
            pauseTrack.value = false;
          },
          onend: function () {
            next();
          },
          onseek: function () {
            window.requestAnimationFrame(stepFunction.bind(this));
          },
        });
      }
      sound.play();
      state.audioPlaying[index.value] = true;
    }

    //pause audio
    function pause() {
      var audio = audios.value[index.value].howl;
      if (audio) {
        audio.pause();
        pauseTrack.value = false;
        state.audioPlaying[index.value] = false;
      }
    }

    //step
    function stepFunction() {
      var self = this;
      var sound = audios.value[index.value].howl;
      var seek = sound.seek() || 0;
      var duration = sound.duration();
      timer.value = formatTime(Math.round(seek));
      step.value = (seek * 100) / sound.duration();
      var per = Math.round(seek / duration * 100);
      progress.value = per;

      //If sound is still playing, continue stepping
      if (sound.playing()) {
        window.requestAnimationFrame(stepFunction.bind(self));
      }
    }

    //seek
    function seek(e) {
      var sound = audios.value[index.value].howl;
      var e = e.target.value;

      if (sound) {
        var duration = sound.duration();
        var cal = Math.round(duration) / 100 * e;
        sound.seek(cal);
      }
    }

    //prev audio
    function previous() {
      var audio = audios.value[index.value].howl;
      prevButton.value = false;
      state.audioPlaying[index.value] = false;

      mutePlayer.value ? (mutePlayer.value = false) : "";
      audio && audio.mute(true) ? audio.mute(false) : "";

      if (!audio) {
        index.value = audios.value.length - 1;
        getAudio.value = false;
        duration.value = "00:00";
      } else if (audio && index.value == 0) {
        audio.stop();

        repeat.value
          ? (index.value = index.value)
          : random.value
            ? (index.value = Math.floor(Math.random() * audios.value.length))
            : (index.value = audios.value.length - 1);
      } else if (audio) {
        pause();
        getAudio.value = false;
        duration.value = "00:00";
        audio.stop();

        repeat.value
          ? (index.value = index.value)
          : random.value
            ? (index.value = Math.floor(Math.random() * audios.value.length))
            : index.value--;
      }
      play();
      scrollIntoView();
    }

    //next audio
    function next() {
      nextButton.value = false;
      var audio = audios.value[index.value].howl;

      state.audioPlaying[index.value] = false;

      if (audio && audios.value.length - 1 == index.value) {
        audio.stop();
        repeat.value
          ? (index.value = index.value)
          : random.value
            ? (index.value = Math.floor(Math.random() * audios.value.length))
            : (index.value = 0);
      } else {
        if (audio) {
          pause();
          getAudio.value = false;
          duration.value = "00:00";
          audio.stop();
        } else {
          getAudio.value = false;
          duration.value = "00:00";
        }
        repeat.value
          ? (index.value = index.value)
          : random.value
            ? (index.value = Math.floor(Math.random() * audios.value.length))
            : index.value++;
      }
      play();
      scrollIntoView();
    }

    //select audio
    function selectSound(indexSelected) {
      var audio = audios.value[index.value].howl;

      if (audio) {
        pause();
        getAudio.value = false;
        duration.value = "00:00";
        audio.stop();
        state.audioPlaying[index.value] = false;
      }
      else {
        getAudio.value = false;
        duration.value = "00:00";
      }
      index.value = indexSelected;
      play();
      scrollIntoView();
    }

    //volume audio
    function volume(e) {
      volumePer.value = e.target.value;
      Howler.volume(volumePer);

      if (volumePer.value > 0) {
        Howler.volume(volumePer.value);
        mutePlayer.value = false;
      } else {
        Howler.volume(0);
        mutePlayer.value = true;
      }
    }

    //mute audio
    function mute() {
      mutePlayer.value = !mutePlayer.value;

      if (mutePlayer.value) {
        Howler.volume(0);
      } else {
        Howler.volume(volumePer.value);
      }
    }

    //define funtion time
    function formatTime(secs) {
      var minutes = Math.floor(secs / 60) || 0;
      var seconds = Math.floor(secs - minutes * 60) || 0;
      return (
        (minutes < 10 ? "0" : "") +
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds
      );
    }

    //auto scroll view list mp3
    function scrollIntoView() {
      setTimeout(() => {
        document.querySelector('.scroll').scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }, 500)
    }

    //return data
    return {
      getAudio,
      play,
      pause,
      duration,
      formatTime,
      audios,
      pauseTrack,
      next,
      previous,
      index,
      timer,
      step,
      stepFunction,
      seek,
      selectSound,
      state,
      random,
      repeat,
      progress,
      volume,
      volumePer,
      mute,
      mutePlayer,
      nextButton,
      prevButton,
    };
  },
};
</script>

<style>

</style>
