import axios from "axios";
import { message } from "antd";

export const getAllcars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response=await axios.get(
      `http://localhost:2000/api/cars/getallcars`
    )
    dispatch({ type: "GET_ALL_carS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addcar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post(
      "http://localhost:2000/api/cars/addcar",
      reqObj
    );

    dispatch({ type: "LOADING", payload: false });
    message.success("New car added successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editcar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.put(
      "http://localhost:2000/api/cars/editcar",
      reqObj
    );

    dispatch({ type: "LOADING", payload: false });
    message.success("car details updated successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deletecar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post(
      "http://localhost:2000/api/cars/deletecar",
      reqObj
    );

    dispatch({ type: "LOADING", payload: false });
    message.success("car deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
