

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Button from 'reactstrap/lib/Button';
import { bulkAddTransactions } from 'state/ducks/financial-forecast/actions';

import RecurringTransactionModal from '../RecurringTransactionModal';


interface Props {
  addTransactions: (transactions: TransactionConfig[]) => any;
}

export default connect(null, dispatch => ({
  addTransactions: (transactions: TransactionConfig[]) => dispatch(bulkAddTransactions('ESTIMATES')(transactions)),
}))(({ addTransactions }: Props) => {
  const [modalOpened, openModal] = useState(false);

  return (
    <Fragment>
      <Button outline color="secondary" size="sm" onClick={() => openModal(!modalOpened)}>
        <FontAwesomeIcon icon={faPlus} /> Add Recurring Transaction
      </Button>
      {
        modalOpened &&
        <RecurringTransactionModal
          save={(transactions: TransactionConfig[]) => {
            addTransactions(transactions);
            openModal(false);
          }}
          close={() => openModal(false)}
        />
      }
    </Fragment>
  );
});
