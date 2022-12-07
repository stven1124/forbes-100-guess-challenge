<template>
  <div class="result">
    <div class="result-title">
      <span>恭喜你答對{{ score }}/10題！</span>
      <button type="button" class="insideButton" @click="reStart">重新開始</button>
    </div>
    <div class="result-content">
      <div class="answer" v-for="(item, index) in resultData" :key="index">
        <img :src="item.squareImage" alt="" />
        <div class="multipleChoice">
          <div
            class="choice"
            v-for="(personNameItem, index) in item.personNameArray"
            :key="index"
            :class="{
              greenBg: personNameItem.isTrue,
              redBg: !personNameItem.isTrue && personNameItem.isClick,
            }"
          >
            {{ personNameItem.personName }}
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="outsideButton" @click="reStart">重新開始</button>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import forbesStore from '../stores/forbesStore';

const forbes = forbesStore();
const { resultData, score, currentPage } = storeToRefs(forbes);

const reStart = () => {
  currentPage.value = 0;
};
</script>

<style scoped lang="scss">
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  &-title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
    span {
      font-size: 60px;
      font-weight: bolder;
    }
    .insideButton {
      font-size: 35px;
      color: #41403e;
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;
      padding: 8px 10px;
      border-width: 2px;
      border-style: solid;
      border-bottom-left-radius: 15px 255px;
      border-bottom-right-radius: 225px 15px;
      border-top-left-radius: 255px 15px;
      border-top-right-radius: 15px 225px;
      transition: all 235ms ease-in-out;
      &:hover {
        cursor: pointer;
        background-color: #ff0f0f;
        color: #ffffff;
        box-shadow: unset;
      }
    }
  }
  &-content {
    border: 3px solid #a08364;
    border-radius: 15px;
    margin-bottom: 20px;
    .answer {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px;
      &:not(:last-child) {
        border-bottom: 3px solid #a08364;
      }
      img {
        width: 200px;
        border-radius: 10px;
      }
      .multipleChoice {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .choice {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 10px 10px;
          background-color: #fffdfa;
          width: 200px;
          height: 40px;
          padding: 5px 10px;
          font-size: 18px;
          border-radius: 15px;
          border: 2px solid #bfa78e;
        }
        .greenBg {
          color: #fff6ec;
          background-color: #a6bda0;
        }
        .redBg {
          color: #fff6ec;
          background-color: #aa3939;
        }
      }
    }
  }
  .outsideButton {
    width: 20%;
    font-size: 40px;
    color: #41403e;
    background-color: #fff;
    box-shadow: rgba(3, 3, 3, 0.2) 15px 28px 25px -18px;
    padding: 8px 10px;
    border-width: 2px;
    border-style: solid;
    border-bottom-left-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    transition: all 235ms ease-in-out;
    &:hover {
      cursor: pointer;
      background-color: #ff0f0f;
      color: #ffffff;
      box-shadow: unset;
    }
  }
}
@media screen and (max-width: 1024px) {
  .result {
    padding: 15px 0;
    &-title {
      padding-bottom: 15px;
      span {
        font-size: 22px;
      }
      .insideButton {
        font-size: 20px;
      }
    }
    &-content {
      width: 95%;
      margin-bottom: 10px;
      .answer {
        padding: 10px;
        img {
          width: 150px;
        }
        .multipleChoice {
          .choice {
            font-size: 16px;
            width: 150px;
            height: 30px;
            margin: 5px;
          }
        }
      }
    }
    .outsideButton {
      font-size: 20px;
      width: 50%;
    }
  }
}
</style>
