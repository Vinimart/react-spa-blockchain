import { memo } from 'react'

import { Dialog, Navbar } from '../'

import type { IMainLayoutProps } from './types'

function Main({ children }: IMainLayoutProps) {
  return (
    <main className="h-screen">
      <Navbar />
      {children}
      <Dialog />
    </main>
  )
}

export default memo(Main)
