// const URL = "https://shoes-bond.onrender.com/";
// const URL = "http://localhost:8000/";

const URL = import.meta.env.VITE_API_URL;

export const API_GET_PRODUCTS = URL + "api_items";
export const API_SET_ORDER = URL + "orders";
export const API_CHEKOUT_ORDER = URL + "checkout";
export const API_GET_KEY = URL + "getkey";
export const API_VALIDATE = URL + "validate";
export const API_LOGIN = URL + "login";
export const API_GET_ORDERS = URL + "getOrders";
export const API_CLEAR_ORDERS = URL + "clearOrders";
export const API_SIGNUP = URL + "signup";
export const API_UPLOAD_AVATAR = URL + "upload-avatar";
export const API_GET_AVATAR = URL + "get-avatar";

export const LOGO =
  "https://as1.ftcdn.net/v2/jpg/03/15/06/10/1000_F_315061039_JPz3A8Yd64Ugsy2T6Ez6E9IPwAhs3ftD.jpg";

export const API_ADD_SHOES = URL + "add_product";
