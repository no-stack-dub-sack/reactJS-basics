import React from 'react';
import NavigationBar from "./NavigationBar";

class App extends React.Component {
    render(){
        return (
            <div className = "container">
                <NavigationBar />
                {this.props.children}
            </div>
            // <h1>Hello World from react - hot reload</h1>
        );
    }
}

export default App;