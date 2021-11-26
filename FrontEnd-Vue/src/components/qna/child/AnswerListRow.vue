<template>
  <div class="answer_container mt-2">
    <div class="p-4">
      <span><b-avatar style="margin-right: 7px"></b-avatar> {{ writer }} </span>
      <b-button variant="secondary" style="float: right" @click="deleteBtn"
        >삭제</b-button
      >
      <div style="padding: 20px; font-size: 12pt">{{ content }}</div>
    </div>
  </div>
</template>

<script>
import { deleteAnswer } from "@/api/qna";
import { mapState } from "vuex";
const userStore = "userStore";
export default {
  name: "CommentListRow",
  props: {
    writer: String,
    content: String,
    no: Number,
  },
  computed: { ...mapState(userStore, ["userInfo"]) },
  updated() {},
  methods: {
    deleteBtn() {
      deleteAnswer(this.no, () => {
        alert("삭제 완료!");
      });
    },
  },
};
</script>

<style scoped>
.answer_container {
  background-color: #f6f6f6;
  border: 1px solid lightgray;
}
</style>
