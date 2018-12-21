import React, { Component } from 'react';
import ObjList from './ObjList';
import UserObjList from './UserObjList';
import IncomeList from './IncomeList';
import UserIncomeList from './UserIncomeList';
import FormAdd from './FormAdd';
import FormIncomeAdd from './FormIncomeAdd';
import Auth from './Auth';

class App extends Component {
  constructor(props) {
  	super(props);

    this.state = {
    		view: 'ObjList', /*ObjList IncomeList FormAdd */
    		idObj: -1,
        dataObj: null,
        pas: localStorage.getItem('pas'),
    	}
      
  }

   render() {
  
   	switch(this.state.view) {
   		case 'ObjList' : 
   		{ 
        if(this.state.pas) {
   			
        return (<ObjList 
   				toIncomeList= { (id) => this.setState( {view: 'IncomeList', idObj:id }) } 
   				back={ () => this.setState({view: 'ObjList'}) }
          signIn= { () => this.setState({view: 'Auth'})} 
   				openForm = { (v) => this.setState({view: 'FormAdd', dataObj:v})}
          pas = { this.state.pas }
   				/>);
        
        } else {
        
        return (<UserObjList 
          toIncomeList= { (id) => this.setState( {view: 'IncomeList', idObj:id }) } 
          back={ () => this.setState({view: 'ObjList'}) }
          signIn= { () => this.setState({view: 'Auth'})} 
          pas = { this.state.pas }
          />);
        
        }
   		}
   		case  'IncomeList' : {
         if(this.state.pas) {
   			return (<IncomeList 
   				idObj= { this.state.idObj } 
   				back = { () => this.setState( {view:'ObjList'})} 
   				openForm = {(v)=> this.setState( {view:'FormIncomeAdd', dataObj:v })} 
          pas = { this.state.pas }
   			/> );
        } else {
        return (<UserIncomeList 
          idObj= { this.state.idObj } 
          back = { () => this.setState( {view:'ObjList'})} 
          pas = { this.state.pas }
        /> );
        }
   			
   		} case 'FormAdd': {
   			return (<FormAdd 
          back={ () => this.setState( {view:'ObjList'})} 
          data= { this.state.dataObj }
          pas = { this.state.pas }
          /> );
   		} case 'FormIncomeAdd': {
   			return (<FormIncomeAdd 
   				back={ () => this.setState( {view:'IncomeList'})} 
   				idObj = { this.state.idObj }
          data = { this.state.dataObj }
          pas = { this.state.pas }
   			/>)
   		}
        case 'Auth': {
          return (<Auth getPas={ (pas)=> this.setState( {pas: pas })} 
            back={ () => this.setState( {view:'ObjList'})}  />);
        }

        default: {
           return (<UserObjList 
          toIncomeList= { (id) => this.setState( {view: 'IncomeList', idObj:id }) } 
          back={ () => this.setState({view: 'ObjList'}) }
          signIn= { () => this.setState({view: 'Auth'})} 
          pas = { this.state.pas }
          />);
        }
   	}
    
  }
}

export default App;
