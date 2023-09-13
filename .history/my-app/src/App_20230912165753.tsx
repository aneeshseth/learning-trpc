import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import SP from './Components/SP';

function App() {
  return (
    <Routes>
      <Route path="/" Component={SP}></Route>
      <Route path="/login" Component={LG}></Route>
    </Routes>
  );
}

export default App;
