import { NavLink, useParams } from 'react-router-dom';

export const SellersControlPanelNavBar = ({ list = [] }) => {
    const { sellerId } = useParams();

    const nav = list.map(schedule => (
        <li key={schedule.idShiftSchedule}>
            <NavLink
                to={`/vendedor/${sellerId}/turno/${schedule.idShiftSchedule}/ventas`}
                className={({ isActive, isPending }) => (
                    isActive
                        ? 'text-on-primary-container bg-[#574500]'
                        : isPending
                            ? ''
                            : 'hover:bg-surface-container bg-surface-container-low') + ' flex px-3 py-2 rounded-full'
                }
            >
                {schedule.name}
            </NavLink>
        </li>
    ));

    return (
        <nav className="flex px-4.5 py-3.5">
            <ul className="flex gap-2">
                {nav}
            </ul>
        </nav>
    )
}