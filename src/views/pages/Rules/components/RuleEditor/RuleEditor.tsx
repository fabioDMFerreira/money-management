import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rule } from 'models/Rule';
import { Tag } from 'models/Tag';
import React, { ChangeEvent, useState } from 'react';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Row from 'reactstrap/lib/Row';
import TagSelect from 'views/containers/TagSelect/TagSelect';


interface Props {
  save: (rule: Rule) => void;
  tags: Tag[];
  createTag: any;
  close?: () => void;
}

export default (props: Props) => {
  const [patternValue, setPatternValue] = useState('');
  const [ruleValue, setRuleValue] = useState([] as string[]);

  return (
    <Form style={{ backgroundColor: 'beige', padding: '8px' }}>
      <Row>
        <Col xs={4}>
          <FormGroup>
            {/* <Label>Description</Label> */}
            <Input
              value={patternValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPatternValue(e.target.value)}
              placeholder="Description"
            />
          </FormGroup>
        </Col>
        <Col xs={4}>
          <FormGroup>
            <TagSelect
              tags={props.tags}
              createTag={props.createTag}
              tagsSelected={ruleValue}
              onChange={(value: string[]) => setRuleValue(value)}
            />
          </FormGroup>
        </Col>
        <Col xs={2}>
          <Button
            size="sm"
            block
            disabled={!patternValue || !ruleValue.length}
            onClick={(): void => {
              props.save({
                pattern: {
                  field: 'description',
                  value: patternValue,
                },
                rule: {
                  field: 'tags',
                  value: ruleValue,
                },
              });
            }}
          >
            Save
          </Button>
        </Col>
        <Col xs={2}>
          {
            props.close &&
            <Button
              size="sm"
              onClick={
                (): void => {
                  if (props.close) {
                    props.close();
                  }
                }
              }
            ><FontAwesomeIcon icon={faWindowClose} />
            </Button>
          }
        </Col>
      </Row>
    </Form>
  );
};
