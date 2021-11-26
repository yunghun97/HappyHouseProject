<template>
  <div class="qna_container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <div class="text">
            <b-icon icon="chat-square-text"></b-icon> Q&amp;A
          </div>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col class="text-right">
          <b-button variant="outline-secondary" @click="moveWrite()"
            >질문하기</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col v-if="qnas.length">
          <b-table-simple header-row-class-name="thead-light" hover responsive>
            <b-thead>
              <b-tr>
                <b-th>번호</b-th>
                <b-th>제목</b-th>
                <b-th>작성자</b-th>
                <b-th>작성일</b-th>
              </b-tr>
            </b-thead>
            <tbody>
              <qna-list-row
                v-for="(qna, index) in qnas"
                :key="index"
                v-bind="qna"
              />
            </tbody>
          </b-table-simple>
        </b-col>
        <b-col v-else class="text-center">질문 목록이 없습니다.</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import QnaListRow from "@/components/qna/child/QnAListRow";
import { selectQna } from "@/api/qna.js";

export default {
  name: "QnAList",
  components: {
    QnaListRow,
  },
  data() {
    return {
      qnas: [],
    };
  },
  mounted() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    selectQna(
      param,
      (response) => {
        this.qnas = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "QnAWrite" });
    },
  },
};
</script>

<style scoped>
.qna_container {
  margin: 100px;
}
.text {
  height: 100px;
  color: black;
  font-weight: bold;
  font-size: 22pt;
}
</style>
