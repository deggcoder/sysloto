import { NavLink, useLoaderData } from 'react-router-dom';

export const NumbersControlPanelNavBar = () => {
    const { schedules } = useLoaderData();

    const list = schedules.map(schedule => (
        <li key={schedule.idShiftSchedule}>
            <NavLink
                to={`/numeros/turno/${schedule.idShiftSchedule}?turno=${schedule.idShiftSchedule}`}
                className={({ isActive, isPending }) => (
                    isActive
                        ? 'text-on-primary-container bg-[#574500]'
                        : isPending
                            ? ''
                            : 'hover:bg-surface-container bg-surface-container-low') + ' flex px-3 py-2 rounded-2xl'
                }
            >
                {schedule.name}
            </NavLink>
        </li>
    ));

    return (
        <nav className="flex px-4.5 py-3.5 justify-center">
            <ul className="flex gap-2 flex-1 justify-center">
                {list}
            </ul>
        </nav>
    )
}

const schedules = [
    { id: 5, name: 'Todo' },
    { id: 1, name: 'Diurno' },
    { id: 2, name: 'Vespertino' },
    { id: 3, name: 'Noche' },
    { id: 4, name: 'Extra' },
];