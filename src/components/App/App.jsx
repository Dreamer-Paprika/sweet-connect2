import { useEffect, lazy } from 'react';
//import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { RestrictedRouteRegister } from '../RestrictedRouteRegister/RestrictedRouteRegister';
import { RestrictedRouteLogin } from '../RestrictedRouteLogin/RestrictedRouteLogin';
import { refreshUser } from '../../redux/AuthRedux/operations';
import { useDispatch } from 'react-redux';
import { useAuthHook } from '../../customHook/customHook'

const Register = lazy(() => import('../Register/Register'));
const Login = lazy(() => import('../Login/Login'));
const Contacts = lazy(() => import('../Contacts/Contacts'));
const Home = lazy(() => import('../Home/Home'));
const SharedFooter = lazy(() => import('../SharedFooter/SharedFooter'));


export const App = () => {
  const { isRefreshing } = useAuthHook();
  const dispatch = useDispatch();


    useEffect(() => {
      dispatch(refreshUser());
    }, [dispatch]);
  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<SharedFooter/>}>
        <Route
          index
          element={
            <RestrictedRouteLogin
              redirectTo="sharedLayout/Home"
              component={<Login />}
            />
          }
        />
        <Route
          path="register"
          element={
            <RestrictedRouteRegister redirectTo="/" component={<Register />} />
          }
        />
        <Route path="sharedLayout" element={<SharedLayout />}>
          <Route
            path="Home"
            element={<PrivateRoute redirectTo="/" component={<Home />} />}
          />
          <Route
            path="contacts"
            element={<PrivateRoute redirectTo="/" component={<Contacts />} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};