import Cookies from "universal-cookie";
export const token = () => {
  var cookies = new Cookies();
  return cookies.get("auth");
};

export const removeToken = () => {
  var cookies = new Cookies();
  return cookies.remove("auth");
};

export const setCookie = (token) => {
    var cookies = new Cookies();
    cookies.set("auth",token);
};