import { Form, redirect, useLoaderData } from "react-router-dom";
import { IconUser, SellersDetailsList, formaterDate, timeFormater } from "../../components";
import { createDetail, getSalesDetails } from "../../data";

export async function detailsLoader({ params }) {
    const idTicket = parseInt(params.ticketId);
    const response = await getSalesDetails(idTicket);
    return { response };
}

export async function detailsAction({ request, params }) {
    const idTicket = parseInt(params.ticketId);
    const formData = await request.formData();
    const newDetail = Object.fromEntries(formData);
    
    const response = await createDetail(idTicket, newDetail.number, parseInt(newDetail.price));

    if(response.errMsg) {
        alert(
            response.errMsg
        );
        return redirect(`/vendedor/${params.sellerId}/turno/${params.scheduleId}/ventas/${idTicket}`);
    } 

    const {ok} = response;
    return { ok };
}

export const ScreensSellersDetails = () => {
    const { response } = useLoaderData();

    return (
        <section
            className="flex flex-col overflow-auto gap-3.5 bg-surface-container-low
        rounded-t-2xl flex-1 pb-4.5"
        >
            <header className="flex justify-between items-center
        px-4.5 pt-4.5 pb-2 relative">
                <div className="flex flex-col">
                    <h3 className="text-headline-small">Boleto No {response.ticketNumber}</h3>
                    <p
                        className="text-primary bg-surface-container rounded-full text-body-medium
                            px-3 py-1 w-min"
                    >{response.shiftSchedule}</p>
                </div>
                <div className="text-on-surface-variant flex items-center gap-1">
                    <div>
                        <p 
                            title="Hora de ingreso de boleto"
                            className="text-body-medium text-on-tertiary-container
                            bg-surface-container rounded-full px-2 py-1"
                        >
                            {`${timeFormater(response.date)}`}
                        </p>
                    </div>
                    <button className="p-2 rounded-full flex items-center
            material-symbols-outlined hover:bg-surface-container-high">
                        more_vert
                    </button>
                </div>
            </header>
            <article className="flex flex-col gap-3 px-4.5">
                <div
                    className="flex flex-col gap-3.5 p-3.5 bg-surface-container-high
                            rounded-2xl"
                >
                    <div className="flex gap-3 items-center">
                        <IconUser userName={response.seller} />
                        <div className="flex flex-col">
                            <h5 className="text-title-medium">{response.seller}</h5>
                            <p className="text-body-medium text-on-surface-variant">
                                {`${formaterDate(response.date)}`}
                            </p>
                        </div>
                    </div>
                    <p className="text-body-medium text-on-surface-variant">
                        {'Añade números'}
                    </p>
                    <Form
                        method="post"
                        className="flex gap-3 w-full"
                    >
                        <div className="flex gap-2 w-full">
                            <input
                                type="text"
                                autoFocus
                                name="number"
                                id="number"
                                placeholder="Número"
                                className="text-body-large text-on-surface-variant px-4.5 py-2
                                    rounded-full items-center bg-transparent border border-outline
                                    placeholder:text-outline w-min
                                    outline-none ring-primary ring-inset focus-within:ring-2 
                                    focus-within:border-transparent"
                                maxLength={2}
                                size={2}
                            />
                            <input
                                type="text"
                                name="price"
                                id="price"
                                placeholder="Monto"
                                className="text-body-large text-on-surface-variant px-4.5 py-2
                                    rounded-full items-center bg-transparent border border-outline
                                    placeholder:text-outline w-full
                                    outline-none ring-primary ring-inset focus-within:ring-2 focus-within:border-transparent"
                            />
                        </div>
                        <button
                            className="py-2 pl-4 pr-3 gap-2 flex justify-center items-center bg-primary-container
                                text-on-primary-container rounded-full"
                            type="submit"
                        >
                            Enviar
                            <span className="material-symbols-outlined">
                                send
                            </span>
                        </button>
                    </Form>
                </div>
            </article>
            <SellersDetailsList
                numberList={response.details}
                totalNumbers={response.totalNumbers}
            />
        </section>
    )
}

const response = {
    ticketNumber: 1,
    date: '',
    shiftSchedule: 'Diurno',
    seller: 'Cesar Gomez',
    totalNumbers: 5,
    details: [
        { idTicket: 1, number: '10', price: 10, factor: 80 },
        { id: 2, name: 'Juan Perez', total: 10 },
        { id: 3, name: 'Oscar Gomez', total: 10 },
    ],
};