export const INPUT_REGEX_PATTERN = /^[A-Za-z0-9]+$/;

export const ALERT_TYPE_SUCCESS = 'success';
export const ALERT_TYPE_FAILURE = 'failure';
export const ALERT_TYPE_INFO = 'info';
export const ALERT_TYPE_WARN = 'warn';

export const ACCOUNT_STATUSES = ['ACTIVE', 'CLOSED'];

export const MSG_KEY_INVALID_SIGNIN = 'INVALID_SIGNIN';
export const MSG_KEY_FAIL_SIGNIN = 'FAIL_SIGNIN';
export const MSG_KEY_SIGNIN_FIRST = 'SIGNIN_FIRST';
export const MSG_KEY_SESSION_INVALID = 'INVALID_SESSION';
export const MSG_KEY_REFTYPE_FAIL = 'FAIL_REFTYPE_FETCH';
export const MSG_KEY_GET_MERCHANT_FAIL = 'FAIL_MERCHANT_GET';
export const MSG_KEY_DELETE_MERCHANT_FAIL = 'FAIL_MERCHANT_DELETE';
export const MSG_KEY_EDIT_MERCHANT_FAIL = 'FAIL_MERCHANT_EDIT';
export const MSG_KEY_EDIT_MERCHANT_SUCCESS = 'SUCCESS_MERCHANT_EDIT';
export const MSG_KEY_INVALID_MERCHANT = 'INVALID_MERCHANT';
export const MSG_KEY_GET_ACCOUNT_FAIL = 'FAIL_ACCOUNT_GET';
export const MSG_KEY_DELETE_ACCOUNT_FAIL = 'FAIL_ACCOUNT_DELETE';
export const MSG_KEY_EDIT_ACCOUNT_FAIL = 'FAIL_ACCOUNT_EDIT';
export const MSG_KEY_EDIT_ACCOUNT_SUCCESS = 'SUCCESS_ACCOUNT_EDIT';
export const MSG_KEY_GET_TRANSACTION_FAIL = 'FAIL_TRANSACTION_GET';
export const MSG_KEY_DELETE_TRANSACTION_FAIL = 'FAIL_TRANSACTION_DELETE';
export const MSG_KEY_EDIT_TRANSACTION_FAIL = 'FAIL_TRANSACTION_EDIT';
export const MSG_KEY_EDIT_TRANSACTION_SUCCESS = 'SUCCESS_TRANSACTION_EDIT';

export const ALERT_MESSAGES = new Map([
  [MSG_KEY_INVALID_SIGNIN, 'Invalid Input! Please Try Again!!!'],
  [
    MSG_KEY_FAIL_SIGNIN,
    'Invalid Username and/or Password! Please Try Again!!!',
  ],
  [MSG_KEY_SIGNIN_FIRST, 'Please Sign In First!!!'],
  [
    MSG_KEY_REFTYPE_FAIL,
    'Error Retrieving Reference Types! Please Try Again!!!',
  ],
  [
    MSG_KEY_GET_MERCHANT_FAIL,
    'Error Retrieving Merchants List! Please Try Again!!!',
  ],
  [
    MSG_KEY_DELETE_MERCHANT_FAIL,
    'Error Deleting Merchant! Please Try Again!!!',
  ],
  [MSG_KEY_EDIT_MERCHANT_FAIL, 'Error Updating Merchant! Please Try Again!!!'],
  [MSG_KEY_EDIT_MERCHANT_SUCCESS, 'Successfully Updated Merchants!!!'],
  [
    MSG_KEY_INVALID_MERCHANT,
    'Invalid Input! The Merchant Name Should be 3 Characters or More!! Please Try Again!!!',
  ],
  [
    MSG_KEY_GET_ACCOUNT_FAIL,
    'Error Retrieving Accounts List! Please Try Again!!!',
  ],
  [MSG_KEY_DELETE_ACCOUNT_FAIL, 'Error Deleting Account! Please Try Again!!!'],
  [MSG_KEY_EDIT_ACCOUNT_FAIL, 'Error Updating Account! Please Try Again!!!'],
  [MSG_KEY_EDIT_ACCOUNT_SUCCESS, 'Successfully Updated Accounts!!!'],
  [
    MSG_KEY_GET_TRANSACTION_FAIL,
    'Error Retrieving Transactions List! Please Try Again!!!',
  ],
  [
    MSG_KEY_DELETE_TRANSACTION_FAIL,
    'Error Deleting Transaction! Please Try Again!!!',
  ],
  [
    MSG_KEY_EDIT_TRANSACTION_FAIL,
    'Error Updating Transaction! Please Try Again!!!',
  ],
  [MSG_KEY_EDIT_TRANSACTION_SUCCESS, 'Successfully Updated Transactions!!!'],
]);

