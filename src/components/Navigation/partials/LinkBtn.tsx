import React from 'react'
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface Props {
  icon: IconDefinition
  title: string
  url: string
}

const beforeNavClass = 'bg-slate-100 text-sky-400 dark:bg-darkBlur before:absolute before:top-0 before:bottom-0 before:left-0 before:h-full before:w-1 before:bg-gradient-to-t before:from-gradientPink before:to-gradientBlue'

export default function LinkBtn({ icon, title, url }: Props) {
  return (
    <NavLink to={url} className={({ isActive }) => `px-6 py-2 text-base font-medium flex items-center relative hover:text-gradientBlue ${isActive ? beforeNavClass : ''}`}>
      <span className='mr-3 text-xl'><FontAwesomeIcon icon={icon} /></span>
      {title}
    </NavLink>
  )
}
