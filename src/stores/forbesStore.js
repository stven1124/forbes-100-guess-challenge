import { defineStore } from 'pinia';
import axios from 'axios';

export default defineStore('forbesStore', {
  state: () => ({
    currentPage: 0,
    forbesData: [],
    resultData: [],
    score: 0,
  }),
  actions: {
    getForbesData() {
      const api = `${process.env.VUE_APP_FORBES_API}?limit=100`;
      axios.get(api).then((response) => {
        const NotFoundImgVerify = 'cropX1=0&cropX2=800&cropY1=0&cropY2=800';
        this.forbesData = response.data.filter(
          (item) => item.squareImage && !item.squareImage.includes(NotFoundImgVerify),
        );
      });
    },
  },
  getters: {},
});
