import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.p`
  margin: 10px 0px 20px 0px;
  font-weight: 500;
`;

const NumberTransactionsFiltered: any = ({ transactions, allTransactions }: any) => (
  <Container>
    Displaying {transactions.length} of {allTransactions.length} transactions.
  </Container>
);

export default connect((state: any) => {
  const {
    financialForecast: {
      transactions,
      allTransactions,
    },
  } = state;

  return {
    transactions: transactions ? transactions.toJS() : [],
    allTransactions: allTransactions ? allTransactions.toJS() : [],
  };
})(NumberTransactionsFiltered);
