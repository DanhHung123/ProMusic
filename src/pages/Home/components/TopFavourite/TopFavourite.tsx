import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEye, faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { useCheckMatchCurrentSong, usePLayASong } from 'src/hooks'
import { useQuery } from 'react-query'
import { getTopFavourite } from 'src/api/music.api'
import { SongInfor } from 'src/types/music.type'
import { formatNumber } from 'src/utils/functionConst'
import { TopFavouriteSkeleton } from 'src/components/Skeleton'
import sound from 'src/assets/sound.svg'

const PAGE = 1;
const LIMIT = 20;

export default function TopFavourite() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      breakpoints: {
        "(min-width: 400px)": {
          slides: { perView: 2, spacing: 5 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 6, spacing: 5 },
        },
      },
      slides: { perView: 1 }
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2500)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  const { data, isLoading } = useQuery({
    queryKey: ['TopFavourite', LIMIT, PAGE],
    queryFn: () => getTopFavourite(LIMIT, PAGE),
    staleTime: Infinity //4 * (60 * 1000)
  })

  const { handlePLaySong } = usePLayASong()

  const { checkMatchCurrentSong } = useCheckMatchCurrentSong()

  return (
    <section className='w-full overflow-hidden mt-5'>
      <h3 className='text-2xl font-semibold dark:text-white'>Top Favourite</h3>
      {
        !isLoading ?
          <div ref={sliderRef} className="keen-slider py-6">
            {
              data?.data.data.map((song: SongInfor, _, list) => {
                return (
                  <div className="keen-slider__slide group" key={song._id}>
                    <div className='bg-gray-200 rounded-xl dark:bg-slate-900 dark:text-white'>
                      <div className='relative'>
                        <img className='w-full h-[222px] object-cover rounded-xl' src={song.image_music} alt="slider" />
                        <div className='bg-gray-800/70 w-fit h-fit px-2 py-1 text-white rounded-lg text-sm absolute top-2 right-2'>
                          {song.time_format}
                        </div>
                        {
                          !checkMatchCurrentSong(song._id) ?
                            <button className='w-full h-full absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center text-5xl text-white bg-gray-600/50 rounded-xl invisible group-hover:visible'
                              onClick={() => handlePLaySong(song._id, list)}>
                              <FontAwesomeIcon icon={faCirclePlay} />
                            </button>
                            :
                            <div className='w-full h-full absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center text-5xl text-white bg-gray-600/50 rounded-xl'
                            >
                              <img className='w-1/2 h-1/2' src={sound} alt="sound icon" />
                            </div>
                        }
                      </div>
                      <div className='w-full h-full p-3'>
                        <h4 className='line-clamp-1 font-medium'>{song.name_music}</h4>
                        <p className='line-clamp-1 text-sm font-normal text-sky-500'>{song.name_singer}</p>
                        <p className='text-sm mt-2 text-gray-500'>
                          <i className='mr-2'><FontAwesomeIcon icon={faHeart} /></i>
                          {formatNumber(song.view)} view
                        </p>
                        <p className='text-sm mt-2 text-gray-500'>
                          <i className='mr-2'><FontAwesomeIcon icon={faEye} /></i>
                          {formatNumber(song.favorite)} favorite
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          :
          <>
            <TopFavouriteSkeleton count={6} />
          </>
      }
    </section>
  )
}
