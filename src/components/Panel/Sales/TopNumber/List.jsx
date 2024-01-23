
export const PanelTopNumberList = ({ list = [] }) => {

    const listItems = list.map(item => (
        <li
            key={item.number}
            className="flex justify-between rounded-2xl p-3.5
          bg-surface-container"
        >
            <h2 className="text-headline-medium">
                {item.number}
            </h2>
            <div className="flex flex-col gap-2 items-end">
                <p className="text-label-large text-primary">
                    C$ {item.total}
                </p>
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