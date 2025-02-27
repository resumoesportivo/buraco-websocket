const WebSocket = require('ws');

const server = new WebSocket.Server({ port: process.env.PORT || 6789 });

let games = {}; // Armazena as partidas

server.on('connection', (ws) => {
    console.log('Novo jogador conectado.');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
        if (data.action === 'join_game') {
            const gameId = data.game_id;

            if (!games[gameId]) {
                games[gameId] = { players: [] };
            }

            games[gameId].players.push(ws);

            if (games[gameId].players.length === 2) {
                games[gameId].players.forEach(player => {
                    player.send(JSON.stringify({ action: 'start_game', message: 'Jogo iniciado!' }));
                });
            }
        }

        if (data.action === 'play_card') {
            const gameId = data.game_id;
            const card = data.card;

            if (games[gameId]) {
                games[gameId].players.forEach(player => {
                    player.send(JSON.stringify({ action: 'update_state', card: card }));
                });
            }
        }
    });

    ws.on('close', () => {
        console.log('Jogador desconectado.');
    });
});

console.log('Servidor WebSocket rodando...');
