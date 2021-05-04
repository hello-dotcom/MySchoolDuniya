import {Component} from 'react';
import {withRouter} from 'react-router-dom';
import '../styles/leave.css'
import {API_URL} from '../config/config';
class Leave extends Component{
 
  constructor(props){
    super(props);
    this.state={
        id:JSON.parse(localStorage.getItem('profile')).id,
        reason:"",
        opt:"A",
        date_of_start:"",
        date_of_return:"",  
        leavelist:[],      
        }
    }
    getAllLeaves=()=>{
        fetch(`${API_URL}/student/sleave/${this.state.id}`,{
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
                alert(res.message);
                this.setState({
                    leavelist:res.data,
                })
            }
        })
        .catch(err=>console.log(err));
        return ;
    }


    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value,
        },()=>{
           
            if(this.state.opt==="B")
            {
                this.getAllLeaves();
            }
        })
    }
    applyLeave= async()=>{
        if(this.state.date_of_start.trim()==="" || this.state.date_of_return===""||this.state.reason.trim()==="")
        {
            alert("Fields can't be empty");
            return;
        }
        else 
        {
             const idp= await JSON.parse(localStorage.getItem('profile')).id;
            fetch(`${API_URL}/student/sleave`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    Authorization:localStorage.getItem('token'),
                },
                body:JSON.stringify({
                    id:idp,
                    reason:this.state.reason,
                    date_of_start:this.state.date_of_start,
                    date_of_return:this.state.date_of_return,
                }),
            })
            .then(res=>{console.log(res); return res.json()})
            .then(res=>{
                if(res.status===401)
                {
                    alert(res.message);
                    localStorage.clear('token');
                    localStorage.clear('as');
                    localStorage.clear('profile')
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
    }
  
    render(){
        return (
            <div>
              {/* <form> */}
                    <div className="container">
                        <center><h2>Leave Application form</h2></center>
                        <center> 
                            <label className="item_heading" for="A">&#9960;</label>
                            <input type="radio" id="A" name="opt" value="A" onChange={this.handleChange}></input>
                            <label className="item_heading" for="B">&#9745;</label>
                            <input type="radio" id="B" name="opt" value="B" onChange={this.handleChange}></input>
                        </center> 
                        {(this.state.opt==='A')?
                        <div>
                            <div className="row m-3">
                                <div className="col-6">
                                    <label>Date of Start :</label>
                                </div>
                                <div className="col-6">
                                    <input type="date" id="date_of_start" name="date_of_start" value={this.state.date_of_start}
                                            onChange={this.handleChange}></input>
                                </div>
                            </div>
                            <div className="row m-3">
                                <div className="col-6">
                                    <label>Date of Return :</label>
                                </div>
                                <div className="col-6">
                                    <input type="date" id="date_of_return" name="date_of_return" value={this.state.date_of_return}
                                            onChange={this.handleChange}></input>
                                </div>
                            </div>
                            <div className="row m-3">
                                <div className="col-6">
                                    <label className="mt-3">Reason :</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" id="reason" name="reason" value={this.state.reason} onChange={this.handleChange}></input>
                                </div>
                            </div>
                            <center>
                                <button onClick={()=>this.applyLeave()}>Apply</button>
                            </center>
                        </div>
                           :
                           <div>
                               <table>
                                   <thead>
                                       <tr>
                                            <th>Date of Start</th>
                                            <th>Date of Return</th>
                                            <th>Reason</th>
                                            <th>Status</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                       {this.state.leavelist.map((item,index)=>{
                                           return(
                                               <tr key={index}>
                                                   <td>{item.date_of_start.substr(0,10)}</td>
                                                   <td>{item.date_of_return.substr(0,10)}</td>
                                                   <td>{item.reason}</td>
                                                   <td>{item.status}</td>
                                               </tr>
                                           )
                                       })}
                                   </tbody>
                                
                               </table>
                           </div>
                           }
                    </div>
                {/* </form> */}
            </div>
        )
    }
}
export default withRouter(Leave);