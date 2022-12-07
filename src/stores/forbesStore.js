import { defineStore } from 'pinia';
import {
  getDatabase, ref, child, get,
} from 'firebase/database';

export default defineStore('forbesStore', {
  state: () => ({
    currentPage: 0,
    forbesData: [],
    resultData: [],
    score: 0,
    loadingData: true,
  }),
  actions: {
    getForbesData() {
      if (!this.forbesData.length) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'forbesData/forbesPersonList'))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const snapshotData = snapshot.val();
              Object.values(snapshotData).forEach((item) => {
                this.forbesData.push(item);
              });
              this.loadingData = false;
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
  getters: {},
});
