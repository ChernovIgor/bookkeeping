import React, { Component } from 'react';
import axios from 'axios';
import './IncomeList.css';
import hostSetting from './host';
class UserIncomeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dat: [],
			sum: 0,
      expens: 0,
		}
	}
 

componentDidMount() {
  this.getContent();
  
 }

getContent= () => {
    let idObj = this.props.idObj;

   axios.get(hostSetting.host + 'expenses.php', 
    { params: { id : idObj.toString()} })
  .then((response) => {
   
    this.setState({
      dat: response.data, 
      sum: summa(response.data),
      expens: separator(response.data),
    });   
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}
 	render() {
 		
 	let link = null;
 		if(this.state.dat) { 
	 		link = this.state.dat.map( (v) => 
	 		<tr key={v.id.toString()}> 
				<td>
          {v.name}
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
      </div>
     
	  		<table className="table table-hover m-0">
  			<thead>
           <tr>
              <th>Расходы</th>
              <th>{this.state.expens && this.state.expens.toString()} </th>
          </tr>
          <tr>
              <th>Итого</th>
              <th>{this.state.sum && this.state.sum.toString()}</th>
          </tr>
          <tr>
              <th>Назвавание расхода</th>
              <th>Руб</th>
          </tr>
  			</thead>
  			<tbody>
      			{link}
    		</tbody>
    		<tfoot>
         
    		</tfoot>
		</table>

    </div>
 		);
 	}
}

export default UserIncomeList;

/*
 Работает правильно если будет только один доход 
 (продажа квартиры) 
*/
function separator(data) {
  let aPrice =[]; 
  let purchasePrice;
  let expens; //расходы на содержание и ремонт квартиры
  let sum = 0;
  let j=0;
   for (let i=0; i < data.length; i++) {
      let a = parseInt(data[i].price);
      if(a > 0) { 
        aPrice[j] = a; 
        sum += a; 
        j++; 
      } 
  }
  // почти всегда самый максимальный расход - это цена покупки квартиры
  purchasePrice = Math.max.apply(null, aPrice);
  expens = sum - purchasePrice;
  return expens;
}

function summa(data) {
    let sum = 0;
     for(let i = 0; i < data.length; i++) {
      sum += Number(data[i].price);    
   }
   return sum;
}