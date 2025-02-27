const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;  // Define a porta corretamente

const server = new WebSocket.Server({ port: PORT });

server.on('connection', ws => {
    console.log('Novo cliente conectado');

    ws.on('message', message => {
        console.log(`Mensagem recebida: ${message}`);
        ws.send(`Eco: ${message}`);
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

console.log(`Servidor WebSocket rodando na porta ${PORT}`);

