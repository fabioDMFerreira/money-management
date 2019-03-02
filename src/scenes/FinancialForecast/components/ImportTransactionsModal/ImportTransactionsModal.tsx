import React, { Component } from 'react';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Button from 'reactstrap/lib/Button';
import Label from 'reactstrap/lib/Label';
import FormGroup from 'reactstrap/lib/FormGroup';
import Select from 'react-select';

import TransactionData from '../../TransactionDataInterface';
import TransactionFieldsMetadata, { Metadata } from '../../TransactionFieldsMetadata';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

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
}

type State = {
  transactions: TransactionData[],
  unmatchedDataHeaders: LabelValue[],
  existingFields: Mapper[],
}

export default class ImportTransactionsModal extends Component<Props, State> {

  state = {
    transactions: [],
    unmatchedDataHeaders: [],
    existingFields: [],
  }

  constructor(props: Props) {
    super(props);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data !== this.props.data) {
      this.processImportingTransactions(this.props.data);
    }
  }

  processImportingTransactions = (data: object[]) => {
    if (!data.length) {
      return this.setState({
        unmatchedDataHeaders: [],
        existingFields: []
      });
    }

    const existingFields: Mapper[] = TransactionFieldsMetadata.slice();
    const unmatchedDataHeaders: LabelValue[] = [];

    Object.keys(data[0]).forEach(header => {

      const matchedField = existingFields.find(field => field.key === header);

      if (matchedField) {
        matchedField.matchedKey = { label: header, value: header };
      } else {
        unmatchedDataHeaders.push({ label: header, value: header });
      }
    });

    this.setState({
      existingFields,
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
    const { existingFields, unmatchedDataHeaders } = this.state;
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
        <p>{data.length} rows to be imported</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.save}>Import</Button>{' '}
        <Button color="secondary" onClick={close}>Cancel</Button>
      </ModalFooter>
    </Modal >
  }
}


