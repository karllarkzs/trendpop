import React from 'react';
import './App.css';
import POForm from './POForm'; // Import the POForm component
import Header from '../src/components/header';

function App() {
  return (
    <>
    <Header />
    <div className="App">
      <POForm /> {/* Render the POForm component */}
    </div>
    </>
  );
}

export default App;
