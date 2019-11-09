import TransactionConfig from "models/Transaction/TransactionConfig";
import { Tag } from "models/Tag";
import Balance from "models/Balance";
import { Wallet } from "models/Wallet";
import { bulkAddTransactions } from "state/ducks/financial-forecast/actions";

export default interface Props {
  totalBalance: number,
  totalTransactions: number,
  totalTags: number,
  totalWallets: number,
  totalEstimates: number,
  lastTransactions: [TransactionConfig],
  wallets: [Wallet],
  allTransactions: [TransactionConfig],
  estimatesAllTransactions: [TransactionConfig],
  tags: [Tag],
  balance: Balance[],
  loadSampleData: () => void
}
