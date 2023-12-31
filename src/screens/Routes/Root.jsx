import React, { useEffect, useState } from 'react'
import { Header, NavigationDrawer } from '../../components';
import { Outlet, useLoaderData, } from "react-router-dom";
import { getCurrentSchedule, getSellers } from '../../data';

export async function loadSellers() {
  const sellers = await getSellers();

  return { sellers };
}

export const ScreensRoutesRoot = () => {
  const { sellers } = useLoaderData();
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    getCurrentSchedule()
      .then(data => {
        setSchedule(data);
      });

  }, [schedule]);

  return (
    <>
      <Header
        schedule={schedule}
      />
      <div className='flex flex-1 overflow-auto w-full h-full'>
        <NavigationDrawer
          sellers={sellers}
          schedule={schedule}
        />
        <main className='flex h-full w-full gap-3.5 pr-3.5'>
          <Outlet />
        </main>
      </div>
    </>
  )
}
