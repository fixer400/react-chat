import React, { Component } from 'react'
import Message from '../components/message'
import styles from '../styles/Chat.module.css'
import io from 'socket.io-client'
import axios from 'axios'
const socket = io ('http://localhost:3001')

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
    this.joinServer = this.joinServer.bind(this);``
    this.subscribeSockets = this.subscribeSockets.bind(this);``
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  getMessages(){
    axios.get('http://localhost:3001/messages/'+this.state.roomName).then((response) => {this.setState({messages:response.data})})
  }

  scrollToBottom(){
    this.el.scrollIntoView({ behavior: "smooth" });
    console.log(this.el)
  }

  subscribeSockets(){
    socket.on('get users', (users) => this.setState({usersList:users}))
    socket.on('get messages', this.getMessages)
    socket.on('new message', () => {new Audio('/Bruh.mp3').play()})
    socket.on('new user' , () => {new Audio('/discord-sounds.mp3').play()})
  }

  joinServer(){
    let name = this.state.userName
    let roomName = this.state.roomName
    socket.emit('join server', this.state.roomName)
    socket.emit ('set user', {name,roomName})
  }

  componentDidMount() {
    this.joinServer()
    this.subscribeSockets()
    this.getMessages()
  }

  sendMessage(text, name) {
    if(this.state.text !=''){
      event.preventDefault();
    socket.emit('send message', {
      message: text,
      userName: name
    })
    this.setState({text:''})
    }
    else{
      event.preventDefault();
    }
  }

  render () {
    return (
      <div className = {styles.container}>
            <div className = {styles.users}>
            <div className = {styles.greeting}><h2>{this.state.userName}</h2></div>
              <h2>Room:{this.state.roomName}</h2>
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
                <input maxlength="50" className = {styles.input} onChange = {this.handleChange} value = {this.state.text}></input><button onClick = {() => this.sendMessage(this.state.text, this.state.userName)}>SEND</button>
              </form>
            </div>
        </div>
      </div>
    )
  }
}

export default Chat;
