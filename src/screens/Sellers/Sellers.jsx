import React from 'react';
import { Form, Outlet, useLoaderData, redirect, Navigate, useParams} from "react-router-dom";
import {
    SellersControlPanelList,
    SellersControlPanelNavBar,
    SellersControlPanelSearch,
    UserFloatingButton,
} from '../../components';
import { createTicket, getSales, getSchedules, sellerMenu } from '../../data';

export async function salesLoader({ request, params }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    let idSeller = parseInt(params.sellerId);
    let idSchedule = parseInt(params.scheduleId);

    const response = await getSales(idSchedule, idSeller, q);
    const shiftSchedules = await getSchedules();

    return { schedules: shiftSchedules, response, q };
}

export async function salesAction({ params }) {
    let idSeller = parseInt(params.sellerId);
    let idSchedule = parseInt(params.scheduleId);

    const { msgError, ticket } = await createTicket(idSchedule, idSeller);

    if (msgError) {
        alert(
            msgError
        );
        return ticket;
    }

    return redirect(`/vendedor/${idSeller}/turno/${idSchedule}/ventas/${ticket.idTicket}`);
}

export const ScreensSellers = () => {
    const { response, schedules } = useLoaderData();

    const {sellerId, scheduleId} = useParams();

    const { seller } = response;
    const { tickets } = response;

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
                        <SellersControlPanelSearch />

                        <div className='flex'>
                            <Form method='post'>
                                <div
                                    className="p-1"
                                >
                                    <button
                                        type='submit'
                                        className='flex items-center p-2 rounded-full
                                        hover:bg-surface-container-high'
                                    >
                                        <span
                                            className='material-symbols-outlined'
                                        >
                                            add
                                        </span>
                                    </button>
                                </div>
                            </Form>

                            <UserFloatingButton
                                menu={sellerMenu}
                                username={`${seller.firstName} ${seller.lastName}`}
                            />
                        </div>
                    </menu>
                </header>

                {
                    tickets.length ?
                        <Navigate to={`/vendedor/${sellerId}/turno/${scheduleId}/ventas/${tickets[0].idTicket}`} replace={true} />
                        : null
                }
                
                <SellersControlPanelNavBar
                    list={schedules}
                />

                <SellersControlPanelList
                    list={tickets}
                    total={response.totalTickets}
                    sellerName={`${seller.firstName} ${seller.lastName}`}
                    schedule={response.shiftSchedule}
                />
            </section>
            <Outlet />
        </>
    )
}

const response = {
    totalTickets: 5,
    period: 'Hoy',
    seller: { idSeller: 1, sellerName: 'Cesar Gomez' },
    tickets: [
        { id: 1, ticketNumber: 1, sellerName: 'Juan Perez', total: 25, schedule: 'Diurno', date: '2023-12-20T01:14:51.016Z' },
        { id: 2, ticketNumber: 2, sellerName: 'Juan Perez', total: 45, schedule: 'Diurno', date: '2023-12-20T01:14:59.014Z' },
        { id: 3, ticketNumber: 3, sellerName: 'Juan Perez', total: 10, schedule: 'Diurno', date: '2023-12-20T01:15:30.014Z' },
        { id: 4, ticketNumber: 4, sellerName: 'Juan Perez', total: 60, schedule: 'Diurno', date: '2023-12-20T01:15:50.014Z' },
        { id: 5, ticketNumber: 5, sellerName: 'Juan Perez', total: 30, schedule: 'Diurno', date: '2023-12-20T01:16:20.014Z' },
    ],
};

const auxSchedules = [
    { id: 1, name: 'Diurno', endHour: 12 },
    { id: 2, name: 'Vespertino', endHour: 15 },
    { id: 3, name: 'Noche', endHour: 21 },
    { id: 4, name: 'Extra', endHour: 18 },
];