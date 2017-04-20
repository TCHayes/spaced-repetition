import * as actions from '../actions/index';

const initialState = {
  question: '',
  name: '',
  picture: '',
  score: 0,
  error: null,
  correct: false,
  answer: '',
  answered: false,
}

export default (state=initialState, action) => {
  if (action.type === actions.FETCH_USER_SUCCESS){
    return {...state,
      name: action.name,
      picture: action.picture,
      error: null,
    }
  }
  if (action.type === actions.FETCH_USER_FAILURE){
    return {...state, error: action.error}
  }
  if (action.type === actions.FETCH_QUESTION_SUCCESS){
    return {...state, question: action.question}
  }
  if (action.type === actions.FETCH_QUESTION_FAILURE){
    return {...state, error: action.error}
  }
  if(action.type === actions.SUBMIT_ANSWER_SUCCESS) {
    return {...state, correct: action.answer.correct,
      answer: action.answer.actualAnswer, answered: true}
  }
  if(action.type === actions.SUBMIT_ANSWER_FAILURE) {
    return{...state, error: action.error}
  }
  return state;
}
