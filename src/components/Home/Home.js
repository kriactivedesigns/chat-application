import React, { Component } from 'react'
import io from 'socket.io-client'
import LoginForm from '../LoginForm/LoginForm'
import events from '../../Events'
import ChatContainer from '../ChatContainer/ChatContainer'

const socketUrl = "http://localhost:3001" 

class Home extends Component{

    constructor(props){
        super(props)
        this.state = {
            socket: null,
            user: null
        }
    }

    componentDidMount(){
        this.initSocket()
    }

    setUser = (user) => {
        const { socket } = this.state
        socket.emit(events.USER_CONNECTED, user)
        this.setState({user})
    }

    logout = () => {
        const { socket } = this.state
        socket.emit(events.LOGOUT)
        this.setState({user: null})
    }

    initSocket(){
        const socket = io(socketUrl)
        socket.on('connect', () => {
            console.log('Connected')
        })
        this.setState({socket})
    }

    render(){

        const { socket, user } = this.state

        return(
            <div className="container">
                {
                    !user ? 
                    <LoginForm socket={socket} setUser={this.setUser}/>
                    : <ChatContainer socket={socket} logout={this.logout}/>
                }
            </div>
        )

    }
}

export default Home