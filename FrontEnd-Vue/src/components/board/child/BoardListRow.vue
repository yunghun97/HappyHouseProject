<template>
  <b-tr @click="movePage" style="cursor: pointer">
    <b-td>{{ boardno }}</b-td>
    <b-td>{{ title }} </b-td>
    <b-td>{{ writer }}</b-td>
    <b-td>{{ writeTime }}</b-td>
    <b-td>{{ views }}</b-td>
  </b-tr>
</template>

<script>
export default {
  name: "BoardListRow",
  props: {
    boardno: Number,
    title: String,
    writer: String,
    writeTime: String,
    views: Number,
  },
  computed: {},
  methods: {
    movePage() {
      this.$router.push({
        name: "BoardView",
        params: { boardno: this.boardno },
      });
    },
  },
};
</script>

<style></style>
