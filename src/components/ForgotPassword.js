import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import '../styles/forgotPassword.css';
import { API_URL } from '../config/config'


class ForgotPassword extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            role:"",
            id:"",
            otp:"",
            request_id:"",
            password:"",
            stage:"1"
        }
    }
    sendOTP=()=>{
        const role = document.getElementById('role').value;
        this.setState({...this.state,role:role});
        const id = document.getElementById('id').value;
        if(role==="select")
        {
            alert('select the role ');
            return;
        }
        if(id==="")
        {
            alert("id shoudn't be empty");
            return;
        }
        else if(role==="faculty" && (!id.startsWith('Fac') || id.length!==7))
        {
            alert("id doesn't seem correct");
            return;
        }
        else if(role==="student" && (!id.startsWith('S')|| id.length!==7))
        {
            alert("id doesn't seem correct");
            return;
        }
        else{
            console.log(id,role);
            fetch(`${API_URL}/otp/send`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    id:id,
                    role:role,
                })
            })
            .then(res=>res.json())
            .then(res=>{
                if(res.status===400)
                {
                    alert(res.message);
                }
                else if(res.status===200)
                {
                    this.setState({
                        ...this.state,
                        request_id:res.data.request_id,
                        id:id,
                        role:role,
                        stage:"2",
                    })
                }
            })
            .catch(err=>console.log(err));
        }
    }
    verifyOTP=()=>{
        let otp = document.getElementById('otp').value;
        if(otp==="")
        {
            alert('please enter the otp');
        }
        else{
            fetch(`${API_URL}/otp/verify`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    request_id:this.state.request_id,
                    otp:otp,
                })
            })
            .then(res=>res.json())
            .then(res=>{
                if(res.status===400)
                {
                    alert(res.message);
                }
                else if(res.status===200)
                {
                    this.setState({
                        ...this.state,
                        stage:"3",
                    })
                }
            })
            .catch(err=>console.log(err));
        }
    }
    changePassword=()=>{
        const passwordregex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+()]).{8,20}$/;
        const p1 = document.getElementById('password').value;
        const p2 = document.getElementById('repassword').value;
        console.log(p1,p2,p1===p2);
        if(p1!==p2)
        {
            alert('passwords did not match');
            return;
        }
        else if(p1===p2 &&  !passwordregex.test(p1))
        {
            alert(
				'password must have a number, one uppercase ,one lower case letter and one special character'
			);
			return;
        }
        else{
            fetch(`${API_URL}/otp/updatePassword`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    id:this.state.id,
                    role:this.state.role,
                    password:p1,
                })
            })
            .then(res=>res.json())
            .then(res=>{
                if(res.status===400)
                {
                    alert(res.message);
                }
                else if(res.status===200)
                {
                    alert(res.message);
                    this.props.history.push('/');
                }
            })
            .catch(err=>console.log(err));
        }
    }
    render() {
        return (
            <div className=" forgotPassword-Container">
                {(this.state.stage==="1")?
                <div>
                    <div className="d-flex row elementContainer">
                        <label for="role" className="col-5 pt-3">Role:</label>
                        <select id="role">
                            <option value="select">--select--</option>
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                        </select>
                    </div>
                    <div className="d-flex row elementContainer">
                        <label for="id" className="col-5 pt-3">Id:</label>
                        <input id="id"  className="col-5" type="text"></input>
                    </div>
                    <div className="btnContainer">
                        <button className="buttonArea" onClick={()=>this.sendOTP()}>Send OTP</button>
                    </div>
                    
                </div>:
                (this.state.stage==="2")?
                <div>
                   <div className="d-flex row elementContainer">
                        <label for="otp" className="col-5 pt-3">OTP:</label>
                        <input id="otp"  className="col-5" type="text" placeholder="Enter OTP"></input>
                    </div>
                    <div className="btnContainer">
                        <button className="buttonArea" onClick={()=>this.verifyOTP()}>Verify OTP</button>
                    </div>
                </div>:
                (this.state.stage==="3")?
                <div>
                    <div className="d-flex row elementContainer">
                        <label for="password" className="col-5 pt-3">Password:</label>
                        <input id="password"  className="col-5" type="password"></input>
                    </div>
                    <div className="d-flex row elementContainer">
                        <label for="repassword" className="col-5 pt-3">Re-enter password:</label>
                        <input id="repassword"  className="col-5" type="password"></input>
                    </div>
                    <div className="btnContainer">
                        <button className="buttonArea" onClick={()=>this.changePassword()}>Submit</button>
                    </div>
                </div>:
                null}
            </div>
        )
    }
}

export default withRouter(ForgotPassword);
