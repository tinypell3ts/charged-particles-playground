// Network Name
const NETWORK = process.env.NETWORK_NAME || 'mumbai';

// Proton token IDs
const PROTON_TOKEN_ID_1 = 97;
const PROTON_TOKEN_ID_2 = 87;

// Generic ERC20 Token Address
const ERC20_TOKEN_ADDRESS = '0x29c9eccef9f8a58882e726ea37b27bf8d6c5173f';

// Wallet Manager ID - https://docs.charged.fi/charged-particles-protocol/developing-on-the-protocol/contracts/smart-contracts-documentation#wallet-basket-manager-ids
const WALLET_MANAGER_ID = 'generic';

export {
    ERC20_TOKEN_ADDRESS,
    NETWORK,
    PROTON_TOKEN_ID_1,
    PROTON_TOKEN_ID_2,
    WALLET_MANAGER_ID,
};
