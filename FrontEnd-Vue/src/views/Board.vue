<template>
  <div>
    <section id="headSection">
      <img src="../assets/breadcrumb-bg.jpg" alt="이미지" />
      <!-- <div class="text"><b-icon icon="chat-square-text"></b-icon>Board</div> -->
    </section>
    <router-view></router-view>
  </div>
  <!-- class="bv-example-row mt-3 text-center" -->
</template>

<script>
export default {};
</script>

<style scoped>
#headSession {
  position: relative;
}

.text {
  position: absolute;
  text-align: center;
  padding: 25px;
  width: 300px;
  height: 100px;
  background-color: white;
  color: black;
  opacity: 0.5;
  font-weight: bold;
  font-size: 22pt;
  top: 200px;
  left: 400px;
}
</style>
