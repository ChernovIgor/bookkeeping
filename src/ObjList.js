import React, { Component } from 'react';
import axios from 'axios';
import './ObjList.css';

class ObjList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dat: [],
		}

	}


 componentDidMount() {
  this.getContent();
  console.log(this.props);
 }

 getContent() {
	  axios.get('http:' + '/' +'/localhost/bookkeeping/')
  .then( (response) => {
   	this.setState({ dat: response.data });
  });
}

 del = (id) => {
  axios.delete('http:' + '/' +'/localhost/bookkeeping/objDel.php', {
    params: { id : id, pas: this.props.pas} 
  })
  .then( (response) => {
    console.log(response);
    this.getContent();
     
  })
  .catch(function (error) {
    console.log(error);
  });

 } 

render() {
  let link = null;
 	if(this.state.dat.length>0) { 
	 link = this.state.dat.map( (v) => 
	 	<tr  key={v.id.toString()} >
	 	<td> 
			<button className="btn" onClick={ () => { this.props.toIncomeList(v.id);  } }>{v.name}</button>
			<button className="btn ml-2 icon" onClick={ ()=> this.props.openForm(v)}> 
            	<i className="fas fa-pen text-warning"></i>
         	</button> 
          	<button className="btn ml-2 icon" onClick={ ()=> this.del(v.id)} >
          		<i className="fas fa-trash-alt text-danger"></i>
        	</button> 
        	 <p className="m-0 p-0"><small>{v.dCreate}</small></p>
		</td>
		<td className="text-info font-weight-bold">
			{v.price ? formPrice(v.price): '0'} р
		</td>
		</tr>  );
} 
  let outh;
 if(this.props.pas) {
    outh = <button className="btn col btn-success" onClick={this.props.signIn}><i className="fas fa-sign-in-alt"></i></button>
 } else {
     outh = <button className="btn col btn-warning" onClick={this.props.signIn}><i className="fas fa-sign-in-alt"></i></button>
 }

  return(
  	   <div className="viewList">
  	    <div className="form-row">
  	    	<button 
            onClick={() => { this.props.openForm(null) }} 
            className="col btn btn-primary"> 
            <i className="fas fa-plus"></i>
          </button>
  			<button className="btn col">Статистика</button>
        {outh}
  		</div>
  		<table className="table table-hover">
  		<thead>
  			<tr> 
  				<th>Объект</th>
  				<th>Доход</th>
  			</tr>
  		</thead>
  		<tbody>
			{link}	
		</tbody>
		</table>
		</div> 
  	);
} 

}
export default ObjList;

function formPrice(price) {
   
  let pr = (price * (-1)).toString();
 	let n = "";
	for(let i=0; i<pr.length; i++) {
		if((pr.length-1-i)%3===0) {
			n +=  pr[i] + " ";
		} else {
			n += pr[i];
		}
	}
	
     return n;
}