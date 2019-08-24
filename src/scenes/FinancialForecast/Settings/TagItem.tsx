import React, { Component, Fragment } from 'react';
import Button from 'reactstrap/lib/Button';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from 'reactstrap/lib/Input';
import randomColor from 'randomcolor';
import styled from 'styled-components';

import { TagType } from '../TagType';
import Form from 'reactstrap/lib/Form';
import Badge from 'reactstrap/lib/Badge';
import ButtonWithConfirmation from 'components/ButtonWithConfirmation';

type Props = {
  tag: TagType,
  deleteTag: (tag: TagType) => void,
  updateTag: (tag: TagType, newTag: TagType) => void
}

type State = {
  editing: boolean,
  value?: string,
}

const ButtonsContainer = styled.span`
button{
  margin: 0px 10px 0px 0px;
}
`;

const SaveCancelContainer = styled.p`
text-align: right;
margin-top: 5px;
button{
  margin: 0px 10px 0px 0px;
}
`

export default class TagItem extends Component<Props, State> {

  state = {
    editing: false,
    value: ''
  }

  saveLabelValue = () => {
    const { tag, updateTag } = this.props;
    const { value } = this.state;

    const newTag = {
      label: value,
      value: value.toLowerCase(),
      color: randomColor()
    }

    updateTag(tag, newTag);

    this.setState({
      editing: false
    });
  }

  render() {

    const {
      deleteTag,
      tag
    } = this.props;

    const {
      editing,
      value,
    } = this.state;

    if (editing) {
      return <Form>
        <Input
          value={value}
          autoFocus={true}
          onChange={(e: any) => this.setState({ value: e.target.value })}
        />
        <SaveCancelContainer>
          <Button type="submit" size="sm" color="primary" onClick={this.saveLabelValue}>Save</Button>
          <Button type="button" size="sm" color="link" onClick={() => this.setState({ editing: false })}>Cancel</Button>
        </SaveCancelContainer>
      </Form>
    }

    return <Fragment>
      <ButtonsContainer>
        <ButtonWithConfirmation size="sm" onClick={() => deleteTag(tag)}>
          <FontAwesomeIcon icon={faTrash} />
        </ButtonWithConfirmation>
        <Button size="sm" onClick={() => this.setState({ value: tag.label, editing: true })} > <FontAwesomeIcon icon={faEdit} /></Button>
      </ButtonsContainer>
      {tag.label}
    </Fragment>

  }
}
