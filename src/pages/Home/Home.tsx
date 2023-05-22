import React from 'react'
import Slider from './components/Slider'
import NewMusic from './components/NewMusic'

export default function Home() {
  return (
    <div className='w-full overflow-hidden px-14 mb-[90px]'>
      <Slider />
      <NewMusic />
    </div>
  )
}
