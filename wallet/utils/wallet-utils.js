class WalletUtils {
    static getPath(walletType) {
        switch (walletType) {

            case "ethereum":
                return "m/44'/60'/0'/0/0";

            case "bitcoin":
                return "m/44'/0'/0/0";

            default:
                return "m/44'/60'/0'/0/0";
        }
    }
}

export default WalletUtils;