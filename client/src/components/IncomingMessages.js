import React from 'react';
import IncomingMessage from './IncomingMessage';
import LocationMessage from './LocationMessage';
import './IncomingMessages.css';

const IncomingMessages = props => (
  <ul className="messages">
    {props.messages.map((message, i) =>
      message.url ?
      <LocationMessage key={i} location={message}/> :  
      <IncomingMessage key={i} message={message} />)}
  </ul>
);

export default IncomingMessages;