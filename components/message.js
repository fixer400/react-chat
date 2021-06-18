import React from 'react';

class Message extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className = 'message'>
                <p className = 'message__user-name'>{this.props.userName}</p>
                <p className = 'message__text'>{this.props.message}</p>
            </div>
        )
    }
}

export default Message;