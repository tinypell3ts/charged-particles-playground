import { useNetwork } from '../hooks';
import { BigNumberish } from '@ethersproject/bignumber';
import { Proton__factory } from './types/contracts/factories/Proton__factory';
import { ERC20__factory } from './types/contracts/factories/ERC20__factory';

export default function useContractUtils(signer: any) {
    const { protonAddress } = useNetwork('mumbai');
    const protonContract = Proton__factory.connect(protonAddress, signer);

    const getApprovedProton: typeof protonContract.getApproved = async (
        nftTokenId,
    ) => {
        const tx = await protonContract.getApproved(nftTokenId);

        return tx;
    };

    const approveProton: typeof protonContract.approve = async (
        to: string,
        nftTokenId: BigNumberish,
    ) => {
        const approvalTx = await protonContract.approve(to, nftTokenId);

        return approvalTx;
    };

    // Generic ERC20 Approval
    const approveERC20 = async (
        contractAddress: string,
        spenderAddress: string,
        ownerAddress: string,
    ) => {
        const ERC20Contract = ERC20__factory.connect(contractAddress, signer);
        const hasAllowance = await ERC20Contract.allowance(
            ownerAddress,
            spenderAddress,
        );

        if (hasAllowance) return;

        const approvalTx = await ERC20Contract.approve(
            spenderAddress,
            '115792089237316195423570985008687907853269984665640564039457584007913129639935',
        );

        return approvalTx;
    };

    return { approveProton, getApprovedProton, approveERC20 };
}
