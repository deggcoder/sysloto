import { IconUser } from "../../UI";

export const NumbersDetailsList = ({ list = [] }) => {

    const listItems = list.map(number => (
        <li
            key={number.idSeller}
        >
            <div className="flex p-3.5 rounded-2xl bg-surface-container justify-between items-start w-full">
                <div
                    className="flex justify-between items-center flex-1"
                >
                    <div className="flex gap-3.5 items-center">
                        <IconUser userName={number.seller} />
                        <h5 className="text-title-medium text-on-surface">{number.seller}</h5>
                    </div>
                    <h5 className="text-title-medium text-on-surface">
                        C$ {number.price}
                    </h5>
                </div>
            </div>
        </li>
    ));

    return (
        <div className="flex flex-col gap-3.5 px-4.5 overflow-auto">
            <div className="flex justify-between items-center py-1">
                <p className='relative text-label-medium'>
                    Distribución
                </p>
            </div>
            <ul className="flex flex-col gap-2">{listItems}</ul>
        </div>
    )
}