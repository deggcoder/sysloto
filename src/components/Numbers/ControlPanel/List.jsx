import { Link } from "react-router-dom";

export const NumbersControlPanelList = ({ numberList = [], totalNumbers = 0 }) => {

    const listItems = numberList.map(number => (
        <li
            key={number.id}
        >
            <Link
                className="flex justify-between rounded-2xl p-3.5
                bg-surface-container-low hover:bg-surface-container"
                to={`${number.id}`}
            >
                <div className="flex justify-between items-start w-full">
                    <h3 className="text-headline-small">{number.number}</h3>
                    <div
                        className="flex flex-col justify-end items-end"
                    >
                        <h5 className="text-title-medium text-primary">
                            Total C$ {number.total}
                        </h5>
                        <p className="text-label-medium text-error">
                            Factor C$ {number.factor}
                        </p>
                    </div>
                </div>
            </Link>
        </li>
    ));

    return (
        <div className="flex flex-col gap-3.5 overflow-auto">
            <div className="flex justify-between items-center py-1">
                <p className='relative text-label-medium'>
                    {totalNumbers} Números vendidos
                </p>

                <div>
                    <button
                        type="button"
                        className="flex justify-center gap-1 py-1"
                    >
                        Hoy
                        <span className="material-symbols-outlined text-secondary">
                            arrow_drop_down
                        </span>
                    </button>
                    <ul
                        className="flex flex-col py-3 overflow-hidden rounded-2xl bg-surface
                        absolute border-2 border-outline z-10"
                    >
                        <li
                            className="py-1 hover:bg-surface-container-highest">
                            <Link
                                to={"?periodo=hoy"}
                                className="px-5 flex"
                            >
                                Hoy
                            </Link>
                        </li>
                        <li
                            className="py-1 hover:bg-surface-container-highest">
                            <Link
                                to={"?periodo=ayer"}
                                className="px-5 flex"
                            >
                                Ayer
                            </Link>
                        </li>
                        <li
                            className="py-1 hover:bg-surface-container-highest">
                            <Link
                                to={"?periodo=semana"}
                                className="px-5 flex"
                            >
                                Esta semana
                            </Link>
                        </li>
                        <li
                            className="py-1 hover:bg-surface-container-highest">
                            <Link
                                to={"?periodo=mes"}
                                className="px-5 flex"
                            >
                                Este mes
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <ul className="flex flex-col gap-2">{listItems}</ul>
        </div>
    )
}