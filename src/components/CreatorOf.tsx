import { useState } from 'react';
import { useTransactionStore } from '../stores';

type CreatorOfProps = {
    creatorOf: any;
};

export default function CreatorOf({ creatorOf }: CreatorOfProps) {
    const [tokenId, setToken] = useState<string>();
    const { setTxValue } = useTransactionStore();

    async function handleCreatorOf() {
        try {
            const tx = await creatorOf(tokenId);
            console.log(tx);
            setTxValue(tx);
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
            <button onClick={handleCreatorOf}>CreatorOf</button>
        </div>
    );
}
