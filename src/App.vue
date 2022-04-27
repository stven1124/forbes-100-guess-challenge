<template>
  <StartPage v-if="currentPage === 0" />
  <CountdownPage v-if="currentPage === 1" />
  <GamePage v-if="currentPage === 2" />
  <ResultPage v-if="currentPage === 3" />
</template>

<script>
import { storeToRefs } from 'pinia';
import forbesStore from '@/stores/forbesStore';
import StartPage from '@/components/StartPage.vue';
import CountdownPage from '@/components/CountdownPage.vue';
import GamePage from '@/components/GamePage.vue';
import ResultPage from '@/components/ResultPage.vue';

export default {
  name: 'App',
  components: {
    StartPage,
    CountdownPage,
    GamePage,
    ResultPage,
  },
  setup() {
    const forbes = forbesStore();
    const { currentPage } = storeToRefs(forbes);
    return {
      currentPage,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Helvetica', 'Arial', 'LiHei Pro', '黑體-繁', '微軟正黑體', sans-serif;
  background-image: url('assets/bg.png');
  background-repeat: repeat;
}
</style>
