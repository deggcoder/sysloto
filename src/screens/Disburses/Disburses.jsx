import React from 'react';
import { Form, Outlet, useLoaderData } from "react-router-dom";
import {
    DisbursesControlPanelList,
    DisbursesControlPanelSearch,
} from '../../components';
import { getSchedules, getWins } from '../../data';

export async function disbursesLoader({ request, params }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    const shiftSchedules = await getSchedules();
    const response = await getWins();

    return { schedules: shiftSchedules, response, q };
}

export const ScreensDisburses = () => {
    const { response, schedules } = useLoaderData();
    const { numbers } = response;
    const { totalNumbers } = response;

    return (
        <>
            <div
                className='flex flex-col gap-3.5 p-4.5
                bg-surface rounded-t-2xl min-w-[260px] w-[360px]'
            >
                <header className='flex justify-between pb-3.5 relative'>
                <h3
                    className='text-headline-medium'
                >
                    Desembolsos
                </h3>

                    <div className='flex'>

                        <button
                            type='submit'
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

                <DisbursesControlPanelList
                    numberList={numbers}
                    totalNumbers={totalNumbers}
                />
            </div>
            <Outlet />
        </>
    )
}

const response = {
    totalNumbers: 3,
    numbers: [
        { id: 1, number: '00', total: 10, schedule: 'Diurno' },
        { id: 2, number: '01', total: 20, schedule: 'Diurno' },
        { id: 3, number: '02', total: 30, schedule: 'Diurno' },
    ],
};