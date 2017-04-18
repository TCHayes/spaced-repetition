import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class App extends React.Component {

    componentDidMount() {
        this.props.dispatch(actions.fetchUser());
    }

    render() {
        return (
          <div>
            {this.props.children}
          </div>
        );
    }
}

export default connect()(App);
