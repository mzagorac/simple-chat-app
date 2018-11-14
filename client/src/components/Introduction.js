import React from 'react';
import './Introduction.css'

const Introduction = props => {
  return (
    <div className="introduction-back">
      <div className="introduction-wrapper">
        <h3>Please enter username:</h3>
        <form onSubmit={(e) => props.submitNameHandler(e)}>
          <input 
            type="text"
            name="username" 
            value={props.username}
            autoComplete="off"
            autofocus
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
    
  );
}

export default Introduction;