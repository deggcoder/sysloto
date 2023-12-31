import { Form, useLoaderData } from "react-router-dom";
import { DisbursesDetailsList, DisbursesDetailsSellerList, IconUser, ResumeWidget, formaterDay } from "../../components";
import { getSchedules, getSellers, getWinner } from "../../data";

export async function disbursesDLoader({ request, params }) {
    const url = new URL(request.url);
    const vendedor = url.searchParams.get("vendedor");

    const shiftSchedules = await getSchedules();
    const response = await getWinner(parseInt(params.winnerId), vendedor);
    const sellers = await getSellers();

    return { schedules: shiftSchedules, response, sellers, vendedor };
}

export const ScreensDisbursesDetails = () => {
    const { response, schedules, sellers } = useLoaderData();
    const { winner } = response;
    const { tickets } = response;
    const { totalTickets } = response;

    return (
        <section
            className="flex flex-col overflow-auto gap-3.5 bg-surface-container-low
        rounded-t-2xl flex-1 pb-4.5"
        >
            <header 
                className="flex justify-between px-4.5 pt-4.5 pb-2 relative"
            >
                <div className="flex flex-col">
                    <h3 className="text-headline-small">Número {winner.number}</h3>
                    <p
                        className="text-primary bg-surface-container rounded-full text-body-medium
                            px-3 py-1 w-min"
                    >{winner.schedule}</p>

                </div>
                <div className="text-on-surface-variant flex items-center gap-1">
                    <div>
                        <p className="text-body-medium text-on-tertiary-container
                            bg-surface-container rounded-full px-2 py-1">
                            {formaterDay(winner.winDate)}
                        </p>
                    </div>

                    <Form
                        method="post"
                        action={`delete`}
                        className="p-1"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "¿Estás seguro que quieres eliminar este número?"
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button
                            type="submit"
                            className='material-symbols-outlined p-2 rounded-full hover:bg-surface-container-high'
                        >
                            delete
                        </button>
                    </Form>

                    <button className="p-2 rounded-full flex items-center
                        material-symbols-outlined hover:bg-surface-container-high">
                        more_vert
                    </button>
                </div>
            </header>
            <div className="flex flex-col gap-4.5">

                <article className="flex flex-col gap-3 px-4.5">
                    <div className="flex flex-col gap-3">
                        <p className="text-body-meduim text-surface-variant">
                            Filtrar por vendedor
                        </p>

                        <DisbursesDetailsSellerList 
                            sellerList={sellers}
                        />

                    </div>
                    <ResumeWidget
                        total={winner.total}
                        title="Total a desembolsar"
                    />

                </article>
            </div>
            <DisbursesDetailsList
                ticketList={tickets}
                total={totalTickets}
            />
        </section>
    )
}

const response = {
    idNumber: 1,
    number: '00',
    disburse: 800,
    currentSales: 60,
    max: 250,
    schedule: 'Diurno',
    sellers: [
        { id: 1, name: 'Daniel Lopez', total: 10 },
        { id: 2, name: 'Juan Perez', total: 10 },
        { id: 1, name: 'Oscar Gomez', total: 10 },
    ],
};