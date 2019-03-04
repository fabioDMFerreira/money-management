import React, { Component } from 'react';

type State = {
  value: string
}

export default (WrappedComponent: any) => class EditableInput extends Component<any, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value
      });
    }
  }

  change = (e: any) => {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    const { value } = this.state;

    return <WrappedComponent
    {...this.props}
      value={value}
      onChange={this.change}
    />
  }
}
