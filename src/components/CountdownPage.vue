<template>
  <div class="countdown">
    <span :class="{ animated: animated }">{{ countDownNum }}</span>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import forbesStore from '@/stores/forbesStore';

export default {
  name: 'CountdownPage',
  setup() {
    const forbes = forbesStore();
    const { currentPage } = storeToRefs(forbes);
    const countDownNum = ref(3);
    const animated = ref(false);
    let countInterval = null;

    onMounted(() => {
      animated.value = true;
    });

    const countdownStart = () => {
      countInterval = setInterval(() => {
        animated.value = false;
        setTimeout(() => {
          animated.value = true;
        }, 100);

        countDownNum.value -= 1;
        if (countDownNum.value === 0) {
          clearInterval(countInterval);
          currentPage.value = 2;
        }
      }, 1000);
    };

    countdownStart();
    return {
      countDownNum,
      animated,
    };
  },
};
</script>

<style scoped lang="scss">
.countdown {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 250px;
  }
  .animated {
    animation: enlarge 1s;
  }
  @keyframes enlarge {
    0% {
      transform: scale(1);
      transition: 100ms linear;
    }
    100% {
      transform: scale(2);
      transition: 100ms linear;
    }
  }
}
@media screen and (max-width: 1024px) {
  .countdown {
    span {
      font-size: 120px;
    }
  }
}
</style>
