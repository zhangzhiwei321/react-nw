import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import BasicRoute from './router/index.js';
import Win from './window';
import { Window, Text } from 'react-desktop/windows';
function App() {
  const defaultStyle = {
    color: '#cc7f29',
    theme: 'light'
  };
  return (
    <Window className={'App-header'}>
      <Win></Win>
      <BasicRoute></BasicRoute>
    </Window>
  );
}


export default App;
