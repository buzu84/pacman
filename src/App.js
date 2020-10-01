import React, { useState } from 'react'
import Header from './components/Header'
import './App.css'
import Board from './components/Board'

function App() {
  const [score, setScore] = useState(0);
  return (
    <div className="App">
      <Header score={score}/>
      <Board setScore={setScore}/>
    </div>
  );
}

export default App;
