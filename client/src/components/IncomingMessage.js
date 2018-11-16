import React from 'react';
import moment from 'moment';
import './IncomingMessage.css';
import { parseText } from '../utils/parseText';

const IncomingMessage = props => {
  
  const style = {
    textAlign: 'right'
  }

  const renderText = () => {
    // if (props.message.text.length < 20)
    //   return <p className="imcoming-message_text">{props.message.text}</p>;
    
    // else {
      return parseText(props.message.text)
        .map((line, i) => {
          return <p className="imcoming-message_text" key={i}>{line}</p>
        })
    // }
  }

  return (
    <div className="message-wrapper">
      <li 
        className="incoming-message"  
        style={
          props.message.from !== props.username && 
          props.message.from !== 'Admin' ? style : null
        }
      >
        <h3 className="imcoming-message_user">
          {props.message.from}
          <span className="imcoming-message_time">
            {moment(props.message.createdAt).format('h:mm a')}
          </span>
        </h3> 
        <div className="imcoming-message_text-wrapper">{renderText()}</div>
        {/*<p className="imcoming-message_text">{props.message.text}</p>*/} 
      </li>
    </div>
  );
}

export default IncomingMessage;