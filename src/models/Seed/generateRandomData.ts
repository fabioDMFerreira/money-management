import faker from 'faker';

import Transaction from "models/Transaction";

import { firstMonthDay, lastMonthDay } from "../utils";
import { Tag } from 'models/Tag';
import TransactionConfig from 'models/Transaction/TransactionConfig';
import { Wallet, WalletFactory } from 'models/Wallet';


const setCreditOrDebit = (value: number, creditProb: number) => {
  const space = faker.random.number(100);

  if (space < creditProb) {
    return value;
  }

  return value * -1;
}

function getRandomTransaction(startDate = new Date(2019, 0, 1), endDate = new Date(2019, 12, 31)) {
  const description = faker.finance.iban();
  const date = faker.date.between(startDate, endDate);
  let value;

  const space = faker.random.number(100);

  if (space < 90) {
    value = faker.random.number(100) + 1;
    value = setCreditOrDebit(value, 5);
  } else if (space < 95) {
    value = faker.random.number(400) + 100;
    value = setCreditOrDebit(value, 10);
  } else if (space < 99) {
    value = faker.random.number(1500) + 500;
    value = setCreditOrDebit(value, 80);
  } else {
    value = faker.random.number(8000) + 2000;
    value = setCreditOrDebit(value, 50);
  }

  return new Transaction(description, value, date);
}

function generateRecurringTransaction(description: string, date: Date, value: number, txDay: number) {
  const txDate = new Date(date.getFullYear(), date.getMonth(), txDay);

  return new Transaction(description, value, txDate);
}

export function generateRandomData(startDate: Date, endDate: Date): { transactions: TransactionConfig[], tags: Tag[], wallets: Wallet[] } {
  if (startDate >= endDate) {
    const transactions = [] as TransactionConfig[];
    const tags = [] as Tag[];
    const wallets = [] as Wallet[];

    return {
      transactions,
      tags,
      wallets,
    };
  }

  let transactionsList: Transaction[] = [];

  const salary = faker.random.number(600) + 700;
  const homeMortage = -1 * (faker.random.number(300) + 200);
  const utilities = -1 * (faker.random.number(100) + 50);
  const food = -1 * (faker.random.number(100) + 50);


  while (startDate < endDate) {
    const startMonthDate = firstMonthDay(startDate);
    const endMonthDate = lastMonthDay(startDate);

    const salaryTransaction = generateRecurringTransaction('salary', startDate, salary, 15);
    transactionsList.push(salaryTransaction)

    const homeMortageTransaction = generateRecurringTransaction('Home mortage', startDate, homeMortage, 8);
    transactionsList.push(homeMortageTransaction);

    const utilitiesTransaction = generateRecurringTransaction('Utilities', startDate, utilities, 17);
    transactionsList.push(utilitiesTransaction);

    const foodTransaction = generateRecurringTransaction('Food', startDate, food, 17);
    transactionsList.push(foodTransaction);

    for (let i = 0; i < 8; i++) {
      transactionsList.push(getRandomTransaction(startMonthDate, endMonthDate));
    }

    startDate.setMonth(startDate.getMonth() + 1);
  }

  const transactions = transactionsList.map(transaction => transaction.convertToTransactionData()).sort((a, b) => a.startDate && b.startDate && a.startDate > b.startDate ? -1 : 1);
  const tags = [] as Tag[];
  const wallets: Wallet[] = [
    WalletFactory.build('Bank 1', 10000),
    WalletFactory.build('Bank 2', 20000),
  ]

  return { transactions, tags, wallets };
}
