export interface Metadata {
  label: string,
  key: string,
  required?: boolean,
};

const TransactionFieldsMetadata : Metadata[] = [{
  label: 'Description',
  key: 'description',
  required: true
}, {
  label: 'Start date',
  key: 'startDate',
  required: true,
}, {
  label: 'End date',
  key: 'endDate'
}, {
  label: 'Credit',
  key: 'credit'
}, {
  label: 'Debit',
  key: 'debit'
}, {
  label: 'Particles',
  key: 'particles'
}, {
  label: 'Interval',
  key: 'interval',
}, {
  label: 'Total value',
  key: 'totalValue'
}];

export default TransactionFieldsMetadata;
