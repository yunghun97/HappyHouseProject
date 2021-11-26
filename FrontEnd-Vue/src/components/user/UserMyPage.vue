<template>
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
        <div class="h5 mt-4">
          <b-button
            variant="outline-info"
            block
            type="button"
            @click="movePage"
            class="mr-1"
            >정보수정</b-button
          >
        </div>
        <hr class="my-4" />
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "UserMyPage",
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
  },
};
</script>

<style></style>
