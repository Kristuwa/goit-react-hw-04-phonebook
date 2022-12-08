import { useEffect, useState } from 'react';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { Container, TitleForm, TitleContacts } from './App.styled';
import shortid from 'shortid';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    if (window.localStorage.getItem('contacts')) {
      return JSON.parse(window.localStorage.getItem('contacts'));
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  });

  const addContact = newContact => {
    for (let contact of contacts) {
      if (newContact.name.toLowerCase() === contact.name.toLowerCase()) {
        alert(`${newContact.name} is already in contacts`);
        return;
      }
    }
    const id = shortid.generate();
    const newAddContact = { ...newContact, id: id };
    setContacts(prevState => [newAddContact, ...prevState]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const getFilterList = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filterList = getFilterList();

  return (
    <Container>
      <TitleForm>Phonebook</TitleForm>
      <ContactForm onFormSubmit={addContact} />
      <TitleContacts>Contacts</TitleContacts>
      {filterList.length > 0 && (
        <>
          <Filter value={filter} onChange={setFilter} />
          <ContactList listContacts={filterList} handleCLick={deleteContact} />
        </>
      )}
      {filterList.length === 0 && contacts.length > 0 && (
        <Filter value={filter} onChange={setFilter} />
      )}
    </Container>
  );
};
