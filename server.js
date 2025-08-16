const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Új kliens csatlakozott');

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      // Broadcast the message to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    } catch (e) {
      console.error('Hiba az üzenet feldolgozásakor:', e);
    }
  });

  ws.on('close', () => {
    console.log('Kliens lecsatlakozott');
  });

  ws.on('error', (error) => {
    console.error('WebSocket hiba:', error);
  });
});

console.log(`WebSocket szerver fut a ${PORT} porton`);