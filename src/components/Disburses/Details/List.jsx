import { formaterDay } from "../../Sellers";

export const DisbursesDetailsList = ({ ticketList = [], total }) => {

    const listItems = ticketList.map(ticket => (
        <li
            key={ticket.idTicket}
        >
            <div className="flex flex-col p-3.5 gap-3.5 rounded-2xl bg-surface-container items-start w-full">
                <div
                    className="flex justify-between items-start w-full"
                >
                    <div className="flex flex-col flx-1">
                        <h5>{ticket.seller}</h5>
                        <p className="text-body-medium text-on-surface-variant">{formaterDay(ticket.date)}</p>
                    </div>
                    <div>
                        <h5 className="rounded-full w-10 h-10 flex justify-center items-center 
                            bg-surface-container-high">
                            {`${ticket.ticketNumber}`}
                        </h5>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full">
                    <p className="text-label-large text-primary">
                        {`Venta C$${ticket.sale}`}
                    </p>
                    <p className="text-label-large text-error">
                        {`Factor C$${ticket.factor}`}
                    </p>
                </div>
            </div>
        </li>
    ));

    return (
        <div className="flex flex-col gap-3.5 px-4.5 overflow-auto">
            <div className="flex justify-between items-center py-1">
                <p className='relative text-label-medium'>
                    {`${total} boletos`}
                </p>
            </div>
            <ul className="flex flex-col gap-2">{listItems}</ul>
        </div>
    )
}