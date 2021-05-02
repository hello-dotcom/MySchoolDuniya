import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Events from './pages/events';
import Notices from './pages/notices';
import Maintainance from './pages/maintainance';
import Student from './components/Student';
import Login from './components/Login';
import Upload from './components/Upload';
import AddStudent from './components/AddStudent';
import AddTeacher from './components/AddTeacher';
import Chat from './components/Chat';
import Leave from './components/Leave';
import AdmHome from './components/AdmHome';
import AddClass from './components/AddClass'


// class App extends Component {
//   constructor(props) {
//     super(props)
  
//     this.state = {
       
//     }
//   }
  
//   render(){
    
//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>
//     // </div>
//     <Router>
//       <div>
//         <Switch>
//           <Route exact path="/">
//             <Home ></Home>
//           </Route>
//           <Route exact path="/student">
//             <Student></Student>
//           </Route>
//           <Route exact path="/login">
//             <Login></Login>
//           </Route>
//           <Route exact path="/upload">
//             <Upload></Upload>
//           </Route>
//           <Route exact path="/addstudent">
//             <AddStudent></AddStudent>
//           </Route>
//           <Route exact path="/addteacher">
//             <AddTeacher></AddTeacher>
//           </Route>
//           <Route exact path="/chat">
//             <Chat></Chat>
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
//   }
function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/about" component={About} />
				<Route path="/events" component={Events} />
				<Route path="/notices" component={Notices} />
				<Route path="/maintainance" component={Maintainance} />
				<Route path="/student" component={Student}>
					<Student></Student>
				</Route>
				<Route path="/login" component={Login}>
					<Login></Login>
				</Route>
				<Route path="/upload" component={Upload}>
					<Upload></Upload>
				</Route>
				<Route path="/addStudent" component={AddStudent}>
					<AddStudent></AddStudent>
				</Route>
				<Route path="/addteacher" component={AddTeacher}>
					<AddTeacher></AddTeacher>
				</Route>
        <Route exact path="/chat">
                <Chat></Chat>
         </Route>
         <Route exact path="/leave">
                <Leave></Leave>
         </Route>
         
				<Route exact path="/home1">
					<AdmHome></AdmHome>
				</Route>
				<Route exact path="/class">
					<AddClass></AddClass>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
