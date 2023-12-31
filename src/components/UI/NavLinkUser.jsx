import React from 'react'
import { NavLink } from 'react-router-dom';

export const NavLinkUser = ({ label = 'navlink', link = null }) => {
    return (
        <NavLink
            to={link}
            className={({ isActive, isPending }) => (
                isActive
                    ? 'bg-secondary-container hover:bg-secondary-container/90 ' +
                        'text-on-secondary-container'
                    : isPending
                        ? ''
                        : ' hover:bg-surface-container-high') + ' flex py-2 pl-4 pr-3.5 gap-3 rounded-r-full items-center'
            }
        >
            <span
                className='bg-secondary text-on-secondary rounded-full
                    flex items-center w-10 h-10 justify-center text-title-medium
                    leading-none p-4'
            >
                {getAlias(label)}
            </span>
            {label}
        </NavLink>
    )
}

const getAlias = (str) => {
    let index = str.indexOf(' ');
    let alias = str.charAt(0);

    if (index !== -1) {
        alias = alias.concat(str.charAt(index + 1));
    } else {
        alias = alias.concat(str.charAt(1));
    }

    return alias.toUpperCase();
}