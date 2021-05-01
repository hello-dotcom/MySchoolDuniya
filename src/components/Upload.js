import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {API_URL} from '../config/config'
import FileSaver from 'file-saver';
// import path from 'path';
// const fs = require('fs');

class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			files: [],
			checker:false,
			pic:"",
		};
	}
	getImage=async(i)=>{
		var img = this.state.files[i].filename;
		const arrayBuf= await fetch(`${API_URL}/getfiles/${img}`,{
			method:"GET",
			headers:{
				"Content-Type":"application/json",
			}
		})
		// .then(res=>JSON.parse(JSON.stringify(res)))
		// .then(res=>{return res.text()})
		// .then(res=>{ return res.arrayBuffer();
		.then(res=>res.blob())
		.then(blob=>{
			FileSaver(blob,img);
		})
			// console.log(res)
				
			// this.setState({...this.state,
			// 				pic:JSON.parse(res),
			// 							checker:true,})
			
		// })
		.catch(err=>console.log(err));

		// const imgg = document.createElement( 'img' ); 
 
    	// imgg.src = URL.createObjectURL( new Blob( [ arrayBuf ], { type: 'image/jpeg' } ) ); 
		// imgg.width = 300;
		// imgg.height = 300;
		
		// document.getElementById('emoji').appendChild(imgg);

	}
	getAllFiles = () => {
		fetch(`${API_URL}/getfiles`, {
			method: 'GET',
			headers: {
				'Content-Type': 'Application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.files !== false) {
					// var div = document.createElement('div');
					console.log(res.files);
					this.setState({
						files:res.files,
					},()=>{
						// for(var i=0;i<this.state.files.length;i++)
						// {
							this.getImage(2);
						// }
					})
					// div.innerHTML = '';
					// 	console.log(res.files[file]);
					// 	div.innerHTML +=
					// 		'<span style="display:inline;"><img src="image/' +
					// 		res.files[file].filename +
					// 		'"></span>';
					// document.getElementById('emoji').appendChild(div);
					// this.setState({
					// 	files: res.files,
					// });
				}
			})
			.catch((err) => console.log(err));

			
	};
	render() {
		return (
			<div>
				<button onClick={() => this.getAllFiles()}>hai</button>
				<div id="emoji">

				</div>
				{this.state.checker===true?
				<img src={this.state.pic[0]} alt="hai"></img>:<h1>hai</h1>}
			</div>
		);
	}
}
export default withRouter(Upload);
