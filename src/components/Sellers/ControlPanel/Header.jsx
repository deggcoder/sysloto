import { UserFloatingButton } from "../../UI";

export const SellersControlPanelHeader = () => {
    return (
        <header className='flex justify-between pb-3.5 items-center relative'>
            <h3 className='text-headline-medium'>Ventas</h3>
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
                        add
                    </span>
                </button>

                <UserFloatingButton 
                    menu={menu}
                    username={'Cesar Gomez'}
                />
            </div>
        </header>
    )
}

const menu = [
    { item: 'Editar', link: '/seller' }
];