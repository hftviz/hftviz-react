import React from 'react';
import ReactDOM from 'react-dom';
import Viz from './Viz';
import './components/components.css'
import reportWebVitals from './reportWebVitals';
import stockNames from '../src/data/stockNames.json';
// import detailData from '../src/data/sampleData.json';

// IMPORTANT NOTE: Berkshire Hathaway and Brown Forman Corp have invalid symbol in javascript. The program can't read them.

ReactDOM.render(
  <React.StrictMode>
    <Viz stockNames={stockNames}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
