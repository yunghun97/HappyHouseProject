import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
import houseStore from "@/store/modules/houseStore.js";
import userStore from "@/store/modules/userStore.js";
import boardStore from "@/store/modules/boardStore.js";
const store = new Vuex.Store({
  modules: {
    houseStore,
    userStore,
    boardStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});

export default store;
