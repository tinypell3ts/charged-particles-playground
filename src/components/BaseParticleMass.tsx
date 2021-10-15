import { useState } from 'react';
import { useTransactionStore } from '../stores';

type BaseParticleMassProps = {
    baseParticleMass: any;
    protonAddress: any;
};

export default function BaseParticleMass({
    baseParticleMass,
    protonAddress,
}: BaseParticleMassProps) {
    const [tokenId, setToken] = useState<string>();
    const [walletManagerId, setWalletManagerId] = useState<string>('generic');
    const [erc20ContractAddress, setErc20ContractAddress] = useState<string>();
    const { setTxHash } = useTransactionStore();

    async function handleBaseParticleMass() {
        try {
            const tx = await baseParticleMass(
                protonAddress,
                tokenId,
                walletManagerId,
                erc20ContractAddress,
            );

            const receipt = await tx.wait();
            console.log(receipt);
            setTxHash(receipt.transactionHash);
        } catch (e) {
            console.log({ e });
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
            <button onClick={handleBaseParticleMass}>BaseParticleMass</button>
        </div>
    );
}
