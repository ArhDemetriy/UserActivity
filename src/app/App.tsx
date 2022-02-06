import React from 'react';
import './App.scss';
import { Controls } from './Controls/Controls';
import { Graph } from './Graph/Graph';
import { Table } from './Table/Table';

export const App: React.FC = () => {
  return <div className="app">
    <Controls />
    <div className="app-data">
      <div className="app-data-table">
        <Table />
      </div>
      <div className="app-data-graph">
        <Graph />
      </div>
    </div>
  </div>
}

export default App;
