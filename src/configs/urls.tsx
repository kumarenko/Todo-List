import ServerConfig from "./serverConfig";

const URL = ServerConfig.getUrl();
const PRODUCTS_URL = URL + "api/products";
const SHOPPING_LISTS_URL = URL + "api/shoppingLists";

export {
PRODUCTS_URL,
SHOPPING_LISTS_URL
};
