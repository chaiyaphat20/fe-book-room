'use client'

import Loading from '@/components/custom/loading'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
type Props = {
  children: ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="">
      {children}
      <Loading />
      <ToastContainer />
    </div>
  )
}
