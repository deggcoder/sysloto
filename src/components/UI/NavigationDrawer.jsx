import { useRef } from 'react';
import { SellersForm } from '../Sellers';
import { FABButton } from './FABButton';
import { NavLinkItem } from './NavLinkItem';
import { NavLinkUser } from './NavLinkUser';
import { createSeller } from '../../data';
import { useParams } from 'react-router-dom';
import { DisbursesForm } from '../Disburses';

export async function action({ request, params }) {
    const formData = await request.formData();
    const newSeller = Object.fromEntries(formData);
    const seller = await createSeller(newSeller.firstName, newSeller.lastName, newSeller.factor);
    return { seller }
}

export const NavigationDrawer = ({ sellers, schedule }) => {
    const { sellerId, scheduleId } = useParams();

    const refToDialog = useRef(null);

    const openModal = () => {
        if (refToDialog.current) {
            refToDialog.current.showModal();
        }
    };

    const refToDisburse = useRef(null);

    const openDisburseModal = () => {
        if (refToDisburse.current) {
            refToDisburse.current.showModal();
        }
    };

    return (
        <aside
            className='flex flex-col gap-4 w-80'
        >
            <div className='w-full px-2 py-4 relative'>
                <FABButton
                    onClick={openDisburseModal}
                />
            </div>
            <nav className='pr-4 flex-1 overflow-auto'>
                <ul className=''>
                    <NavLinkItem
                        iconName='chart_data'
                        label='Panel'
                        link='panel'
                    />
                    <NavLinkItem
                        iconName='format_list_numbered_rtl'
                        label='Números'
                        link='numeros'
                    />
                    <NavLinkItem
                        iconName='overview'
                        label='Desembolsos'
                        link='desembolsos'
                    />
                    <div method='post'
                        className='flex justify-between items-center
                            py-2 pl-6'
                    >
                        <p className='text-body-large'>Vendedores</p>
                        <div className='p-1'>
                            <button
                                className='material-symbols-outlined
                                    p-2 hover:bg-surface-container-high
                                    rounded-full'
                                onClick={openModal}
                                type='button'
                            >
                                person_add
                            </button>
                        </div>
                    </div>
                    {
                        sellers.length ? (
                            sellers.map(seller => (
                                <NavLinkUser
                                    key={seller.idSeller}
                                    label={`${seller.firstName} ${seller.lastName}`}
                                    link={`vendedor/${seller.idSeller}/turno/${scheduleId ? scheduleId : 1}/ventas`}
                                />
                            ))
                        ) : (
                            <p className='py-2 pl-6 pr-3.5 flex gap-3 items-center text-label-large text-on-surface'>
                                <i>No hay vendedores</i>
                            </p>
                        )
                    }
                    <SellersForm
                        dialogRef={refToDialog}
                    />
                    <DisbursesForm
                        dialogRef={refToDisburse}
                        schedule={schedule}
                    />
                </ul>
            </nav>
        </aside>
    )
}


const seller = [
    { id: 1, name: 'Juan Perez' },
    { id: 2, name: 'Daniel Lopez' },
    { id: 3, name: 'Oscar Gomez' },
];