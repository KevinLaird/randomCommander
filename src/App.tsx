import React from 'react';
import './App.scss';
import { GetRandomCommander } from './api/scryfall';

function App(): JSX.Element {
  return (
    <div>
      <GetRandomCommander />
    </div>
  );
}

export default App;
