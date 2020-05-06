import WalletUtils from './utils/wallet-utils';

const bip39 = require('bip39');
const Web3Utils = require('web3-utils');
const hdKey = require("ethereumjs-wallet/hdkey")

class Wallet {

    static createWallet = () => {
        const mnemonic = bip39.generateMnemonic();
        let path = WalletUtils.getPath('ethereum');
        return bip39.mnemonicToSeed(mnemonic).then((seed) => {
            const masterKey = hdKey.fromMasterSeed(seed);
            let masterNode = masterKey.derivePath(path);
            let wallet = masterNode.deriveChild(0).getWallet()
            return wallet; 
        }).catch((error) => {
            return Promise.reject(error);
        })
    }

}

export default Wallet;