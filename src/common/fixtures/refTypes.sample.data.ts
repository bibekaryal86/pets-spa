import {SelectOptionProps} from '../forms/Select';
import {RefAccountType, RefBank, RefCategory, RefCategoryType, RefTransactionType,} from '../types/refTypes.data.types';

export const REF_ACCOUNT_TYPES: RefAccountType[] = [
    {
        id: '5ede4cbb0525eb78290332e4',
        description: 'ACCOUNT CASH',
    },
    {
        id: '5ede4cc80525eb78290332e5',
        description: 'CHECKING ACCOUNT',
    },
    {
        id: '5ede4cf30525eb78290332e7',
        description: 'CREDIT CARD',
    },
    {
        id: '5fa83f9d465347404cc6aa21',
        description: 'INVESTMENT ACCOUNT',
    },
    {
        id: '5ede4d080525eb78290332e8',
        description: 'LOANS AND MORTGAGES',
    },
    {
        id: '5ede4d170525eb78290332e9',
        description: 'OTHER DEPOSIT ACCOUNTS',
    },
    {
        id: '5ede4d1d0525eb78290332ea',
        description: 'OTHER LOAN ACCOUNTS',
    },
    {
        id: '5ede4cde0525eb78290332e6',
        description: 'SAVINGS ACCOUNT',
    },
];

export const REF_ACCOUNT_TYPES_SELECT_OPTIONS: SelectOptionProps[] = [
    {
        text: 'Please Select',
        value: '',
    },
    {
        text: 'ACCOUNT CASH',
        value: '5ede4cbb0525eb78290332e4',
    },
    {
        text: 'CHECKING ACCOUNT',
        value: '5ede4cc80525eb78290332e5',
    },
    {
        text: 'CREDIT CARD',
        value: '5ede4cf30525eb78290332e7',
    },
    {
        text: 'INVESTMENT ACCOUNT',
        value: '5fa83f9d465347404cc6aa21',
    },
    {
        text: 'LOANS AND MORTGAGES',
        value: '5ede4d080525eb78290332e8',
    },
    {
        text: 'OTHER DEPOSIT ACCOUNTS',
        value: '5ede4d170525eb78290332e9',
    },
    {
        text: 'OTHER LOAN ACCOUNTS',
        value: '5ede4d1d0525eb78290332ea',
    },
    {
        text: 'SAVINGS ACCOUNT',
        value: '5ede4cde0525eb78290332e6',
    },
];

export const REF_BANKS: RefBank[] = [
    {
        id: '5ede4d5c0525eb78290332ec',
        description: 'AMERICAN EXPRESS',
    },
    {
        id: '5ede4d510525eb78290332eb',
        description: 'BANK CASH',
    },
    {
        id: '5ede4d680525eb78290332ed',
        description: 'BANK OF AMERICA',
    },
    {
        id: '5ede4d790525eb78290332ee',
        description: 'CHASE BANK',
    },
    {
        id: '5ede4d850525eb78290332ef',
        description: 'DISCOVER',
    },
    {
        id: '5ede4d8d0525eb78290332f0',
        description: 'PNC BANK',
    },
];

export const REF_BANKS_SELECT_OPTIONS: SelectOptionProps[] = [
    {
        text: 'Please Select',
        value: '',
    },
    {
        text: 'AMERICAN EXPRESS',
        value: '5ede4d5c0525eb78290332ec',
    },
    {
        text: 'BANK CASH',
        value: '5ede4d510525eb78290332eb',
    },
    {
        text: 'BANK OF AMERICA',
        value: '5ede4d680525eb78290332ed',
    },
    {
        text: 'CHASE BANK',
        value: '5ede4d790525eb78290332ee',
    },
    {
        text: 'DISCOVER',
        value: '5ede4d850525eb78290332ef',
    },
    {
        text: 'PNC BANK',
        value: '5ede4d8d0525eb78290332f0',
    },
];

