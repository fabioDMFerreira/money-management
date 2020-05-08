import { Balance } from 'models/Balance';
import { Tag } from 'models/Tag';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { Wallet } from 'models/Wallet';

export interface DashboardProps {
  totalBalance: number;
  totalTransactions: number;
  totalTags: number;
  totalWallets: number;
  totalEstimates: number;
  lastTransactions: TransactionConfig[];
  wallets: Wallet[];
  allTransactions: TransactionConfig[];
  estimatesAllTransactions: TransactionConfig[];
  tags: Tag[];
  balance: Balance[];
  loadSampleData: () => void;
};
