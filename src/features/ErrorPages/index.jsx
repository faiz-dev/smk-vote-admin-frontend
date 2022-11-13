import React from "react";
import { useRouteError } from "react-router-dom";


export const NotFoundPage = () => {
    const error = useRouteError()
    console.error(error)
    
    return (
        <div className="my-10 mx-10 rounded-xl border-2 border-red-200 p-10 w-[400px]">
            <h1 className="text-5xl text-red-500">Oops!</h1>
            <p className="mt-2">Sorry, an unexpected error has occured.</p>
            <ul className="mt-10">
                <li className="text-lg">error: {error.statusText || error.message}</li>
                <li className="text-slate-400">code {error.status}</li>
            </ul>
        </div>
    )
}
