import React from 'react'
import LogoProMusic from '/LogoProMusic.svg'
import { Link } from "react-router-dom"
import { faMusic, faUser, faCompactDisc, faChartLine, faRadio, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { LinkBtn } from './partials'


export default function Navigation() {
  return (
    <nav className='w-[260px] h-screen bg-white shadow-md z-50 overflow-auto fixed top-0 l-0 b-0 dark:shadow-sky-900 dark:bg-dark'>
      <div className='py-2 px-6'>
        <Link to='/' className='flex flex-col items-center'>
          <img src={LogoProMusic} className='w-[120px] h-[80px] block' alt="Logo" />
          <h1 className='uppercase text-3xl font-bold text-gray-700 dark:text-white'>Pro Music</h1>
        </Link>
      </div>
      <ul className='mt-2 text-gray-500 dark:text-gray-100'>
        <li>
          <LinkBtn url='/personnaly' icon={faUser} title='Personally' />
        </li>
        <li>
          <LinkBtn url='/' icon={faCompactDisc} title='Discovery' />
        </li>
        <li>
          <LinkBtn url='/prochart' icon={faChartLine} title='#prochart' />
        </li>
        <li>
          <LinkBtn url='/radio' icon={faRadio} title='Radio' />
        </li>
        <li className='py-6 mx-6'>
          <div className=' h-[1px] bg-gray-300 dark:bg-slate-500'></div>
        </li>
        <li>
          <LinkBtn url='/newMusic' icon={faMusic} title='New Music' />
        </li>
        <li>
          <LinkBtn url='/favourite' icon={faHeart} title='Favourite' />
        </li>
        <li>
          <LinkBtn url='/topMilion' icon={faStar} title='Top 100' />
        </li>
      </ul>
      <div className='px-6 mt-5'>
        <div className='rounded-md px-5 py-4 bg-gradient-to-tl from-gradientPink to-gradientBlue text-white font-medium text-center'>
          <h3 className='text-sm'>Sign in to discover music just for you</h3>
          <button className='px-8 py-1 mt-3 border border-white rounded-md hover:opacity-80' type='button'>Login</button>
        </div>
      </div>
    </nav >
  )
}
