import React from 'react';
import moment from 'moment';
import './IncomingMessage.css';

const IncomingMessage = props => (
  <li className="incoming-message">
    <h3 className="imcoming-message_user">
      {props.message.from}
      <span className="imcoming-message_time">
        {moment(props.message.createdAt).format('h:mm a')}
      </span>
    </h3> 
    <p className="imcoming-message_text">{props.message.text}</p> 
  </li>
);

export default IncomingMessage;