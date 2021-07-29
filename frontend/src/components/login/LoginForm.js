
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import validator from 'validator';

import InputFieldSet from '../utils/InputFieldSet';

import { GlobalContext } from '../../context/GlobalState';

const LoginForm = () => {
    const { error, getToken, loginUser, getCurrentUser} = useContext(GlobalContext);

    const [fieldValues, setFieldValues] = useState({
      email: '',
      password: '',
    });
  
    const [errors, setErrors] = useState({
      email: '',
      password: '',
    });

    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    const [formWasValidated, setFormWasValidated] = useState(false);
    const [formAlertText, setFormAlertText] = useState('');
    const [formAlertType, setFormAlertType] = useState('');

    const references = {
      email: useRef(),
      password: useRef(),
    };

    function isNotEmpty(value) {
      return value !== '';
    }
  
    const isValidEmail = (value) => validator.isEmail(value);

    function isStrongPassword(value){
      return validator.isStrongPassword(value, {
          minLength: 8, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1  
      })
    }

    const validators = {
    email: {
      required: isNotEmpty,
      email: isValidEmail
    },
    password: {
      required: isNotEmpty,
      passwordType: isStrongPassword,
    }
  };
  
    const errorTypes = {
    required: "Value is missing",
    email: "Invalid value",
    passwordType: "Password should contain: 8 character, lowercase, uppercase, number and special character"
  };
  
    function validateField(fieldName) {
      const value = fieldValues[fieldName];
      let isValid = true;
      setErrors(previousErrors => ({
        ...previousErrors,
        [fieldName]: '',
      }));
      references[fieldName].current.setCustomValidity('');
  
      if (validators[fieldName] !== undefined) {
        for (const [validationType, validatorFn] of Object.entries(
          validators[fieldName]
        )) {
          if (isValid) {
            isValid = validatorFn(value);
            if (!isValid) {
              const errorText = errorTypes[validationType];
              setErrors(previousErrors => ({
                ...previousErrors,
                [fieldName]: errorText,
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

    async function handleSubmit(e) {
      e.preventDefault();
  
      setFormAlertText('');
      setFormAlertType('');
      setFormWasValidated(false);
  
      const isValid = isFormValid();

      if (isValid) {
        loginUser(fieldValues);
        setFormWasValidated(true);
        setFormAlertText("");
        setFormAlertType('');
        setIsLoginSuccess(true)

        if(error) {
          setFormWasValidated(false);
          setFormAlertText(error);
          setFormAlertType('danger');
          setIsLoginSuccess(false)
        }
      }
    }

    function handleInputChange(e) {
        const fieldValue = e.target.value;
        const fieldName = e.target.name;
        setFieldValues({
          ...fieldValues,
          [fieldName]: fieldValue,
        });
        setErrors(previousErrors => ({
          ...previousErrors,
          [fieldName]: '',
        }));
    }
  
    function handleInputBlur(e) {
      const fieldName = e.target.name;
      validateField(fieldName);
    }
  
      if (isLoginSuccess && getToken() && getCurrentUser() ) {
        return <Redirect to="/dashboard" />;
      }

    return (
      <main className="d-flex justify-content-center">
        
        <form onSubmit={handleSubmit} noValidate
          className={`form-group w-50 text-center needs-validation ${formWasValidated ? 'was-validated' : ''}`}
        >
          <InputFieldSet
            reference={references.email}
            name="email"
            labelText="Email"
            type="email"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required
          />
          <InputFieldSet
            reference={references.password}
            name="password"
            labelText="Password"
            type="password"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required
          />
          <button type="submit" className="btn btn-dark">Login</button>
          {error && 
            <div className="alert mt-3 alert-danger" role="alert">
              {error}
            </div>
          }
        </form>
      </main>
    )
  }

export default LoginForm;