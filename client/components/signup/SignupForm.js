import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email:  '',
      password: '',
      passwordConfirmation: '',
      timezone: ''
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  }
  
  render() {
    const options = map(timezones, (val, key) => {
      return <option key={val} value={val}>{key}</option>
    });
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Join our community!</h1>
        
        <div className="form-group">
          <label className="control-label">Username</label>
          <input 
            onChange={this.handleChange}
            value={this.state.username}
            type="text"
            name="username"
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label className="control-label">Email</label>
          <input 
            onChange={this.handleChange}
            value={this.state.email}
            type="text"
            name="email"
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label className="control-label">Password</label>
          <input 
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            name="password"
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label className="control-label">Password Confirmation</label>
          <input 
            onChange={this.handleChange}
            value={this.state.passwordConfirmation}
            type="password"
            name="passwordConfirmation"
            className="form-control"
          />
        </div>
    
        <div className="form-group">
          <label className="control-label">Timezone</label>
          <select 
            onChange={this.handleChange}
            value={this.state.timezone}
            name="timezone"
            className="form-control"
          >
            <option value="">Choose Your Timezone</option>
            {options}
        </select>
        </div>
        
        <div className="form-group">
          <button className="btn btn-primary btn-lg">
            Signup
          </button>
        </div>
        
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;