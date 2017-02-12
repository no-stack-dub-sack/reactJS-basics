import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';

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
  
  isValid = () => {
    const { errors, isValid } = validateInput(this.state);
    if(!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    if(this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.context.router.push('/');
        },
        ({ data }) => this.setState({ errors: data, isLoading: false })
      );
    }
  }
  
  render() {
    const { errors } = this.state;
    const options = map(timezones, (val, key) => {
      return <option key={val} value={val}>{key}</option>
    });
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Join our community!</h1>
        
        <TextFieldGroup 
          field="username"
          label="Username"
          value={this.state.username}
          error={errors.username}
          onChange={this.handleChange}
        />
        
        <TextFieldGroup 
          field="email"
          label="Email"
          value={this.state.email}
          error={errors.email}
          onChange={this.handleChange}
        />
        
        <TextFieldGroup 
          field="password"
          label="Password"
          value={this.state.password}
          error={errors.password}
          onChange={this.handleChange}
          type="password"
        />
          
        <TextFieldGroup 
          field="passwordConfirmation"
          label="Password Confirmation"
          value={this.state.passwordConfirmation}
          error={errors.passwordConfirmation}
          onChange={this.handleChange}
          type="password"
        />

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

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignupForm;