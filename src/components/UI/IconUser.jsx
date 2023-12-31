export const IconUser = ({ userName = 'User Name', onClickAction, handleRef }) => {
    return (
        <button
            className='bg-tertiary-container rounded-full
                    flex items-center w-10 h-10 justify-center
                    leading-none p-4'
            onClick={onClickAction}
            ref={handleRef}
        >
            {getAlias(userName)}
        </button>
    )
}

// TODO move to utils
const getAlias = (str) => {
    let index = str.indexOf(' ');
    let alias = str.charAt(0);

    if (index !== -1) {
        alias = alias.concat(str.charAt(index + 1));
    } else {
        alias = alias.concat(str.charAt(1));
    }

    return alias.toUpperCase();
}