import { Link, NavLink } from "react-router-dom";

export const NumbersControlPanelList = ({ list = [], total = 0 }) => {

    const listItems = list.map(number => (
        <li
            key={number.number}
        >
            <NavLink
                to={`detalle/${number.number}`}
                className={({ isActive, isPending }) => (
                    isActive
                        ? 'bg-secondary-container hover:bg-secondary-container/90'
                        : isPending
                            ? ''
                            : ' bg-surface-container-low hover:bg-surface-container') + ' flex px-3.5 py-2 gap-3.5 rounded-2xl ' +
                    ' items-start w-full'
                }
            >
                <div>
                    <h5 className="rounded-full w-10 h-10 flex justify-center items-center 
                        bg-surface-container-high">
                        {number.number}
                    </h5>
                </div>
                <div
                    className="flex flex-col justify-between items-end w-full"
                >
                    <p className="text-body-large text-primary">{`Venta C$ ${number.price}`}</p>
                    <p className="text-label-large text-error">{`Factor C$ ${number.factor}`}</p>
                </div>
            </NavLink>
        </li>
    ));

    return (
        <div className="flex flex-col gap-3.5 px-4.5 overflow-auto">
            <div className="flex justify-between items-center py-1">
                <p className='relative text-label-medium'>
                    {`${total} números vendidos`}
                </p>
            </div>
            <ul className="flex flex-col gap-2">
                {
                    list.length ? (
                        listItems
                    ) : (
                        <p className='py-2 pl-6 pr-3.5 flex gap-3 items-center text-label-large text-on-surface'>
                            <i>No hay registro de números</i>
                        </p>
                    )
                }
            </ul>
        </div>
    )
}