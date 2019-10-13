const express = require('express');
const app = express();
const port = 3000;
const path =  require('path')
const Twig = require("twig")

let games = {};

app.use(express.static('public'));
app.set('views', './views')
app.set('view engine', 'twig')

app.set("twig options", {
    allow_async: true, // Allow asynchronous compiling
    strict_variables: false
});

app.get("/", (req, res) => {
    res.render("index.twig");
});

app.get("/join-game", (req, res) => {
    res.render("join.twig");
});

app.get("/join", (req, res) => {
    const gameId = req.query.gameId;

    if(!games.hasOwnProperty(gameId))
        res.send("This game does not exists")

    res.redirect(`/game/${gameId}`);
});

app.get("/create-game", (req, res) => {
    const id = Math.random().toString(36).substring(6);
    games[id] = [];

    res.redirect(`/game/${id}`);
});

app.get("/game-connect/:gameId/:peerId", (req, res) => {
    const gameId = req.params.gameId;
    const peerId = req.params.peerId;
    const currentGame = games[gameId]

    if(!currentGame.includes(peerId) && currentGame.length < 2){
        games[gameId].push(peerId);
        console.log(`Connecting player ${peerId} to game ${gameId}`)
    }
        
    res.json(games[gameId]);
})

app.get("/game/:gameId", (req, res) => {
    const gameId = req.params.gameId;
    if(!gameId)
        res.sendStatus(404);

    res.render("game.twig", {gameId: gameId});

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))