
import { Component } from 'react'
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
      messages: [],
      text: '',
      usersList : []
    }
  
    this.handleChange = this.handleChange.bind(this);``
  }

  onChange(event){
    this.state.usersList.registerListener(console.log('hui'))
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  componentDidMount() {
    console.log(this.state)
    socket.emit ('set user', (this.state.userName))
    socket.on('get users', (users) => this.setState({usersList:users}))

    socket.on('get message',(data) => {
      console.log(data.userName)
      this.setState({messages:[...this.state.messages,{message:data.message,userName:data.userName}]})
      console.log(this.state)
    })
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
              <h2>Users:</h2>
              {this.state.usersList.map((user) => {              
              return (<p>{user.name}</p>)
            })}</div>
            <div className = {styles.main}>
              <div className = {styles.messages}>
                {this.state.messages.map((el) => {
                  return (<Message key = {el.key} message = {el.message} userName = {el.userName}/>)
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