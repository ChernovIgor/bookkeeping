import React, { Component } from 'react';
import axios from 'axios';
import './Form.css';
import hostSetting from './host';
class FormIncomeAdd extends Component {
	constructor(props) {
    let name = '';
    let price = '';
    let date = formatDate(new Date());

    
      super(props);
      if(props.data) {
        name = props.data.name;
        price = props.data.price;
        date = props.data.dCreate;
      }
      this.state = {
      	inpName: name,
      	inpPrice: price,
        inpDate: date,
      }


    }

handleUserInput = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({[name]: value});
}
 
addOrUp = () => {
  if(this.props.data) {
    this.uppdateOjb();
  } else {
    this.addObj();
  }
}

addObj = () => {
   axios.post(hostSetting.host + 'incomeAdd.php', {
  		name: this.state.inpName,
  		price: this.state.inpPrice,
  		idObj: this.props.idObj,
      pas: this.props.pas,
      date: this.state.inpDate,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

uppdateOjb = () => {

     axios.put(hostSetting.host +'incomeUp.php', {
      id: this.props.data.id,
      name: this.state.inpName,
      price: this.state.inpPrice,
      pas: this.props.pas,
      date: this.state.inpDate,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
	render() {
	return(
		<div>
		<div className="f px-2">
      <div className="form-group">
  			<label> Расход (или доход со знаком "-"): </label>
    		<input className="form-control" 
          name="inpName" value={this.state.inpName}  
          onChange={this.handleUserInput} type="text" />
  	  </div>
  	  <div className="form-group">
  			<label> Стоимость расхода:</label>
    		<input 
          className="form-control" 
          name="inpPrice"
          value={this.state.inpPrice} 
          onChange={this.handleUserInput } type="number" />
  		</div>
      <div className="form-group">
        <input className="form-control" 
            value={this.state.inpDate} type="date" name="inpDate"  
            onChange={this.handleUserInput} />
      </div>
      <div className="from-group form-row mx-0">  
        <button className="btn btn-primary col" onClick={() => {this.addOrUp(); this.props.back();}}>Ввести</button>
        <button className="btn btn-secondary col" onClick={this.props.back}>Назад</button>
      </div> 
  	  				
		</div>
		</div>
	);
	}
}

export default FormIncomeAdd;

function formatDate(date) {
  let s = date.getFullYear().toString()+
  '-'+ (date.getMonth() + 1).toString() +
  '-'+ date.getDate().toString(); 
  return s;
}