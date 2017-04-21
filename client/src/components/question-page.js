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
    score: state.score,
    negScore: state.negScore,
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
        document.getElementById("input-form").reset();
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
        let hideSubmit = this.props.answered ? 'hidden' : '';
        return (
          <div className='question-container'>
            <div className="user-info">
              <h2>{this.props.name}</h2>
              <button className='logout' onClick={this.logout}>Logout</button>
            </div>
            <div className={`answer-feedback ${hidden}`}>
                {/*Display Correct or False based on the user's input */}
                <h1 className='answer-feedback-text pulse'>{this.props.correct ? "Correct" : "Incorrect"}</h1><br />
            </div>
            <QuestionCard letters={this.props.question.letters}
                          atomic={this.props.question.atomic}
                          answer={this.props.answer}
                          hidden={hidden} />
            <form id="input-form" onSubmit={this.onSubmit}>
                <input type='text' id='user-answer'
                        ref={ref => this.userAnswer = ref}
                        placeholder="Guess Element"
                        disabled={this.props.answered}
                        autoComplete={false}
                        autoFocus></input>
                <button type='submit' className={`btn submit-btn ${hideSubmit}`}
                                disabled={this.props.answered}>Submit</button>
            </form>
            <button className={`btn pulse2 next-btn ${hidden}`} onClick={this.nextQuestion}>Next Element</button>
            <div className='scoreboard'>
                {/*Display user's current score */}
                Score <br />
                Correct  {this.props.score}<br />
                Incorrect  {this.props.negScore}
            </div>
          </div>
        );
    }
}


export default connect(mapStateToProps)(QuestionPage);
