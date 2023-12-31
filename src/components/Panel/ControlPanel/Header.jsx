export const PanelControlPanelHeader = () => {
    return (
        <header className='flex justify-between items-center relative'>
            <h3 className='text-headline-medium'>Panel</h3>
            <div className='flex'>
                <button
                    className='flex items-center p-2 rounded-full
                        hover:bg-surface-container-high'
                >
                    <span
                        className='material-symbols-outlined'
                    >
                        search
                    </span>
                </button>
                <button 
                    className='flex items-center p-2 rounded-full
                    hover:bg-surface-container-high'
                >
                    <span
                        className='material-symbols-outlined'
                    >
                        more_vert
                    </span>
                </button>
            </div>
        </header>
    )
}
