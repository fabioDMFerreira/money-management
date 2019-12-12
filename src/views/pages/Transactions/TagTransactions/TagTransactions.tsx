import { Rule } from 'models/Rule';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Row from 'reactstrap/lib/Row';
import { updateTransaction } from 'state/ducks/financial-forecast/actions';
import { TRANSACTIONS } from 'state/ducks/financial-forecast/consts';
import { getTransactionsSelector } from 'state/ducks/financial-forecast/transactionsSelectors';
import { createRule } from 'state/ducks/rules';

import TransactionsTable from '../components/Transactions/TransactionsTable/TransactionsTable';
import TagSelect from '../containers/TagSelect';


export default () => {
  const [filter, setFilter] = useState('');
  const [tags, setTags] = useState([]);

  const transactions =
    useSelector(getTransactionsSelector)
      .filter((transaction: TransactionConfig) =>
        (
          !transaction.tags || !transaction.tags.length
        ) &&
        (
          !filter ||
          (
            transaction.description &&
            transaction.description.toLowerCase().indexOf(filter.toLowerCase()) >= 0
          )
        ));
  const dispatch = useDispatch();
  const dispatchCreateRule = (rule: Rule) => {
    dispatch(createRule(rule));
  };
  const dispatchUpdateTransaction = (id: string, value: any, field: any) => {
    dispatch(updateTransaction(TRANSACTIONS)(id, value, field));
  };

  return (
    <div>
      <div style={{ backgroundColor: 'beige', padding: 8 }}>
        <Label>Assign tags to transactions</Label>
        <Row className="mb-4">
          <Col xs={3}>
            <Input
              placeholder="Filter by description"
              value={filter}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
            />
          </Col>
          <Col xs={3}>
            <TagSelect
              tagsSelected={tags}
              onChange={setTags}
            />
          </Col>
          <Col xs={6}>
            <Button
              disabled={!filter || !tags.length}
              onClick={
                () => {
                  transactions.forEach((transaction: TransactionConfig) => transaction.id && dispatchUpdateTransaction(transaction.id, tags, 'tags'));
                  setFilter('');
                  setTags([]);
                }
              }
            >
              Assign Tags
            </Button>
            {' '}
            <Button
              color="primary"
              disabled={!filter || !tags.length}
              onClick={
                () => {
                  dispatchCreateRule({
                    pattern: {
                      field: 'description',
                      value: filter,
                    },
                    rule: {
                      field: 'tags',
                      value: tags,
                    },
                  });
                  setFilter('');
                  setTags([]);
                }
              }
            >
              Create Rule and Assign Tags
            </Button>
          </Col>
        </Row >
        <b>{transactions.length} transactions</b> left to assign tags
      </div>
      <TransactionsTable
        transactions={transactions}
        updateTransaction={dispatchUpdateTransaction}
      />
    </div >
  );
};
