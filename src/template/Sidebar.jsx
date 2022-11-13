import React from "react";
import { CiHome, CiUser, CiLogin, CiLogout } from "react-icons/ci";
import { RiGroup2Fill } from 'react-icons/ri'
import { FaUserTie } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../slicers/authSlice";
import { Link } from "react-router-dom";
import { GiVote } from "react-icons/gi";
import { FcSettings } from "react-icons/fc";

const Sidebar = () => {
    const isDrawerOpen = useSelector((state) => state.layout.drawerOpen)
    const role = useSelector(state => state.auth.role)
    const dispatch = useDispatch()

    const menu = [
        {path: '/', text: 'Dashboard', icon: <CiHome size={20} />},
        {path: '/groups', text: 'Groups', icon: <RiGroup2Fill size={20} />},
        {path: '/users', text: 'User Management', icon: <CiUser size={20} />},
        {path: '/periodes', text: 'Periodes', icon: <GiVote size={20} />},
        {path: '/calons', text: 'Calon', icon: <FaUserTie size={20} />},
        {path: '/settings', text: 'Settings', icon: <FcSettings size={20} />},
    ]

    return (
        <div id="sidebar" className={`Sidebar h-screen flex flex-col fixed lg:static bg-white z-40 -translate-x-[100%] lg:-translate-x-[0%] ${isDrawerOpen ? "drawer-on": ''}`}>
            <div className="f-brand border-b flex-shrink-0">
                <a href="" className="flex items-center h-full justify-center">
                    <img src="/vite.svg" alt="Vite logo" />
                    <div className="font-bold mx-2">Aplikasi PKG 360</div>
                </a>
            </div>

            {/* Navigation Menu */}
            <nav className="SideMenu flex flex-col mt-4 flex-1 text-menu">
                {menu.map(m => (
                    <Link to={m.path} key={'sm-'+m.text} className="py-2 pl-10 flex items-center text-slate-500 hover:text-black">
                        {m.icon}
                        <div className="ml-3">{m.text}</div>
                    </Link>
                ))}
                <a 
                    href="#" 
                    className="py-2 pl-10 flex items-center text-slate-500 hover:text-black"
                    onClick={() => dispatch(clearAuth())}>
                    <CiLogout size={20} />
                    <div className="ml-3">Logout</div>
                </a>
            </nav>

            <div className="SideFooter hover:bg-slate-300 rounded mb-5 mx-4 py-2 px-2 text-slate-500 text-sm cursor-pointer">
                &copy; KanKreatif 2022
            </div>
        </div>
    )
}

export default Sidebar