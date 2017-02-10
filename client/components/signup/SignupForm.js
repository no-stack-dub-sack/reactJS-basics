import React from 'react';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  render() {
    return (
      <form>
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
          <button className="btn btn-primary btn-lg">
            Signup
          </button>
        </div>
        
      </form>
    );
  }
}

export default SignupForm;