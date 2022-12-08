import { FormContainer, Input, Button, Label } from './ContactForm.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ContactForm = ({ onFormSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    onFormSubmit({ name, number });
    resetForm();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };

  return (
    <FormContainer autoComplete="of" onSubmit={handleSubmit}>
      <Label htmlFor="name">
        Name:
        <Input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          required
        />
      </Label>
      <Label htmlFor="number">
        Number:
        <Input
          type="tel"
          name="number"
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          required
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </FormContainer>
  );
};

ContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
