<template>
  <div class="mb-2">
    <div style="padding: 5px">
      <span class="writer_box">
        <b-avatar style="margin-right: 7px"></b-avatar> {{ writer }}</span
      >
      <span style="float: right; font-size: 11pt">
        <span>{{ writeTime }}</span>
        <span
          v-if="this.userInfo && this.userInfo.userid == this.writer"
          style="margin-left: 10px"
          ><b-button
            pill
            variant="outline-secondary"
            size="sm"
            @click="deleteBtn"
            >삭제</b-button
          ></span
        >
      </span>
    </div>
    <div class="content_box">{{ content }}</div>
    <hr />
  </div>
</template>

<script>
import { deleteComment } from "@/api/board";
import { mapState } from "vuex";
const userStore = "userStore";
export default {
  name: "CommentListRow",
  props: {
    writer: String,
    content: String,
    writeTime: String,
    commentno: Number,
  },
  computed: { ...mapState(userStore, ["userInfo"]) },
  methods: {
    deleteBtn() {
      deleteComment(this.commentno, () => {
        alert("삭제 완료!");
      });
    },
  },
};
</script>

<style scoped>
.writer_box {
  margin-right: 30px;
  font-size: 13pt;
}

.content_box {
  /* margin-top: 20px; */
  padding: 20px;
}
</style>
