import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Main.vue";

import House from "@/components/house/House.vue";

import Calculator from "@/views/Calculator.vue";

import store from "@/store/index.js";

import User from "@/views/User.vue";
import UserLogin from "@/components/user/UserLogin.vue";
import UserJoin from "@/components/user/UserJoin.vue";
import UserMyPage from "@/components/user/UserMyPage.vue";
import UserFind from "@/components/user/UserFind.vue";
import UserModify from "@/components/user/UserModify.vue";

import Board from "@/views/Board.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardWrite from "@/components/board/BoardWrite.vue";
import BoardView from "@/components/board/BoardView.vue";
import BoardUpdate from "@/components/board/BoardUpdate.vue";

import QnA from "@/views/QnA.vue";
import QnAList from "@/components/qna/QnAList.vue";
import QnAWrite from "@/components/qna/QnAWrite.vue";
import QnAView from "@/components/qna/QnAView.vue";

import Notice from "@/views/Notice.vue";
import NoticeList from "@/components/notice/NoticeList.vue";
import NoticeRegist from "@/components/notice/NoticeRegist.vue";

import Admin from "@/views/Admin.vue";
import AdminPage from "@/components/admin/AdminPage.vue";

Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["userStore/checkUserInfo"];
  const getUserInfo = store._actions["userStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인 후 이용가능합니다.");
    router.push({ name: "Login" });
  } else {
    next();
  }
};
const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    beforeEnter: onlyAuthUser,
    path: "/house",
    name: "House",
    component: House,
  },
  {
    path: "/calculator",    
    name: "Calculator",
    component: Calculator,
  },
  {
    path: "/user",
    name: "User",
    component: User,
    children: [
      {
        path: "login",
        name: "Login",
        component: UserLogin,
      },
      {
        path: "join",
        name: "Join",
        component: UserJoin,
      },
      {
        path: "mypage",
        name: "MyPage",
        component: UserMyPage,
      },
      {
        path: "find",
        name: "Find",
        component: UserFind,
      },
      {
        path: "modify/:userid",
        name: "Modify",
        component: UserModify,
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    redirect: "/admin/adminPage",
    children: [
      {
        path: "adminpage",
        name: "AdminPage",
        component: AdminPage,
      },
    ],
  },
  {
    path: "/board",
    name: "Board",
    component: Board,
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "BoardList",
        component: BoardList,
      },
      {
        path: "write",
        name: "BoardWrite",
        beforeEnter: onlyAuthUser,
        component: BoardWrite,
      },
      {
        path: "detail/:boardno",
        name: "BoardView",
        component: BoardView,
      },
      {
        path: "update/:boardno",
        name: "BoardUpdate",
        component: BoardUpdate,
      },
    ],
  },
  {
    path: "/qna",
    name: "QnA",
    beforeEnter: onlyAuthUser,
    component: QnA,
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "QnAList",
        component: QnAList,
      },
      {
        path: "write",
        name: "QnAWrite",
        component: QnAWrite,
      },
      {
        path: "detail/:no",
        name: "QnAView",
        component: QnAView,
      },
    ],
  },
  {
    path: "/notice",
    name: "Notice",
    component: Notice,
    redirect: "/notice/list",
    children: [
      {
        path: "list",
        name: "NoticeList",
        component: NoticeList,
      },
      {
        path: "regist",
        name: "NoticeRegist",
        component: NoticeRegist,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
