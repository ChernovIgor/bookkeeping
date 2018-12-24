import React, { Component } from 'react';
import axios from 'axios';
import './IncomeList.css';
import hostSetting from './host';
class IncomeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dat: [],
			sum: 0,

		}
	}

componentDidMount() {
  this.getContent();
  console.log(this.props.pas);
 }

getContent= () => {
    let idObj = this.props.idObj;

   axios.get(hostSetting.host +'expenses.php', 
    { params: { id : idObj.toString()} })
  .then((response) => {
   let sum = 0;
  
   for(var i = 0; i < response.data.length; i++) {
      sum += Number(response.data[i].price);    
   }
   this.setState({dat: response.data, sum: sum});   
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}
formEdit = (a) => {
  //после получения параментра нужно открыть форму ввода и заполнить туда те параметры
  console.log(a);
}

 del = (id) => {
  axios.delete(hostSetting.host + 'incomeDel.php', {
    params: { id : id, pas: this.props.pas } 
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
 		if(this.state.dat) { 
	 		link = this.state.dat.map( (v) => 
	 		<tr key={v.id.toString()}> 
				<td> 
          {v.name}
          <button className="btn ml-2 icon" onClick={ ()=> this.props.openForm(v)}> 
            <i className="fas fa-pen text-warning"></i>
          </button> 
          <button className="btn ml-2 icon" onClick={ ()=> this.del(v.id)} >
          <i className="fas fa-trash-alt text-danger"></i>
        </button> 
         <p className="m-0 p-0"><small>{v.dCreate}</small></p>
        </td>
				<td> {v.price} </td> 
			</tr>)
    }
		 
 		return (
 		<div className="viewList"> 
 		  <div className="row mx-0 ">
        <button className=" col btn btn-secondary" 
          onClick={this.props.back}>
          <i className="fa fa-undo"></i>
        </button>
        <button className="col btn btn-primary" 
          onClick={()=> this.props.openForm(null)}> 
          <i className="fas fa-plus"></i>
        </button>
        
      </div>
     
	  		<table className="table table-hover m-0">
  			<thead>
    			<tr>
      				<th>Назвавание расхода</th>
      				<th>Руб</th>
    			</tr>
  			</thead>
  			<tbody>
      			{link}
    		</tbody>
    		<tfoot>
    			<tr>
      				<th>Итого</th>
      				<th>{this.state.sum && this.state.sum.toString()}</th>
    			</tr>
    		</tfoot>
		</table>

    </div>
 		);
 	}
}

export default IncomeList;