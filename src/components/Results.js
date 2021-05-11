import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import { API_URL } from '../config/config';
import '../styles/results.css';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
             stage:1,
             classList:[],
             stdList:[],
             class:"",
             std_id:"",
             std_name:"",
             marks_list:[],
             subject_list:[],
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
    getAllSubjects=()=>{
        console.log('reached')
        fetch(`${API_URL}/admin/subject`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === 400) {
					alert(res.message);
					window.location.reload();
				} else if (res.status === 200) {
					// alert(res.message);
                    console.log(res);
                    const result=[]
					for(var i=0;i<res.data.length;i++)
                    {
                        if(res.data[i].class_id===this.state.class)
                        {
                            result.push(res.data[i]);
                        }
                    }
                    console.log(result);
                    this.setState({
                        ...this.state,
                        subject_list:result,
                        stage:3,
                    },()=>{console.log(this.state)})
				}
			})
			.catch((err) => console.log(err));

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
                this.setState({
                    ...this.state,
                    stdList:res.data,
                    class:id,
                    stage:2,
                })
            }
        })
        .catch(err=>console.log(err));
        
    }
    gotoResults=(std_id,std_name)=>{
        fetch(`${API_URL}/admin/results/${std_id}/${this.state.class}`,{
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
                localStorage.clear('token');
                localStorage.clear('role');
                localStorage.cler('profile');
                this.props.history.push('/');
            }
            else if(res.status===400)
            {
                alert(res.message);
            }
            else if(res.status===200)
            {
                console.log(res);
                console.log(res.data.length)
                if(res.data.length===0)

                {   console.log("moving")
                    this.getAllSubjects();}
                this.setState({
                    ...this.state,
                    std_id:std_id,
                    stage:3,
                    std_name:std_name,
                    marks_list:res.data,
                })
            }
        })
        .catch(err=>console.log(err));
    } 
    submitResults=()=>{
        const abc= document.getElementsByTagName('input');
        const type = document.getElementById('type').value;
        for(var i=0;i<abc.length;i++)
        {
            if(abc[i].value==="")
            {
                alert("marks can't be empty");
                return;
            }
        }
        const marks=[]
        if(this.state.marks_list.length===0)
        {
            for(var i=0;i<abc.length;i++)
            {
                marks.push({subject_id:this.state.subject_list[i].subject_id,marks:abc[i].value})
            }
        }
        else{
            for(var i=0;i<abc.length;i++)
            {
                marks.push({subject_id:this.state.marks_list[i].subject_id,marks:abc[i].value})
            }
        }
        console.log(marks);
        console.log(type);
        fetch(`${API_URL}/admin/results`,{
            method:"POST",
            headers:{
                Authorization:localStorage.getItem('token'),
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                id:this.state.std_id,
                class:this.state.class,
                marks:marks,
                type:type,
            })
        })
        .then(res=>res.json())
        .then(res=>{
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
            else if(res.status===200)
            {
                alert(res.message);
                window.location.reload();
            }
        })
        .catch(err=>console.log(err));

    }
    ShowResults=(id,name)=>{
        fetch(`${API_URL}/admin/results/${id}/${this.state.class}`,{
            method:"GET",
            headers:{
                Authorization:localStorage.getItem('token'),
                'Content-Type':'applicatino/json',
            },
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.status===401)
            {
                alert(res.status);
                localStorage.clear('token');
                localStorage.clear('role');
                localStorage.clear('profile');
                this.props.history.push('/');
            }
            else if(res.status===400)
            {
                alert(res.message);
            }
            else if(res.status===200)
            {
                this.setState({
                    stage:4,
                    marks_list:res.data,
                    std_id:id,
                    std_name:name,
                })
            }
        })
        .catch(err=>console.log(err));
    }
    render() {
        return (
            <div className="resultsContainer">
                {this.state.stage===1?
                <div>
                    
                        {this.state.classList.map((item,index)=>{
                            return (
                                <button key={index} onClick={()=>this.getStudents(item.class_id)}>{item.class_id}</button>
                            )
                        })}
                    
                </div>
                :(this.state.stage===2)?<div>
                    <table>
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Name</td>
                                <td>Date</td>
                                <td>Status</td>
                                <td>Show</td>
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
                                            <button className="btn-container" onClick={()=>this.gotoResults(item.id,item.name)}>Update Result</button>
                                        </td>
                                        <td>
                                            <button className="btn-container" onClick={()=>this.ShowResults(item.id,item.name)}>Show Result</button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                            
                        </tbody>
                    </table>
                    <div className="text-center">
                        <button className="btn-Container" onClick={()=>{this.setState({...this.state,stage:1,})}}>Back</button>
                    </div>
                </div>:(this.state.stage===3)?<div className="container">
                    <div className="d-flex row">
                            <div className="col-6">Name</div>
                            <div className="col-6">{this.state.std_name}</div>
                    </div>
                    <div className="d-flex row">
                            <div className="col-6">Id</div>
                            <div className="col-6">{this.state.std_id}</div>
                    </div>
                    <div className="d-flex row">
                            <div className="col-6">Class</div>
                            <div className="col-6">{this.state.class}</div>
                    </div>
                    <div className="d-flex row">
                            <div className="col-6">Type</div>
                            <div className="col-6">
                                <select id="type" >
                                    <option value="fa1">FA 1</option>
                                    <option value="fa2">FA 2</option>
                                    <option value="fa3">FA 3</option>
                                    <option value="fa4">FA 4</option>
                                    <option value="qa">quarterly</option>
                                    <option value="ha">Half Yeraly</option>
                                    <option value="final">Final</option>
                                </select>
                            </div>
                    </div>
                    <div className="m-3">
                        <table>
                            <thead>
                                <tr>
                                    <td>Subject Id</td>
                                    <td>Marks</td>
                                </tr>
                            </thead>
                            <tbody>
                        {(this.state.marks_list.length===0)?this.state.subject_list.map((item,index)=>{
                            
                            return (
                                <tr key={index}>
                                    <td>{item.subject_id}</td>
                                    <td><input type="number"></input></td>
                                </tr>
                            )
                        }):this.state.marks_list.map((item,index)=>{
                            return (
                                <tr key={index}>
                                    <td>{item.subject_id}</td>
                                    <td><input type="number"></input></td>
                                </tr>
                            )
                        })}
                        </tbody>
                        </table>
                    </div>
                    <div className="d-flex row justify-content-between">
                        <button className="btn-Container" onClick={()=>this.submitResults()}>Submit</button>
                        <button className="btn-Container" onClick={()=>{this.setState({...this.state,stage:2,})}}>Back</button>
                    </div>

                </div>:(this.state.stage===4)?<div>
                    <h3>{this.state.std_id}</h3>
                    <h3>{this.state.std_name}</h3>
                    <h3>{this.state.class}</h3>
                    <table className="mt-3">
                        <thead>
                            <tr>
                                <td> Subject Id</td>
                                <td> FA 1 </td>
                                <td> FA 2 </td>
                                <td> FA 3 </td>
                                <td> FA 4 </td>
                                <td> Quarterly </td>
                                <td> Half Yearly </td>
                                <td> Final </td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.marks_list.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{item.subject_id}</td>
                                        <td>{item.fa1}</td>
                                        <td>{item.fa2}</td>
                                        <td>{item.fa3}</td>
                                        <td>{item.fa4}</td>
                                        <td>{item.qa}</td>
                                        <td>{item.ha}</td>
                                        <td>{item.final}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="text-center">
                        <button className="btn-Container" onClick={()=>{this.setState({...this.state,stage:2,})}}>Back</button>
                    </div>
                </div>:null}
            </div>
        )
    }
}

export default withRouter(Results);
