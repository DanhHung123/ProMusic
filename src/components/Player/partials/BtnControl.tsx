import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface Props {
  addClass?: string
  icon: IconDefinition
  onClick?: () => void
  title?: string
}

function BtnControl({ icon, addClass, onClick, title }: Props) {
  return (
    <div className='relative'>
      <button className={`peer rounded-full h-9 w-9 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-300/40 ${addClass}`}
        type='button'
        onClick={onClick}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
      {
        title !== undefined ?
          <span className='absolute -top-9 left-1/2 -translate-x-1/2 text-xs px-2 py-1 w-fit whitespace-nowrap bg-gray-300 rounded-md z-50 hidden peer-hover:block text-black'>
            {title}
            <span className=' block bg-inherit w-4 h-4 rounded rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 -z-20'></span>
          </span>
          : ''
      }
    </div>
  )
}

export default memo(BtnControl)