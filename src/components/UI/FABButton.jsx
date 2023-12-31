import React from 'react'

export const FABButton = ({onClick}) => {
    return (
        <button
            onClick={onClick}
            className='flex gap-3 pl-4 pr-5 py-4 
                rounded-xl2 bg-primary-container hover:bg-primary-container/90 hover:shadow-xl text-label-large
                text-on-primary-container'
        >
            <span className='material-symbols-outlined'>
                editor_choice
            </span>
            {"Registrar ganador"}
        </button>
    )
}
