import React from 'react';
import { Outlet, useParams, useLoaderData } from "react-router-dom";
import {
    NumbersControlPanelList,
    NumbersControlPanelNavBar,
    SearchPanel,
} from '../../components';
import { getNumbers, getSchedules } from '../../data';

export async function numbersLoader({ request, params }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const schedule = url.searchParams.get("turno");

    let idSchedule = parseInt(params.scheduleId);

    const response = await getNumbers(idSchedule, q);
    const shiftSchedules = await getSchedules();

    return { schedules: shiftSchedules, q, schedule, response };
}

export const ScreensNumbers = () => {
    const { schedules, q, response } = useLoaderData();
    const { sellerId, scheduleId } = useParams();

    return (
        <>
            <section
                className='flex flex-col
                bg-surface rounded-t-2xl min-w-[260px] w-[360px]'
            >
                <header className='flex flex-col gap-1 pt-2 pb-2'>
                    <menu
                        className="flex justify-between text-on-surface-variant pt-1 pl-1.5 pr-1.5"
                    >
                        <SearchPanel
                            title='Números'
                        />

                        <div
                            className='p-1'
                        >
                            <button
                                className='flex items-center p-2 rounded-full
                                hover:bg-surface-container-high material-symbols-outlined'
                            >
                                more_vert
                            </button>
                        </div>
                    </menu>
                </header>

                {
                    true
                        ? null
                        : tickets.length
                            ? <Navigate
                                to={`/numeros/${sellerId}/turno/${scheduleId}/ventas/${tickets[0].idTicket}`} replace={true}
                            />
                            : null
                }

                <NumbersControlPanelNavBar />

                <div className='px-4.5 py-3.5'>
                    <div className='flex gap-3 px-4.5 py-3 bg-primary-fixed
                    rounded-3xl'
                    >
                        <span className="material-symbols-outlined 
                        text-on-primary-fixed-variant"
                        >
                            keyboard_double_arrow_up
                        </span>
                        <div className='flex flex-col'>
                            <p className='text-on-primary-fixed-variant
                            text-label-medium'
                            >
                                Recaudo total
                            </p>
                            <h3
                                className='text-headline-small 
                                text-on-primary-fixed'
                            >
                                C$ {response.totalSales ? response.totalSales : 0}
                            </h3>
                        </div>
                    </div>
                </div>

                <NumbersControlPanelList
                    list={response.numbers}
                    total={response.totalNumbers}
                />
            </section>
            <Outlet />
        </>
    )
}

const response = {
    totalNumbers: 3,
    totalSales: 60,
    schedule: 'Diurno',
    numbers: [
        { id: 1, number: '00', total: 10, factor: 800 },
        { id: 2, number: '01', total: 20, factor: 1600 },
        { id: 3, number: '02', total: 30, factor: 2400 },
    ],
};