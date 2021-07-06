import React, { Component } from 'react'
import axios from 'axios'
import styles from '../styles/RoomsList.module.css'
class RoomsList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            roomsList:[],
        }
    }

    getRoomsList(){
        axios.get('https://react-chat-for-bingo-bongo.vercel.app//rooms').then((response) => {this.setState({roomsList:response.data})})
      }

    componentDidMount(){
        this.getRoomsList();
      }

    scrollToBottom = () => {
        this.messagesEndRef.scrollIntoView({ behavior: "smooth" })
      }

    render(){
        return(
            <div className = {styles.rooms}>
                <h2>Rooms</h2>
                <ul className = {styles.rooms__list}>
                    {this.state.roomsList.map((room, key) => {return(<li key = {key}>{room.roomName}</li>)})}
                </ul>
            </div>
        )
    }
}

export default RoomsList;