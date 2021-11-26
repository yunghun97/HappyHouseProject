<template>
  <div id="sidebar">
    <!--월 선택-->
    <b-form-select
      v-model="selectedMonth"
      id="selectMonth"
      :options="month"  
      class="select"
    ></b-form-select>
    <!-- 시도 -->
    <div class="descText">특별시, 광역시, 도 </div>
    <b-form-select
        id="selectSido"
        v-model="sidoCode"
        :options="sidos"
        @change="gugunList"
        class="select"
    ></b-form-select>
    <!-- 구군 -->
    <div class="descText">구, 군</div>
    <b-form-select
        id="selectGugun"
        v-model="gugunCode"
        :options="guguns"
        @change="dongList"
        class="select"
    ></b-form-select>
    <!-- 동 -->
    <div class="descText">동</div>
    <b-form-select
        id="selectDong"
        v-model="dongCode"
        :options="dongs"
        class="select"
    ></b-form-select>
    <label for="minPrice">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;가격 :&nbsp;&nbsp;&nbsp;</label>
    <input type="number" id="minPrice" v-model="minPrice" class="small">
    ~
    <input type="number" id="maxPrice" v-model="maxPrice" class="small">
    <span id="moneyUnit">(단위: 만)</span><br>
    <label for="aptName">아파트이름 : &nbsp;&nbsp;</label>
    <input type="text" id="aptName" v-model="aptName" class="small">    
    <br>
    <label for="minAcreage">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;평수 :&nbsp;&nbsp;&nbsp;</label>
    <input type="number" id="minAcreage" v-model="minAptAcreage" class="small">
    ~
    <input type="number" id="maxAcreage" v-model="maxAptAcreage" class="small">
    <b-button variant="success" @click="search" id="searchBtn">검색</b-button>

    <div id="border">추가 시설검색</div>
    <b-button class="covidBtn" pill variant="outline-success" @click="covidSearch">코로나선별진료소</b-button>
    <b-button class="covidBtn" pill variant="outline-danger" @click="removeCovidMarker">코로나선별진료소 마커 지우기</b-button><br>
    <b-button class="covidBtn" pill variant="outline-info" @click="setStat">통계</b-button>
    <b-button class="covidBtn" pill variant="outline-warning">관심지역</b-button>
    
    <b-modal id="statModal" ref="stat-modal" size="lg" hide-footer title="통계">
      <div class="stat" id="gugunStat">
        <div style ="font-size: 7px; text-align:center;">시도 기준</div>
        <h2 style ="text-align:center; margin-top: 10px;background-color: lightBlue;">최저가</h2>
        <table style="width: 100%; margin-top: 20px; border: 1px solid black;" >
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">아파트</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMinPrice.아파트}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">주소</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMinPrice.법정동}} {{this.gugunMinPrice.도로명}} {{this.gugunMinPrice.도로명일련번호코드}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">거래일</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMinPrice.년}}/{{this.gugunMinPrice.월}}/{{this.gugunMinPrice.일}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">거래금액(십만)</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMinPrice.거래금액}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">면적</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMinPrice.전용면적}}㎡</td>
          </tr> 
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">층</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMinPrice.층}}</td>
          </tr>
        </table> 
        <h2 style ="margin-top: 10px; text-align:center; background-color: #FF4646;">최고가</h2>
        <table style="width: 100%; margin-top: 20px; border: 1px solid black;" >
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">아파트</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMaxPrice.아파트}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">주소</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMaxPrice.법정동}} {{this.gugunMaxPrice.도로명}} {{this.gugunMaxPrice.도로명일련번호코드}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">거래일</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMaxPrice.년}}/{{this.gugunMaxPrice.월}}/{{this.gugunMaxPrice.일}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">거래금액(십만)</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMaxPrice.거래금액}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">면적</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMaxPrice.전용면적}}㎡</td>
          </tr> 
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">층</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMaxPrice.층}}</td>
          </tr>
        </table> 
        <h2 style ="text-align:center;  margin-top: 10px; background-color: lightBlue;">최저평수</h2>
          <table style="width: 100%; margin-top: 20px; border: 1px solid black;" >
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">아파트</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMinArea.아파트}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">주소</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMinArea.법정동}} {{this.gugunMinArea.도로명}} {{this.gugunMinArea.도로명일련번호코드}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">거래일</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMinArea.년}}/{{this.gugunMinArea.월}}/{{this.gugunMinArea.일}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">거래금액(십만)</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMinArea.거래금액}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">면적</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMinArea.전용면적}}㎡</td>
          </tr> 
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">층</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMinArea.층}}</td>
          </tr>
        </table> 
        <h2 style ="margin-top: 30px; text-align:center; background-color: #FF4646;">최고평수</h2>
        <table style="width: 100%; margin-top: 20px; border: 1px solid black;" >
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">아파트</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMaxArea.아파트}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">주소</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMaxArea.법정동}} {{this.gugunMaxArea.도로명}} {{this.gugunMaxArea.도로명일련번호코드}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">거래일</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMaxArea.년}}/{{this.gugunMaxArea.월}}/{{this.gugunMaxArea.일}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">거래금액(십만)</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMaxArea.거래금액}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">면적</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMaxArea.전용면적}}㎡</td>
          </tr> 
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">층</td>
              <td style="text-align:center; border: 1px solid black;">{{this.gugunMaxArea.층}}</td>
          </tr>
        </table> 
      </div>
      <div class="stat">
        <div style ="font-size: 7px; text-align:center;">동 기준</div>
        <h2 style ="text-align:center; margin-top: 10px;background-color: lightBlue;">최저가</h2>
        <table style="width: 100%; margin-top: 20px; border: 1px solid black;" >
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">아파트</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMinPrice.아파트}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">주소</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMinPrice.법정동}} {{this.dongMinPrice.도로명}} {{this.dongMinPrice.도로명일련번호코드}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">거래일</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMinPrice.년}}/{{this.dongMinPrice.월}}/{{this.dongMinPrice.일}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">거래금액(십만)</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMinPrice.거래금액}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">면적</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMinPrice.전용면적}}㎡</td>
          </tr> 
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">층</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMinPrice.층}}</td>
          </tr>
        </table> 
        <h2 style ="margin-top: 10px; text-align:center; background-color: #FF4646;">최고가</h2>
        <table style="width: 100%; margin-top: 20px; border: 1px solid black;" >
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">아파트</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMaxPrice.아파트}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">주소</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMaxPrice.법정동}} {{this.dongMaxPrice.도로명}} {{this.dongMaxPrice.도로명일련번호코드}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">거래일</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMaxPrice.년}}/{{this.dongMaxPrice.월}}/{{this.dongMaxPrice.일}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">거래금액(십만)</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMaxPrice.거래금액}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">면적</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMaxPrice.전용면적}}㎡</td>
          </tr> 
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">층</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMaxPrice.층}}</td>
          </tr>
        </table> 
        <h2 style ="text-align:center;  margin-top: 10px; background-color: lightBlue;">최저평수</h2>
          <table style="width: 100%; margin-top: 20px; border: 1px solid black;" >
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">아파트</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMinArea.아파트}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">주소</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMinArea.법정동}} {{this.dongMinArea.도로명}} {{this.dongMinArea.도로명일련번호코드}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">거래일</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMinArea.년}}/{{this.dongMinArea.월}}/{{this.dongMinArea.일}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">거래금액(십만)</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMinArea.거래금액}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">면적</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMinArea.전용면적}}㎡</td>
          </tr> 
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">층</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMinArea.층}}</td>
          </tr>
        </table> 
        <h2 style ="margin-top: 30px; text-align:center; background-color: #FF4646;">최고평수</h2>
        <table style="width: 100%; margin-top: 20px; border: 1px solid black;" >
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">아파트</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMaxArea.아파트}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">주소</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMaxArea.법정동}} {{this.dongMaxArea.도로명}} {{this.dongMaxArea.도로명일련번호코드}}</td>
          </tr>        
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque;">거래일</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMaxArea.년}}/{{this.dongMaxArea.월}}/{{this.dongMaxArea.일}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">거래금액(십만)</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMaxArea.거래금액}}</td>
          </tr>
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">면적</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMaxArea.전용면적}}㎡</td>
          </tr> 
          <tr>
              <td style="text-align:center; border: 1px solid black; background-color:bisque">층</td>
              <td style="text-align:center; border: 1px solid black;">{{this.dongMaxArea.층}}</td>
          </tr>
        </table> 
      </div>

    </b-modal>

  </div>
