const express = require('express');
const app = express();
const port = 3000;
const path =  require('path')

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname ,"public/landing.html"));
});

app.get("/create-game", (req, res) => {

});

app.get("/game/:gameId", (req, res) => {
    const gameId = req.params.gameId;
    if(!gameId)
        res.sendStatus(404);

    res.sendFile(path.join(__dirname ,"public/index.html"));

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))