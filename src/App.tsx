import react from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'

function App() {

  const routeElements = useRoutes([
    {
      path: '/',
      element: <MainLayout><Home /></MainLayout>
    },
  ])

  return (
    <div className='font-primary'>
      {routeElements}
    </div>
  )
}

export default App