export const REF_CATEGORY_TYPES: RefCategoryType[] = [
    {
        id: '5ede57c997efcd0315ea06d2',
        description: 'AUTO & TRANSPORT',
    },
    {
        id: '5ede57d897efcd0315ea06d3',
        description: 'BILLS & UTILITIES',
    },
    {
        id: '5ede57e197efcd0315ea06d4',
        description: 'BUSINESS SERVICES',
    },
    {
        id: '5ede57eb97efcd0315ea06d5',
        description: 'CHILDREN',
    },
    {
        id: '5ede57f797efcd0315ea06d6',
        description: 'EDUCATION',
    },
    {
        id: '5ede580797efcd0315ea06d7',
        description: 'ENTERTAINMENT',
    },
    {
        id: '5ede581297efcd0315ea06d8',
        description: 'FEES & CHARGES',
    },
    {
        id: '5ede581d97efcd0315ea06d9',
        description: 'FOOD & DINING',
    },
    {
        id: '5ede582897efcd0315ea06da',
        description: 'GIFTS & DONATIONS',
    },
    {
        id: '5ede583297efcd0315ea06db',
        description: 'HEALTH & FITNESS',
    },
    {
        id: '5ede583c97efcd0315ea06dc',
        description: 'HOUSING',
    },
    {
        id: '5ede584397efcd0315ea06dd',
        description: 'INCOME',
    },
    {
        id: '5ede584d97efcd0315ea06de',
        description: 'LOANS',
    },
    {
        id: '5ede585a97efcd0315ea06df',
        description: 'MISC EXPENSES',
    },
    {
        id: '5ede586397efcd0315ea06e0',
        description: 'PERSONAL CARE',
    },
    {
        id: '5ede586b97efcd0315ea06e1',
        description: 'PETS',
    },
    {
        id: '5ede587397efcd0315ea06e2',
        description: 'SAVINGS',
    },
    {
        id: '5ede587a97efcd0315ea06e3',
        description: 'SHOPPING',
    },
    {
        id: '5ede588797efcd0315ea06e5',
        description: 'TAXES',
    },
    {
        id: '5ede589097efcd0315ea06e6',
        description: 'TRANSFER',
    },
    {
        id: '5ede589997efcd0315ea06e7',
        description: 'TRAVEL & VACATION',
    },
];

