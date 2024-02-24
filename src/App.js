import './App.css';

import React from 'react';
import { BrowserRouter as RouterProvider, Route, Routes } from 'react-router-dom';

import Landing from './components/Landing';
import Main from './components/Main';

function App() {
  return (
    <RouterProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/analysis" element={<Main />} />
      </Routes>
    </RouterProvider>
  );
}

export default App;
