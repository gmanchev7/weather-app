import './styles.scss';
import WeatherApp from './Components/WeatherApp';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Day from './Components/Day/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="days/:day" element={<Day />} />
        <Route path="*" element={<WeatherApp />}/>
      </Routes>
    </Router>
  );
}

export default App;
