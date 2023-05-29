import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {
  count: number
}

export default function TopFavouriteSkeleton({ count }: Props) {

  const elementSke = () => {
    const arr = new Array(count).fill(0)
    return arr.map((_: number, index: number) => {
      return (
        <div key={index}>
          <div className='w-[222px] h-[222px] rounded-xl'>
            <Skeleton height={'100%'} />
          </div>
          <div className='w-[222px] h-[150px] p-3 bg-gray-200'>
            <Skeleton count={3} />
          </div>
        </div>
      )
    })
  }

  return (
    <SkeletonTheme baseColor='rgb(209 213 219)'>
      <div className='flex gap-2'>
        {elementSke()}
      </div>
    </SkeletonTheme>
  )
}

