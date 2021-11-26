<template>
  <div class="notice_container">
    <b-container class="bv-example-row">
      <div>
        <div class="text mb-4">
          <b-icon icon="chat-square-text"></b-icon> Notice
          <div
            class="text-right"
            v-if="this.userInfo && this.userInfo.userid == 'admin'"
          >
            <b-button variant="outline-secondary" @click="movePage"
              >공지등록</b-button
            >
          </div>
        </div>
        <b-card
          no-body
          class="mb-1"
          v-for="(item, index) in notices"
          :key="index"
          v-bind="item"
        >
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.toggleNo variant="light"
              ><div class="text-left">
                <span style="margin-right: 20px">{{ item.no }}.</span>
                <span>{{ item.title }}</span>
                <span>({{ item.writeTime }})</span>
              </div>
            </b-button>
          </b-card-header>
          <b-collapse id="toggleNo" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ item.content }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
import { selectNotice } from "@/api/notice.js";
import { mapState } from "vuex";

const userStore = "userStore";
export default {
  name: "NoticeList",
  data() {
    return {
      notices: [],
    };
  },
  created() {
    let param = {};
    selectNotice(
      param,
      (response) => {
        this.notices = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    movePage() {
      this.$router.push({ name: "NoticeRegist" });
    },
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
};
</script>

<style scoped>
.notice_container {
  margin: 100px;
}

.text {
  height: 100px;
  color: black;
  font-weight: bold;
  font-size: 22pt;
}
</style>
