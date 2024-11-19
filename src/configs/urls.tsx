import ServerConfig from "./serverConfig";

export const URL = ServerConfig.getUrl();
export const SHOPPING_LISTS_URL = URL + "api/shoppingLists";
export const SHOPPING_LIST_CREATE_URL = URL + "api/shoppingLists/add";
export const SHOPPING_LISTS_ADD_PROD_URL = URL + "api/shoppingLists/addProduct";
export const SHOPPING_LISTS_EDIT_PROD_URL = URL + "api/shoppingLists/editProduct";
export const SHOPPING_LIST_SHARE_URL = URL + "api/shoppingLists/invite";
export const LOGIN_URL = URL + "api/login";
export const PROTECTED_ROUTE_URL = URL + "api/protected-route";
export const REGISTER_URL = URL + "api/register";
export const USERS_URL = URL + "api/users";
export const SYNC_ALL_LISTS_URL = URL + 'api/shoppingLists/syncAllLists';
export const UPLOAD_URL = URL + 'api/shoppingLists/upload';
export const FORGOT_PASSWORD_GENERATE_CODE_URL = URL + 'api/users/forgotPassword/generateCode';
export const FORGOT_PASSWORD_SUBMIT_CODE_URL = URL + 'api/users/forgotPassword/submitCode';
export const FORGOT_PASSWORD_URL = URL + 'api/users/forgotPassword/changePassword';
export const CLOUD_URL = "https://f003.backblazeb2.com/file/shoppingListCloud/";