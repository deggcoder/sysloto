import { NavLink } from "react-router-dom";
import { IconUser } from "../../UI";

export const DisbursesDetailsSellerList = ({ sellerList = [] }) => {

    const listItems = sellerList.map(seller => (
        <li
            key={seller.idSeller}
        >
            <NavLink
                to={`?vendedor=${seller.idSeller}`}
            >
                <IconUser
                    userName={`${seller.firstName} ${seller.lastName}`}
                />
            </NavLink>
        </li>
    ));

    return (
        <menu
            className="flex gap-2"
        >
            <li className="bg-tertiary-container rounded-full px-3 py-2">
                <NavLink
                    to={''}
                    className="text-title-medium text-on-tertiary-container"
                >
                    Todo
                </NavLink>
            </li>
            {listItems}
        </menu>
    )
}