export const REF_CATEGORIES: RefCategory[] = [
    {
        id: '5ede5a9197efcd0315ea06ee',
        description: 'SERVICE & PARTS',
        refCategoryType: {
            id: '5ede57c997efcd0315ea06d2',
            description: '',
        },
    },
    {
        id: '5ede5e6a46fa58038df1b3b0',
        description: 'TOYS & GAMES',
        refCategoryType: {
            id: '5ede57eb97efcd0315ea06d5',
            description: '',
        },
    },
    {
        id: '5ede5e9846fa58038df1b3b2',
        description: 'BOOKS & SUPPLIES',
        refCategoryType: {
            id: '5ede57f797efcd0315ea06d6',
            description: '',
        },
    },
    {
        id: '5ede5ff646fa58038df1b3c8',
        description: 'COFFEE SHOPS',
        refCategoryType: {
            id: '5ede581d97efcd0315ea06d9',
            description: '',
        },
    },
    {
        id: '5ede5b5297efcd0315ea06fb',
        description: 'BUSINESS SERVICES - OTHER',
        refCategoryType: {
            id: '5ede57e197efcd0315ea06d4',
            description: '',
        },
    },
    {
        id: '5ede5feb46fa58038df1b3c7',
        description: 'ALCOHOL & BARS',
        refCategoryType: {
            id: '5ede581d97efcd0315ea06d9',
            description: '',
        },
    },
    {
        id: '5ede604a46fa58038df1b3cf',
        description: 'RELIGIOUS DONATIONS',
        refCategoryType: {
            id: '5ede582897efcd0315ea06da',
            description: '',
        },
    },
    {
        id: '5ede5aa497efcd0315ea06ef',
        description: 'AUTO & TRANSPORT - OTHER',
        refCategoryType: {
            id: '5ede57c997efcd0315ea06d2',
            description: '',
        },
    },
    {
        id: '5ede5a2a97efcd0315ea06ea',
        description: 'GAS & FUEL',
        refCategoryType: {
            id: '5ede57c997efcd0315ea06d2',
            description: '',
        },
    },
    {
        id: '5ede5b2e97efcd0315ea06f7',
        description: 'LEGAL',
        refCategoryType: {
            id: '5ede57e197efcd0315ea06d4',
            description: '',
        },
    },
    {
        id: '5ede5f5846fa58038df1b3be',
        description: 'RENTALS',
        refCategoryType: {
            id: '5ede580797efcd0315ea06d7',
            description: '',
        },
    },
    {
        id: '5ede5ad797efcd0315ea06f2',
        description: 'INTERNET',
        refCategoryType: {
            id: '5ede57d897efcd0315ea06d3',
            description: '',
        },
    },
    {
        id: '5ede5ea246fa58038df1b3b3',
        description: 'STUDENT LOAN PAYMENT',
        refCategoryType: {
            id: '5ede57f797efcd0315ea06d6',
            description: '',
        },
    },
    {
        id: '5ede5ef146fa58038df1b3b9',
        description: 'CONCERT & PLAYS',
        refCategoryType: {
            id: '5ede580797efcd0315ea06d7',
            description: '',
        },
    },
    {
        id: '5ede5f3b46fa58038df1b3bb',
        description: 'MOVIES & DVDS',
        refCategoryType: {
            id: '5ede580797efcd0315ea06d7',
            description: '',
        },
    },
    {
        id: '5ede5f9746fa58038df1b3c1',
        description: 'ATM FEE',
        refCategoryType: {
            id: '5ede581297efcd0315ea06d8',
            description: '',
        },
    },
    {
        id: '5ede608746fa58038df1b3d5',
        description: 'HEALTH INSURANCE',
        refCategoryType: {
            id: '5ede583297efcd0315ea06db',
            description: '',
        },
    },
    {
        id: '5ede5a7e97efcd0315ea06ed',
        description: 'DMV FEES',
        refCategoryType: {
            id: '5ede57c997efcd0315ea06d2',
            description: '',
        },
    },
    {
        id: '5ede5b2497efcd0315ea06f6',
        description: 'ADVERTISING',
        refCategoryType: {
            id: '5ede57e197efcd0315ea06d4',
            description: '',
        },
    },
    {
        id: '5ede5e7346fa58038df1b3b1',
        description: 'CHILDREN - OTHER',
        refCategoryType: {
            id: '5ede57eb97efcd0315ea06d5',
            description: '',
        },
    },
    {
        id: '5ede600146fa58038df1b3c9',
        description: 'FAST FOOD',
        refCategoryType: {
            id: '5ede581d97efcd0315ea06d9',
            description: '',
        },
    },
    {
        id: '5ede605646fa58038df1b3d0',
        description: 'GIFTS & DONATIONS - OTHER',
        refCategoryType: {
            id: '5ede582897efcd0315ea06da',
            description: '',
        },
    },
    {
        id: '5ede609146fa58038df1b3d6',
        description: 'LIFE INSURANCE',
        refCategoryType: {
            id: '5ede583297efcd0315ea06db',
            description: '',
        },
    },
    {
        id: '5ede5b0297efcd0315ea06f5',
        description: 'BILLS & UTILITIES - OTHER',
        refCategoryType: {
            id: '5ede57d897efcd0315ea06d3',
            description: '',
        },
    },
    {
        id: '5ede5e4546fa58038df1b3ac',
        description: 'CHILD SUPPORT',
        refCategoryType: {
            id: '5ede57eb97efcd0315ea06d5',
            description: '',
        },
    },
    {
        id: '5ede601546fa58038df1b3cc',
        description: 'FOOD & DINING - OTHER',
        refCategoryType: {
            id: '5ede581d97efcd0315ea06d9',
            description: '',
        },
    },
    {
        id: '5ede5af597efcd0315ea06f4',
        description: 'WATER & SEWER & REFUGE',
        refCategoryType: {
            id: '5ede57d897efcd0315ea06d3',
            description: '',
        },
    },
    {
        id: '5ede5e3846fa58038df1b3ab',
        description: 'ALLOWANCE',
        refCategoryType: {
            id: '5ede57eb97efcd0315ea06d5',
            description: '',
        },
    },
    {
        id: '5ede5b3c97efcd0315ea06f8',
        description: 'OFFICE SUPPLIES',
        refCategoryType: {
            id: '5ede57e197efcd0315ea06d4',
            description: '',
        },
    },
    {
        id: '5ede5b4997efcd0315ea06fa',
        description: 'SHIPPING',
        refCategoryType: {
            id: '5ede57e197efcd0315ea06d4',
            description: '',
        },
    },
    {
        id: '5ede5f5f46fa58038df1b3bf',
        description: 'ENTERTAINMENT - OTHERS',
        refCategoryType: {
            id: '5ede580797efcd0315ea06d7',
            description: '',
        },
    },
    {
        id: '5ede607d46fa58038df1b3d4',
        description: 'FITNESS CLUBS',
        refCategoryType: {
            id: '5ede583297efcd0315ea06db',
            description: '',
        },
    },
    {
        id: '5ede5e6146fa58038df1b3af',
        description: 'SCHOOL EXPENSES',
        refCategoryType: {
            id: '5ede57eb97efcd0315ea06d5',
            description: '',
        },
    },
    {
        id: '5ede5edc46fa58038df1b3b7',
        description: 'ARTS',
        refCategoryType: {
            id: '5ede580797efcd0315ea06d7',
            description: '',
        },
    },
    {
        id: '5ede5fbe46fa58038df1b3c5',
        description: 'FINANCE CHARGE',
        refCategoryType: {
            id: '5ede581297efcd0315ea06d8',
            description: '',
        },
    },
    {
        id: '5ede606846fa58038df1b3d1',
        description: 'DENTIST',
        refCategoryType: {
            id: '5ede583297efcd0315ea06db',
            description: '',
        },
    },
    {
        id: '5ede5a4197efcd0315ea06ec',
        description: 'PUBLIC TRANSPORTATION',
        refCategoryType: {
            id: '5ede57c997efcd0315ea06d2',
            description: '',
        },
    },
    {
        id: '5ede5ade97efcd0315ea06f3',
        description: 'TELEVISION',
        refCategoryType: {
            id: '5ede57d897efcd0315ea06d3',
            description: '',
        },
    },
    {
        id: '5ede5eb346fa58038df1b3b5',
        description: 'EDUCATION - OTHER',
        refCategoryType: {
            id: '5ede57f797efcd0315ea06d6',
            description: '',
        },
    },
    {
        id: '5ede604146fa58038df1b3ce',
        description: 'GIFTS',
        refCategoryType: {
            id: '5ede582897efcd0315ea06da',
            description: '',
        },
    },
    {
        id: '5ede5eab46fa58038df1b3b4',
        description: 'TUITION',
        refCategoryType: {
            id: '5ede57f797efcd0315ea06d6',
            description: '',
        },
    },
    {
        id: '5ede5f4346fa58038df1b3bc',
        description: 'MUSIC',
        refCategoryType: {
            id: '5ede580797efcd0315ea06d7',
            description: '',
        },
    },
    {
        id: '5ede5f4e46fa58038df1b3bd',
        description: 'NEWSPAPERS & MAGAZINES',
        refCategoryType: {
            id: '5ede580797efcd0315ea06d7',
            description: '',
        },
    },
    {
        id: '5ede5fd046fa58038df1b3c6',
        description: 'FEES & CHARGES - OTHER',
        refCategoryType: {
            id: '5ede581297efcd0315ea06d8',
            description: '',
        },
    },
    {
        id: '5ede600746fa58038df1b3ca',
        description: 'GROCERIES',
        refCategoryType: {
            id: '5ede581d97efcd0315ea06d9',
            description: '',
        },
    },
    {
        id: '5ede603946fa58038df1b3cd',
        description: 'CHARITABLE DONATIONS',
        refCategoryType: {
            id: '5ede582897efcd0315ea06da',
            description: '',
        },
    },
    {
        id: '5ede5e2746fa58038df1b3a9',
        description: 'BABYSITTING & CHILD CARE',
        refCategoryType: {
            id: '5ede57eb97efcd0315ea06d5',
            description: '',
        },
    },
    {
        id: '5ede600e46fa58038df1b3cb',
        description: 'RESTAURANTS',
        refCategoryType: {
            id: '5ede581d97efcd0315ea06d9',
            description: '',
        },
    },
    {
        id: '5ede606f46fa58038df1b3d2',
        description: 'DOCTOR',
        refCategoryType: {
            id: '5ede583297efcd0315ea06db',
            description: '',
        },
    },
    {
        id: '5ede5ad097efcd0315ea06f1',
        description: 'PHONE',
        refCategoryType: {
            id: '5ede57d897efcd0315ea06d3',
            description: '',
        },
    },
    {
        id: '5ede5e3046fa58038df1b3aa',
        description: 'BABY SUPPLIES',
        refCategoryType: {
            id: '5ede57eb97efcd0315ea06d5',
            description: '',
        },
    },
    {
        id: '5ede5e5746fa58038df1b3ae',
        description: 'KIDS ACTIVITIES',
        refCategoryType: {
            id: '5ede57eb97efcd0315ea06d5',
            description: '',
        },
    },
    {
        id: '5ede5ee646fa58038df1b3b8',
        description: 'CINEMA & THEATER',
        refCategoryType: {
            id: '5ede580797efcd0315ea06d7',
            description: '',
        },
    },
    {
        id: '5ede5fa046fa58038df1b3c2',
        description: 'BANK FEE',
        refCategoryType: {
            id: '5ede581297efcd0315ea06d8',
            description: '',
        },
    },
    {
        id: '5ede5fb446fa58038df1b3c4',
        description: 'SERVICE FEE',
        refCategoryType: {
            id: '5ede581297efcd0315ea06d8',
            description: '',
        },
    },
    {
        id: '5ede5ed646fa58038df1b3b6',
        description: 'AMUSEMENT',
        refCategoryType: {
            id: '5ede580797efcd0315ea06d7',
            description: '',
        },
    },
    {
        id: '5ede5fac46fa58038df1b3c3',
        description: 'LATE FEE',
        refCategoryType: {
            id: '5ede581297efcd0315ea06d8',
            description: '',
        },
    },
    {
        id: '5ede607546fa58038df1b3d3',
        description: 'EYECARE',
        refCategoryType: {
            id: '5ede583297efcd0315ea06db',
            description: '',
        },
    },
    {
        id: '5ede5a1297efcd0315ea06e8',
        description: 'AUTO INSURANCE',
        refCategoryType: {
            id: '5ede57c997efcd0315ea06d2',
            description: '',
        },
    },
    {
        id: '5ede5a3297efcd0315ea06eb',
        description: 'PARKING',
        refCategoryType: {
            id: '5ede57c997efcd0315ea06d2',
            description: '',
        },
    },
    {
        id: '5ede5ac497efcd0315ea06f0',
        description: 'ELECTRICITY & GAS',
        refCategoryType: {
            id: '5ede57d897efcd0315ea06d3',
            description: '',
        },
    },
    {
        id: '5ede5b4397efcd0315ea06f9',
        description: 'PRINTING',
        refCategoryType: {
            id: '5ede57e197efcd0315ea06d4',
            description: '',
        },
    },
    {
        id: '5ede5f3146fa58038df1b3ba',
        description: 'GAMES & SHOWS',
        refCategoryType: {
            id: '5ede580797efcd0315ea06d7',
            description: '',
        },
    },
    {
        id: '5ede5e4e46fa58038df1b3ad',
        description: 'CHILDREN CLOTHING',
        refCategoryType: {
            id: '5ede57eb97efcd0315ea06d5',
            description: '',
        },
    },
    {
        id: '5ede60fa46fa58038df1b3db',
        description: 'HOME OR RENTAL INSURANCE',
        refCategoryType: {
            id: '5ede583c97efcd0315ea06dc',
            description: '',
        },
    },
    {
        id: '5ede625846fa58038df1b3f7',
        description: 'PET FOOD & SUPPLIES',
        refCategoryType: {
            id: '5ede586b97efcd0315ea06e1',
            description: '',
        },
    },
    {
        id: '5ede628846fa58038df1b3fc',
        description: 'PETS - OTHER',
        refCategoryType: {
            id: '5ede586b97efcd0315ea06e1',
            description: '',
        },
    },
    {
        id: '5ede63d646fa58038df1b416',
        description: 'VACATION EXPENSES',
        refCategoryType: {
            id: '5ede589997efcd0315ea06e7',
            description: '',
        },
    },
    {
        id: '5ede614346fa58038df1b3e2',
        description: 'BONUS & REWARDS',
        refCategoryType: {
            id: '5ede584397efcd0315ea06dd',
            description: '',
        },
    },
    {
        id: '5ede618546fa58038df1b3e8',
        description: 'REFUNDS & REIMBURSEMENTS',
        refCategoryType: {
            id: '5ede584397efcd0315ea06dd',
            description: '',
        },
    },
    {
        id: '5ede619046fa58038df1b3e9',
        description: 'RENTAL INCOME',
        refCategoryType: {
            id: '5ede584397efcd0315ea06dd',
            description: '',
        },
    },
    {
        id: '5ede631146fa58038df1b408',
        description: 'SHOPPING - OTHER',
        refCategoryType: {
            id: '5ede587a97efcd0315ea06e3',
            description: '',
        },
    },
    {
        id: '5ede611f46fa58038df1b3df',
        description: 'LAWN & GARDEN',
        refCategoryType: {
            id: '5ede583c97efcd0315ea06dc',
            description: '',
        },
    },
    {
        id: '5ede623646fa58038df1b3f5',
        description: 'SPA & MASSAGE',
        refCategoryType: {
            id: '5ede586397efcd0315ea06e0',
            description: '',
        },
    },
    {
        id: '5ede62ea46fa58038df1b403',
        description: 'BOOKS',
        refCategoryType: {
            id: '5ede587a97efcd0315ea06e3',
            description: '',
        },
    },
    {
        id: '5ede62f046fa58038df1b404',
        description: 'CLOTHING',
        refCategoryType: {
            id: '5ede587a97efcd0315ea06e3',
            description: '',
        },
    },
    {
        id: '5fab3ba8d08e63291defc8fa',
        description: 'PERSONAL LOAN PAYMENT',
        refCategoryType: {
            id: '5ede584d97efcd0315ea06de',
            description: '',
        },
    },
    {
        id: '5ede621746fa58038df1b3f2',
        description: 'LAUNDRY & DRY CLEANING',
        refCategoryType: {
            id: '5ede586397efcd0315ea06e0',
            description: '',
        },
    },
    {
        id: '5ede627f46fa58038df1b3fb',
        description: 'VETERINARY',
        refCategoryType: {
            id: '5ede586b97efcd0315ea06e1',
            description: '',
        },
    },
    {
        id: '5ede616046fa58038df1b3e5',
        description: 'INTEREST INCOME',
        refCategoryType: {
            id: '5ede584397efcd0315ea06dd',
            description: '',
        },
    },
    {
        id: '5ede62c946fa58038df1b401',
        description: 'VACATION FUND',
        refCategoryType: {
            id: '5ede587397efcd0315ea06e2',
            description: '',
        },
    },
    {
        id: '5ede619a46fa58038df1b3ea',
        description: 'INCOME - OTHER',
        refCategoryType: {
            id: '5ede584397efcd0315ea06dd',
            description: '',
        },
    },
    {
        id: '5ede62af46fa58038df1b3fe',
        description: 'EMERGENCY FUND',
        refCategoryType: {
            id: '5ede587397efcd0315ea06e2',
            description: '',
        },
    },
    {
        id: '5ede62c046fa58038df1b400',
        description: 'RETIREMENT FUND',
        refCategoryType: {
            id: '5ede587397efcd0315ea06e2',
            description: '',
        },
    },
    {
        id: '5ede634146fa58038df1b40d',
        description: 'TAXES - OTHER',
        refCategoryType: {
            id: '5ede588797efcd0315ea06e5',
            description: '',
        },
    },
    {
        id: '5ede63b646fa58038df1b413',
        description: 'TRAVEL FARES',
        refCategoryType: {
            id: '5ede589997efcd0315ea06e7',
            description: '',
        },
    },
    {
        id: '5ede63df46fa58038df1b417',
        description: 'TRAVEL & VACATION - OTHER',
        refCategoryType: {
            id: '5ede589997efcd0315ea06e7',
            description: '',
        },
    },
    {
        id: '5ede613146fa58038df1b3e1',
        description: 'HOUSING - OTHER',
        refCategoryType: {
            id: '5ede583c97efcd0315ea06dc',
            description: '',
        },
    },
    {
        id: '5ede622146fa58038df1b3f3',
        description: 'PERSONAL SUPPLIES',
        refCategoryType: {
            id: '5ede586397efcd0315ea06e0',
            description: '',
        },
    },
    {
        id: '5ede616846fa58038df1b3e6',
        description: 'INVESTMENT INCOME',
        refCategoryType: {
            id: '5ede584397efcd0315ea06dd',
            description: '',
        },
    },
    {
        id: '5ede62a446fa58038df1b3fd',
        description: 'COLLEGE FUND',
        refCategoryType: {
            id: '5ede587397efcd0315ea06e2',
            description: '',
        },
    },
    {
        id: '5ede62f846fa58038df1b405',
        description: 'ELECTRONICS & SOFTWARE',
        refCategoryType: {
            id: '5ede587a97efcd0315ea06e3',
            description: '',
        },
    },
    {
        id: '5ede630046fa58038df1b406',
        description: 'HOBBIES',
        refCategoryType: {
            id: '5ede587a97efcd0315ea06e3',
            description: '',
        },
    },
    {
        id: '5ede630946fa58038df1b407',
        description: 'SPORTING GOODS',
        refCategoryType: {
            id: '5ede587a97efcd0315ea06e3',
            description: '',
        },
    },
    {
        id: '5ede63c346fa58038df1b414',
        description: 'LODGING',
        refCategoryType: {
            id: '5ede589997efcd0315ea06e7',
            description: '',
        },
    },
    {
        id: '5ede63cd46fa58038df1b415',
        description: 'RENTAL CAR & TAXI',
        refCategoryType: {
            id: '5ede589997efcd0315ea06e7',
            description: '',
        },
    },
    {
        id: '5ede622b46fa58038df1b3f4',
        description: 'SALON & BARBER',
        refCategoryType: {
            id: '5ede586397efcd0315ea06e0',
            description: '',
        },
    },
    {
        id: '5ede624046fa58038df1b3f6',
        description: 'PERSONAL CARE - OTHER',
        refCategoryType: {
            id: '5ede586397efcd0315ea06e0',
            description: '',
        },
    },
    {
        id: '5ede632e46fa58038df1b40b',
        description: 'PROPERTY TAX',
        refCategoryType: {
            id: '5ede588797efcd0315ea06e5',
            description: '',
        },
    },
    {
        id: '5ede638846fa58038df1b411',
        description: 'TRANSFER FOR CASH SPENDING',
        refCategoryType: {
            id: '5ede589097efcd0315ea06e6',
            description: '',
        },
    },
    {
        id: '5fab3bd2d08e63291defc8fb',
        description: 'HOME LOAN PAYMENT',
        refCategoryType: {
            id: '5ede583c97efcd0315ea06dc',
            description: '',
        },
    },
    {
        id: '5ede60b546fa58038df1b3d9',
        description: 'HEALTH & FITNESS - OTHER',
        refCategoryType: {
            id: '5ede583297efcd0315ea06db',
            description: '',
        },
    },
    {
        id: '5ede60aa46fa58038df1b3d8',
        description: 'SPORTS & RECREATION',
        refCategoryType: {
            id: '5ede583297efcd0315ea06db',
            description: '',
        },
    },
    {
        id: '5ede610546fa58038df1b3dc',
        description: 'HOME IMPROVEMENTS',
        refCategoryType: {
            id: '5ede583c97efcd0315ea06dc',
            description: '',
        },
    },
    {
        id: '5ede615646fa58038df1b3e4',
        description: 'GIFTS RECEIVED',
        refCategoryType: {
            id: '5ede584397efcd0315ea06dd',
            description: '',
        },
    },
    {
        id: '5ede636446fa58038df1b40e',
        description: 'BALANCE TRANSFER',
        refCategoryType: {
            id: '5ede589097efcd0315ea06e6',
            description: '',
        },
    },
    {
        id: '5ede610b46fa58038df1b3dd',
        description: 'HOME SERVICES',
        refCategoryType: {
            id: '5ede583c97efcd0315ea06dc',
            description: '',
        },
    },
    {
        id: '5ede611046fa58038df1b3de',
        description: 'HOME SUPPLIES',
        refCategoryType: {
            id: '5ede583c97efcd0315ea06dc',
            description: '',
        },
    },
    {
        id: '5ede627846fa58038df1b3fa',
        description: 'PET MEDICAL',
        refCategoryType: {
            id: '5ede586b97efcd0315ea06e1',
            description: '',
        },
    },
    {
        id: '5ede62b846fa58038df1b3ff',
        description: 'INVESTMENTS',
        refCategoryType: {
            id: '5ede587397efcd0315ea06e2',
            description: '',
        },
    },
    {
        id: '5ede633546fa58038df1b40c',
        description: 'SALES TAX',
        refCategoryType: {
            id: '5ede588797efcd0315ea06e5',
            description: '',
        },
    },
    {
        id: '5ede612946fa58038df1b3e0',
        description: 'RENT PAYMENT',
        refCategoryType: {
            id: '5ede583c97efcd0315ea06dc',
            description: '',
        },
    },
    {
        id: '5ede609746fa58038df1b3d7',
        description: 'PHARMACY',
        refCategoryType: {
            id: '5ede583297efcd0315ea06db',
            description: '',
        },
    },
    {
        id: '5ede614c46fa58038df1b3e3',
        description: 'FINANCIAL AID',
        refCategoryType: {
            id: '5ede584397efcd0315ea06dd',
            description: '',
        },
    },
    {
        id: '5ede626a46fa58038df1b3f9',
        description: 'PET INSURANCE',
        refCategoryType: {
            id: '5ede586b97efcd0315ea06e1',
            description: '',
        },
    },
    {
        id: '5ede639046fa58038df1b412',
        description: 'TRANSFER - OTHER',
        refCategoryType: {
            id: '5ede589097efcd0315ea06e6',
            description: '',
        },
    },
    {
        id: '5ede60e746fa58038df1b3da',
        description: 'FURNISHINGS & APPLIANCES',
        refCategoryType: {
            id: '5ede583c97efcd0315ea06dc',
            description: '',
        },
    },
    {
        id: '5ede61f546fa58038df1b3f1',
        description: 'MISC EXPENSES',
        refCategoryType: {
            id: '5ede585a97efcd0315ea06df',
            description: '',
        },
    },
    {
        id: '5ede636e46fa58038df1b40f',
        description: 'CREDIT CARD PAYMENT',
        refCategoryType: {
            id: '5ede589097efcd0315ea06e6',
            description: '',
        },
    },
    {
        id: '5ede617846fa58038df1b3e7',
        description: 'PAYCHECK',
        refCategoryType: {
            id: '5ede584397efcd0315ea06dd',
            description: '',
        },
    },
    {
        id: '5ede61da46fa58038df1b3f0',
        description: 'LOANS - OTHER',
        refCategoryType: {
            id: '5ede584d97efcd0315ea06de',
            description: '',
        },
    },
    {
        id: '5ede626446fa58038df1b3f8',
        description: 'PET GROOMING',
        refCategoryType: {
            id: '5ede586b97efcd0315ea06e1',
            description: '',
        },
    },
    {
        id: '5ede62d146fa58038df1b402',
        description: 'SAVINGS - OTHER',
        refCategoryType: {
            id: '5ede587397efcd0315ea06e2',
            description: '',
        },
    },
    {
        id: '5ede632146fa58038df1b409',
        description: 'FEDERAL TAX',
        refCategoryType: {
            id: '5ede588797efcd0315ea06e5',
            description: '',
        },
    },
    {
        id: '5ede632846fa58038df1b40a',
        description: 'LOCAL TAX',
        refCategoryType: {
            id: '5ede588797efcd0315ea06e5',
            description: '',
        },
    },
    {
        id: '5fa387caf590ae5cf7ce5084',
        description: 'STATE TAX',
        refCategoryType: {
            id: '5ede588797efcd0315ea06e5',
            description: '',
        },
    },
    {
        id: '5fa992a4d08e63291defc8f8',
        description: 'AUTO LOAN PAYMENT',
        refCategoryType: {
            id: '5ede57c997efcd0315ea06d2',
            description: '',
        },
    },
];

export const REF_TRANSACTION_TYPES: RefTransactionType[] = [
    {
        id: '5ede664746fa58038df1b422',
        description: 'EXPENSE',
    },
    {
        id: '5ede663e46fa58038df1b421',
        description: 'INCOME',
    },
    {
        id: '5ede664e46fa58038df1b423',
        description: 'TRANSFER',
    },
];

export const REF_STATUS_SELECT_OPTIONS = [
    {
        text: 'Please Select',
        value: '',
    },
    {
        text: 'ACTIVE',
        value: 'ACTIVE',
    },
    {
        text: 'CLOSED',
        value: 'CLOSED',
    },
];
