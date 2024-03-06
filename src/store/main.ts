import { ethers } from 'ethers'
import { create } from 'zustand'

interface MainStore {
  wallet: ethers.AddressLike | null
  provider: ethers.BrowserProvider | null
  signer: ethers.Signer | null
  dialog: {
    title: string
    message: string
    type: 'success' | 'error' | 'info'
    persist?: boolean
  } | null
}

interface MainStoreActions {
  mutate: <K extends keyof MainStore>(key: K, value: MainStore[K]) => void
}

const useMainStore = create<MainStore & MainStoreActions>((set) => ({
  signer: null,
  wallet: null,
  dialog: null,
  provider: null,

  mutate: (key, value) => set({ [key]: value })
}))

export default useMainStore
