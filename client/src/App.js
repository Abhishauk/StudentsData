import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import StudentAdd from './components/StudentAdd/StudentAdd';
import Home from './Pages/Home';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route path="/" element={<StudentAdd />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/StudentAdd' element={<StudentAdd />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
