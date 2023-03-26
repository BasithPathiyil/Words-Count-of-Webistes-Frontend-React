import api from "./api";

const tokenHandle = (token, emailId) => {
  console.log("in roken handle");
  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("emailId", emailId);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("emailId");
    delete api.defaults.headers.common.Authorization;
  }
};

export default tokenHandle;
