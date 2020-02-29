import { Tag } from 'models/Tag';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'reactstrap';
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem';
import Col from 'reactstrap/lib/Col';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import Row from 'reactstrap/lib/Row';
import { createTag, getTagsSelector } from 'state/ducks/tags';
import NewButton from 'views/components/NewButton';

import TagItem from './containers/TagItem';


type Props = {
  tags: Tag[];
  createTag: typeof createTag;
}

const Settings = (props: Props) =>
  (
    <Fragment>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/tags">Tags</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Settings</BreadcrumbItem>
      </Breadcrumb>
      <div className="mb-4">
        <NewButton
          className="mb-2"
          onClick={() => {
            props.createTag({ label: 'new tag' });
          }}
        />
        <ListGroup>
          <Row>
            {
              props.tags && props.tags.map((tag: Tag) => (
                <Col xs="4" key={tag.label}>
                  <ListGroupItem>
                    <TagItem
                      tag={tag}
                    />
                  </ListGroupItem>
                </Col>
              ))
            }
          </Row>
        </ListGroup>
      </div>
    </Fragment>
  );

const SettingsContainer = connect(
  (state: any) => ({
    tags: getTagsSelector(state),
  })
  , {
    createTag,
  },
)(Settings);

export default () => <SettingsContainer />;
