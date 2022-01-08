import { Account, OneAccountAction } from '../types/accounts.data.types';

export default function oneAccount(state: Account, action: OneAccountAction): Account {
  const { account } = action;
  return {
    ...state,
    id: account.id,
    description: account.description,
    openingBalance: account.openingBalance,
    currentBalance: account.currentBalance,
    status: account.status,
    user: account.user,
    refAccountType: account.refAccountType,
    refBank: account.refBank,
  };
}
