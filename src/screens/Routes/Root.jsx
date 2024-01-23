import React, { useEffect, useState } from 'react';
import { Outlet, useLoaderData, } from "react-router-dom";
import { Header, NavigationDrawer } from '../../components';
import { getCurrentSchedule, getSellers } from '../../data';

export async function loadSellers() {
  const sellers = await getSellers();

  return { sellers };
}

export const ScreensRoutesRoot = () => {
  const { sellers } = useLoaderData();
  const [schedule, setSchedule] = useState({});
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    getCurrentSchedule()
      .then(data => {
        setSchedule(data);
      });

  }, [schedule]);

  function showNavigation() {
    if(isOn) {
      setIsOn(false);
    } else {
      setIsOn(true);
    }
  }

  return (
    <>
      <Header
        schedule={schedule}
        handleClick={showNavigation}
      />
      <div className='flex flex-1 overflow-auto w-full h-full'>
        {
          isOn
            ? (
              <NavigationDrawer
                sellers={sellers}
                schedule={schedule}
              />
            ) : null
        }
        <main className='flex h-full px-4.5 w-full gap-3.5 pr-3.5'>
          <Outlet />
        </main>
      </div>
    </>
  )
}
