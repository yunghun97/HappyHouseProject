<template>
  <div class="list_container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <div class="text">
            <b-icon icon="chat-square-text"></b-icon> Board
          </div>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col class="text-left">
          <b-input-group>
            <b-form-input
              type="text"
              placeholder="제목으로 검색하세요."
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-secondary">검색</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>

        <b-col class="text-right">
          <b-button variant="outline-secondary" @click="moveWrite()"
            >글쓰기</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col v-if="nowPageBoards.length">
          <b-table-simple hover responsive>
            <b-thead>
              <b-tr>
                <b-th>번호</b-th>
                <b-th>제목</b-th>
                <b-th>작성자</b-th>
                <b-th>작성일</b-th>
                <b-th> 조회수</b-th>
              </b-tr>
            </b-thead>
            <tbody>
              <board-list-row
                v-for="(board, index) in nowPageBoards"
                :key="index"
                v-bind="board"
              />
            </tbody>
          </b-table-simple>
        </b-col>
        <b-col v-else class="text-center">게시판 목록이 없습니다.</b-col>
      </b-row>
      <div class="mt-3 text-center">
        <button class="pageButton">
          <b-icon
            icon="chevron-double-left"
            id="dbleftBtn"
            @click="gostartPoint"
          ></b-icon>
        </button>
        <button class="pageButton" id="leftBtn" @click="goBeforePoint">
          <b-icon icon="chevron-left"></b-icon>
        </button>
        <input
          type="text"
          v-model="page"
          id="pageInput"
          @change="move"
          style="width: 20px; border: none"
        />
        /
        <span>{{ maxPage }}</span>
        <button class="pageButton" id="rightBtn" @click="goNextPoint">
          <b-icon icon="chevron-right"></b-icon>
        </button>
        <button class="pageButton" id="dbrightBtn" @click="goEndPoint">
          <b-icon icon="chevron-double-right"></b-icon>
        </button>
        <!-- <button id="pageMove" @click="move">이동</button> -->
      </div>
    </b-container>
  </div>
</template>

<script>
import BoardListRow from "@/components/board/child/BoardListRow";
import { mapState, mapActions } from "vuex";

export default {
  name: "BoardList",
  components: {
    BoardListRow,
  },
  data() {
    return {
      nowPageBoards: [],
      page: 1,
      showRowCount: 10, // 페이지 설정 변수
      minPage: 1,
      nowPage: 1,
      maxPage: 1,
    };
  },
  created() {
    this.getBoard();
    this.SET_PAGE_COUNT();
    this.SET_NOWPAGE_LIST(1);
  },
  updated() {
    if (this.minPage === this.nowPage) this.page = this.minPage;
  },
  computed: {
    ...mapState("boardStore", ["boards"]),
  },
  methods: {
    ...mapActions("boardStore", ["getBoard"]),
    moveWrite() {
      this.$router.push({ name: "BoardWrite" });
    },
    gostartPoint() {
      this.GO_FIRST();
      this.SET_NOWPAGE_LIST(this.nowPage);
      this.page = this.nowPage;
    },
    goBeforePoint() {
      this.GO_BEFORE();
      this.SET_NOWPAGE_LIST(this.nowPage);
      this.page = this.nowPage;
    },
    goNextPoint() {
      this.GO_NEXT();
      this.SET_NOWPAGE_LIST(this.nowPage);
      this.page = this.nowPage;
    },
    goEndPoint() {
      this.GO_LAST();
      this.SET_NOWPAGE_LIST(this.nowPage);
      this.page = this.nowPage;
    },
    move() {
      let page = parseInt(this.page);
      console.log(this.page);
      if (!page || page < 1 || page > this.maxPage) {
        alert("페이지 숫자를 정확히 입력해주세요!!");
        this.page = this.nowPage;
      } else {
        this.SET_PAGE(page);
        this.SET_NOWPAGE_LIST(page);
        this.page = this.nowPage;
      }
    },
    SET_PAGE_COUNT() {
      // 페이지를 설정한다.
      console.log("실행");
      console.log(this.boards);
      this.nowPage = 1;
      this.minPage = 1;
      if (this.boards.length % this.showRowCount === 0) {
        this.maxPage = parseInt(this.boards.length / this.showRowCount);
      } else if (
        this.boards.length % this.showRowCount != 0 &&
        this.boards.length > this.showRowCount
      ) {
        this.maxPage = parseInt(this.boards.length / this.showRowCount + 1);
      } else {
        this.maxPage = 1;
      }
    },
    CLEAR_PAGE_APTS() {
      // 페이지 초기화
      this.nowPageBoards = [];
    },
    SET_NOWPAGE_LIST(num) {
      // 현재 페이지에서 보여 줄 정보를 설정한다.
      this.nowPageBoards = [];
      for (
        let i = (num - 1) * this.showRowCount;
        i < num * this.showRowCount;
        i++
      ) {
        if (i >= this.boards.length) return false;
        this.nowPageBoards.push(this.boards[i]);
      }
    },
    GO_FIRST() {
      // 페이지 처음으로 이동
      this.nowPage = 1;
    },
    GO_BEFORE() {
      // 페이지 왼쪽 1칸
      if (this.nowPage - 1 >= this.minPage) {
        this.nowPage -= 1;
      }
    },
    GO_NEXT() {
      // 페이지 오른쪽 1칸
      if (this.nowPage + 1 <= this.maxPage) {
        this.nowPage += 1;
      }
    },
    GO_LAST() {
      // 페이지 마지막
      this.nowPage = this.maxPage;
    },
    SET_PAGE(num) {
      // 현재 페이지 변경
      this.nowPage = num;
    },
  },
};
</script>

<style scoped>
.list_container {
  margin: 100px;
}
.text {
  height: 100px;
  color: black;
  font-weight: bold;
  font-size: 22pt;
}

.pageButton,
#pageMove {
  background-color: white;
  border: none;
}

.pageButton:hover {
  color: lightblue;
}
</style>
