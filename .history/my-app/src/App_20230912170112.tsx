import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import SP from './Components/SP';
import LG from './Components/LG';
import Main from './Components/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './utils/trpc';
function App() {
  return (
    <Routes>
      <Route path="/" Component={SP}></Route>
      <Route path="/login" Component={LG}></Route>
      <Route path="/me" Component={Main}></Route>
    </Routes>
  );
}

export default App;
