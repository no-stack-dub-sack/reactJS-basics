import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import fields from './fieldsObject';
import { connect } from 'react-redux';
import { doesUserExist } from '../../actions/signupActions';
import isEmpty from 'lodash/isEmpty';

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
      isLoading: false,
      invalid: false
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleCheckUserExists = (e) => {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.doesUserExist(val).then(res => {
        let errors = this.state.errors;
        if (res.data.user) {
          errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
        } else {
          delete errors[field];
        }
        this.setState({ errors, invalid: !isEmpty(errors) });
      });
    }
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
          this.props.addFlashMessage({
            type: 'success',
            text: 'You have signed up successfully. Welcome!'
          });
          this.context.router.push('/');
        },
        ({ data }) => this.setState({ errors: data, isLoading: false })
      );
    }
  }
  
  render() {
    const { errors } = this.state;
    const inputs = fields.map(fieldObj => {
      if (fieldObj.field === 'username' || fieldObj.field === 'email' ) {
        return (
          <TextFieldGroup 
            key={fieldObj.field}
            field={fieldObj.field}
            label={fieldObj.label}
            value={this.state[fieldObj.field]}
            error={errors[fieldObj.field]}
            type={fieldObj.type}
            handleChange={this.handleChange}
            checkUserExists={this.handleCheckUserExists}
          />
      );
      } else {
        return (
          <TextFieldGroup 
            key={fieldObj.field}
            field={fieldObj.field}
            label={fieldObj.label}
            value={this.state[fieldObj.field]}
            error={errors[fieldObj.field]}
            type={fieldObj.type}
            handleChange={this.handleChange}
          />
        );
      }
    }
      
    );
    const options = map(timezones, (val, key) => 
      <option key={val} value={val}>{key}</option>
    );
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
          <button disabled={this.state.isLoading || this.state.invalid} title={classnames({'Please resolve errors' : this.state.invalid})} className="btn btn-primary btn-lg">
            Signup
          </button>
        </div>
        
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  doesUserExist: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { doesUserExist })(SignupForm);