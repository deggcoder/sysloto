import React from 'react'
import { Link } from 'react-router-dom';

export const NavBar = () => {

    const list = schedules.map(schedule => (
        <li key={schedule.id}>
            <Link
                to={`?schedule=${schedule.id}`}
                className='flex px-3 py-2 bg-surface-container rounded-full
                    hover:bg-surface'
            >
                {schedule.name}
            </Link>
        </li>
    ));

    return (
        <nav className="flex">
            <ul className="flex gap-2 px-4.5">
                <li>
                    <Link
                        to={``}
                        className='flex px-3 py-2 bg-surface-container rounded-full
                    hover:bg-surface'
                    >
                        Todo
                    </Link>
                </li>
                {list}
            </ul>
        </nav>
    )
}

const schedules = [
    { id: 1, name: 'Diurno' },
    { id: 2, name: 'Vespertino' },
    { id: 3, name: 'Noche' },
    { id: 4, name: 'Sorteo extra' },
];