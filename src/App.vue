<template>
  <StartPage v-if="currentPage === 0" />
  <CountdownPage v-if="currentPage === 1" />
  <GamePage v-if="currentPage === 2" />
  <ResultPage v-if="currentPage === 3" />
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import forbesStore from './stores/forbesStore';

const StartPage = defineAsyncComponent(() => import('./components/StartPage.vue'));
const CountdownPage = defineAsyncComponent(() => import('./components/CountdownPage.vue'));
const GamePage = defineAsyncComponent(() => import('./components/GamePage.vue'));
const ResultPage = defineAsyncComponent(() => import('./components/ResultPage.vue'));
const forbes = forbesStore();
const { currentPage } = storeToRefs(forbes);
</script>

<style lang="scss">
#app {
  font-family: 'Helvetica', 'Arial', 'LiHei Pro', '黑體-繁', '微軟正黑體', sans-serif;
  background-image: url('assets/bg.png');
  background-repeat: repeat;
}
</style>
