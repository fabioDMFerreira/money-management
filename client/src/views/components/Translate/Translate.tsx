import React, { Fragment } from 'react';
import { Translate } from 'react-localize-redux';

interface Props {
  id: string;
}

export default ({ id }: Props) => (
  <Fragment>
    {
      id
        .split(' ')
        .map(keyword => <span key={keyword + Math.random()}><Translate id={keyword} /> </span>)
    }
  </Fragment>
);