</template>

<script>
const houseStore = "houseStore" // houseStore.js에서 export 한 이름과 일치
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name:"mapList",
  data(){
    return{
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
      minPrice: '',
      maxPrice: '',
      aptName: '',
      minAptAcreage:'',
      maxAptAcreage:'',
      month:[
        { value: 1, text: "검색 월 : 1월"},
        { value: 2, text: "검색 월 : 2월"},
        { value: 3, text: "검색 월 : 3월"},
        { value: 4, text: "검색 월 : 4월"},
        { value: 5, text: "검색 월 : 5월"},
        { value: 6, text: "검색 월 : 6월"},
        { value: 7, text: "검색 월 : 7월"},
        { value: 8, text: "검색 월 : 8월"},
        { value: 9, text: "검색 월 : 9월"},
        { value: 10, text: "검색 월 : 10월"},
        { value: 11, text: "검색 월 : 11월"},
        { value: 12, text: "검색 월 : 12월"},
      ],
      selectedMonth: 1,
    }
  },
  created(){
    this.CLEAR_SIDO_LIST();
    this.CLEAR_HOUSE_LIST();
    this.getSido();
  },
  filters:{
    money: function(value){
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed:{
    ...mapState(houseStore, ["sidos","guguns","dongs","selectedSido","selectedGugun","covidCenterList","nowPageApts",
    "gugunMinPrice","gugunMaxPrice","gugunMinArea","gugunMaxArea","dongMinPrice","dongMaxPrice",
    "dongMinArea","dongMaxArea"]),
  },
  methods:{
    ...mapMutations(houseStore, ["CLEAR_SIDO_LIST","CLEAR_GUGUN_LIST",
    "CLEAR_DONG_LIST","SET_HOUSE_LIST", "CLEAR_HOUSE_LIST","SET_PAGE_COUNT",
    "SET_NOWPAGE_LIST","SET_GUGUN_SELECT","SET_SIDO_SELECT","CLEAR_COVID_LIST","REMOVE_COVID_MARKER","SET_STATISTICS"]),
    ...mapActions(houseStore, ["getSido", "getGugun", "getDong","covidCenterSearch"]),
    gugunList(){
      this.CLEAR_GUGUN_LIST();
      this.CLEAR_DONG_LIST();
      this.gugunCode = null;
      this.dongCode = null;
      if(this.sidoCode) this.getGugun(this.sidoCode);
    },
    dongList(){
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      let param ={
        gugunCode: this.gugunCode,
        month:this.selectedMonth
      }
      if(this.gugunCode) this.getDong(param);
    },
    search(){
      let MIN = 0;
      let MAX = 9999999;
      // 필수 선택
      if(!this.sidoCode){
        alert("특별시, 도, 광역시 선택하세요!!");
        return;
      }else if(!this.gugunCode){
        alert("구, 군, 시 를 선택하세요!!");
        return;
      }else if(!this.dongCode){
        alert("동을 선택하세요!!");
        return;
      }

      let min = MIN;
      let max = MAX;
      // 조건에 맞는지 탐색
      if(parseInt(this.minPrice))  min = parseInt(this.minPrice);

      if(parseInt(this.maxPrice)) max = parseInt(this.maxPrice);
      
      if(min>max){
        alert("가격을 정확히 입력해주세요!!");
        return;        
      }
      let target = document.getElementById("selectDong");
      let selectedDong = target.options[target.selectedIndex].text

      // 선택한 시도, 구군 state에 저장 (map에서 사용하기 위해)
      let target2 = document.getElementById("selectSido");
      let selectedSido = target2.options[target2.selectedIndex].text;
      this.SET_SIDO_SELECT(selectedSido);
      let target3 = document.getElementById("selectGugun");
      let selectedGugun = target3.options[target3.selectedIndex].text;
      this.SET_GUGUN_SELECT(selectedGugun);

      let aptName=this.aptName.trim();

      let minAptAcreage = MIN;
      let maxAptAcreage = MAX;
      if(this.minAptAcreage) minAptAcreage = this.minAptAcreage;
      if(this.maxAptAcreage) maxAptAcreage = this.maxAptAcreage;
      if(parseFloat(minAptAcreage)>parseFloat(maxAptAcreage)){
        alert("평 수를 정확히 입력해주세요!!");
        return;
      }

      let param = {
        minPrice:min,
        maxPrice:max,
        dongName:selectedDong,
        aptName: aptName,
        minAptAcreage:minAptAcreage,
        maxAptAcreage:maxAptAcreage,
      }
      this.SET_HOUSE_LIST(param);
      this.SET_PAGE_COUNT();
      this.SET_NOWPAGE_LIST(1);
    },
    covidSearch(){
      this.CLEAR_COVID_LIST();
      this.covidCenterSearch();
    },
    removeCovidMarker(){
      this.REMOVE_COVID_MARKER();
    },
    setStat(){
      if(this.nowPageApts.length<1){
        alert("아파트 검색을 먼저 진행해주세요!");
        return;
      }
      this.SET_STATISTICS();
      console.log(this.sidoMinPrice);
      this.$refs['stat-modal'].show();
    }
  }
};
</script>

<style scoped>
#sidebar{
  width: 200px;
}
.descText{
  text-align: center;
  border:1px solid #1E99E8;
}
#border{
  margin-top: 10px;
  margin-bottom: 10px;
  height: 20px;
  font-size: 13px;
  width: 100%;
  text-align: center;
  border:1px solid #1E99E8;
}
#moneyUnit{
  margin-left: 3px;
  font-size: 3px;
}
.select{
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #23261F;
  color: white;
  text-align: center;
}
#searchBtn{
  width: 100%;
  margin-left: 100%;
  transform: translateX(-100%);
}
.covidBtn{
  border-collapse: collapse;
  margin-top: 5px;
  width: 100%;
}
.stat{
  width: 50%; 
  display: inline-block;
}
</style>