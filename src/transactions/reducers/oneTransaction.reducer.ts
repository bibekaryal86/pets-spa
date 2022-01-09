import { OneTransactionOne } from '../types/transactions.data.types';

interface OneTransactionOneAction {
  oneTransaction: OneTransactionOne;
}

export default function oneTransaction(state: OneTransactionOne, action: OneTransactionOneAction): OneTransactionOne {
  const { oneTransaction } = action;
  return {
    ...state,
    id: oneTransaction.id,
    description: oneTransaction.description,
    accountId: oneTransaction.accountId,
    trfAccountId: oneTransaction.trfAccountId,
    transactionTypeId: oneTransaction.transactionTypeId,
    categoryTypeId: oneTransaction.categoryTypeId,
    categoryId: oneTransaction.categoryId,
    merchantId: oneTransaction.merchantId,
    newMerchant: oneTransaction.newMerchant,
    username: oneTransaction.username,
    date: oneTransaction.date,
    amount: oneTransaction.amount,
    regular: oneTransaction.regular,
    necessary: oneTransaction.necessary,
  };
}
