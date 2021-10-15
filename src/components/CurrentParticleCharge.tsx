import { useState } from 'react';
import { useTransactionStore } from '../stores';

type CurrentParticleChargeProps = {
    currentParticleCharge: any;
    chargedParticlesAddress: any;
};

export default function CurrentParticleCharge({
    currentParticleCharge,
    chargedParticlesAddress,
}: CurrentParticleChargeProps) {
    const [tokenId, setToken] = useState<string>();
    const [walletManagerId, setWalletManagerId] = useState<string>('generic');
    const [erc20ContractAddress, setErc20ContractAddress] = useState<string>();
    const { setTxHash } = useTransactionStore();

    async function handleCurrentParticleCharge() {
        try {
            const tx = await currentParticleCharge(
                chargedParticlesAddress,
                tokenId,
                walletManagerId,
                erc20ContractAddress,
            );

            const receipt = await tx.wait();
            console.log(receipt);
            setTxHash(receipt.transactionHash);
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
            <button onClick={handleCurrentParticleCharge}>
                CurrentParticleCharge
            </button>
        </div>
    );
}
