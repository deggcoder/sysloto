import { NavLink } from "react-router-dom";
import { periodMenu } from "../../../data";
import { MenuFloatingButton } from "../../UI";

export const SellersControlPanelList = ({ list = [], total = 0, sellerName = 'Vendedor', schedule = "" }) => {

    const totalTickets = total;

    const listItems = list.length ? (
        list.map(ticket => (

            <li
                key={ticket.idTicket}
            >
                <NavLink
                    to={`${ticket.idTicket}`}
                    className={({ isActive, isPending }) => (
                        isActive
                            ? 'bg-secondary-container hover:bg-secondary-container/90'
                            : isPending
                                ? ''
                                : ' bg-surface-container-low hover:bg-surface-container') + ' flex flex-col p-3.5 gap-3.5 rounded-2xl '+
                                            ' items-start w-full'
                    }
                >
                    <div
                        className="flex justify-between items-start w-full"
                    >
                        <div className="flex flex-col flx-1">
                            <h5 className="text-title-medium">{sellerName}</h5>
                            <p className="text-body-medium text-on-surface-variant">{formaterDate(ticket.date)}</p>
                        </div>
                        <div>
                            <h5 className="rounded-full w-10 h-10 flex justify-center items-center 
                            bg-surface-container-high">
                                {ticket.ticketNumber}
                            </h5>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <div>
                            <p className="flex text-label-large text-on-surface-variant
                            bg-surface-container-high rounded-full px-3 py-1"
                            >
                                {`${schedule}`}
                            </p>
                        </div>
                        <p className="text-label-large text-primary">
                            C$ {ticket.total ? ticket.total : 0}
                        </p>
                    </div>
                </NavLink>
            </li>
        ))) : (
        <p className='py-2 pl-6 pr-3.5 flex gap-3 items-center text-label-large text-on-surface'>
            <i>No hay registro de boletos</i>
        </p>
    );

    return (
        <div className="flex flex-col px-4.5 gap-3.5 overflow-auto">
            <div className="flex justify-between items-center py-1">
                <p className='relative text-label-medium'>
                    {totalTickets} Números vendidos
                </p>

                <MenuFloatingButton
                    menu={periodMenu}
                />
            </div>
            <ul className="flex flex-col gap-2">{listItems}</ul>
        </div>
    )
}


// TODO move to sigle file
export function formaterDate(date) {
    const fecha = new Date(date);

    const opcionesDiaSemana = { weekday: 'long' };
    const opcionesDia = { day: 'numeric' };
    const opcionesMes = { month: 'long' };

    const formatoDiaSemana = new Intl.DateTimeFormat('es-ES', opcionesDiaSemana).format(fecha);
    const formatoDia = new Intl.DateTimeFormat('es-ES', opcionesDia).format(fecha);
    const formatoMes = new Intl.DateTimeFormat('es-ES', opcionesMes).format(fecha);

    const fechaFormateada = `${formatoDiaSemana} ${formatoDia} de ${formatoMes}`;
    return fechaFormateada;
}

export function timeFormater(date) {
    const fecha = new Date(date);

    const opcionesHora = { hour: 'numeric', minute: '2-digit', hour12: true };

    const formatoHora = new Intl.DateTimeFormat('es-ES', opcionesHora).format(fecha);
    return formatoHora;
}

export function formaterDay(date) {
    const fecha = new Date(date);

    const opcionesDiaSemana = { weekday: 'long' };
    const opcionesDia = { day: 'numeric' };

    const formatoDiaSemana = new Intl.DateTimeFormat('es-ES', opcionesDiaSemana).format(fecha);
    const formatoDia = new Intl.DateTimeFormat('es-ES', opcionesDia).format(fecha);
    const time = timeFormater(date);

    const fechaFormateada = `${formatoDiaSemana} ${formatoDia} · ${time}`;
    return fechaFormateada;
}