import create from 'zustand';

type WalletState = {
    txHash: string;
    txValue: string;
    setTxHash: (item?: string) => void;
    setTxValue: (item: string) => void;
    resetWallet: () => void;
};

export default create<WalletState>((set: any) => ({
    txHash: '',
    txValue: '',
    setTxHash: (item) => set({ txHash: item }),
    setTxValue: (item) => set({ txValue: item }),
    resetWallet: () => set({ txHash: '', txValue: '' }),
}));
