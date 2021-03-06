import {
  ADD,
  AMOUNT,
  AUTHENTICATION,
  BALANCE,
  CLEAR_FILTERS,
  CREDIT,
  DASHBOARD,
  DASHBOARD_LOAD_SAMPLE_PRESENTATION,
  DASHBOARD_ONBOARDING_PRESENTATION,
  DASHBOARD_PRESENTATION,
  DASHBOARD_QUICK_ACTIONS_PRESENTATION,
  DASHBOARD_STATISTICS_PRESENTATION,
  DEBIT,
  DONE,
  EMAIL,
  ESTIMATED,
  ESTIMATES,
  FORECAST,
  FORECAST_PRESENTATION,
  GUIDE_TOUR_PRESENTATION,
  HOME,
  INCORRECT_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  LAST_TRANSACTIONS,
  LOAD_DATA_SAMPLE,
  LOAD_DATA_SAMPLE_CONFIRMATION_MESSAGE,
  LOADING,
  LOGIN,
  LOGOUT,
  MORE,
  NETWORK_500,
  NETWORK_ERROR,
  NETWORK_NOT_FOUND,
  NETWORK_UNSUPPORTED_MEDIA_TYPE,
  NEXT,
  NO,
  NO_RESULTS_FOUND,
  NO_TRANSACTIONS_FOUND,
  NO_WALLETS_FOUND,
  ORDER_BY,
  PASSWORD,
  PREVIOUS,
  PROFILE,
  QUICK_ACTIONS,
  REQUIRED,
  RULES,
  SELECT_OPTION,
  SKIP,
  START_GUIDE_TOUR,
  TAG_TRANSACTIONS,
  TAGS,
  TAGS_PRESENTATION,
  TIMELINE,
  TRANSACTIONS,
  TRANSACTIONS_PRESENTATION,
  USER_DOES_NOT_EXIST,
  WALLETS,
  WALLETS_PRESENTATION,
  YES,
} from './consts';

export default {
  [REQUIRED]: 'Required',
  [INVALID_EMAIL]: 'Invalid email',
  [INVALID_PASSWORD]: 'Invalid password',
  [USER_DOES_NOT_EXIST]: 'User does not exist',
  [EMAIL]: 'Email',
  [PASSWORD]: 'Password',
  [LOGIN]: 'Sign in',
  [AUTHENTICATION]: 'Authentication',
  [HOME]: 'Home',
  [PROFILE]: 'Profile',
  [SELECT_OPTION]: 'Select an option',
  [CLEAR_FILTERS]: 'Clear filters',
  [LOADING]: 'Loading...',
  [NO_RESULTS_FOUND]: 'No results found',
  [INCORRECT_PASSWORD]: 'Incorrect password',
  [NETWORK_ERROR]: 'Network error',
  [NETWORK_NOT_FOUND]: 'Results not found',
  [NETWORK_UNSUPPORTED_MEDIA_TYPE]: 'Unsupported media type',
  [NETWORK_500]: 'Error doing request',
  [ORDER_BY]: 'Order by',
  [LOGOUT]: 'Exit',
  [GUIDE_TOUR_PRESENTATION]: `
		Welcome!
	`,
  [DASHBOARD_LOAD_SAMPLE_PRESENTATION]:
    'Clicking in this button will generate random data. Fast way to see all functionalities of the product.',
  [DASHBOARD_STATISTICS_PRESENTATION]: 'Displays a resume of data saved in your account.',
  [DASHBOARD_ONBOARDING_PRESENTATION]: `
	This onboarding container shows links to pages where you can do actions.

	After doing these actions more data will appear on this dashboard.
	`,
  [DASHBOARD_PRESENTATION]: 'See a summary of your current financial state.',
  [WALLETS_PRESENTATION]: `
	Create wallets and see wallets details like balance and trasactions.
`,
  [TRANSACTIONS_PRESENTATION]: `
	Import and manage your transactions.
`,
  [FORECAST_PRESENTATION]: `
	Plan you financial future.
`,
  [TAGS_PRESENTATION]: `
	Create tags and see tags details like trasactions associated.
`,
  [DASHBOARD_QUICK_ACTIONS_PRESENTATION]: `
	Buttons and actions to make your onboarding easier.
`,
  [BALANCE]: 'Balance',
  [TRANSACTIONS]: 'Transactions',
  [ESTIMATES]: 'Estimates',
  [WALLETS]: 'Wallets',
  [LAST_TRANSACTIONS]: 'Last Transactions',
  [CREDIT]: 'Credit',
  [DEBIT]: 'Debit',
  [QUICK_ACTIONS]: 'Quick Actions',
  [ADD]: 'Add',
  [TAGS]: 'Tags',
  [START_GUIDE_TOUR]: 'Start Guide Tour',
  [LOAD_DATA_SAMPLE]: 'Load Data Sample',
  [MORE]: 'More',
  [AMOUNT]: 'Amount',
  [ESTIMATED]: 'Estimaded',
  [NO_WALLETS_FOUND]: 'No Wallets Found',
  [NO_TRANSACTIONS_FOUND]: 'No Transactions Found',
  [LOAD_DATA_SAMPLE_CONFIRMATION_MESSAGE]: 'All your current transactions will be deleted.',
  [YES]: 'Yes',
  [NO]: 'No',
  [DASHBOARD]: 'Dashboard',
  [FORECAST]: 'Forecast',
  [TIMELINE]: 'Timeline',
  [NEXT]: 'Next',
  [PREVIOUS]: 'Back',
  [SKIP]: 'Skip',
  [DONE]: 'Done',
  [RULES]: 'Rules',
  [TAG_TRANSACTIONS]: 'Tag Transactions',
};
