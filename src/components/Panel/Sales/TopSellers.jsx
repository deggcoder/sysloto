import { useLoaderData } from "react-router-dom";
import { getSummary, periodMenu } from "../../../data";
import { MenuFloatingButton } from "../../UI";
import { PanelTopSellersList } from "../TopSeller/List";

export async function topSellersLoader({ request, params }) {
    const url = new URL(request.url);
    const p = url.searchParams.get("period");

    const response = await getSummary(p);

    return { response };
}

export const PanelSalesTopSellers = () => {

    const { response } = useLoaderData();

    return (

        <section className="flex flex-col overflow-auto gap-3.5 bg-surface-container-low
      rounded-t-2xl flex-1 pb-4.5">
            <header className="flex justify-between items-center
        px-4.5 pt-4.5 pb-2 relative">
                <div className="flex flex-col">
                    <h3 className="text-headline-small">
                        Racha de vendedores
                    </h3>
                </div>
                {/* <button className="p-2 rounded-full flex items-center
            material-symbols-outlined hover:bg-surface-container-high">
          more_vert
        </button> */}
            </header>

            {/* <NavBar /> */}
            <div className="flex justify-between items-center px-4.5">
                <MenuFloatingButton
                    menu={periodMenu}
                />
                <p className='relative text-label-medium'>
                    Filtrar por periodo
                </p>
            </div>
            <div className="flex flex-col gap-6">
                <PanelTopSellersList
                    list={response.sellers}
                />
            </div>
        </section>
    )
}

const list = [
    { id: 1, number: '00', schedule: 'Diurno', amount: 120 },
    { id: 2, number: '10', schedule: 'Diurno', amount: 150 },
    { id: 3, number: '99', schedule: 'Diurno', amount: 12 },
];