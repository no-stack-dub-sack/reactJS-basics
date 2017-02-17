import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setCurrentUser, logout } from '../actions/authActions';
import { addFlashMessage, deleteFlashMessage, clearFlashMessage } from '../actions/flashMessages';

class NavigationBar extends React.Component {
  
  logout = (e) => {
    e.preventDefault();
    this.props.logout();
    this.props.addFlashMessage({
      type: 'success',
      text: 'You have successfully logged out. Come back soon!'
    });
    setTimeout( _ => {
      this.props.state.flashMessages.forEach(message => {
        if (message.text !== 'You have successfully logged out. Come back soon!') {
          this.props.deleteFlashMessage(message.id);
        }
      });
    }, 500)
  }
  
  clearMessages = () => {
    this.props.clearFlashMessage();
  }
  
  render() {
    const { isAuthenticated } = this.props.state.auth;
    
    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup" onClick={this.clearMessages}>Sign Up</Link></li>
        <li><Link to="/login" onClick={this.clearMessages}>Login</Link></li>
      </ul>
    )
    
    const userLinks = (
      <div className="nav navbar-nav navbar-right">
        <li><Link to="/" onClick={this.logout}>Logout</Link></li>
      </div>
    )
    
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">That ill shit son</Link>
          </div>
          
          <div className="collapse navbar-collapse">
            { isAuthenticated ? userLinks : guestLinks }
          </div>
          
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  state: React.PropTypes.object.isRequired
}

function mapStateToProps(state) { 
  return {
    state
  } 
}

export default connect(mapStateToProps, { 
  setCurrentUser, 
  addFlashMessage, 
  deleteFlashMessage, 
  clearFlashMessage, 
  logout 
})(NavigationBar);