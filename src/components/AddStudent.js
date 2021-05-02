import {Component} from 'react';
import {withRouter} from 'react-router-dom';
import '../styles/addStudent.css'
class AddStudent extends Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            name:"",
            parent_name:"",
            email:"",
            password:"",
            class:"",
            dob:"", 
            phoneno:"",
            address:"",           
        }
    }
    signup = ()=>{
        let id=document.getElementById('id').value.trim();
        let password= document.getElementById('password').value.trim();
        if(id!=="" && password!=="")
            console.log("good");
        else    
            console.log("fields are empty");
    }
    render(){
        return (
            <div className="container">
                <center><h2>Add Student Form</h2></center>
                <input
                    type="text"
                    placeholder="Enter Id"
                    name="id"
                    id="id"
                    required
                />
                 <input
                    type="text"
                    placeholder="Enter Fullname"
                    name="fullname"
                    id="fullname"
                    required
                />
                <input
                    type="text"
                    placeholder="Enter Parent's name"
                    name="pname"
                    id="pname"
                    required
                />
                <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    id="email"
                    required
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    id="password"
                    required
                />
                <input
                    type="text"
                    placeholder="Enter Class"
                    name="class"
                    id="class"
                    required
                />
                <label>Date Of Birth: </label>
                <input type="date" id="dob" name="dob"
       min="2004-01-01" max="2018-12-31"/>
                <input
                    type="text"
                    placeholder="Enter Phone No"
                    name="phoneno"
                    id="phoneno"
                    required
                />
                <input
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    id="address"
                    required
                />
                <div className="btncontainer">
                    <button type="submit" onClick={()=>this.signup()}>Sign up</button>
                </div>
            </div>
        )
    }
}
export default withRouter(AddStudent);