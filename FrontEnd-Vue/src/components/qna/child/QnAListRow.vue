<template>
  <b-tr @click="checkUser" style="cursor: pointer">
    <b-td class="text-left">
      {{ no }}
    </b-td>
    <b-td>{{ title }}</b-td>
    <b-td>{{ writer }}</b-td>
    <b-td>{{ regtime }}</b-td>
  </b-tr>
</template>

<script>
import { mapState } from "vuex";
const userStore = "userStore";
export default {
  name: "QnaListRow",
  props: {
    no: Number,
    title: String,
    writer: String,
    regtime: String,
  },
  computed: { ...mapState(userStore, ["userInfo"]) },
  methods: {
    checkUser() {
      if (
        this.userInfo.userid == this.writer ||
        this.userInfo.userid == "admin"
      ) {
        this.$router.push({ name: "QnAView", params: { no: this.no } });
      } else {
        alert("작성자만 확인 가능합니다.");
      }
    },
  },
};
</script>

<style></style>
