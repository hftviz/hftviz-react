import React from 'react';
import ReactDOM from 'react-dom';
import Viz from './Viz';
import './components/components.css'
import reportWebVitals from './reportWebVitals';
import stockNames from '../src/data/stockNames.json'
import data from '../src/data/sampleData.json'




ReactDOM.render(
  <React.StrictMode>
    <Viz data={data} stockNames={stockNames}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
