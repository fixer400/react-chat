import { Component } from 'react'
import Chat from '../components/chat'
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuth:false,
      name:''
    }
    this.handleChange = this.handleChange.bind(this);``
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  render () {
    return (
    <div className = 'app'>
      {!this.state.isAuth ? 
      <div className='auth'>
        <input onChange = {this.handleChange} value = {this.state.name}></input><button onClick = {() => {this.setState({isAuth:true})}}>auth</button>
        </div> 
        : 
        <Chat userName = {this.state.name}/>}
    </div>)
  }


}

export default Home;