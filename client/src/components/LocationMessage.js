import React from 'react';
import './LocationMessage.css';

const LocationMessage = props => (
  <a className="location-message" href={props.location.url} target="blank">My Location</a>
);


export default LocationMessage;