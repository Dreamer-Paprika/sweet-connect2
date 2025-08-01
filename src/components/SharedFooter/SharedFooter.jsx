import { Outlet } from 'react-router-dom';
import css from './SharedFooter.module.css';
import { Suspense } from 'react';
//import { useAuthHook } from '../../customHook/customHook';

export const SharedFooter = () => {
  //const { All } = useAuthHook();
  //console.log(All);
  return (
    <>
      <Suspense fallback={<div className={css.suspense}>Loading page...</div>}>
        <Outlet />
      </Suspense>
      <div className={css.footer}>© 2024 - Sweet Connect</div>
    </>
  );
};

export default SharedFooter;
