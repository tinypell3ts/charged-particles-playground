import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import {
    BaseParticleMass,
    BreakCovalentBond,
    CovalentBond,
    CreatorOf,
    CurrentParticleCharge,
    CurrentParticleCovalentBonds,
    EnergizeParticle,
    Header,
    ReleaseParticle,
    ReleaseParticleAmount,
} from './components';

import { initOnboard } from './services/onboard';
import { useWalletStore, useTransactionStore } from './stores';
import { useChargedParticlesContract, useNetwork, useProton } from './hooks';

import './App.css';

function App() {
    const NETWORK = process.env.NETWORK_NAME || 'mumbai';

    const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum,
    );
    const signer = provider.getSigner();

    const { chargedParticlesAddress, protonAddress } = useNetwork(NETWORK);
    const {
        baseParticleMass,
        breakCovalentBond,
        covalentBond,
        currentParticleCharge,
        currentParticleCovalentBonds,
        energizeParticle,
        releaseParticle,
        releaseParticleAmount,
    } = useChargedParticlesContract(signer, NETWORK);

    const { creatorOf } = useProton(signer, NETWORK);

    const {
        onboard,
        setAddress,
        setNetwork,
        setBalance,
        setWallet,
        setOnboard,
    } = useWalletStore();

    const { txHash, txValue } = useTransactionStore();

    useEffect(() => {
        const onboard = initOnboard({
            address: setAddress,
            network: setNetwork,
            balance: setBalance,
            wallet: (wallet: any) => {
                if (wallet.provider) {
                    setWallet(wallet);
                    window.localStorage.setItem('selectedWallet', wallet.name);
                } else {
                    setWallet();
                }
            },
        });

        setOnboard(onboard);
    }, []);

    useEffect(() => {
        const previouslySelectedWallet =
            window.localStorage.getItem('selectedWallet');

        if (previouslySelectedWallet && onboard) {
            readyToTransact(previouslySelectedWallet);
        }
    }, [onboard]);

    async function readyToTransact(previouslySelectedWallet: any) {
        if (onboard) {
            await onboard.walletSelect(previouslySelectedWallet);
            await onboard.walletCheck();
        }
    }

    return (
        <div className="app">
            <Header />
            <div className="section">
                <h1>Charged Particles Contract</h1>
                <BaseParticleMass
                    protonAddress={protonAddress}
                    baseParticleMass={baseParticleMass}
                />
                <BreakCovalentBond
                    protonAddress={protonAddress}
                    breakCovalentBond={breakCovalentBond}
                />
                <CovalentBond
                    protonAddress={protonAddress}
                    covalentBond={covalentBond}
                />
                <CurrentParticleCharge
                    chargedParticlesAddress={chargedParticlesAddress}
                    currentParticleCharge={currentParticleCharge}
                />
                <CurrentParticleCharge
                    chargedParticlesAddress={chargedParticlesAddress}
                    currentParticleCharge={currentParticleCharge}
                />
                <CurrentParticleCovalentBonds
                    chargedParticlesAddress={chargedParticlesAddress}
                    currentParticleCovalentBonds={currentParticleCovalentBonds}
                />
                <EnergizeParticle
                    protonAddress={protonAddress}
                    energizeParticle={energizeParticle}
                />
                <ReleaseParticle releaseParticle={releaseParticle} />
                <ReleaseParticleAmount
                    releaseParticleAmount={releaseParticleAmount}
                />
            </div>
            <div className="section">
                <h1>Proton Contract</h1>
                <div className="section__wrapper">
                    <CreatorOf creatorOf={creatorOf} />
                </div>
            </div>
            <div>
                {txHash && (
                    <>
                        <span>Success! - </span>
                        <a
                            target="_blank"
                            href={`https://mumbai.polygonscan.com/tx/${txHash}`}
                        >
                            See Transaction
                        </a>
                    </>
                )}
            </div>
            {txValue && <p>value: {JSON.stringify(txValue)}</p>}
        </div>
    );
}

export default App;
