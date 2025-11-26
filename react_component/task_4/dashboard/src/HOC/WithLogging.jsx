import React, { Component } from 'react';

const WithLogging = (WrappedComponent) => {
  const wrappedComponentName = WrappedComponent.displayName 
    || WrappedComponent.name 
    || 'Component';

  class WithLoggingHOC extends Component {
    componentDidMount() {
      console.log(`Component ${wrappedComponentName} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${wrappedComponentName} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  
  WithLoggingHOC.displayName = `WithLogging(${wrappedComponentName})`;
  
  return WithLoggingHOC;
};

export default WithLogging;
