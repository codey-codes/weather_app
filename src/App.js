import React, { Component, Fragment } from 'react';
import Background from './containers/Background/Background';
import Application from './containers/Application/Application';

class App extends Component {
  state = {
    currentCondition: 'default'
  }

  backgroundChangeHandler = condition => {
    this.setState({ currentCondition: condition })
  }

  render() {
    return (
      <Fragment>
          <Background condition={this.state.currentCondition} />
          <Application backgroundChanged={term => this.backgroundChangeHandler(term)}/>
      </Fragment>
    );
  }
};

export default App;