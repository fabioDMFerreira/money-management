import faker from 'faker';

import Transaction from "models/Transaction";

import { firstMonthDay, lastMonthDay } from "../utils";
import { Tag } from 'models/Tag';
import TransactionConfig from 'models/Transaction/TransactionConfig';
import { Wallet, WalletFactory } from 'models/Wallet';


export const setCreditOrDebit = (value: number, creditProb: number) => {
  const space = faker.random.number(100);

  if (space < creditProb) {
    return value;
  }

  return value * -1;
}

export function getRandomTransaction(startDate = new Date(2019, 0, 1), endDate = new Date(2019, 12, 31)) {
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

  return new Transaction(description, value, date).convertToTransactionData();
}

export function generateRecurringTransaction(description: string, date: Date, value: number, txDay: number) {
  const txDate = new Date(date.getFullYear(), date.getMonth(), txDay);

  return new Transaction(description, value, txDate).convertToTransactionData();
}

export function generateRandomData(startDate: Date, endDate: Date): { transactions: TransactionConfig[], tags: Tag[], wallets: Wallet[] } {
  const transactions = [] as TransactionConfig[];

  if (startDate >= endDate) {
    const tags = [] as Tag[];
    const wallets = [] as Wallet[];

    return {
      transactions,
      tags,
      wallets,
    };
  }

  const salary = faker.random.number(600) + 700;
  const homeMortage = -1 * (faker.random.number(300) + 200);
  const utilities = -1 * (faker.random.number(100) + 50);
  const food = -1 * (faker.random.number(100) + 50);

  const wallets: Wallet[] = [
    WalletFactory.build('Bank 1', 10000),
    WalletFactory.build('Bank 2', 20000),
  ]

  const tags: Tag[] = [
    {
      id: "food",
      label: 'Food',
    }, {
      id: "clothes",
      label: 'Clothes'
    }, {
      id: "vacations",
      label: "Vacations"
    }, {
      id: "car",
      label: "Car"
    }, {
      id: "house",
      label: "House Rent"
    }, {
      id: "techno",
      label: "Techno-x Company",
    }, {
      id: "utilities",
      label: "Utilities"
    }, {
      id: "freelancing",
      label: "Free Lancing"
    }, {
      id: "health",
      label: "Health"
    }
  ];

  while (startDate < endDate) {
    const startMonthDate = firstMonthDay(startDate);
    const endMonthDate = lastMonthDay(startDate);

    const salaryTransaction = generateRecurringTransaction('salary', startDate, salary, 15);
    salaryTransaction.wallet = wallets[0].id;
    salaryTransaction.tags = [tags[5]]
    transactions.push(salaryTransaction)

    const homeMortageTransaction = generateRecurringTransaction('Home mortage', startDate, homeMortage, 8);
    homeMortageTransaction.wallet = wallets[0].id;
    homeMortageTransaction.tags = [tags[4]]
    transactions.push(homeMortageTransaction);

    const utilitiesTransaction = generateRecurringTransaction('Utilities', startDate, utilities, 17);
    utilitiesTransaction.wallet = wallets[0].id;
    utilitiesTransaction.tags = [tags[6]]
    transactions.push(utilitiesTransaction);

    const foodTransaction = generateRecurringTransaction('Food', startDate, food, 17);
    foodTransaction.wallet = wallets[0].id;
    foodTransaction.tags = [tags[0]]
    transactions.push(foodTransaction);

    for (let i = 0; i < 8; i++) {
      let transaction = getRandomTransaction(startMonthDate, endMonthDate)
      transaction.wallet = wallets[0].id;
      if (transaction.credit && +transaction.credit) {
        transaction.tags = [tags[7]]
      } else if (transaction.debit && +transaction.debit > 1000) {
        transaction.tags = [tags[3]];
      } else {
        const tagIndex = faker.random.arrayElement([0, 1, 2, 3, 8])
        transaction.tags = [tags[tagIndex]]
      }
      transactions.push(transaction);
    }

    startDate.setMonth(startDate.getMonth() + 1);
  }

  return {
    transactions:
      transactions
        .sort((a, b) => a.startDate && b.startDate && a.startDate > b.startDate ? -1 : 1),
    tags,
    wallets
  };
}
