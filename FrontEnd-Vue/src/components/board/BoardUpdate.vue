<template>
  <b-container class="bv-example-row mt-3">
    <b-row> </b-row>
    <board-write-form type="modify" />
  </b-container>
</template>

<script>
import BoardWriteForm from "./child/BoardWriteForm.vue";

export default {
  name: "BoardUpdate",
  components: {
    BoardWriteForm,
  },
};
</script>

<style></style>
