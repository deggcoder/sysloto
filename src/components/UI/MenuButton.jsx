export const MenuButton = ({handleClick}) => {
  return (
    <button
      className='p-3 leading-none rounded-full hover:bg-surface-container-high'
      onClick={() => handleClick()}
    >
      <span className="material-symbols-outlined">
        drag_handle
      </span>
    </button>
  )
}
