import { Link } from "react-router-dom";

export const PanelControlPanelList = () => {

  const listItems = options.map(option => (
    <li
      key={option.id}
    >
      <Link
        className="flex justify-between rounded-2xl p-3.5
          bg-surface-container-low hover:bg-surface-container"
        to={option.path}
      >
        <div className="flex flex-col">
          <h5 className="text-title-medium">{option.title}</h5>
          <p className="text-body-medium text-on-surface-variant">{option.description}</p>
        </div>
        <span
          className='material-symbols-outlined'
        >
          navigate_next
        </span>
      </Link>
    </li>
  ));

  return (
    <div className="flex flex-col gap-3.5 flex-1 overflow-auto">
      <h5 className='relative text-body-large'>
        Información sobre tus ventas
      </h5>
      <ul className="flex flex-col gap-2">{listItems}</ul>
    </div>
  )
}

const options = [
  { id: 1, title: 'Ventas', description: 'Recopilación de las ventas totales hechas en un periodo', path: 'ventas' },
  { id: 2, title: 'Racha de vendedores', description: 'Obten información sobre la recha de ventas de tus vendedores', path: 'v/racha' },
  { id: 3, title: 'Racha de números', description: 'Obten información sobre los números más vendidos', path: 'n/racha' },
];