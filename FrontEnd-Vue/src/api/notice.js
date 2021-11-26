import { apiInstance } from "./index.js";

const api = apiInstance();

function selectNotice(param, success, fail) {
  api.get(`/notice`, { params: param }).then(success).catch(fail);
}

function getNotice(no, success, fail) {
  api.get(`/notice/${no}`).then(success).catch(fail);
}

function registNotice(notice, success, fail) {
  api.post(`/notice`, JSON.stringify(notice)).then(success).catch(fail);
}

function deleteNotice(no, success, fail) {
  api.delete(`/notice/${no}`).then(success).catch(fail);
}

export { selectNotice, getNotice, registNotice, deleteNotice };
