import React from 'react';
import * as actions from '../actions';

export default function QuestionCard(props) {
    return(
      <div className='question-card'>
        {props.letters}<br />
        {props.atomic}
      </div>
    )
}
