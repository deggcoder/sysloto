import { useEffect, useRef, useState } from "react";
import { Menu } from "./Menu";

export const MenuList = ({ username, menu }) => {
    const [visibleUser, setVisibleUser] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Verificar si el clic no fue en el botón
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                // El clic fue fuera del botón, realiza la acción que desees
                setVisibleUser(false);
            }
        };

        // Agregar el evento click al documento cuando el componente se monta
        document.addEventListener('click', handleClickOutside);

        // Limpiar el evento al desmontar el componente
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const onClickButton = () => {
        setVisibleUser(visibleUser ? false : true);
    }
    return (
        <div className="block">
            <button
                className='bg-tertiary-container rounded-full
                    flex items-center w-10 h-10 justify-center
                    leading-none p-4'
                onClick={onClickButton}
                ref={buttonRef}
            >
                more_vert
            </button>
            {
                visibleUser
                    ? <Menu
                        menuList={menu}
                    />
                    : null
            }
        </div>
    )
}