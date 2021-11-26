<template>
  <div>
    <b-sidebar id="sidebar-1" title="상세정보" v-model="sidebarCheck">
      <b-icon id="bookMark" data-bookmark="no" :icon="isBookMark" font-scale="3" variant="warning" @click="bookMark($event)"></b-icon><br>
      <div style="margin-top:20px;">
        <!-- <img src="https://img.icons8.com/plasticine/32/000000/finish-flag.png"/>
        <label for="startPoint">출발지 설정</label> -->
        <img style="margin-left:125px" id="destination" src="https://img.icons8.com/color/32/000000/filled-flag2--v1.png"/>
        <label for="destination" @click="findRoad">길찾기</label>
      </div>
      <div id="aptInfo" v-show="isApt"></div>
      <div id="facilityInfo" v-show="isFacility"></div>        
      <div id="covidCenterInfo" v-show="isCovidCenter"></div>
    </b-sidebar>
    <b-button id="MT1"  data-kind="MT1" class="facilityBtn" variant="outline-primary" @click="facilitySet($event)">대형마트</b-button>
    <b-button id="CS2"  data-kind="CS2" class="facilityBtn" variant="outline-info" @click="facilitySet($event)">편의점</b-button>
    <b-button id="PS3"  data-kind="PS3" class="facilityBtn" variant="outline-secondary" @click="facilitySet($event)">어린이집, 유치원</b-button>
    <b-button id="SC4"  data-kind="SC4" class="facilityBtn" variant="outline-danger" @click="facilitySet($event)">학교</b-button>
    <b-button id="AC5"  data-kind="AC5" class="facilityBtn" variant="outline-warning" @click="facilitySet($event)">학원</b-button>
    <b-button id="PK6"  data-kind="PK6" class="facilityBtn" variant="outline-dark" @click="facilitySet($event)">주차장</b-button>
    <b-button id="OL7"  data-kind="OL7" class="facilityBtn" variant="outline-primary" @click="facilitySet($event)">주유소,충전소</b-button>
    <b-button id="SW8"  data-kind="SW8" class="facilityBtn" variant="outline-info" @click="facilitySet($event)">지하철역</b-button>
    <b-button id="BK9"  data-kind="BK9" class="facilityBtn" variant="outline-secondary" @click="facilitySet($event)">은행</b-button>
    <b-button id="CT1"  data-kind="CT1" class="facilityBtn" variant="outline-danger" @click="facilitySet($event)">문화시설</b-button>
    <b-button id="AT4"  data-kind="AT4" class="facilityBtn" variant="outline-warning" @click="facilitySet($event)">관광명소</b-button>
    <b-button id="FD6"  data-kind="FD6" class="facilityBtn" variant="outline-dark" @click="facilitySet($event)">음식점</b-button>
    <b-button id="CE7"  data-kind="CE7" class="facilityBtn" variant="outline-primary" @click="facilitySet($event)">카페</b-button>
    <b-button id="HP8"  data-kind="HP8" class="facilityBtn" variant="outline-info" @click="facilitySet($event)">병원</b-button>
    <b-button id="PM9"  data-kind="PM9" class="facilityBtn" variant="outline-secondary" @click="facilitySet($event)">약국</b-button>
    <b-button id="removeFacilityBtn" variant="danger" @click="removeFacilityMarker">지우기</b-button>
    <div id="map">
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
const houseStore = "houseStore"
export default {
    name:"HouseMap",
    data(){
      return{
        map: null,
        markers: [],
        infoWindows:[],
        facilityMarkers:[],
        facilityInfoWindows:[],
        facilityMarkerLink: '',
        covidCenterMarkers: [],
        covidCenterInfoWindows:[],
        defaultRoadView:1139753257,

        sidebarCheck:false,
        markerInfo:{},
        isApt:false,
        isFacility:false,
        isCovidCenter:false,
        isBookMark:"star",

        aptTitle:'',
        facilityTitle:'',
        covidCenterTitle:'',
        roadLat:'',
        roadLng: '',
      }
    },
    computed:{
      ...mapState(houseStore,["nowPageApts","sidos","guguns","dongs","selectedSido","selectedGugun","covidCenterList","covidMarker"])
    },
    watch:{
      nowPageApts:function(){
        this.addHouseMarkers();
      },
      covidCenterList:function(){
        this.addCovidMarkers();
      },
      covidMarker:function(){
        this.removeHouseInfoWindows();
        this.removeCovidMarkers();
      } 
    },
    mounted(){
      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } else {
       /* global kakao */
       () => kakao.maps.load(this.initMap);
      }
    },
    methods:{
      initMap(){
        const mapContainer = document.getElementById('map'); // 지도를 표시할 div
        const mapOption = {
          center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
          level: 7, // 지도의 확대 레벨
        };
        this.map = new kakao.maps.Map(mapContainer, mapOption);
        kakao.maps.event.addListener(this.map, 'click', ()=>{
          this.sidebarCheck = false;
        });
        if (navigator.geolocation) {
        
          //GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition((position)=>{
          
          let lat = position.coords.latitude; // 위도
          let lng = position.coords.longitude; // 경도

          let locPosition = new kakao.maps.LatLng(lat, lng); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          let message = '<div style="padding:5px;">나의 현재위치</div>'; // 인포윈도우에 표시될 내용입니다

          // 마커와 인포윈도우를 표시합니다
          this.defaultdisplayMarker(locPosition, message);

        });

        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

          let locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
          var message = 'geolocation을 사용할수 없어요..';

          this.defaultdisplayMarker(locPosition, message);
        }

        },
        defaultdisplayMarker(locPosition, message) {
          var imageSrc = "https://img.icons8.com/dusk/64/000000/user-location.png";
          let imageSize = new kakao.maps.Size(50, 70); // 마커이미지의 크기입니다
          let imageOption = {
            offset : new kakao.maps.Point(27, 69)
          }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize,
          imageOption);

          // 마커를 생성합니다
          let marker = new kakao.maps.Marker({
            map : this.map,
            position : locPosition,
            image : markerImage
          });

          var iwContent = message; // 인포윈도우에 표시할 내용
          let iwRemoveable = true;

          // 인포윈도우를 생성합니다
          var infowindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
          });

          // 인포윈도우를 마커위에 표시합니다 
          infowindow.open(this.map, marker);

          // 지도 중심좌표를 접속위치로 변경합니다
          this.map.setCenter(locPosition);
        }, // disPlayMarker 끝
        addHouseMarkers(){
          this.removeHouseMarkers();
          this.removeHouseInfoWindows();
          this.getcoordinate();
        },
        removeHouseMarkers(){
          this.markers.forEach((marker)=>{
            marker.setMap(null);
          })
          this.markers=[];
        },
        removeHouseInfoWindows(){
          this.infoWindows.forEach((info)=>{
            info.close();
          })
          this.infoWindows=[];
        },
        //주소로 좌표 얻어오기
        getcoordinate(){
          var imageSrc = "https://img.icons8.com/cotton/64/000000/place-marker.png";
          let imageSize = new kakao.maps.Size(50, 70); // 마커이미지의 크기입니다
          let imageOption = {
            offset : new kakao.maps.Point(27, 69)
          }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          let repeatCheck = [{
            y:111111,
            x:111111,
          }];
          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize,
          imageOption);
          var geocoder = new kakao.maps.services.Geocoder();
          for(let i=0; i<this.nowPageApts.length; i++){
            let addr = this.selectedSido+" "+this.selectedGugun+" "+this.nowPageApts[i].도로명.trim()+" "+this.nowPageApts[i].도로명건물본번호코드.replace(/(^0+)/, "");
            // let addr = this.selectedSido+" "+this.selectedGugun+" "+this.nowPageApts[i].아파트.trim()+"아파트";
            // let addr = this.selectedSido+" "+this.selectedGugun+" "+this.nowPageApts[i].법정동.trim()+" "+this.nowPageApts[i].법정동본번코드.replace(/(^0+)/, "");
            geocoder.addressSearch(addr, (result, status)=>{
              
              // 정상적으로 검색이 완료됐으면 
              if (status === kakao.maps.services.Status.OK) {
                // 중복체크
                let repeat = false;
                for(let i=0; i<repeatCheck.length; i++){
                  if(result[0].y===repeatCheck[i].y&&result[0].x===repeatCheck[i].x) {
                    repeat = true;
                    break;
                  }
                }
                if(i==this.nowPageApts.length-1){
                  let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                  repeatCheck.push({
                    y: result[0].y,
                    x: result[0].x
                  });
                 this.map.setCenter(coords);
                }
                if(repeat){
                  return false;
                }else{
                  repeatCheck.push({
                    y: result[0].y,
                    x: result[0].x
                  });
                }
                // console.log("실행");

                let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                repeatCheck.push({
                  y: result[0].y,
                  x: result[0].x
                });
                // 결과값으로 받은 위치를 마커로 표시합니다

                var marker = new kakao.maps.Marker({
                    map: this.map,
                    position: coords,
                    image:markerImage
                });

                // var infowindow = new kakao.maps.InfoWindow({
                //   content:`
                //   <div style="width:500px; height:400px">
                //    <h2 style=" margin-top:30px; text-align:center; background-color:#6478FF;">`+this.nowPageApts[i].아파트+`</h2>
                //    <div id="roadview" style="margin-top:20px; width:100%;height:300px;"></div>
                //   </div>
                //   `,
                //   removable : true
                // });
                //마커에 클릭이벤트를 등록합니다
                kakao.maps.event.addListener(marker, 'click', ()=>{
                  // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                  // this.removeHouseInfoWindows();
                  // this.removeFacilityInfoWindows();                  
                            
                  this.sidebarCheck = true;
                  // 시설인지, 아파트인지, 코로나접종센터인지 확인
                  
                  this.isApt = true;
                  this.isFacility = false;
                  this.isCovidCenter = false;
                  this.aptTitle = this.nowPageApts[i].아파트;
                  // this.infoWindows.push(infowindow);                  
                  // infowindow.open(this.map, marker);
                  // 로드뷰 세팅
                  var aptSidebar = document.getElementById("aptInfo");
                  aptSidebar.innerHTML=`
                  <h2 id="aptTitle" style=" margin-top:30px; text-align:center; background-color:#96C161;">${this.nowPageApts[i].아파트}</h2>                  
                  <div id="aptRoadview" style="margin-top:20px; width:100%;height:300px;"></div>

                  <table style="width: 320px; margin-top: 20px; border: 1px solid black;" >
                    <tr>
                        <td style="text-align:center; border: 1px solid black; background-color:bisque;">거래일</td>
                        <td style="text-align:center; border: 1px solid black;">${this.nowPageApts[i].년}/${this.nowPageApts[i].월}/${this.nowPageApts[i].일}</td>
                    </tr>
                    <tr>
                        <td style="text-align:center; border: 1px solid black; background-color:bisque">거래금액(십만)</td>
                        <td style="text-align:center; border: 1px solid black;">${this.nowPageApts[i].거래금액}</td>
                    </tr>
                    <tr>
                        <td style="text-align:center; border: 1px solid black; background-color:bisque">면적</td>
                        <td style="text-align:center; border: 1px solid black;">${this.nowPageApts[i].전용면적}㎡</td>
                    </tr> 
                    <tr>
                        <td style="text-align:center; border: 1px solid black; background-color:bisque">층</td>
                        <td style="text-align:center; border: 1px solid black;">${this.nowPageApts[i].층}</td>
                    </tr>
                  </table>   
                  `

                  var roadviewContainer = document.getElementById('aptRoadview'); //로드뷰를 표시할 div
                  var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
                  var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
                  this.roadLat = result[0].y;
                  this.roadLng = result[0].x;
                  var position = new kakao.maps.LatLng(result[0].y, result[0].x);
                  // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
                  roadviewClient.getNearestPanoId(position, 50,(panoId)=> {
                    if(!panoId) panoId = this.defaultRoadView; // 로드뷰 데이터 못 가져왔을 때 기본 좌표
                    roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행

                  });
                });
                // infowindow.open(this.map, marker);
                this.markers.push(marker);
                // this.infoWindows.push(infowindow);
              } 
            });    
          }
        },
      facilitySet(event){
        // alert(event.target.dataset.kind);
        var ps = new kakao.maps.services.Places(this.map);
        if(event.target.dataset.kind==="MT1") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/E74C3C/marker-m.png";
        else if(event.target.dataset.kind==="CS2") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/FAC87A/marker-c.png";
        else if(event.target.dataset.kind==="PS3") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/2ECC71/marker-p.png";
        else if(event.target.dataset.kind==="SC4") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/3498DB/marker-s.png";
        else if(event.target.dataset.kind==="AC5") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/9B59B6/marker-a.png";
        else if(event.target.dataset.kind==="PK6") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/95A5A6/marker-p.png";
        else if(event.target.dataset.kind==="OL7") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/34495E/marker-o.png";
        else if(event.target.dataset.kind==="SW8") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/4AD8DC/marker-s.png";
        else if(event.target.dataset.kind==="BK9") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/DC4AC4/marker-b.png";
        else if(event.target.dataset.kind==="CT1") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/000000/marker-t.png";
        else if(event.target.dataset.kind==="AT4") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/C1DC4A/marker-a.png";
        else if(event.target.dataset.kind==="FD6") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/538851/marker-f.png";
        else if(event.target.dataset.kind==="CE7") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/3FFFA0/marker-c.png"; 
        else if(event.target.dataset.kind==="HP8") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/FFC43F/marker-h.png";
        else if(event.target.dataset.kind==="PM9") this.facilityMarkerLink = "https://img.icons8.com/ios-filled/50/3FF9FF/marker-p.png";
        
        ps.categorySearch(event.target.dataset.kind, this.placesSearchCB, {useMapBounds:true});
      },
      placesSearchCB (data, status){
        if (status === kakao.maps.services.Status.OK) {
          // this.removeFacilityMarker();
          for (var i=0; i<data.length; i++) {
            this.facilityDisplayMarker(data[i]);    
          }       
        }
      },
      // 시설 마커찍기
      facilityDisplayMarker(place) {
        // 마커를 생성하고 지도에 표시합니다
        // var infowindow = new kakao.maps.InfoWindow({zIndex:1});
        let imageSrc = this.facilityMarkerLink;
        let imageSize = new kakao.maps.Size(30, 50); // 마커이미지의 크기입니다
        let imageOption = {
          offset : new kakao.maps.Point(27, 69)
        };
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        var marker = new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(place.y, place.x),
            image: markerImage
        });

        // var infowindow = new kakao.maps.InfoWindow({
        //   content:`
        //   <div style="width:500px; height:400px">
        //    <h2 style=" margin-top:30px; text-align:center; background-color:lightgray;">`+place.place_name+`</h2>
        //    <div id="roadview" style="margin-top:20px; width:100%;height:300px;"></div>
        //   </div>
        //   `,
        //   removable : true
        // });

        //마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', ()=>{
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            // this.removeHouseInfoWindows();
            // this.removeFacilityInfoWindows();
            // this.facilityInfoWindows.push(infowindow);
            // infowindow.open(this.map, marker);

            // 로드뷰 세팅
            this.sidebarCheck = true;
            // 시설인지, 아파트인지, 코로나접종센터인지 확인
            
            this.isApt = false;
            this.isFacility = true;
            this.isCovidCenter = false;
            this.facilityTitle = place.place_name;
            document.getElementById("facilityInfo").innerHTML= `
            <h2 style=" margin-top:30px; text-align:center; background-color:coral;">${place.place_name}</h2>
              <div id="facilityRoadview" style="margin-top:20px; width:100%;height:300px;"></div>
              <table style="width: 320px; margin-top: 20px; border: 1px solid black;" >
                <tr>
                    <td style="border: 1px solid black; background-color:bisque;">주소</td>
                    <td style="border: 1px solid black;">${place.address_name}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid black; background-color:bisque">도로명 주소</td>
                    <td style="border: 1px solid black;">${place.road_address_name}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid black; background-color:bisque">번호</td>
                    <td style="text-align:center; border: 1px solid black;">${place.phone}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid black; background-color:bisque">사이트 링크</td>
                    <td style="text-align:center; border: 1px solid black;"><a href="${place.place_url}" target='_blank' >링크</></td>
                </tr> 
              </table>   
            `
            var roadviewContainer = document.getElementById('facilityRoadview'); //로드뷰를 표시할 div
            var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
            var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
            this.facilityTitle = place.place_name;
            this.roadLat = place.y;
            this.roadLng = place.x;
            var position = new kakao.maps.LatLng(place.y, place.x);
            // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
            roadviewClient.getNearestPanoId(position, 50,(panoId)=> {
              if(!panoId) panoId = 1139753257; // 로드뷰 데이터 못 가져왔을 때 기본 좌표
              roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
              
            });
        });

        this.facilityMarkers.push(marker);
        // this.facilityInfoWindows.push(infowindow);
      },
      removeFacilityMarker(){
        this.facilityMarkers.forEach((marker)=>{
          marker.setMap(null);
        });
        this.facilityMarkers=[];
        this.removeFacilityInfoWindows();
      },
      removeFacilityInfoWindows(){
        this.facilityInfoWindows.forEach((info)=>{
          info.close();
        });
        this.facilityInfoWindows=[];
      },
      addCovidMarkers(){
        this.covidCenterList.forEach((center)=>{
        let imageSrc = "https://img.icons8.com/color/48/F44336/hospital.png";
        let imageSize = new kakao.maps.Size(30, 50); // 마커이미지의 크기입니다
        let imageOption = {
          offset : new kakao.maps.Point(27, 69)
        };
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        var marker = new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(center.lat, center.lng),
            image: markerImage
        });

        // var infowindow = new kakao.maps.InfoWindow({
        //   content:`
        //   <div style="width:500px; height:550px">
        //    <h2 style=" margin-top:30px; text-align:center; background-color:coral;">${center.centerName}</h2>
        //    <div id="roadview" style="margin-top:20px; width:100%;height:300px;"></div>
        //    <table style="margin-left: 100px; margin-top: 20px; border: 1px solid black;" >
        //     <tr>
        //         <td style="border: 1px solid black; background-color:bisque;">주소</td>
        //         <td style="border: 1px solid black;">${center.address}</td>
        //     </tr>
        //     <tr>
        //         <td style="border: 1px solid black; background-color:bisque">전화번호</td>
        //         <td style="border: 1px solid black;">${center.phoneNumber}</td>
        //     </tr>
        //     <tr>
        //         <td style="border: 1px solid black; background-color:bisque">설립날짜</td>
        //         <td style="border: 1px solid black;">${center.createdAt}</td>
        //     </tr>
        //     <tr>
        //         <td style="border: 1px solid black; background-color:bisque">업데이트날짜</td>
        //         <td style="border: 1px solid black;">${center.updatedAt}</td>
        //     </tr>
        //   </table>           
        //   </div>
        //   `,
        //   removable : true
        // });
        //마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', ()=>{
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            // this.removeHouseInfoWindows();
            // this.removeFacilityInfoWindows();
            // this.removeCovidInfoWindows();
            // this.covidCenterInfoWindows.push(infowindow);
            // infowindow.open(this.map, marker);
            this.sidebarCheck = true;

            this.isApt = false;
            this.isFacility = false;
            this.isCovidCenter = true;

            document.getElementById("covidCenterInfo").innerHTML=`
            <h2 style=" margin-top:30px; text-align:center; background-color:#D4AE6A;">${center.centerName}</h2>
              <div id="centerRoadview" style="margin-top:20px; width:100%; height:300px;"></div>
              <table style="margin-top: 20px; border: 1px solid black;" >
                <tr>
                    <td style="border: 1px solid black; background-color:bisque;">주소</td>
                    <td style="border: 1px solid black;">${center.address}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid black; background-color:bisque">전화번호</td>
                    <td style="border: 1px solid black;">${center.phoneNumber}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid black; background-color:bisque">설립날짜</td>
                    <td style="border: 1px solid black;">${center.createdAt}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid black; background-color:bisque">업데이트날짜</td>
                    <td style="border: 1px solid black;">${center.updatedAt}</td>
                </tr>
              </table>   
            `
            // 로드뷰 세팅
            var roadviewContainer = document.getElementById('centerRoadview'); //로드뷰를 표시할 div
            var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
            var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

            this.roadLat = center.lat;
            this.roadLng = center.lng;
            var position = new kakao.maps.LatLng(center.lat, center.lng);
            // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
            roadviewClient.getNearestPanoId(position, 50,(panoId)=> {
              if(!panoId) panoId = 1139753257; // 로드뷰 데이터 못 가져왔을 때 기본 좌표
              roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
              
            });
        });
          this.covidCenterMarkers.push(marker);
        });
      },
      removeCovidInfoWindows(){
        this.covidCenterInfoWindows.forEach((info)=>{
          info.close();
        });
        this.covidCenterInfoWindows=[];
      },
      removeCovidMarkers(){
        this.covidCenterMarkers.forEach((marker)=>{
          marker.setMap(null);
        });
        this.covidCenterMarkers=[];        
      },
      bookMark(event){
        if(event.target.dataset.bookmark==="no"){
          event.target.dataset.bookmark="yes"
          this.isBookMark = "star-fill";
          alert("북마크 추가!")
        }else{
          event.target.dataset.bookmark="no"
          this.isBookMark = "star";
          alert("북마크 삭제ㅜ.ㅜ");
        }
      },
      findRoad(){
        let name = '';
        if(this.isApt){
          name = this.aptTitle;
        }else if(this.isFacility){
          name = this.facilityTitle;
        }else{
          name = this.covidCenterTitle;
        }
        let url = "https://map.kakao.com/link/to/"+name+","+this.roadLat+","+this.roadLng;
        window.open(url);        
      }
    }
}
</script>
<style scoped>
#map{
  width: 100%;
  height: 600px; 
}
.facilityBtn{
  margin-left: 5px;
}
#removeFacilityBtn{
  margin-left: 5px;
}
#MT1{
  border: 1px solid #E74C3C;
  color: #E74C3C;
}
#CS2{
  border: 1px solid #FAC87A;
  color: #FAC87A;
}
#PS3{
  border: 1px solid #2ECC71;
  color: #2ECC71;
}
#SC4{
  border: 1px solid #3498DB;
  color: #3498DB;
}
#AC5{
  border: 1px solid #9B59B6;
  color: #9B59B6;
}
#PK6{
  border: 1px solid #95A5A6;
  color: #95A5A6;
}

#OL7{
  border: 1px solid #34495E;
  color: #34495E;
}
#SW8{
  border: 1px solid #4AD8DC;
  color: #4AD8DC;
}
#BK9{
  border: 1px solid #DC4AC4;
  color: #DC4AC4;
}
#CT1{
  border: 1px solid #000000;
  color: #000000;
}
#AT4{
  border: 1px solid #C1DC4A;
  color: #C1DC4A;
}
#FD6{
  border: 1px solid #538851;
  color: #538851;
}
#CE7{
  border: 1px solid #3FFFA0;
  color: #3FFFA0;
}
#HP8{
  border: 1px solid #FFC43F;
  color: #FFC43F;
}
#PM9{
  border: 1px solid #3FF9FF;
  color: #3FF9FF;
}
#bookMark{
  margin-left: 135px;
}
</style>