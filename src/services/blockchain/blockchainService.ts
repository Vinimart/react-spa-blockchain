import { ethers } from 'ethers'

const { VITE_CHAIN_ID } = import.meta.env

function verifyChainId(
  chainId: string | bigint,
  provider: ethers.BrowserProvider
) {
  if (chainId !== VITE_CHAIN_ID) {
    provider.send('wallet_switchEthereumChain', [{ chainId: VITE_CHAIN_ID }])
    throw new Error(`Please, change the select the chain ID ${VITE_CHAIN_ID}`)
  }
}

async function initializeProvider() {
  try {
    if (typeof window.ethereum !== 'undefined') {
      if (VITE_CHAIN_ID) {
        throw new Error('Chain ID not found')
      }

      const provider = new ethers.BrowserProvider(window.ethereum, 'any')

      window.ethereum.on('chainChanged', (chainId) =>
        verifyChainId(chainId as string, provider)
      )

      const signer = await provider.getSigner()
      const wallet = await signer.getAddress()

      return { provider, signer, wallet }
    }

    throw new Error('No ethereum provider found')
  } catch (error) {
    throw new Error('Error initializing provider:', error as Error)
  }
}

function initializeContract(
  address: string,
  abi: ethers.InterfaceAbi,
  signer?: ethers.Signer
) {
  try {
    if (!address || !abi || !signer) {
      throw new Error('Invalid contract parameters')
    }

    return new ethers.Contract(address, abi, signer)
  } catch (error) {
    throw new Error('Error initializing contract:', error as Error)
  }
}

export { initializeProvider, initializeContract, verifyChainId }
