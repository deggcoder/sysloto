import { useEffect, useState } from "react";
import { Form } from "react-router-dom";

export const SettingsNumbersForm = ({ dialogRef, number }) => {

    const [max, setMax] = useState(0);
    const [range, setRange] = useState(0);
    const [id, setId] = useState(0);

    useEffect(() => {
        if (number.range !== undefined && number.maxLimit !== undefined) {
            setMax(number.maxLimit);
            setRange(number.range);
            setId(number.idNumber);
        }
    }, [number]);

    const onCloseModal = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        } else {
            console.error('Referencia al dialogo no encontrada.');
        }
    };

    const handleMax = (e) => {
        setMax(e.target.value);
    }

    const handleRange = (e) => {
        setRange(e.target.value);
    }

    const header = (
        <header className='pt-3.5'>
            <div className='py-1 flex items-center'>
                <div className='px-4.5 w-full'>
                    <h3
                        className='text-headline-small text-on-surface'
                    >
                        Editar número
                    </h3>
                </div>
            </div>
        </header>
    );

    const inputsContainer = (
        <div className="flex flex-col gap-4.5 w-full">

            <input name="idNumber" type="hidden" value={id} />
            <div className="flex flex-col gap-1">
                <input
                    type="text"
                    name="number"
                    defaultValue={number.number}
                    id="number"
                    readOnly
                    className="rounded-ty px-3.5 py-2 border 
                    border-outline text-label-large text-on-surface
                    placeholder:text-outline bg-transparent outline-none max-w-[56px]
                    ring-primary ring-inset focus-within:ring-2 focus-within:border-transparent"
                />
                <div className="px-3.5">
                    <p className="text-label-medium text-on-surface-variant">Margen de aviso</p>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <input
                    type="text"
                    value={max}
                    onChange={handleMax}
                    name="maxLimit"
                    id="maxLimit"
                    placeholder="Límite"
                    className="rounded-ty px-3.5 py-2 border 
                    border-outline text-label-large text-on-surface
                    placeholder:text-outline bg-transparent outline-none
                    ring-primary ring-inset focus-within:ring-2 focus-within:border-transparent"
                />
                <div className="px-3.5">
                    <p className="text-label-medium text-on-surface-variant">Límite de venta</p>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <input
                    type="text"
                    name="range"
                    value={range}
                    onChange={handleRange}
                    id="range"
                    placeholder="Magen"
                    className="rounded-ty px-3.5 py-2 border 
                    border-outline text-label-large text-on-surface
                    placeholder:text-outline bg-transparent outline-none
                    ring-primary ring-inset focus-within:ring-2 focus-within:border-transparent"
                />
                <div className="px-3.5">
                    <p className="text-label-medium text-on-surface-variant">Margen de aviso</p>
                </div>
            </div>

        </div>
    );

    const footer = (
        <menu className="flex gap-2 justify-end">
            <button onClick={onCloseModal} type="reset" className="px-6 py-2 rounded-full text-primary hover:bg-surface-container-highest">Cancelar</button>
            <button type="submit" className="px-6 py-2 rounded-full text-primary hover:bg-surface-container-highest">Guardar</button>
        </menu>
    );

    const body = (
        <section className="px-4.5 pt-3.5 pb-6 flex flex-col gap-4.5">

            {inputsContainer}
            {footer}

        </section>
    );

    return (
        <>
            <dialog
                aria-modal={true}
                className='bg-surface-container-high rounded-3xl
                    fixed min-w-[260px] w-[550px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
                ref={dialogRef}
                open={false}
            >
                <Form
                    onSubmit={onCloseModal}
                    method='post'
                    className="flex flex-col w-full"
                >
                    {header}
                    {body}
                </Form>
            </dialog>

        </>
    )
}
