import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskDetails from './components/TaskDetails';
import Board from './components/Board';

function App() {

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <Router>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
