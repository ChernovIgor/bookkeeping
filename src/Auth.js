import React, { Component } from 'react';
import './Auth.css';



class Auth extends Component {
 constructor(props) {
 	super(props);
 	this.state= {
 		inp : '',
 	}
 }

handleChange = (event) => {
	this.setState({ inp : event.target.value });
}

savePas = () => {

	localStorage.setItem('pas', this.state.inp );
	this.props.getPas(this.state.inp);
	this.props.back();
}

clear = () => {
	localStorage.removeItem('pas');
	this.props.getPas(null);
	this.props.back();
}
	render() {
		return (
			<div>
			<div className="f">
				<div className="form-group">
					<label>Пароль</label>
					<input className="form-control" onChange={this.handleChange} type="password" />
				</div>
				<button className="btn btn-primary" onClick={this.savePas}>Войти </button>
				<button className="btn btn-warning" onClick={this.clear}>Выйти </button>
			</div>
			</div>
		);
	}
}
export default Auth;