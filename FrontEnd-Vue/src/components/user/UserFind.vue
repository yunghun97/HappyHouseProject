<template>
  <div>
    <div class="py-7 py-lg-8 pt-lg-9 mt-5" style="margin-top: 50px">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-black">Forgot Id, Password?</h1>
              <p class="text-lead text-black">
                아이디 또는 비밀번호가 생각이 안난다면<br />찾으세요!
              </p>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </div>
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card>
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <strong>아이디 찾기</strong>
              </div>
              <div>
                <b-form
                  ><b-form-input
                    type="text"
                    v-model="userId.name"
                    placeholder="이름"
                  /><br />
                  <b-form-input
                    type="text"
                    v-model="userId.email"
                    placeholder="이메일"
                  />
                  <div class="text-center mt-3">
                    <b-button variant="success" block @click="findIdBtn"
                      >찾기</b-button
                    >
                  </div>
                </b-form>
              </div>
              <hr />
              <div class="text-center text-muted mb-4">
                <strong>비밀번호 찾기</strong>
              </div>
              <div>
                <b-form>
                  <b-form-input
                    type="text"
                    v-model="userPwd.userid"
                    placeholder="아이디"
                  />
                  <br />
                  <b-form-input
                    type="text"
                    v-model="userPwd.email"
                    placeholder="이메일"
                  />
                  <div class="text-center mt-3">
                    <b-button variant="success" block @click="findPwdBtn"
                      >찾기</b-button
                    >
                  </div>
                </b-form>
              </div>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link :to="{ name: 'Login' }" class="text-black"
                ><small>뒤로</small></router-link
              >
            </b-col>
            <b-col cols="6" class="text-right">
              <router-link :to="{ name: 'Join' }" class="text-black"
                ><small>회원가입</small></router-link
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
const userStore = "userStore";
export default {
  name: "UserFind",
  data() {
    return {
      userId: {
        name: null,
        email: null,
      },
      userPwd: {
        userid: null,
        email: null,
      },
    };
  },
  computed: {
    ...mapState(userStore, ["isFindId", "isFindPwd", "userInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["findIdConfirm", "findPwdConfirm"]),
    async findIdBtn() {
      await this.findIdConfirm(this.userId);
      if (this.isFindId) {
        alert(`회원님의 아이디는 ${this.userInfo}입니다.`);
      } else {
        alert("회원정보가 없습니다.");
      }
    },
    async findPwdBtn() {
      await this.findPwdConfirm(this.userPwd);
      if (this.isFindPwd) {
        alert(`회원님의 비밀번호는 ${this.userInfo}입니다.`);
      } else {
        alert("회원정보가 없습니다.");
      }
    },
  },
};
</script>

<style scoped></style>
