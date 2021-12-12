import {DefaultAccount} from '../../accounts/types/accounts.data.types';
import {DefaultUserDetails} from '../../home/types/home.data.types';
import {DefaultMerchant} from '../../merchants/types/merchants.data.types';
import {Transaction} from '../../transactions/types/transactions.data.types';

export const TRANSACTIONS_SAMPLE_DATA_BY_ACCOUNT: Transaction[] = [
    {
        id: '600dc5423961753308ad789d',
        description: 'WOLFENSTEIN COLLECTION',
        account: {
            ...DefaultAccount,
            id: '5ede97c32c473171d746458e',
            refBank: {
                id: '5ede4d510525eb78290332eb',
                description: 'BANK CASH',
            },
            description: 'ACCOUNT CASH',
            status: 'ACTIVE',
        },
        trfAccount: DefaultAccount,
        refTransactionType: {
            id: '5ede664746fa58038df1b422',
            description: 'EXPENSE',
        },
        refCategory: {
            id: '5ede5f3146fa58038df1b3ba',
            description: 'GAMES & SHOWS',
            refCategoryType: {
                id: '5ede580797efcd0315ea06d7',
                description: 'ENTERTAINMENT',
            },
        },
        refMerchant: {
            ...DefaultMerchant,
            id: '5fb82514d1bd0d507006fc7e',
            description: 'FB OR CL MARKETPLACE',
            notEditable: false,
        },
        user: {
            ...DefaultUserDetails,
            username: 'example86',
        },
        date: '2021-01-24',
        amount: '6.0',
        regular: false,
        necessary: false,
    },

    {
        id: '5ffc72fb5b7ea24ddbd8028d',
        description: '',
        account: {
            ...DefaultAccount,
            id: '5ede98772c473171d7464591',
            refBank: {
                id: '5ede4d680525eb78290332ed',
                description: 'BANK OF AMERICA',
            },
            description: 'BOFA-ADV PLUS',
            status: 'ACTIVE',
        },
        trfAccount: {
            ...DefaultAccount,
            id: '5ede97c32c473171d746458e',
            refBank: {
                id: '5ede4d510525eb78290332eb',
                description: 'BANK CASH',
            },
            description: 'ACCOUNT CASH',
        },
        refTransactionType: {
            id: '5ede664e46fa58038df1b423',
            description: 'TRANSFER',
        },
        refCategory: {
            id: '5ede638846fa58038df1b411',
            description: 'TRANSFER FOR CASH SPENDING',
            refCategoryType: {
                id: '5ede589097efcd0315ea06e6',
                description: 'TRANSFER',
            },
        },
        refMerchant: {
            ...DefaultMerchant,
            id: '5f9f861c083c2023ef009a9a',
            description: 'TRANSFER',
            notEditable: false,
        },
        user: {
            ...DefaultUserDetails,
            username: 'example86',
        },
        date: '2021-01-09',
        amount: '500.0',
        regular: false,
        necessary: false,
    },
    {
        id: '5ffc6b2e5b7ea24ddbd80281',
        description: 'THIS OR THAT EXAMPLE',
        account: {
            ...DefaultAccount,
            id: '5ede97c32c473171d746458e',
            refBank: {
                id: '5ede4d510525eb78290332eb',
                description: 'BANK CASH',
            },
            description: 'ACCOUNT CASH',
            status: 'ACTIVE',
        },
        trfAccount: DefaultAccount,
        refTransactionType: {
            id: '5ede663e46fa58038df1b421',
            description: 'INCOME',
        },
        refCategory: {
            id: '5ede619a46fa58038df1b3ea',
            description: 'INCOME - OTHER',
            refCategoryType: {
                id: '5ede584397efcd0315ea06dd',
                description: 'INCOME',
            },
        },
        refMerchant: {
            ...DefaultMerchant,
            id: '5fb82514d1bd0d507006fc7e',
            description: 'FB OR CL MARKETPLACE',
            notEditable: false,
        },
        user: {
            ...DefaultUserDetails,
            username: 'example86',
        },
        date: '2021-01-10',
        amount: '20.0',
        regular: false,
        necessary: false,
    },
];
