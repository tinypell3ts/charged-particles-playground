import { useState } from 'react';
import { ethers } from 'ethers';
import { useTransactionStore } from '../stores';

type ReleaseParticleAmountProps = {
    releaseParticleAmount: any;
};

export default function ReleaseParticleAmount({
    releaseParticleAmount,
}: ReleaseParticleAmountProps) {
    const [receiver, setReceiver] = useState<string>();
    const [tokenId1, setToken1] = useState<string>();
    const [walletManagerId, setWalletManagerId] = useState<string>('generic');
    const [erc20ContractAddress, setErc20ContractAddress] = useState<string>();
    const [value, setValue] = useState<string>('');
    const { setTxHash } = useTransactionStore();

    async function handleReleaseParticleAmount() {
        try {
            const tx = await releaseParticleAmount(
                receiver,
                tokenId1,
                walletManagerId,
                erc20ContractAddress,
                ethers.utils.parseEther(value.trim()).toString(),
            );

            const receipt = await tx.wait();

            console.log(receipt);
            setTxHash(receipt.transactionHash);
            setValue('');
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
            <input
                placeholder="enter energize value in ether..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <button onClick={handleReleaseParticleAmount}>
                ReleaseParticleAmount
            </button>
        </div>
    );
}
