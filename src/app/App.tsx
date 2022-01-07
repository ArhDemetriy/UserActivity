import React from 'react';
import './App.scss';
import { Controls } from './Controls/Controls';
import { Table } from './Table/Table';

export const App: React.FC = () => {
  return <div className="app">
    <Table />
    <Controls />
  </div>
}

export default App;
