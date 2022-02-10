import {useState, useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'; 

const Chat = ({socket, username, room}) => {

const [currentMessage,setCurrentMessage] = useState('');
const [messages, setMessages] = useState([]); 
 
const sendMessage = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentMessage !== '') {
         const messageData = {
             room: room,
            author: username,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes() 
         }
         await socket.emit('send_message', messageData); 
         setMessages([...messages, messageData]); 
         setCurrentMessage('');
    }
}

useEffect(()=>{
    socket.on('receive_message', (data)=>{
        setMessages(messages => [...messages, data]); 
    })
}, [socket])
 

     return (
            <div className="chat-window"> 
            <div>You are logged in as {username}</div>
                <h3 className="chat-header">Live chat</h3>
                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                    {messages.map((message, index)=>{
                        return (
                             <div className="message" id={username === message.author ? "you" : "other"} >
                                 <div>
                                     <div className="message-content">
                                            <p>{message.message }</p>
                                     </div>
                                     <div className="message-meta">
                                            <p id='author'>{message.author}</p>
                                            <p id="time">{message.time}</p>
                                     </div>
                                 </div>
                             </div>
                        )
                    })}
                    </ScrollToBottom>
                </div>
                <div className="chat-footer">
                    <input type="text" 
                    placeholder="Type your message" 
                    value={currentMessage} 
                    onChange={(event)=>setCurrentMessage(event.target.value)}
                    onKeyPress={(event)=>{
                        if (event.key === 'Enter') {
                            sendMessage(event);
                        }
                    }}
                    />
                    <button
                    onClick={(event)=>sendMessage(event)}
                    >Send</button>
                </div> 
             </div>   
     )
}

export default Chat;