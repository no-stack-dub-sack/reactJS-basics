import React from 'react';
import { connect } from 'react-redux';
import { createEvent } from '../../actions/eventActions';
import TextFieldGroup from '../common/TextFieldGroup';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      errors: {},
      isLoading: false
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createEvent(this.state);
  }
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  render() {
    const { title, errors, isLoading } = this.state;
    
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Create New Game Event</h1>
        
        <TextFieldGroup 
          label="Event Title"
          value={title}
          field="title"
          error={errors.title}
          handleChange={this.handleChange}
        />
      
      <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

EventForm.propTypes = {
  createEvent: React.PropTypes.func.isRequired
}

export default connect(null, { createEvent })(EventForm);