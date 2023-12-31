import { useEffect, useRef, useState } from "react";
import { IconUser } from "./IconUser"
import { Menu } from "./Menu";

export const UserFloatingButton = ({ username, menu }) => {
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
        <div className="block p-1">
            <IconUser
                userName={username}
                onClickAction={onClickButton}
                handleRef={buttonRef}
            />
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