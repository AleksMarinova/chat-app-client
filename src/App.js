import {io} from 'socket.io-client'
import {useState} from 'react'
import Chat from './Chat'
import './App.css';

const socket = io.connect('https://chat-app-server-socket.herokuapp.com/');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room );
      setShowChat(true);
  }
  }


  return (
    <div className="App">
      {!showChat ?
      <div className="joinChatContainer">
      <h3>Join a chat</h3>
      <input type= 'text' placeholder="Enter your name" onChange={(e)=>setUsername(e.target.value)} />
      <input type= 'text' placeholder="Enter your room ID" onChange={(e)=>setRoom(e.target.value)} />
      <button onClick={joinRoom} >Join</button>
      </div>
: 
      <Chat socket={socket} username={username} room={room}/>
      
}
    </div>
  );
}

export default App;

