import React, { useState, useRef } from 'react';
import { Redirect } from "react-router-dom";

import validator from 'validator';

import InputFieldSet from '../utils/InputFieldSet';

export default function AddTransaction() {
    const [fieldValues, setFieldValues] = useState({
        text: "",
        amount: "",
        select: "",
        date: ""
      });
    
      const [errors, setErrors] = useState({
        text: "",
        amount: "",
        select: "",
        date: ""
      });
    
      const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
    
      const [formWasValidated, setFormWasValidated] = useState(false);
    
      const [formAlertText, setFormAlertText] = useState('');
      const [formAlertType, setFormAlertType] = useState('');
    
      const references = {
        firstName: useRef(),
        lastName: useRef(),
        email: useRef(),
        password: useRef()
      };
    
      const errorTypes = {
        required: "Value is missing",
        email: "Not valid email",
        passwordType: "Password should contain: 8 character, lowercase/uppercase, number, special character."
      };
    
      function isNotEmpty(value) {
        return value !== '';
      }
    
      const isEmailValid = (value) => validator.isEmail(value)
    
      function isStrongPassword(value) {
        return validator.isStrongPassword(value, {
          minLength: 8, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1
        })
      }
    
      const validators = {
        firstName: {
          required: isNotEmpty
        },
        lastName: {
          required: isNotEmpty
        },
        email: {
          required: isNotEmpty,
          email: isEmailValid
        },
        password: {
          required: isNotEmpty,
          passwordType: isStrongPassword,
        }
      }
    
      function validateField(fieldName) {
        const value = fieldValues[fieldName];
        let isValid = true;
        setErrors((previousErrors) => ({
          ...previousErrors,
          [fieldName]: ''
        }));
        references[fieldName].current.setCustomValidity('');
    
        if (validators[fieldName] !== undefined) {
          // eslint-disable-next-line no-restricted-syntax
          for (const [validationType, validatorFn] of Object.entries(validators[fieldName])) {
            if (isValid !== false) {
              isValid = validatorFn(value);
              if (!isValid) {
                const errorText = errorTypes[validationType];
                setErrors((previousErrors) => ({
                  ...previousErrors,
                  [fieldName]: errorText
                }));
                references[fieldName].current.setCustomValidity(errorText);
              }
            }
          }
        }
        return isValid;
      }
    
      function isFormValid() {
        let isValid = true;
    
        for (const fieldName of Object.keys(fieldValues)) {
          const isFieldValid = validateField(fieldName);
          if (!isFieldValid) {
            isValid = false;
          }
        }
        return isValid;
      }
    
      const backend = {
        protocol: 'http',
        host: '127.0.0.1',
        port: 5000,
      };
    
      const backendUrl = `${backend.protocol}://${backend.host}:${backend.port}`;
    
      const endpoint = {
        register: `${backendUrl}/api/register`,
      };
    
      function handleSubmit(e) {
        e.preventDefault();
    
        setFormAlertText('');
        setFormAlertType('');
        setFormWasValidated(false);
    
        const isValid = isFormValid();
    
        if (isValid) {
          fetch(endpoint.register, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              firstName: fieldValues.firstName,
              lastName: fieldValues.lastName,
              email: fieldValues.email,
              password: fieldValues.password
            })
          })
            .then((response) => {
              if (response.status < 200 || response.status >= 300) {
                const err = new Error();
                err.response = response;
                throw err;
              }
              if (response.status === 204) {
                setFormWasValidated(true);
                setFormAlertText('');
                setFormAlertType('');
                setIsRegisterSuccess(true);
              }
            })
            .catch((error) => {
              if (error.response) {
                error.response.json().then(data => {
                  setFormWasValidated(false);
                  setFormAlertText(data.error);
                  setFormAlertType('danger');
                  setIsRegisterSuccess(false);
                })
              } else {
                setFormWasValidated(false);
                setFormAlertText("unknown error");
                setFormAlertType('danger');
                setIsRegisterSuccess(false);
              }
            })
        }
      }
    
      function handleInputChange(e) {
        const { value } = e.target;
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
    
      function handleInputBlur(e) {
        const { name } = e.target;
        validateField(name);
      }
    
      if (isRegisterSuccess) {
        return <Redirect to="/login" />;
      }
    return (
        <div className="container mb-5 text-center">
            <h3>Add new transaction</h3>
            <main className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} noValidate
          className={`form-group w-50 text-center needs-validation ${formWasValidated ? 'was-validated' : ''} `}>
  
          <InputFieldSet
            reference={references.lastName}
            name="text"
            labelText="Text"
            type="number"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required
          />
          <InputFieldSet
            reference={references.firstName}
            name="amount"
            labelText="Amount"
            type="amount"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required
          />
          <InputFieldSet
            reference={references.email}
            name="date"
            labelText="Date"
            type="date"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required
          />
  
          <button type="submit" className="btn btn-dark">Add</button>
  
          {formAlertText &&
            <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
              {formAlertText}
            </div>
          }
  
        </form>
        </main>
        </div>
    )
}
