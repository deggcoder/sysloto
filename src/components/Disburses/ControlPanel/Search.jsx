import { useEffect, useState } from "react";
import { Form, useLoaderData, useSubmit } from "react-router-dom";

export const DisbursesControlPanelSearch = () => {
    const [visible, setVisible] = useState(false);
    const { q } = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        if (visible) {
            document.getElementById("q").value = q;
        }
    }, [q]);

    const onClickButton = () => {
        setVisible(visible ? false : true);
    }

    return (
        <Form
            role="search"
            id="search-form"
            className='flex flex-1 justify-between items-center flex-wrap'
        >
            {
                !visible &&
                <h3 className='text-headline-medium'>Desembolsos</h3>
            }
            <div className={`flex flex-1 justify-end items-center order-1 rounded-full
                ${visible && 'bg-surface-container-high'}`}>
                <button
                    type="button"
                    className={`flex items-center p-2 rounded-full
                        hover:bg-surface-container-high order-3
                        ${visible && 'bg-surface-container-highest'}`}
                    onClick={onClickButton}
                >
                    <span
                        className='material-symbols-outlined'
                    >
                        search
                    </span>
                </button>
                {
                    visible &&
                    <input
                        className="flex items-center py-2 px-3 border-none ring-0 outline-none
                        text-label-large flex-1 bg-transparent placeholder:text-on-surface-variant"
                        type="search"
                        name="q"
                        id="q"
                        aria-label="Search numbers"
                        placeholder="Buscar"
                        defaultValue={q}
                        onChange={(event) => {
                            const isFirstSearch = q == null;
                            submit(event.currentTarget.form, {
                                replace: !isFirstSearch,
                            });
                        }}
                    />
                }
            </div>

        </Form>
    )
}
