import React from 'react'

export const ResumeWidget = ({ total = 0, title = 'Resumen' }) => {
  return (
    <div className='px-4 py-3 flex justify-between bg-secondary-container
        text-on-secondary-container rounded-full'>
        <div className='flex gap-2'>
            <span className='material-symbols-outlined'>
                stat_minus_2
            </span>
            <h5 className='text-title-medium'>
                {title}
            </h5>
        </div>
        <p className='text-title-large'>C$ { total }</p>
    </div>
  )
}
