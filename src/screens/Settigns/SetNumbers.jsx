import { Form, useLoaderData, useSubmit } from "react-router-dom";
import { AlertBanner, SettingsNumbersForm } from "../../components";
import { getNumberList, updateNumber } from "../../data";
import { useRef, useState } from "react";
import { useEffect } from "react";

export async function setNumbersAction({ request, params }) {
    const formData = await request.formData();
    const number = Object.fromEntries(formData);
    const idNumber = parseInt(number.idNumber);
    delete number.idNumber;

    const upd = await updateNumber(idNumber, number);

    return upd;
}

export async function setNumbersLoader({request}) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    const numbers = await getNumberList(q);

    return { numbers, q };
}

export const ScreensSetNumbers = () => {

    const { numbers, q } = useLoaderData();
    const refToDialog = useRef(null);
    const [number, setNumber] = useState({});
    const submit = useSubmit();

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    const openModal = (obj) => {
        if (refToDialog.current) {
            refToDialog.current.showModal();
        }
        setNumber(obj);
    };

    const numberList = numbers.map((number, index) => (
        <li
            key={number.idNumber}
            className={`flex gap-8 px-1 py-2 ${index != 0 && 'border-t border-outline'}`}
        >
            <div className="flex">
                <div className="p-2">
                    <p>
                        {number.number}
                    </p>
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <p className="text-label-large">
                    Límite C$ {number.maxLimit}
                </p>
                <p className="text-label-large text-on-surface-variant">
                    Límite C$ {number.range}
                </p>
            </div>
            <div className="flex">
                <button
                    type="button"
                    className="p-2 material-symbols-outlined"
                    onClick={() => openModal(number)}
                >
                    edit
                </button>
            </div>
        </li>
    ));

    return (
        <>
            <section
                className='flex flex-col
            bg-surface-container-low rounded-t-2xl min-w-[260px] w-[750px]'
            >
                <header
                    className="py-3 flex relative"
                >
                    <div
                        className="flex px-4.5 pt-1 items-center"
                    >
                        <h3
                            className="text-headline-small"
                        >
                            Configuración de números
                        </h3>
                    </div>
                </header>
                <div
                    className="px-9 py-2 flex flex-col flex-1 overflow-auto"
                >
                    <AlertBanner
                        text="Puedes configurar el límite de ventas dirias para cada número. 
                        Esta configuración se aplica sobre cada turno de forma independiente, 
                        por lo que, el indicador de Alcanzado de reiniciará por cada cambio de 
                        turno."
                    />
                    <div
                        className="flex flex-col gap-3 py-4.5"
                    >
                        <h4 className="text-title-large text-on-surface-variant">
                            Personalizar números
                        </h4>
                        <p className="text-body-large">
                            Para aplicar una configuración distinta para cada número, selecciona el
                            número correspondiente y modifica el límite, así como el
                            <strong className="text-primary-fixed"> margen de aviso de </strong>
                            límite alcanzado, estableciendo el valor que corresponda.
                        </p>

                        <div
                            aria-label="table-wrapper"
                            className="flex flex-col gap-2 px-6 py-4.5 flex-1 overflow-auto"
                        >
                            <Form
                                role="search"
                                id="search-form"
                                className="flex justify-end items-center ">
                                <label
                                    className="material-symbols-outlined p-2 text-outline"
                                    htmlFor="q"
                                >
                                    search
                                </label>
                                <input
                                    type="text"
                                    name="q"
                                    id="q"
                                    defaultValue={q}
                                    onChange={(event) => {
                                        const isFirstSearch = q == null;
                                        submit(event.currentTarget.form, {
                                            replace: !isFirstSearch,
                                        });
                                    }}
                                    className="bg-transparent outline-none border-b border-outline
                                        px-2 py-1 placeholder:text-outline text-label-large
                                        focus-within:border-primary focus-within:border-transparent"
                                    placeholder="Buscar"
                                />
                            </Form>

                            <ul className="overflow-auto">
                                {
                                    numberList
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <SettingsNumbersForm
                dialogRef={refToDialog}
                number={number}
            />
        </>
    )
}
