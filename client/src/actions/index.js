import * as Cookies from 'js-cookie';
import { browserHistory } from 'react-router';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = (user) => ({
    type: FETCH_USER_SUCCESS,
    name: user.name,
    picture: user.profilePicUrl,
});

export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const fetchUserFailure = (error) => ({
    type: FETCH_USER_FAILURE,
    error,
});

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = (question) => ({
    type: FETCH_QUESTION_SUCCESS,
    question,
})

export const FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE';
export const fetchQuestionFailure = (error) => ({
    type: FETCH_QUESTION_FAILURE,
    error,
});

export const fetchUser = () => dispatch => {
    const accessToken = Cookies.get('accessToken');
    return fetch(`/api/me`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(response => {
        if (!response.ok) {
            Cookies.remove('accessToken');
            browserHistory.replace('/login');
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(user => {
        dispatch(fetchUserSuccess(user));
    })
    .catch(error => {
        dispatch(fetchUserFailure(error));
    })
}

export const fetchQuestion = () => dispatch => {
  const accessToken = Cookies.get('accessToken');
  return fetch(`/api/question`, {
      headers: {
          'Authorization': `Bearer ${accessToken}`
      }
  }).then(response => {
      if (!response.ok) {
          Cookies.remove('accessToken');
          browserHistory.replace('/login');
          throw new Error(response.statusText);
      }
      return response.json();
  })
  .then(question => {
      dispatch(fetchQuestionSuccess(question));
  })
  .catch(error => {
      dispatch(fetchQuestionFailure(error));
  })
}
