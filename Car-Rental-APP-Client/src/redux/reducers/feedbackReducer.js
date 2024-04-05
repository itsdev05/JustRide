import {
    ADD_FEEDBACK_REQUEST,
    ADD_FEEDBACK_SUCCESS,
    ADD_FEEDBACK_FAILURE,
    GET_FEEDBACKS_SUCCESS,
    GET_FEEDBACKS_FAILURE
  } from '../actions/feedbackActions';
  
  const initialState = {
    feedbacks: [],
    loading: false,
    error: null
  };
  
  const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_FEEDBACK_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case ADD_FEEDBACK_SUCCESS:
        return {
          ...state,
          loading: false,
          feedbacks: [action.payload, ...state.feedbacks], // Add the new feedback to the beginning of the array
          error: null
        };
      case ADD_FEEDBACK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case GET_FEEDBACKS_SUCCESS:
        return {
          ...state,
          loading: false,
          feedbacks: action.payload,
          error: null
        };
      case GET_FEEDBACKS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default feedbackReducer;
  
