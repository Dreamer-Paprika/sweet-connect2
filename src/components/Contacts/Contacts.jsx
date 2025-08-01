import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { useEffect } from 'react';
import { fetchContacts, retrieveApiKey } from '../../redux/AppRedux/operations';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectIsLoading,
  selectVal,
  selectIsKeyLoading,
} from '../../redux/AppRedux/selectors';
import { getApiKey } from '../../redux/AppRedux/operations';
import  css  from './Contacts.module.css';

export const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const myVal = useSelector(selectVal);
  const isMyValLoading = useSelector(selectIsKeyLoading);

   const handleButtonPress = e => {
     e.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
     setTimeout(() => {
       e.target.style.boxShadow = 'none';
     }, 2000);

      //dispatch(getApiKey());
  };
  
  const handleSubmit = e => {
     e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      getApiKey({
        name: form.elements.name.value,
        customMetaData: form.elements.customMetaData.value,
        customAccountId: form.elements.customAccountId.value,
      })
    );
    
  /*const fetchData = async () => {
    await dispatch(
      getApiKey({
        name: form.elements.name.value,
        customMetaData: form.elements.customMetaData.value,
        customAccountId: form.elements.customAccountId.value,
      })
    );
      
       await dispatch(retrieveApiKey());
  };

   fetchData();*/
    /*console.log({
      name: form.elements.name.value,
      customMetaData: form.elements.customMetaData.value,
      customAccountId: form.elements.customAccountId.value,
    });*/
   };

  useEffect(() => {
    dispatch(retrieveApiKey());
    dispatch(fetchContacts());
  }, [dispatch]);

  //console.log(myVal);

  return (
    <div className={css.coverWrapper}>
      {myVal === null && (
        <div className={css.cover}>
          <div className={css.keyModal}>
            <span className={css.keyModalLabel}>
              To access the endpoints that this page uses you first need to
              create an API KEY, fill the form bellow to create an API KEY.
            </span>
            {isMyValLoading && !error && <b>Generating your API KEY...</b>}
            {error && !isMyValLoading && <b>Could not Generate Key</b>}
            <div className={css.formContainer}>
              <form
                className={css.form}
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <label className={css.label}>
                  Name of API KEY
                  <input
                    type="text"
                    name="name"
                    className={css.input}
                    required
                  />
                </label>
                <label className={css.label}>
                  Custom Account Id
                  <input
                    type="text"
                    name="customAccountId"
                    className={css.input}
                    required
                  />
                </label>
                <label className={css.label}>
                  Custom Meta Data
                  <input
                    type="text"
                    name="customMetaData"
                    className={css.input}
                    required
                  />
                </label>
                <button
                  className={css.keyModalButton}
                  onClick={handleButtonPress}
                >
                  CREATE API KEY
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <ContactForm>
        {isLoading && !error && <b>Please wait...</b>}
        {error && <b>There was an error</b>}
        <ContactList>
          <Filter />
        </ContactList>
      </ContactForm>
    </div>
  );
};

export default Contacts;
