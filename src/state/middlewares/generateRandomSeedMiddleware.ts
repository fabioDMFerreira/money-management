import { generateRandomData } from "models/Seed/generateRandomData";
import { clearTransactions, bulkAddTransactions } from "state/ducks/financial-forecast/actions";
import { clearWallets, createWallet } from "state/ducks/wallets";
import { clearTags, createTag } from "state/ducks/tags";

const GENERATE_RANDOM_SEED = 'GENERATE_RANDOM_SEED';

export const generateRandomSeedAction = () => ({ type: GENERATE_RANDOM_SEED });

export default (store: any) => (next: any) => (action: any) => {
  if (action.type === GENERATE_RANDOM_SEED) {
    next(clearTransactions("TRANSACTIONS")());
    next(clearTransactions("ESTIMATES")());
    next(clearTags());
    next(clearWallets());

    const { transactions, wallets, tags } = generateRandomData(new Date(2019, 0, 1), new Date(2019, 11, 31));

    next(bulkAddTransactions("TRANSACTIONS")(transactions));
    wallets.forEach(wallet => next(createWallet(wallet)));
    tags.forEach(tag => next(createTag(tag)));
    return;
  }

  return next(action);
}
