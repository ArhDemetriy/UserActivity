import React from 'react';
import './App.scss';
import { Controls } from './Controls/Controls';
import { Graph } from './Graph/Graph';
import { Table } from './Table/Table';

export const App: React.FC = () => {
  return <div className="app">
    <div className="app-data">
      {/* <Table /> */}
      <Graph />
    </div>
    <Controls />
  </div>
}

export default App;
