import TransactionFieldsMetadata from 'models/Transaction/TransactionFieldsMetadata';

export default (transactionData: any) => TransactionFieldsMetadata.every((metadata) => {
	if (metadata.required && !transactionData[metadata.key]) {
		return false;
	}
	return true;
});
