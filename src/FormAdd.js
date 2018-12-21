import React, { Component } from 'react';

import axios from 'axios';
import './Form.css';

class FormAdd extends Component {
	constructor(props) {
    
  
		let name = '';
		if(props.data) { 
			name=props.data.name
		}
      super(props);
      this.state = {
      inpObj: name,
      inpDate: formatDate(new Date()),
    	}
     console.log(props.data);	 
    }


handleChange = (event) => {
	this.setState({ inpObj : event.target.value });
}

handleChange1 = (event) => {
  this.setState({inpDate: event.target.value });
}

addOrUp = () => {
  if(this.props.data) {
    this.uppdateOjb();
  } else {
    this.addObj();
  }
}

uppdateOjb = () => {
 axios.put('http:' + '/' + '/localhost/bookkeeping/update.php', {
   name: this.state.inpObj,
   id: this.props.data.id,
   pas: this.props.pas,
 }).
 then( response => {
  console.log(response);
 }).
 catch( error => {
  console.log(error);
 });
}


addObj = () => {	
	axios.post('http:' + '/' +'/localhost/bookkeeping/add.php', {
  		name: this.state.inpObj,
      pas: this.props.pas,
      date: this.state.inpDate,
  })
  .then( response => {
    console.log(response);
  })
  .catch( error => {
    console.log(error);
  });
}

	render() {
	return(
		<div className="f">
		<div>
		 <div className="form-group">
			<label htmlFor="inp">Объект:</label>
    		<input className="form-control" id="inp" value={this.state.inpObj} type="text" placeholder="Островского, 6" 
    			onChange={this.handleChange}  
    		/> 
  		 </div>
        <div className="form-group">
          <input className="form-control" 
            value={this.state.inpDate} type="date"  
            onChange={this.handleChange1}
          />
        </div>
  		   	<div className="form-group form-row">
  		   		<button type="button" className="btn btn-primary col"
  		   		  onClick={ () => {this.addOrUp(); this.props.back();}}> Ввести
            </button>
				    <button type="button" className="btn btn-secondary col" 
              onClick={this.props.back}>Назад
            </button>
			    </div>
          
		</div>
		</div>
		);
	}
}
export default FormAdd;

function formatDate(date) {
  let s = date.getFullYear().toString()+
  '-'+ (date.getMonth() + 1).toString() +
  '-'+ date.getDate().toString(); 
  return s;
}