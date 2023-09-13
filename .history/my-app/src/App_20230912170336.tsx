import React, {useState} from 'react';
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
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  }));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3001',
          async headers() {
            return {
              authorization: "Bearer " + localStorage.getItem("token") || "",
            };
          },
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
      <Routes>
      <Route path="/" Component={SP}></Route>
      <Route path="/login" Component={LG}></Route>
      <Route path="/me" Component={Main}></Route>
    </Routes>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
