import { useLoaderData } from "react-router-dom";
import { AlertBanner, SettingsSchedulesForm } from "../../components";
import { getSchedules, getShiftSchedule, updateSchedule } from "../../data";
import { useRef, useState } from "react";

export async function setScheduleAction({ request, params }) {
    const formData = await request.formData();
    const newHour = Object.fromEntries(formData);
    const schedule = await getShiftSchedule(parseInt(newHour.idShiftSchedule));

    schedule.endHour = newHour.endHour;
    delete schedule.idShiftSchedule;

    const upd = await updateSchedule(parseInt(newHour.idShiftSchedule), schedule);
    
    return upd;
}

export async function setSchedulesLoader() {
    const schedules = await getSchedules();

    return { schedules };
}

export const ScreensSetSchdules = () => {

    const { schedules } = useLoaderData();
    const refToDialog = useRef(null);
    const [idSchedule, setIdSchedule] = useState(0);

    const openModal = (id) => {
        if (refToDialog.current) {
            refToDialog.current.showModal();
        }
        setIdSchedule(id);
    };

    const tbody = schedules.map(schedule => (
        <tr key={schedule.idShiftSchedule}>
            <td className="py-3.5 px-1 border-t border-outline">
                {schedule.name}
            </td>
            <td className="py-3.5 px-1 border-t border-outline">
                {schedule.endHour}
            </td>
            <td className="px-1 border-t border-outline">
                <div className="flex justify-end p-1">
                    {
                        schedule.idShiftSchedule == 4
                        && <span
                            className="material-symbols-outlined p-2"
                            title="Este turno está configurado para funcionar solamente días sábados"
                        >
                            info
                        </span>
                    }
                    <button
                        type="button"
                        className="material-symbols-outlined p-2"
                        onClick={() => openModal(schedule.idShiftSchedule)}
                    >
                        edit
                    </button>
                </div>
            </td>
        </tr>
    ));

    return (
        <>
            <section
                className='flex flex-col
            bg-surface-container-low rounded-t-2xl min-w-[260px] w-[750px]'
            >
                <header
                    className="py-3 flex"
                >
                    <div
                        className="flex px-4.5 pt-1 items-center"
                    >
                        <h3
                            className="text-headline-small"
                        >
                            Configuración de turnos
                        </h3>
                    </div>
                </header>
                <div
                    className="px-9 py-2 flex flex-col"
                >
                    <AlertBanner
                        text="Puedes configurar el horario de cada turno para limitar el ingreso de boletos,
                    así como el ingreso de los números ganadores. Dichas configuraciones se aplican
                    a todo el sistema."
                    />
                    <div
                        className="flex flex-col gap-3 py-4.5 overflow-auto"
                    >
                        <h4 className="text-title-large text-on-surface-variant">
                            Personalizar turnos
                        </h4>
                        <p className="text-body-large">
                            Para aplicar una configuración distinta para cada turno, selecciona el turno correspondiente
                            y modifica el horario de fin de turno seleccionando el
                            <strong className="text-primary-fixed"> timer button</strong> y la hora deseada.
                        </p>

                        <div
                            aria-label="table-wrapper"
                            className="flex px-6 py-4.5"
                        >
                            <table
                                className="w-full table-auto border-collapse text-on-surface"
                            >
                                <thead>
                                    <tr>
                                        <th className="text-start w-2/5 py-3.5">
                                            Truno
                                        </th>
                                        <th className="text-start py-3.5">
                                            Horario fin de tuno
                                        </th>
                                        <th className="text-start py-3.5">
                                            &nbsp;
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tbody}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <SettingsSchedulesForm
                dialogRef={refToDialog}
                id={idSchedule}
            />
        </>
    )
}
