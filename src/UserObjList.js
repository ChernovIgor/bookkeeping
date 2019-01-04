import React, { Component } from 'react';
import axios from 'axios';
import './UserObjList.css';
import hostSetting from './host';
class UserObjList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dat: [],
		}

	}

 componentDidMount() {
  this.getContent();  
 }

 getContent() {
	  axios.get(hostSetting.host)
  .then( (response) => {

   	this.setState({ dat: response.data });
  });
}

openStatistic = () => {
	let stat = statistic(this.state.dat);
	let mesStat = 'Зп в месяц = ' + stat + 'руб';
	alert(mesStat);
}

render() {
  let link = null;
 	if(this.state.dat.length>0) { 
	 link = this.state.dat.map( (v) => 
	 	<tr key={v.id.toString()} onClick={ () =>  this.props.toIncomeList(v.id)   } >
	 	<td> 
	   {v.name} 
        	 <p className="m-0 p-0"><small>{v.dCreate}</small></p>
		</td>
		<td className="text-info font-weight-bold">
			<nobr>{v.price ? formPrice(v.price): '0'}</nobr>
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

  	    	<button onClick={this.openStatistic} className="btn btn-secondary col">Статистика</button>
        {outh}
  		</div>
  		<table className="table table-hover">
  		<thead>
  			<tr> 
  				<th>Объект</th>
  				<th data-toggle="tooltip" data-placement="bottom" title="Все траты по квартире">
            Доход (руб.)
          </th>
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
export default UserObjList;

function statistic(data) {
  let zp = 0;
  let ar = [];
  let betDate;
  let endDate = new Date();;
  let dif; //количество дней с начала заработка
  let sum = 0; //сумма дохода с квартир
  let j = 0;
  for (let i=0; i< data.length; i++) {
  	if (parseInt(data[i].price) < 0) {
  		ar[j] = new Date(data[i].dCreate);
  		sum += parseInt(data[i].price) * (-1);
  		j++;
  	}
  }
   betDate = Math.min.apply(null, ar);
  
   dif = (endDate-betDate)/(1000 * 60 * 60 * 24);//количество дней 
   zp = Math.round(sum * 30 / dif);
  return zp;
}

function formPrice(price) {
    
  let pr = (Number(price) * (-1)).toString();
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

