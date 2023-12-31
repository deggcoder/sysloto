import React from 'react'
import { MenuButton } from './MenuButton'
import { UserProfile } from './UserProfile'

export const Header = ({ title = 'Logotipo', schedule }) => {
    return (
        <header className='flex relative justify-between items-center px-3.5 py-2'>
            <div className='flex gap-2'>
                <MenuButton />
                <h1 className='font-display text-4xl'>{title}</h1>
            </div>
            <div className='flex gap-2 items-center'>
                <div
                    className='px-4 py-2 rounded-full bg-surface-container-high'
                    title={`Turno actual del sistema`}
                >
                    <p 
                        className='text-label-large'
                    >
                        {schedule ? schedule.name : 'Fuera de turno'}
                    </p>
                </div>
                <a 
                    className='material-symbols-outlined
                        p-2 hover:bg-surface-container-high rounded-full'
                    href="#"
                >
                    settings
                </a>
                <UserProfile />
            </div>
        </header>
    )
}
