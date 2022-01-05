import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import home from './home.js'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Susbcribe from './suscribe'
import login from './login';
import backtocommece from './backtocommece'

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={login}></Route>
        <Route exact path='/home' component={home}></Route>
        <Route path='/buy' component={App}></Route>
        <Route path='/suscribe' component={Susbcribe}></Route>
        <Route path='/back' component={backtocommece}></Route>
      </Switch>
      {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
