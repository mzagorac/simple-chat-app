import React, { Component } from 'react';
import io from 'socket.io-client';
import IncomingMessages from './components/IncomingMessages';
import Form from './components/Form';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      response: null,
      text: '',
      incomingMessages: [],
    }
    this.socket = io("http://127.0.0.1:3001");
    this.element = React.createRef();
  }

  componentDidMount() {
    this.socket.on('newMessage', (message) => {
      this.setState({ incomingMessages: [...this.state.incomingMessages, message] });
    });

    this.socket.on('newLocation', (location) => {
      this.setState({ incomingMessages: [...this.state.incomingMessages, location] })
    });

    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  changeTextHandler = e => {
    this.setState({ text: e.target.value })
  }

  submitTextHandler = e => {
    e.preventDefault();

    this.socket.emit('createMessage', {
      from: 'User',
      text: this.state.text
    }, (data) => {
      console.log(data);
    });
    this.setState({ text: '' })
  }

  clickGeolocationHandler = () => {
    if (!navigator.geolocation) this.setState({ location: null })
    else {
      navigator.geolocation.getCurrentPosition(position => {
        this.socket.emit('exposeLocation', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      }, () => {

      })
    }
  }

  // Scrolls viewport for bottom message can be always visible
  scrollToBottom = () => {
    this.element.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return (
      <div className="App">
        <IncomingMessages  
          messages={this.state.incomingMessages}
        />
        <div ref={this.element}></div>
        
        <footer>
          <Form 
            value={this.state.text}
            submitTextHandler={this.submitTextHandler}
            changeTextHandler={this.changeTextHandler} 
          />
          <button onClick={this.clickGeolocationHandler}>Location</button>
        </footer>
      </div>
    );
  }
}

export default App;
