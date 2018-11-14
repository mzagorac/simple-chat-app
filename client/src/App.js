import React, { Component } from 'react';
import io from 'socket.io-client';
import IncomingMessages from './components/IncomingMessages';
import Form from './components/Form';
import Introduction from './components/Introduction';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      response: null,
      text: '',
      incomingMessages: [],
      username: ''
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

    if (this.state.username) this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.username) this.scrollToBottom();
  }

  changeTextHandler = e => {
    this.setState({ text: e.target.value })
  }

  submitTextHandler = e => {
    e.preventDefault();

    this.socket.emit('createMessage', {
      from: this.state.username,
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

  submitNameHandler = e => {
    e.preventDefault();
    this.setState({ username:  e.target.username.value });
  }

  // Scrolls viewport for bottom message can be always visible
  scrollToBottom = () => {
    this.element.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return (
      <div className="App">
        {
          this.state.username ?
            <div>
              <IncomingMessages messages={this.state.incomingMessages} />
              <div ref={this.element}></div>
          
              <footer>
                <Form 
                  value={this.state.text}
                  submitTextHandler={this.submitTextHandler}
                  changeTextHandler={this.changeTextHandler} 
                />
                <button onClick={this.clickGeolocationHandler}>Location</button>
              </footer>
            </div> :

            <Introduction 
              username={this.props.username} 
              changeNameHandler={this.changeNameHandler} 
              submitNameHandler={this.submitNameHandler}
            />
        }
        
      </div>
    );
  }
}

export default App;
