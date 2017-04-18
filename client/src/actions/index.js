//import * as Cookies from 'js-cookie';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = (user) => ({
    type: FETCH_USER_SUCCESS,
    questions: user.questions,
    name: user.name,
    picture: user.profilePicUrl,
});

export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const fetchUserFailure = (error) => ({
    type: FETCH_USER_FAILURE,
    error,
});

export const fetchUser = (userId) => dispatch => {
    //const accessToken = Cookies.get('accessToken');
    return fetch(`/api/users/${userId}`).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(data => {
        dispatch(fetchUserSuccess(data));
    })
    .catch(error => {
        dispatch(fetchUserFailure(error));
    })
}

// export const fetchQuestions = () => dispatch => {
//
//   return fetch('/api/questions', {
//           headers: {
//               'Authorization': `Bearer ${accessToken}`
//           }
//       }).then(res => {
//         if (!res.ok) {
//             throw new Error(res.statusText);
//         }
//         return res.json();
//       }).then(questions => {
//         dispatch(fetchQuestionsSuccess(questions));
//       }).catch(error => {
//         dispatch(fetchQuestionsFailure(error));
//       });
// }
