import jwt_decode from "jwt-decode";
import { login, join, findId, findPwd } from "@/api/user.js";
import { findById, deleteUser, updateUser } from "../../api/user";
const userStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isJoin: false,
    isDelete: false,
    isUpdate: false,
    isFindId: false,
    isFindPwd: false,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isFindPwd = true;
      state.isFindId = true;
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_IS_JOIN: (state, isJoin) => {
      state.isJoin = isJoin;
    },
    SET_IS_DELETE: (state, isDelete) => {
      state.isDelete = isDelete;
    },
    SET_IS_UPDATE: (state, isUpdate) => {
      state.isUpdate = isUpdate;
    },
    SET_IS_FIND_ID: (state, isFindId) => {
      state.isFindId = isFindId;
    },
    SET_IS_FIND_PWD: (state, isFindPwd) => {
      state.isFindPwd = isFindPwd;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        (response) => {
          if (response.data.message === "success") {
            let token = response.data["access-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            sessionStorage.setItem("access-token", token);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        () => {}
      );
    },
    getUserInfo({ commit }, token) {
      let decode_token = jwt_decode(token);
      console.dir(decode_token);
      findById(
        decode_token.userid,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_USER_INFO", response.data.userInfo);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async joinConfirm({ commit }, user) {
      await join(
        user,
        (response) => {
          if (response.data === "success") {
            commit("SET_IS_JOIN", true);
          } else {
            commit("SET_IS_JOIN", false);
            console.log("SET_IS_JOIN");
          }
        },
        (error) => {
          alert("회원가입 실패, 다시 입력해주세요");
          this.$router.go();
          console.log(error);
        }
      );
    },
    async deleteConfirm({ commit }, user) {
      await deleteUser(
        user.userid,
        (response) => {
          if (response.data === "success") {
            commit("SET_IS_DELETE", true);
          } else {
            commit("SET_IS_DELETE", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async updateConfirm({ commit }, user) {
      await updateUser(
        user,
        (response) => {
          if (response.data === "success") {
            commit("SET_IS_UPDATE", true);
          } else {
            commit("SET_IS_UPDATE", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async findIdConfirm({ commit }, userId) {
      await findId(
        userId,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_IS_FIND_ID", true);
            commit("SET_USER_INFO", response.data.userInfo);
          } else {
            commit("SET_IS_FIND_ID", false);
          }
        },
        () => {}
      );
    },
    async findPwdConfirm({ commit }, userPwd) {
      await findPwd(
        userPwd,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_IS_FIND_PWD", true);
            commit("SET_USER_INFO", response.data.userInfo);
          } else {
            commit("SET_IS_FIND_PWD", false);
          }
        },
        () => {}
      );
    },
  },
};

export default userStore;
