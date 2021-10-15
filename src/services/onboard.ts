import Onboard from 'bnc-onboard';

const networkId = parseInt(process.env.NETWORK_ID || '80001', 10);
const networkName = process.env.NETWORK_NAME || 'mumbai';
const dappId = process.env.ONBOARD_JS_API_KEY;

export function initOnboard(subscriptions: any) {
    return Onboard({
        dappId,
        hideBranding: true,
        networkId,
        networkName,
        darkMode: false,
        subscriptions,
        walletSelect: {
            wallets: [{ walletName: 'metamask' }],
        },
        walletCheck: [
            { checkName: 'connect' },
            { checkName: 'accounts' },
            { checkName: 'network' },
        ],
    });
}
