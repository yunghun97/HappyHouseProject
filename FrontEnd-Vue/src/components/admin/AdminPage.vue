<template>
  <div>
    <b-card class="pt-5 text-center" v-if="userInfo">
      <h2>MyPage</h2>
      <b-card-body class="px-lg-5 py-lg-5">
        <div class="text-center">
          <img
            src="../../assets/profile.png"
            alt="프로필"
            style="height: 200px"
          />
          <h5 class="h3">ID : {{ userInfo.userid }}</h5>
          <div class="h5 font-weight-300">
            <i class="ni location_pin mr-2"></i>Name : {{ userInfo.name }}
          </div>
          <div class="h5 font-weight-300">
            <i class="ni location_pin mr-2"></i>Email : {{ userInfo.email }}
          </div>
          <div class="mt-4">
            <span style="padding: 10px"
              ><b-button variant="outline-info" size="lg" @click="getUserList"
                >회원 목록</b-button
              ></span
            >
            <span style="padding: 10px"
              ><b-button variant="outline-info" size="lg" @click="getNoticeList"
                >공지사항 목록</b-button
              ></span
            >
            <span style="padding: 10px"
              ><b-button variant="outline-info" size="lg" @click="getQnaList"
                >QnA 목록</b-button
              ></span
            >
          </div>
          <hr />
          <div v-if="this.isUserList == true">
            <b-table-simple
              header-row-class-name="thead-light"
              hover
              responsive
            >
              <b-thead>
                <b-tr>
                  <b-th>ID</b-th>
                  <b-th>Name</b-th>
                  <b-th>Email</b-th>
                  <b-th>JoinDate</b-th>
                </b-tr>
              </b-thead>
              <tbody>
                <b-tr
                  class="mb-1"
                  v-for="(user, index) in users"
                  :key="index"
                  v-bind="user"
                  style="cursor: pointer"
                >
                  <b-td>{{ user.userid }}</b-td>
                  <b-td>{{ user.name }}</b-td>
                  <b-td>{{ user.email }}</b-td>
                  <b-td>{{ user.joindate }}</b-td>
                </b-tr>
              </tbody>
            </b-table-simple>
          </div>
          <div v-if="this.isNoticeList == true">
            <b-table-simple
              header-row-class-name="thead-light"
              hover
              responsive
            >
              <b-thead>
                <b-tr>
                  <b-th>No</b-th>
                  <b-th>Title</b-th>
                  <b-th>Writer</b-th>
                  <b-th>Regdate</b-th>
                </b-tr>
              </b-thead>
              <tbody>
                <b-tr
                  class="mb-1"
                  v-for="(notice, index) in notices"
                  :key="index"
                  v-bind="notice"
                  style="cursor: pointer"
                >
                  <b-td>{{ notice.no }}</b-td>
                  <b-td>{{ notice.title }}</b-td>
                  <b-td>{{ notice.writer }}</b-td>
                  <b-td>{{ notice.writeTime }}</b-td>
                </b-tr>
              </tbody>
            </b-table-simple>
          </div>
          <div v-if="this.isQnaList == true">
            <b-table-simple
              header-row-class-name="thead-light"
              hover
              responsive
            >
              <b-thead>
                <b-tr>
                  <b-th>No</b-th>
                  <b-th>Title</b-th>
                  <b-th>Writer</b-th>
                  <b-th>Regtime</b-th>
                </b-tr>
              </b-thead>
              <tbody>
                <b-tr
                  class="mb-1"
                  v-for="(qna, index) in qnas"
                  :key="index"
                  v-bind="qna"
                  style="cursor: pointer"
                >
                  <b-td>{{ qna.no }}</b-td>
                  <b-td>{{ qna.title }}</b-td>
                  <b-td>{{ qna.writer }}</b-td>
                  <b-td>{{ qna.regtime }}</b-td>
                </b-tr>
              </tbody>
            </b-table-simple>
          </div>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { selectUsers } from "@/api/user.js";
import { selectNotice } from "@/api/notice.js";
import { selectQna } from "@/api/qna.js";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "UserMyPage",
  data() {
    return {
      users: [],
      qnas: [],
      notices: [],
      isUserList: false,
      isNoticeList: false,
      isQnaList: false,
    };
  },
  components: {},
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
  },
  methods: {
    movePage() {
      this.$router.push({
        name: "Modify",
        params: { userid: this.userInfo.userid },
      });
    },
    getUserList() {
      console.log(this.isUserList);
      if (this.isUserList == false) {
        this.isUserList = true;
        let user = {};
        selectUsers(
          user,
          (response) => {
            this.users = response.data;
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.isUserList = false;
      }
    },
    getNoticeList() {
      if (this.isNoticeList == false) {
        this.isNoticeList = true;
        let param = {};
        selectNotice(
          param,
          (response) => {
            this.notices = response.data;
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.isNoticeList = false;
      }
    },
    getQnaList() {
      if (this.isQnaList == false) {
        this.isQnaList = true;
        let param = {};
        selectQna(
          param,
          (response) => {
            this.qnas = response.data;
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.isQnaList = false;
      }
    },
  },
};
</script>

<style></style>
