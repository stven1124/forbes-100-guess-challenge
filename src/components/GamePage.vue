<template>
  <div class="game">
    <img class="game-question-img" :src="questionArray[questionArrayNum].squareImage" alt="" />
    <span class="game-question-title"
      >{{ questionArrayNum + 1 }}.請從下列選項選出此富豪名字是哪個?</span
    >
    <div class="game-question-multipleChoice">
      <button
        type="button"
        v-for="(item, index) in questionArray[questionArrayNum].personNameArray"
        :key="index"
        @click="confirmSelect(item, index)"
        :class="{
          greenBg: index == buttonIndex && buttonColor == 'green',
          redBg: index == buttonIndex && buttonColor == 'red',
        }"
        :disabled="buttonDisabled"
      >
        {{ item.personName }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import forbesStore from '@/stores/forbesStore';

export default {
  name: 'GamePage',
  setup() {
    const forbes = forbesStore();
    const { forbesData, currentPage } = storeToRefs(forbes);
    const questionArray = ref([]);
    const questionArrayNum = ref(0);
    const buttonColor = ref('');
    const buttonIndex = ref(0);
    const buttonDisabled = ref(false);
    const score = ref(0);

    // 將選擇題隨機排序
    const shuffle = (array) => {
      const arr = array;
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    };

    // 產生十個遊戲題目資料
    for (let i = 0; i < 10; i += 1) {
      // 取出正確的人名選項
      const randomNum = Math.floor(Math.random() * forbesData.value.length);
      const { personName } = forbesData.value[randomNum] || {};
      let { squareImage } = forbesData.value[randomNum] || {};
      const ImgHttpsVerify = 'https:';
      if (!squareImage.includes(ImgHttpsVerify)) {
        squareImage = ImgHttpsVerify + squareImage;
      }
      questionArray.value.push({
        personName,
        squareImage,
        personNameArray: [{ personName, isTrue: true, isClick: false }],
      });
      forbesData.value.splice(randomNum, 1);
      // 取出錯誤的三個人名選項
      for (let j = 0; j < 3; j += 1) {
        const randomNum2 = Math.floor(Math.random() * forbesData.value.length);
        const personName2 = forbesData.value[randomNum2].personName;
        questionArray.value[i].personNameArray.push({
          personName: personName2,
          isTrue: false,
          isClick: false,
        });
      }
      shuffle(questionArray.value[i].personNameArray);
    }

    // 選擇選擇題按鈕
    const confirmSelect = (data, index) => {
      buttonDisabled.value = true;
      buttonIndex.value = index;
      const dataValue = data;
      dataValue.isClick = !dataValue.isClick;
      if (data.isTrue) {
        buttonColor.value = 'green';
        score.value += 1;
      } else {
        buttonColor.value = 'red';
      }
      setTimeout(() => {
        if (questionArrayNum.value < 9) {
          questionArrayNum.value += 1;
        } else {
          currentPage.value = 3;
          forbes.$patch((state) => {
            state.resultData = questionArray;
            state.score = score;
          });
        }
        buttonColor.value = '';
        buttonDisabled.value = false;
      }, 1000);
    };

    return {
      forbesData,
      questionArray,
      questionArrayNum,
      confirmSelect,
      buttonColor,
      buttonIndex,
      buttonDisabled,
    };
  },
};
</script>

<style scoped lang="scss">
.game {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-question-img {
    margin-bottom: 50px;
    border-radius: 20px;
    border: 3px solid #bfa78e;
  }
  &-question-title {
    font-size: 28px;
    font-weight: bolder;
    margin-bottom: 40px;
  }
  &-question-multipleChoice {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    button {
      margin: 0 10px 10px;
      background-color: #fffdfa;
      width: 400px;
      height: 70px;
      font-size: 25px;
      border-radius: 50px;
      border: unset;
      border-right: 3px solid #bfa78e;
      border-bottom: 3px solid #bfa78e;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: #fff6ec;
          background-color: #a08364;
          border: unset;
          cursor: pointer;
        }
      }
      &:disabled {
        pointer-events: none;
      }
    }
  }
  .greenBg,
  .greenBg:hover {
    border: unset;
    color: #fff6ec;
    background-color: #a6bda0;
  }
  .redBg,
  .redBg:hover {
    border: unset;
    color: #fff6ec;
    background-color: #aa3939;
  }
}
@media screen and (max-width: 1024px) {
  .game {
    // height: unset;
    &-question-img {
      width: 60%;
    }
    &-question-title {
      font-size: 18px;
    }
    &-question-multipleChoice {
      button {
        width: 330px;
        height: 50px;
        font-size: 20px;
      }
    }
  }
}
</style>
