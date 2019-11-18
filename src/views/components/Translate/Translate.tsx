import React, { Fragment } from 'react';
import { Translate } from 'react-localize-redux';

interface Props {
	id: string
};

export default ({ id }: Props) => {
	return (
		<Fragment>
			{
				id
					.split(' ')
					.map(keyword => <span><Translate key={keyword + Math.random()} id={keyword} /> </span>)
			}
		</Fragment>
	);
}

