import { getTransactionsSelector, getTransactionByIdSelector } from './../ducks/financial-forecast/transactionsSelectors';
import { CREATE_RULE } from 'state/ducks/rules/rulesTypes';
import { getRulesSelector } from 'state/ducks/rules';
import Rule from 'models/Rule';
import TransactionConfig from 'models/Transaction/TransactionConfig';
import { updateTransaction } from 'state/ducks/financial-forecast/actions';
import { TRANSACTIONS } from 'state/ducks/financial-forecast/consts';
import { UPDATE_TRANSACTION, BULK_ADD_TRANSACTIONS } from 'state/ducks/financial-forecast/types';

const matchPatternAndGetTags = (rule: Rule, transaction: TransactionConfig) => {
	if (rule.rule.value instanceof Array && transaction.description && transaction.description.toLowerCase().indexOf(rule.pattern.value.toLowerCase()) >= 0) {
		const tags =
      transaction.tags ?
      	transaction.tags.concat(rule.rule.value.filter(tag => transaction.tags && transaction.tags.indexOf(tag) < 0))
      	:
      	rule.rule.value;
		return tags;
	}
};

export default (store: any) => (dispatch: any) => (action: any) => {
	dispatch(action);

	const state = store.getState();

	if (action.type === CREATE_RULE) {
		const transactions = getTransactionsSelector(state);
		const rule: Rule = action.payload;

		transactions.forEach((transaction: TransactionConfig) => {
			const tags = matchPatternAndGetTags(rule, transaction);

			if (tags && transaction.id) {
				dispatch(updateTransaction(TRANSACTIONS)(transaction.id, tags, 'tags'));
			}
		});
	} else if (action.type === UPDATE_TRANSACTION) {
		const rules = getRulesSelector(state);
		const transaction = getTransactionByIdSelector(state, action.id);

		rules.forEach((rule: Rule) => {
			const tags = matchPatternAndGetTags(rule, transaction);

			if (tags && transaction.tags.length !== tags.length && transaction.id) {
				dispatch(updateTransaction(TRANSACTIONS)(transaction.id, tags, 'tags'));
			}
		});
	} else if (action.type === BULK_ADD_TRANSACTIONS) {
		const rules = getRulesSelector(state);
		const transactions = getTransactionsSelector(state);

		transactions.forEach((transaction: TransactionConfig) => {
			rules.forEach((rule: Rule) => {
				const tags = matchPatternAndGetTags(rule, transaction);

				if (tags && (!transaction.tags || transaction.tags.length !== tags.length) && transaction.id) {
					dispatch(updateTransaction(TRANSACTIONS)(transaction.id, tags, 'tags'));
				}
			});
		});
	}
};
