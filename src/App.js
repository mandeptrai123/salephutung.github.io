import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

//import component 
import BottomNavigation from './screens/BottomNavigation/BottomNavigation';
import Manage from './screens/Manage/Manage';
import Oder from './screens/Oder/Oder';



function App() {
  return (
    <Router>
      <div className='app'>
        {/* <Switch> */}
          <Route exact path='/'>
            <BottomNavigation/>
          </Route>

          <Route path='/quanli'>
            <Manage/>
          </Route>

          <Route path='/oder'>
            <Oder/>
          </Route>

        {/* </Switch> */}
      </div>
    </Router>
  );
}

export default App;