export const refTypesFailureAlertMessage = (refType: string): string =>
  `Error Retrieving ${refType}! Please Try Again!!!`;

const ACCOUNT_TYPE_ID_CREDIT_CARD = '5ede4cf30525eb78290332e7';
const ACCOUNT_TYPE_ID_LOANS_MORTGAGES = '5ede4d080525eb78290332e8';
const ACCOUNT_TYPE_ID_OTHER_LOANS = '5ede4d1d0525eb78290332ea';
export const ACCOUNT_TYPES_LOAN_ACCOUNTS = [
  ACCOUNT_TYPE_ID_CREDIT_CARD,
  ACCOUNT_TYPE_ID_LOANS_MORTGAGES,
  ACCOUNT_TYPE_ID_OTHER_LOANS,
];

export const TRANSACTION_TYPE_ID_EXPENSE = '5ede664746fa58038df1b422';
export const TRANSACTION_TYPE_ID_TRANSFER = '5ede664e46fa58038df1b423';
export const CATEGORY_TYPE_ID_TRANSFER = '5ede589097efcd0315ea06e6';
export const CATEGORY_TYPE_ID_INCOME = '5ede584397efcd0315ea06dd';
export const TRANSACTION_TYPE_ID_INCOME = '5ede663e46fa58038df1b421';
export const MERCHANT_ID_TRANSFER = '5f9f861c083c2023ef009a9a';

export const checkBoxOptionsYesNo = [
  { value: 'YES', text: 'YES' },
  { value: 'NO', text: 'NO' },
];

export const REPORT_NAME_ALL = 'All Reports Summary';
export const REPORT_NAME_CURRENT_BALANCES = 'Current Balances';
export const REPORT_NAME_CASH_FLOWS = 'Cash Flows';
export const REPORT_NAME_CATEGORIES = 'Categories';
export const REPORT_PATH_ALL = '/reports';
export const REPORT_PATH_CURRENT_BALANCES = '/report_currentbalances';
export const REPORT_PATH_CASH_FLOWS = '/report_cashflows';
export const REPORT_PATH_CATEGORIES = '/report_categories';

export const YEAR_ZERO = 2020;

export const SESSION_ACCOUNT_FILTERS = 'accountFilters';
export const SESSION_TRANSACTION_FILTERS = 'transactionFilters';

export const TABLE_SORT_DIRECTION_ASCENDING = 'ASC';
export const TABLE_SORT_DIRECTION_DESCENDING = 'DESC';
export const TABLE_SORTED_ASC_CODE = 8657;
export const TABLE_SORTED_DESC_CODE = 8659;
export const TABLE_SORTED_NONE_CODE = 8205;
export const TABLE_EXPORT_KEYS_TO_AVOID = ['actions', 'Actions'];
export const TABLE_EXPORT_KEY_FOR_TITLE = 'title';

export const DATE_FORMAT_MATCHER_REGEX = new RegExp(
  '[0-9]{4}\\-[0-9]{2}\\-[0-9]{2}',
);
export const CURRENCY_FORMAT_MATCHER_REGEX = new RegExp(
  '^\\$|\\-\\$(\\d{1,3}(\\,\\d{3})*|(\\d+))(\\.\\d{1,2})?$',
);
