<template>
  <div class="qna_container">
    <b-container class="bv-example-row">
      <b-row class="mb-4">
        <b-col class="text-left">
          <b-button variant="outline-secondary" @click="selectQna"
            >&lt;</b-button
          >
        </b-col>
        <b-col class="text-right">
          <b-button variant="outline-danger" size="sm" @click="deleteBtn"
            >질문삭제</b-button
          >
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col>
          <b-card
            :header-html="`
            <div style='text-align:right;'>
          <div>${qna.regtime}</div><div>작성자 : ${qna.writer}</div> 
          </div>
          <h2>${qna.title}</h2>
          `"
            class="mb-2"
            border-variant="Secondary"
            header-bg-variant="transparent"
            style="height: 500px"
          >
            <b-card-body class="text-left mb-2">
              <div v-html="message"></div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mb-1" v-if="this.userInfo.userid == 'admin'">
        <b-col>
          <b-input-group>
            <b-form-input
              type="text"
              v-model="answer.content"
              placeholder="답변을 작성해주세요."
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="secondary" @click="registAnswer"
                >등록</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <div>
        <b-table-simple header-row-class-name="thead-light" hover responsive>
          <tbody>
            <answer-list-row
              v-for="(answer, index) in answers"
              :key="index"
              v-bind="answer"
            />
          </tbody>
        </b-table-simple>
      </div>
    </b-container>
  </div>
</template>

<script>
import AnswerListRow from "@/components/qna/child/AnswerListRow";
import { getQna, deleteQna, selectAnswer, addAnswer } from "@/api/qna";
import { mapState } from "vuex";

const userStore = "userStore";
export default {
  data() {
    return {
      qna: {},
      answers: {},
      answer: {
        qno: 0,
        writer: "",
        content: "",
      },
    };
  },
  components: {
    AnswerListRow,
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    message() {
      if (this.qna.content) return this.qna.content.split("\n").join("<br>");
      return "";
    },
  },
  mounted() {
    getQna(
      this.$route.params.no,
      (response) => {
        this.qna = response.data;
      },
      (error) => {
        console.log("삭제시 에러발생!!", error);
      }
    );
    selectAnswer(
      this.$route.params.no,
      (response) => {
        this.answers = response.data;
      },
      (error) => {
        console.log("에러발생!!", error);
      }
    );
  },
  updated() {
    selectAnswer(this.$route.params.no, (response) => {
      this.answers = response.data;
    });
  },
  methods: {
    selectQna() {
      this.$router.push({ name: "QnAList" });
    },
    deleteBtn() {
      if (confirm("삭제하시겠습니까?")) {
        deleteQna(this.qna.no, () => {
          this.$router.push({ name: "QnAList" });
        });
      }
    },
    registAnswer() {
      addAnswer(
        {
          qno: this.qna.no,
          writer: this.userInfo.userid,
          content: this.answer.content,
        },
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          // this.$router.go();
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped>
.qna_container {
  margin: 100px;
}
</style>
