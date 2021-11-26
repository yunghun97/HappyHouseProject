<template>
  <div>
    <div>
      <section id="headSection">
        <img id= "headImg" src="../../assets/breadcrumb-bg.jpg" alt="이미지" />
      </section>
      <router-view></router-view>
    </div>
    <div class="house_container">
      <div class="text"><b-icon icon="search"></b-icon>매매정보검색</div>
      <house-map id="housemap"></house-map>
      <house-sidebar id="sidebar"></house-sidebar>
      <house-page id="housePage"></house-page>
      <house-list></house-list>
    </div>
  </div>
</template>

<script>
import HouseSidebar from "@/components/house/child/HouseSidebar.vue";
import HouseList from "@/components/house/child/HouseList.vue";
import HouseMap from "@/components/house/child/HouseMap.vue";
import HousePage from "@/components/house/child/HousePage.vue";
import { mapMutations } from "vuex";
export default {
  name: "house",
  components: {
    HouseSidebar,
    HouseList,
    HouseMap,
    HousePage,
  },
  created() {
    this.CLEAR_PAGE_APTS();
  },
  methods: {
    ...mapMutations("houseStore", ["CLEAR_PAGE_APTS"]),
  },
};
</script>
<style scoped>
#headImg{
  width: 100%;
}
#headSection {
  position: relative;
}
.house_container {
  margin: 100px;
}

.text {
  height: 100px;
  padding: 25px;
  color: black;
  font-weight: bold;
  font-size: 22pt;
  text-align: center;
}
#housemap {
  display: inline-block;
  width: 70%;
}
#sidebar {
  float: right;
  width: 30%;
}
#housePage {
  position: sticky;
  margin-top: 50px;
  float: right;
  width: 155px; 
  height: 150px;
  border: 1px solid black;
  top: 150px;
  right: 0px;
}
</style>
