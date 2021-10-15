import { useNetwork } from '../hooks';
import { Proton__factory } from './types/contracts/factories/Proton__factory';

export default function useProtonContract(signer: any, network: string) {
    const { protonAddress } = useNetwork(network);

    const protonContract = Proton__factory.connect(protonAddress, signer);

    // createBasicProton - https://docs.charged.fi/charged-particles-protocol/developing-on-the-protocol/contracts/proton-contract#createbasicproton
    const createBasicProton: typeof protonContract.createBasicProton = async (
        creator,
        receiver,
        tokenMetaUri,
    ) => {
        const tx = await protonContract.createBasicProton(
            creator,
            receiver,
            tokenMetaUri,
        );
        return tx;
    };

    // createProton - https://docs.charged.fi/charged-particles-protocol/developing-on-the-protocol/contracts/proton-contract#createproton
    const createProton: typeof protonContract.createProton = async (
        creator,
        receiver,
        tokenMetaUri,
        annuityPercent,
    ) => {
        const tx = await protonContract.createProton(
            creator,
            receiver,
            tokenMetaUri,
            annuityPercent,
        );
        return tx;
    };

    // creatorOf - https://docs.charged.fi/charged-particles-protocol/developing-on-the-protocol/contracts/proton-contract#creatorof
    const creatorOf: typeof protonContract.creatorOf = async (tokenId) =>
        await protonContract.creatorOf(tokenId);

    return {
        createBasicProton,
        createProton,
        creatorOf,
    };
}
