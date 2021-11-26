import { apiInstance } from "./index.js";

const api = apiInstance();

// 로그인
async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

// 회원가입
async function join(user, success, fail) {
  await api.post(`/user/join`, JSON.stringify(user)).then(success).catch(fail);
}

// 회원 정보 가져오기
async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

// 회원탈퇴
async function deleteUser(userid, success, fail) {
  await api.delete(`/user/delete/${userid}`).then(success).catch(fail);
}

// // 회원수정
async function updateUser(user, success, fail) {
  await api.put(`/user/modify`, JSON.stringify(user)).then(success).catch(fail);
}

// 아이디찾기
async function findId(user, success, fail) {
  await api
    .post(`/user/findid`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

// 비밀번호찾기
async function findPwd(user, success, fail) {
  await api
    .post(`/user/findpwd`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

// 모든 회원 조회
function selectUsers(user, success, fail) {
  api.get(`/user/list`, { users: user }).then(success).catch(fail);
}
export {
  login,
  join,
  findById,
  deleteUser,
  updateUser,
  findId,
  findPwd,
  selectUsers,
};
