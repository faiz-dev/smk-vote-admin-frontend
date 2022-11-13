import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Sidebar from './template/Sidebar'
import Header from './template/Header'
import PageToolbar from './template/components/PageToolbar'
import Card from './template/components/Card'
import Buttons from './template/components/Buttons'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDrawer } from './features/layouterSlice'
import { Outlet } from 'react-router-dom'
import { PrimaryButton } from './components/Button'
import { setToken } from './slicers/authSlice'

function App() {
  const [count, setCount] = useState(0)
  const isDrawerOpen = useSelector((state) => state.layout.drawerOpen )
  const token = useSelector(state=> state.auth.token)
  const dispatch = useDispatch()

  return (
    <>
      <div className="App lg:flex">
        <Sidebar />
        <div className='content flex-1 flex flex-col bg-preset w-screen'>
          <Header />
          <main className='flex-1 rounded-t-xl p-5 px-8'>
            <PageToolbar />
            <Outlet />
          </main>
        </div>
        
      </div>
      <div id='overlay' className={`${isDrawerOpen ? 'draweroverlay' : ''} lg:hidden`} onClick={() => dispatch(toggleDrawer(false))}></div>
    </>
  )
}

export default App
