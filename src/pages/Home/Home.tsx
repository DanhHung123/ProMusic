import { NewMusic, Slider, TopFavourite } from './components'

export default function Home() {
  return (
    <div className='w-full overflow-hidden px-14 pb-[120px]'>
      <Slider />
      <NewMusic />
      <TopFavourite />
    </div>
  )
}
