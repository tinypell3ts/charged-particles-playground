import { useState } from 'react';
import { ethers } from 'ethers';
import { useTransactionStore } from '../stores';

type EnergizeParticleProps = {
    energizeParticle: any;
    protonAddress: any;
};

export default function EnergizeParticle({
    energizeParticle,
    protonAddress,
}: EnergizeParticleProps) {
    const [tokenId1, setToken1] = useState<string>();
    const [walletManagerId, setWalletManagerId] = useState<string>('generic');
    const [erc20ContractAddress, setErc20ContractAddress] = useState<string>();
    const [value, setValue] = useState<string>('');
    const { setTxHash } = useTransactionStore();

    async function handleEnergizeParticle() {
        try {
            const tx = await energizeParticle(
                protonAddress,
                tokenId1,
                walletManagerId,
                erc20ContractAddress,
                ethers.utils.parseEther(value.trim()).toString(),
                protonAddress,
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

            <button onClick={handleEnergizeParticle}>EnergizeParticle</button>
        </div>
    );
}
