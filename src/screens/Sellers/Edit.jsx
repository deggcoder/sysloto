import { getSeller, updateSeller } from "../../data";
import {
    Form,
    useNavigate,
    useLoaderData,
    redirect
} from "react-router-dom";

export async function sellerLoader({ params }) {
    let idSeller = parseInt(params.sellerId);
    const seller = await getSeller(idSeller);

    return { seller };
}

export async function sellerAction({ request, params }) {
    let idSeller = parseInt(params.sellerId);

    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateSeller(idSeller, updates);
    return redirect(`/`);
}

export const ScreensSellersEdit = () => {
    const navigate = useNavigate();
    const { seller } = useLoaderData();

    return (
        <section
            className='flex flex-col
            bg-surface-container-low rounded-t-2xl min-w-[260px] w-[650px]'
        >
            <header className="flex flex-col gap-1 pt-2 pb-6">
                <menu className="flex justify-between text-on-surface-variant pt-1 pl-1.5 pr-1.5">
                    <div className="p-1">
                        <button
                            type="button"
                            onClick={() => {
                                navigate(-1);
                            }}
                            className='material-symbols-outlined p-2 rounded-full hover:bg-surface-container-high'
                        >
                            arrow_back
                        </button>
                    </div>
                    <div className="flex gap-2 py-1.5 text-label-large">
                        <div className="flex items-center">
                            <button
                                type="submit"
                                form="seller-form"
                                className="px-4 py-2 bg-primary text-on-primary rounded-full"
                            >
                                Guardar
                            </button>
                        </div>
                        <Form
                            method="post"
                            action={`eliminar`}
                            className="p-1"
                            onSubmit={(event) => {
                                if (
                                    !confirm(
                                        "¿Estás seguro que quieres eliminar este vendedor?"
                                    )
                                ) {
                                    event.preventDefault();
                                }
                            }}
                        >
                            <button
                                type="submit"
                                className='material-symbols-outlined p-2 rounded-full hover:bg-surface-container-high'
                            >
                                delete
                            </button>
                        </Form>
                    </div>
                </menu>
                <div className="px-4.5">
                    <h3 className="text-headline-small">Editar vendedor</h3>
                </div>
            </header>

            <Form
                method="post"
                id="seller-form"
                className="flex flex-col px-4.5 py-2 gap-4.5"
            >
                <div className="flex gap-2">
                    <span className='material-symbols-outlined p-2 rounded-full' title="Datos personales">
                        person
                    </span>
                    <div className="flex flex-col gap-4.5 w-full pr-12">
                        <div className="flex flex-col gap-1">
                            <input
                                type="text"
                                aria-label="First name"
                                name="firstName"
                                id="firstName"
                                placeholder="Nombre"
                                className="rounded-ty px-3.5 py-2 border w-full
                                border-outline text-label-large text-on-surface
                                placeholder:text-outline bg-transparent outline-none
                                ring-primary ring-inset focus-within:ring-2 focus-within:border-transparent"
                                defaultValue={seller.firstName}
                            />
                            <div className="px-3.5">
                                <p className="text-label-medium text-on-surface-variant">Primer nombre</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <input
                                type="text"
                                aria-label="Last name"
                                name="lastName"
                                id="lastName"
                                placeholder="Apellido"
                                className="rounded-ty px-3.5 py-2 border w-full
                                border-outline text-label-large text-on-surface
                                placeholder:text-outline bg-transparent outline-none
                                ring-primary ring-inset focus-within:ring-2 focus-within:border-transparent"
                                defaultValue={seller.lastName}
                            />
                            <div className="px-3.5">
                                <p className="text-label-medium text-on-surface-variant">Primer apellido</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 w-40">

                            <input
                                type="text"
                                aria-label="Factor"
                                name="factor"
                                id="factor"
                                placeholder="Factor"
                                className="rounded-ty px-3.5 py-2 border 
                                border-outline text-label-large text-on-surface
                                placeholder:text-outline bg-transparent outline-none
                                ring-primary ring-inset focus-within:ring-2 focus-within:border-transparent"
                                defaultValue={seller.factor}
                            />
                            <div className="px-3.5">
                                <p className="text-label-medium text-on-surface-variant">
                                    Factor de venta
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </section>
    )
}
