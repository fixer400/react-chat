import React, { Component } from 'react'
import Message from '../components/message'
import styles from '../styles/Chat.module.css'
import io from 'socket.io-client'
import axios from 'axios'

const socket = io ('https://react-chat-for-bingo-bongo.herokuapp.com/')

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userName,
      roomName: this.props.roomName,
      messages: [],
      text: '',
      usersList : []
    }
    this.handleChange = this.handleChange.bind(this);``
    this.getMessages = this.getMessages.bind(this);``
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  getMessages(){
    axios.get('https://react-chat-for-bingo-bongo.herokuapp.com/messages/'+this.state.roomName).then((response) => {this.setState({messages:response.data})})
  }

  componentDidMount() {
    console.log(this.state)
    socket.emit('join server', this.state.roomName)
    let name = this.state.userName
    let roomName = this.state.roomName
    socket.emit ('set user', {name,roomName})
    this.getMessages()
    socket.on('get users', (users) => this.setState({usersList:users}))
    socket.on('get messages', this.getMessages)
  }

  sendMessage(text, name) {
    event.preventDefault();
    socket.emit('send message', {
      message: text,
      userName: name
    })
    this.setState({text:''})
  }

  render () {
    return (
      <div className = {styles.container}>
            <div className = {styles.users}>
            <div className = {styles.greeting}><h2>{this.state.userName}</h2></div>
              <h2>{this.state.roomName}</h2>
              <h2>Users:</h2>
              {this.state.usersList.map((user,key) => {              
              return (<p key = {key}>{user.name}</p>)
            })}</div>
            <div className = {styles.main}>
              <div className = {styles.messages}>
                {this.state.messages.map((el,key) => {
                  return (<Message key = {key} message = {el.message} userName = {el.userName}/>)
                })}
              </div>
            <div className = {styles.action}>
              <form onSubmit = {this.sendMessage}>
                <input className = {styles.input} onChange = {this.handleChange} value = {this.state.text}></input><button onClick = {() => this.sendMessage(this.state.text, this.state.userName)}>SEND</button>
              </form>
            </div>
        </div>
          
      </div>
    )
  }
}

export default Chat;
