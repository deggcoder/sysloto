import { NavLink } from "react-router-dom";
import { formaterDate } from "../../Sellers";

export const DisbursesControlPanelList = ({ numberList = [], totalNumbers = 0 }) => {

    const listItems = numberList.map(number => (
        <li
            key={number.idWinner}
        >
            <NavLink
                className={({ isActive, isPending }) => (
                    isActive
                        ? 'bg-[#50462A] hover:bg-secondary-container'
                        : isPending
                            ? ''
                            : '') + ' flex justify-between rounded-2xl p-3.5 ' +
                                        'bg-surface-container-low hover:bg-surface-container'
                }
                to={`${number.idWinner}`}
            >
                <div className="flex flex-col justify-between items-start w-full">
                    <div className="flex justify-between w-full">
                        <h3 className="text-display-small">{number.number}</h3>
                        <div>
                            <p className="flex text-label-large text-on-surface-variant
                            bg-surface-container-high rounded-full px-3 py-1"
                            >
                                {number.schedule}
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex justify-between items-center text-on-surface-variant
                            w-full"
                    >
                        <p className="text-body-medium">
                            {formaterDate(number.winDate)}
                        </p>
                    </div>
                </div>
            </NavLink>
        </li>
    ));

    return (
        <div className="flex flex-col gap-3.5 overflow-auto">
            <div className="flex justify-between items-center py-1">
                <p className='relative text-label-medium'>
                    {totalNumbers} Números vendidos
                </p>

                
            </div>
            <ul className="flex flex-col gap-2">{listItems}</ul>
        </div>
    )
}