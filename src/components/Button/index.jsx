import React from "react";
import './style.css'

export const PrimaryButton = ({children, size ="", isBlock, onClick}) => {
    switch(size) {
        case 'sm': size = 'btn-sm'; break;
        case 'md': size = 'btn-md'; break;
        default: size = ''; break;
    }
    
    return (
        <button 
            className={`btn btn-primary ${isBlock ? 'block w-full' : "" } ${size}`} 
            onClick={e => onClick(e)}
            role="button"
            >
                {children}
        </button>
    )
}

export const InfoButton = ({children, size ="", isBlock = false, onClick}) => {
    switch(size) {
        case 'sm': size = 'btn-sm'; break;
        case 'md': size = 'btn-md'; break;
        default: size = ''; break;
    }
    
    return (
        <button 
            className={`btn btn-info ${isBlock ? 'block w-full' : "" } ${size} flex items-center gap-2` } 
            onClick={e => onClick(e)}
            role="button"
            >
                {children}
        </button>
    )
}


export const WarningButton = ({children, size ="", isBlock = false, onClick}) => {
    switch(size) {
        case 'sm': size = 'btn-sm'; break;
        case 'md': size = 'btn-md'; break;
        default: size = ''; break;
    }
    
    return (
        <button 
            className={`btn btn-warning ${isBlock ? 'block w-full' : "" } ${size}`} 
            onClick={e => onClick(e)}
            role="button"
            >
                {children}
        </button>
    )
}

export const DangerButton = ({children, size ="", isBlock, onClick}) => {
    switch(size) {
        case 'sm': size = 'btn-sm'; break;
        case 'md': size = 'btn-md'; break;
        default: size = ''; break;
    }
    
    return (
        <button 
            className={`btn btn-danger flex items-center gap-2 ${isBlock ? 'block w-full' : "" } ${size}`} 
            onClick={e => onClick(e)}
            role="button"
            >
                {children}
        </button>
    )
}