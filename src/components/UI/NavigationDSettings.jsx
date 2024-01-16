import { NavLinkItem } from './NavLinkItem';
import { navigationDSItems } from '../../data';
import { Navigate } from 'react-router-dom';

// export async function action({ request, params }) {
//     const formData = await request.formData();
//     const newSeller = Object.fromEntries(formData);
//     const seller = await createSeller(newSeller.firstName, newSeller.lastName, newSeller.factor);
//     return { seller }
// }

export const NavigationDSettings = ({ schedule }) => {
    const itemList = navigationDSItems.map(element => (
        <li
            key={element.idItem}
        >
            <NavLinkItem
                iconName={element.useIcon ? element.icon : null}
                label={element.label}
                link={element.link}
            />
        </li>
    ));

    return (
        <aside
            className='flex flex-col gap-4 w-80 py-4.5'
        >
            <nav className='pr-4 flex-1 overflow-auto'>
                <ul className=''>
                    {
                        itemList.length ? (
                            itemList
                        ) : (
                            <p className='py-2 pl-6 pr-3.5 flex gap-3 items-center text-label-large text-on-surface'>
                                <i>No tiene acceso a las configuraciones del sistema. Consulte al administrador.</i>
                            </p>
                        )
                    }
                </ul>
            </nav>
        </aside>
    )
}