import {Component} from 'react';
import {withRouter} from 'react-router-dom';
// import '../styles/chat.css'
class Leave extends Component{
 
  constructor(props){
    super(props);
    this.state={
        id:"",
        // fullname:"",
        // pname:"",
        // email:"",
        // password:"",
        // class:"",
        // dob:"", 
        // phoneno:"",
        // address:"",   
        Reason:"",
        startdate:"",
        enddate:"",        
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
            <div>
              <form>
                    <div className="container">
                    <center><h2>Leave Application form</h2></center>
                    <input
                        type="text"
                        placeholder="Enter Id"
                        name="id"
                        id="id"
                        required
                        />
                         {/* <input
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
                        /> */}
                        {/* <input
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
                        /> */}
                        <label>Start date: </label>
                        <input type="date" id="startdate" name="startdate"
       min="2004-01-01" max="2018-12-31"/>
                        <label>End date: </label>
                        <input type="date" id="enddate" name="enddate"
       min="2004-01-01" max="2018-12-31"/>
                         <input
                        type="text"
                        placeholder=""
                        name="reason"
                        id="reason"
                        required
                        />
                    
                    </div>
                    <div className="btncontainer">
                        <button type="submit" onClick={()=>this.signup()}>Sign up</button>
                    </div>    
                </form>
            </div>
        )
    }
}
export default withRouter(Leave);