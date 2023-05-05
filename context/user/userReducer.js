import {
  ADD_ADDRESS,
  ADD_ORDERS,
  GET_ORDERS,
  GET_USER,
  LOAD_SHOP,
  UPDATE_USER,
} from "../types";

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USER: {
      return { ...state, user: action.payload };
    }
    case GET_ORDERS: {
      return { ...state, orders: action.payload };
    }
    case ADD_ORDERS: {
      return { ...state, orders: [...state.orders, action.payload] };
    }
    case UPDATE_USER: {
      return { ...state, user: action.payload };
    }
    case ADD_ADDRESS: {
      return { ...state, user: { ...state.user, address: action.payload } };
    }
    case LOAD_SHOP: {
      return {
        ...state,
        customization: action.payload.customization,
        filterOne: action.payload.filterOne,
        filterTwo: action.payload.filterTwo,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
