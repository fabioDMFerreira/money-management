import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

import { TagType } from '../TagType';
import { deleteTag, updateTag } from '../state/FinancialForecastActions';
import TagItem from './TagItem';

type Props = {
  tags: TagType[],
  deleteTag: (tag: TagType) => any
  updateTag: (tag: TagType, newTag: TagType) => any
}

const Settings = (props: Props) =>
  <Fragment>
    <h3>Tags</h3>
    <ListGroup>
      <Row>
        {
          props.tags && props.tags.map((tag: TagType) => <Col xs="4" key={tag.label}>
            <ListGroupItem>
              <TagItem tag={tag} deleteTag={props.deleteTag} updateTag={props.updateTag} />
            </ListGroupItem>
          </Col>)
        }
      </Row>

    </ListGroup>
  </Fragment>

export default connect(
  (state: any) => {
    const { financialForecast: { tags } } = state;

    return {
      tags: tags && tags.toJS()
    }
  }, {
    deleteTag,
    updateTag
  }
)(Settings);
