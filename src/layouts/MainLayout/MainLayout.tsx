import React, { useState } from 'react'
import Header from 'src/components/Header'
import Navigation from 'src/components/Navigation'
import Player from 'src/components/Player';

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const switchDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <div className={`flex ${darkMode ? 'dark' : ''}`}>
      <Navigation />
      <div className='flex-1'>
        <Header darkMode={darkMode} switchDarkMode={switchDarkMode} />
        <main className='mt-20 bg-[#fafafa] min-h-[calc(100vh-5rem)] dark:bg-darkDeep'>
          {children}
        </main>
      </div>
      <Player />
    </div>
  )
}
