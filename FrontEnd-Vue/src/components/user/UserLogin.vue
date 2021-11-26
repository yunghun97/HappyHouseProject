<template>
  <div>
    <div class="py-7 py-lg-8 pt-lg-9 mt-5" style="margin-top: 50px">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-black">Welcome!</h1>
              <p class="text-lead text-black">
                HappyHouse에서 더 많은 것을 이용하고 싶다면<br />로그인해주세요!
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
                <strong>Sign In</strong>
              </div>
              <div>
                <b-form>
                  <b-form-input
                    type="text"
                    id="userid"
                    v-model="user.userid"
                    placeholder="아이디"
                    required
                  /><br />
                  <b-form-input
                    type="password"
                    id="password"
                    v-model="user.password"
                    placeholder="비밀번호"
                    required
                  />
                  <div class="text-center">
                    <b-button
                      type="button"
                      block
                      variant="success"
                      class="my-4"
                      @click="confirm"
                      >로그인</b-button
                    >
                  </div>
                  <hr />
                  <div class="text-center text-muted mb-4">
                    <small>Sign In With</small>
                  </div>

                  <a href="#" class="btn">
                    <span class="btn-inner--icon"
                      ><img
                        src="../../assets/KakaoBtn.png"
                        style="width: 280px"
                    /></span>
                  </a>
                </b-form>
              </div>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link :to="{ name: 'Find' }" class="text-black"
                ><small>아이디/비밀번호 찾기</small></router-link
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
import { mapState, mapActions } from "vuex";

const userStore = "userStore";
export default {
  name: "UserLogin",
  data() {
    return {
      user: {
        userid: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(userStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      console.dir(this.user);
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "Main" });
      } else {
        alert("아이디 또는 비밀번호를 확인하세요.");
      }
    },
  },
};
</script>

<style scoped></style>
