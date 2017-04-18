import * as actions from '../actions/index';

const initialState = {
  questions: [],
  name: '',
  picture: '',
  score: 0,
  error: null,
}

export default (state=initialState, action) => {
  if (action.type === actions.FETCH_USER_SUCCESS){
    return {...state, questions: action.questions,
      name: action.name,
      picture: action.picture,
      error: null,
    }
  }
  if (action.type === actions.FETCH_USER_FAILURE){
    return {...state, error: action.error}
  }
  return state;
}
