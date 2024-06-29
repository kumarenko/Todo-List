import ServerConfig from "./serverConfig";

const URL = ServerConfig.getUrl();
const PRODUCTS_URL = URL + "api/products";
const SHOPPING_LISTS_URL = URL + "api/shoppingLists";
const LOGIN_URL = URL + "api/login";
const PROTECTED_ROUTE_URL = URL + "api/protected-route";
const REGISTER_URL = URL + "api/register";
const USERS_URL = URL + "api/users";

export {
PRODUCTS_URL,
SHOPPING_LISTS_URL,
LOGIN_URL,
PROTECTED_ROUTE_URL,
REGISTER_URL,
USERS_URL
};
