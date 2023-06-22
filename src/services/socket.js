import io from 'socket.io-client';

const socket = io('http://localhost:81'); 

export default socket;