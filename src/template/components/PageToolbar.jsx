import React from "react";
import { CiFilter } from 'react-icons/ci'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PageToolbar = () => {
  const pageTitle = useSelector((state) => state.layout.pageTitle)
    return (
        <div className="PageToolbar flex mb-5 justify-between">
            <div className="PageTitle">
              <h1 className="PageHeading text-xl font-semibold">{pageTitle}</h1>
              <ul className='BreadCrumb flex flex-wrap gap-2'>
                <li>
                  {/* <Link to={`/`}>Home</Link> */}
                </li>
                <li>-</li>
                <li>Layout Options</li>
              </ul>
            </div>
            <div className="PageActions flex items-center gap-4">
              <div className='bg-white rounded py-2 px-4 font-medium'>
                <a href="" className='flex items-center hover:text-accent'>
                  <CiFilter className='mr-2' /> Filter
                </a>
              </div>

              <div className='bg-primary text-white rounded py-2 px-4 font-medium'>
                <a href="" className='flex items-center hover:text-accent'>
                  Create
                </a>
              </div>
            </div>
          </div>
    )
}

export default PageToolbar