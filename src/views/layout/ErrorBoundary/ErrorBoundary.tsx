import React from 'react';
import * as Sentry from '@sentry/browser';

if(process.env.REACT_APP_SENTRY){
  Sentry.init({dsn: process.env.REACT_APP_SENTRY});
}

interface Props {
  [key: string]: any
}

interface State {
  error: any,
  errorInfo: any
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="mt-4">
          <h2>Something went wrong.</h2>
          <p>We are looking into the issue and we will fix it soon. Thanks for using this application.</p>
          {/* <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details> */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
