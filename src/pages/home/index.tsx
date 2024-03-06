import { Loading } from 'components/common'
import { Table } from 'components/features'
import { Hero } from 'components/layout'
import { ethers } from 'ethers'
import { useConnectWallet } from 'hooks'
import { ICitizen } from 'models/Citizen'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getAllCitizens } from 'services/blockchain'
import {
  GetAllCitizensSort,
  getCitizenNotes,
  IGetAllCitizensResponse,
  SortDirection
} from 'services/blockchain/citizensService'
import useMainStore from 'store/main'

import type { ITableColumn } from 'components/features/Table/components/TableHeader/types'
export interface ICitizensTableColumns extends ITableColumn {
  key: GetAllCitizensSort
}

const ITEMS_PER_PAGE = 10

const COLUMNS: ICitizensTableColumns[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'age',
    title: 'Age'
  },
  {
    key: 'city',
    title: 'City'
  }
]

export default function Home() {
  const connectWallet = useConnectWallet()

  const { signer, mutate } = useMainStore()

  const [page, setPage] = useState<number>(1)
  const [sortDir, setSortDir] = useState<boolean>(true)
  const [sortBy, setSortBy] = useState<GetAllCitizensSort>('id')
  const [citizens, setCitizens] = useState<IGetAllCitizensResponse>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const citizensData = useMemo(
    () => citizens?.data as IGetAllCitizensResponse['data'],
    [citizens]
  )
  const totalPages = useMemo(() => citizens?.totalPages as number, [citizens])

  const fetchCitizenNotes = useCallback(
    async (id: number) => {
      try {
        return await getCitizenNotes(id, signer as ethers.Signer)
      } catch (error) {
        return 'Error fetching notes'
      }
    },
    [signer]
  )

  const fetchCitizens = useCallback(
    async (_page: number, _sortBy: GetAllCitizensSort) => {
      setIsLoading(true)

      try {
        const direction: SortDirection = sortDir ? 'asc' : 'desc'

        const newCitizens = await getAllCitizens(
          signer as ethers.Signer,
          _page,
          ITEMS_PER_PAGE,
          _sortBy,
          direction
        )

        setCitizens(newCitizens)
      } catch (error) {
        setCitizens(undefined)
      } finally {
        setIsLoading(false)
      }
    },
    [signer, sortDir]
  )

  const showDialog = useCallback(
    async (...args: unknown[]) => {
      const citizen = args?.[0] as Omit<ICitizen, 'someNote'>

      mutate('dialog', {
        title: `Citizen ${citizen?.id}: ${citizen?.name}`,
        message: `Notes: ${await fetchCitizenNotes(citizen?.id)}`,
        type: 'info',
        persist: true
      })
    },
    [fetchCitizenNotes, mutate]
  )

  useEffect(() => {
    connectWallet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchCitizens(page, sortBy)
  }, [page, sortBy, fetchCitizens])

  if (!citizensData?.length && !isLoading) {
    return <div>No citizens found</div>
  }

  return (
    <section>
      <Hero>Citizens List</Hero>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-sm">
          <div className="card mx-auto flex w-full flex-col gap-4 bg-transparent px-4 py-8 shadow-xl">
            <Table
              columns={COLUMNS}
              data={citizensData}
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              onSortChange={(key) => {
                if (sortBy === key) setSortDir(!sortDir)
                else setSortDir(true)
                setSortBy(key)
              }}
              onClick={showDialog}
            />
          </div>
        </div>
      )}
    </section>
  )
}