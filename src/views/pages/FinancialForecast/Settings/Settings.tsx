import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

import { Tag } from 'models/ITag';
import { deleteTag, updateTag } from 'redux/ducks/financial-forecast/actions';
import TagItem from './TagItem';

type Props = {
  tags: Tag[],
  deleteTag: (tag: Tag) => any
  updateTag: (tag: Tag, newTag: Tag) => any
}

const Settings = (props: Props) =>
  <Fragment>
    <h3>Tags</h3>
    <ListGroup>
      <Row>
        {
          props.tags && props.tags.map((tag: Tag) => <Col xs="4" key={tag.label}>
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
