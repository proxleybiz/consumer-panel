import axios from "axios";
import React, { useReducer } from "react";
import setAuthToken from "../../utils/setAccessToken";
import {
  ADD_ADDRESS,
  ADD_ORDERS,
  GET_ORDERS,
  GET_USER,
  UPDATE_USER,
} from "../types";
import UserContext from "./userContext";
import userReducer from "./userReducer";

function UserState(props) {
  let initialState = {
    user: null,
    loading: false,
    orders: [],
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const [state, dispatch] = useReducer(userReducer, initialState);
  const getUser = async (success = null, error = null) => {
    try {
      if (
        localStorage.getItem("accessToken") === null ||
        localStorage.getItem("accessToken") === undefined
      ) {
        if (error) {
          error("Invalid Token");
        }
        return;
      } else {
        setAuthToken(localStorage.getItem("accessToken"));
      }
      const res = await axios.get("/api/getUser", config);
      if (res.data.status) {
        dispatch({ type: GET_USER, payload: res.data.data.user });
        localStorage.setItem("accessToken", res.data.data.token);
        if (success) {
          success();
        }
      } else {
        localStorage.removeItem("accessToken");
        if (error) {
          error(res.data.msg);
        }
      }
    } catch (err) {
      if (error) {
        error(err);
      }
    }
  };

  const login = async (data, success = null, error = null) => {
    try {
      const res = await axios.post("/api/login", { ...data }, config);
      if (res.data.status) {
        localStorage.setItem("accessToken", res.data.data);
        if (success) {
          success();
        }
      } else {
        localStorage.removeItem("accessToken");
        if (error) {
          error(res.data.msg);
        }
      }
    } catch (err) {
      if (error) {
        error(err);
      }
    }
  };

  const verifyNumber = async (phone, success = null, error = null) => {
    try {
      if (
        localStorage.getItem("accessToken") === null ||
        localStorage.getItem("accessToken") === undefined
      ) {
        if (error) {
          error("Invalid Token");
        }
        return;
      } else {
        setAuthToken(localStorage.getItem("accessToken"));
      }
      const res = await axios.post("/api/verifyNumber", { phone }, config);
      if (res.data.status) {
        dispatch({ type: GET_USER, payload: res.data.data });
        if (success) {
          success();
        }
      } else {
        if (error) {
          error(res.data.msg);
        }
      }
    } catch (err) {
      if (error) {
        error(err);
      }
    }
  };

  const updatePassword = async (password, success = null, error = null) => {
    try {
      if (
        localStorage.getItem("accessToken") === null ||
        localStorage.getItem("accessToken") === undefined
      ) {
        if (error) {
          error("Invalid Token");
        }
        return;
      } else {
        setAuthToken(localStorage.getItem("accessToken"));
      }
      const res = await axios.post("/api/updatePassword", { password }, config);
      if (res.data.status) {
        dispatch({ type: GET_USER, payload: res.data.data });
        if (success) {
          success();
        }
      } else {
        localStorage.removeItem("accessToken");
        if (error) {
          error(res.data.msg);
        }
      }
    } catch (err) {
      if (error) {
        error(err);
      }
    }
  };

  const getOrders = async (success = null, error = null) => {
    try {
      if (
        localStorage.getItem("accessToken") === null ||
        localStorage.getItem("accessToken") === undefined
      ) {
        if (error) {
          error("Invalid Token");
        }
        return;
      } else {
        setAuthToken(localStorage.getItem("accessToken"));
      }
      const res = await axios.get("/api/getOrders", config);
      if (res.data.status) {
        dispatch({ type: GET_ORDERS, payload: res.data.data });
        if (success) {
          success();
        }
      } else {
        if (error) {
          error(res.data.msg);
        }
      }
    } catch (err) {
      if (error) {
        error(err);
      }
    }
  };

  const validateOrder = async (data, success = null, error = null) => {
    try {
      if (
        localStorage.getItem("accessToken") === null ||
        localStorage.getItem("accessToken") === undefined
      ) {
        if (error) {
          error("Invalid Token");
        }
        return;
      } else {
        setAuthToken(localStorage.getItem("accessToken"));
      }
      const res = await axios.post(
        "/api/validateOrder",
        { id: data.id, payment: data.payment },
        config
      );
      if (res.data.status) {
        dispatch({ type: ADD_ORDERS, payload: res.data.data });
        if (success) {
          success();
        }
      } else {
        if (error) {
          error(res.data.msg);
        }
      }
    } catch (err) {
      if (error) {
        error(err);
      }
    }
  };

  const fetchOrderDetails = async (id, success = null, error = null) => {
    try {
      if (
        localStorage.getItem("accessToken") === null ||
        localStorage.getItem("accessToken") === undefined
      ) {
        if (error) {
          error("Invalid Token");
        }
        return;
      } else {
        setAuthToken(localStorage.getItem("accessToken"));
      }
      const res = await axios.post(
        "/api/fetchOrderDetails",
        { id: id },
        config
      );
      if (res.data.status) {
        if (success) {
          success(res.data.data);
        }
      } else {
        if (error) {
          error(res.data.msg);
        }
      }
    } catch (err) {
      if (error) {
        error(err);
      }
    }
  };

  const register = async (data, success = null, error = null) => {
    try {
      const res = await axios.post("/api/register", { ...data }, config);
      if (res.data.status) {
        localStorage.setItem("accessToken", res.data.data);
        if (success) {
          success();
        }
      } else {
        localStorage.removeItem("accessToken");
        if (error) {
          error(res.data.msg);
        }
      }
    } catch (err) {
      if (error) {
        error(err);
      }
    }
  };
  const updateProfile = async (data, success = null, error = null) => {
    try {
      if (
        localStorage.getItem("accessToken") === null ||
        localStorage.getItem("accessToken") === undefined
      ) {
        if (error) {
          error("Invalid Token");
        }
        return;
      } else {
        setAuthToken(localStorage.getItem("accessToken"));
      }
      const res = await axios.post("/api/updateProfile", { ...data }, config);
      if (res.data.status) {
        dispatch({ type: UPDATE_USER, payload: res.data.data });
        if (success) {
          success();
        }
      } else {
        localStorage.removeItem("accessToken");
        if (error) {
          error(res.data.msg);
        }
      }
    } catch (err) {
      if (error) {
        error(err);
      }
    }
  };

  const addAddress = async (data, success = null, error = null) => {
    try {
      if (
        localStorage.getItem("accessToken") === null ||
        localStorage.getItem("accessToken") === undefined
      ) {
        if (error) {
          error("Invalid Token");
        }
        return;
      } else {
        setAuthToken(localStorage.getItem("accessToken"));
      }
      const res = await axios.post(
        "/api/addAddress",
        { address: data },
        config
      );
      if (res.data.status) {
        dispatch({ type: ADD_ADDRESS, payload: res.data.data });
        if (success) {
          success();
        }
      } else {
        localStorage.removeItem("accessToken");
        if (error) {
          error(res.data.msg);
        }
      }
    } catch (err) {
      if (error) {
        error(err);
      }
    }
  };

  const updateAddress = async (data, success = null, error = null) => {
    try {
      if (
        localStorage.getItem("accessToken") === null ||
        localStorage.getItem("accessToken") === undefined
      ) {
        if (error) {
          error("Invalid Token");
        }
        return;
      } else {
        setAuthToken(localStorage.getItem("accessToken"));
      }
      const res = await axios.post(
        "/api/updateAddress",
        { address: data },
        config
      );
      if (res.data.status) {
        dispatch({ type: ADD_ADDRESS, payload: res.data.data });
        if (success) {
          success();
        }
      } else {
        localStorage.removeItem("accessToken");
        if (error) {
          error(res.data.msg);
        }
      }
    } catch (err) {
      if (error) {
        error(err);
      }
    }
  };

  const deleteAddress = async (id, success = null, error = null) => {
    try {
      if (
        localStorage.getItem("accessToken") === null ||
        localStorage.getItem("accessToken") === undefined
      ) {
        if (error) {
          error("Invalid Token");
        }
        return;
      } else {
        setAuthToken(localStorage.getItem("accessToken"));
      }
      const res = await axios.post("/api/deleteAddress", { id }, config);
      if (res.data.status) {
        dispatch({ type: ADD_ADDRESS, payload: res.data.data });
        if (success) {
          success();
        }
      } else {
        localStorage.removeItem("accessToken");
        if (error) {
          error(res.data.msg);
        }
      }
    } catch (err) {
      if (error) {
        error(err);
      }
    }
  };
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        orders: state.orders,
        getUser,
        login,
        verifyNumber,
        updatePassword,
        getOrders,
        validateOrder,
        fetchOrderDetails,
        register,
        updateProfile,
        addAddress,
        deleteAddress,
        updateAddress,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
