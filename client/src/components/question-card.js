import React from 'react';
import * as actions from '../actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function QuestionCard(props) {
    return(

      <div className='question-card'>
      <div className='atomic-div'>
        <span className='atomic'>{props.atomic}</span>
      </div>
      <div className='symbol-div'>
        <span className='symbol'>{props.letters}</span><br />
      </div>
      <div className={`answer-div ${props.hidden}`}>
        <span className="answer">{props.answer}</span><br />
      </div>
      </div>

    )
}
