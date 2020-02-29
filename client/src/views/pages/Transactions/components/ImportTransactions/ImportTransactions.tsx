

import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TransactionFieldsMetadata from 'models/Transaction/TransactionFieldsMetadata';
import { Wallet } from 'models/Wallet';
import React, { Component, Fragment } from 'react';
import Button from 'reactstrap/lib/Button';
import csvJSON from 'views/pages/Transactions/components/ImportTransactions/csvJSON';
import XLSX from 'xlsx';

import arrayObjectMapper from './arrayObjectMapper';
import filterInvalidLines from './filterInvalidLines';
import ImportTransactionsModal from './ImportTransactionsModal';
import validateTransactionData from './validateTransactionData';


interface Props {
  save: (transactions: object[]) => void;
  wallets: Wallet[];
  createWallet?: any;
}

interface State {
  modalOpened: boolean;
  importingData?: object[];
}

export default class ImportTransactions extends Component<Props, State> {
  state = {
    modalOpened: false,
    importingData: [],
  }

  csvFileInput: any;
  xlsxFileInput: any;

  importTransactions = (data: object[]) => {
    if (data.length && !validateTransactionData(data[0])) {
      this.setState({
        modalOpened: true,
        importingData: data,
      });
    } else {
      this.props.save(data);
    }
  }

  readCsvFile = (event: any) => {
    const reader = new FileReader();
    const file = this.csvFileInput.files[0];

    reader.onerror = (err) => {
      console.log({ err });
    };
    reader.onload = (csv =>
      (e: any) => {
        let csvContent = csvJSON(e.target.result);

        const dataFiltered = filterInvalidLines(csvContent);

        csvContent = arrayObjectMapper(dataFiltered, TransactionFieldsMetadata);

        this.importTransactions(csvContent);
      }
    )(file);

    reader.readAsText(file);
  }

  readXlsxFile = (event: any) => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    const file = this.xlsxFileInput.files[0];

    reader.onerror = (err) => {
      console.log({ err });
    };
    reader.onload = (e: any) => {
      const wb = XLSX.read(e.target.result, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

      console.log(JSON.stringify(data));

      const dataFiltered = filterInvalidLines(data);

      const fileContent = arrayObjectMapper(dataFiltered, TransactionFieldsMetadata);

      this.importTransactions(fileContent);
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  render() {
    const { modalOpened, importingData } = this.state;

    return (
      <Fragment>
        <Button outline color="secondary" size="sm" onClick={() => this.csvFileInput.click()}>
          <FontAwesomeIcon icon={faDownload} /> Import CSV file
        </Button>
        <input
          title="Import from .csv file"
          type="file"
          accept=".csv"
          ref={(input) => { this.csvFileInput = input; }}
          onChange={this.readCsvFile}
          style={{ display: 'none' }}
        />

        <Button outline color="secondary" size="sm" onClick={() => this.xlsxFileInput.click()}>
          <FontAwesomeIcon icon={faDownload} /> Import XLSX file
        </Button>
        <input
          title="Import from .xlsx file"
          type="file"
          accept=".xlsx"
          ref={(input) => { this.xlsxFileInput = input; }}
          onChange={this.readXlsxFile}
          style={{ display: 'none' }}
        />

        <ImportTransactionsModal
          opened={modalOpened}
          data={importingData}
          save={(transactions) => {
            const transactionsValidated = transactions.map((transaction) => {
              if (transaction.credit === transaction.debit) {
                const value = transaction.credit && parseFloat(transaction.credit);

                if (value) {
                  return {
                    ...transaction,
                    credit: value > 0 ? JSON.stringify(value) : 0,
                    debit: value < 0 ? JSON.stringify(value * -1) : 0,
                  };
                }
              }

              return {
                ...transaction,
              };
            });

            this.props.save(transactionsValidated);

            this.setState({
              modalOpened: false,
            });
          }
          }
          close={() => this.setState({ modalOpened: false })}
          wallets={this.props.wallets}
          createWallet={this.props.createWallet}
        />
      </Fragment>
    );
  }
}
