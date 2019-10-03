import React from 'react';
import './App.css';
import Game from './Component/Game';

function App({gameId}) {
  return (
    <div className="App">
      <Game size={10} player="circle" gameId={gameId}/>
    </div>
  );
}

export default App;
