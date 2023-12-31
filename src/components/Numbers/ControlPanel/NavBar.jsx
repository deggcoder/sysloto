import { Link, useSearchParams } from 'react-router-dom';

export const NumbersControlPanelNavBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const list = schedules.map(schedule => (
        <li key={schedule.id}>
            <Link
                to={`?schedule=${schedule.id}`}
                className='flex px-3 py-2 bg-surface-container-low rounded-full
                    hover:bg-surface-container'
            >
                {schedule.name}
            </Link>
        </li>
    ));

    return (
        <nav className="flex">
            <ul className="flex gap-2">
                {list}
            </ul>
        </nav>
    )
}

const schedules = [
    { id: 1, name: 'Diurno' },
    { id: 2, name: 'Vespertino' },
    { id: 3, name: 'Noche' },
    { id: 4, name: 'Extra' },
];