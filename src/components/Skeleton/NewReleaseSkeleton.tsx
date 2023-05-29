import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {
  count: number
}

export default function NewReleaseSkeleton({ count }: Props) {

  const elementSke = () => {
    const arr = new Array(count).fill(0)
    return arr.map((_: number, index: number) => {
      return (
        <div key={index} className='flex items-center gap-2 p-2'>
          <div className='h-12 w-12'>
            <Skeleton height={'100%'} />
          </div>
          <div className='flex-1'>
            <Skeleton count={2} />
          </div>
        </div>
      )
    })
  }

  return (
    <SkeletonTheme baseColor='rgb(209 213 219)'>
      {elementSke()}
    </SkeletonTheme>
  )
}
