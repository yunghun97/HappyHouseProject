<template>
  <div class="view_container">
    <b-container class="bv-example-row">
      <b-row class="mb-4">
        <b-col class="text-left">
          <b-button variant="outline-secondary" @click="selectBoard"
            >&lt;</b-button
          >
        </b-col>
        <b-col
          class="text-right"
          v-if="
            this.userInfo &&
            (this.userInfo.userid == this.board.writer ||
              this.userInfo.userid == 'admin')
          "
        >
          <b-button variant="outline-success" @click="modifyPost" class="mr-2"
            >글수정</b-button
          >
          <b-button variant="outline-danger" @click="deleteBoard"
            >글삭제</b-button
          >
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col>
          <b-card
            :header-html="`
            <div style='text-align:right;'>
          <div>${board.writeTime}</div><div>작성자 : ${board.writer}</div> 
          </div>
          <h1>${board.title}</h1>`"
            class="mb-2"
            header-bg-variant="transparent"
            border-variant="Secondary"
            style="height: 500px"
          >
            <b-card-body class="text-left mb-2" style="height: 500px">
              <div v-html="message"></div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col>
          <b-input-group>
            <b-form-input
              type="text"
              placeholder="댓글을 작성해주세요."
              v-model="comment.content"
              @click="checkUser"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="secondary" @click="registComment"
                >등록</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <hr />
      <div class="text-left">
        <p>댓글</p>
      </div>
      <div>
        <b-table-simple header-row-class-name="thead-light" hover responsive>
          <tbody>
            <comment-list-row
              v-for="(comment, index) in comments"
              :key="index"
              v-bind="comment"
            />
          </tbody>
        </b-table-simple>
      </div>
    </b-container>
  </div>
</template>

<script>
import CommentListRow from "@/components/board/child/CommentListRow";
import { getPost, deleteBoard, selectComment, addReply } from "@/api/board";
import { mapState } from "vuex";

const userStore = "userStore";
export default {
  data() {
    return {
      board: {},
      comments: {},
      comment: {
        boardno: 0,
        writer: "",
        content: "",
      },
    };
  },
  components: {
    CommentListRow,
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    message() {
      if (this.board.content)
        return this.board.content.split("\n").join("<br>");
      return "";
    },
  },
  mounted() {
    getPost(
      this.$route.params.boardno,
      (response) => {
        this.board = response.data;
      },
      (error) => {
        console.log("삭제시 에러발생!!", error);
      }
    );
    selectComment(
      this.$route.params.boardno,
      (response) => {
        this.comments = response.data;
      },
      (error) => {
        console.log("에러발생!!", error);
      }
    );
  },
  updated() {
    selectComment(this.$route.params.boardno, (response) => {
      this.comments = response.data;
    });
  },
  methods: {
    selectBoard() {
      this.$router.push({ name: "BoardList" });
    },
    modifyPost() {
      this.$router.replace({
        name: "BoardUpdate",
        params: { boardno: this.board.boardno },
      });
    },
    deleteBoard() {
      if (confirm("삭제하시겠습니까?")) {
        deleteBoard(this.board.boardno, () => {
          this.$router.push({ name: "BoardList" });
        });
      }
    },
    checkUser() {
      if (!this.userInfo) {
        alert("로그인 후 이용가능합니다.");
        this.$router.push({ name: "Login" });
      }
    },
    registComment() {
      addReply(
        {
          boardno: this.board.boardno,
          writer: this.userInfo.userid,
          content: this.comment.content,
        },
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          this.comment.content = "";
          console.log(msg);
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
.view_container {
  margin: 100px;
}
</style>
