import Head from 'next/head'
import Image from 'next/image'
import { Component } from 'react'
import styles from '../styles/Home.module.css'
import Message from '../components/message'
import io from 'socket.io-client'
const socket = io ('http://localhost:3001')

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      messages: [],
      text: '',
      usersList : []
    }
  
    this.handleChange = this.handleChange.bind(this);``
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  getUsers() {
    socket.emit('get users', {})
  }

  async componentDidMount() { 
    this.setState({userName:prompt('введите имя')})
    await this.state.userName!=''
    
    socket.emit ('set users', (this.state.userName))
    
    socket.on ('get users', (data) => {
      console.log(data)
      this.setState({usersList: data})
      console.log(this.state.usersList)
    })

    socket.on('get message',(data) => {
      console.log(data.userName)
      this.setState({messages:[...this.state.messages,{message:data.message,userName:data.userName}]})
      console.log(this.state)
    })

    socket.on('user disconnected',(data) => {
      let newList=this.state.usersList.filter(users=>users.id != data)
      this.setState({usersList:newList})
    })
  }

  sendMessage(text, name) {
    socket.emit('send message', {
      message: text,
      userName: name
    })
    this.setState({text:''})
  }

  render () {
    return (
      <div className = {styles.container}>
        <div className = 'greeting'><h2>hello {this.state.userName}</h2></div>
        <div className = 'users'>{this.state.usersList.map((user) => {
          return (console.log(user),<p>{user.name}</p>)
        })}</div>
        {this.state.messages.map((el) => {
          return (<Message message = {el.message} userName = {el.userName}/>)
        })}
          <input onChange = {this.handleChange} value = {this.state.text}></input><button onClick = {() => this.sendMessage(this.state.text, this.state.userName)}>send</button>
      </div>
    )
  }
}

export default Home;