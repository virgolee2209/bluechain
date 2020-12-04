import React, { useState } from "react";
import './App.css';
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import {Router,Route,Switch} from 'react-router-dom'
import { createBrowserHistory } from "history";
import AuthContext  from "./context/auth";
const hist = createBrowserHistory();
function App() {
  const [token, setToken] = useState('');
  const updateToken = data => {
    // localStorage.setItem("tokens", JSON.stringify(data));
    setToken(data);
  };
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <AuthContext.Provider value={{ token, setToken: updateToken }}>
      <Router history={hist}>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <Route path="/" component={HomePage}/>
        </Switch>
          
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
