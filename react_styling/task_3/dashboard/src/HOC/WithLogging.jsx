import React, { Component } from 'react';

const WithLogging = (WrappedComponent) => {
  // Extract the component name with proper fallback handling
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
  
  // Set displayName for React DevTools debugging
  WithLoggingHOC.displayName = `WithLogging(${wrappedComponentName})`;
  
  return WithLoggingHOC;
};

export default WithLogging;
