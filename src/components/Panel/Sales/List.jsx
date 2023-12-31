export const PanelSalesList = ({ list }) => {

    const listItems = list.map(item => (
        <li
            key={item.id}
            className="flex justify-between rounded-2xl p-3.5
          bg-surface-container"
        >
            <h2 className="text-headline-medium">
                {item.number}
            </h2>
            <div className="flex flex-col gap-2 items-end">
                <p className="text-label-large py-1 px-3 rounded-full bg-surface-container-high">
                    {item.schedule}
                </p>
                <p className="text-label-large text-primary">
                    C$ {item.amount}
                </p>
            </div>
        </li>
    ));

    return (
        <div className="flex flex-col px-4.5 gap-3.5 flex-1 overflow-auto">
            <h5 className='relative text-body-large'>
                Números ganadores
            </h5>
            <ul className="flex flex-col gap-2">{listItems}</ul>
        </div>
    )
}