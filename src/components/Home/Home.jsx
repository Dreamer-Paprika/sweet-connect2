import css from './Home.module.css';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { retrieveApiKey } from '../../redux/AppRedux/operations';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectIsLoading,
  selectVal,
  //selectIsKeyLoading,
  selectValName,
  selectValId,
  selectValDate,
} from '../../redux/AppRedux/selectors';

export const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const myVal = useSelector(selectVal);
  //const isMyValLoading = useSelector(selectIsKeyLoading);
  const myValName = useSelector(selectValName);
  const myValId = useSelector(selectValId);
  const myValDate = useSelector(selectValDate);


  useEffect(() => {
    dispatch(retrieveApiKey());
  }, [dispatch]);
  return (
    <div className={css.homeDisplay}>
      <div>
        <div className={css.homeTitle}>Your Contacts, Anytime, Anywhere</div>
        <div className={css.homeIntro}>
          <i>
            Welcome to Sweet Connect! Securely store your contacts and access
            them on any device. Our user-friendly platform makes it easy to keep
            your connections organized and up-to-date.
          </i>
        </div>
      </div>
      <Link to="/sharedLayout/contacts" className={css.homeLink}>
        Start Connecting
      </Link>

      {isLoading && !error && <div>Please wait...</div>}
      {error && <div>There was an error</div>}
      {myVal && (
        <div className={css.detailsSection}>
          <h2 className={css.detailsSectionTitle}>API DETAILS</h2>
          <ul className={css.detailsWrapper}>
            <li className={css.detailsItem}>
              <span className={css.details}>Api Key Name:</span>{' '}
              <span className={css.detailsVal}>
                <i>{myValName}</i>
              </span>
            </li>
            <li className={css.detailsItem}>
              <span className={css.details}>Api Key:</span>{' '}
              <span className={css.detailsVal}>
                <i>{myVal}</i>
              </span>
            </li>
            <li className={css.detailsItem}>
              <span className={css.details}>Api Id:</span>{' '}
              <span className={css.detailsVal}>
                <i>{myValId}</i>
              </span>
            </li>
            <li className={css.detailsItem}>
              <span className={css.details}>Api Creation Date:</span>{' '}
              <span className={css.detailsVal}>
                <i>{myValDate}</i>
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
    
};
export default Home;