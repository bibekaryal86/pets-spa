import {
    CATEGORY_TYPE_ID_TRANSFER,
    INPUT_REGEX_PATTERN,
    TRANSACTION_TYPE_ID_TRANSFER,
} from '../../common/utils/constants';
import {OneTransactionOne, OneTransactionValidationMessages,} from '../types/transactions.data.types';
import {isTransactionTypeTransfer} from './transactions.utils';

export const validateTransaction = (
    oneTransactionOne: OneTransactionOne,
): OneTransactionValidationMessages => {
    let requiredFieldsMessages = '';
    let txnTypeTransferMessages = '';
    let otherMessages = '';

    if (!oneTransactionOne.transactionTypeId) {
        requiredFieldsMessages += '[Transaction Type]';
    }

    if (!oneTransactionOne.categoryTypeId) {
        requiredFieldsMessages += '[Category Type]';
    }

    if (!oneTransactionOne.categoryId) {
        requiredFieldsMessages += '[Category Name]';
    }

    if (!oneTransactionOne.accountId) {
        requiredFieldsMessages += '[Account Name]';
    }

    if (!oneTransactionOne.date) {
        requiredFieldsMessages += '[Date]';
    }

    if (!oneTransactionOne.amount) {
        requiredFieldsMessages += '[Amount]';
    }

    if (!oneTransactionOne.regular) {
        requiredFieldsMessages += '[Regular]';
    }

    if (!oneTransactionOne.necessary) {
        requiredFieldsMessages += '[Necessary]';
    }

    if (isTransactionTypeTransfer(oneTransactionOne.transactionTypeId)) {
        if (!oneTransactionOne.trfAccountId) {
            requiredFieldsMessages += '[Transfer To Account]';
        }

        if (oneTransactionOne.accountId === oneTransactionOne.trfAccountId) {
            txnTypeTransferMessages += '[Accounts to Transfer Should be Different]';
        }

        if (
            oneTransactionOne.transactionTypeId === TRANSACTION_TYPE_ID_TRANSFER &&
            oneTransactionOne.categoryTypeId !== CATEGORY_TYPE_ID_TRANSFER
        ) {
            txnTypeTransferMessages +=
                '[Transaction Type Transfer can be added to Category Type Transfer only]';
        }
    } else {
        if (
            !oneTransactionOne.merchantId &&
            (!oneTransactionOne.newMerchant ||
                oneTransactionOne.newMerchant.trim().length === 0)
        ) {
            requiredFieldsMessages += '[Merchant Name OR Enter New Merchant]';
        }

        if (
            oneTransactionOne.newMerchant &&
            oneTransactionOne.newMerchant.trim().length > 0 &&
            !INPUT_REGEX_PATTERN.test(oneTransactionOne.newMerchant.trim().charAt(0))
        ) {
            otherMessages +=
                '[Merchant Name Should Begin With Alpha-Numeric Character]';
        }
    }

    return {requiredFieldsMessages, txnTypeTransferMessages, otherMessages};
};
