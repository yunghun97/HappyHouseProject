import { apiInstance, } from "./index.js";

const api = apiInstance();
// const house = houseInstance();

function sidoList(success, fail) {
  api.get(`/map/sido`).then(success).catch(fail);
}
function gugunList(params, success, fail) {
  api.get(`/map/gugun`, { params: params }).then(success).catch(fail);
}
function bookmarkList(success,fail){
  api.get(`/map/bookmark`).then(success).catch(fail);
}

// 기본 DB꺼 서울만 동이 저장되어 있음
// function dongList(params, success, fail) {
//   api.get(`/map/dong`, { params: params }).then(success).catch(fail);
// }

// API 사용
function dongList(params, success, fail) {
  api.post(`/map/dong`,  params).then(success).catch(fail);
}
function covidCenterList(params, success, fail){
  api.post(`/map/covid`, params).then(success).catch(fail);
}
function addBookmark(params,success,fail){
  api.post(`/map/bookmark`, params).then(success).catch(fail);
}
export { sidoList, gugunList, dongList,covidCenterList,bookmarkList,addBookmark};
