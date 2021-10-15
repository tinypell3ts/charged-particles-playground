import { useState } from 'react';
import { ethers } from 'ethers';
import { useTransactionStore } from '../stores';

type CurrentParticleCovalentBondsProps = {
    currentParticleCovalentBonds: any;
    chargedParticlesAddress: any;
};

export default function CurrentParticleCovalentBonds({
    currentParticleCovalentBonds,
    chargedParticlesAddress,
}: CurrentParticleCovalentBondsProps) {
    const [tokenId, setToken] = useState<string>();
    const [walletManagerId, setWalletManagerId] = useState<string>('generic');
    const [erc20ContractAddress, setErc20ContractAddress] = useState<string>();
    const { setTxValue } = useTransactionStore();

    async function handleCurrentParticleCovalentBonds() {
        try {
            const tx = await currentParticleCovalentBonds(
                chargedParticlesAddress,
                tokenId,
                walletManagerId,
            );
            console.log(tx);
            setTxValue(ethers.utils.formatUnits(tx, 0));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="section__wrapper">
            <input
                placeholder="enter Proton Token Id..."
                value={tokenId}
                onChange={(e) => setToken(e.target.value)}
            />
            <input
                placeholder="enter Proton Token Id..."
                value={walletManagerId}
                onChange={(e) => setWalletManagerId(e.target.value)}
            />
            <input
                placeholder="enter ERC20 contract address..."
                value={erc20ContractAddress}
                onChange={(e) => setErc20ContractAddress(e.target.value)}
            />
            <button onClick={handleCurrentParticleCovalentBonds}>
                CurrentParticleCovalentBonds
            </button>
        </div>
    );
}
