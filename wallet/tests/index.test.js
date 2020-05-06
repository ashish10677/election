import Wallet from '../index';
import Web3Utils from 'web3-utils';

test('Creates an ethereum wallet', () => {
    return Wallet.createWallet().then((wallet) => {
        expect(Web3Utils.isAddress(`0x${wallet.getAddress().toString('hex')}`)).toBe(true);
    })
})