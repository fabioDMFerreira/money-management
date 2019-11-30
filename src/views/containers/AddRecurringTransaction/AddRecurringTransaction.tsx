import React, { Fragment, useState } from 'react';
import Button from 'reactstrap/lib/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import RecurringTransactionModal from '../RecurringTransactionModal';
import TransactionConfig from 'models/Transaction/TransactionConfig';
import { connect } from 'react-redux';
import { bulkAddTransactions } from 'state/ducks/financial-forecast/actions';

interface Props {
  addTransactions: (transactions: TransactionConfig[]) => any
}

export default connect(null, dispatch => {
  return {
    addTransactions: (transactions: TransactionConfig[]) => dispatch(bulkAddTransactions("ESTIMATES")(transactions))
  }
})(({ addTransactions }: Props) => {
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
  )
});
