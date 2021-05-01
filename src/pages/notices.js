import React from 'react';
import {API_URL} from '../config/config'
const Notices = () => {
	var ans=[]
	fetch(`${API_URL}/admin/notice`,{
		method:"GET",
		headers:{'Content-Type':'application/json'},
	})
	.then(res=>res.json())
	.then(res=>
		{
			for(var i=0;i<res.data.length;i++)
			{
				const divele = document.createElement('div');
				divele.className="bg-secondary p-3 m-2";
				const h1ele=document.createElement('h1');
				h1ele.innerHTML = res.data[i].heading;
				divele.appendChild(h1ele);
				const h3ele = document.createElement('h3');
				h3ele.innerHTML=res.data[i].message;
				divele.appendChild(h3ele);
				document.getElementById('notice_board').appendChild(divele);
			}
		})
	.catch(err=>console.log(err));
	return (
		<div
			// style={{
			// 	display: 'flex',
			// 	justifyContent: 'Right',
			// 	alignItems: 'Right',
			// 	// height: '100vh',
			// }}
		>
			<h1>E - Notice Board (get updated with latest news at school)... </h1>
			
			<div id="notice_board">
				
			</div>
		</div>
	);
};

export default Notices;
