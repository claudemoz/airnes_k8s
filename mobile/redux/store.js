import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categories from "./slices/categories";
import materials from "./slices/materials";
import products from "./slices/products";
import orders from "./slices/orders";
import cart from "./slices/cart";
import order from "./slices/order";
import contact from "./slices/contact";
import configApp from "./slices/configApp";
import auth from "./slices/auth";
import payment_intents from "./slices/payment_intents";

const rootReducer = combineReducers({
  auth: auth,
  categories: categories,
  materials: materials,
  products: products,
  orders: orders,
  cart: cart,
  order: order,
  contact: contact,
  configApp: configApp,
  payment_intents: payment_intents,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
