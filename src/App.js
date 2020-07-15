import React from 'react';
import { SignalRConnector } from './components/SignalRConnector';
import { BusStop } from './features/busstop/BusStop';
import './App.scss';

function App() {
  return (
    <div className="App container">
      <header className="App-header">
        <h1>Arriving at Great Portland Str stn, stops G and H</h1>
        <SignalRConnector />
      </header>
      <main>
        <BusStop />
      </main>
    </div>
  );
}

export default App;
