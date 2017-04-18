import React from 'react';
import * as Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import * as actions from '../actions';
import { connect } from 'react-redux';

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };
    }

    onSubmit(event){
        event.preventDefault();
        //Add logic for handling user's answer here
    }

    logout(event){
        Cookies.remove('accessToken');
        browserHistory.replace('/login');
    }

    componentDidMount() {
        this.props.dispatch(actions.fetchUser());
    }

    render() {
        const questions = this.state.questions.map((question, index) =>
            <li key={index}>
              {question.atomic}<br />
              {question.letters}
            </li>
        );

        const answers = this.state.questions.map((question, index) =>
            <li key={index}>{question.name}</li>
        );

        return (
          <div className='question-container'>
            <div className="user-info">
              <h3>USERNAME & PIC HERE</h3>
              <button className='logout' onClick={this.logout}>Logout</button>
            </div>
            <ul className="question-list">
                {questions}
            </ul>
            <form onSubmit={this.onSubmit}>
                <input type='text' ref={ref => this.userAnswer = ref}
                            placeholder="Answer Here!"></input>
            </form>
            <ul className='answer-list'>
                {answers}
            </ul>
            <div className='answer-feedback'>
                {/*Display Correct or False based on the user's input */}
            </div>
            <div className='scoreboard'>
                {/*Display user's current score */}
            </div>
          </div>
        );
    }
}


export default connect()(QuestionPage);
