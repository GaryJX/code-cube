import React from 'react'
import dynamic from 'next/dynamic'
import Loading from '@/components/Loading/Loading'

const GuestEditor = dynamic(
  () => import('@/components/GuestEditor/GuestEditor'),
  {
    ssr: false,
    loading() {
      return <Loading />
    },
  }
)

const GuestEditorPage: React.FC = () => {
  return <GuestEditor />
}

export default GuestEditorPage
