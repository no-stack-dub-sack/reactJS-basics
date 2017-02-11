import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email:  '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.userSignupRequest(this.state).then(
      () => {},
      ({ data }) => this.setState({ errors: data, isLoading: false })
    );
  }
  
  render() {
    const { errors } = this.state;
    const fields = ['username', 'email', 'password', 'password Confirmation'];
    const inputs = fields.map(field => {
      return (
        <div 
          key={field} 
          className={classnames('form-group', {'has-error' : errors[field.replace(' ', '')]})}>
          <label className="control-label">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input 
            onChange={this.handleChange}
            value={this.state[field.replace(' ', '')]}
            type="text"
            name={field.replace(' ', '')}
            className="form-control"
          />
          {
            errors[field.replace(' ', '')] && 
            <span className="help-block">{errors[field.replace(' ', '')]}</span>
          } 
        </div>
      ); 
    })
    const options = map(timezones, (val, key) => {
      return <option key={val} value={val}>{key}</option>
    });
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Join our community!</h1>
        
        {inputs}
        
        <div className={classnames('form-group', {'has-error' : errors.timezone})}>
          <label className="control-label">Timezone</label>
          <select 
            onChange={this.handleChange}
            value={this.state.timezone}
            name="timezone"
            className="form-control">
            <option value="">Choose Your Timezone</option>
            {options}
          </select>
          {errors.timezone && <span className="help-block">{errors.timezone}</span>}
        </div>
        
        <div className="form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
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