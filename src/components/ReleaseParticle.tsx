import { useState } from 'react';
import { useTransactionStore } from '../stores';

type ReleaseParticleProps = {
    releaseParticle: any;
};

export default function ReleaseParticle({
    releaseParticle,
}: ReleaseParticleProps) {
    const [receiver, setReceiver] = useState<string>();
    const [tokenId1, setToken1] = useState<string>();
    const [walletManagerId, setWalletManagerId] = useState<string>('generic');
    const [erc20ContractAddress, setErc20ContractAddress] = useState<string>();
    const { setTxHash } = useTransactionStore();

    async function handleReleaseParticle() {
        try {
            const tx = await releaseParticle(
                receiver,
                tokenId1,
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
                placeholder="enter receiver address..."
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
            />
            <input
                placeholder="enter Proton Token Id 1..."
                value={tokenId1}
                onChange={(e) => setToken1(e.target.value)}
            />
            <input
                placeholder="enter wallet manager id..."
                value={walletManagerId}
                onChange={(e) => setWalletManagerId(e.target.value)}
            />
            <input
                placeholder="enter ERC20 contract address..."
                value={erc20ContractAddress}
                onChange={(e) => setErc20ContractAddress(e.target.value)}
            />

            <button onClick={handleReleaseParticle}>ReleaseParticle</button>
        </div>
    );
}
