import { IconUser } from "../../UI";

export const PanelTopSellersList = ({ list = [] }) => {

    const listItems = list.map(seller => (
        <li
            key={seller.idSeller}
        >
            <div className="flex p-3.5 rounded-2xl bg-surface-container justify-between items-start w-full">
                <div
                    className="flex justify-between items-center flex-1"
                >
                    <div className="flex gap-3.5 items-center">
                        <IconUser userName={seller.seller} />
                        <h5 className="text-title-medium text-on-surface">{seller.seller}</h5>
                    </div>
                    <h5 className="text-title-medium text-on-surface">
                        C$ {seller.total}
                    </h5>
                </div>
            </div>
        </li>
    ));

    return (
        <div className="flex flex-col gap-3.5 px-4.5 overflow-auto">
            <div className="flex justify-between items-center py-1">
                <h5 className='relative text-body-large'>
                    Ventas totales
                </h5>
            </div>
            <ul className="flex flex-col gap-2">{listItems}</ul>
        </div>
    )
}

let response = [
    {idSeller: 1, seller: "Nombre", total: 120},
];