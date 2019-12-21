import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { Wallet } from 'models/Wallet';
import React, { ChangeEvent } from 'react';
import Col from 'reactstrap/lib/Col';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Row from 'reactstrap/lib/Row';
import { updateWallet } from 'state/ducks/wallets';
import EditableInputHoc from 'views/hocs/EditableInputHoc';

import TransactionsTable from '../../containers/TransactionsTable/TransactionsTableContainer';
import WalletItemContainer from '../Wallets/containers/WalletItem';


interface Props {
  wallet: Wallet;
  transactions: TransactionConfig[];
  update: typeof updateWallet;
}

const EditableInput = EditableInputHoc(Input);

export default ({ wallet, transactions, update }: Props) => (
  <div>
    <h2>{wallet.name}</h2>
    <hr />
    <div className="mb-4 mt-4">
      <Row>
        <Col xs={4}>
          <WalletItemContainer wallet={wallet} />
          <div className="mt-4">
            <FormGroup>
              <Label>Balance:</Label>
              <EditableInput type="number" value={wallet.balance} onBlur={(e: any) => update(wallet.id, { balance: +e.target.value })} />
            </FormGroup>
          </div>
        </Col>
        <Col xs={4} />
      </Row>
    </div>
    {
      transactions && transactions.length > 0 &&
      <TransactionsTable transactions={transactions} />
    }
  </div>
);
