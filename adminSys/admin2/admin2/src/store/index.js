import Vue from "vue";
import Vuex from "vuex";

// 1.安装插件
Vue.use(Vuex);

// 2.创建对象
const store = new Vuex.Store({
  state: {
    //   登陆人员信息
    globalData: {}
  },
  mutations: {
    getGlobalData(state, key) {
      return key ? state.globalData[key] : state.globalData;
    },
    //   setGlobalData(key, value) {
    //     // 需要传键值对
    //     if (key === undefined || value === undefined) {
    //       return;
    //     }
    //     globalData = { ...globalData, [key]: value };
    //     return globalData;
    //   },
    setGlobalData(state, obj) {
      // 需要传键值对

      if (obj.key === undefined || obj.value === undefined) {
        return;
      }
      state.globalData = { ...state.globalData, [obj.key]: obj.value };
      console.log(state.globalData);
      return state.globalData;
    },
    clearGlobalData(state, key) {
      // 需要传键值对
      if (key === undefined) {
        state.globalData = {};
      } else {
        delete state.globalData[key];
      }
      return state.globalData;
    }
  },
  actions: {
    loginData(context, key) {
      var keep = context.commit("getGlobalData", key);
      console.log(keep);
      return keep;
    }
  },
  getters: {
    getdata: function(state) {
      return state.globalData;
    }
  }
});

// 3.导出store对象
export default store;
