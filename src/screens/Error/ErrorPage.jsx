import { useRouteError } from 'react-router-dom';

export default function ScreensErrorPage() {
    const error = useRouteError();
    console.error(error);
  
    return (
      <div id="error-page">
        <h1 className='text-headline-medium'>Error</h1>
        <p className='text-body-large'>
            Un error inesperado ha ocurrido
        </p>
        <p>
          <i>Causa: {error.statusText || error.message}</i>
        </p>
      </div>
    );
  }