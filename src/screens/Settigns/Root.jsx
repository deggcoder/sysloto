import { useEffect, useState } from "react";
import { MenuButton, NavigationDSettings, UserProfile } from "../../components"
import { getCurrentSchedule } from "../../data";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export const ScreensSettingsRoot = () => {
    const [schedule, setSchedule] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentSchedule()
            .then(data => {
                setSchedule(data);
            });

    }, [schedule]);

    return (
        <>
            <header className='flex relative justify-between items-center px-3.5 py-2'>
                <div className='flex gap-2 items-center'>
                    <div className="p-1">
                        <button
                            className='p-2 leading-none rounded-full hover:bg-surface-container-high
                            material-symbols-outlined'
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            arrow_back
                        </button>
                    </div>
                    <h1 className='text-headline-small text-on-surface-variant'>
                        {"Configuración"}
                    </h1>
                </div>
                <div className='flex gap-2 items-center'>
                    <div
                        className='px-4 py-2 rounded-full bg-surface-container-high'
                        title={`Turno actual del sistema`}
                    >
                        <p
                            className='text-label-large'
                        >
                            {schedule ? schedule.name : 'Fuera de turno'}
                        </p>
                    </div>
                    <UserProfile />
                </div>
            </header>
            <div className='flex flex-1 overflow-auto w-full h-full'>
                <NavigationDSettings />
                {
                    <Navigate to={'turnos'} replace={true} />
                }
                <main className='flex h-full w-full gap-3.5 pr-3.5'>
                    <Outlet />
                </main>
            </div>
        </>
    )
}
