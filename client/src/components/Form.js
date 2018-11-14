import React from 'react';

const Form = props => (
  <form onSubmit={(e) => props.submitTextHandler(e)}>
    <input 
      type="text" 
      name="text" 
      value={props.value} 
      onChange={(e) => props.changeTextHandler(e)}
      autoFocus
      autoComplete="off"  
    />
    <button>Send</button>
  </form>
);

export default Form;