import React, { Component } from 'react';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Button from 'reactstrap/lib/Button';
import Label from 'reactstrap/lib/Button';
import FormGroup from 'reactstrap/lib/FormGroup';
import Select from 'react-select';

import TransactionData from '../../TransactionData.interface';

interface Mapper {
  [key: string]: any
}

type LabelValue = {
  label: string,
  value: string,
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
  unmatchedHeaders: string[],
  fieldsMapper: Mapper,
}

const REQUIRED_FIELDS = ['description', 'startDate', 'endDate', 'value'];

export default class ImportTransactionsModal extends Component<Props, State> {

  state = {
    transactions: [],
    unmatchedDataHeaders: [],
    unmatchedHeaders: [],
    fieldsMapper: {}
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
        unmatchedHeaders: []
      });
    }

    const fieldsMapper: Mapper = {};
    const unmatchedHeaders = REQUIRED_FIELDS.slice();
    const unmatchedDataHeaders: string[] = [];

    Object.keys(data[0]).forEach(header => {
      const headerIndexInRequiredFields = unmatchedHeaders.indexOf(header);

      if (headerIndexInRequiredFields >= 0) {
        unmatchedHeaders.splice(headerIndexInRequiredFields, 1);
        fieldsMapper[header] = header;
      }
      else {
        unmatchedDataHeaders.push(header);
      }
    });

    this.setState({
      unmatchedHeaders,
      unmatchedDataHeaders: unmatchedDataHeaders.map((header: string): LabelValue => ({ label: header, value: header })),
      fieldsMapper,
    });

  }

  save = () => {
    const stateMapper: Mapper = this.state.fieldsMapper;
    const mapper: Mapper = Object.keys(stateMapper).reduce((accumulator: Mapper, item: string) => {
      if (stateMapper[item] && stateMapper[item].value) {
        accumulator[item] = stateMapper[item].value;
      } else {
        accumulator[item] = stateMapper[item];
      }

      return accumulator
    }, {});

    const transactions = this.props.data.map((transaction: any) => ({
      description: transaction[mapper.description],
      startDate: transaction[mapper.startDate],
      endDate: transaction[mapper.endDate || 'endDate'],
      value: transaction[mapper.value],
    }));

    this.props.save(transactions);
  }

  changeMapperValue = (header: string) => {
    return (selectedOption: any) => {
      this.setState({
        fieldsMapper: {
          ...this.state.fieldsMapper,
          [header]: selectedOption,
        }
      })
    }
  }

  render() {
    const { unmatchedHeaders, unmatchedDataHeaders, fieldsMapper } = this.state;
    const { opened, close, data } = this.props;

    return <Modal isOpen={opened} toggle={close}>
      <ModalHeader toggle={close}>Import transactions</ModalHeader>
      <ModalBody>
        <p>Missing required fields</p>
        {
          unmatchedHeaders.map(header => {
            return <FormGroup>
              <Label>{header}</Label>
              <Select
                key={header}
                value={fieldsMapper[header]}
                onChange={this.changeMapperValue(header)}
                options={unmatchedDataHeaders}
              />
            </FormGroup>
          })
        }
        <p>{data.length} rows to be imported</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.save}>Import</Button>{' '}
        <Button color="secondary" onClick={close}>Cancel</Button>
      </ModalFooter>
    </Modal>
  }
}


