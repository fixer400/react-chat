import React from 'react';
import styles from '../styles/Message.module.css'
class Message extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.scrollToBottom()
    }

    scrollToBottom = () => {
        this.messagesEndRef.scrollIntoView({ behavior: "smooth" })
      }

    render(){
        return(
            <div ref={(messagesEndRef) => this.messagesEndRef = messagesEndRef} className = {styles.message}>
                <h3 className = 'message__user-name'>{this.props.userName}:</h3>
                <p className = 'message__text'>{this.props.message}</p>
            </div>
        )
    }
}

export default Message;