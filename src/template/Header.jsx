import React from "react";
import { CiUser, CiLogout, CiSettings, CiBurger } from "react-icons/ci"
import { FcMenu } from 'react-icons/fc'
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../features/layouterSlice";


const Header = () => {
    const dispatch = useDispatch()
    const drawerState = useSelector((state) => state.layout.drawerOpen)

    const menu = [
        { path: '/', text: 'Dashboards', isActive: true},
        { path: '/', text: 'Pages', isActive: false},
        { path: '/', text: 'Apps', isActive: false},
        { path: '/', text: 'Layouts', isActive: false},
        { path: '/', text: 'Help', isActive: false},
    ]

    const toolbarButtons = [
        {icon: <CiUser size={25} />},
        {icon: <CiSettings size={25} />},
        {icon: <CiLogout size={25} />}
    ]

    return (
        <header className='flex border-b pl-5 '>
            <button className="btn lg:hidden" onClick={() => dispatch(toggleDrawer(!drawerState))}><FcMenu size={20} /> {drawerState}</button>
            <nav className='TopNav flex items-center gap-4 text-sm flex-1 text-black text-menu'>
                {menu.map(m => (
                    <a href={m.path} key={'tn-'+m.text} className={`hover:text-accent flex items-center h-full font-normal`}>
                        <span className={`${m.isActive ? 'bg-slate-200 px-3 py-2 rounded-md text-accent': ''}`}>{m.text}</span>
                    </a>
                ))}
            </nav>

            <div className="TopToolbar flex items-center gap-1 justify-self-end mr-10 text-xl">
                {toolbarButtons.map((b, idx) => (
                    <div key={'tt-'+idx} className='btn py-2 rounded hover:text-accent hover:bg-slate-200 px-2 flex items-center'>
                        {b.icon}
                    </div>
                ))}
            </div>
        </header>
    )
}

export default Header