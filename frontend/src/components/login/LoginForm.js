/* eslint-disable react/prop-types */
import React, { useState, useRef, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';

import InputFieldSet from '../utils/InputFieldSet';

import { GlobalContext } from '../../context/GlobalState';

const LoginForm = () => {
    const { getToken, getCurrentUser, loginUser} = useContext(GlobalContext);
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
  
    const references = {
      email: useRef(),
      password: useRef(),
    };

    const [formAlertText, setFormAlertText] = useState('');
    const [formAlertType, setFormAlertType] = useState('');
  
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
  
    async function handleSubmit(e) {
      e.preventDefault();
  
      setFormAlertText('');
      setFormAlertType('');
      setFormWasValidated(false);
  
      const isValid = isFormValid();
  
      if (isValid) {
        if(loginUser(fieldValues)) {
          setFormWasValidated(true);
          setFormAlertText('');
          setFormAlertType('');
          setIsLoginSuccess(true)
        }
        // fetch(endpoint.login, {
        //   method: 'POST',
        //   mode: 'cors',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     email: fieldValues.email,
        //     password: fieldValues.password,
        //   }),
        // })
        //   .then(res => res.json())
        //   .then(res => {
        //     if (res.status < 200 || res.status >= 300) {
        //       throw new Error('Incorrect email or password.');
        //     } else {
        //       localStorage.setItem(
        //         'user',
        //         JSON.stringify(res.user.token)
        //       );
        //       setFieldValues({
        //         email: '',
        //         password: '',
        //       });
        //       setFormAlertText('');
        //       setFormAlertType('');
        //       setUser(res.user);
        //     }
        //   })
        //   .catch(error => {
        //     setFormWasValidated(false);
        //     setFormAlertText(error.message);
        //     setFormAlertType('danger');
        //     setFieldValues({
        //       email: '',
        //       password: '',
        //     });
        //   });
      }
      setFormWasValidated(true);
      setFormAlertText('');
      setFormAlertType('');
    }
  
    function handleInputBlur(e) {
      const fieldName = e.target.name;
      validateField(fieldName);
    }
  
  //  if (users) return <Redirect to='/dashboard' />;
      // if (getToken()) return <Redirect to='/dashboard' />;

      console.log(getCurrentUser())
      console.log(getToken())
  
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
          {formAlertText && 
            <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
              {formAlertText}
            </div>
          }
        </form>
      </main>
    )
  }

export default LoginForm;