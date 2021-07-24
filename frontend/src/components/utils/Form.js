/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, {useState,useRef, useContext} from 'react';

import { GlobalContext } from '../../context/GlobalState';
import Input from "./Input";
import Transaction from './Transaction';

const Form = ({type, transaction}) => {
  const { addTransaction, updateTransaction } = useContext(GlobalContext);
  const id = (type === 'edit') ? transaction.id : null;

  const [fieldValues, setFieldValues] = useState(
    type === 'edit' ? transaction
      : new Transaction()
  );

  const [errors, setErrors] = useState({
    text: '',
    amount: '',
    date: ''
  });


  const [formWasValidated, setFormWasValidated] = useState(false);
  const [formAlertText, setFormAlertText] = useState('');
  const [formAlertType, setFormAlertType] = useState('');

  const references = {
    text: useRef(),
    amount: useRef(),
    date: useRef()
  };

  const errorTypes = {
    required: 'Value missing',
  };

  function isNotEmpty(value) {
    return value !== '';
  }

  const validators = {
    text: {
      required: isNotEmpty,
    },
    amount: {
      required: isNotEmpty,
    }
  }

  
  function validateField(fieldName) {
    if (fieldName === 'id') return true;

    const value = fieldValues[fieldName];
    let isValid = true;
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: ''
    }));
    references[fieldName].current.setCustomValidity('');

    if (validators[fieldName] !== undefined) {
      for (const [validationType, validatorFn] of Object.entries(validators[fieldName])) {
        if (isValid !== false) {
          isValid = validatorFn(value);
          if (!isValid) {
            const errorText = errorTypes[validationType];
            setErrors((previousErrors) => {
              return ({
                ...previousErrors,
                [fieldName]: errorText
              })
            });
            references[fieldName].current.setCustomValidity(errorText);
          }
        }
      }
    }
    return isValid;
  }

  function isFormValid() {
    let isFormValid = true;
    for (const fieldName of Object.keys(fieldValues)) {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isFormValid = false;
      }
    }
    return isFormValid;
  }

  const handleSubmit = e => {
    e.preventDefault();

    setFormAlertText('');
    setFormAlertType('');
    setFormWasValidated(false);

    const isValid = isFormValid();

    if (isValid) {
      if (type === 'new') {
        addTransaction(fieldValues)
          .then(() => {
            setFormAlertText('Save success');
            setFormAlertType('success');
            setFieldValues({
              text: '',
              amount: '',
            })
          });
      }
      if (type === 'edit') {
        updateTransaction(id, fieldValues)
          .then(() => {
            setFormAlertText('Edit success');
            setFormAlertType('success');
          });
      }
      setFormWasValidated(false);
    } else {
      setFormWasValidated(true);
    }
  }

  function handleInputBlur(e) {
    const {name} = e.target;
    validateField(name);
  }

  function handleInputChange(e) {
    const {value} = e.target;
    const fieldName = e.target.name;
    setFieldValues({
      ...fieldValues,
      [fieldName]: value
    });
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: ''
    }));
  }

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={handleSubmit} noValidate
            className={`needs-validation ${formWasValidated ? 'was-validated' : ''}`}>
        <Input
          reference={references.text}
          name="text"
          labelText="Describe"
          type="text"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        {/* <Input
          reference={references.category}
          name="category"
          labelText="Category"
          type="select"
          options={categoryOptions}
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        /> */}
        <Input
          reference={references.amount}
          name="amount"
          labelText="Amount (negative - expense, positive - income)"
          type="number"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
      {formAlertText &&
      <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
        {formAlertText}
      </div>
      }
    </>
  )
}

export default Form;