import React from 'react';
import './App.css';
import Game from './Component/Game';

function App() {
  return (
    <div className="App">
      <Game size={10} player="circle"/>
    </div>
  );
}

export default App;
