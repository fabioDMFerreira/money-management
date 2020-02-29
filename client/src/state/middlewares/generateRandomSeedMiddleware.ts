import { bulkAddTransactions, clearTransactions } from 'state/ducks/financial-forecast/actions';
import { clearTags, createTag } from 'state/ducks/tags';
import { clearWallets, createWallet } from 'state/ducks/wallets';
import { generateRandomData } from 'usecases/generateRandomData/generateRandomData';

const GENERATE_RANDOM_SEED = 'GENERATE_RANDOM_SEED';

export const generateRandomSeedAction = () => ({ type: GENERATE_RANDOM_SEED });

export default (store: any) => (next: any) => (action: any) => {
  if (action.type === GENERATE_RANDOM_SEED) {
    next(clearTransactions('TRANSACTIONS')());
    next(clearTransactions('ESTIMATES')());
    next(clearTags());
    next(clearWallets());

    const { transactions, wallets, tags } = generateRandomData(new Date(2019, 0, 1), new Date(2019, 11, 31));

    next(bulkAddTransactions('TRANSACTIONS')(transactions));
    wallets.forEach(wallet => next(createWallet(wallet)));
    tags.forEach(tag => next(createTag(tag)));
    return;
  }

  next(action);
};
