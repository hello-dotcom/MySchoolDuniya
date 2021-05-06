import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { API_URL } from '../config/config';

class StudentAtdCheck extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
                atdlist:[],
               
        }
    }
    getAttendance=()=>{
        const id=JSON.parse(localStorage.getItem('profile')).id;
        fetch(`${API_URL}/student/attendance/${id}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                Authorization:localStorage.getItem('token'),
            }
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
            if(res.status===401)
            {
                alert(res.message);
                localStorage.clear('token');
                localStorage.clear('role');
                localStorage.clear('profile');
                this.props.history.push('/');
            }
            else if(res.status===400)
            {
                alert(res.message);
            }
            else if(res.status===200){
                this.setState({
                    ...this.state,
                    atdlist:res.data,
                })
            }
        })
        .catch(err=>console.log(err));
    }
    componentDidMount(){
        this.getAttendance();
    }
    
    render() {
        return (
            <div>
                <h1>hello</h1>
                <h1>hello</h1>
                <h1>hello</h1>
                <h1>hello</h1>
                {(localStorage.getItem('role')==="Student")?
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Name</td>
                                <td>Date</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.atdlist.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{JSON.parse(localStorage.getItem('profile')).id}</td>
                                        <td>{item.date}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>:null}
            </div>
        )
    }
}

export default withRouter(StudentAtdCheck);
