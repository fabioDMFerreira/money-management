import TransactionConfig from "models/Transaction/TransactionConfig";
import { WalletConfig } from "state/ducks/wallets";
import { Tag } from "models/Tag";

export default interface Props {
  totalBalance: number,
  totalTransactions: number,
  totalTags: number,
  totalWallets: number,
  totalEstimates: number,
  lastTransactions: [TransactionConfig],
  wallets: [WalletConfig],
  allTransactions: [TransactionConfig],
  estimatesAllTransactions: [TransactionConfig],
  tags: [Tag]
}
