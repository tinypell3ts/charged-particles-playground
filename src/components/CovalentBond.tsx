import { useState } from 'react';
import { useTransactionStore } from '../stores';

type CovalentBondProps = {
    covalentBond: any;
    protonAddress: any;
};

export default function CovalentBond({
    covalentBond,
    protonAddress,
}: CovalentBondProps) {
    const [tokenId1, setToken1] = useState<string>();
    const [tokenId2, setToken2] = useState<string>();
    const [walletManagerId, setWalletManagerId] = useState<string>('generic');
    const { setTxHash } = useTransactionStore();

    async function handleCovalentBond() {
        try {
            const tx = await covalentBond(
                protonAddress,
                tokenId1,
                walletManagerId,
                protonAddress,
                tokenId2,
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
                placeholder="enter Proton Token Id 1..."
                value={tokenId1}
                onChange={(e) => setToken1(e.target.value)}
            />
            <input
                placeholder="enter Proton Token Id 2..."
                value={tokenId2}
                onChange={(e) => setToken2(e.target.value)}
            />
            <input
                placeholder="enter Proton Token Id..."
                value={walletManagerId}
                onChange={(e) => setWalletManagerId(e.target.value)}
            />

            <button onClick={handleCovalentBond}>CovalentBond</button>
        </div>
    );
}
