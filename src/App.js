import React from 'react';
import Game from './Component/Game';

function App({gameId}) {
  return (
    <div className="App">
      <Game size={12} player="circle" gameId={gameId}/>
    </div>
  );
}

export default App;
