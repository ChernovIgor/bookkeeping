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
//что делать
separeCreate(lastdCreate, currentdCreate) {
  if(lastdCreate==currentdCreate) {
    return true;
  } else {
    return false;
  }
}
 	render() {
 		
 	let link = null;
  let lastdCreate = null;
 		if(this.state.dat) { 
	 		link = this.state.dat.map( (v) => 
	 		<tr key={v.id.toString()} > 
				<td>
          {v.name} 
         <p className="m-0 p-0"><small>{v.dCreate}</small></p>
        </td>
				<td> {formPrice(v.price)} </td> 
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
           <tr className="table-primary">
              <th data-toggle="tooltip" data-placement="bottom" title="Без учета трат на покупку квартиры">Расходы</th>
              <th>{this.state.expens && formPrice(this.state.expens)} </th>
          </tr>
          <tr className="table-danger">
              <th data-toggle="tooltip" data-placement="bottom" title="С учетом трат на покупку квартиры">Итого</th>
              <th>{this.state.sum && formPrice(this.state.sum)}</th>
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

function formPrice(price) {
   
  let pr = Number(price).toString();
  let n = "";
  for(let i = 0; i<pr.length; i++) {
    if ((pr.length-1-i)%3===0) {
      n +=  pr[i] + " ";
    } else {
      n += pr[i];
    }
  }
  return n;
}

/*


}*/