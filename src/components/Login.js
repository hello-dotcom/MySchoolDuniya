import {Component} from 'react';
import {withRouter} from 'react-router-dom';
import avatar from '../images/avatar.png'
import '../styles/login.css'
class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            password:"",
        }
    }
    login = ()=>{
        let id=document.getElementById('id').value.trim();
        let password= document.getElementById('password').value.trim();
        if(id!=="" && password!=="")
            console.log("good");
        else    
            console.log("fields are empty");
    }
    render(){
        return (
                <form>
                    <div className="imgcontainer">
                        <img src={avatar} alt="Avatar" className="avatar" />
                    </div>
                    <div className="container">
                        <label>Username : </label>
                        <input
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        id="id"
                        required
                        />
                        <label>Password : </label>
                        <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        id="password"
                        required
                        />
                    </div>
                    <div className="btncontainer">
                        <button type="submit" onClick={()=>this.login()}>Login</button>
                    </div>
                    <center>
                        <div className="container">
                        <span className="psw">Forgot <a href="/">password?</a></span>
                        </div>
                    </center>  
                </form>

        )
    }
}

export default withRouter(Login);