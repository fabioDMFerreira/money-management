

import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rule } from 'models/Rule';
import { Tag } from 'models/Tag';
import React, { useState } from 'react';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import Row from 'reactstrap/lib/Row';
import getRandomString from 'utils/getRandomString';
import Badge from 'views/components/Badge';
import ButtonWithConfirmation from 'views/components/ButtonWithConfirmation';

import RuleEditor from './components/RuleEditor';


interface Props {
  tags: Tag[];
  createTag: any;
  rules: Rule[];
  addRule: (rule: Rule) => any;
  removeRule: (ruleId: string) => any;
}

export default (props: Props) => {
  const [rules, setRules] = useState([] as number[]);

  return (
    <div>
      <Button onClick={() => setRules(rules.concat(rules.length))}><FontAwesomeIcon icon={faPlus} /> Add rule</Button>
      <div className="mt-4">
        {
          rules &&
          rules.map((_, index) => (<RuleEditor
            key={getRandomString()}
            tags={props.tags}
            createTag={props.createTag}
            save={(rule: Rule) => {
              props.addRule(rule);

              const rulesCopy = rules.slice();

              rulesCopy.splice(index, 1);

              setRules(rulesCopy);
            }}
            close={() => {
              const rulesCopy = rules.slice();

              rulesCopy.splice(index, 1);

              setRules(rulesCopy);
            }}
          />))
        }
      </div>
      <ListGroup>
        <Row className="mt-4">
          {
            props.rules &&
            props.rules.map((rule: Rule) => (
              <Col xs={4} key={getRandomString()}>
                <ListGroupItem>
                  <Row>
                    <Col xs={2}>
                      <ButtonWithConfirmation
                        size="sm"
                        onClick={() => rule.id && props.removeRule(rule.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </ButtonWithConfirmation>
                    </Col>
                    <Col xs={4}>
                      {rule.pattern.value}
                    </Col>
                    <Col xs={4}>
                      {rule.rule.value && rule.rule.value instanceof Array && rule.rule.value.map((tagId: string) => {
                        const tag = props.tags.find(tag => tag.id === tagId);

                        if (!tag) {
                          return <span>{tagId}</span>;
                        }

                        return <Badge label={tag.label} color={tag.color} />;
                      })}
                    </Col>
                  </Row>
                </ListGroupItem>
              </Col>
            ))
          }
        </Row>
      </ListGroup>
    </div >
  );
};

