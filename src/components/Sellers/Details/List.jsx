import { Form } from "react-router-dom";

export const SellersDetailsList = ({ numberList = [], totalNumbers = 0 }) => {

    const listItems = numberList.map(number => (
        <li
            key={number.number}
        >
            <div className="flex px-3.5 py-2 gap-3.5 rounded-2xl bg-surface-container items-center w-full">
                <div>
                    <h5 className="rounded-full w-10 h-10 flex justify-center items-center 
                        bg-surface-container-high">
                        {number.number}
                    </h5>
                </div>
                <div
                    className="flex flex-col justify-between items-start w-full"
                >
                    <p className="text-body-large text-primary">{`C$ ${number.price}`}</p>
                    <p className="text-label-large text-error">{`Factor C$ ${number.factor}`}</p>
                </div>
                <Form
                    method="post"
                    action={`eliminar/${number.number}`}
                    onSubmit={(event) => {
                        if (
                            !confirm(
                                "¿Estás seguro que quieres eliminar este registro?"
                            )
                        ) {
                            event.preventDefault();
                        }
                    }}
                >
                    <button
                        type="submit"
                        className="flex p-2 text-error"
                    >
                        <span className="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                </Form>
            </div>
        </li>
    ));

    return (
        <div className="flex flex-col gap-3.5 px-4.5 overflow-auto">
            <div className="flex justify-between items-center py-1">
                <p className='relative text-label-medium'>
                    {`${totalNumbers} números vendidos`}
                </p>
            </div>
            <ul className="flex flex-col gap-2">
                {
                    numberList.length ? (
                        listItems
                    ) : (
                        <p className='py-2 pl-6 pr-3.5 flex gap-3 items-center text-label-large text-on-surface'>
                            <i>No hay registro de números</i>
                        </p>
                    )
                }
            </ul>
        </div>
    )
}