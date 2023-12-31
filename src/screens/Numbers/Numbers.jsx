import React from 'react';
import { Outlet } from "react-router-dom";
import { 
    NumbersControlPanelHeader,
    NumbersControlPanelList,
    NumbersControlPanelNavBar
} from '../../components';

export const ScreensNumbers = () => {
    return (
        <>
            <div
                className='flex flex-col gap-3.5 p-4.5
                bg-surface rounded-t-2xl min-w-[260px] w-[360px]'
            >
                <NumbersControlPanelHeader />
                <NumbersControlPanelNavBar />

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
                            C$ {response.totalSales}
                        </h3>
                    </div>
                </div>

                <NumbersControlPanelList 
                    numberList={response.numbers}
                    totalNumbers={response.totalNumbers}
                />
            </div>
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