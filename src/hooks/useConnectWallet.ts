import { useCallback } from 'react'
import { initializeProvider } from 'services/blockchain'
import useMainStore from 'store/main'

export default function useConnectWallet(requestAcc = false) {
  const { mutate } = useMainStore()

  const connectToChain = useCallback(async () => {
    try {
      const { provider, signer, wallet } = await initializeProvider()

      if (requestAcc) await provider.send('eth_requestAccounts', [])

      mutate('signer', signer)
      mutate('wallet', wallet)
      mutate('provider', provider)
    } catch (error) {
      mutate('dialog', {
        title: 'Error',
        message: 'Error connecting to wallet',
        type: 'error'
      })
    }
  }, [mutate, requestAcc])

  return connectToChain
}
