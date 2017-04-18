import React from 'react';
import * as Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import * as actions from '../actions';
import { connect } from 'react-redux';
import QuestionCard from './question-card';

const mapStateToProps = (state, props) => ({
    question: state.question,
    name: state.name,
})

export class QuestionPage extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         questions: []
    //     };
    // }

    componentDidMount() {
        this.props.dispatch(actions.fetchUser());
        this.props.dispatch(actions.fetchQuestion());
    }

    onSubmit(event){
        event.preventDefault();
        //Add logic for handling user's answer here
        //check if answer equals question.answer
        //display correct answer
    }

    logout(event){
        Cookies.remove('accessToken');
        browserHistory.replace('/login');
    }

    render() {

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


export default connect(mapStateToProps)(QuestionPage);
