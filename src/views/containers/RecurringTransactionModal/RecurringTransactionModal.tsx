

import { faCogs, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tag } from 'models/Tag';
import Transaction from 'models/Transaction';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { monthDiff, sumMonths } from 'models/utils';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import CustomInput from 'reactstrap/lib/CustomInput';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import Row from 'reactstrap/lib/Row';
import getRandomString from 'utils/getRandomString';
import YYYYMMDD from 'utils/YYYYMMDD';
import TransactionsTable from 'views/pages/Transactions/components/Transactions/TransactionsTable';
import TagSelect from 'views/pages/Transactions/containers/TagSelect';
import WalletSelectContainer from 'views/pages/Transactions/containers/WalletSelect';
import WalletSelect
  from 'views/pages/Transactions/containers/WalletSelect/WalletSelect';


interface Props {
  save: (transactions: TransactionConfig[]) => any;
  close: () => any;
}


interface RecurringTransactionConfig {
  description: string;
  startDate: Date;
  endDate?: Date;
  times: number;
  interval: number;
  valuePerTime: number;
  totalValue: number;
  useTotalValue: boolean;
  useEndDate: boolean;
  tags: string[];
  wallet: string;
}

interface RecurringTransactionInterface {
  isValid: () => boolean;
  generateTransactions: () => TransactionConfig[];

  transactionsRefs: Transaction[];

  data: RecurringTransactionConfig;
}

class RecurringTransaction implements RecurringTransactionInterface {
  transactionsRefs: Transaction[] = [];
  data: RecurringTransactionConfig;

  constructor(data: RecurringTransactionConfig) {
    this.data = data;
  }

  isValid() {
    if (!this.data.description) {
      return false;
    }

    if (!this.data.startDate) {
      return false;
    }

    if (this.data.useTotalValue && !this.data.totalValue) {
      return false;
    } else if (!this.data.valuePerTime) {
      return false;
    }

    if (this.data.useEndDate && !this.data.endDate) {
      return false;
    } else if (!this.data.times) {
      return false;
    }

    return true;
  }

  generateTransactions() {
    const transactions: TransactionConfig[] = [];
    let valuePerTime;
    let times;
    const { interval } = this.data;
    let cursorDate = this.data.startDate;
    let totalValue;

    if (this.data.useEndDate && this.data.endDate) {
      times = Math.floor(monthDiff(this.data.startDate, this.data.endDate) / interval);
    } else {
      times = this.data.times;
    }

    if (this.data.useTotalValue && this.data.totalValue) {
      totalValue = this.data.totalValue;
      valuePerTime = this.data.totalValue / times;
    } else {
      totalValue = this.data.valuePerTime * times;
      valuePerTime = this.data.valuePerTime;
    }

    while (times) {
      transactions.push({
        id: getRandomString(),
        description: this.data.description,
        startDate: YYYYMMDD(cursorDate),
        credit: valuePerTime > 0 ? valuePerTime.toString() : '0',
        debit: valuePerTime < 0 ? (valuePerTime * -1).toString() : '0',
        totalValue: totalValue.toString(),
        particles: '1',
        tags: this.data.tags,
        wallet: this.data.wallet,
      });
      cursorDate = sumMonths(cursorDate, interval);
      times--;
    }

    return transactions;
  }
}

export default ({ close, save }: Props) => {
  const [description, setDescription] = useState('Recurring Transaction');
  const [startDate, setStartDate] = useState(YYYYMMDD(new Date()));
  const [endDate, setEndDate] = useState('');
  const [times, setTimes] = useState('1');
  const [transactionsInterval, setTransactionsInterval] = useState('1');
  const [valuePerTime, setValuePerTime] = useState('');
  const [totalValue, setTotalValue] = useState('');

  const [tagsSelected, setTagsSelected] = useState([]);
  const [walletSelected, setWalletSelected] = useState('');

  const [useTotalValue, setUseTotalValue] = useState(false);
  const [useEndDate, setUseEndDate] = useState(false);

  const [transactions, setTransactions] = useState([] as TransactionConfig[]);

  let isRecurringTransactionValid;
  let recurringTransaction: RecurringTransaction;

  if (startDate) {
    recurringTransaction = new RecurringTransaction({
      description,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      times: +times,
      interval: +transactionsInterval,
      valuePerTime: +valuePerTime,
      totalValue: +totalValue,
      useTotalValue,
      useEndDate,
      wallet: walletSelected,
      tags: tagsSelected,
    });

    isRecurringTransactionValid = recurringTransaction.isValid();
  } else {
    isRecurringTransactionValid = false;
  }


  return (
    <Modal size="lg" isOpen toggle={close}>
      {/* <ModalHeader>
        Recurring Transaction
      </ModalHeader> */}
      <ModalBody>
        <Form>
          <Container className="pt-2 pb-2" style={{ backgroundColor: 'beige' }}>

            <Row>
              <Col>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="startDate">Start Date</Label>
                  <Input type="date" value={startDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tag">Tags</Label>
                  <TagSelect
                    tagsSelected={tagsSelected}
                    onChange={tags => setTagsSelected(tags)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="wallet">Wallet</Label>
                  <WalletSelectContainer
                    walletSelected={walletSelected}
                    onChange={({ value }) => setWalletSelected(value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xs={5}>
                <Row>
                  <Col>
                    <CustomInput
                      checked={useTotalValue}
                      onClick={(e: any) => setUseTotalValue(e.target.checked)}
                      type="switch"
                      label="Use Total Value"
                      id="useTotalValue"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="valuePerTime">Value Per Time</Label>
                      <Input
                        disabled={useTotalValue}
                        type="number"
                        value={valuePerTime}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValuePerTime(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="totalValue">Total Value</Label>
                      <Input
                        disabled={!useTotalValue}
                        type="number"
                        value={totalValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotalValue(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col xs={7}>
                <Row>
                  <Col>
                    <CustomInput
                      checked={useEndDate}
                      onClick={(e: any) => setUseEndDate(e.target.checked)}
                      type="switch"
                      label="Use End Date"
                      id="useEndDate"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="times">Times</Label>
                      <Input
                        disabled={useEndDate}
                        type="number"
                        value={times}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimes(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="endDate">End Date</Label>
                      <Input
                        disabled={!useEndDate}
                        type="date"
                        value={endDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="transactionsInterval">Interval</Label>
                      <Input
                        type="number"
                        value={transactionsInterval}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTransactionsInterval(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>

          </Container>
          <Button
            color="primary"
            block
            disabled={!isRecurringTransactionValid}
            onClick={() => recurringTransaction && setTransactions(recurringTransaction.generateTransactions())}
          >
            <FontAwesomeIcon icon={faCogs} /> Generate Transactions
          </Button>
        </Form>
        <TransactionsTable
          transactions={transactions}
          pageSize={5}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          disabled={!transactions.length}
          onClick={() => save(transactions)}
        ><FontAwesomeIcon icon={faPlus} /> Create
        </Button>{' '}
        <Button color="secondary" onClick={close}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};
