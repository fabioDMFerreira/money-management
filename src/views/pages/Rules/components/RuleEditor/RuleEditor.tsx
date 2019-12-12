import React, { useState, ChangeEvent } from 'react';
import Rule from 'models/Rule';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';
import TagSelect from 'views/pages/Transactions/containers/TagSelect/TagSelect';
import { Tag } from 'models/Tag';
import Button from 'reactstrap/lib/Button';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

interface Props {
  save: (rule: Rule) => void
  tags: Tag[]
  createTag: any
}

export default (props: Props) => {

  const [patternValue, setPatternValue] = useState('');
  const [ruleValue, setRuleValue] = useState([] as string[])

  return (
    <Form>
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
            {/* <Label>Tags</Label> */}
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
            onClick={() => {
              props.save({
                pattern: {
                  field: 'description',
                  value: patternValue
                },
                rule: {
                  field: 'tags',
                  value: ruleValue
                }
              });
            }}
          >
            Save
      </Button>
        </Col>
      </Row>
    </Form>
  )
};
