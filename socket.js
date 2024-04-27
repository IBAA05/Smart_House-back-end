const WebSocket = require('ws');
const app = require('./app');

app.get('/connect', (req, res) => {
  const ws = new WebSocket('ws://localhost:8080/connect'); // Replace with serverA's address

  ws.onopen = () => { 
    console.log('Connected to server RASB');
    // Optionally send an initial message to serverA after connection
    ws.send('Hello from server APP'); 

  };
   
  ws.onmessage = (message) => {
    console.log('Received message from server RAS:', message.data);
    // Process message and potentially send responses through the WebSocket
  };
 
});