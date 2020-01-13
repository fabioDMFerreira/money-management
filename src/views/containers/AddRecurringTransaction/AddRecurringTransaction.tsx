

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RecurringTransactionConfig, RecurringTransactionType } from 'models/RecurringTransaction';
import React, { Fragment, useState } from 'react';
import Button from 'reactstrap/lib/Button';

import RecurringTransactionModal from '../RecurringTransactionModal';


interface Props {
  recurringTransactionType: RecurringTransactionType;
  create: (rt: RecurringTransactionConfig) => void;
}

export default (({ create, recurringTransactionType }: Props) => {
  const [modalOpened, openModal] = useState(false);

  return (
    <Fragment>
      <Button outline color="secondary" size="sm" onClick={() => openModal(!modalOpened)}>
        <FontAwesomeIcon icon={faPlus} /> Add
      </Button>
      {
        modalOpened &&
        <RecurringTransactionModal
          recurringTransactionType={recurringTransactionType}
          save={(recurringTransaction: RecurringTransactionConfig) => {
            create(recurringTransaction);
            openModal(false);
          }}
          close={() => openModal(false)}
        />
      }
    </Fragment>
  );
});
