import { apiInstance } from "./index.js";

const api = apiInstance();

// 목록 조회
function selectQna(param, success, fail) {
  api.get(`/qna`, { params: param }).then(success).catch(fail);
}

// 글 작성
function writeQna(qna, success, fail) {
  api.post(`/qna`, JSON.stringify(qna)).then(success).catch(fail);
}

// 글 상세 조회
function getQna(no, success, fail) {
  api.get(`/qna/${no}`).then(success).catch(fail);
}

// 글 삭제
function deleteQna(no, success, fail) {
  api.delete(`/qna/${no}`).then(success).catch(fail);
}

// 답변 조회
function selectAnswer(qno, success, fail) {
  api.get(`/qna/answer/${qno}`).then(success).catch(fail);
}

// 답변 등록
function addAnswer(answer, success, fail) {
  api.post(`/qna/answer`, JSON.stringify(answer)).then(success).catch(fail);
}

// 답변 삭제
function deleteAnswer(no, success, fail) {
  api.delete(`/qna/answer/${no}`).then(success).catch(fail);
}

export {
  selectQna,
  writeQna,
  getQna,
  deleteQna,
  selectAnswer,
  addAnswer,
  deleteAnswer,
};
