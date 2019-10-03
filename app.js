const express = require('express');
const app = express();
const port = 3000;
const path =  require('path')

let games = {};

app.use(express.static('public'));
app.set('views', './views')
app.set('view engine', 'pug')

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/create-game", (req, res) => {
    const id = Math.random().toString(36).substring(7);
    games[id] = [];

    res.redirect(`/game/${id}`);
});

app.get("/game-connect/:gameId/:peerId", (req, res) => {
    const gameId = req.params.gameId;
    const peerId = req.params.peerId;

    if(!games[gameId].includes(peerId))
        games[gameId].push(peerId);
        
    res.json(games[gameId]);
})

app.get("/game/:gameId", (req, res) => {
    const gameId = req.params.gameId;
    if(!gameId)
        res.sendStatus(404);

    res.render("game", {gameId: gameId});

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))