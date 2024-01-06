import { NumbersDetailsList, ResumeWidget } from "../../components";
import { getDetailOfNumber, getSchedules, getSellers } from "../../data";
import { useLoaderData } from "react-router-dom";

export async function numberDetailLoader({ request, params }) {
    // const url = new URL(request.url);
    // const vendedor = url.searchParams.get("vendedor");

    const shiftSchedules = await getSchedules();
    const response = await getDetailOfNumber(params.numberId, parseInt(params.scheduleId));

    return { schedules: shiftSchedules, response };
}

export const ScreensNumbersDetails = () => {
    const { response } = useLoaderData();
    const { number, maxLimit, totalDisburse, currentSales, numbers, schedule, range } = response;
    const diff = maxLimit - currentSales;

    return (
        <section
            className="flex flex-col overflow-auto gap-3.5 bg-surface-container-low
                rounded-t-2xl flex-1 pb-4.5"
        >
            <header className="flex justify-between items-center
                px-4.5 pt-4.5 pb-2 relative">
                <div className="flex flex-col">
                    <h3 className="text-headline-small">Número {number}</h3>
                    <p
                        className="text-primary bg-surface-container rounded-full text-body-medium
                            px-3 py-1 w-min"
                    >{schedule}</p>
                </div>
                <button className="p-2 rounded-full flex items-center
            material-symbols-outlined hover:bg-surface-container-high">
                    more_vert
                </button>
            </header>
            <div className="flex flex-col gap-4.5">
                <article className="flex flex-col gap-3 px-4.5">
                    <ResumeWidget
                        total={totalDisburse}
                        title="Total a desembolsar"
                    />
                    <div
                        className="flex flex-col gap-3.5 p-3.5 bg-surface-container-high
                            rounded-2xl"
                    >
                        <h5
                            className="flex gap-2 text-on-surface text-title-medium"
                        >
                            <span className="material-symbols-outlined text-secondary">
                                bubble_chart
                            </span>
                            Límites
                        </h5>
                        <div className="flex gap-2 justify-between">
                            <div
                                className="flex justify-between items-center px-3 py-2
                                    bg-surface-container-highest rounded-full flex-1"
                            >
                                <p className="text-body-medium text-secondary">
                                    Alcanzado
                                </p>
                                <p
                                    className={
                                        `text-body-large ${diff <= range ? 'text-error' : 'text-primary'}
                                    `}
                                >
                                    C$ {currentSales}
                                </p>
                            </div>
                            <div
                                className="flex justify-between items-center px-3 py-2
                                    bg-surface-container-highest rounded-full flex-1"
                            >
                                <p className="text-body-medium text-secondary">
                                    Máximo
                                </p>
                                <p className="text-body-large text-tertiary-fixed">C$ {maxLimit}</p>
                            </div>
                        </div>
                        {
                            (diff <= range)
                                ? (
                                    <p
                                        className="text-label-medium text-error"
                                    >
                                        {`* El número se encuentra en el ragno límite de ventas`}
                                    </p>
                                ) : null
                        }
                    </div>
                </article>
            </div>
            <NumbersDetailsList
                list={numbers}
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
        { id: 3, name: 'Oscar Gomez', total: 10 },
    ],
};