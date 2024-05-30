import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import TpImages from './TpImages';
import TpPage from './TpPage';

function App() {

  const[tp, setTp] = useState(null);

  return (
    <div className="App">
      <Header /> 
      { !tp ? 
        <TpImages setTp={setTp}/>
        :
        <TpPage tp={tp}/>
      }
    </div>
  );
}

export default App;
