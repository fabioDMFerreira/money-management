import TransactionFieldsMetadata from "../TransactionFieldsMetadata";

export default (transactionData: any) => {
  return TransactionFieldsMetadata.every(metadata => {
    if (metadata.required && !transactionData[metadata.key]) {
      return false;
    }
    return true;
  });
}
