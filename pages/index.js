import { Component } from 'react'
import Chat from '../components/chat'
import axios from 'axios'
import styles from '../styles/Home.module.css'
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuth:false,
      name:'',
      roomName:'',
      roomsList:[],
      validation:false
    }
    this.authenticate = this.authenticate.bind(this)
  }

  getRoomsList(){
    axios.get('http://localhost:3001/rooms').then((response) => {this.setState({roomsList:response.data})})
  }

  componentDidMount(){
    this.getRoomsList();
  }

  authenticate(event){
    if((this.state.name != '')&&(this.state.roomName != '')){
      this.setState({isAuth:true})
      this.setState({validation:false})
      console.log(event)
      if (!window.audioHandler){
        window.audioHandler = new Audio('/fart_with_extra_reverb.mp3')
      }
    }
    else{
      alert('Поле, не может быть пустым')
    }
  }

  render () {
    return (
    <div className = 'app'>
      {!this.state.isAuth ? 
      <div className={styles.container}>
          <form className = {styles.auth} onSubmit = {this.authenticate}>
            <h2>Room ID:</h2>
            <input maxLength="12" className = {this.state.validation ? styles.auth__error:''} value = {this.state.roomName} onChange = {e => this.setState({roomName:e.target.value})}></input>
            <h2>User Name:</h2>
            <input maxLength="12" value = {this.state.name} onChange = {e => this.setState({name:e.target.value})}></input>
            <button onClick = {this.authenticate}>AUTH</button>
          </form>
          <div className = 'rooms-list'>{this.state.roomsList.map((room) => {return(<div>{room.roomName}</div>)})}</div>
      </div> 
        : 
        <Chat userName = {this.state.name} roomName = {this.state.roomName}/>}
    </div>)
  }


}

export default Home;