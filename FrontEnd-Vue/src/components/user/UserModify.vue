<template>
  <b-card class="pt-5 text-center" v-if="userInfo">
    <h2>Update MyPage</h2>
    <b-card-body class="px-lg-5 py-lg-5">
      <div class="text-center">
        <img
          src="../../assets/profile.png"
          alt="프로필"
          style="height: 200px"
        />
        <b-form>
          <div class="h5 font-weight-300" style="margin-left: 400px">
            <i class="ni location_pin mr-2"></i>
            <b-form-group
              id="fieldset-horizontal"
              label-cols-sm="1"
              label-cols-lg="2"
              content-cols-sm
              content-cols-lg="3"
              label="ID"
              label-for="input-horizontal"
            >
              <b-form-input
                id="input-horizontal"
                v-model="userInfo.userid"
                disabled
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="fieldset-horizontal"
              label-cols-sm="1"
              label-cols-lg="2"
              content-cols-sm
              content-cols-lg="3"
              label="Name"
              label-for="input-horizontal"
            >
              <b-form-input
                id="input-horizontal"
                v-model="userInfo.name"
                disabled
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="fieldset-horizontal"
              label-cols-sm="1"
              label-cols-lg="2"
              content-cols-sm
              content-cols-lg="3"
              label="Password"
              label-for="input-horizontal"
            >
              <b-form-input
                type="password"
                id="input-horizontal"
                v-model="user.password"
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="fieldset-horizontal"
              label-cols-sm="1"
              label-cols-lg="2"
              content-cols-sm
              content-cols-lg="3"
              label="Re-Password"
              label-for="input-horizontal"
            >
              <b-form-input
                type="password"
                id="input-horizontal"
                v-model="user.password2"
                placeholder="Re-Enter password"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="fieldset-horizontal"
              label-cols-sm="1"
              label-cols-lg="2"
              content-cols-sm
              content-cols-lg="3"
              label="Email"
              label-for="input-horizontal"
            >
              <b-form-input
                id="input-horizontal"
                v-model="userInfo.email"
                disabled
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="h5 mt-4">
            <b-button
              variant="outline-info"
              type="button"
              @click="onUpdate"
              class="mr-3"
              >정보수정</b-button
            >
            <b-button variant="danger" type="button" @click.prevent="onDelete"
              >회원탈퇴</b-button
            >
          </div>
        </b-form>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "UserModify",
  data() {
    return {
      user: {
        userid: "",
        name: "",
        password: "",
        password2: "",
        email: "",
      },
    };
  },
  components: {},
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations(userStore, ["SET_IS_DELETE", "SET_USER_INFO"]),
    ...mapActions(userStore, ["deleteConfirm", "updateConfirm"]),
    async onDelete() {
      console.dir(this.userInfo);
      await this.deleteConfirm(this.userInfo);
      this.SET_IS_DELETE(true);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      alert("탈퇴 완료!");
      this.$router.push({ name: "Main" });
    },
    async onUpdate() {
      if (this.user.password == "") {
        alert("비밀번호를 입력해주세요");
      } else if (this.user.password != this.user.password2) {
        alert("비밀번호를 다시 입력해주세요");
        (this.user.password = ""), (this.user.password2 = "");
      } else {
        await this.updateConfirm({
          userid: this.userInfo.userid,
          name: this.userInfo.name,
          password: this.user.password,
          email: this.userInfo.email,
        });
        alert("수정 완료!");
        this.$router.push({ name: "MyPage" });
      }
    },
  },
};
</script>

<style scoped>
input {
  margin-left: 20px;
}
</style>
