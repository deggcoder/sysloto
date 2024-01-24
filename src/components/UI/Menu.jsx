import { NavLink, useParams } from "react-router-dom";

export const Menu = ({ menuList = [{ label: 'Menu Item', link: '#' }], useSeller = true,
    handleChange }) => {
    const {sellerId} = useParams();

    return (
        <div className="w-52 absolute z-10 py-2 mt-1 bg-surface-container-high rounded-lg 
                        overflow-hidden drop-shadow-xl">
            <ul
                className="flex flex-col text-label-large"
            >
                {
                    menuList.map(item => (
                        <li key={item.id}
                            className="hover:bg-surface-container-highest flex flex-col"
                            onClick={()=> handleChange(item.label)}
                        >
                            <NavLink
                                to={
                                    `${useSeller 
                                        ? item.link + sellerId 
                                        : item.link + item.param}`
                                }
                                className="px-3.5 py-2 flex gap-3.5 items-center"
                            >
                                {/* <span className="material-symbols-outlined text-secondary">
                                        arrow_drop_down
                                    </span> */}
                                <span>
                                    {item.label}
                                </span>
                                {/* <span className="material-symbols-outlined text-secondary">
                                    </span> */}
                            </NavLink>
                            {/* <div role="divider" className="py-2 border-b border-outline-variant flex items-center"></div> */}
                        </li>
                    ))
                }
                
            </ul>
        </div>
    )
}
