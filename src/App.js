// import logo from './logo.svg';
import './App.css';
import {HashRouter as Router,Route,Switch} from 'react-router-dom'
import Home from './components/Home';
import {Component} from 'react'
import Student from './components/Student';
import Login from './components/Login';
import Upload from './components/Upload';

class App extends Component {
  render(){
    
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
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home ></Home>
          </Route>
          <Route exact path="/student">
            <Student></Student>
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/upload">
            <Upload></Upload>
          </Route>
        </Switch>
      </div>
    </Router>
  );
  }
}

export default App;
