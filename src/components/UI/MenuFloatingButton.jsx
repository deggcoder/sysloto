import { useEffect, useRef, useState } from "react";
import { Menu } from "../UI";

export const MenuFloatingButton = ({menu = []}) => {
    const [visible, setVisible] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          // Verificar si el clic no fue en el botón
          if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            // El clic fue fuera del botón, realiza la acción que desees
            setVisible(false);
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
        setVisible(visible ? false : true);
    }

    return (
        <div className="block">
            <button
                type="button"
                className="flex justify-center rounded-full pl-3 pr-2 gap-1 py-1 hover:bg-surface-container
                            text-label-large"
                onClick={onClickButton}
                ref={buttonRef}
            >
                Hoy
                <span className="material-symbols-outlined text-secondary">
                    arrow_drop_down
                </span>
            </button>
            {
                visible
                    ? <Menu
                        menuList={menu}
                        useSeller={false}
                    />
                    : null
            }
            
        </div>
    )
}