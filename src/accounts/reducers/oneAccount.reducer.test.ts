import oneAccount from './oneAccount.reducer';
import {ACCOUNTS_SAMPLE_DATA} from '../../common/fixtures/accounts.sample.data';

describe('one account reducer tests', () => {
    it('returns updated account', () => {
        expect(
            oneAccount(ACCOUNTS_SAMPLE_DATA[0], {
                account: {...ACCOUNTS_SAMPLE_DATA[0], status: 'CLOSED'},
            }),
        ).toEqual({...ACCOUNTS_SAMPLE_DATA[0], status: 'CLOSED'});
    });
});
