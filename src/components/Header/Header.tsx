import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faGem, faGear, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { Search } from './Partials'
import { searchSong } from 'src/api/music.api'
import { SongInfor } from 'src/types/music.type'
import _ from 'lodash'

interface Props {
  darkMode: boolean
  switchDarkMode: () => void
}

export default function Header(props: Props) {
  const { darkMode, switchDarkMode } = props
  const [dataSearch, setDataSearch] = useState<SongInfor[]>([])
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false)

  const handleSearch = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      searchSong(value).then(res => {
        setDataSearch(res.data.data)
        setIsShowSearch(true)
      }).catch(err => {
        console.log(err);
      })
    } else {
      setIsShowSearch(false)
    }
  }, 500)

  return (
    <header className=' w-[calc(100%-260px)] h-20 bg-white shadow z-40 fixed top-0 dark:bg-dark
    '>
      <div className='px-6 h-full flex items-center justify-between'>
        <div className='max-w-[460px] w-full'>
          <div className='w-full relative'>
            <button className='absolute top-1/2 -translate-y-1/2 left-3 dark:text-white'><FontAwesomeIcon icon={faSearch} /></button>
            <input className='w-[100%] py-2 pl-10 pr-3 outline-none rounded-md border border-gray-300 focus:border-gradientBlue dark:border-slate-500 dark:bg-darkBlur dark:focus:border-gradientBlue dark:text-white' type="search" placeholder='Search song title, artist, genre...'
              onChange={handleSearch} />
            {isShowSearch && <Search data={dataSearch} setIsShowSearch={setIsShowSearch} />}
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full grid place-items-center bg-gray-200 cursor-pointer dark:bg-darkBlur dark:text-white'><FontAwesomeIcon icon={faGem} /></div>
          <div className='w-10 h-10 rounded-full grid place-items-center bg-gray-200 cursor-pointer dark:bg-darkBlur dark:text-white'><FontAwesomeIcon icon={faGear} /></div>
          <div>
            <button className={`bg-gray-300 h-9 w-16 px-1 rounded-full flex transition relative dark:bg-darkBlur`} onClick={switchDarkMode}>
              <div className={
                `w-7 h-7 rounded-full bg-white grid place-content-center transition-transform absolute top-1/2 -translate-y-1/2 dark:text-white dark:bg-sky-500 ${darkMode ? 'translate-x-full' : ''}`
              }><FontAwesomeIcon className='transition' icon={darkMode ? faMoon : faSun} /></div>
            </button>
          </div>
          <div className='ml-5'><button className='rounded-md px-10 py-2 bg-gradient-to-tl from-gradientPink to-gradientBlue text-white font-medium transition hover:scale-110 hover:opacity-90'>Login</button></div>
        </div>
      </div>
    </header>
  )
}
