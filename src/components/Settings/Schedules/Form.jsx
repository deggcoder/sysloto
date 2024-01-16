import { Form } from "react-router-dom";

export const SettingsSchedulesForm = ({ dialogRef, id }) => {

    const onCloseModal = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        } else {
            console.error('Referencia al dialogo no encontrada.');
        }
    };

    const header = (
        <header className='pt-3.5'>
            <div className='py-1 flex items-center'>
                <div className='px-4.5 w-full'>
                    <h3 
                        className='text-headline-small text-on-surface'
                    >
                        Editar horario de fin de turno
                    </h3>
                </div>
            </div>
        </header>
    );

    const inputsContainer = (
        <div className="flex flex-col gap-4.5 w-full">
            
            <div className="flex flex-col gap-1 w-full">
                <input name="idShiftSchedule" type="hidden" value={id} />
                <input
                    type="time"
                    id="hora-minutos"
                    name="endHour"
                    step="60"
                    placeholder="HH/MM"
                    className="bg-transparent border border-outline rounded-ty px-3.5 py-2
                        w-full text-outline placeholder:text-outline ring-primary ring-inset
                        focus-within:ring-2 focus-within:border-transparent outline-none"
                />
                <div className="px-3.5">
                    <p className="text-label-medium text-on-surface-variant">
                        Seleccionar horario
                    </p>
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
