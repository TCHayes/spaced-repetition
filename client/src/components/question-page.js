import React from 'react';
import * as Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import * as actions from '../actions';
import { connect } from 'react-redux';
import QuestionCard from './question-card';

const mapStateToProps = (state, props) => ({
    question: state.question,
    name: state.name,
    picture: state.picture,
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
        this.props.dispatch(actions.submitAnswer(formData));
    }

    nextQuestion(event){
        event.preventDefault();
        this.answerForm.reset();
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
            <QuestionCard letters={this.props.question.letters}
                          atomic={this.props.question.atomic}
                          answer={this.props.answer}
                          hidden={hidden} />
            <div className='answer-feedback'>
                <h1 className={`answer-feedback-text pulse ${hidden}`}>{this.props.correct ? "Correct" : "Incorrect"}</h1><br />
            </div>
            <form id="input-form" onSubmit={this.onSubmit} ref={ref => this.answerForm = ref}>
                <input type='text' id='user-answer'
                        ref={ref => this.userAnswer = ref}
                        placeholder="Guess Element"
                        disabled={this.props.answered}
                        autoComplete={false}
                        autoFocus></input>
                <button type='submit' className={`btn submit-btn ${hideSubmit}`}
                                disabled={this.props.answered}>Submit</button>
            </form>
            <button className={`btn next-btn ${hidden}`} onClick={this.nextQuestion}>Next Element</button>
            <div className='scoreboard'>
                Score <br />
                Correct:  {this.props.score}<br />
                Incorrect:  {this.props.negScore}
            </div>
          </div>
        );
    }
}


export default connect(mapStateToProps)(QuestionPage);
