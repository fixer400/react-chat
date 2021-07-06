import { Component } from 'react'
import Chat from '../components/chat'
import styles from '../styles/Home.module.css'
import RoomsList from '../components/RoomsList'
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuth:false,
      name:'',
      roomName:'',
      validation:false
    }
    this.authenticate = this.authenticate.bind(this)
  }

  authenticate(event){
    if((this.state.name != '')&&(this.state.roomName != '')){
      this.setState({isAuth:true})
      this.setState({validation:false})
      console.log(event)
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
            <input type = 'number' maxLength="12" className = {this.state.validation ? styles.auth__error:''} value = {this.state.roomName} onChange = {e => this.setState({roomName:e.target.value})}></input>
            <h2>User Name:</h2>
            <input maxLength="12" value = {this.state.name} onChange = {e => this.setState({name:e.target.value})}></input>
            <button onClick = {this.authenticate}>AUTH</button>
          </form>
          <RoomsList/>
      </div> 
        : 
        <Chat userName = {this.state.name} roomName = {this.state.roomName}/>}
    </div>)
  }


}

export default Home;
