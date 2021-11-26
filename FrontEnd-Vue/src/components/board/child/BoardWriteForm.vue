<template>
  <div class="write_container">
    <b-container class="bv-example-row">
      <div class="text">게시글 작성</div>
      <b-row class="mb-1">
        <b-col style="text-align: left">
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group id="title-group">
              <b-form-input
                v-model="board.title"
                type="text"
                required
                style="height: 70px; margin-bottom: 20px; padding: 20px"
                placeholder="제목을 입력하세요.."
              ></b-form-input>
            </b-form-group>

            <b-form-group id="content-group">
              <b-form-textarea
                v-model="board.content"
                placeholder="내용을 입력하세요.."
                required
                rows="15"
                no-resize
                style="padding: 20px"
              ></b-form-textarea>
            </b-form-group>
            <div class="text-center mt-5">
              <b-button
                type="submit"
                variant="outline-success"
                class="m-1"
                size="lg"
                v-if="this.type === 'register'"
                >등록</b-button
              >
              <b-button
                type="submit"
                variant="outline-success"
                class="m-1"
                v-else
                >수정</b-button
              >
              <b-button type="reset" variant="success" class="m-1" size="lg"
                >취소</b-button
              >
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { writePost, getPost, modifyPost } from "@/api/board";
import { mapState } from "vuex";
const userStore = "userStore";

export default {
  name: "BoardWriteForm",
  data() {
    return {
      board: {
        boardno: 0,
        writer: "",
        title: "",
        content: "",
      },
      isWriter: false,
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      getPost(
        this.$route.params.boardno,
        ({ data }) => {
          this.board = data;
        },
        (error) => {
          console.log(error);
        }
      );
      this.isWriter = true;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.board.title &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.title.focus());
      err &&
        !this.board.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registPost() : this.updatePost();
    },
    onReset(event) {
      event.preventDefault();
      this.board.boardno = 0;
      this.board.title = "";
      this.board.content = "";
      alert("작성을 취소하시겠습니까?");
      this.$router.push({ name: "BoardList" });
    },
    registPost() {
      writePost(
        {
          writer: this.userInfo.userid,
          title: this.board.title,
          content: this.board.content,
        },
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    updatePost() {
      modifyPost(
        {
          boardno: this.board.boardno,
          writer: this.userInfo.userid,
          title: this.board.title,
          content: this.board.content,
        },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "BoardList" });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.push({ name: "BoardList" });
    },
  },
};
</script>

<style scoped>
.write_container {
  margin: 100px;
}

.text {
  height: 100px;
  color: black;
  font-weight: bold;
  font-size: 22pt;
}
</style>
