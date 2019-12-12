import 'bootstrap/dist/css/bootstrap.css';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Wallet } from 'models/Wallet';
import React from 'react';

import ImportTransactionsModal from './ImportTransactionsModal';

const wallets: Wallet[] = [
  {
    id: '1234',
    name: 'cgd',
    balance: 1000,
  }, {
    id: '2345',
    name: 'bpi',
    balance: 2000,
  },
];

storiesOf('ImportTransactionsModal', module)
  .add('without transactions to import', () => (
    <ImportTransactionsModal
      opened
      close={action('closed')}
      save={action('save')}
      data={[]}
      wallets={wallets}
    />
  ))
  .add('with transactions to import', () => (
    <ImportTransactionsModal
      opened
      close={action('closed')}
      save={action('save')}
      data={[{
        'Data Mov.': '06-12-2019',
        'Data Valor': '',
        'Descrição do Movimento': '06/12 LEV. ATM ELEC 5638143/02 Loja do Cidadao Viseu    Vise',
        'Valor em EUR': -40,
        'Saldo em EUR': 7744.58,
      }, {
        'Data Mov.': '03-12-2019',
        'Data Valor': '',
        'Descrição do Movimento': '03/12 LEV. ATM ELEC 3237831/01 Loja do Cidadao Viseu    Vise',
        'Valor em EUR': -40,
        'Saldo em EUR': 7784.58,
      }, {
        'Data Mov.': '02-12-2019',
        'Data Valor': '',
        'Descrição do Movimento': 'SELO S/ UTILIZACAO CAPITAL - 05798544165001',
        'Valor em EUR': -330,
        'Saldo em EUR': 7824.58,
      }, {
        'Data Mov.': '02-12-2019',
        'Data Valor': '29-11-2019',
        'Descrição do Movimento': 'CREDITOS DIVERSOS 005798544165001',
        'Valor em EUR': 751,
        'Saldo em EUR': 8154.58,
      }, {
        'Data Mov.': '02-12-2019',
        'Data Valor': '30-11-2019',
        'Descrição do Movimento': '30/11 LEV. ATM ELEC 5638143/01 Intermarche - R C Lescar Sata',
        'Valor em EUR': -60,
        'Saldo em EUR': 7403.58,
      }, {
        'Data Mov.': '29-11-2019',
        'Data Valor': '',
        'Descrição do Movimento': 'EMISSÃO DE CHEQUE VISADO/BANCARIO 63788587',
        'Valor em EUR': -30000,
        'Saldo em EUR': 7463.58,
      }, {
        'Data Mov.': '29-11-2019',
        'Data Valor': '',
        'Descrição do Movimento': 'IMPOSTO DO SELO SOBRE COMISSAO (17.3.4) 63788587',
        'Valor em EUR': -0.6,
        'Saldo em EUR': 37463.58,
      }, {
        'Data Mov.': '29-11-2019',
        'Data Valor': '',
        'Descrição do Movimento': 'COMISSAO DE EMISSAO DE CHEQUE VISADO/BANCARIO 63788587',
        'Valor em EUR': -15,
        'Saldo em EUR': 37464.18,
      }, {
        'Data Mov.': '28-11-2019',
        'Data Valor': '',
        'Descrição do Movimento': 'TRF 0000006 DE LIBERTRIUM LDA',
        'Valor em EUR': 1494.18,
        'Saldo em EUR': 37479.18,
      }, {
        'Data Mov.': '27-11-2019',
        'Data Valor': '',
        'Descrição do Movimento': 'CERTIDAO ONLINE IRN  012019003107301',
        'Valor em EUR': -15,
        'Saldo em EUR': 35985,
      }, {
        'Data Mov.': '26-11-2019',
        'Data Valor': '',
        'Descrição do Movimento': 'TRF 0000005 DE FABIO DANIEL MARTINHO FERREIRA',
        'Valor em EUR': 10000,
        'Saldo em EUR': 36000,
      }, {
        'Data Mov.': '26-11-2019',
        'Data Valor': '',
        'Descrição do Movimento': 'TRF 0000004 DE PATRICIA MARQUES ALMEIDA',
        'Valor em EUR': 5000,
        'Saldo em EUR': 26000,
      }, {
        'Data Mov.': '25-11-2019',
        'Data Valor': '',
        'Descrição do Movimento': 'TRF 0000003 DE PATRICIA MARQUES ALMEIDA',
        'Valor em EUR': 10000,
        'Saldo em EUR': 21000,
      }, {
        'Data Mov.': '25-11-2019',
        'Data Valor': '',
        'Descrição do Movimento': 'TRF 0000002 DE FABIO DANIEL MARTINHO FERREIRA',
        'Valor em EUR': 10000,
        'Saldo em EUR': 11000,
      }, {
        'Data Mov.': '15-11-2019',
        'Data Valor': '',
        'Descrição do Movimento': 'TRF 0000001 DE FABIO DANIEL MARTINHO FERREIRA',
        'Valor em EUR': 1000,
        'Saldo em EUR': 1000,
      }]}
      wallets={wallets}
    />
  ));
