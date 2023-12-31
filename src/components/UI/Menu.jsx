import { Link, useParams } from "react-router-dom"

export const Menu = ({ menuList = [{ label: 'Menu Item', link: '#' }] }) => {
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
                            className="hover:bg-surface-container-highest flex flex-col">
                            <Link
                                to={`${item.link + sellerId}`}
                                className="px-3.5 py-2 flex gap-3.5 items-center"
                            >
                                {/* <span className="material-symbols-outlined text-secondary">
                                        arrow_drop_down
                                    </span> */}
                                <span>{item.label}</span>
                                {/* <span className="material-symbols-outlined text-secondary">
                                    </span> */}
                            </Link>
                            {/* <div role="divider" className="py-2 border-b border-outline-variant flex items-center"></div> */}
                        </li>
                    ))
                }
                
            </ul>
        </div>
    )
}
