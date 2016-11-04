import React from 'react';
import timezones from '../../data/timezones'
import map from 'lodash/map'; 

class SignupForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email:'',
            password:'',
            passwordConfirmation:'',
            timeZone:''
        } 

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
        //console.log(e);
    }

    onSubmit(e){
        e.preventDefault();
        console.log(this.state);
    }

    render () {
        const options = map(timezones, (val, key)=>
        <option key={val} value={val}>{key}</option>);
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Join our community!</h3>
                <div className='form-group'>
                    <label className="control-label">Username</label>
                    <input
                        value = {this.state.username} 
                        onChange = {this.onChange}
                        type = 'text'
                        name = 'username'
                        className = 'form-control'
                    />
                </div>
                <div className='form-group'>
                    <label className="control-label">Email</label>
                    <input
                        value = {this.state.email} 
                        onChange = {this.onChange}
                        type = 'text'
                        name = 'email'
                        className = 'form-control'
                    />
                </div>
                <div className='form-group'>
                    <label className="control-label">Password</label>
                    <input
                        value = {this.state.password} 
                        onChange = {this.onChange}
                        type = 'password'
                        name = 'password'
                        className = 'form-control'
                    />
                </div>
                <div className='form-group'>
                    <label className="control-label">Password Confirmation</label>
                    <input
                        value = {this.state.passwordConfirmation} 
                        onChange = {this.onChange}
                        type = 'password'
                        name = 'passwordConfirmation'
                        className = 'form-control'
                    />
                </div>
                <div className='form-group'>
                    <label className="control-label">Timezone</label>
                    <select
                        id = 'UpdatedSelect'
                        value = {this.state.timeZone} 
                        onChange = {this.onChange}
                        name = 'timeZone'
                        className = 'form-control'
                    >
                        <option value = "" disabled>Choose your time zone</option>
                        {options}
                    </select>
                </div>
                <div className='form-group'>
                    <button className='btn btn-primary btn-lg'>
                    Signup
                    </button>
                </div>
            </form>
        );
    }
}

export default SignupForm;