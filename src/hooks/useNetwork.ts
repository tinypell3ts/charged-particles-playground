import mumbaiNetwork from '@charged-particles/protocol-subgraph/networks/mumbai.json';
import kovanNetwork from '@charged-particles/protocol-subgraph/networks/kovan.json';
import mainnetNetwork from '@charged-particles/protocol-subgraph/networks/mainnet.json';
import polygonNetwork from '@charged-particles/protocol-subgraph/networks/polygon.json';

export default function useNetwork(network: string) {
    let protonAddress;
    let chargedParticlesAddress;
    let chargedStateAddress;
    let genericBasketManagerAddress;

    switch (network) {
        case 'mumbai':
            protonAddress = mumbaiNetwork.proton.address;
            chargedParticlesAddress = mumbaiNetwork.chargedParticles.address;
            chargedStateAddress = mumbaiNetwork.chargedState.address;
            genericBasketManagerAddress =
                mumbaiNetwork.genericBasketManager.address;
            break;

        case 'kovan':
            protonAddress = kovanNetwork.proton.address;
            chargedParticlesAddress = kovanNetwork.chargedParticles.address;
            chargedStateAddress = kovanNetwork.chargedState.address;
            genericBasketManagerAddress =
                kovanNetwork.genericBasketManager.address;
            break;
        case 'mainnet':
            protonAddress = mainnetNetwork.proton.address;
            chargedParticlesAddress = mainnetNetwork.chargedParticles.address;
            chargedStateAddress = mainnetNetwork.chargedState.address;
            genericBasketManagerAddress =
                mainnetNetwork.genericBasketManager.address;
            break;
        case 'polygon':
            protonAddress = polygonNetwork.proton.address;
            chargedParticlesAddress = polygonNetwork.chargedParticles.address;
            chargedStateAddress = polygonNetwork.chargedState.address;
            genericBasketManagerAddress =
                polygonNetwork.genericBasketManager.address;
            break;
        default:
            throw new Error('Invalid network.');
    }

    return {
        protonAddress,
        chargedParticlesAddress,
        chargedStateAddress,
        genericBasketManagerAddress,
    };
}
