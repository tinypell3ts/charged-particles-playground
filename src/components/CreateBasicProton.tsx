import { useState } from 'react';
import { useTransactionStore } from '../stores';

type CreateBasicProtonProps = {
    createBasicProton: any;
};

export default function CreateBasicProton({
    createBasicProton,
}: CreateBasicProtonProps) {
    const [creator, setCreator] = useState<string>();
    const [receiver, setReceiver] = useState<string>();
    const [tokenMetaUri, setTokenMetaUri] = useState<string>();
    const { setTxHash } = useTransactionStore();

    async function handleCreateBasicProton() {
        try {
            const tx = await createBasicProton(creator, receiver, tokenMetaUri);
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
                placeholder="enter creator address..."
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
            />
            <input
                placeholder="enter receiver address..."
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
            />
            <input
                placeholder="enter metadata URI, eg IPFS://"
                value={tokenMetaUri}
                onChange={(e) => setTokenMetaUri(e.target.value)}
            />

            <button onClick={handleCreateBasicProton}>CreateBasicProton</button>
        </div>
    );
}
