import React from 'react';
import * as Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import * as actions from '../actions';
import { connect } from 'react-redux';
import QuestionCard from './question-card';

const mapStateToProps = (state, props) => ({
    question: state.question,
    name: state.name,
    correct: state.correct,
    answer: state.answer,
    answered: state.answered,
})

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(actions.fetchUser());
        this.props.dispatch(actions.fetchQuestion());
    }

    onSubmit(event){
        event.preventDefault();
        let formData = {
          answer: this.userAnswer.value
        }
        console.log(this.userAnswer.value);
        this.props.dispatch(actions.submitAnswer(formData));
    }

    nextQuestion(event){
        event.preventDefault();
        console.log('pushed next question');
        this.props.dispatch(actions.fetchQuestion());
    }

    logout(event){
        Cookies.remove('accessToken');
        browserHistory.replace('/login');
    }

    render() {
        let hidden = this.props.answered ? '' : 'hidden';
        return (
          <div className='question-container'>
            <div className="user-info">
              <h3>{this.props.name}</h3>
              <button className='logout' onClick={this.logout}>Logout</button>
            </div>
            <QuestionCard letters={this.props.question.letters}
                          atomic={this.props.question.atomic} />
            <form onSubmit={this.onSubmit}>
                <input type='text' ref={ref => this.userAnswer = ref}
                            placeholder="Type the element name here!"></input>
            </form>
            <div className={`answer-feedback ${hidden}`}>
                {/*Display Correct or False based on the user's input */}
                Your answer is: {this.props.correct ? "Correct" : "False"}<br />
                The correct answer is: {this.props.answer}
            </div>
            <button onClick={this.nextQuestion}>Next Element</button>
            <div className='scoreboard'>
                {/*Display user's current score */}
            </div>
          </div>
        );
    }
}


export default connect(mapStateToProps)(QuestionPage);
