
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { memo } from 'react'

interface Props {
  idMv: string
  handleShowMv: () => void
}

function Mv({ idMv, handleShowMv }: Props) {

  return (
    <div className='w-screen h-screen bg-gray-300/80 fixed top-0 left-0 bottom-0 right-0 translate-y-full transition-transform animate-vertical z-50'>
      <div className='w-full h-full grid place-items-center z-50'>
        <div className=' w-fit h-fit fixed top-8 right-10'>
          <button className='bg-sky-500 w-10 h-10 rounded-full text-white' type='button' onClick={handleShowMv}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
        <div className='w-3/4 h-3/4'>
          <iframe width='100%' height='100%' src={`https://www.youtube.com/embed/${idMv}`} title="YouTube video player" frameBorder='0' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  )
}
export default memo(Mv)