import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import Header from './components/Header';

import { initOnboard } from './services/onboard';
import { useWalletStore } from './stores';
import { useChargedParticlesContract, useNetwork } from './hooks';

import './App.css';

function App() {
    // CONSTANTS
    const MY_TOKEN_ID = '97';
    const ERC20_TOKEN_ADDRESS = '0x29c9eccef9f8a58882e726ea37b27bf8d6c5173f';
    const NETWORK = 'mumbai';

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

    const {
        address,
        onboard,
        setAddress,
        setNetwork,
        setBalance,
        setWallet,
        setOnboard,
    } = useWalletStore();

    const [energizeParticleValue, setEnergizeParticleValue] =
        useState<string>('');
    const [releaseParticleValue, setReleaseParticleValue] =
        useState<string>('');
    const [txHash, setTxHash] = useState<string>();
    const [txValue, setTxValue] = useState<string>();

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

    async function handleCurrentParticleCovalentBonds() {
        try {
            const tx = await currentParticleCovalentBonds(
                chargedParticlesAddress,
                MY_TOKEN_ID,
                'generic',
            );
            console.log(tx);
            setTxValue(ethers.utils.formatUnits(tx, 0));
        } catch (e) {
            console.log(e);
        }
    }
    async function handleCurrentParticleCharge() {
        try {
            const tx = await currentParticleCharge(
                chargedParticlesAddress,
                MY_TOKEN_ID,
                'generic',
                ERC20_TOKEN_ADDRESS,
            );

            const receipt = await tx.wait();
            console.log(receipt);
            setTxHash(receipt.transactionHash);
        } catch (e) {
            console.log(e);
        }
    }
    async function handleCovalentBonds() {
        try {
            const tx = await covalentBond(
                protonAddress,
                MY_TOKEN_ID,
                'generic',
                protonAddress,
                87,
            );
            const receipt = await tx.wait();
            console.log(receipt);
            setTxHash(receipt.transactionHash);
        } catch (e) {
            console.log(e);
        }
    }
    async function handleBreakCovalentBonds() {
        try {
            const tx = await breakCovalentBond(
                address,
                protonAddress,
                MY_TOKEN_ID,
                'generic',
                protonAddress,
                87,
            );
            const receipt = await tx.wait();
            console.log(receipt);
            setTxHash(receipt.transactionHash);
        } catch (e) {
            console.log(e);
        }
    }
    async function handleBaseParticlePass() {
        try {
            const tx = await baseParticleMass(
                protonAddress,
                MY_TOKEN_ID,
                'generic',
                ERC20_TOKEN_ADDRESS,
            );

            const receipt = await tx.wait();
            console.log(receipt);
            setTxHash(receipt.transactionHash);
        } catch (e) {
            console.log({ e });
        }
    }

    async function handleEnergizeParticle() {
        if (!energizeParticleValue) return;
        try {
            const tx = await energizeParticle(
                address,
                MY_TOKEN_ID,
                'generic',
                ERC20_TOKEN_ADDRESS,
                ethers.utils
                    .parseEther(energizeParticleValue.trim())
                    .toString(),
                address,
            );

            const receipt = await tx.wait();

            console.log(receipt);
            setTxHash(receipt.transactionHash);
            setEnergizeParticleValue('');
        } catch (e) {
            console.log({ e });
        }
    }

    async function handleReleaseParticleAmount() {
        if (!releaseParticleValue) return;
        try {
            const tx = await releaseParticleAmount(
                address,
                MY_TOKEN_ID,
                'generic',
                ERC20_TOKEN_ADDRESS,
                ethers.utils.parseEther(releaseParticleValue.trim()).toString(),
            );

            const receipt = await tx.wait();

            console.log(receipt);
            setTxHash(receipt.transactionHash);
            setReleaseParticleValue('');
        } catch (e) {
            console.log({ e });
        }
    }
    async function handleReleaseParticle() {
        try {
            const tx = await releaseParticle(
                address,
                MY_TOKEN_ID,
                'generic',
                ERC20_TOKEN_ADDRESS,
            );

            const receipt = await tx.wait();

            console.log(receipt);
            setTxHash(receipt.transactionHash);
        } catch (e) {
            console.log({ e });
        }
    }

    return (
        <div className="App">
            <Header />
            <button onClick={handleCurrentParticleCovalentBonds}>
                CurrentParticleCovalentBonds
            </button>
            <button onClick={handleCurrentParticleCharge}>
                CurrentParticleCharge
            </button>
            <button onClick={handleBaseParticlePass}>BaseParticleMass</button>
            <button onClick={handleCovalentBonds}>CovalentBonds</button>
            <button onClick={handleBreakCovalentBonds}>
                BreakCovalentBonds
            </button>
            <div className="Section">
                <input
                    placeholder="enter amount in ether..."
                    value={energizeParticleValue}
                    onChange={(e) => setEnergizeParticleValue(e.target.value)}
                />
                <button
                    onClick={handleEnergizeParticle}
                    disabled={!energizeParticleValue}
                >
                    EnergizeParticle
                </button>
            </div>
            <div className="Section">
                <input
                    placeholder="enter amount in ether..."
                    value={releaseParticleValue}
                    onChange={(e) => setReleaseParticleValue(e.target.value)}
                />
                <button
                    onClick={handleReleaseParticleAmount}
                    disabled={!releaseParticleValue}
                >
                    ReleaseParticleAmount
                </button>
            </div>
            <button onClick={handleReleaseParticle}>ReleaseParticle</button>
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
            <div>{txValue && <p>value: {JSON.stringify(txValue)}</p>}</div>
        </div>
    );
}

export default App;
