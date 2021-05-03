import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import '../styles/admHome.css'
import {API_URL} from '../config/config'
import AddTeacher from './AddTeacher';
import AddStudent from './AddStudent';
import AddClass from './AddClass';
import AddSubject from './AddSubject';

class AdmHome extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             display:"",
             load_file:0,
             notice_file:"",
             filename:"empty",
             set:0,
        }
    }
    setDisplay= (value)=>{
        this.setState({
            display:value,
        },()=>{
            if(value==="profile" )
            {
                this.getImage();
            }
            else
            {
                this.setState({
                    load_file:0,
                    set:0,
                    filename:"empty"
                })
            }
        });
    }
    getImage=async()=>{
        const buffer= await fetch(`${API_URL}/getfiles/${JSON.parse(localStorage.getItem('profile')).filename}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
            },
        })
        .then(res=>res.arrayBuffer())
        .catch(err=>-1);
        if(buffer!==-1)
        {
            const imgg = document.getElementById('profilepic')
            imgg.src = URL.createObjectURL(new Blob([buffer],{type:'image/jpeg'}));
            imgg.width= 300;
            imgg.height=300;
            // document.getElementById('profilepic').appendChild(imgg);
        }
        this.setState()
    }
    addNotice=()=>{
        const heading= document.getElementById('heading').value;
        const message= document.getElementById('message').value;
        if(heading.trim()!=="" && message.trim()!=="" )
        {
            if(this.state.load_file===1)
            {
                const form = new FormData();
                form.append('file',this.state.notice_file);
                axios.post(`${API_URL}/upload`, form, {
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json',
                    },
                })
                // .then(res=>res.json())
                .then(res=>{
                        console.log(res);
                        const fl= res.data.file.filename;
                        fetch(`${API_URL}/admin/notice`,{
                            method:"POST",
                            headers:{Authorization:localStorage.getItem('token'),'Content-Type':'application/json'},
                            body:JSON.stringify({heading:heading,message:message,filename:fl}),
                        })
                        .then(res=>res.json())
                        .then(res=>{
                            if(res.status===401){alert(res.message); localStorage.clear('token'); this.props.history.push('/')}
                            else if(res.status===400){alert(res.message); }
                            else if(res.status===200){alert(res.message); this.props.history.push('/notices') }
                        })
                        .catch(err=>console.log(err));
                })
                .catch(err=>console.log(err));
            }
            else
            {
            fetch(`${API_URL}/admin/notice`,{
                method:"POST",
                headers:{
                    Authorization:localStorage.getItem('token'),
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    heading:heading,
                    message:message,
                    filename:"empty",
                })
            })
            .then(res=>res.json())
            .then(res=>{
                if(res.status===400)
                {
                    alert(res.message);
                }
                else if(res.status===401)
                {
                    alert(res.message);
                    localStorage.clear('token');
                    this.props.history.push('/');
                }
                else if(res.status===500)
                {
                    alert('Internal Server Error, Please try after some time');
                }
                else if(res.status===200)
                {
                    alert(res.message);
                    this.props.history.push('/notices');
                }
            })
            .catch(err=>console.log(err));
            }
        }
        else{
            alert("fields can't be empty");
        }
    }
    onChangeHandler = (event) =>{
        // console.log(event.target.files[0]);
        this.setState({
            ...this.state,
            load_file:1,
            notice_file:event.target.files[0],
        })
    }
    render() {
        return (
           (localStorage.getItem('token')!==null)?
            <div>
                <div className="d-flex row">
                    <div className="col-3">
                        <div className="side_nav_container">
                            <li className="item" value="profile" onClick={()=>this.setDisplay("profile")}>Profile</li>
                            <li className="item" value="add_notice" onClick={()=>this.setDisplay("notice")}>Notice</li>
                            <li className="item" value="add_student" onClick={()=>this.setDisplay("student")}>Student</li>
                            <li className="item" value="add_faculty" onClick={()=>this.setDisplay("faculty")}>Faculty</li>
                            <li className="item" value="class" onClick={()=>this.setDisplay("class")}>Class</li>
                            <li className="item" value="add_subject" onClick={()=>this.setDisplay("subject")}>Subject</li>
                        </div>
                    </div>
                    <div className="col-9">
                        <div >
                            {(this.state.display==="profile")?
                            
                            <div className="profileContainer row ">
                                
                                <div className="col-8">
                                    <h2 className="profile_field">Id:{JSON.parse(localStorage.getItem('profile')).id}</h2>
                                    <h2 className="profile_field">Name:{JSON.parse(localStorage.getItem('profile')).name}</h2>
                                    <h2 className="profile_field">Phone:{JSON.parse(localStorage.getItem('profile')).phone}</h2>
                                    <h2 className="profile_field">Email:{JSON.parse(localStorage.getItem('profile')).email}</h2>
                                    <h2 className="profile_field">Address:{JSON.parse(localStorage.getItem('profile')).address}</h2>
                                    <h2 className="profile_field">Subject:{JSON.parse(localStorage.getItem('profile')).subject}</h2>
                                    <h2 className="profile_field">Qualification:{JSON.parse(localStorage.getItem('profile')).qualification}</h2>
                                    <h2 className="profile_field">Date of Birth:{JSON.parse(localStorage.getItem('profile')).dob}</h2>
                                    <h2 className="profile_field">Parent Name:{JSON.parse(localStorage.getItem('profile')).parent_name}</h2>
                                    <h2 className="profile_field">Role:{JSON.parse(localStorage.getItem('profile')).role}</h2>
                                </div>
                                <div className="col-3" >
                                    <img id="profilepic" src="" alt=""></img>
                                </div>
                                
                            </div>
                            :
                            (this.state.display==='notice')?
                            <div className="profileContainer">
                                <h1>Adding Notice</h1>
                                <label for="heading" className="label_item">Heading:</label>
                                <br></br>
                                <textarea id="heading" rows="4" cols="50" required></textarea>
                                <br></br>
                                <label for="message" className="label_item">Message:</label>
                                <br></br>
                                <textarea id="message" rows="10" cols="50" required></textarea>
                                <br></br>
                                <label for="file" className="label_item">Upload File:</label>
                                <br></br>
                                <input type="file" name="file" id="file" onChange={this.onChangeHandler}></input>
                                <br></br>
                                <center>
                                    <button className="noticebtn" onClick={()=>this.addNotice()}>Add</button>
                                </center>
                            </div>
                            :
                            (this.state.display==="faculty")?<AddTeacher></AddTeacher>
                            :(this.state.display==="student")?<AddStudent></AddStudent>
                            :(this.state.display==="class")?<AddClass></AddClass>
                            :(this.state.display==="subject")?<AddSubject></AddSubject>
                            :null
                            }
                        </div>
                    </div>
                </div>
            </div>
    
            :<h1>hai</h1>
        )
    }
}

export default withRouter(AdmHome);
