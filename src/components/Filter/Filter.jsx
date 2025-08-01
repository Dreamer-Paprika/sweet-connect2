import { useSelector } from 'react-redux';
import { selectContacts } from '../../redux/AppRedux/selectors';
import { selectContactsFilter } from '../../redux/AppRedux/selectors';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import css from './Filter.module.css';
import { setFilter } from '../../redux/AppRedux/filterSlice';

export const Filter = () => {
  const searchTermId = nanoid();
  const contacts = useSelector(selectContacts);
  const filterValue = useSelector(selectContactsFilter);
  const dispatch = useDispatch();
  const handleSearch = event => {
    dispatch(setFilter(event.target.value));
    console.log(event.target.value);
  };
  const bestMatches = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filterValue.trim().toLowerCase()) &&
      filterValue.trim() !== ''
  );

  return (
    <div className={css.contactList}>
      <label htmlFor={searchTermId}>
        <span className={css.formLabel}>Find Contacts By Name:</span>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          required
          onChange={handleSearch}
          id={searchTermId}
          autoComplete="off"
          className={css.formInput}
        />
      </label>

      {filterValue !== '' && bestMatches.length !== 0 &&(
          <ul className={css.contactsList}>
            {bestMatches.map(contact => (
              <li key={contact.id} className={css.contactsItem}>
                <span className={css.contactsData}>
                  {contact.name}: {contact.phone}
                </span>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};
