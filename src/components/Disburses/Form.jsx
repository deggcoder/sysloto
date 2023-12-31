import { Form } from "react-router-dom";

export const DisbursesForm = ({ dialogRef, schedule }) => {

    const onCloseModal = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        } else {
            console.error('Referencia al dialogo no encontrada.');
        }
    };

    const header = (
        <header className='pt-2 px-1.5'>
            <div className='py-1 flex items-center'>
                <div className='px-4.5 w-full'>
                    <h3
                        className='text-headline-small text-on-surface'
                    >
                        Número ganador
                    </h3>
                </div>
                <div className='p-1'>
                    <button
                        type='reset'
                        className='material-symbols-outlined p-2 text-on-surface-variant'
                        onClick={onCloseModal}
                    >
                        close
                    </button>
                </div>
            </div>
        </header>
    );

    const inputsContainer = (
        <div className="flex flex-col gap-4.5">
            <div className="flex flex-col gap-1">
                <input
                    type="hidden"
                    name="idShiftSchedule"
                    defaultValue={schedule ? schedule.idShiftSchedule : 0} 
                />
                <input
                    type="text"
                    name="number"
                    id="number"
                    placeholder="Número"
                    className="rounded-ty px-3.5 py-2 border 
                    border-outline text-label-large text-on-surface
                    placeholder:text-outline bg-transparent outline-none
                    ring-primary ring-inset focus-within:ring-2 focus-within:border-transparent"
                />
                <div className="px-3.5">
                    <p
                        className="text-label-medium text-on-surface-variant"
                    >
                        El número debe ser ingresado por sorteo
                    </p>
                </div>
            </div>
        </div>
    );

    const footer = (
        <menu className="flex gap-2 justify-end">
            <button
                onClick={onCloseModal}
                type="reset"
                className="px-6 py-2 rounded-full text-primary hover:bg-surface-container-highest"
            >
                Cancelar
            </button>
            <button
                type="submit"
                className="px-6 py-2 rounded-full text-primary hover:bg-surface-container-highest"
            >
                Guardar
            </button>
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
                    fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
                ref={dialogRef}
                open={false}
            >
                <Form
                    onSubmit={onCloseModal}
                    method='post'
                    action="ganador"
                    className="flex flex-col w-96"
                >
                    {header}
                    {body}
                </Form>
            </dialog>

        </>
    )
}
