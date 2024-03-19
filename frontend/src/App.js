import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';

function App() {

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
