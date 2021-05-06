import React from 'react';
import './App.css';
// import Navbar from './components/Navbar';
import NavbarPage from './components/newNavbar/newnavbar';
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
import AddClass from './components/AddClass';
import AddSubject from './components/AddSubject';
import ProcessLeave from './components/ProcessLeave';
function App() {
	return (
		<Router>
			{/* <Navbar /> */}
			<NavbarPage />
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
				<Route exact path="/home1" component={AdmHome}>
					<AdmHome></AdmHome>
				</Route>
				<Route exact path="/addclass" component={AddClass}>
					<AddClass></AddClass>
				</Route>
				<Route exact path="/addsubject" component={AddSubject}>
					<AddSubject></AddSubject>
				</Route>
				<Route exact path="/processleave" >
					<ProcessLeave></ProcessLeave>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
