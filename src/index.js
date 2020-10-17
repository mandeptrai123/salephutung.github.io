import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import HangLuongTonKhoThap from './screens/HangLuongTonKhoThap/HangLuongTonKhoThap';
import Manage from './screens/Manage/Manage';
import NhapKho from './screens/NhapKho/NhapKho';
import Order from './screens/Oder/Oder';
import BottomNavigation from './screens/BottomNavigation/BottomNavigation';
import App from './App'
import Login from './screens/Login/Login';


ReactDOM.render(
  <React.StrictMode>
    <NhapKho />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
