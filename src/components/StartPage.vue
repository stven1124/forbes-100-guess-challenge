<template>
  <div class="start">
    <img class="start-img" src="../assets/startPage-img.png" alt="" />
    <div class="start-content">
      <div class="subtitle">Forbes</div>
      <div class="title">全球百大富豪猜人名挑戰</div>
      <button type="button" class="startButton" @click="startGame" :disabled="disabledBtn">START</button>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import forbesStore from '../stores/forbesStore';

export default {
  name: 'StartPage',
  setup() {
    const forbes = forbesStore();
    const { disabledBtn, currentPage } = storeToRefs(forbes);
    forbes.getForbesData();
    const startGame = () => {
      currentPage.value = 1;
    };
    return {
      startGame,
      disabledBtn,
    };
  },
};
</script>

<style scoped lang="scss">
.start {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  animation: startFadeIn 1s;
  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    .subtitle {
      font-size: 50px;
      font-weight: bolder;
      color: #717f68;
    }
    .title {
      font-size: 60px;
      font-weight: bolder;
      margin-bottom: 55px;
    }
    .startButton {
      font-size: 60px;
      font-weight: bolder;
      background-color: unset;
      padding: 0 20px;
      border: 3px solid #000000;
      border-radius: 15px;
      box-shadow: 5px 5px;
      &:hover {
        border: 2px solid #000000;
        transform: scale(1.2);
        transition: 100ms linear;
        cursor: pointer;
        background-color: #ff0f0f;
        color: #ffffff;
        box-shadow: unset;
      }
    }
  }
  @keyframes startFadeIn {
    0% {
      transform: scaleY(0);
      opacity: 0;
    }
    100% {
      transform: scaleY(1);
      opacity: 1;
    }
  }
}
@media screen and (max-width: 1024px) {
  .start {
    flex-direction: column;
    &-img {
      width: 100%;
    }
    &-content {
      .subtitle {
        font-size: 20px;
      }
      .title {
        font-size: 30px;
        margin-bottom: 30px;
      }
      .startButton {
        font-size: 40px;
      }
    }
  }
}
</style>
