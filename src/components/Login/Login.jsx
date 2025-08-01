import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/AuthRedux/operations';
import css from './Login.module.css';
import logoImage from '../SharedLayout/call.png';

import { NavLink } from 'react-router-dom';
import { useAuthHook } from '../../customHook/customHook';

export const Login = () => {
  const dispatch = useDispatch();
  const { isRegistered } = useAuthHook();
  const handleButtonPress = e => {
    e.target.style.boxShadow =
      'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      e.target.style.boxShadow = 'none';
    }, 2000);
  }

  const handleSubmit = e => {
    e.preventDefault();
     e.target.elements.button.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
     setTimeout(() => {
     e.target.elements.button.style.boxShadow = 'none';
     }, 2000);
    const form = e.currentTarget;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    //form.reset();
  };

  return (
    <>
      <div className={css.loginContainer}>
        <div className={css.login}>
          <div className={css.symbol}>
            <div className={css.logo}>
              <div role="img" aria-label="computer icon" className={css.frame}>
                <img src={logoImage} alt="Logo" width="50px" />
              </div>
              <span className={css.iconLabel}>Sweet</span>
              <span className={css.iconLabel}>Connect</span>
            </div>
          </div>

          <div>
            <div className={css.formContainer}>
              <form
                className={css.form}
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <label className={css.label}>
                  Email
                  <input
                    type="email"
                    name="email"
                    className={css.input}
                    required
                  />
                </label>
                <label className={css.label}>
                  Password
                  <input
                    type="password"
                    name="password"
                    className={css.input}
                    required
                  />
                </label>
                <button
                  className={css.inputButton}
                  name="button"
                  type="submit"
                >
                  Log In
                </button>
                {isRegistered === false ? (
                  <>
                    <span className={css.inputText}>or</span>
                    <NavLink className={css.inputButton} to="/register" onClick={handleButtonPress}>
                      Register
                    </NavLink>
                  </>
                ) : (
                  <>
                    <div className={css.inputTextInfo}>
                      You're Registered, you can login now
                    </div>
                    <div className={css.inputTextInfo}>
                      Logout to Register another account
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
