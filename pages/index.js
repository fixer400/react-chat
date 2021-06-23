import { Component } from 'react'
import Chat from '../components/chat'
import styles from '../styles/Home.module.css'
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuth:false,
      name:''
    }
    this.handleChange = this.handleChange.bind(this);``
    this.authenticate = this.authenticate.bind(this)
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  authenticate(){
    if(this.state.name != ''){
      this.setState({isAuth:true})
    }
    else{
    }
  }

  render () {
    return (
    <div className = 'app'>
      {!this.state.isAuth ? 
      <div className={styles.container}>
          <form className = {styles.auth} onSubmit = {this.authenticate}>
            <input onChange = {this.handleChange} value = {this.state.name}></input><button onClick = {this.authenticate}>AUTH</button>
          </form>
      </div> 
        : 
        <Chat userName = {this.state.name}/>}
    </div>)
  }


}

export default Home;