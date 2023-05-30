import React, { useEffect, useState } from 'react'
import Header from 'src/components/Header'
import Navigation from 'src/components/Navigation'
import Player from 'src/components/Player';

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem('darkMode')) {
      const darkModeLocal = JSON.parse(localStorage.getItem('darkMode') || 'true')
      setDarkMode(darkModeLocal)
    }
  }, [])

  const switchDarkMode = () => {
    localStorage.setItem('darkMode', JSON.stringify(!darkMode))
    setDarkMode(!darkMode)
  }
  return (
    <div className={`flex ${darkMode ? 'dark' : ''} overflow-hidden`}>
      <Navigation />
      <div className='w-screen max-w-[calc(100vw-260px)] ml-[260px]'>
        <Header darkMode={darkMode} switchDarkMode={switchDarkMode} />
        <main className='mt-20 bg-[#fafafa] w-full min-h-[calc(100vh-5rem)] dark:bg-darkDeep'>
          {children}
        </main>
      </div>
      <Player />
    </div>
  )
}
