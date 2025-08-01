import { Outlet } from 'react-router-dom';
import {
  Container,
  Header,
  Logo,
  Link,
  Frame,
  IconLabel,
  Symbol,
  Button,
  Greeting
} from './SharedLayout.styled';
//import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import logoImage from './call.png';
import { logOut } from '../../redux/AuthRedux/operations';
import { useDispatch } from 'react-redux';
import { useAuthHook } from '../../customHook/customHook';
//import css from './SharedLayout.module.css'
/*import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
} from '../../redux/AuthRedux/selectors';
*/

export const SharedLayout = () => {
    //const isLoggedIn = useSelector(selectIsLoggedIn);
    //const isRefreshing = useSelector(selectIsRefreshing);
  //const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { user } = useAuthHook();
  
  return (
    <Container>
      <Header>
        <Symbol to="/">
          <Logo>
            <Frame role="img" aria-label="computer icon">
              <img src={logoImage} alt="Logo" width="50px" />
            </Frame>
            <IconLabel>Sweet</IconLabel>
            <IconLabel>Connect</IconLabel>
          </Logo>
        </Symbol>
        <div>
          <Greeting>Welcome,</Greeting> <Greeting>{user.name}</Greeting>
        </div>
        <nav>
          <Link to="/sharedLayout/Home">Home</Link>
          <Link to="/sharedLayout/contacts">Contacts</Link>
          <Button type="button" onClick={() => dispatch(logOut())}>
            Logout
          </Button>
        </nav>
      </Header>
      
        <Suspense fallback={<div>Loading page...</div>}>
          <Outlet />
        </Suspense>
      
    </Container>
  );
};
