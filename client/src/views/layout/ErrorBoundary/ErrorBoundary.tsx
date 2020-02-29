import * as Sentry from '@sentry/browser';
import React, { Component } from 'react';


if (process.env.REACT_APP_SENTRY) {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY });
}

interface Props {
  [key: string]: any;
}

interface State {
  errorInfo: any;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      errorInfo,
    });
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
