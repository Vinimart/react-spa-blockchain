import CitizensABI from 'assets/ABI/CitizensABI.json'
import { parseBigIntJson } from 'utils'

import { initializeContract } from './blockchainService'

import type { MetaMaskInpageProvider } from '@metamask/providers'
import type { ICitizen } from 'models/Citizen'
import type { LogDescription, Signer } from 'ethers'

const { VITE_CITIZENS_CONTRACT_ADDRESS: address } = import.meta.env

export type SortDirection = 'asc' | 'desc'
export type GetAllCitizensSort = keyof Omit<ICitizen, 'someNote'>

export interface IGetAllCitizensResponse {
  data: Omit<ICitizen, 'someNote'>[]
  totalPages: number
  nextPage: number
  previousPage: number
}

export interface AddCitizenForm extends Omit<ICitizen, 'id'> {}

export interface AddCitizenFormProps extends AddCitizenForm {
  signer: Signer
}

async function getAllCitizens(
  signer: Signer,
  page: number = 1,
  maxPageSize: number = 15,
  sortBy?: GetAllCitizensSort,
  sortDirection: SortDirection = 'asc'
): Promise<IGetAllCitizensResponse> {
  const citizensContract = initializeContract(address, CitizensABI, signer)

  const events = await citizensContract.queryFilter(
    citizensContract.filters.Citizen()
  )

  const totalEvents = events?.length
  const totalPages = Math.ceil(totalEvents / maxPageSize)

  const sortedEvents = sortBy
    ? events.slice().sort((a, b) => {
        const parsedEventA = citizensContract.interface.parseLog(
          a
        ) as unknown as LogDescription
        const parsedEventB = citizensContract.interface.parseLog(
          b
        ) as unknown as LogDescription

        const valueA = parsedEventA.args[sortBy]
        const valueB = parsedEventB.args[sortBy]

        if (sortDirection === 'asc') {
          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0
        } else {
          return valueA > valueB ? -1 : valueA < valueB ? 1 : 0
        }
      })
    : events

  const startIndex = (page - 1) * maxPageSize
  const endIndex = Math.min(startIndex + maxPageSize, totalEvents)

  const citizens = []

  for (let i = startIndex; i < endIndex; i++) {
    const parsedEvent = citizensContract.interface.parseLog(
      sortedEvents[i]
    ) as unknown as LogDescription

    const [citizenId, citizenAge, citizenCity, citizenName] = parsedEvent.args

    const citizen = {
      id: Number(citizenId),
      age: Number(citizenAge),
      city: citizenCity?.hash,
      name: citizenName
    }

    citizens.push(citizen)
  }

  return {
    data: parseBigIntJson(citizens),
    totalPages: totalPages,
    nextPage: page < totalPages ? page + 1 : 0,
    previousPage: page > 1 ? page - 1 : 0
  }
}

async function addCitizen({
  age,
  city,
  name,
  someNote,
  signer
}: AddCitizenFormProps): Promise<void> {
  try {
    await (window.ethereum as MetaMaskInpageProvider).request({
      method: 'eth_requestAccounts'
    })

    const citizensContract = await initializeContract(
      address,
      CitizensABI,
      signer
    )

    await citizensContract.addCitizen(age, city, name, someNote)
  } catch (error) {
    throw new Error('Error sending transaction:', error as Error)
  }
}

async function getCitizenNotes(id: number, signer: Signer): Promise<string> {
  const citizensContract = initializeContract(address, CitizensABI, signer)
  const citizenNotes = await citizensContract.getNoteByCitizenId(id)

  return citizenNotes
}

export { getAllCitizens, getCitizenNotes, addCitizen }
