import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavLinkItem = ({ label = 'navlink', link = '#', iconName = 'menu' }) => {
    return (
        <NavLink
            to={link}
            className={({ isActive, isPending }) => (
                isActive
                    ? 'bg-secondary-container hover:bg-secondary-container/90 ' +
                        'text-on-secondary-container'
                    : isPending
                        ? ''
                        : ' hover:bg-surface-container-high') + ' py-2 pl-6 pr-3.5 flex gap-3 rounded-r-full'
            }
        >
            <span
                className='material-symbols-outlined'
            >
                {iconName}
            </span>
            {label}
        </NavLink>
    )
}
