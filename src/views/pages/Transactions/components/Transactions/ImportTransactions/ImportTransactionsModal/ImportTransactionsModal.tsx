import React, { Component } from 'react';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Button from 'reactstrap/lib/Button';
import Label from 'reactstrap/lib/Label';
import FormGroup from 'reactstrap/lib/FormGroup';
import Select from 'react-select';

import TransactionData from 'models/Transaction/TransactionConfig';
import TransactionFieldsMetadata, { Metadata } from 'models/Transaction/TransactionFieldsMetadata';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Collapse from 'reactstrap/lib/Collapse';
import WalletSelect from 'views/pages/Transactions/containers/WalletSelect/WalletSelect';
import { Wallet } from 'models/Wallet';

type LabelValue = {
  label: string,
  value: string,
}

interface Mapper extends Metadata {
  matchedKey?: LabelValue
}

type Props = {
  opened: boolean | undefined,
  close: () => void,
  save: (transactions: TransactionData[]) => void,
  data: object[],
  wallets: Wallet[],
  createWallet?: any
}

type State = {
  transactions: TransactionData[],
  unmatchedDataHeaders: LabelValue[],
  existingFields: Mapper[],
  updateFormOpened: boolean,
  wallet?: string
}

export default class ImportTransactionsModal extends Component<Props, State> {

  state = {
    transactions: [],
    unmatchedDataHeaders: [] as LabelValue[],
    existingFields: TransactionFieldsMetadata.slice(),
    updateFormOpened: false,
    wallet: undefined
  }

  constructor(props: Props) {
    super(props);
    if (props.data && props.data.length) {
      this.state.unmatchedDataHeaders = this.getUnmatchedDataHeaders(this.state.existingFields, props.data[0]);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data !== this.props.data) {
      this.processImportingTransactions(this.props.data);
    }
  }

  getUnmatchedDataHeaders = (existingFields: Mapper[], transaction: object): LabelValue[] => {
    const unmatchedDataHeaders: LabelValue[] = [];

    Object.keys(transaction).forEach(header => {

      const matchedField: any = existingFields.find(field => field.key === header);

      if (matchedField) {
        matchedField.matchedKey = { label: header, value: header };
      } else {
        unmatchedDataHeaders.push({ label: header, value: header });
      }
    });

    return unmatchedDataHeaders
  }

  processImportingTransactions = (data: object[]) => {
    if (!data.length) {
      return this.setState({
        unmatchedDataHeaders: [],
        existingFields: []
      });
    }

    const unmatchedDataHeaders: LabelValue[] = this.getUnmatchedDataHeaders(this.state.existingFields, data[0]);

    this.setState({
      unmatchedDataHeaders,
    });
  }

  getAssociatedKey(key: string): string {
    const { existingFields } = this.state;

    const existingField: any = existingFields.find((field: Mapper) => field.key === key);

    if (existingField && existingField.matchedKey) {
      return existingField.matchedKey.value;
    }

    return existingField && existingField.matchedKey ? existingField.matchedKey.value : null;
  }

  save = () => {

    const mapper = {
      description: this.getAssociatedKey('description'),
      startDate: this.getAssociatedKey('startDate'),
      endDate: this.getAssociatedKey('endDate'),
      credit: this.getAssociatedKey('credit'),
      debit: this.getAssociatedKey('debit'),
    }

    const transactions = this.props.data.map((transaction: any) => ({
      description: transaction[mapper.description],
      startDate: transaction[mapper.startDate],
      endDate: transaction[mapper.endDate],
      credit: transaction[mapper.credit],
      debit: transaction[mapper.debit],
      wallet: this.state.wallet
    }));

    this.props.save(transactions);
  }

  changeMapperValue = (header: string) => {
    return (selectedOption: any) => {
      this.setState({
        existingFields: this.state.existingFields.map((field: any) => {
          if (field.key === header) {
            return {
              ...field,
              matchedKey: selectedOption
            }
          }
          return field;
        })
      })
    }
  }

  render() {
    const { existingFields, unmatchedDataHeaders, updateFormOpened, wallet } = this.state;
    const { opened, close, data } = this.props;

    return <Modal isOpen={opened} toggle={close}>
      <ModalHeader toggle={close} > Import transactions</ModalHeader>
      <ModalBody>
        {
          existingFields.map((header: any) => {
            return <FormGroup>
              <Row>
                <Col xs="3">
                  <Label>{header.label}</Label>
                </Col>
                <Col xs="9">
                  <Select
                    key={header.label}
                    value={header.matchedKey}
                    onChange={this.changeMapperValue(header.key)}
                    options={unmatchedDataHeaders}
                  />
                </Col>
              </Row>
            </FormGroup>
          })
        }
        <hr />
        <div className="mb-4">
          {/* <Button color="primary" onClick={() => this.setState({ updateFormOpened: !updateFormOpened })}>{updateFormOpened ? 'Close' : 'Open'} Update Form</Button> */}
          {/* <Collapse isOpen={updateFormOpened} className="mt-4"> */}
          <Row>
            <Col xs={6}>
              <Label>Wallet:</Label>
            </Col>
            <Col xs={6}>
              <WalletSelect
                wallets={this.props.wallets}
                walletSelected={wallet}
                onChange={optionValue => {
                  this.setState({ wallet: optionValue.value })
                }
                }
                createWallet={this.props.createWallet}
              />
            </Col>
          </Row>
          {/* </Collapse> */}
        </div>
        <hr />
        <p>{data.length} rows to be imported</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.save}>Import</Button>{' '}
        <Button color="secondary" onClick={close}>Cancel</Button>
      </ModalFooter>
    </Modal >
  }
}


