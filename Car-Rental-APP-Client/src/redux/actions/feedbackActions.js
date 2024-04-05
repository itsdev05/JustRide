// // feedbackActions.js

// import axios from 'axios'; // Assuming you're using axios for making HTTP requests

// // Action Types
// export const ADD_FEEDBACK_REQUEST = 'ADD_FEEDBACK_REQUEST';
// export const ADD_FEEDBACK_SUCCESS = 'ADD_FEEDBACK_SUCCESS';
// export const ADD_FEEDBACK_FAILURE = 'ADD_FEEDBACK_FAILURE';

// // Action Creators
// export const addFeedbackRequest = () => ({
//   type: ADD_FEEDBACK_REQUEST
// });

// export const addFeedbackSuccess = (feedback) => ({
//   type: ADD_FEEDBACK_SUCCESS,
//   payload: feedback
// });

// export const addFeedbackFailure = (error) => ({
//   type: ADD_FEEDBACK_FAILURE,
//   payload: error
// });

// export const addFeedback = (feedbackData) => {
//   return async (dispatch) => {
//     dispatch(addFeedbackRequest()); 

//     try {
//       // Make API request to add feedback
//       const response = await axios.post('http://localhost:2000/api/bookings/feedback', feedbackData);

//       dispatch(addFeedbackSuccess(response.data)); // Dispatching success action with the newly added feedback
//     //   console.log(addFeedbackSuccess(response.data))
//     } catch (error) {
//       dispatch(addFeedbackFailure(error.response.data)); // Dispatching failure action with error message
//     }
//   };
// };
import axios from 'axios';

// Action Types
export const ADD_FEEDBACK_REQUEST = 'ADD_FEEDBACK_REQUEST';
export const ADD_FEEDBACK_SUCCESS = 'ADD_FEEDBACK_SUCCESS';
export const ADD_FEEDBACK_FAILURE = 'ADD_FEEDBACK_FAILURE';
export const GET_FEEDBACKS_SUCCESS = 'GET_FEEDBACKS_SUCCESS';
export const GET_FEEDBACKS_FAILURE = 'GET_FEEDBACKS_FAILURE';

// Action Creators
export const addFeedbackRequest = () => ({
  type: ADD_FEEDBACK_REQUEST
});

export const addFeedbackSuccess = (feedback) => ({
  type: ADD_FEEDBACK_SUCCESS,
  payload: feedback
});

export const addFeedbackFailure = (error) => ({
  type: ADD_FEEDBACK_FAILURE,
  payload: error
});

export const getFeedbacksSuccess = (feedback) => ({
  type: GET_FEEDBACKS_SUCCESS,
  payload: feedback
});

export const getFeedbacksFailure = (error) => ({
  type: GET_FEEDBACKS_FAILURE,
  payload: error
});

export const addFeedback = (feedbackData) => {
  return async (dispatch) => {
    dispatch(addFeedbackRequest());

    try {
      const response = await axios.post('http://localhost:2000/api/bookings/feedback', feedbackData);
      dispatch(addFeedbackSuccess(response.data));
    } catch (error) {
      dispatch(addFeedbackFailure(error.message));
    }
  };
};

export const getFeedbacks = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:2000/api/bookings/feedback');
      dispatch(getFeedbacksSuccess(response.data));
    } catch (error) {
      dispatch(getFeedbacksFailure(error.message));
    }
  };
};
