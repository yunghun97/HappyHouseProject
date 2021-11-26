import { sidoList, gugunList, dongList, covidCenterList} from "@/api/house.js";
import { APT_DEAL_URL } from "@/config/index.js";
// import axios from "axios";

// IE11 용
import 'url-search-params-polyfill';
const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "특별시, 도, 광역시를 선택하세요"}], // 시도, 구군 동 select 값
    guguns: [{ value: null, text: "시, 군, 를 선택하세요"}],
    dongs: [{value: null, text:" 동을 선택하세요"}],
    
    selectedSido:'',  // 시도 구군 선택된 이름
    selectedGugun:'',
    
    apts:[],  // 동 선택시 해당 동 아파트 매매정보를 가지고 있다.
    nowPageApts:[], // 페이지별로 끊어서 저장하기 위한 배열
    allDongInfo:[],   // 군,구 선택시 모든 동과 그 동의 아파트 매매 결과를 가지고 있는 배열
    
    showRowCount:20,  // 페이지 설정 변수
    minPage:1,
    nowPage:1,
    maxPage:1,
    
    covidCenterList:[], // 코로나 예방접종센터 배열
    covidMarker: true,  // 코로나 마커 지우기용

    gugunMinPrice: {},
    gugunMaxPrice: {},
    gugunMinArea: {},
    gugunMaxArea: {},
    dongMinPrice:{},
    dongMaxPrice:{},
    dongMinArea: {},
    dongMaxArea: {},
  },
  getters: {
  },
  mutations: {
    SET_SIDO_SELECT:(state,input)=>{  // 시도 선택시 선택한 시도이름 저장
      state.selectedSido=input;
    },
    SET_GUGUN_SELECT:(state,input)=>{  // 구군 선택시 선택한 시도이름 저장
      state.selectedGugun = input
    },
    CLEAR_SIDO_LIST:(state)=>{  // 시도 초기화
      state.sidos = [{ value: null, text: "특별시, 도, 광역시 선택하세요"}];
    },
    SET_SIDO_LIST:(state, sidos)=>{ // 시도 넣기
      sidos.forEach((sido) =>{
        state.sidos.push({value: sido.sidoCode, text: sido.sidoName});
      });
    },
    CLEAR_GUGUN_LIST:(state)=>{ // 구군 초기화
      state.guguns = [{ value: null, text: "구, 군, 시 를 선택하세요" }];
    },
    SET_GUGUN_LIST:(state,guguns)=>{  // 구군 결과 넣기
      guguns.forEach((gugun) =>{
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName});
      });
    },
    CLEAR_DONG_LIST:(state)=>{  // 동 초기화
      state.dongs = [{value: null, text:"동을 선택하세요"}];
    },

    ADD_HOUSE_LIST:(state, dongs)=>{  // 구군 기준 api검색하여 구군 기준 모든 동에 대한 거래정보 가져온다.      
      if(dongs.length>0){
        for(let i=0; i<dongs.length; i++){
         state.allDongInfo.push(dongs[i]);
        }
      }
    },
    SET_DONG_LIST:(state, dongs)=>{ // 구군선택시 모든 동 및 아파트 매매정보 가져오는 Mutations
      if(dongs.length>0){
      let tmpDong = dongs[0].법정동읍면동코드;
      state.dongs.push({value: dongs[0].법정동읍면동코드, text: dongs[0].법정동});
      state.allDongInfo.push(dongs[0]);
      for(let i=1; i<dongs.length; i++){
        state.allDongInfo.push(dongs[i]);
        if(dongs[i].법정동읍면동코드===tmpDong){
          continue;
        }else{
          tmpDong = dongs[i].법정동읍면동코드;
          state.dongs.push({value: dongs[i].법정동읍면동코드, text: dongs[i].법정동});
        }
      }
      }
    },
    SET_HOUSE_LIST:(state, param) =>{ // 모든 동 저장되어 있는 배열에서 필터 결과에 따라 apts 저장한다.
      state.apts = [];
      // console.log("동이름: ",param.dongName);
      // console.log(state.allDongInfo[0].법정동.trim());
      // console.log(parseInt(state.allDongInfo[0].거래금액.replace(',','').trim())+1>99999);
      // 아파트 이름이 주어졌을 때
      if(param.aptName!=''){
        state.allDongInfo.forEach((apt)=>{        
          if(
            parseInt(apt.거래금액.replace(',','').trim())<parseInt(param.minPrice)
            ||parseInt(apt.거래금액.replace(',','').trim())>parseInt(param.maxPrice)
            ||apt.법정동.trim()!=param.dongName
            ||!apt.아파트.trim().includes(param.aptName)
            ||apt.전용면적>param.maxAptAcreage||apt.전용면적<param.minAptAcreage){
            return true;
          }
          state.apts.push(apt);
        });
      // 아파트 이름 없을 떄
      }else{
        state.allDongInfo.forEach((apt)=>{        
          if(parseInt(apt.거래금액.replace(',','').trim())<parseInt(param.minPrice)||
          parseInt(apt.거래금액.replace(',','').trim())>parseInt(param.maxPrice)||
          apt.법정동.trim()!=param.dongName||apt.전용면적>param.maxAptAcreage||apt.전용면적<param.minAptAcreage){
            return true;
          }
          state.apts.push(apt);
        });
      }
    },
    CLEAR_ALLDONGINFO:(state)=>{
      state.allDongInfo = [];
    },
    CLEAR_HOUSE_LIST:(state) =>{  // 아파트 초기화
      state.apts=[];
    },
    SET_PAGE_COUNT:(state) =>{  // 페이지를 설정한다.
      state.nowPage =1;
      state.minPage =1;
      if(state.apts.length%state.showRowCount===0){
        state.maxPage = parseInt(state.apts.length/state.showRowCount);
      }
      else if(state.apts.length%state.showRowCount!=0&&state.apts.length>state.showRowCount){
        state.maxPage = parseInt(state.apts.length/state.showRowCount+1);
      }else{
        state.maxPage = 1;
      }
    },
    CLEAR_PAGE_APTS:(state)=>{  // 페이지 초기화
      state.nowPageApts = [];
    },
    SET_NOWPAGE_LIST:(state, num)=>{  // 현재 페이지에서 보여 줄 정보를 설정한다.
      state.nowPageApts = [];
      for(let i=(num-1)*state.showRowCount; i<num*state.showRowCount; i++){
        if(i>=state.apts.length) return false;
        state.nowPageApts.push(state.apts[i]);
      }
    },
    GO_FIRST:(state)=>{ // 페이지 처음으로 이동
      state.nowPage = 1;
    },
    GO_BEFORE:(state)=>{  // 페이지 왼쪽 1칸
      if(state.nowPage-1>=state.minPage){
        state.nowPage-=1;
      }
    },
    GO_NEXT:(state)=>{  // 페이지 오른쪽 1칸
      if(state.nowPage+1<=state.maxPage){
        state.nowPage+=1;
      }
    },
    GO_LAST:(state)=>{  // 페이지 마지막
      state.nowPage= state.maxPage;
    },
    SET_PAGE:(state,num)=>{ // 현재 페이지 변경
      state.nowPage = num;
    },
    CLEAR_COVID_LIST:(state)=>{
      state.covidCenterList=[];
    },
    SET_COVID_LIST:(state, centers)=>{
      centers.forEach((center)=>{
        state.covidCenterList.push(center);
      });      
    },
    REMOVE_COVID_MARKER:(state)=>{
      state.covidMarker = !state.covidMarker;
    },
    // 통계 자료 저장
    SET_STATISTICS:(state)=>{
      let gugunArr = state.allDongInfo.sort((o1,o2)=>{
        return parseInt(o1.거래금액)-parseInt(o2.거래금액);
      });
      state.gugunMinPrice = gugunArr[0];
      state.gugunMaxPrice = gugunArr[gugunArr.length-1];

      gugunArr = state.allDongInfo.sort((o1,o2)=>{
        return parseFloat(o1.전용면적)-parseFloat(o2.전용면적);
      });
      state.gugunMinArea = gugunArr[0];
      state.gugunMaxArea = gugunArr[gugunArr.length-1];
      
      let dongArr = state.apts.sort((o1,o2)=>{
        return parseInt(o1.거래금액)-parseInt(o2.거래금액);
      });
      state.dongMinPrice = dongArr[0];
      state.dongMaxPrice = dongArr[dongArr.length-1];

      dongArr = state.apts.sort((o1,o2)=>{
        return parseFloat(o1.전용면적)-parseFloat(o2.전용면적);
      });
      state.dongMinArea = dongArr[0];
      state.dongMaxArea = dongArr[dongArr.length-1];
      
    }
  },
  actions: {
    getSido: ({commit}) =>{ // 시도 DB에서 가져오기
      sidoList(
      // function({data}){
      //   commit("SET_SIDO_LIST", data);
      // },
      ({data})=>{
        commit("SET_SIDO_LIST", data);
      },
      (error) =>{
        alert(error);
      }
      );
    }, // getsido 끝
    getGugun: ({commit}, sidoCode) =>{  // 구군 DB에서 가져오가
      const params = {
        sido: sidoCode,
      };
      gugunList(params,({data}) =>{
        commit("SET_GUGUN_LIST", data);
      },
      (error) =>{
        alert(error);
      }
      );
    },
    getDong: ({commit}, param)=>{ // api에서 모든 동 거래 결과 가져온다.
       commit("CLEAR_ALLDONGINFO");
       const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
       for(let i =0; i<=2; i++){
       let day = 201900+param.month+i*100;
       const params ={
         URL: APT_DEAL_URL,
         LAWD_CD: param.gugunCode,
         DEAL_YMD: day,
         numOfRows: "10000",
         serviceKey: SERVICE_KEY,
       };  
       dongList(params, (response) =>{
          if(i==0){
            commit("SET_DONG_LIST", response.data.response.body.items.item);
          }
          commit("ADD_HOUSE_LIST",response.data.response.body.items.item);
        },
        (error) =>{
         alert(error);
        });
      }
    },
    // 코로나 센터 검색
    covidCenterSearch:({commit})=>{
      const SERVICE_KEY = process.env.VUE_APP_COVID_CENTER_APY_KEY;
      const params ={
        serviceKey: SERVICE_KEY
      }
      covidCenterList(params, (response)=>{
        commit("SET_COVID_LIST",response.data.data);
      },
      (error)=>{
        alert(error)
      }
      )
    },
  },
};

export default houseStore;
