import React, { Component } from 'react';
import Input from 'reactstrap/lib/Input';

type Props = {
  onChange: (e: any) => void,
  value: string,
}

type State = {
  value: string,
}

export default class DateInput extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value
      });
    }
  }

  onChange = (e: any) => {
    const value = e.target.value;


    if (!value || !/[1-2][0-9]{3}-[0-9]{2}-[0-9]{2}/.exec(value)) {
      return this.setState({
        value
      });
    }

    return this.props.onChange(e);
  }

  render() {
    const { value } = this.state;

    return <Input
      type={'date'}
      value={value}
      onChange={this.onChange}
    />
  }
}
