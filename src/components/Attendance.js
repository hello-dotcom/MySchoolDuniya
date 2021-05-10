import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { API_URL } from '../config/config';

class Attendance extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             stage:"1",
             classList:[],
             stdList:[],
             id:JSON.parse(localStorage.getItem('profile')).id,
        }
    }
    getAllClasses=()=>{
        fetch(`${API_URL}/admin/classTeacher/${this.state.id}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                Authorization:localStorage.getItem('token'),
            },
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.status===401)
            {
                alert(res.message);
                localStorage.clear('token');
                localStorage.clear('profile');
                localStorage.clear('role');
                this.props.history.push('/')
            }
            else if(res.status===400)
            {
                alert(res.message);
            }
            else if(res.status===200)
            {
                this.setState({
                    ...this.state,
                    classList:res.data,
                })
            }
        })
        .catch(err=>console.log(err));
    }
    componentDidMount(){
        this.getAllClasses();
    }
    getStudents=(id)=>{
        fetch(`${API_URL}/admin/students/${id}`,{
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
                localStorage.clear('profile');
                localStorage.clear('role');
                this.props.history.push('/')
            }
            else if(res.status===400)
            {
                alert(res.message);
            }
            else if(res.status===200)
            {
                const now = new Date();
                const date = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
                fetch(`${API_URL}/admin/student/atdcheck`,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json',
                        Authorization:localStorage.getItem('token'),
                    },
                    body:JSON.stringify({
                        id:res.data[0].id,
                        date:date,
                    })
                })
                .then(result=>result.json())
                .then(result=>{
                    if(result.taken===false)
                    {
                        this.setState({
                            ...this.state,
                            stdList:res.data,
                            stage:"2",
                        })
                    }
                    else{
                        alert(result.message);
                        return;
                    }
                })
                .catch(err=>console.log(err));
            }
        })
        .catch(err=>console.log(err));
    }
    submitAttendance=()=>{
        const now = new Date();
        const date = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
        const obj = this.state.stdList.map((item,index)=>{
            return {
                id:item.id,
                date:date,
                status:document.getElementsByTagName('select')[index].value,
            }
        })
        fetch(`${API_URL}/admin/student/attendance`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                Authorization:localStorage.getItem('token'),
            },
            body:JSON.stringify({
                data:obj,
            })
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.status===401)
            {
                alert(res.message);
                localStorage.clear('token');
                localStorage.clear('profile');
                localStorage.clear('role');
                this.props.history.push('/');
            }
            else if(res.status===400)
            {
                alert(res.message);
            }
            else if(res.status===200)
            {
                alert(res.message);
                window.location.reload();
            }
        })
        .catch(err=>console.log(err));
    }
    
    render() {
        return (
            <div className="container">
                {this.state.stage==="1"?
                <div>
                    
                        {this.state.classList.map((item,index)=>{
                            return (
                                <button key={index} onClick={()=>this.getStudents(item.class_id)}>{item.class_id}</button>
                            )
                        })}
                    
                </div>
                :<div>
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
                            {this.state.stdList && this.state.stdList.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{Date().substr(0,15)}</td>
                                        <td>
                                            <select name="stat">
                                                <option value="Present">Present</option>
                                                <option value="Absent">Absent</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                            
                        </tbody>
                    </table>
                    <div className="d-flex row justify-content-between">
                        <button onClick={()=>this.submitAttendance()}> Submit</button>
                        <button onClick={()=>{this.setState({...this.state,stage:"1"})}}> Back</button>
                    </div>
                </div>}
            </div>
        )
    }
}

export default withRouter(Attendance);
