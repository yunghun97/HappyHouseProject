import { apiInstance } from "./index.js";

const api = apiInstance();

// 목록 조회
function selectBoard(success, fail) {
  api.get(`/board`).then(success).catch(fail);
}

// 글 작성
function writePost(board, success, fail) {
  api.post(`/board`, JSON.stringify(board)).then(success).catch(fail);
}

// 글 상세 조회
function getPost(boardno, success, fail) {
  api.get(`/board/${boardno}`).then(success).catch(fail);
}

// 글 수정
function modifyPost(board, success, fail) {
  api.put(`/board`, JSON.stringify(board)).then(success).catch(fail);
}

// 글 삭제
function deleteBoard(boardno, success, fail) {
  api.delete(`/board/${boardno}`).then(success).catch(fail);
}

// 댓글 작성
function addReply(comment, success, fail) {
  api.post(`/board/comment`, JSON.stringify(comment)).then(success).catch(fail);
}

// 댓글 조회
function selectComment(boardno, success, fail) {
  api.get(`/board/comment/${boardno}`).then(success).catch(fail);
}

// 댓글 삭제
function deleteComment(commentno, success, fail) {
  api.delete(`/board/comment/${commentno}`).then(success).catch(fail);
}

export {
  selectBoard,
  writePost,
  getPost,
  modifyPost,
  deleteBoard,
  addReply,
  selectComment,
  deleteComment,
};
