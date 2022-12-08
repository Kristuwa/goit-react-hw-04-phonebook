import { FormContainer, Input, Button, Label } from './ContactForm.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ContactForm = ({ onFormSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const resetForm = e => {
    const { name, number } = e.target.elements;
    name.value = '';
    number.value = '';
  };

  const handleSubmit = e => {
    e.preventDefault();
    onFormSubmit({ name, number });

    resetForm(e);
  };

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        alert('There is no form input');
    }
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
