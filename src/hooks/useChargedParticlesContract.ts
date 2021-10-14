import { useNetwork, useContractUtils } from '../hooks';
import { BigNumberish } from '@ethersproject/bignumber';
import { ChargedParticles__factory } from './types/contracts/factories/ChargedParticles__factory';

export default function useGenericBasketManagerContract(signer: any) {
    const { chargedParticlesAddress, protonAddress } = useNetwork('mumbai');
    const { approveProton, approveERC20 } = useContractUtils(signer);

    const chargedParticlesContract = ChargedParticles__factory.connect(
        chargedParticlesAddress,
        signer,
    );

    // currentParticleCharge - https://docs.charged.fi/charged-particles-protocol/developing-on-the-protocol/contracts/smart-contracts-documentation#currentparticlecharge
    const currentParticleCharge: typeof chargedParticlesContract.currentParticleCharge =
        async (contractAddress, tokenId, walletManagerId, assetToken) => {
            const tx = await chargedParticlesContract.currentParticleCharge(
                contractAddress,
                tokenId,
                walletManagerId,
                assetToken,
            );
            return tx;
        };

    // currentParticleCovalentBonds - https://docs.charged.fi/charged-particles-protocol/developing-on-the-protocol/contracts/smart-contracts-documentation#currentparticlecovalentbonds
    const currentParticleCovalentBonds: typeof chargedParticlesContract.currentParticleCovalentBonds =
        async (contractAddress, tokenId, walletManagerId) => {
            const value =
                await chargedParticlesContract.currentParticleCovalentBonds(
                    contractAddress,
                    tokenId,
                    walletManagerId,
                );

            return value;
        };

    // covalentBond - https://docs.charged.fi/charged-particles-protocol/developing-on-the-protocol/contracts/smart-contracts-documentation#covalentbond
    const covalentBond: typeof chargedParticlesContract.covalentBond = async (
        contractAddress: string,
        tokenId: number,
        basketManagerId: string,
        nftTokenAddress: string,
        nftTokenId: number,
    ) => {
        await approveProton(chargedParticlesAddress, nftTokenId, signer);

        const tx = await chargedParticlesContract.covalentBond(
            contractAddress,
            tokenId,
            basketManagerId,
            nftTokenAddress,
            nftTokenId,
        );

        return tx;
    };

    // breakCovalentBond - https://docs.charged.fi/charged-particles-protocol/developing-on-the-protocol/contracts/smart-contracts-documentation#breakcovalentbond
    const breakCovalentBond: typeof chargedParticlesContract.breakCovalentBond =
        async (
            receiver: string,
            contractAddress: string,
            tokenId: number,
            basketManagerId: string,
            nftTokenAddress: string,
            nftTokenId: number,
        ) => {
            const tx = await chargedParticlesContract.breakCovalentBond(
                receiver,
                contractAddress,
                tokenId,
                basketManagerId,
                nftTokenAddress,
                nftTokenId,
            );

            return tx;
        };

    // baseParticleMass - https://docs.charged.fi/charged-particles-protocol/developing-on-the-protocol/contracts/smart-contracts-documentation#baseparticlemass
    const baseParticleMass: typeof chargedParticlesContract.baseParticleMass =
        async (
            contractAddress: string,
            tokenId: number,
            walletManagerId: string,
            assetToken: string,
        ) => {
            const tx = await chargedParticlesContract.baseParticleMass(
                contractAddress,
                tokenId,
                walletManagerId,
                assetToken,
            );

            return tx;
        };
    // energizeParticle - https://docs.charged.fi/charged-particles-protocol/developing-on-the-protocol/contracts/smart-contracts-documentation#energizeparticle
    const energizeParticle = async (
        address: string,
        tokenId: BigNumberish,
        walletManagerId: string,
        assetToken: string,
        assetAmount: BigNumberish,
        referrer: string,
    ) => {
        await approveERC20(assetToken, chargedParticlesAddress, address);

        const tx = await chargedParticlesContract.energizeParticle(
            protonAddress,
            tokenId,
            walletManagerId,
            assetToken,
            assetAmount,
            referrer,
        );
        return tx;
    };

    // releaseParticle - https://docs.charged.fi/charged-particles-protocol/developing-on-the-protocol/contracts/smart-contracts-documentation#release-particles
    const releaseParticle = async (
        address: string,
        tokenId: BigNumberish,
        walletManagerId: string,
        assetToken: string,
    ) => {
        const tx = await chargedParticlesContract.releaseParticle(
            address,
            protonAddress,
            tokenId,
            walletManagerId,
            assetToken,
        );
        return tx;
    };

    // releaseParticleAmount - https://docs.charged.fi/charged-particles-protocol/developing-on-the-protocol/contracts/smart-contracts-documentation#releaseparticleamount
    const releaseParticleAmount = async (
        address: string,
        tokenId: BigNumberish,
        walletManagerId: string,
        assetToken: string,
        assetAmount: BigNumberish,
    ) => {
        const tx = await chargedParticlesContract.releaseParticleAmount(
            address,
            protonAddress,
            tokenId,
            walletManagerId,
            assetToken,
            assetAmount,
        );
        return tx;
    };

    return {
        baseParticleMass,
        breakCovalentBond,
        covalentBond,
        currentParticleCharge,
        currentParticleCovalentBonds,
        energizeParticle,
        releaseParticle,
        releaseParticleAmount,
    };
}
