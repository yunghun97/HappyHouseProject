<template>
  <div>
    <div id="title">
      <b-icon icon="building"></b-icon> 검색결과
    </div>
    <b-table v-if="nowPageApts.length>0" id="aptTable"
    :striped="striped"
    :bordered="bordered"
    :hover="hover"
    :fixed="fixed"
    :head-variant="headVariant"
    :table-variant="tableVariant"
    :fields="fields"
    :items="nowPageApts"
    @row-clicked="showModal($event)">
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
    <!-- <div v-if="apts.length>0" id="aptCards">
      <div v-for="(value, index) in apts" :key="index" class="aptCard">
        <div class="aptName">{{value.아파트}}</div>
        <div>거래금액 : {{value.거래금액}}</div>
        <div>건축년도 : {{value.건축년도}}</div>
        <div>판매년도 : {{value.년}}</div>
        <div>전용면적 : {{value.전용면적}}</div>
        <div>층 : {{value.층}}</div>
        <b-icon icon="star" scale="2" variant="warning" class="bookmark" @click="bookmarkClick(event)"></b-icon>
        <b-icon icon="heart" scale="2" variant="danger" class="like"></b-icon>
        <b-icon icon="info-square" scale="2" variant="info" class="info"></b-icon>
        <b-icon></b-icon>
      </div>
    </div> -->
    <div v-else id="noSearch">검색결과가 없습니다.</div>
    
    <b-modal id="aptModal" ref="my-modal" size="lg" hide-footer title="아파트 상세 정보">
      <img id="aptImg" :src="detailImgLink" alt="이미지가 없습니다.">
      <h2 id="detailTitle">{{detail.아파트}}</h2>
      <table id="detailTable">
        <tr>
          <td class="subTitle">거래일</td>
          <td>{{detail.년}}/{{detail.월}}/{{detail.일}}</td>
          <td class="subTitle">건축년도</td>
          <td>{{detail.건축년도}}</td>
        </tr>
        <tr>
          <td class="subTitle">거래금액</td>
          <td>{{detail.거래금액}}(만)</td>
          <td class="subTitle">면적</td>
          <td>{{detail.전용면적}}㎡</td>
        </tr>
        <tr>
          <td class="subTitle">층</td>
          <td>{{detail.층}}</td>
          <td class="subTitle">건축년도</td>
          <td>{{detail.건축년도}}</td>
        </tr>
        <tr>
          <td class="subTitle">건축년도</td>
          <td>{{detail.건축년도}}</td>
          <td class="subTitle">법정동</td>
          <td>{{detail.법정동}}</td>
        </tr>
        <tr>
          <td class="subTitle">지역코드</td>
          <td>{{detail.지역코드}}</td>
          <td class="subTitle">지번</td>
          <td>{{detail.지번}}</td>
        </tr>
        <tr>
          <td class="subTitle">법정동</td>
          <td>{{detail.법정동}}</td>
          <td class="subTitle">법정동본번코드</td>
          <td>{{detail.법정동본번코드}}</td>
        </tr>
        <tr>
          <td class="subTitle">법정동부번코드</td>
          <td>{{detail.법정동부번코드}}</td>
          <td class="subTitle">법정동시군구코드</td>
          <td>{{detail.법정동시군구코드}}</td>
        </tr>
        <tr>
          <td class="subTitle">법정동읍면동코드</td>
          <td>{{detail.법정동읍면동코드}}</td>
          <td class="subTitle">도로명</td>
          <td>{{detail.도로명}}</td>
        </tr>
        <tr>
          <td class="subTitle">도로명코드</td>
          <td>{{detail.도로명코드}}</td>
          <td class="subTitle">도로명시군구코드</td>
          <td>{{detail.도로명시군구코드}}</td>
        </tr>
        <tr>
          <td class="subTitle">도로명일련번호코드</td>
          <td>{{detail.도로명일련번호코드}}</td>
          <td class="subTitle">도로명지상지하코드</td>
          <td>{{detail.도로명지상지하코드}}</td>
        </tr>
        <tr>
          <td class="subTitle">도로명건물본번호코드</td>
          <td>{{detail.도로명건물본번호코드}}</td>
          <td class="subTitle">도로명건물부번호코드</td>
          <td>{{detail.도로명건물부번호코드}}</td>
        </tr>
      </table>
    </b-modal>
  </div>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";
import cheerio from "cheerio";
const houseStore = "houseStore"

export default {
  name:"HouseList",
  data(){
    return{
      nowApts:[],
      modalShow: false,
      fields:[
        {key: 'index'},
        {
          key:'아파트',
          sortable: true
        },
        {
          key:'법정동',
          sortable: true
        },
        {
          key:'거래금액',
          sortable: true
        },
        {
          key:'건축년도',
          sortable: true
        },
        {
          key:'년',
          label: '판매년도',
          sortable: true
        },
        {
          key:'전용면적',
          sortable: true
        },
        {
          key:'층',
          sortable: true
        },
        {
          key:'일련번호'
        }
      ],
      striped: true,
      bordered: true,
      hover: true,
      fixed: true,
      headVariant: 'dark',
      tableVariant: 'light',
      noApt:[{
        index:"검색결과가 없습니다."
      }],
      detail:{},
      detailImgLink:'',
    }
  },
  computed:{
    ...mapState(houseStore, ["nowPageApts"]),
  },
  methods: {
    showModal(data){
        this.detail = data;
        let input = this.detail.법정동.trim()+"%20"+this.detail.아파트.trim();
        axios.post("http://localhost:9999/happyhouse/map/apt", null, {params:{
          aptName: input,
        }})
        .then((response)=>{
          const $ = cheerio.load(response.data);
          // const result = $(".isv-r>>a>div>img").toArray();
          // const result = $(".T1diZc>.FA7L0b >.mJxzWe > .OcgH4b FzDDE rg_i");
          const result = $(".yWs4tf").toArray();
          if(result.length>0){
            this.detailImgLink = result[0].attribs.src;
          }else{
            this.detailImgLink = "../../assets/noImg.png";
          }
        })
        .catch((error)=>{
          alert(error);
        })
        this.$refs['my-modal'].show();
    },
  },
}
</script>

<style scoped>
#title{
  margin-left: 35%;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 30px;
}
#aptTable{
  width: 90%;
}
#noSearch{
  width: 90%;
  text-align: center;
  border:1px solid #1E99E8
}
#aptImg{
  width: 300px;
  height: 300px;
  margin-left: 50%;
  transform: translateX(-50%);
}
#detailTitle{
  text-align: center;
}
#detailTable{
  margin-left: 150px;
  border: 1px solid black;
}
#detailTable>td{
  border: 1px solid black;
}
th, td {
  border: 1px solid #444444;
}
.subTitle{
  font-weight: bold;
  background-color: antiquewhite;
}
/* #aptCards{
  width: 70%;
}
.aptCard{
  display: inline-block;
  width: 20%;
  height: 200px;
  border:1px solid #1E99E8;
  border-collapse: collapse;
}
.aptName{
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}
.bookmark{
  margin-left: 10px;
}
.like{
  margin-left: 100px;
}
.info{
  margin-left: 100px;
} */

</style>