import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/login';
import { connect } from 'react-redux';
import { login } from '../../actions/login';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    }
  }
  
  isValid = () => {
    const { errors, isValid } = validateInput(this.state);
    
    if (!isValid) {
      this.setState({ errors });
    }
    
    return isValid; // <=== === === left off here 7min ep. #16
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        (res) => this.context.router.push('/'),
        (err) => this.setState({ errors: err.data.errors, isLoading: false })
      )
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value 
    });
  }
  
  render() {
    const { identifier, password, errors, isLoading } = this.state;
    
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        
        <TextFieldGroup 
          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          handleChange={this.handleChange} 
        />
        
        <TextFieldGroup 
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          handleChange={this.handleChange} 
          type="password"
        />
      
        <div className="form-group">
          <button disabled={isLoading} className="btn btn-lg btn-primary">Login</button>
        </div>
        
      </form>
    );
  }
}

LoginPage.propTypes = {
  login: React.PropTypes.func.isRequired
}

LoginPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginPage);