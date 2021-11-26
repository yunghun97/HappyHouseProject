<template>
  <div>
    <div class="py-7 py-lg-8 pt-lg-9 mt-5" style="margin-top: 50px">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-black">Welcome!</h1>
              <p class="text-lead text-black">
                HappyHouse에서 더 많은 것을 이용하고 싶다면<br />회원가입해주세요!
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
                <strong>Sign Up</strong>
              </div>
              <div>
                <b-form>
                  <b-form-group
                    id="id"
                    label-for="inputId"
                    valid-feedback="사용할 수 있는 아이디입니다."
                    :invalid-feedback="invalidId"
                    :state="idState"
                  >
                    <b-form-input
                      type="text"
                      id="inputId"
                      v-model.trim="user.userid"
                      :state="idState"
                      placeholder="아이디"
                      required
                    />
                  </b-form-group>

                  <b-form-group
                    id="name"
                    label-for="inputName"
                    valid-feedback="이름 확인."
                    :invalid-feedback="invalidName"
                    :state="nameState"
                  >
                    <b-form-input
                      type="text"
                      id="inputName"
                      v-model.trim="user.name"
                      :state="nameState"
                      placeholder="이름"
                      required
                    />
                  </b-form-group>

                  <b-form-group
                    id="pwd"
                    label-for="inputPwd"
                    valid-feedback="사용할 수 있는 비밀번호입니다."
                    :invalid-feedback="invalidPwd"
                    :state="pwdState"
                  >
                    <b-form-input
                      type="password"
                      id="inputPwd"
                      v-model.trim="user.password"
                      :state="pwdState"
                      placeholder="비밀번호"
                      required
                    />
                  </b-form-group>

                  <b-form-group
                    id="pwd2"
                    label-for="inputPwd2"
                    valid-feedback="일치하는 비밀번호입니다."
                    :invalid-feedback="invalidPwd2"
                    :state="pwdCheck"
                  >
                    <b-form-input
                      type="password"
                      id="inputPwd2"
                      v-model.trim="password2"
                      :state="pwdCheck"
                      placeholder="비밀번호 재입력"
                      required
                    />
                  </b-form-group>

                  <b-form-group
                    id="email"
                    label-for="inputEmail"
                    valid-feedback="사용할 수 있는 이메일입니다."
                    :invalid-feedback="invalidEmail"
                    :state="emailState"
                  >
                    <b-form-input
                      type="text"
                      id="inputEmail"
                      v-model.trim="user.email"
                      :state="emailState"
                      placeholder="Email"
                      required
                    />
                  </b-form-group>
                  <div class="text-center">
                    <b-button
                      class="my-4"
                      block
                      variant="success"
                      @click.prevent="onSubmit"
                      >회원가입</b-button
                    >
                  </div>
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
              <router-link :to="{ name: 'Login' }" class="text-black"
                ><small>로그인</small></router-link
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
  name: "UserJoin",
  data() {
    return {
      password2: null,
      user: {
        userid: "",
        name: "",
        password: "",
        email: "",
      },
    };
  },
  updated() {},
  computed: {
    ...mapState(userStore, ["isJoin"]),
    idState() {
      return this.user.userid.length > 0 && this.user.userid.length < 16;
    },
    invalidId() {
      return " 4~16자 영문 대 소문자, 숫자를 사용하세요.";
    },
    nameState() {
      return this.user.name.length > 1;
    },
    invalidName() {
      return "이름을 입력하세요.";
    },
    pwdState() {
      return this.user.password.length > 3 && this.user.password.length < 20;
    },
    invalidPwd() {
      return "3~20자 영문 대 소문자, 숫자를 사용하세요.";
    },
    pwdCheck() {
      return this.user.password == this.password2;
    },
    invalidPwd2() {
      return "비밀번호가 일치하지 않습니다.";
    },
    emailState() {
      return this.user.email.length > 13;
    },
    invalidEmail() {
      return "email@example.com";
    },
  },
  methods: {
    ...mapActions(userStore, ["joinConfirm"]),
    async onSubmit() {
      await this.joinConfirm(this.user);

      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped></style>
