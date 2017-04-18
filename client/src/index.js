import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import * as Cookies from 'js-cookie';
import QuestionPage from './components/question-page';
import LoginPage from './components/login-page';
import './index.css';
import './login.css';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
// import {createStore, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
// import {Provider} from 'react-redux';

function checkAuth() {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken){
    browserHistory.replace('/login');
  }
}

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={QuestionPage} onEnter={checkAuth} />
      <Route path='/login' component={LoginPage} />
    </Route>
  </Router>
);

ReactDOM.render(
  <div>
    {routes}
  </div>,
  document.getElementById('root')
);
