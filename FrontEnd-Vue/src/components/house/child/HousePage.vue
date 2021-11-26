<template>
  <div v-if="apts.length>=1" id="housePage">
      <div id="title">리모컨</div>
      <button class="pageButton" style="margin-top:20px">
       <b-icon icon="chevron-double-left" id="dbleftBtn" @click="gostartPoint"></b-icon>
      </button>
      <button class="pageButton" id="leftBtn" @click="goBeforePoint">
        <b-icon icon="chevron-left"></b-icon>
      </button>
      <button class="pageButton" id="rightBtn" @click="goNextPoint">
       <b-icon icon="chevron-right"></b-icon>
      </button>
      <button class="pageButton" id="dbrightBtn" @click="goEndPoint">
        <b-icon icon="chevron-double-right" ></b-icon>
      </button>
      <input type="text" v-model="page" id="pageInput" @change="move"> /
      <span>{{maxPage}}</span>
      <button id="pageMove" @click="move">이동</button>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  data(){
    return{
      page:1,
    }
  },
  updated() {
    if(this.minPage===this.nowPage) this.page = this.minPage;
  },
  computed:{
    ...mapState("houseStore", ["apts","minPage","nowPage","maxPage"]),
  },
  methods:{
    ...mapMutations("houseStore", ["GO_FIRST","GO_BEFORE","GO_NEXT","GO_LAST","SET_NOWPAGE_LIST","SET_PAGE"]),
    gostartPoint(){
      this.GO_FIRST();
      this.SET_NOWPAGE_LIST(this.nowPage);
      this.page = this.nowPage;
    },
    goBeforePoint(){
      this.GO_BEFORE();
      this.SET_NOWPAGE_LIST(this.nowPage);
      this.page = this.nowPage;
    },
    goNextPoint(){
      this.GO_NEXT();
      this.SET_NOWPAGE_LIST(this.nowPage);
      this.page = this.nowPage;
    },
    goEndPoint(){
      this.GO_LAST();
      this.SET_NOWPAGE_LIST(this.nowPage);
      this.page = this.nowPage;
    },
    move(){
      let page = parseInt(this.page);
      console.log(this.page);
      if(!page||page<1||page>this.maxPage){
        alert("페이지 숫자를 정확히 입력해주세요!!");
        this.page = this.nowPage;
      }
      else{
      this.SET_PAGE(page);
      this.SET_NOWPAGE_LIST(page);
      this.page = this.nowPage;
      }
    }
  }
}
</script>

<style scoped>
#title{
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  background-color: gainsboro;
}
.pageButton{
  background-color:beige;
  border-radius: 30px;
}
.pageButton:hover{
  background-color: antiquewhite;
}
#pageInput{
  margin-left: 10px;
  margin-top: 15px;
  text-align: center;
  width: 30px;
  height: 20px;
}
#pageMove{
  background-color:beige;
  margin-left: 30px;
  font-size: 15px;
  height: 30px;
  border: 1px solid black;
  border-radius: 30px;
}
#pageMove:hover{
  background-color: antiquewhite;
}
#leftBtn{
  margin-left: 10px;
}
#dbrightBtn{
  margin-left: 10px;
} 
</style>
