import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
export default createStore({
  state: {
    isGetterRouter:false,
    isCollapsed:false,
    userInfo:{},
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state,val){
      state.isGetterRouter=val;
    },
    changeCollased(state){
      state.isCollapsed=!state.isCollapsed;
    },
    changeUserInfo(state,val){
      state.userInfo={
        ...state.userInfo,
        ...val,
      }
    },
    clearUserInfo(state){
      state.userInfo={}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[createPersistedState({
    paths:["isCollapsed","userInfo"],
  })],
})
