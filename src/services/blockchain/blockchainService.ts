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
      const provider = new ethers.BrowserProvider(window.ethereum, 'any')

      window.ethereum.on('chainChanged', (chainId) =>
        verifyChainId(chainId as string, provider)
      )

      const [network, signer] = await Promise.all([
        provider.getNetwork(),
        provider.getSigner()
      ])

      const wallet = await signer.getAddress()

      console.log(
        '%cEthereum Provider',
        'background-color: #2d3748; color: #f9fafb; padding: 0.25rem 0.5rem; border-radius: 0.25rem;'
      )

      console.table({
        chainId: network.chainId,
        wallet,
        network: network.name
      })

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
    const contract = new ethers.Contract(address, abi, signer)

    console.log(
      '%cContract Initialized',
      'background-color: #2d3748; color: #f9fafb; padding: 0.25rem 0.5rem; border-radius: 0.25rem;'
    )

    console.table({
      address
    })

    return contract
  } catch (error) {
    throw new Error('Error initializing contract:', error as Error)
  }
}

export { initializeProvider, initializeContract }
