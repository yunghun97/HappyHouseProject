<template>
  <div class="write_container">
    <b-container class="bv-example-row">
      <div class="text">질문하기</div>
      <b-row class="mb-1">
        <b-col style="text-align: left">
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group id="title-group">
              <b-form-input
                v-model="qna.title"
                type="text"
                required
                style="height: 70px; margin-bottom: 20px; padding: 20px"
                placeholder="질문을 입력하세요.."
              ></b-form-input>
            </b-form-group>

            <b-form-group id="content-group">
              <b-form-textarea
                v-model="qna.content"
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
                >등록</b-button
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
import { writeQna, getQna } from "@/api/qna";
import { mapState } from "vuex";
const userStore = "userStore";

export default {
  name: "QnAWrite",
  data() {
    return {
      qna: {
        no: 0,
        writer: "",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  created() {
    getQna(
      this.$route.params.no,
      ({ data }) => {
        this.qna = data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.qna.title &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.title.focus());
      err &&
        !this.qna.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      this.registQna();
    },
    onReset(event) {
      event.preventDefault();
      this.qna.no = 0;
      this.qna.title = "";
      this.qna.content = "";
      alert("작성을 취소하시겠습니까?");
      this.$router.push({ name: "QnAList" });
    },
    registQna() {
      writeQna(
        {
          writer: this.userInfo.userid,
          title: this.qna.title,
          content: this.qna.content,
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
    moveList() {
      this.$router.push({ name: "QnAList" });
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
